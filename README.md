# Riichi Mahjong Game in React Native

## Table of Contents

- [General Info](#general-info)
- [Setup](#setup)
- [Project Overview](#project-overview)
- [Performance Considerations](#performance-considerations)
- [TypeScript and State Management](#typescript-and-state-management)
- [Sound Management](#sound-management)
- [Responsive UI Challenges](#responsive-ui-challenges)
- [AI Decision-Making and Heuristics](#ai-decision-making-and-heuristics)
- [AI Logic Implementation](#ai-logic-implementation)
- [Video Showcase](#video-showcase)
- [Current State of the App](#current-state-of-the-app)
- [Bugs & To-Do List](#bugs--to-do-list)
- [Assets Credits](#assets--credits)
- [Additional Resources](#additional-resources)

## General Info

This project is a Riichi Mahjong game built using React Native.

## Setup

To run this project locally, install dependencies using npm:

```bash
npm install
```

Then, start the application:

```bash
npm start
```

## Project Overview

This project is the child of free evenings, determination, and a hobbyist passion for programming—one that might turn into something more.

Before starting this project in JavaScript, I was well aware that it would be challenging due to JavaScript’s core execution model. JavaScript runs code synchronously in a single thread, meaning it executes one operation at a time in sequence. When multiple functions are called, they are processed one after another rather than simultaneously.

## Performance Considerations

This project utilizes JS Hermes. Due to CPU-intensive tasks like AI logic for computer players, I considered offloading these tasks to a native module, which would provide direct access to platform-specific optimizations.

For reference, execution speed varies significantly across languages when running a loop from 1 to 1 million:

- JavaScript: 23ms
- TypeScript: 24ms (likely 1ms overhead due to type checking)
- Java: 12ms
- Kotlin: 8ms (three times faster than JavaScript!)
- Swift: 9ms

(Note: These times heavily depend on the phone model and processor.)

Unfortunately, CPU-intensive tasks in native modules should be implemented asynchronously to prevent blocking the main thread. By the time I considered offloading AI calculations, I was already too deep into the project and didn’t want to rewrite the core logic from scratch.

## TypeScript and State Management

Using TypeScript is an obvious choice for a project of this scale.

For global state management, I typically prefer MobX for hobby projects. However, I opted for Redux despite its slightly lower performance because it is easier to maintain, more scalable, and clearer in structure.

In several instances, directly using `store.getState()` proved more efficient than passing state as a function argument.

## Sound Management

Sound is initialized before the main component renders, ensuring all sounds are preloaded and ready for use.

The app uses Async Storage to load user-defined settings, such as sound volume preferences.

## Responsive UI Challenges

Initially, creating responsive components that adjusted to screen width and height was challenging. The early components contain many overcomplicated calculations for measuring component size relative to the screen and simulating 3D perspective illusions.

Ultimately, the best solution was to use fixed dimension values combined with `transform: scale` for UI adaptability.

## AI Decision-Making and Heuristics

I considered using Tenhou’s API to determine AI decisions since it provides a vast dataset with proven decision-making patterns. However, given my project’s progress, I decided to develop my own heuristic algorithm based on human expert knowledge and artificial danger scores as decision-making factors.

There are numerous university research papers on optimal AI algorithms for Riichi Mahjong, which I recommend exploring.

## AI Logic Implementation

The AI currently determines:

- The best tile to discard
- When to declare Riichi
- When to declare a win via Tsumo or Ron

### To-Do List:

- Use Shanten number and opponents' moves to refine strategy selection (aggressive vs. defensive playstyles)

## Video Showcase

[![Riichi Mahjong App Showcase](https://raw.githubusercontent.com/Schnippen/mahjong/main/Data/github_screenshot.png)](https://youtu.be/GWd0WMf2sn0 'Watch the Riichi Mahjong App in action')

Please note that some features and game mechanics are not fully visible without debug tools enabled.

## Current State of the App

The app fully supports playing Riichi Mahjong with all essential functionalities.

However, it still has rough edges and requires further refinement.

It is playable and functional, but there is still a lot of work to be done to enhance performance and UX.

The UI is strictly utilitarian. The primary goal is to ensure smooth gameplay and clear information presentation rather than elaborate visual design.

## Bugs & To-Do List

A complete list of bugs and pending tasks can be found in:

```
mahjong\Data\list_of_bugs
```

## Assets Credits

The mahjong tile front images used in this project are from [riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles) by FluffyStuff. These assets are in the public domain.

## Additional Resources

For more information about Riichi Mahjong rules visit [Riichi Wiki](https://riichi.wiki/Main_Page).
