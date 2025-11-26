# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dumbgram is a photo/video sharing social media application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. It's an Instagram-like platform where users can share their moments with others.

## Development Commands

- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

Package manager: **pnpm** (not npm or yarn)

## Architecture

### Feature-Based Structure

The codebase follows a **feature-based architecture** where each major feature is organized in the `features/` directory with its own components, hooks, and logic:

```
features/
├── auth/
│   ├── components/  # Auth UI components (LoginForm, RegisterForm, ModalAuth, AuthWrapper)
│   └── hooks/       # Form hooks (useLoginForm, useRegisterForm)
└── feed/
    └── components/  # Feed-related components (Profile)
```

### Key Patterns

**Form Handling Pattern:**
- All forms use `react-hook-form` with `zod` validation via `@hookform/resolvers`
- Form hooks (`useLoginForm`, `useRegisterForm`) encapsulate schema, validation, and submit logic
- Forms accept optional `onSuccess` callback for handling successful submissions
- Error handling uses `form.setError('root', { message })` for global errors
- Custom Zod helper `minString(field, length)` for consistent string validation

**Component Organization:**
- Feature components export through barrel files (`features/auth/components/index.tsx`)
- UI components from shadcn/ui in `components/ui/`
- Shared components in `components/shared/`
- Client components explicitly marked with `'use client'` directive

**API Integration (TODO):**
- Auth form hooks have placeholder API calls marked with `// TODO: ganti dengan call API login/register kamu`
- When implementing API calls, replace console.log statements in form submission handlers

### UI Components

**shadcn/ui Configuration:**
- Base style: `new-york`
- Uses Tailwind CSS variables for theming
- Icon library: `lucide-react`
- Components in `components/ui/` (Button, Dialog, Input, Skeleton)
- Custom button variant: `rainbow` (gradient effect)

**Styling:**
- Utility function `cn()` in `lib/utils.ts` combines `clsx` and `tailwind-merge`
- Dark mode enabled by default via `className="dark"` on `<body>`
- Custom fonts: Geist Sans and Geist Mono via `next/font/google`

### Routing

Next.js App Router structure:
- `/` - Landing page (placeholder)
- `/auth` - Authentication page with login/register modals

### Path Aliases

TypeScript paths configured with `@/*` mapping to root:
- `@/components` → components
- `@/lib` → lib utilities
- `@/features` → feature modules

## Development Notes

**Form Development:**
When adding new forms, follow the established pattern:
1. Create Zod schema with validation rules
2. Create custom hook that encapsulates form logic
3. Use `useForm` with `zodResolver`
4. Return `{ form, onSubmit }` from the hook
5. Component receives optional `onSuccess` callback

**Adding shadcn/ui Components:**
Configuration is in `components.json`. Use shadcn CLI to add components - they'll automatically be placed in `components/ui/`.

**Client vs Server Components:**
Forms and interactive components must be client components. Always add `'use client'` directive at the top of files using hooks or event handlers.
