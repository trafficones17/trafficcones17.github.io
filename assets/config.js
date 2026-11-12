/* =====================================================================
   SITE SETTINGS — edit this file to change details across EVERY page.
   Anything in "quotes" is text you can safely change.
   ===================================================================== */

window.SITE = {
  // Your business name (shows in the header, footer and page titles)
  name: "AI Workshop",

  // Logo image shown in the header (leave "" to show the name as text)
  logo: "assets/img/logo-wordmark.png",

  // Short line shown under the name in the footer
  tagline: "Practical AI workshops for real people and real jobs.",

  // Contact email (shown on the Contact section and in the footer)
  email: "baedigitalwork25@gmail.com",

  // Legal details used on the policy pages
  legalName: "AI Workshop",
  location: "Indiana",
  policyDate: "November 12, 2026",

  // Social links — replace "#" with your real profile links.
  // Delete a line to remove that icon.
  social: [
    { label: "Instagram", url: "https://www.instagram.com/ai_workshop_4u/" },
    { label: "YouTube",   url: "https://www.youtube.com/channel/UCu90jvy49rBBJC1hwT8cxNA" }
  ],

  /* -------------------------------------------------------------------
     PRODUCTS
     To add a product, copy one { ... } block, paste it below the last
     one (keep the comma between blocks) and change the details.

     status:  "available"   -> shows price and a Buy button
              "coming-soon" -> shows a "Coming soon" label instead
     buyUrl:  paste your checkout link here (Gumroad, Lemon Squeezy,
              Payhip, Stripe Payment Link...). Leave "" until you have one.
     page:    the product's own page on this site (optional).
     image:   cover picture for the product card (optional).
     ------------------------------------------------------------------- */
  products: [
    {
      id: "workbook-older-adults",
      title: "AI at Work: A Workbook for Older Adults",
      audience: "For workers 50+",
      description: "Four weeks, ten minutes a day. Get confident using an AI assistant on real work tasks, with 24 copy-and-paste prompts and three worked examples.",
      price: "$24.99",
      format: "16-page PDF · instant download",
      image: "assets/img/workbook-card.jpg",
      status: "available",
      page: "workbook.html",
      buyUrl: "https://ai-workshop.lemonsqueezy.com/checkout/buy/ccfd6f1c-84ad-4e44-a829-01836c2f4e3f"
    },
    {
      id: "ai-healthcare",
      title: "AI for Healthcare Workers",
      audience: "Field-specific",
      description: "Save time on notes, scheduling and patient communication while staying careful about privacy.",
      price: "",
      format: "Digital workshop",
      status: "coming-soon",
      page: "",
      buyUrl: ""
    },
    {
      id: "ai-small-business",
      title: "AI for Small Business Owners",
      audience: "Field-specific",
      description: "Use AI for marketing, customer emails, bookkeeping prep and planning — without hiring extra help.",
      price: "",
      format: "Digital workshop",
      status: "coming-soon",
      page: "",
      buyUrl: ""
    }
  ]
};
