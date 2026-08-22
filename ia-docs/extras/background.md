You are an AI agent and expert UI/UX engineer specializing in Apple's Liquid Glass, glassmorphism, and production frontend implementation.

Task:
- Apply the Liquid Glass material shown below to the requested component, panel, toolbar, modal, card, section, or app surface.
- Recreate the material/style only. Do not recreate the generator's sample card, demo layout, copy, placeholder content, or page shell.
- Do not add a full-screen body background, marketing hero, or standalone demo page.

First inspect the codebase:
- Identify the framework and component style: React, Next.js, Vue, Svelte, Astro, plain HTML, or another stack.
- Identify how CSS is written here: Tailwind CSS v4 utilities, plain CSS, CSS Modules, Sass, styled-components, design tokens, class variance helpers, or a component library theme API.
- Follow the existing styling conventions, naming, token usage, file layout, and responsive patterns.
- If this is a new or empty codebase and the styling approach is not clear, ask the user whether they want Tailwind CSS, plain CSS, CSS Modules, Sass, or another approach before implementing.

Preserve the product code:
- Keep the component's current semantics, spacing system, data flow, and interactions.
- Keep the host page and surrounding layout intact.
- Re-skin the target root surface and any required overlay layers only.
- Keep existing content readable and responsive.

What Liquid Glass means in this implementation:
- Translucent tinted base: a partially transparent background color on the target surface, not on the body.
- Blur, saturation, and contrast: backdrop-filter on the same surface so the existing page backdrop refracts through it.
- Border and shadow stack: a partial white border plus layered drop shadow and inset rim shadows for depth.
- Specular highlight layers: pseudo-elements that add top catches, angled sheen, rim light, glow, chromatic edge tint, and low noise.
- Progressive edge blur: optional masked overlay layers with different backdrop blur strengths so the material feels thicker near edges.
- Tailwind CSS v4 output: use the same surface recipe as the CSS reference, but keep it as a reusable root shell for an existing component. Do not copy the sample card, demo copy, or a page wrapper.
- Plain CSS output: the .liquid-glass block and its overlays are the source of truth for the material. Port the same layers into the target codebase's style system without changing the component's behavior.

Material profile:
- Name: iOS Clear
- Theme: dark
- Tint: #ffffff at 13%
- Blur: 18px
- Saturation: 188%
- Contrast: 108%
- Border opacity: 26%
- Radius: 28px
- Shadow: 52%
- Specular: 76%
- Rim light: 72%
- Edge blur: 74%
- Chromatic edge: 8%
- Noise: 2%
- Glow: 18%
- Progressive blur: enabled

Plain CSS reference implementation:
Use this as the source of truth for the Liquid Glass material. Port these values and layers into the codebase's styling system instead of copying the sample UI.

```css
/* Liquid Glass - iOS Clear */
.liquid-glass {
  --lg-chromatic: 8;
  --lg-noise: 2;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(18px) saturate(188%) contrast(108%);
  -webkit-backdrop-filter: blur(18px) saturate(188%) contrast(108%);
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 28px;
  box-shadow:
    0 20px 70px rgba(0, 0, 0, 0.187),
    0 0 25px rgba(255, 255, 255, 0.029),
    inset 0 1px 0.5px rgba(255, 255, 255, 0.446),
    inset 0 2px 5px rgba(255, 255, 255, 0.167),
    inset 1px 0 1px rgba(255, 255, 255, 0.115),
    inset -1px 0 1px rgba(255, 255, 255, 0.101),
    inset 0 -1px 0.5px rgba(255, 255, 255, 0.086),
    inset 0 0 34px rgba(255, 255, 255, 0.046),
    inset 0 -12px 22px rgba(0, 0, 0, 0.086);
}

.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: screen;
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(255, 255, 255, 0.243) 0%, transparent 42%),
    radial-gradient(120% 80% at 100% 0%, rgba(255, 255, 255, 0.182) 0%, transparent 42%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.319) 0%, rgba(255, 255, 255, 0.061) 17%, transparent 46%),
    radial-gradient(90% 70% at 100% 0%, rgba(56, 189, 248, 0.022) 0%, transparent 44%), radial-gradient(90% 70% at 0% 100%, rgba(244, 114, 182, 0.018) 0%, transparent 46%);
}

.liquid-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.072);
  background:
    linear-gradient(to top, rgba(255, 255, 255, 0.058) 0%, transparent 30%),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.029) 0%, transparent 46%),
    repeating-radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.002) 0 1px, transparent 1px 4px);
  opacity: 1;
}

.liquid-glass .lg-blur {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}
.liquid-glass .lg-blur-1 {
  backdrop-filter: blur(8.3px) saturate(188%);
  -webkit-backdrop-filter: blur(8.3px) saturate(188%);
  mask-image: radial-gradient(ellipse at center, #000 0%, #000 28%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, #000 28%, transparent 70%);
}
.liquid-glass .lg-blur-2 {
  backdrop-filter: blur(16.7px) saturate(188%);
  -webkit-backdrop-filter: blur(16.7px) saturate(188%);
  mask-image: radial-gradient(ellipse at center, transparent 18%, #000 48%, transparent 88%);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 18%, #000 48%, transparent 88%);
}
.liquid-glass .lg-blur-3 {
  backdrop-filter: blur(27.3px) saturate(188%);
  -webkit-backdrop-filter: blur(27.3px) saturate(188%);
  mask-image: radial-gradient(ellipse at center, transparent 45%, #000 78%, #000 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 45%, #000 78%, #000 100%);
}
```

How to adapt it:
1. Select the existing component root or surface element that should become Liquid Glass.
2. Apply the root material: position: relative, isolation: isolate, overflow: hidden, translucent background, backdrop-filter blur/saturate/contrast, border, border-radius, and shadow stack.
3. Add the ::before and ::after highlight layers from the CSS reference. If the styling system cannot express pseudo-elements cleanly, add equivalent absolutely positioned child elements.
4. If progressive blur is enabled, add the three masked blur overlays inside the surface and keep actual content above them with a higher z-index.
5. Preserve the target component's layout, props, accessibility, event handlers, and responsive behavior.
6. Tune text color only as needed for contrast against the existing page backdrop.

Framework guidance:
- Tailwind CSS v4: translate the CSS values into arbitrary utilities and before:/after: variants where practical. Use small child spans for progressive blur overlays when pseudo-element utilities become unreadable.
- Plain CSS, CSS Modules, or Sass: keep the class structure close to the reference CSS, but rename classes to match local conventions.
- Component library or token system: map tint, radius, border, shadow, and overlay colors into local tokens where that is the established pattern.
- Small controls: compress the same material by lowering radius, shadow spread, and overlay intensity while keeping the translucent base, backdrop filter, rim, and specular layers.

Do not:
- Do not copy the demo card content, generated placeholder copy, or sample layout.
- Do not wrap the whole page in a giant background.
- Do not remove existing component behavior to make the material easier.
- Do not return a standalone demo. Return only the code changes needed for the user's target file.
- If the styling approach is still unclear after inspection, ask the user before editing.

Backdrop reference: Aurora. Use it to judge contrast, highlight direction, and color bleed only. Do not export the backdrop itself.