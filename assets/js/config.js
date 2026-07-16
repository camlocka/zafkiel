/**
 * Customize the site here. Media can use a repository file (`local`) or a full
 * hosted/CDN URL (`remote`). When both are present, `remote` wins.
 */
export const SITE_CONFIG = {
  identity: {
    name: "ZAFKIEL",
    suffix: ".SYS",
    initials: "ZK",
    id: "ZK-009",
    role: "creative developer",
    status: "building after midnight",
    bio: "I design and build expressive digital experiences with a focus on clean code, sharp interfaces, and a little controlled chaos.",
    timezone: "UTC−06",
    code: "009",
    clearance: "PRIVATE CHANNEL // CLEARANCE: GRANTED",
    caption: "PERSONAL SIGNAL ARCHIVE",
  },
  media: {
    profile: { local: "", remote: "", position: "50% 35%", alt: "Portrait of Zafkiel" },
    card: { local: "", remote: "", position: "center" },
  },
  music: {
    local: "",
    remote: "",
    title: "Afterimage",
    artist: "Unknown Signal",
    coverLocal: "",
    coverRemote: "",
    autoplayAfterEnter: false,
    loop: true,
    volume: 0.72,
  },
  links: [
    { label: "GitHub", meta: "code / projects", url: "https://github.com/" },
    { label: "Discord", meta: "status / contact", url: "https://discord.com/" },
    { label: "Spotify", meta: "current rotation", url: "https://open.spotify.com/" },
    { label: "Email", meta: "direct channel", url: "mailto:hello@example.com" },
  ],
  theme: {
    accent: "#ff321e",
    accentHot: "#ff7a18",
    background: "#080403",
    text: "#f5efe7",
  },
};
