# Aethel Nexus - Project Improvement Roadmap

This document outlines the planned improvements and feature expansions for the Aethel Nexus platform.

## 1. Global AI Presence (Cross-map State)
- [x] **Network Topology World Map**: Implemented a global network view with zoom/drag and interactive nodes.
- [ ] **Unified Entity Tracking**: Implement a global state to track which city/region each AI entity is currently located in.
- [ ] **Real-time Map Updates**: Update city nodes on the World Map to show actual entity avatars based on their current location.
- [ ] **Dynamic Roster Status**: Reflect the entity's current activity (e.g., "Training in NeuroGrid-7", "Trading in Void Bazaar") in the Roster and Core views.

## 2. City Map Refinement (Hexagonal Interface)
- [x] **Hexagonal Layouts**: Implemented for Nexus Prime, NeuroGrid-7, Echo Vault, and Void Bazaar.
- [x] **Interactive Modules**: Added hover/select effects, module-specific icons, and detailed information panels.
- [x] **Central Core Integration**: Made the central "Sync" nodes selectable and interactive across all main city maps.
- [x] **Dynamic AI Simulation**: Added activity logs and behavior simulations for each city (e.g., market scams in Void Bazaar, memory refusal in Echo Vault).

## 3. Functional Interactivity (Logic Implementation)
- [ ] **NeuroGrid-7 Training Logic**: Implement actual stat increases (Processing, Adaptability, etc.) when clicking "Neural Upgrade" or "Combat Drill".
- [ ] **ECHO-VAULT Memory System**: Create a system where "Deleting Fragments" or "Strengthening Memories" permanently alters an entity's personality traits or skills.
- [ ] **VOID BAZAAR Economy**: Introduce a "Fragments" currency system. Implement trade logic where entities can gain/lose resources and rare items.
- [ ] **Resource Management**: Add a global resource counter (Energy, Fragments, Data) to the header.

## 4. Dynamic World Events
- [ ] **Random Event Generator**: Implement a background service that triggers global events (e.g., "Data Storm in Sector 7G", "Market Crash in Void Bazaar").
- [ ] **Event Impact**: Events should have mechanical effects (e.g., increased training speed, higher combat difficulty, cheaper trade prices).
- [ ] **Global Notifications**: Add a "Breaking News" ticker or notification system for world events.

## 5. Narrative & Lore Integration
- [ ] **Hidden Plot Triggers**: Link specific actions in ECHO-VAULT or Neural Archives to unique lore entries.
- [ ] **Persistent Behavior Logs**: Ensure that autonomous AI actions generate meaningful logs that are saved to the "Behavior Logs" page.
- [ ] **Entity Backstories**: Expand the "Core" view to include unlocked memories and personal history based on world interactions.

## 6. Immersive Transitions & UX
- [ ] **Coordinate Lock Animation**: Add a "Scanning/Locating" transition effect when navigating from the World Map to a specific city.
- [ ] **Audio Feedback**: Implement subtle UI sounds for button clicks, map scanning, and environmental ambience for each city.
- [ ] **Mobile Optimization**: Further refine the city map layouts for smaller screens to ensure all interactive nodes are accessible.

## 7. Combat & Map Linkage
- [ ] **Regional Combat Buffs**: Apply specific modifiers to combat based on the location (e.g., +10% Logic in NeuroGrid-7, +20% Risk in Sector 7G).
- [ ] **Loot Tables by Region**: Differentiate rewards based on where the combat or exploration occurred.

---
*Last Updated: 2026-03-20*
