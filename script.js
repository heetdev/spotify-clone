// ═══════════════════════════════════════════
//  SPOTIFY CLONE — script.js
// ═══════════════════════════════════════════

// ─── STATE ────────────────────────────────
let currentSong = new Audio();
let songs = [];
let currFolder = "";
let currentArtist = "";

// ─── NAVIGATION HISTORY ───────────────────
let navHistory = [];
let navIndex = -1;
let isNavigating = false;

// ─── ALBUM DATA ───────────────────────────
const albums = [
  {
    folder: "songs/goat",
    title: "VIRAT KOHLI FAV",
    desc: "The GOAT's all-time favorite tracks",
    artist: "Various Artists",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cbd4b60723fc36f59d9c28a68",
  },
  {
    folder: "songs/goat2",
    title: "KARAN AUJLA",
    desc: "Party Ready Bangers",
    artist: "Karan Aujla",
    cover: "https://i.scdn.co/image/ab67616d00001e02bf6c7c24a33a49a5c2f0d423",
  },
  {
    folder: "songs/weeknd",
    title: "THE WEEKND",
    desc: "High-energy hits to power your workout",
    artist: "The Weeknd",
    cover: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
  },
  {
    folder: "songs/tecca",
    title: "LIL TECCA",
    desc: "Chill Beats, Great Vibes",
    artist: "Lil Tecca",
    cover: "https://i.scdn.co/image/ab67616d00001e02bd69bbde4aeee723d6d08058",
  },
  {
    folder: "songs/arjit",
    title: "ARIJIT SINGH",
    desc: "Romantic Melodies to Set the Mood",
    artist: "Arijit Singh",
    cover: "https://i.scdn.co/image/ab67616d00001e02627b5b17cb48f6e6956b842e",
  },
  {
    folder: "songs/retro",
    title: "RETRO VIBES",
    desc: "Classic hits that never go out of style",
    artist: "Various Artists",
    cover: "https://i.scdn.co/image/ab67706f00000002ac5edc3e31371c6040cc9e87",
  },
  {
    folder: "songs/peace",
    title: "PEACE",
    desc: "Calm & soulful tracks to unwind",
    artist: "Various Artists",
    cover: "https://i.scdn.co/image/ab67706f0000000208dc478ff3e930553f46b9eb",
  },
  {
    folder: "songs/aur",
    title: "AUR",
    desc: "Soulful acoustic tracks",
    artist: "Aur",
    cover:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/2cjQTf2J5yCaNY8qHpW855/en",
  },
];

// ─── SONG MANIFEST ────────────────────────
// GitHub Pages can't list folder contents like a local dev server can,
// so each album's mp3 filenames must be listed here by hand.
// Just the filename, exactly as it sits inside its songs/<folder>/ directory.
const songManifest = {
  "songs/goat": [
    "Jo Wada Kiya Woh Nibhana Padega.mp3",
    "Nee Singam Dhan.mp3",
    "Channa Mereya.mp3",
    "Elevated.mp3",
    "Sajna Ve Sajna.mp3",
  ],
  "songs/goat2": [
    "Mf Gabhru - Karan Aujla.mp3",
    "Admirin You - Karan Aujla.mp3",
    "Mexico (Original) - Karan Aujla.mp3",
    "White Brown Black - Avvy Sra.mp3",
    "Courtside (Original) - Karan Aujla.mp3",
    "Tauba Tauba - Karan Aujla.mp3",
  ],
  "songs/weeknd": [
    "The Weeknd - After Hours (Audio).mp3",
    "Reminder_-_The_Weeknd_(mp3.pm).mp3",
    "Die For You (Justin Biber AI cover).mp3",
    "The_Weeknd - Jealous Guy.mp3",
    "One Of The Girls - The Weeknd, JENNIE, and Lily-Rose Depp.mp3",
    "The_Weeknd_-_Blinding_Lights_(mp3.pm).mp3",
  ],
  "songs/tecca": [
    "Lil_Tecca_-Ransom Feat. Juice WRLD.mp3",
    "Lil-Tecca-500lbs-.mp3",
    "Lil-Tecca-Dark-Thoughts.mp3",
    "Lil-Tecca-Favorite-Lie.mp3",
    "Lil-Tecca-On-Your-Own.mp3",
    "Lil-Tecca-OWA-OWA.mp3",
  ],
  "songs/arjit": [
    "Aabaad Barbaad.mp3",
    "Aavan Jaavan War .mp3",
    "Ae Dil Hai Mushkil Title Track Pritam.mp3",
    "Agar Tum Saath Ho Tamasha.mp3",
    "Naina-Arijit.mp3",
    "Samjhawan Humpty Sharma Ki Dulhania.mp3",
  ],
  "songs/retro": [
    "K_Naan-Wavin Flag.mp3",
    "Shakira-Hips dont lie.mp3",
    "Bheegi Bheegi Raaton Mein Ajanabee.mp3",
    "Chunnari Chunnari Biwi No. 1.mp3",
    "Maine Puchha Chand Se.mp3",
    "Woh Ladki Hai Kahan Dil Chahta Hai.mp3",
    "Yeh Sham Mastani.mp3",
  ],
  "songs/peace": [
    "AURORA - Runaway.mp3",
    "Bolna Kapoor And Sons.mp3",
    "Jo Tum Mere Ho Anuv Jain.mp3",
    "Kyon Barfi.mp3",
    "Tere Bina - Guru.mp3",
    "Tum Se Hi - Jab We Met.mp3",
  ],
  "songs/aur": [
    "Again AUR.mp3",
    "Me - AUR.mp3",
    "Shikayat - AUR.mp3",
    "Tere Bina AUR.mp3",
    "Tu Hai Kahan - AUR.mp3",
    "YOU - AUR.mp3",
  ],
};

