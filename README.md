
  # Trojimperativ Projektu - Interaktivní Vizualizace

  This is a code bundle for Trojimperativ Projektu - Interaktivní Vizualizace. The original project is available at https://www.figma.com/design/TzsTwl3nwcUFnOt67qsruv/Trojimperativ-Projektu---Interaktivn%C3%AD-Vizualizace.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deployment (Vercel)

  This project is configured for deployment on Vercel.

  1. Install Vercel CLI globally (optional): `npm i -g vercel`
  2. Build locally (optional validation): `npm run build`
  3. Preview deploy: `vercel` (first run will ask a few questions)
  4. Production deploy: `npm run deploy`

  Vercel settings if configuring via dashboard:
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Install Command: `npm install`
  - Node.js Version: 18+ (default is fine)

  The file `vercel.json` pins the output directory and enables clean URLs.

  ## Favicon & Icons

  Place icons in `public/`:
  - `public/favicon.svg` (source vector)
  - `public/favicon.ico` (16–32px multi-size)
  - `public/apple-touch-icon.png` (180x180)
  - `public/og-image.png` (social share)

  To generate `favicon.ico` from the SVG (example using Sharp):
  ```bash
  npx sharp -i public/favicon.svg -o public/favicon.ico --width 32
  ```
  Or use an online generator (RealFaviconGenerator) and drop files into `public/`.
  