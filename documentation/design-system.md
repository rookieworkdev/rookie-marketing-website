# Design System

## Padding

### Horizontal Padding

All components use a centralized horizontal padding utility for consistent spacing across the application.

**Usage:**

```typescript
import { horizontalPadding } from '@/lib/utils'

// Example usage in components
<div className={`${horizontalPadding} py-20`}>
  Content with consistent horizontal padding
</div>
```

**Current value:** `px-8`

**Where it's used:**

- Hero section
- Header navigation
- Page headers
- CTA sections
- Footer
- Section containers (via `sectionContainer` utility)

**Benefits:**

- Easy to adjust across the entire application by changing one value in `lib/utils.ts`
- Maintains visual consistency
- Reduces code duplication

### Section Container Utility

For standard sections with both horizontal and vertical padding:

```typescript
import { sectionContainer } from '@/lib/utils'

// Default: includes horizontal padding + py-20
<div className={sectionContainer()}>
  Section content
</div>

// No padding variant
<div className={sectionContainer(undefined, 'no-padding')}>
  Section content without padding
</div>
```

Combines:

- `mx-auto max-w-7xl` (centered, max width)
- `border-r border-l border-border` (side borders)
- `${horizontalPadding} py-20` (padding, when not no-padding variant)