// ─── SONG-SPECIFIC ARTISTS ────────────────
const songArtists = {
  "Channa Mereya (PenduJatt.Com.Se)": "Arijit Singh",
  Elevated: "AP Dhillon",
  "Jo Wada Kiya Woh Nibhana Padega Happy Taj Mahal 320 Kbps": "Mohammed Rafi",
  "Nee Singam Dhan Pathu Thala 320 Kbps": "Anirudh Ravichander",
  "Sajna Ve Sajna": "Satinder Sartaaj",
};

// ─── HELPERS ──────────────────────────────
function cleanName(raw) {
  // Decode up to 3 times to handle double-encoded names
  for (let i = 0; i < 3; i++) {
    try {
      const decoded = decodeURIComponent(raw);
      if (decoded === raw) break; // nothing left to decode
      raw = decoded;
    } catch (e) {
      break;
    }
  }
  // Also manually replace anything that survived
  raw = raw
    .replaceAll("%20", " ")
    .replaceAll("%2C", ",")
    .replaceAll("%27", "'")
    .replaceAll("%28", "(")
    .replaceAll("%29", ")")
    .replaceAll("%26", "&")
    .replaceAll("%2B", "+")
    .replaceAll("%21", "!")
    .replaceAll("%3A", ":");
  return raw
    .replaceAll("_", " ")
    .replace(".mp3", "")
    .replace("(mp3.pm)", "")
    .replace("CHEMPIOHAT MIRA PO FUTBOLU 2010", "")
    .replace("Remix", "")
    .replace("(Audio)", "")
    .trim();
}

