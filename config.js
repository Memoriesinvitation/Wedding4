window.invitationConfig = {
  siteTitle: "Ayla & Sam | Wedding Invitation",
  coupleNames: "Ayla & Sam",
  monogram: "A | S",
  eventType: "Wedding Celebration",
  eventDateISO: "2026-09-28T18:00:00",
  unlockUploadsOnDate: true,
  allowUploadsAnytime: true,
  theme: {
    colors: {
      primary: "#2E3604",
      secondary: "#4E5E07",
      accent: "#E19D29",
      blush: "#D8D2CF",
      stone: "#8D8179",
      canvas: "#f6f0ea",
      ink: "#231815",
      white: "#fffdf9"
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Manrope', sans-serif"
    },
    fontEmbedUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
  },
  media: {
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    ],
    audioSrc: "assets/audio/Taylor Swift - I Think He Knows (Official Audio).mp3"
  },
  text: {
    heroEyebrow: "Together with their families",
    heroSubtitle: "invite you to a night of joy, flowers, and forever memories",
    heroSummary:
      "A flexible invitation template crafted for weddings, engagements, birthdays, Valentine's Day, and every special occasion worth celebrating beautifully.",
    heroBadge: "Save the Date",
    heroPrimaryCta: "Reserve Your Spot",
    storyTitle: "Built to feel personal, while staying easy to reuse",
    storyBody:
      "Use this section to tell the story of the couple, the event theme, or a welcome note for guests. The names, colors, fonts, sections, and sub-sections are all controlled from one config file.",
    detailsHeading: "A smooth guest experience from the first tap to the event day",
    dressCodeText: "Garden formal in warm neutrals, olive accents, and a touch of gold.",
    eventNotes:
      "Please arrive 30 minutes before the ceremony. Children are welcome. Parking and valet details can be added here.",
    songTitle: "A keepsake song hidden inside the invitation",
    songDescription:
      "Swap in your own music file and let guests discover it with an animated vinyl player that spins to life when the music starts.",
    songCredit: "Spring Romance",
    uploadDescription:
      "This section can stay locked until the wedding day, or it can remain open at all times with one config change.",
    uploadDropzoneTitle: "Tap to choose celebration photos and videos",
    uploadDropzoneHint:
      "Guests can select multiple photos and videos, preview them here, then submit them to your configured upload link.",
    uploadTargetHint:
      "Use a Google Apps Script or upload endpoint that saves files into your Google Drive folder.",
    uploadSubmitLabel: "Submit Photos & Videos",
    uploadSuccessMessage: "Your memories were sent successfully.",
    uploadErrorMessage: "Upload failed. Please try again.",
    rsvpTitle: "A simple RSVP section you can remove anytime",
    rsvpDescription:
      "Use the built-in form for a first iteration, or replace the action with your preferred WhatsApp link, Google Form, or booking flow.",
    guestbookTitle: "Guestbook-style greeting",
    guestbookText:
      "Add a heartfelt prompt here, such as asking guests to prepare a short note, blessing, or favorite memory to share during the celebration.",
    paletteTitle: "Color notes for outfits or florals",
    faqTitle: "Quick answers before the big day",
    footerMessage: "With love, we look forward to celebrating together."
  },
  venue: {
    name: "The Garden Pavilion",
    city: "Cairo, Egypt",
    fullAddress: "18 Palm View Road, New Cairo",
    mapUrl: "https://maps.google.com/?q=The+Garden+Pavilion+Cairo"
  },
  storyHighlights: [
    "Your story highlight!",
  ],
  timeline: [
    {
      label: "First Hello",
      date: "2019",
      text: "The perfect short story beat, meeting date, or milestone can be placed here."
    },
    {
      label: "The Promise",
      date: "2025",
      text: "Use this for the engagement, proposal, or the big step that led to the event."
    },
    {
      label: "Celebration Day",
      date: "2026",
      text: "A final note about the day guests are invited to share with you."
    }
  ],
  schedule: [
    {
      time: "5:30 PM",
      title: "Guest Arrival",
      text: "Welcome drinks and floral photo moments."
    },
    {
      time: "6:00 PM",
      title: "Ceremony",
      text: "The main celebration begins."
    },
    {
      time: "7:30 PM",
      title: "Dinner & Music",
      text: "A beautiful dinner followed by live music and dancing."
    }
  ],
  rsvpContacts: [
    { label: "WhatsApp", value: "+20 100 000 0000" },
    { label: "Email", value: "hello@example.com" }
  ],
  faq: [
    {
      question: "Can I bring a plus one?",
      answer: "Update this answer from the config depending on the event rules."
    },
    {
      question: "Is there parking?",
      answer: "Yes, valet parking is available at the venue entrance."
    },
    {
      question: "Can I upload photos later?",
      answer: "Yes. Guests can return to the same link once uploads are unlocked."
    }
  ],
  visibility: {
    countdown: true,
    story: true,
    gallery: true,
    details: true,
    music: true,
    upload: true,
    rsvp: true,
    extras: true
  },
  subBlocks: {
    heroSummary: true,
    storyHighlights: true,
    timeline: true,
    schedule: true,
    guestbook: true,
    dressPalette: false,
    faq: true,
    rsvpContacts: true
  },
  elementVisibility: {
    locationQuickLink: true,
    heroPrimaryLink: true,
    heroActions: true,
    heroButtonLabel: true,
    heroDetailsLink: true,
    heroCards: true,
    heroDateCard: true,
    heroVenueCard: true,
    heroCityCard: true,
    uploadStatus: true,
    uploadToolbar: true,
    uploadFolderLink: false,
    uploadSubmit: true,
    rsvpContacts: true
  },
  dressPalette: ["#2E3604", "#4E5E07", "#E19D29", "#D8D2CF", "#8D8179"],
  rsvp: {
    submitMode: "googleSheets",
    submitTarget: "https://script.google.com/macros/s/AKfycbxPmhqI8z82cSGNl1QW1C-VFxcznKaFsIbSOB99pBPIBQziaH2w6QWzeRSHUpKG9u1F/exec"
  },
  upload: {
    submitMode: "endpoint",
    submitTarget: "https://script.google.com/macros/s/AKfycbxPmhqI8z82cSGNl1QW1C-VFxcznKaFsIbSOB99pBPIBQziaH2w6QWzeRSHUpKG9u1F/exec",
    driveFolderLink: "https://drive.google.com/drive/folders/16HrHvlbz13AyBcufG7eNQM3UohBNpRGr",
    requestMode: "cors",
    acceptedTypes: "image/*,video/*",
    maxFiles: 20,
    openFolderLinkInToolbar: true
  }
};
