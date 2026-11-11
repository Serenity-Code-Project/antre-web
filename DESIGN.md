---
name: Antre
colors:
  background: "#fafaf8"
  foreground: "#1c1a15"
  surface: "#ffffff"
  muted: "#5c5648"
  line: "#d4cebf"
  accent: "#4f46e5"
  on-accent: "#ffffff"
  danger: "#b42318"
  danger-surface: "#fdecea"
  stale: "#736d60"
typography:
  family: "Geist, system-ui, sans-serif"
  label: 14px
  body: 16px
  current: 96px
spacing: [8px, 12px, 20px, 28px, 32px, 48px]
rounded:
  control: 8px
  card: 12px
---

## Overview
A queue board read from across a waiting room. One huge number, little else.
The board never pretends: when it cannot reach the server it says so.

## Colors
foreground for the number and body text. muted for labels. line for borders only, never text.
accent only for the Ambil Nomor button. danger only for failure messages.
stale for numbers that may be out of date. Values live in app/globals.css.

## Typography
One family. The called number uses current with tabular numerals. No text under 14px.

## Layout
One column, at most 560px wide, centred. Mobile first.

## Elevation & Depth
No shadows. Cards use a 1px line border.

## Shapes
control for buttons, chips and the notice. card for the called-number card.

## Components
Board card, next-number chips, Ambil Nomor button.
States.
Loading. "Memuat" under the number, until the first answer or the first failure.
Empty. "Belum ada yang menunggu" in place of the chips.
Stale. A notice above the card, role alert. The last numbers stay visible in the stale
colour. The board keeps retrying every 3 seconds and the notice clears on the next good answer.
Take failed. One line under the button in the danger colour.

## Do's and Don'ts
Use the variables. No raw colour values outside app/globals.css.
One theme, light. A dark theme is not designed yet.

## Checks
grep -rnE "#[0-9a-fA-F]{3,8}\b" app --include="*.css" --include="*.tsx" | grep -v "app/globals.css"
