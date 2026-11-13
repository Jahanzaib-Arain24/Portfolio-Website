# Design reference

Source: https://www.vos.media/
Page: Voice of Spain \| Spain News & International Coverage

Measured from 277 rendered elements at 1600 x 699px. This is a sample of the current document and state, not the original design source.

## Color palette

Only observed CSS colors are listed. Usage labels describe where a color was found. Hex is an sRGB preview; retain the original CSS value for its color space and transparency.

Usage | Original CSS value | sRGB hex | Observed root properties | Occurrences
--- | --- | --- | --- | ---
Text | rgb(17, 17, 17) | #111111 |  | 43
Text | rgb(170, 21, 27) | #AA151B |  | 17
Text | rgb(223, 223, 223) | #DFDFDF |  | 16
Text | rgb(255, 255, 255) | #FFFFFF | --bg, --lt-color-overlay-default, --lt-color-overlay-dark | 14
Text | rgba(255, 255, 255, 0.92) | #FFFFFFEB |  | 13
Text | rgb(153, 153, 153) | #999999 |  | 13
Text | rgba(255, 255, 255, 0.4) | #FFFFFF66 |  | 9
Text | rgba(255, 255, 255, 0.9) | #FFFFFFE6 |  | 5
Text | rgb(71, 85, 105) | #475569 |  | 3
Text | rgb(136, 136, 136) | #888888 |  | 2
Text | rgb(95, 95, 95) | #5F5F5F | --text-light | 1
Text | rgb(30, 41, 59) | #1E293B |  | 1
Surface | rgb(252, 252, 252) | #FCFCFC | --card-bg | 36
Surface | rgb(241, 191, 0) | #F1BF00 | --gold | 21
Surface | rgba(241, 191, 0, 0.75) | #F1BF00BF |  | 12
Surface | rgb(255, 255, 255) | #FFFFFF | --bg, --lt-color-overlay-default, --lt-color-overlay-dark | 6
Surface | rgb(170, 21, 27) | #AA151B |  | 2
Surface | rgb(255, 59, 48) | #FF3B30 |  | 1
Border | rgb(242, 242, 242) | #F2F2F2 |  | 36
Border | rgb(236, 236, 236) | #ECECEC | --border | 5
Border | rgb(247, 247, 247) | #F7F7F7 |  | 4
Border | rgb(241, 191, 0) | #F1BF00 | --gold | 3
Border | rgb(226, 232, 240) | #E2E8F0 |  | 3
Border | rgb(170, 21, 27) | #AA151B |  | 1
Gradient | rgb(170, 21, 27) | #AA151B |  | 3
Gradient | rgb(139, 16, 21) | #8B1015 |  | 2
Gradient | rgb(241, 191, 0) | #F1BF00 | --gold | 1

## Typography

Role | Family | Size | Weight | Line height | Tracking | Text transform
--- | --- | --- | --- | --- | --- | ---
Heading | "Playfair Display", Georgia, serif | 33.6px | 800 | 42px | normal | none
Section heading | "Playfair Display", Georgia, serif | 24.8px | 800 | 39.68px | normal | none
Subheading | Georgia, "Times New Roman", Times, serif | 17.6px | 700 | 28.16px | 1px | uppercase
Body | Georgia, "Times New Roman", Times, serif | 14.72px | 400 | 23.552px | normal | none
Small text | Georgia, "Times New Roman", Times, serif | 13.12px | 400 | 18.368px | normal | none
Button | Georgia, "Times New Roman", Times, serif | 16.8px | 600 | normal | normal | none

## Spacing

Value | Occurrences
--- | ---
4px | 2
6px | 2
6.5px | 26
7px | 8
8px | 11
9.6px | 5
10px | 14
12px | 12
14px | 38
16px | 58
18px | 9
19.2px | 5
21.263px | 2
24px | 1
25px | 2
30px | 2
48px | 1
64px | 1

