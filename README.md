# Invitation Website Template

This is a configurable HTML/CSS/JS invitation website designed for weddings, engagements, birthdays, Valentine's Day, and other special occasions. The first iteration is intentionally built so future client edits happen mostly in one place: [`config.js`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/config.js).

## Main editable file

Open [`config.js`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/config.js) to change:

- `coupleNames`: one string used across the whole site for the names.
- `monogram`: top navigation and music disc initials/label.
- `siteTitle`: browser tab title.
- `eventType`, `eventDateISO`: event type and countdown target.
- `unlockUploadsOnDate`, `allowUploadsAnytime`: controls guest photo upload locking.
- `theme.colors`: full color palette.
- `theme.fonts`: heading and body font families.
- `theme.fontEmbedUrl`: the Google Fonts import URL for your chosen fonts.
- `media.heroImage`: main hero image.
- `media.galleryImages`: photo list for the gallery section.
- `media.audioSrc`: music/song file URL.
- `text.*`: all main written content on the page.
- `venue.*`: venue name, city, address, and map link.
- `storyHighlights`, `timeline`, `schedule`, `rsvpContacts`, `faq`, `dressPalette`: reusable section content arrays.
- `visibility.*`: show or hide whole sections.
- `subBlocks.*`: show or hide smaller parts inside sections.
- `elementVisibility.*`: show or hide individual interface elements like quick links, hero buttons, upload toolbar parts, and cards.
- `rsvp.submitMode` and `rsvp.submitTarget`: controls what RSVP submit does.
- `upload.*`: controls guest media uploads, accepted file types, target endpoint, Drive folder link, and upload behavior.

## Where to change visuals

- Colors: [`config.js`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/config.js)
  Change `theme.colors`.

- Fonts: [`config.js`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/config.js)
  Change `theme.fonts.heading`, `theme.fonts.body`, and `theme.fontEmbedUrl`.

- Layout and section structure: [`index.html`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/index.html)

- Styling, animations, mobile responsiveness, decorative flowers/background effects: [`styles.css`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/styles.css)

- Behavior like countdown, scroll animation, upload lock, RSVP action, and music player: [`script.js`](C:/Users/hassa/Documents/Codex/2026-05-07/invitation-website-today-we-are-back/script.js)

## How to replace images

Right now the template uses remote demo images so you can preview it quickly. For real client work, replace those URLs in `config.js` with:

- Local file paths relative to the project, such as `assets/images/hero.jpg`
- Or hosted image URLs

Suggested structure:

```text
assets/
  images/
    hero.jpg
    gallery-1.jpg
    gallery-2.jpg
  audio/
    theme-song.mp3
```

If you want, you can create those folders and point `media.heroImage`, `media.galleryImages`, and `media.audioSrc` to them.

## Section toggles

To hide or show full sections, edit `visibility` inside `config.js`:

```js
visibility: {
  countdown: true,
  story: true,
  gallery: true,
  details: true,
  music: true,
  upload: true,
  rsvp: true,
  extras: true
}
```

To hide or show smaller pieces inside a section, edit `subBlocks`:

```js
subBlocks: {
  heroSummary: true,
  storyHighlights: true,
  timeline: true,
  schedule: true,
  guestbook: true,
  dressPalette: true,
  faq: true,
  rsvpContacts: true
}
```

## Upload section note

The upload section now supports selecting multiple photos and videos and submitting them with a dedicated button.

- File types come from `upload.acceptedTypes`
- Maximum selection count comes from `upload.maxFiles`
- The submit destination comes from `upload.submitTarget`
- The folder shortcut button uses `upload.driveFolderLink`
- `upload.requestMode` defaults to `"no-cors"` for common Google Apps Script deployments

Important:

- A normal shared Google Drive folder URL is not enough to upload files directly from a static website.
- For real uploads to Google Drive, `upload.submitTarget` should point to an upload endpoint such as a Google Apps Script web app or another backend that receives the files and saves them into Drive.
- The current UI converts selected files to base64 and sends JSON to an upload endpoint such as Google Apps Script.

This section also still supports date locking:

- `unlockUploadsOnDate`
- `allowUploadsAnytime`

## RSVP note

Current RSVP behavior is configurable:

- `submitMode: "mailto"` opens email with the RSVP message.
- `submitMode: "link"` opens a custom external link.
- You can later wire it to a backend endpoint if needed.

## Features included in this iteration

- Fully responsive mobile-first invitation experience
- Central config for names, content, colors, fonts, and visibility
- Extra fine-grained element visibility controls
- Countdown to the event day
- Interactive rotating-disc music player
- Guest photo and video upload area with configurable lock behavior and submit button
- Story timeline
- Schedule/details section
- FAQ
- Palette/dress code area
- Quick jump button to the location/details area
- Decorative animated backgrounds and scroll reveal transitions

## Suggested next iteration

- Connect RSVP to a real database or form endpoint
- Connect photo uploads to cloud storage
- Add multilingual support from config
- Add per-client theme presets
- Add optional floating navigation or invitation intro screen
