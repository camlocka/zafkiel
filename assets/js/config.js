/**
 * Customize the site here. Media can use a repository file (`local`) or a full
 * hosted/CDN URL (`remote`). When both are present, `remote` wins.
 * 
python -m http.server 8080
 `http://localhost:8080`.

 */



export const SITE_CONFIG = {
  identity: {
    name: "ZAFKIEL",
    suffix: ".CC",
    initials: "KEM",
    id: "KM-018",
    role: "creative developer",
    status: "playing with my cs2 knife",
    bio: "I strive to be better everyday.",
    timezone: "UTC-06",
    code: "009",
    clearance: "PRIVATE CHANNEL // CLEARANCE: GRANTED",
    caption: "PERSONAL SIGNAL ARCHIVE",
  },
  media: {
    profile: { local: "", remote: "https://file.garden/algrYxHL5D98Ynh5/60ea02d29f4702f7552a4c26a8a92807.jpg", position: "50% 35%", alt: "kem" },
    card: { local: "", remote: "", position: "center" },
  },
  music: {
    local: "",
    remote: "https://file.garden/algrYxHL5D98Ynh5/Room_spotdown.org.mp3",
    title: "Room",
    artist: "Unknown Signal",
    coverLocal: "",
    coverRemote: "https://file.garden/algrYxHL5D98Ynh5/https___images.genius.com_18e52b2d37ecaf0d343b7b93cbc83495.1000x1000x1.jpg",
    autoplayAfterEnter: true,
    loop: true,
    volume: 0.12,
  },
  links: [
    { label: "GitHub", meta: "code / projects", url: "https://github.com/camlocka" },
    { label: "Discord", meta: "status / contact", url: "https://discord.dog/828769692955967529" },
    { label: "Spotify", meta: "playlists & profile", url: "https://open.spotify.com/user/169kecfz2dwwg1k103wfbiiys?si=cbb39a61fb0448c9" },
    { label: "Email", meta: "direct channel", url: "mailto:hello@example.com" },
  ],
  theme: {
    accent: "#9b9b9b",
    accentHot: "#ff3b34",
    background: "#080403",
    text: "#f5efe7",
  },
};
