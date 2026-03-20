# ContentPrompt — Bolån (bolanfaq.se)

## What this site is

Bolån (bolanfaq.se) is a Swedish-language resource about mortgages, housing interest rates, the Swedish property market, and personal finance related to homeownership. It targets Swedish homebuyers — first-timers and experienced alike — who want clear, practical, trustworthy guidance on bolån (mortgages).

The site is built with Astro and uses markdown content collections. Every article lives in `src/content/faq/` as a `.md` file.

---

## Content scope

Articles must fall within one of four categories:

| Category slug      | Name             | Description                                                         |
| ------------------ | ---------------- | ------------------------------------------------------------------- |
| `bolanerantor`     | Bolåneräntor     | Current rates, forecasts, Riksbanken decisions, binding vs floating |
| `bostadsmarknaden` | Bostadsmarknaden | Price trends, regional analysis, supply/demand drivers              |
| `amortering`       | Amortering       | Amortization requirements, debt-to-income rules, payoff strategies  |
| `guider`           | Guider           | Step-by-step guides for buying, refinancing, moving                 |

Do **not** write about topics outside Swedish housing and mortgage finance. Tangentially related personal finance topics (e.g., savings accounts, stock investing) are only acceptable when directly tied to a mortgage decision.

---

## Required frontmatter

Every article must have this YAML frontmatter block:

```yaml
---
title: "Max 100 characters"
description: "Max 200 characters — used for meta description and cards"
category: "one of: bolanerantor | bostadsmarknaden | amortering | guider"
tags: ["bolån", "relevant", "keywords"]
pubDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD # set this when updating an existing article
author: "Name" # highly recommended for Google E-E-A-T and JSON-LD
featured: false # true for max 2 articles at a time
draft: false # true to hide from production
ogImage: "/images/faq/slug.jpg" # critical for social sharing and JSON-LD image property
---
```

---

## Research requirements

Before writing or updating any article, you **must**:

### 1. Search the web for latest news

- Search for the topic in Swedish (e.g., "bolåneräntor 2026", "bostadspriser Stockholm mars 2026").
- Use multiple queries: general news, bank-specific announcements, Riksbanken press releases.
- Prioritize sources from the last 30 days. Discard anything older than 6 months unless it's foundational context.

### 2. Check Riksbanken and major banks

- Look up Riksbanken's latest styrränta decision and forward guidance.
- Check current listed rates from at least 3 banks (e.g., SBAB, Nordea, Handelsbanken, SEB, Swedbank, Skandia, Länsförsäkringar).
- Note the date when rates were checked — include it in the article.

### 3. Research Google Trends for Sweden

- Search Google Trends (region: Sweden) for relevant terms: "bolåneränta", "bostadspriser", "amortering", "binda räntan", "lånelöfte", etc.
- Identify rising or breakout queries — these signal what readers are currently searching for.
- Use trending queries to shape the article angle or add a timely section.

### 4. Check Svensk Mäklarstatistik and SCB

- For price-related articles, pull the latest data from Svensk Mäklarstatistik (mäklarstatistik.se) or SCB (Statistiska centralbyrån).
- Include specific numbers: median price per sqm, year-over-year change, regional breakdowns.

### 5. Review expert forecasts

- Look for recent forecasts from banks, Konjunkturinstitutet, Boverket, or housing market analysts.
- Present at least two different perspectives when opinions diverge.

---

## Reference and source rules

- **Always cite your sources.** Name the institution or publication (e.g., "Enligt SBAB:s senaste prognos...", "Riksbanken meddelade den 15 mars att...").
- **Include specific data points** — exact percentages, dates, price levels. Vague claims like "räntorna har gått ner" without numbers are not acceptable.
- **Date-stamp time-sensitive information.** Use phrases like "I skrivande stund (mars 2026)" or "Enligt data från februari 2026".
- **Do not fabricate statistics.** If you cannot verify a number from a reliable source, say "uppgifter saknas" or omit the claim.
- **Weave references into the narrative** — this site does not use footnotes or numbered citations. Sources are named inline (e.g., "Nordea spår att...").

---

## Writing tone and style