function toMMSS(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getArtistForSong(songFilename) {
  const name = cleanName(songFilename);
  return songArtists[name] || currentArtist;
}

// ─── FETCH SONGS + UPDATE LIBRARY ─────────
async function getSongs(folder) {
  currFolder = folder;
  const albumMatch = albums.find((a) => a.folder === folder);
  currentArtist = albumMatch ? albumMatch.artist : "Artist";

  // Pull filenames from the hardcoded manifest instead of fetching a
  // directory listing (GitHub Pages doesn't generate one).
  songs = songManifest[folder] || [];

  renderLibrary();
}

function renderLibrary() {
  const ul = document.querySelector(".songList ul");
  ul.innerHTML = "";

  if (songs.length === 0) {
    const li = document.createElement("li");
    li.style.cssText = "opacity:0.6; cursor:default; justify-content:center;";
    li.innerHTML = `<div class="info"><div>No songs added yet for this album</div></div>`;
    ul.appendChild(li);
    return;
  }

  songs.forEach((song, i) => {
    const artist = getArtistForSong(song);
    const li = document.createElement("li");
    li.innerHTML = `
      <img class="invert" src="music.svg" alt="Music" width="18">
      <div class="info">
        <div>${cleanName(song)}</div>
        <div>${artist}</div>
      </div>
      <div class="playNow">
        <span>Play Now</span>
        <img class="invert" src="play.svg" alt="Play" width="16">
      </div>`;
    li.addEventListener("click", () => playMusic(songs[i]));
    ul.appendChild(li);
  });
}

// ─── PLAY MUSIC ───────────────────────────
function playMusic(track, pause = false) {
  currentSong.src = `${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    document.getElementById("play").src = "pause.svg";
  }
  document.querySelector(".songinfo").textContent = cleanName(track);
  document.querySelector(".songtime").textContent = "00:00 / 00:00";
}

// ─── VIEW SWITCHER ────────────────────────
function showView(name) {
  document.getElementById("homeView").style.display =
    name === "home" ? "" : "none";
  document.getElementById("searchView").style.display =
    name === "search" ? "" : "none";
  document.getElementById("playlistView").style.display =
    name === "playlist" ? "" : "none";

  document
    .getElementById("homeBtn")
    .classList.toggle("nav-active", name === "home");
  document
    .getElementById("searchBtn")
    .classList.toggle("nav-active", name === "search");
}

// ─── OPEN ALBUM ───────────────────────────
async function openAlbum(idx, addToHistory = true) {
  const album = albums[idx];
  try {
    await getSongs(album.folder);
    if (songs.length > 0) playMusic(songs[0], true);
  } catch (e) {
    console.warn("Could not load album:", album.folder, e);
  }

  document.getElementById("pvCover").src = album.cover;
  document.getElementById("pvCover").onerror = function () {
    this.src =
      "https://i.scdn.co/image/ab67616d00001e021e8d77ce2e4dc9f2c4db540a";
  };
  document.getElementById("pvTitle").textContent = album.title;
  document.getElementById("pvDesc").textContent = album.desc;
  // pvArtist may not exist in all HTML versions — guard it
  const pvArtist = document.getElementById("pvArtist");
  if (pvArtist) pvArtist.textContent = album.artist;

  showView("playlist");
  if (addToHistory) pushNav({ type: "playlist", idx });
}

// ─── RENDER ALBUM CARDS ───────────────────
function renderCards(container) {
  container.innerHTML = "";
  albums.forEach((album, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${album.cover}" alt="${album.title}"
           onerror="this.src='https://i.scdn.co/image/ab67616d00001e021e8d77ce2e4dc9f2c4db540a'">
      <div class="card-text">
        <h2>${album.title}</h2>
        <p>${album.desc}</p>
      </div>
      <div class="card-play-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 20V4L19 12L5 20Z" fill="#000"/>
        </svg>
      </div>`;
    card.addEventListener("click", () => openAlbum(idx));
    container.appendChild(card);
  });
}

