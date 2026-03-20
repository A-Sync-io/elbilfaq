# How to generate new FAQ header images

This repository contains an automated script to generate high-quality, abstract, text-free header images for your markdown articles using Google's Gemini and Imagen APIs.

## Instructions

1. Whenever you add a new `.md` or `.mdx` file to `src/content/` (or any of its subfolders like `faq/`), simply run the script.
2. Open your terminal in the root of the project (`bolanfaq/`).
3. Export your Gemini API key so the script can use it:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
4. Run the Python script:
   ```bash
   python scripts/generate_faq_headers.py
   ```

The script will automatically detect any new markdown files, generate an appropriate visual abstract concept, download the image to `public/images/`, and update the frontmatter of your markdown files. Files that already have images will be safely skipped!
