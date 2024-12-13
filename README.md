# What's this?

Griffin Sloves' personal website. Enjoy!

www.griffinsloves.com

# Features / Tech used

Built from this template website (Also created by Griffin Sloves) - https://github.com/GriffinSSloves/WebsiteTemplate

- Typescript
- React
- TailwindCSS
- ShadCN base components
- React Router Dom
- Pnpm for package management
- EsLint
- Prettier

# Dev Instructions

1. `pnpm install`
2. `pnpm build` - You only have to run this the first time
3. Run this script to optimize images: makes the site run faster
   a. `pnpm optimize-images`
4. `pnpm dev`

# Deployment Instructions

1. `pnpm build`
2. copy dist folder to web server using FileZilla
    - (Ignore well_known folder, .ftpquota file, and error_log file)
