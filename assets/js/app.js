import { SITE_CONFIG } from "./config.js";

const $ = (selector, root = document) => root.querySelector(selector);
const elements = {
  site: $("#site"),
  bootScreen: $("#boot-screen"),
  bootTrigger: $("#boot-trigger"),
  liveRegion: $("#live-region"),
  audio: $("#audio"),
  playButton: $("#play-button"),
  muteButton: $("#mute-button"),
  seek: $("#seek"),
  volume: $("#volume"),
  currentTime: $("#current-time"),
  duration: $("#duration"),
  trackState: $("#track-state"),
};

const pickSource = (asset = {}) => asset.remote?.trim() || asset.local?.trim() || "";

const setText = (selector, value) => {
  const element = $(selector);
  if (element && value !== undefined) element.textContent = value;
};

function announce(message) {
  elements.liveRegion.textContent = "";
  window.setTimeout(() => { elements.liveRegion.textContent = message; }, 20);
}

function applyTheme() {
  const root = document.documentElement;
  Object.entries(SITE_CONFIG.theme).forEach(([key, value]) => {
    const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    root.style.setProperty(`--${cssKey}`, value);
  });
}

function applyIdentity() {
  const { identity } = SITE_CONFIG;
  document.title = `${identity.name}${identity.suffix} // Personal Profile`;
  setText("#brand-name", `${identity.name}.`);
  setText("#brand-caption", identity.caption);
  setText("#card-subject", identity.name);
  setText("#card-zone", identity.timezone);
  setText("#card-code", identity.code);
  setText("#avatar-fallback", identity.initials);
  setText("#clearance", identity.clearance);
  setText("#name-main", identity.name);
  setText("#name-suffix", identity.suffix);
  setText("#identity-id", identity.id);
  setText("#identity-role", identity.role);
  setText("#identity-status", identity.status);
  setText("#identity-bio", identity.bio);
  setText("#footer-name", identity.name);
  setText("#year", new Date().getFullYear());
}

function applyMedia() {
  const profileSource = pickSource(SITE_CONFIG.media.profile);
  const cardSource = pickSource(SITE_CONFIG.media.card);
  const profileImage = $("#profile-image");
  const portraitCard = $("#portrait-card");

  if (profileSource) {
    profileImage.src = profileSource;
    profileImage.alt = SITE_CONFIG.media.profile.alt || "Profile portrait";
    profileImage.style.objectPosition = SITE_CONFIG.media.profile.position || "center";
    profileImage.hidden = false;
    profileImage.addEventListener("error", () => {
      profileImage.hidden = true;
      announce("Profile image could not be loaded; showing initials instead.");
    });
  }

  if (cardSource) {
    const preloader = new Image();
    preloader.addEventListener("load", () => {
      portraitCard.style.setProperty("--card-image", `url("${cardSource}")`);
      portraitCard.style.setProperty("--card-position", SITE_CONFIG.media.card.position || "center");
      portraitCard.classList.add("has-card-image");
    });
    preloader.addEventListener("error", () => announce("Card image unavailable; showing the built-in background."));
    preloader.src = cardSource;
  }
}

function renderLinks() {
  const grid = $("#link-grid");
  const fragment = document.createDocumentFragment();

  SITE_CONFIG.links.forEach((link, index) => {
    const anchor = document.createElement("a");
    anchor.className = "channel-link";
    anchor.href = link.url;
    anchor.innerHTML = `
      <span class="channel-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="channel-copy"><strong></strong><small></small></span>
      <span class="channel-arrow" aria-hidden="true">↗</span>`;
    $("strong", anchor).textContent = link.label;
    $("small", anchor).textContent = link.meta;

    if (/^https?:/i.test(link.url)) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer noopener";
      anchor.setAttribute("aria-label", `${link.label} (opens in a new tab)`);
    }
    fragment.append(anchor);
  });
  grid.replaceChildren(fragment);
}

