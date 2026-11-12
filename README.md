# Website: how to edit

## Quick changes (one file changes every page)
Open `assets/config.js` to change:
- Business name, tagline, email
- Social media links
- Legal name, location and policy date (used on the policy pages)
- **Products**: add one by copying a `{ ... }` block. Set `status` to `"available"` and paste the checkout link into `buyUrl`.

## Colors and fonts
Open `assets/styles.css`. The first block (`:root`) controls the colors for the whole site.

## Page text
Each page is its own file: `index.html` (Home), `workbook.html`, `about.html` (About + Contact),
`faq.html`, `refund.html`, `privacy.html`, `terms.html`. Edit the words between the tags.

## Photos
Gray boxes with a caption (`<div class="ph ...">`) are photo placeholders. To use a real photo:
1. Upload the image into an `images/` folder.
2. Replace the placeholder `<div class="ph ..."> ... </div>` with
   `<img src="images/your-photo.jpg" alt="Short description of the photo" style="border-radius:12px">`

## Selling the PDF
Don't put paid PDFs in this repository, because GitHub Pages sites are public.
Upload the PDF to your checkout platform (Gumroad, Lemon Squeezy, Payhip, etc.).
It only sends the download link to people who have paid.
Paste the product's checkout link into `buyUrl` in `assets/config.js`.
