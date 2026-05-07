(function () {
  const config = window.invitationConfig;

  if (!config) {
    return;
  }

  const $ = (id) => document.getElementById(id);
  const sectionNodes = document.querySelectorAll("[data-section]");
  const blockNodes = document.querySelectorAll("[data-block]");
  const visibilityNodes = document.querySelectorAll("[data-visible-key]");
  let selectedUploadFiles = [];

  function getVisibilityValue(key) {
    if (!key) {
      return undefined;
    }

    if (config.elementVisibility && key in config.elementVisibility) {
      return config.elementVisibility[key];
    }

    if (config.subBlocks && key in config.subBlocks) {
      return config.subBlocks[key];
    }

    if (config.visibility && key in config.visibility) {
      return config.visibility[key];
    }

    return undefined;
  }

  function setHiddenState(node, shouldShow) {
    if (!node) {
      return;
    }

    node.hidden = !shouldShow;

    if (shouldShow) {
      node.removeAttribute("hidden");
    } else {
      node.setAttribute("hidden", "hidden");
    }
  }

  function isVisibleByKey(key) {
    const value = getVisibilityValue(key);
    return value !== false;
  }

  function applyTheme() {
    document.title = config.siteTitle;
    const root = document.documentElement;
    const colors = config.theme.colors;
    Object.entries(colors).forEach(([name, value]) => {
      root.style.setProperty(`--color-${name}`, value);
    });
    root.style.setProperty("--font-heading", config.theme.fonts.heading);
    root.style.setProperty("--font-body", config.theme.fonts.body);

    const fontLink = $("dynamic-font-link");
    if (fontLink && config.theme.fontEmbedUrl) {
      fontLink.href = config.theme.fontEmbedUrl;
    }
  }

  function setText(id, value) {
    const node = $(id);
    if (node && value !== undefined) {
      node.textContent = value;
    }
  }

  function setHtml(id, value) {
    const node = $(id);
    if (node && value !== undefined) {
      node.innerHTML = value;
    }
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = typeof reader.result === "string" ? reader.result : "";
        const base64 = result.includes(",") ? result.split(",")[1] : result;

        resolve({
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          base64
        });
      };

      reader.onerror = () => {
        reject(new Error(`Could not read file: ${file.name}`));
      };

      reader.readAsDataURL(file);
    });
  }

  function applyContent() {
    setText("coupleNames", config.coupleNames);
    setText("navMonogram", config.monogram);
    setText("songMonogram", config.monogram);
    setText("heroEyebrow", config.text.heroEyebrow);
    setText("heroSubtitle", config.text.heroSubtitle);
    setText("heroSummary", config.text.heroSummary);
    setText("heroBadge", config.text.heroBadge);
    setText("heroButtonLabel", config.text.heroPrimaryCta);
    setText("eventDate", formatEventDate(config.eventDateISO));
    setText("venueName", config.venue.name);
    setText("venueCity", config.venue.city);
    setText("storyTitle", config.text.storyTitle);
    setText("storyBody", config.text.storyBody);
    setText("detailsHeading", config.text.detailsHeading);
    setText("detailsVenue", `${config.venue.name}, ${config.venue.fullAddress}, ${config.venue.city}`);
    setText("dressCodeText", config.text.dressCodeText);
    setText("eventNotes", config.text.eventNotes);
    setText("songTitle", config.text.songTitle);
    setText("songDescription", config.text.songDescription);
    setText("songCredit", config.text.songCredit);
    setText("uploadDescription", config.text.uploadDescription);
    setText("uploadDropzoneTitle", config.text.uploadDropzoneTitle);
    setText("uploadDropzoneHint", config.text.uploadDropzoneHint);
    setText("uploadTargetHint", config.text.uploadTargetHint);
    setText("uploadSubmit", config.text.uploadSubmitLabel);
    setText("rsvpTitle", config.text.rsvpTitle);
    setText("rsvpDescription", config.text.rsvpDescription);
    setText("guestbookTitle", config.text.guestbookTitle);
    setText("guestbookText", config.text.guestbookText);
    setText("paletteTitle", config.text.paletteTitle);
    setText("faqTitle", config.text.faqTitle);
    setText("footerMessage", config.text.footerMessage);

    const heroImage = $("heroImage");
    if (heroImage) {
      heroImage.src = config.media.heroImage;
      heroImage.alt = `${config.coupleNames} invitation visual`;
    }

    const audio = $("eventAudio");
    if (audio) {
      audio.src = config.media.audioSrc;
    }

    const mapLink = $("mapLink");
    if (mapLink) {
      mapLink.href = config.venue.mapUrl;
    }

    const heroPrimaryLink = $("heroPrimaryLink");
    if (heroPrimaryLink) {
      heroPrimaryLink.textContent = config.text.heroPrimaryCta;
    }

    const locationQuickLink = $("locationQuickLink");
    if (locationQuickLink) {
      locationQuickLink.textContent = "Jump to Location";
    }

    const uploadFolderLink = $("uploadFolderLink");
    if (uploadFolderLink) {
      uploadFolderLink.href = config.upload.driveFolderLink || "#";
      uploadFolderLink.setAttribute("aria-disabled", config.upload.driveFolderLink ? "false" : "true");
    }

    const photoInput = $("photoInput");
    if (photoInput && config.upload.acceptedTypes) {
      photoInput.accept = config.upload.acceptedTypes;
    }
  }

  function applyVisibility() {
    sectionNodes.forEach((section) => {
      const key = section.dataset.section;
      setHiddenState(section, isVisibleByKey(key));
    });

    blockNodes.forEach((block) => {
      const key = block.dataset.block;
      setHiddenState(block, isVisibleByKey(key));
    });

    setHiddenState($("heroSummary"), isVisibleByKey("heroSummary"));
    setHiddenState($("storyHighlights"), isVisibleByKey("storyHighlights"));
    setHiddenState($("timelineList"), isVisibleByKey("timeline"));
    setHiddenState($("scheduleList"), isVisibleByKey("schedule"));
    setHiddenState($("contactChips"), isVisibleByKey("rsvpContacts"));

    visibilityNodes.forEach((node) => {
      const key = node.dataset.visibleKey;
      setHiddenState(node, isVisibleByKey(key));
    });

    if (config.upload.openFolderLinkInToolbar === false) {
      setHiddenState($("uploadFolderLink"), false);
    }

    const uploadToolbar = $("uploadToolbar");
    const uploadFolderLink = $("uploadFolderLink");
    const uploadSubmit = $("uploadSubmit");
    const toolbarExplicitlyVisible = isVisibleByKey("uploadToolbar");
    const hasVisibleToolbarAction =
      (uploadFolderLink && !uploadFolderLink.hidden) ||
      (uploadSubmit && !uploadSubmit.hidden);

    if (uploadToolbar) {
      setHiddenState(uploadToolbar, toolbarExplicitlyVisible && hasVisibleToolbarAction);
    }
  }

  function renderStoryHighlights() {
    const wrap = $("storyHighlights");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.storyHighlights
      .map((item) => `<span class="pill">${item}</span>`)
      .join("");
  }

  function renderTimeline() {
    const wrap = $("timelineList");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.timeline
      .map(
        (item) => `
          <article class="timeline-item">
            <span class="timeline-item__date">${item.date}</span>
            <h3>${item.label}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  function renderGallery() {
    const wrap = $("galleryGrid");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.media.galleryImages
      .map(
        (src, index) => `
          <figure class="gallery-card scroll-reveal">
            <img src="${src}" alt="${config.coupleNames} gallery image ${index + 1}">
          </figure>
        `
      )
      .join("");
  }

  function renderSchedule() {
    const wrap = $("scheduleList");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.schedule
      .map(
        (item) => `
          <article class="schedule-item">
            <span>${item.time}</span>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderContacts() {
    const wrap = $("contactChips");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.rsvpContacts
      .map((item) => `<span class="contact-chip">${item.label}: ${item.value}</span>`)
      .join("");
  }

  function renderFaq() {
    const wrap = $("faqList");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.faq
      .map(
        (item) => `
          <details class="faq-item">
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
          </details>
        `
      )
      .join("");
  }

  function renderPalette() {
    const wrap = $("dressPaletteSwatches");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = config.dressPalette
      .map(
        (color) => `
          <span class="swatch" style="background:${color}">
            <strong>${color}</strong>
          </span>
        `
      )
      .join("");
  }

  function setupCountdown() {
    const target = new Date(config.eventDateISO).getTime();

    function tick() {
      const now = Date.now();
      const distance = Math.max(target - now, 0);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setText("daysValue", String(days).padStart(3, "0"));
      setText("hoursValue", String(hours).padStart(2, "0"));
      setText("minutesValue", String(minutes).padStart(2, "0"));
      setText("secondsValue", String(seconds).padStart(2, "0"));
    }

    tick();
    window.setInterval(tick, 1000);
  }

  function setupMusicPlayer() {
    const button = $("musicToggle");
    const audio = $("eventAudio");
    const status = $("songStatus");

    if (!button || !audio || !status) {
      return;
    }

    button.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          button.classList.add("is-playing");
          button.setAttribute("aria-pressed", "true");
          status.textContent = "Playing";
        } catch (error) {
          status.textContent = "Tap again to enable audio";
        }
      } else {
        audio.pause();
        button.classList.remove("is-playing");
        button.setAttribute("aria-pressed", "false");
        status.textContent = "Paused";
      }
    });

    audio.addEventListener("ended", () => {
      button.classList.remove("is-playing");
      button.setAttribute("aria-pressed", "false");
      status.textContent = "Paused";
    });
  }

  function setupUploads() {
    const target = new Date(config.eventDateISO).getTime();
    const isDateUnlocked = Date.now() >= target;
    const enabled = config.allowUploadsAnytime || (config.unlockUploadsOnDate && isDateUnlocked);

    const input = $("photoInput");
    const status = $("uploadStatus");
    const dropzone = $("uploadDropzone");
    const previewGrid = $("previewGrid");
    const submitButton = $("uploadSubmit");
    const folderLink = $("uploadFolderLink");
    const selectionCount = $("uploadSelectionCount");

    if (!input || !status || !dropzone || !previewGrid || !submitButton || !selectionCount) {
      return;
    }

    if (enabled) {
      status.textContent = "Uploads are unlocked. Guests can add their wedding-day memories here.";
      dropzone.classList.remove("is-locked");
      input.disabled = false;
      submitButton.disabled = false;
    } else {
      status.textContent = `Uploads unlock on ${formatEventDate(config.eventDateISO)}. Set allowUploadsAnytime to true in config.js to keep them open now.`;
      dropzone.classList.add("is-locked");
      input.disabled = true;
      submitButton.disabled = true;
    }

    if (!config.upload.driveFolderLink && folderLink) {
      folderLink.classList.add("is-disabled");
      folderLink.removeAttribute("href");
    }

    input.addEventListener("change", (event) => {
      const files = Array.from(event.target.files || []).slice(0, config.upload.maxFiles || 20);
      selectedUploadFiles = files;
      previewGrid.innerHTML = "";
      selectionCount.textContent = files.length
        ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
        : "No files selected yet";

      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        const card = document.createElement("figure");
        card.className = "preview-card";
        const isVideo = file.type.startsWith("video/");
        card.innerHTML = isVideo
          ? `<video src="${url}" controls playsinline preload="metadata"></video><figcaption>${file.name}</figcaption>`
          : `<img src="${url}" alt="${file.name}"><figcaption>${file.name}</figcaption>`;
        previewGrid.appendChild(card);
      });
    });

    submitButton.addEventListener("click", async () => {
      if (!enabled) {
        status.textContent = `Uploads unlock on ${formatEventDate(config.eventDateISO)}.`;
        return;
      }

      if (!selectedUploadFiles.length) {
        status.textContent = "Please choose at least one photo or video first.";
        return;
      }

      if (!config.upload.submitTarget) {
        status.textContent = "Add upload.submitTarget in config.js to connect this section to your Google Drive upload endpoint.";
        return;
      }

      try {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        status.textContent = "Uploading selected files...";

        const payloadFiles = await Promise.all(selectedUploadFiles.map(fileToBase64));
        const response = await fetch(config.upload.submitTarget, {
          method: "POST",
          body: JSON.stringify({
            eventName: config.coupleNames,
            eventDateISO: config.eventDateISO,
            eventType: config.eventType,
            files: payloadFiles
          }),
          mode: config.upload.requestMode || "cors"
        });

        let responseData = null;
        const responseText = await response.text();

        if (responseText) {
          try {
            responseData = JSON.parse(responseText);
          } catch (error) {
            throw new Error("Upload endpoint returned an unreadable response.");
          }
        }

        if (!response.ok) {
          throw new Error(`Upload request failed with status ${response.status}.`);
        }

        if (!responseData || responseData.success !== true) {
          throw new Error(responseData?.error || "Upload endpoint did not confirm success.");
        }

        status.textContent = config.text.uploadSuccessMessage;
        submitButton.textContent = "Submitted";
        selectedUploadFiles = [];
        previewGrid.innerHTML = "";
        selectionCount.textContent = "No files selected yet";
        input.value = "";
      } catch (error) {
        console.error("Upload error:", error);
        status.textContent = `${config.text.uploadErrorMessage} ${error.message || ""}`.trim();
        submitButton.textContent = "Try Again";
      }

      window.setTimeout(() => {
        submitButton.disabled = !enabled;
        submitButton.textContent = config.text.uploadSubmitLabel;
      }, 3000);
    });
  }

  function setupRsvpForm() {
    const form = $("rsvpForm");
    const button = $("rsvpSubmit");

    if (!form || !button) {
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const guestName = $("guestName")?.value.trim() || "";
      const attendance = $("guestAttendance")?.value || "";
      const guestMessage = $("guestMessage")?.value.trim() || "";

      const data = {
        name: guestName,
        attendance: attendance,
        message: guestMessage
      };

      try {
        button.disabled = true;
        button.textContent = "Submitting...";

        await fetch(config.rsvp.submitTarget, {
          method: "POST",
          body: JSON.stringify(data),
          mode: "no-cors"
        });

        button.textContent = "RSVP Submitted ✓";

        form.reset();

      } catch (error) {
        console.error("RSVP Error:", error);
        button.textContent = "Submission Failed";
      }

      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send RSVP";
      }, 3000);
    });
  }

  function setupScrollAnimations() {
    const reveals = Array.from(document.querySelectorAll(".scroll-reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    reveals.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
      observer.observe(node);
    });

    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      document.documentElement.style.setProperty("--scroll-shift", `${offset * 0.12}px`);
    });
  }

  function formatEventDate(value) {
    return new Date(value).toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  applyTheme();
  applyContent();
  applyVisibility();
  renderStoryHighlights();
  renderTimeline();
  renderGallery();
  renderSchedule();
  renderContacts();
  renderFaq();
  renderPalette();
  setupCountdown();
  setupMusicPlayer();
  setupUploads();
  setupRsvpForm();
  setupScrollAnimations();
})();