function createStarField() {
  const field = $("#star-field");
  const fragment = document.createDocumentFragment();
  const count = window.matchMedia("(max-width: 720px)").matches ? 42 : 76;

  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("i");
    star.style.setProperty("--x", `${Math.random() * 100}%`);
    star.style.setProperty("--y", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${Math.random() > 0.88 ? 2 : 1}px`);
    star.style.setProperty("--delay", `${Math.random() * -8}s`);
    star.style.setProperty("--duration", `${4 + Math.random() * 7}s`);
    fragment.append(star);
  }
  field.append(fragment);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function setPlayingState(isPlaying) {
  elements.playButton.classList.toggle("is-playing", isPlaying);
  elements.playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  elements.trackState.textContent = isPlaying ? "TRANSMITTING" : "SIGNAL PAUSED";
}

function setupPlayer() {
  const { music } = SITE_CONFIG;
  const source = music.remote?.trim() || music.local?.trim() || "";
  const coverSource = music.coverRemote?.trim() || music.coverLocal?.trim() || "";
  const controls = [elements.playButton, elements.muteButton, elements.seek, elements.volume];
  setText("#track-title", source ? music.title : "ADD YOUR MP3");
  setText("#track-artist", source ? music.artist : "EDIT assets/js/config.js");

  if (coverSource) {
    $("#album-art").style.backgroundImage = `url("${coverSource}")`;
    $("#album-art").classList.add("has-cover");
  }
  if (!source) return;

  elements.audio.src = source;
  elements.audio.loop = music.loop;
  elements.audio.volume = Math.min(1, Math.max(0, music.volume));
  elements.volume.value = String(elements.audio.volume);
  elements.volume.style.setProperty("--range-value", `${elements.audio.volume * 100}%`);
  controls.forEach((control) => { control.disabled = false; });
  elements.trackState.textContent = "SIGNAL READY";

  elements.playButton.addEventListener("click", async () => {
    if (!elements.audio.paused) return elements.audio.pause();
    try { await elements.audio.play(); }
    catch { announce("Playback was blocked. Try pressing play again."); }
  });

  elements.audio.addEventListener("play", () => setPlayingState(true));
  elements.audio.addEventListener("pause", () => setPlayingState(false));
  elements.audio.addEventListener("loadedmetadata", () => {
    elements.duration.textContent = formatTime(elements.audio.duration);
  });
  elements.audio.addEventListener("timeupdate", () => {
    const percentage = elements.audio.duration ? (elements.audio.currentTime / elements.audio.duration) * 100 : 0;
    elements.seek.value = String(percentage);
    elements.seek.style.setProperty("--range-value", `${percentage}%`);
    elements.currentTime.textContent = formatTime(elements.audio.currentTime);
  });
  elements.audio.addEventListener("error", () => {
    controls.forEach((control) => { control.disabled = true; });
    elements.trackState.textContent = "SOURCE UNAVAILABLE";
    announce("The configured MP3 could not be loaded.");
  });
  elements.seek.addEventListener("input", () => {
    if (elements.audio.duration) elements.audio.currentTime = (Number(elements.seek.value) / 100) * elements.audio.duration;
  });
  elements.volume.addEventListener("input", () => {
    elements.audio.volume = Number(elements.volume.value);
    elements.audio.muted = false;
    elements.volume.style.setProperty("--range-value", `${Number(elements.volume.value) * 100}%`);
    elements.muteButton.classList.remove("is-muted");
    elements.muteButton.setAttribute("aria-label", "Mute");
  });
  elements.muteButton.addEventListener("click", () => {
    elements.audio.muted = !elements.audio.muted;
    elements.muteButton.classList.toggle("is-muted", elements.audio.muted);
    elements.muteButton.setAttribute("aria-label", elements.audio.muted ? "Unmute" : "Mute");
  });
}

function enterSite() {
  if (elements.site.getAttribute("aria-hidden") === "false") return;
  elements.bootScreen.classList.add("is-dismissed");
  elements.site.setAttribute("aria-hidden", "false");
  elements.site.inert = false;
  document.body.classList.add("is-entered");
  window.setTimeout(() => { elements.bootScreen.hidden = true; }, 700);

  if (SITE_CONFIG.music.autoplayAfterEnter && elements.audio.src) {
    elements.audio.play().catch(() => announce("Use the player controls to start the music."));
  }
}

function setupNavigation() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  }));
}

function initialize() {
  applyTheme();
  applyIdentity();
  applyMedia();
  renderLinks();
  createStarField();
  setupPlayer();
  setupNavigation();
  elements.bootTrigger.addEventListener("click", enterSite);
  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && !elements.bootScreen.hidden) {
      event.preventDefault();
      enterSite();
    }
  });
}

initialize();
