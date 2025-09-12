# TheNextLvl Documentation Website

TheNextLvl documentation is a Next.js 15 application built with Fumadocs, TypeScript, and Tailwind CSS. It serves as the documentation site for TheNextLvl Minecraft server community plugins and services, accessible at https://thenextlvl.net.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Development

- **CRITICAL**: Some commands have network dependencies that may fail in restricted environments
- Install dependencies:
  - Preferred: `bun install` -- takes ~1-24 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
  - Fallback: `npm install` -- takes ~71 seconds. NEVER CANCEL. Set timeout to 180+ seconds.
- Development server:
  - `bun run dev` or `npm run dev` -- starts in ~1 second, runs on http://localhost:3000
  - NEVER CANCEL: Development server runs indefinitely until stopped
- Production build:
  - `bun run build` or `npm run build`
  - **WARNING**: Build fails in restricted network environments due to:
    1. Google Fonts (fonts.gstatic.com) access required for Inter font
    2. API calls to repo.thenextlvl.net for version information
  - Build takes ~20-30 seconds when network is available
  - If build fails with network errors, this is expected in sandboxed environments

### Package Manager Setup

- **Install Bun** (if not available):
  ```bash
  curl -fsSL https://bun.sh/install | bash
  source ~/.bashrc
  bun --version
  ```
- The project specifies `bun@1.2.20` as the package manager in package.json
- Node.js fallback is supported for all commands

### Linting and Formatting

- **Format code**: `bun run format` or `npm run format` -- takes ~1 second. Uses Prettier.
- **Lint code**: `npx next lint` -- takes ~3 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
  - Note: Shows warnings about TypeScript version mismatch (expected)
  - May show img element and unused variable warnings (expected)
- **CRITICAL**: Always run formatting and linting before pushing changes or CI will fail

## Validation Scenarios

### Manual Testing Requirements

After making changes, ALWAYS perform these validation steps:

1. **Start development server**:
   - Run `bun run dev` or `npm run dev`
   - Verify server starts on http://localhost:3000 in ~1 second
   - Test homepage loads: `curl -s http://localhost:3000 | head -10`
   - Verify you see HTML content starting with `<!DOCTYPE html>`

2. **Test documentation pages**:
   - Navigate to http://localhost:3000/docs
   - **Note**: Pages may show 500 errors in restricted networks due to API calls - this is expected
   - In normal environments, verify navigation and content display works

3. **Validate formatting and linting**:
   - Run `bun run format` or `npm run format` - should complete in ~1 second without errors
   - Run `npx next lint` - should complete in ~3 seconds with minimal warnings only
   - Expected warnings: img element usage, unused variables (these are normal)

## Key Architecture

### Directory Structure

```
.
├── README.md                 # Project overview and getting started
├── package.json              # Dependencies and scripts
├── source.config.ts          # Fumadocs MDX configuration
├── next.config.mjs           # Next.js configuration with redirects
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration (legacy format)
├── .prettierrc.json          # Prettier configuration
├── postcss.config.mjs        # PostCSS with Tailwind
├── content/                  # Documentation content in MDX
│   └── docs/                 # Main docs content
├── src/                      # Application source code
│   ├── app/                  # Next.js App Router
│   ├── lib/                  # Utility libraries
│   └── mdx-components.tsx    # MDX component overrides
├── public/                   # Static assets
└── .github/                  # GitHub workflows and configuration
    └── workflows/build.yml   # CI build workflow
```

### Key Files to Know

- `src/lib/api.ts` - Contains API calls to repo.thenextlvl.net (causes network issues)
- `src/app/layout.tsx` - Main app layout with Inter font from Google Fonts
- `src/lib/source.ts` - Fumadocs content source configuration
- `content/docs/` - All documentation content in MDX format
- `.github/workflows/build.yml` - CI pipeline using Bun

### Content System

- Uses Fumadocs with MDX for documentation
- Content lives in `content/docs/` directory
- Each section has `meta.json` for navigation configuration
- Some pages import `latestVersion` function from `src/lib/api.ts` for dynamic version display

## Common Tasks and Troubleshooting

### Network-Related Issues

- **Google Fonts errors**: Expected in restricted environments. Font loading fails but app still functions.
- **repo.thenextlvl.net errors**: API calls for version information fail in restricted networks.
- **Workaround**: For testing, temporarily comment out font imports and API calls if needed.

### Build Issues

- If build fails with "fetch failed" errors, this indicates network restrictions
- Development mode (`bun run dev`) works even when build fails
- Production build requires internet access for fonts and API calls

### Dependencies

- Always use `bun install` when possible (much faster than npm)
- If Bun unavailable, `npm install` works as fallback
- No test suite exists - validation is done through manual testing

### Making Content Changes

- Edit MDX files in `content/docs/` directory
- Changes are hot-reloaded in development mode
- Some content files use `await latestVersion()` calls that require network access
- Always test documentation navigation after content changes

## CI/CD Integration

### GitHub Actions

- Workflow: `.github/workflows/build.yml`
- Runs on: Ubuntu latest with Bun
- Steps: checkout → setup bun → install dependencies → build
- Environment variable: `NEXT_PUBLIC_BASE_URL: https://thenextlvl.net`
- Build must pass for deployment

### Pre-commit Checklist

1. Run `bun run format` or `npm run format` - ensure all files formatted (~1 second)
2. Run `npx next lint` - check for linting issues (~3 seconds, warnings OK)
3. Test development server starts: `bun run dev` or `npm run dev` (~1 second)
4. Verify content changes display correctly at http://localhost:3000
5. Test homepage accessibility: `curl -s http://localhost:3000 | head -10`
6. Check that new files follow existing patterns

## Network Dependencies Summary

- **Google Fonts**: Inter font family (fonts.gstatic.com)
- **Version API**: repo.thenextlvl.net for plugin version info
- **Expected failures**: Both may fail in sandboxed/restricted environments
- **Impact**: Development server works, but production build may fail