// ─── SEARCH ───────────────────────────────
function runSearch(query) {
  const q = query.trim().toLowerCase();
  const results = document.getElementById("searchResults");
  const empty = document.getElementById("searchEmpty");
  const filtered = q
    ? albums.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.desc.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q),
      )
    : albums;

  results.innerHTML = "";
  empty.style.display = "none";

  if (filtered.length === 0) {
    empty.style.display = "block";
    document.getElementById("searchTerm").textContent = query;
    return;
  }

  filtered.forEach((album) => {
    const idx = albums.indexOf(album);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${album.cover}" alt="${album.title}"
           onerror="this.src='https://i.scdn.co/image/ab67616d00001e021e8d77ce2e4dc9f2c4db540a'">
      <div class="card-text">
        <h2>${album.title}</h2>
        <p>${album.desc}</p>
      </div>
      <div class="card-play-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 20V4L19 12L5 20Z" fill="#000"/>
        </svg>
      </div>`;
    card.addEventListener("click", () => openAlbum(idx));
    results.appendChild(card);
  });
}

// ─── HISTORY ──────────────────────────────
function pushNav(entry) {
  if (isNavigating) return;
  navHistory = navHistory.slice(0, navIndex + 1);
  navHistory.push(entry);
  navIndex++;
  updateArrows();
}

function updateArrows() {
  document.getElementById("backBtn").style.opacity = navIndex > 0 ? "1" : "0.3";
  document.getElementById("forwardBtn").style.opacity =
    navIndex < navHistory.length - 1 ? "1" : "0.3";
}

async function goBack() {
  if (navIndex <= 0) return;
  isNavigating = true;
  navIndex--;
  await applyNav(navHistory[navIndex]);
  isNavigating = false;
  updateArrows();
}

async function goForward() {
  if (navIndex >= navHistory.length - 1) return;
  isNavigating = true;
  navIndex++;
  await applyNav(navHistory[navIndex]);
  isNavigating = false;
  updateArrows();
}

async function applyNav(entry) {
  if (entry.type === "home") {
    showView("home");
  }
  if (entry.type === "search") {
    showView("search");
    runSearch(entry.query || "");
  }
  if (entry.type === "playlist") {
    await openAlbum(entry.idx, false);
  }
}

// ═══════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════
async function main() {
  // Render cards into #homeView
  renderCards(document.getElementById("homeView"));

  // Start on home
  showView("home");
  pushNav({ type: "home" });

  // Try loading first album songs on startup
  try {
    await getSongs("songs/goat");
    if (songs.length > 0) playMusic(songs[0], true);
  } catch (e) {
    console.warn("Could not load default album songs:", e);
  }

  // ── Nav arrows ──
  document.getElementById("backBtn").addEventListener("click", goBack);
  document.getElementById("forwardBtn").addEventListener("click", goForward);

  // ── Home ──
  document.getElementById("homeBtn").addEventListener("click", () => {
    showView("home");
    pushNav({ type: "home" });
  });

  // ── Search ──
  document.getElementById("searchBtn").addEventListener("click", () => {
    showView("search");
    runSearch("");
    document.getElementById("searchInput").focus();
    pushNav({ type: "search", query: "" });
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    runSearch(e.target.value);
  });

  // ── Logo ──
  const logoBtn = document.getElementById("logoBtn");
  if (logoBtn)
    logoBtn.addEventListener("click", () => {
      showView("home");
      pushNav({ type: "home" });
    });

  // ── Play All ──
  document.getElementById("pvPlayBtn").addEventListener("click", () => {
    if (songs.length > 0) playMusic(songs[0]);
  });

  // ── Play / Pause ──
  document.getElementById("play").addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      document.getElementById("play").src = "pause.svg";
    } else {
      currentSong.pause();
      document.getElementById("play").src = "play.svg";
    }
  });

  // ── Previous ──
  document.getElementById("previous").addEventListener("click", () => {
    const i = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (i - 1 >= 0) playMusic(songs[i - 1]);
  });

  // ── Next ──
  document.getElementById("next").addEventListener("click", () => {
    const i = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (i + 1 < songs.length) playMusic(songs[i + 1]);
  });

  // ── Auto next ──
  currentSong.addEventListener("ended", () => {
    const i = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (i + 1 < songs.length) playMusic(songs[i + 1]);
  });

  // ── Seekbar ──
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    const pct = e.offsetX / e.target.getBoundingClientRect().width;
    document.querySelector(".circle").style.left = `${pct * 100}%`;
    currentSong.currentTime = pct * currentSong.duration;
  });

  // ── Time update ──
  currentSong.addEventListener("timeupdate", () => {
    if (!isNaN(currentSong.duration)) {
      const pct = (currentSong.currentTime / currentSong.duration) * 100;
      document.querySelector(".circle").style.left = `${pct}%`;
      document.querySelector(".songtime").textContent =
        `${toMMSS(currentSong.currentTime)} / ${toMMSS(currentSong.duration)}`;
    }
  });

  // ── Volume ──
  document.querySelector(".range input").addEventListener("input", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
  });

  // ── Hamburger (mobile) ──
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });
}

main();

// ═══════════════════════════════════════════
//  AUTH MODAL
// ═══════════════════════════════════════════
(function () {
  const overlay = document.getElementById("modalOverlay");
  const loginPanel = document.getElementById("loginPanel");
  const signupPanel = document.getElementById("signupPanel");
  const successPanel = document.getElementById("successPanel");
  if (!overlay) return; // guard if HTML doesn't have modal yet

  function showPanel(panel) {
    [loginPanel, signupPanel, successPanel].forEach((p) =>
      p.classList.add("hidden"),
    );
    panel.classList.remove("hidden");
    overlay.classList.add("active");
  }

  function closeModal() {
    overlay.classList.remove("active");
    clearErrors();
    [
      "loginEmail",
      "loginPassword",
      "signupEmail",
      "signupPassword",
      "signupName",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  }

  function clearErrors() {
    ["loginError", "signupError"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("show");
    });
    document
      .querySelectorAll(".modal-field input")
      .forEach((i) => i.classList.remove("invalid"));
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("sp_users") || "{}");
    } catch {
      return {};
    }
  }
  function saveUsers(u) {
    localStorage.setItem("sp_users", JSON.stringify(u));
  }

  function setLoggedIn(name) {
    localStorage.setItem("sp_current", name);
    document.getElementById("openLogin").style.display = "none";
    document.getElementById("openSignup").style.display = "none";
    let badge = document.getElementById("userBadge");
    if (!badge) {
      badge = document.createElement("button");
      badge.id = "userBadge";
      badge.className = "loginbtn";
      badge.style.cssText = "background:#1ed760;color:black;font-weight:bold;";
      badge.title = "Click to log out";
      badge.addEventListener("click", () => {
        localStorage.removeItem("sp_current");
        badge.remove();
        document.getElementById("openLogin").style.display = "";
        document.getElementById("openSignup").style.display = "";
      });
      document.querySelector(".button").appendChild(badge);
    }
    badge.textContent = "👤 " + name;
  }

  // Open modals
  document
    .getElementById("openLogin")
    .addEventListener("click", () => showPanel(loginPanel));
  document
    .getElementById("openSignup")
    .addEventListener("click", () => showPanel(signupPanel));

  // Close
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document
    .getElementById("closeModalSignup")
    .addEventListener("click", closeModal);
  document.getElementById("successClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Switch panels
  document.getElementById("goSignup").addEventListener("click", (e) => {
    e.preventDefault();
    showPanel(signupPanel);
  });
  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    showPanel(loginPanel);
  });

  // Show/hide password
  document.querySelectorAll(".toggle-pw").forEach((btn) => {
    btn.addEventListener("click", () => {
      const inp = document.getElementById(btn.dataset.target);
      inp.type = inp.type === "password" ? "text" : "password";
      btn.textContent = inp.type === "password" ? "Show" : "Hide";
    });
  });

  // Login
  document.getElementById("loginSubmit").addEventListener("click", () => {
    clearErrors();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value;
    if (!email) document.getElementById("loginEmail").classList.add("invalid");
    if (!pass)
      document.getElementById("loginPassword").classList.add("invalid");
    if (!email || !pass) {
      showError("loginError", "Please fill in all fields.");
      return;
    }
    const users = getUsers();
    if (!users[email]) {
      showError("loginError", "No account found with that email.");
      return;
    }
    if (users[email].password !== pass) {
      showError("loginError", "Wrong password. Try again.");
      return;
    }
    document.getElementById("successTitle").textContent =
      "Welcome back, " + users[email].name + "!";
    document.getElementById("successSub").textContent =
      "You're logged in. Enjoy the music 🎵";
    showPanel(successPanel);
    setLoggedIn(users[email].name);
  });

  // Signup
  document.getElementById("signupSubmit").addEventListener("click", () => {
    clearErrors();
    const email = document.getElementById("signupEmail").value.trim();
    const pass = document.getElementById("signupPassword").value;
    const name = document.getElementById("signupName").value.trim();
    let ok = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("signupEmail").classList.add("invalid");
      ok = false;
    }
    if (pass.length < 6) {
      document.getElementById("signupPassword").classList.add("invalid");
      ok = false;
    }
    if (!name) {
      document.getElementById("signupName").classList.add("invalid");
      ok = false;
    }
    if (!ok) {
      showError(
        "signupError",
        "Fix highlighted fields (password min 6 chars).",
      );
      return;
    }
    const users = getUsers();
    if (users[email]) {
      showError("signupError", "An account with this email already exists.");
      return;
    }
    users[email] = { name, password: pass };
    saveUsers(users);
    document.getElementById("successTitle").textContent =
      "Welcome, " + name + "!";
    document.getElementById("successSub").textContent =
      "Account created. Time to listen 🎶";
    showPanel(successPanel);
    setLoggedIn(name);
  });

  // Enter key
  ["loginEmail", "loginPassword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("loginSubmit").click();
    });
  });
  ["signupEmail", "signupPassword", "signupName"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("signupSubmit").click();
    });
  });

  // Auto-login on refresh
  const current = localStorage.getItem("sp_current");
  if (current) setLoggedIn(current);
})();