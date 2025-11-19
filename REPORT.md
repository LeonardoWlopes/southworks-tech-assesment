# Architecture Report

## Data Layer Choice: React Query

**Why React Query over Zustand for data fetching:**

- React Query provides built-in caching, background refetching, and automatic request deduplication, which is essential for API data management
- Zustand is used for UI state management (feature flags, theme), while React Query handles server state
- React Query's `useInfiniteQuery` simplifies pagination implementation with minimal boilerplate
- Automatic retry logic and error handling reduce manual error management code
- DevTools integration provides excellent debugging capabilities for API calls

## Retry/Backoff + Cache Choices

- **Cache Strategy**: React Query uses default `staleTime: 0` and `cacheTime: 5 minutes`, meaning data is considered stale immediately but cached for 5 minutes
- **Retry**: Default React Query retry (3 attempts with exponential backoff) is used for failed requests
- **Refetch**: `refetchOnMount: false` and `refetchOnWindowFocus: false` configured to prevent unnecessary API calls
- **Pagination**: Infinite query pattern with `getNextPageParam` handles pagination automatically, caching each page separately

## Feature Flag Implementation

**How to enable/disable features:**

The app uses Zustand store (`app-store`) for feature flags. Currently implemented:

- **`showRepositoryLanguage`**: Controls visibility of repository language badges in the repositories list
  - Toggle via Switch component in repositories screen header
  - State persisted using Zustand's `persist` middleware with AsyncStorage
  - Accessible via `useAppStore()` hook: `const { showRepositoryLanguage, set } = useAppStore()`
  - To add new flags: extend `IAppState` interface in `src/stores/app-store/index.ts`

## Theme System Implementation

**Light and Dark Themes:**

The app implements a comprehensive theme system with light and dark modes:

- **Theme Provider**: Context-based theme provider (`AppThemeProvider`) manages theme state
- **Theme Toggle**: Switch component in Profile screen header to toggle between light/dark modes
- **Theme Persistence**: Theme preference stored in Zustand store with persistence via AsyncStorage
- **Color System**: All colors centralized in theme files (`src/themes/light.ts` and `src/themes/dark.ts`)
  - Colors include: `background`, `surface`, `primary`, `text`, `textSecondary`, `textTertiary`, `border`, `error`, `cardBackground`, `cardBackgroundLight`, `badgeBackground`
- **Component Integration**: All components use theme colors via `useThemeContext()` hook
- **Tab Navigation**: Bottom tab bar respects theme with dynamic colors for active/inactive states
- **Toggle Function**: `toggleTheme()` callback in theme provider automatically switches between themes

## AI Usage Disclosure

**Tool**: Cursor AI (Composer)

**Project Base**: This project was created from a custom React Native template that already included:

- Project structure and folder organization
- Development tooling (Biome, Commitlint, Lefthook)
- Testing setup (Jest, React Testing Library)
- Base utilities (logging, error handling, storage)
- i18n configuration structure
- Theme provider and basic state management patterns

**AI Usage**:

- Transformed initial screen into ProfileScreen with GitHub user data
- Created RepositoriesScreen with paginated list using React Query and FlashList
- Component extraction and refactoring (RepositoryItem component)
- Navigation setup with Expo Router bottom tabs
- Feature flag implementation for repository language toggle
- Theme system implementation (light/dark themes with toggle)
- Pull-to-refresh functionality for repositories list
- Color system migration to theme-based approach
- Tab navigation theme integration
- Translation files (English and Portuguese)
- Test file structure and patterns

**What was kept from template**:

- Base architecture decisions (React Query + Zustand separation)
- File structure and organization patterns
- Testing approach and setup
- Error handling and logging patterns
- Development tooling configuration

**What was changed/added**:

- Customized to match challenge requirements (GitHub API integration)
- Implemented navigation with Expo Router file-based routing
- Created ProfileScreen and RepositoriesScreen as required
- Implemented specific feature flag pattern (`showRepositoryLanguage`)
- Built comprehensive theme system with light/dark modes
- Added pull-to-refresh functionality for repositories list
- Migrated all hardcoded colors to theme-based system
- Integrated theme support in tab navigation
- Added i18n translations for all user-facing strings
- Adapted existing patterns to challenge specifications
