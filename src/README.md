# Carbon Dashboard Folder Structure

```text
src
├─ app
│  └─ (optional) app-router bridge
├─ providers
│  ├─ query-provider.tsx
│  └─ store-provider.tsx
├─ entities
│  ├─ emission
│  │  ├─ model
│  │  └─ types
│  ├─ facility
│  │  ├─ model
│  │  └─ types
│  └─ target
│     ├─ model
│     └─ types
├─ features
│  ├─ dashboard
│  │  ├─ api
│  │  ├─ components
│  │  ├─ hooks
│  │  ├─ stores
│  │  ├─ types
│  │  └─ utils
│  ├─ emissions
│  │  ├─ api
│  │  ├─ components
│  │  ├─ hooks
│  │  ├─ mocks
│  │  ├─ schemas
│  │  ├─ stores
│  │  ├─ types
│  │  └─ utils
│  └─ reports
│     ├─ api
│     ├─ components
│     ├─ hooks
│     ├─ types
│     └─ utils
├─ widgets
│  ├─ dashboard-overview
│  ├─ emissions-table
│  └─ reduction-progress-chart
├─ shared
│  ├─ ui
│  │  ├─ layout
│  │  ├─ feedback
│  │  ├─ navigation
│  │  ├─ data-display
│  │  └─ form
│  ├─ charts
│  │  ├─ components
│  │  ├─ config
│  │  ├─ hooks
│  │  ├─ types
│  │  └─ utils
│  ├─ form
│  │  ├─ components
│  │  ├─ hooks
│  │  ├─ resolvers
│  │  ├─ schemas
│  │  └─ types
│  ├─ lib
│  │  ├─ react-query
│  │  ├─ zustand
│  │  ├─ http
│  │  └─ utils
│  └─ constants
├─ mocks
│  ├─ fixtures
│  ├─ handlers
│  ├─ scenarios
│  └─ index.ts
└─ types
   ├─ api.ts
   ├─ common.ts
   └─ index.ts
```

This structure follows a feature-first architecture with strict separation of UI and business logic.
