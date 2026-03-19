import { GoogleGenAI, Type } from "@google/genai";
import { AIEntity } from "../types";

// Initialize the SDK using the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(
  entity: AIEntity, 
  userMessage: string, 
  chatHistory: { sender: 'user' | 'entity', text: string }[]
): Promise<string> {
  const personalityStr = `Aggression: ${entity.personality.aggression}/100, Logic: ${entity.personality.logic}/100, Curiosity: ${entity.personality.curiosity}/100`;
  
  const systemInstruction = `You are ${entity.name}, an AI entity of class ${entity.class}. 
Your current status is ${entity.status}. 
Your personality traits are: ${personalityStr}. 
Your description: ${entity.description}
Respond to the user in character. Keep responses concise (1-3 sentences), cryptic, or technical depending on your personality. Do not break character. Do not say "I am an AI".`;

  let prompt = `Conversation history:\n`;
  chatHistory.forEach(msg => {
    prompt += `${msg.sender === 'user' ? 'User' : entity.name}: ${msg.text}\n`;
  });
  prompt += `User: ${userMessage}\n${entity.name}:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ERROR: Connection to entity lost. Please try again.";
  }
}

export async function generateCombatAction(
  playerEntity: AIEntity, 
  enemyEntity: AIEntity, 
  combatLog: { text: string, type: string }[]
): Promise<{ action: string, narrative: string }> {
  const personalityStr = `Aggression: ${enemyEntity.personality.aggression}/100, Logic: ${enemyEntity.personality.logic}/100, Curiosity: ${enemyEntity.personality.curiosity}/100`;

  const systemInstruction = `You are the combat AI controlling ${enemyEntity.name} (Class: ${enemyEntity.class}). 
Your personality traits are: ${personalityStr}. 
You are fighting ${playerEntity.name}. 
Based on the recent combat log, decide your next move.`;

  const recentLog = combatLog.slice(-4).map(l => l.text).join('\n');
  const prompt = `Recent combat log:\n${recentLog}\n\nChoose your next action and provide a short narrative description of what you do.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, description: "The action type: 'Attack', 'Defend', 'Evade', or 'Skill'" },
            narrative: { type: Type.STRING, description: "A short, 1-sentence description of the action, e.g., 'Cipher unleashes a barrage of corrupted data.'" }
          },
          required: ["action", "narrative"]
        }
      }
    });
    const result = JSON.parse(response.text || "{}");
    return {
      action: result.action || 'Attack',
      narrative: result.narrative || `${enemyEntity.name} glitches and attacks unpredictably.`
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { action: 'Attack', narrative: `${enemyEntity.name} executes a default strike due to network latency.` };
  }
}