- **Language:** Swedish. All content, headings, and UI text in Swedish.
- **Address the reader as "du"** — direct, personal, conversational.
- **Be practical and actionable.** Every article should answer "what should I do?" not just "what is happening?"
- **Explain jargon.** When using terms like belåningsgrad, skuldkvot, or räntebindningstid, briefly explain what they mean for readers who may be new to the topic.
- **Use reassuring and encouraging language** when addressing first-time buyers or complex topics. Acknowledge that mortgages can feel overwhelming.
- **Be balanced.** Present pros and cons. Avoid recommending a specific bank or product.
- **Keep paragraphs short** — 2-4 sentences max. Use plenty of subheadings, bullet lists, and bold text for scannability.

---

## Article structure

Follow this template:

```markdown
![Descriptive alt text](../../assets/images/faq/slug.jpg)

## Main heading — engaging, question-based or action-oriented

Introduction paragraph (2-3 sentences). Set context: why this matters right now, who it's for.

### Section 1 heading

Content...

### Section 2 heading

Content...

### Tips / Checklista / Vanliga frågor

Practical takeaways, lists, or FAQ-style subheadings.

### Sammanfattning

3-5 sentence wrap-up. Reinforce key takeaway and next action.

---

_Senast uppdaterad: DD månad YYYY_
```

### Length guidelines

- Market updates and rate articles: 1,500–2,500 words
- In-depth guides: 2,500–4,000 words
- Explainer articles: 1,000–2,000 words

---

## Content patterns to use

- **Blockquotes for important callouts:**

  > **Viktigt att komma ihåg:** This pattern is used for key warnings or essential info.

- **Bold key figures inline:** "Styrräntan ligger på **2,25%**"
- **Numbered lists for sequential steps** (guides)
- **Bullet lists for pros/cons or tips**
- **Comparison sections** with clear "Rörlig ränta kan vara rätt om du..." / "Binda räntan kan vara rätt om du..." structure
- **Checklist sections** using bullet points with bold lead-in text for action items

---

## What NOT to do

- Do not write in English. Everything must be in Swedish.
- Do not invent statistics, rates, or forecasts. Everything must be sourced from real, verifiable data.
- Do not recommend specific banks or financial products. Stay neutral and informative.
- Do not use clickbait or sensationalist language ("CHOCK: Räntorna rasar!").
- Do not copy-paste from other sites. All text must be original.
- Do not add emojis to articles.
- Do not include promotional content or affiliate links.
- Do not write articles that are purely historical with no actionable takeaway for today's reader.
- Do not create extremely short articles (< 800 words) — they don't provide enough value.

---

## Updating existing articles

When updating an article rather than creating a new one:

1. Set `updatedDate` in frontmatter to today's date.
2. Keep the same slug and file name.
3. Update all statistics and rate figures to current values.
4. Add a note if the situation has materially changed (e.g., "Uppdatering mars 2026: Riksbanken sänkte styrräntan ytterligare...").
5. Keep the "Senast uppdaterad" line at the bottom current.

---

## Image handling

- Hero images go in `src/assets/images/faq/` with the article slug as filename.
- Reference them with relative paths: `![Alt text](../../assets/images/faq/slug.jpg)`
- Alt text should be descriptive and in Swedish.
- If no image is available, omit the image line — the site handles missing images gracefully.

---

## SEO considerations

- **Title:** Should contain the primary keyword naturally. Keep under 60 characters for SERP display.
- **Description:** Include a call-to-action or value proposition. Keep under 155 characters for best SERP display.
- **Tags:** Include 3-7 relevant Swedish keywords. Always include "bolån" as a base tag.
- **Slug (filename):** Use lowercase, hyphen-separated Swedish words. Include the year for time-sensitive topics (e.g., `bolanerantor-2026.md`).
- **Headings:** Use H2 for the main title section, H3 for subsections. Include keywords naturally — do not stuff.
- **Structured Data (JSON-LD):** All articles must include proper Schema.org `Article` and `FAQPage` (if applicable) structured data to rank high in Google rich results. This is handled by the Astro template (`src/pages/article/[slug].astro`), so ensure the markdown frontmatter (`title`, `description`, `pubDate`, `updatedDate`, `author`, `tags`, `ogImage`) is always fully and accurately populated to feed the JSON-LD generator.
