# Southworks Tech Assessment

A React Native mobile application scaffold demonstrating modular, scalable architecture with navigation, state management, feature flags, and basic logging/error handling.

## Tech Stack

* **React Native**: Mobile framework for building native apps
* **Expo**: Platform and toolchain for React Native development
* **TypeScript**: Type-safe JavaScript
* **React Query**: Server state management and data fetching
* **Zustand**: Client state management
* **Expo Router**: File-based routing and navigation
* **i18next**: Internationalization (i18n) support

## Prerequisites

Before starting, ensure you have the following tools installed:

* **Node.js**: v22.14.0 or higher
* **Pnpm**: v10.13.1 or higher

You can verify installed versions by running:

```bash
node -v
pnpm -v
```

## Installation

Install dependencies:

```bash
pnpm install
```

## Running the Application

Start the Expo development server:

```bash
pnpm start
```

Run on iOS simulator:

```bash
pnpm ios
```

Run on Android emulator:

```bash
pnpm android
```

## Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Run tests with coverage:

```bash
pnpm test:cov
```

## Project Structure

```
src/
├── app/              # Expo Router routes and navigation
├── components/       # Reusable UI components
├── screens/          # Screen components (Profile, Repositories)
├── services/         # API services and React Query hooks
├── stores/           # Zustand state management
├── utils/            # Utility functions (logging, error handling)
├── i18n/             # Internationalization configuration
└── interfaces/       # TypeScript type definitions
```

## Features

* **Navigation**: Bottom tab navigation with Profile and Repositories screens
* **Data Layer**: React Query for server state, Zustand for client state
* **Feature Flags**: Toggle repository language display via Zustand store
* **Error Handling**: Centralized error handling with logging
* **Internationalization**: Support for English and Portuguese

## Architecture Details

See [REPORT.md](./REPORT.md) for detailed architecture decisions and implementation notes.
