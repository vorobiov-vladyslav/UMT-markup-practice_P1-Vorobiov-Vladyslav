# Flora

Responsive landing page built to match the Flora Figma design.

## What's inside

- Semantic HTML with 6 sections: hero, about, top-selling bouquets, bouquets grid, testimonials, contact
- Mobile-first CSS with three breakpoints: **375 / 768 / 1440**
- SVG sprite (`images/icons.svg`) referenced via `<use href="...#icon-name">`
- Mobile burger menu (vanilla JS, closes on Esc / resize to desktop)
- AOS scroll animations via CDN
- Google Fonts: Hanuman (headings) + Roboto (body)
- W3C-valid HTML and CSS

## Structure

```
index.html
css/styles.css
js/menu.js
images/            # photos, logos, icons.svg sprite
favicon.svg
```

## Run locally

Any static server works. From the project root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Validate

HTML:
```bash
curl -s -H "Content-Type: text/html; charset=utf-8" \
  --data-binary @index.html "https://validator.w3.org/nu/?out=json"
```

CSS:
```bash
curl -s "https://jigsaw.w3.org/css-validator/validator?profile=css3svg&output=json" \
  --data-urlencode "text@css/styles.css"
```
