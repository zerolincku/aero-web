# UI Layout Density

This project uses a compact enterprise-admin density model. Colors stay on the
current theme; these rules only govern spacing, component density, borders,
radius, and elevation.

## Tokens

The source of truth lives in `src/index.css`.

| Token | Value | Use |
| --- | ---: | --- |
| `--ui-radius` | `6px` | Cards, controls, menus, dialogs |
| `--ui-page-padding` | `24px` | Main content padding on desktop |
| `--ui-page-padding-mobile` | `16px` | Main content padding on small screens |
| `--ui-section-gap` | `16px` | Gap between sections and cards |
| `--ui-panel-padding` | `16px` | Card, popover, and sheet content padding |
| `--ui-field-gap` | `6px` | Gap between form labels and controls |
| `--ui-control-height-sm` | `32px` | Small controls |
| `--ui-control-height` | `36px` | Default form controls and buttons |
| `--ui-control-height-lg` | `40px` | Prominent controls |
| `--ui-table-header-height` | `40px` | Table header row |
| `--ui-table-row-height` | `48px` | Table body rows |
| `--ui-shadow-card` | subtle | Static panels and cards |
| `--ui-shadow-overlay` | medium | Popovers, dialogs, menus, sheets |

## Rules

- Prefer borders over shadows for static page structure.
- Use shadow only for floating layers: popovers, dialogs, sheets, command
  palette, and dropdowns.
- Keep page sections unframed unless the content is a distinct repeated item or
  tool surface.
- Use 16px as the default vertical rhythm inside admin workflows.
- Tables should stay readable at 48px rows; use 40px headers.
- Forms should default to 36px controls with 16px row gaps.
- Do not change product colors when adjusting density.
