# Ariihant Classes Website

Fresh Jekyll website for Ariihant Classes using Tailwind CSS CDN, Font Awesome CDN, Google Fonts, and responsive static pages.

## Pages

- Home
- About
- Courses
- Gallery
- Founder
- Registration
- Enrollment
- Contact

## Local Development

Install Jekyll dependencies, then run:

```bash
bundle install
```

Start the local server:

```bash
bundle exec jekyll serve
```

## Cloudflare Pages

Use these build settings:

- Build command: `bundle exec jekyll build`
- Build output directory: `_site`
- Ruby version: use Cloudflare's default supported Ruby runtime or set `RUBY_VERSION` if your account requires it.

## Gallery Images

Gallery content is stored in `_data/gallery.yml`. Replace placeholder `placehold.co` image URLs with local image paths later, for example `/assets/gallery/photo-1.jpg`.

## Logo

The site currently uses `assets/images/logo.svg`. Replace this file with the final uploaded logo or update `logo` in `_config.yml`.