## Layout gaps

Value | Occurrences
--- | ---
4px | 2
5px | 2
6px | 8
12px | 8
14px | 2
16px | 10
20px | 8
28px | 2

## Corner radii

Value | Occurrences
--- | ---
3px | 4
8px | 144
50% | 80
50px | 16

## Shadows

Value | Occurrences
--- | ---
rgba(0, 0, 0, 0.04) 0px 4px 15px 0px | 36
rgba(0, 0, 0, 0.04) 0px 2px 6px 0px | 3
rgb(255, 255, 255) 0px 0px 9.14179px 0px, rgba(255, 0, 0, 0.784) 0px 0px 3.14179px 0px | 1
rgba(170, 21, 27, 0.3) 0px 3px 8px 0px | 1
rgba(170, 21, 27, 0.35) 0px 4px 12px 0px | 1
rgba(0, 0, 0, 0.1) 0px 3px 12px 0px | 1

## Motion durations

Value | Occurrences
--- | ---
0.25s | 59
0.3s | 41
0.4s | 14
2s | 1
1.5s | 1
0.9s | 1

## Motion easing

Value | Occurrences
--- | ---
cubic-bezier(0.4, 0, 0.2, 1) | 64
ease | 51
cubic-bezier(0.45, 0, 0.55, 1) | 1
ease-in-out | 1

### Accessible keyframe names

- vos-beacon-pulse
- live-bar-shimmer
- live-gold-blink
- live-dot-beacon
- test-dot-beacon
- pulse
- scroll-ticker
- searchFadeIn
- spin
- vosBellPulse

## Component recipes

Computed styles for the captured state. Selectors identify sampled elements; text and placeholders come from the page. Form values are excluded. These style specimens do not reconstruct child markup or uncaptured interaction states.

### Button 1

Observed text or placeholder: Saved

```css
#open-saved-modal-btn {
  align-items: center;
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  border-bottom-color: rgb(255, 255, 255);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(255, 255, 255);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 0px;
  border-right-color: rgb(255, 255, 255);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(255, 255, 255);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(255, 255, 255);
  display: flex;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 16.8px;
  font-weight: 600;
  gap: 6px;
  justify-content: normal;
  letter-spacing: normal;
  line-height: normal;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgb(170, 21, 27) | none | 1

### Button 2

Observed text or placeholder: DONATE NOW

```css
a.donate-footer-btn {
  align-items: center;
  backdrop-filter: none;
  background-color: rgb(255, 255, 255);
  background-image: none;
  border-bottom-color: rgb(170, 21, 27);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(170, 21, 27);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 50px;
  border-right-color: rgb(170, 21, 27);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(170, 21, 27);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 15px 0px;
  color: rgb(170, 21, 27);
  display: inline-flex;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15.2px;
  font-weight: 700;
  gap: 12px;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 24.32px;
  opacity: 1;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgba(0, 0, 0, 0) | linear-gradient(135deg, rgb(170, 21, 27), rgb(241, 191, 0)) | 1

### Button 3

Observed text or placeholder: Learn More

```css
a.footer-action-btn {
  align-items: center;
  backdrop-filter: none;
  background-color: rgb(241, 191, 0);
  background-image: none;
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-bottom-style: solid;
  border-bottom-width: 0.833333px;
  border-left-color: rgba(0, 0, 0, 0.05);
  border-left-style: solid;
  border-left-width: 0.833333px;
  border-radius: 50px;
  border-right-color: rgba(0, 0, 0, 0.05);
  border-right-style: solid;
  border-right-width: 0.833333px;
  border-top-color: rgba(0, 0, 0, 0.05);
  border-top-style: solid;
  border-top-width: 0.833333px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px 0px;
  color: rgb(170, 21, 27);
  display: flex;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15.2px;
  font-weight: 700;
  gap: normal;
  justify-content: center;
  letter-spacing: normal;
  line-height: 24.32px;
  opacity: 1;
  padding-bottom: 8px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 8px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgba(0, 0, 0, 0) | linear-gradient(135deg, rgb(170, 21, 27), rgb(241, 191, 0)) | 1

### Input 1

Observed text or placeholder: Search news...

```css
#header-search-input {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  border-bottom-color: rgb(30, 41, 59);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(30, 41, 59);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 0px;
  border-right-color: rgb(30, 41, 59);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(30, 41, 59);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(30, 41, 59);
  display: block;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15.36px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: 0.2px;
  line-height: normal;
  opacity: 1;
  padding-bottom: 8px;
  padding-left: 0px;
  padding-right: 10px;
  padding-top: 8px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgb(255, 255, 255) | none | 1
3 | rgb(255, 255, 255) | none | 1

### Card 1

Observed text or placeholder: Six Die in Seoni House Fire as Four Others Are Rescued  Nov 10, 2026

```css
a.cat-card {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgb(252, 252, 252);
  background-image: none;
  border-bottom-color: rgb(242, 242, 242);
  border-bottom-style: solid;
  border-bottom-width: 0.833333px;
  border-left-color: rgb(242, 242, 242);
  border-left-style: solid;
  border-left-width: 0.833333px;
  border-radius: 8px;
  border-right-color: rgb(242, 242, 242);
  border-right-style: solid;
  border-right-width: 0.833333px;
  border-top-color: rgb(242, 242, 242);
  border-top-style: solid;
  border-top-width: 0.833333px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 15px 0px;
  color: rgb(51, 51, 51);
  display: flex;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 25.6px;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1

### Card 2

```css
div.cat-card-img-wrap {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  border-bottom-color: rgb(51, 51, 51);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(51, 51, 51);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 0px;
  border-right-color: rgb(51, 51, 51);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(51, 51, 51);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(51, 51, 51);
  display: block;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 25.6px;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgb(252, 252, 252) | none | 1

### Card 3

Observed text or placeholder: Six Die in Seoni House Fire as Four Others Are Rescued  Nov 10, 2026

```css
div.cat-card-body {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  border-bottom-color: rgb(51, 51, 51);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(51, 51, 51);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 0px;
  border-right-color: rgb(51, 51, 51);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(51, 51, 51);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(51, 51, 51);
  display: flex;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 16px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 25.6px;
  opacity: 1;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgb(255, 255, 255) | none | 1
2 | rgb(252, 252, 252) | none | 1

## Layout measurements

Element | Width | Display | Columns | Gap | Padding (T R B L)
--- | --- | --- | --- | --- | ---
header | 1581px | block | none | normal | 25px 0px 25px 0px
footer | 1581px | block | none | normal | 48px 0px 24px 0px

## Responsive conditions

- `(max-width: 1200px)`
- `(max-width: 1024px)`
- `(max-width: 768px)`
- `(max-width: 480px)`
- `(max-width: 900px)`
- `(min-width: 769px)`
- `(max-width: 1366px)`
- `(max-width: 820px)`
- `(max-width: 640px)`
- `(max-width: 1100px)`
- `(max-width: 850px)`
- `(max-width: 550px)`

## CSS custom properties

Names and values read from the root element; no new token names or ramps were generated.

Property | Value
--- | ---
--border | #ececec
--fa-style-family-classic | "Font Awesome 6 Free"
--qb-highlight-underline-offset | 2px
--gold | #f1bf00
--lt-color-gray-900 | #111213
--qb-highlight-grammar-error-emphasized-background-color | rgba(220, 38, 38, 0.1)
--qb-highlight-sentence-from-hover-background-color | rgba(67, 67, 67, 0.1)
--qb-highlight-sentence-from-caret-background-color | rgba(67, 67, 67, 0.1)
--qb-highlight-selection-paraphrase-word-background-color | transparent
--lt-color-border-dark | #c2c9d6
--qb-highlight-selection-toolbox-sentence-background-color | rgb(0, 103, 197, 0.15)
--lt-color-gray-600 | #5e636e
--qb-dialog-drag-handler-height | 16px
--lt-color-gray-100 | #f8f9fc
--lt-shadowActive | 0 0 8px -2px rgba(0, 0, 0, 0.1),0 6px 20px -3px rgba(0, 0, 0, 0.2)
--fa-font-regular | normal 400 1em/1 "Font Awesome 6 Free"
--qb-comp-card-base-background-color | transparent
--qb-highlight-underline-thickness | 2px
--qb-highlight-grammar-error-background-color | transparent
--qb-highlight-sentence-from-caret-underline-color | #00000033
--lt-color-background-default | #f1f3f9
--qb-highlight-grammar-error-emphasized-underline-color | #df2020
--qb-highlight-selection-toolbox-word-underline-color | #00000033
--lt-color-text-light | #5e636e
--bg | #ffffff
--maroon-dark | #8a1116
--lt-color-gray-700 | #2f3237
--qb-highlight-word-from-hover-underline-color | transparent
--fa-font-brands | normal 400 1em/1 "Font Awesome 6 Brands"
--qb-highlight-grammar-error-underline-color | #f2a6a6
--text-light | #5f5f5f
--lt-color-border-light | #f1f3f9
--lt-color-overlay-default | #fff
--qb-highlight-selection-paraphrase-word-underline-color | #0042d7
--lt-color-background-light | #f8f9fc
--lt-color-transparent | rgba(255, 255, 255, 0)
--shadow | 0 4px 15px rgba(0,0,0,0.04)
--qb-dialog-container-width | 320px
--lt-color-border-default | #dee3ed
--qb-highlight-selection-paraphrase-sentence-background-color | rgb(0, 103, 197, 0.15)
--qb-highlight-selection-paraphrase-phrase-underline-color | #0042d7
--qb-highlight-word-from-caret-background-color | rgba(67, 67, 67, 0.1)
--qb-highlight-selection-paraphrase-sentence-underline-color | transparent
--qb-highlight-word-from-hover-background-color | rgba(67, 67, 67, 0.1)
--lt-color-black | #111213
--lt-color-overlay-transparent | rgba(0, 0, 0, 0.1)
--qb-highlight-style-error-background-color | transparent
--qb-highlight-style-error-selected-underline-color | #b4b4b4
--card-bg | #fcfcfc
--lt-shadowDefault | 0 2px 6px -1px rgba(0, 0, 0, 0.16),0 1px 4px -1px rgba(0, 0, 0, 0.04)
--qb-toolbox-onboarding-cta-pulse-color | rgba(23, 135, 51, 0.8)
--qb-highlight-sentence-from-hover-underline-color | transparent
--lt-shadow-website-overlay | 0 0 7px 0 rgba(0, 0, 0, 0.3)
--gold-light | #fff8dc
--qb-highlight-selection-toolbox-phrase-background-color | rgb(0, 103, 197, 0.15)
--qb-highlight-selection-toolbox-word-background-color | rgba(67, 67, 67, 0.1)
--qb-dialog-container-height | 650px
--lt-color-overlay-dark | #fff
--qb-highlight-spelling-error-emphasized-underline-color | #df2020
--qb-highlight-spelling-error-emphasized-background-color | rgba(220, 38, 38, 0.1)

## Capture coverage

- 3 stylesheet(s) could not be inspected. Computed styles are still measured.
- Sampling excludes hidden elements and Sitepeel tools. Offscreen rendered elements may be included. Counts refer to the sample, not the entire website.
- Colors are CSS values, not a screenshot pixel palette. Images, compositing and gradients can affect their visible appearance.
- Hover, focus, active states, other viewport sizes, iframe documents and shadow trees need separate captures.
- No inferred brand personality, invented colors, placeholder copy or unobserved code is presented as a page measurement.
