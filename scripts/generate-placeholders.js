import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/images/memories');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 15 Cinematic Photographic Scenes matching the 15 Friendship Categories
const photoScenes = [
  {
    num: "01",
    title: "FIRST TIME WE MET",
    subtitle: "A random hello that started it all",
    bg1: "#071426", bg2: "#163B70", accent: "#FFD98E",
    elements: `<circle cx="450" cy="180" r="140" fill="#FFB6D5" opacity="0.15" filter="blur(30px)"/>
               <circle cx="200" cy="350" r="180" fill="#163B70" opacity="0.4" filter="blur(40px)"/>
               <path d="M100 500 C250 380, 400 480, 700 400" stroke="#FFD98E" stroke-width="2" opacity="0.4" fill="none"/>
               <circle cx="350" cy="220" r="4" fill="#FFF8FC" opacity="0.9"/>
               <circle cx="520" cy="120" r="3" fill="#FFD98E" opacity="0.8"/>
               <circle cx="180" cy="160" r="2.5" fill="#C9B6FF" opacity="0.7"/>`
  },
  {
    num: "02",
    title: "OUR FIRST PHOTO TOGETHER",
    subtitle: "The awkward smile archive",
    bg1: "#0B1D3A", bg2: "#2A183C", accent: "#FFB6D5",
    elements: `<rect x="180" y="100" width="440" height="360" rx="16" fill="#162744" opacity="0.6" stroke="#FFB6D5" stroke-opacity="0.25" stroke-width="1.5"/>
               <circle cx="400" cy="280" r="120" fill="#F45B9A" opacity="0.18" filter="blur(35px)"/>
               <circle cx="320" cy="240" r="45" fill="#FFF8FC" opacity="0.12"/>
               <circle cx="480" cy="240" r="45" fill="#FFF8FC" opacity="0.12"/>`
  },
  {
    num: "03",
    title: "THE WHOLE GANG",
    subtitle: "Unmatched volume, zero normal photos",
    bg1: "#071426", bg2: "#2D1B4E", accent: "#FFD98E",
    elements: `<circle cx="400" cy="300" r="220" fill="#F45B9A" opacity="0.15" filter="blur(50px)"/>
               <path d="M150 480 Q250 320 400 480 T650 480" fill="none" stroke="#FFD98E" stroke-width="3" opacity="0.4"/>
               <circle cx="280" cy="290" r="35" fill="#FFD98E" opacity="0.2"/>
               <circle cx="400" cy="260" r="40" fill="#FFB6D5" opacity="0.25"/>
               <circle cx="520" cy="290" r="35" fill="#C9B6FF" opacity="0.2"/>`
  },
  {
    num: "04",
    title: "RANDOM OUTING PLANS",
    subtitle: "Spontaneous adventures with 1% battery",
    bg1: "#040E1B", bg2: "#1A3258", accent: "#FFD98E",
    elements: `<path d="M0 450 Q400 280 800 450" fill="none" stroke="#FFD98E" stroke-width="2.5" opacity="0.5"/>
               <circle cx="400" cy="220" r="90" fill="#FFD98E" opacity="0.15" filter="blur(30px)"/>
               <circle cx="400" cy="220" r="6" fill="#FFD98E"/>`
  },
  {
    num: "05",
    title: "OUR CANTEEN STORIES",
    subtitle: "One plate of fries, two hours of gossip",
    bg1: "#101D33", bg2: "#3D241E", accent: "#FFD98E",
    elements: `<circle cx="400" cy="300" r="160" fill="#FFD98E" opacity="0.12" filter="blur(40px)"/>
               <circle cx="400" cy="280" r="70" fill="none" stroke="#FFD98E" stroke-width="2" opacity="0.3"/>
               <circle cx="400" cy="280" r="50" fill="none" stroke="#FFB6D5" stroke-width="1.5" opacity="0.25"/>`
  },
  {
    num: "06",
    title: "CLASSROOM NONSENSE",
    subtitle: "Holding in laughter during serious lectures",
    bg1: "#071426", bg2: "#192841", accent: "#C9B6FF",
    elements: `<line x1="120" y1="180" x2="680" y2="180" stroke="#C9B6FF" stroke-width="1.5" opacity="0.2"/>
               <line x1="120" y1="280" x2="680" y2="280" stroke="#C9B6FF" stroke-width="1.5" opacity="0.2"/>
               <line x1="120" y1="380" x2="680" y2="380" stroke="#C9B6FF" stroke-width="1.5" opacity="0.2"/>
               <circle cx="360" cy="280" r="120" fill="#C9B6FF" opacity="0.15" filter="blur(40px)"/>`
  },
  {
    num: "07",
    title: "THE UNPLANNED TRIP",
    subtitle: "Wrong turns, right playlist, best day",
    bg1: "#071426", bg2: "#1B3B5C", accent: "#FFD98E",
    elements: `<polygon points="0,550 250,300 500,550" fill="#0A1E35" opacity="0.7"/>
               <polygon points="300,550 550,260 800,550" fill="#0E2847" opacity="0.6"/>
               <circle cx="400" cy="180" r="75" fill="#FFD98E" opacity="0.3" filter="blur(25px)"/>`
  },
  {
    num: "08",
    title: "THE MOST CHAOTIC SELFIE",
    subtitle: "Blurred faces, pure unedited joy",
    bg1: "#1A0F2B", bg2: "#071426", accent: "#F45B9A",
    elements: `<circle cx="300" cy="260" r="90" fill="#F45B9A" opacity="0.25" filter="blur(35px)"/>
               <circle cx="500" cy="280" r="110" fill="#C9B6FF" opacity="0.2" filter="blur(40px)"/>
               <circle cx="400" cy="220" r="70" fill="#FFD98E" opacity="0.18" filter="blur(30px)"/>`
  },
  {
    num: "09",
    title: "BIRTHDAY CELEBRATIONS",
    subtitle: "Cake smudges, singing off-key, endless cheers",
    bg1: "#071426", bg2: "#3D1730", accent: "#FFD98E",
    elements: `<circle cx="400" cy="260" r="140" fill="#FFD98E" opacity="0.2" filter="blur(35px)"/>
               <circle cx="400" cy="210" r="10" fill="#FFD98E" opacity="0.9"/>
               <line x1="400" y1="210" x2="400" y2="290" stroke="#FFF8FC" stroke-width="4" stroke-linecap="round"/>
               <circle cx="280" cy="180" r="3" fill="#FFB6D5" opacity="0.8"/>
               <circle cx="520" cy="190" r="3.5" fill="#FFD98E" opacity="0.9"/>
               <circle cx="480" cy="340" r="2.5" fill="#FFF8FC" opacity="0.8"/>`
  },
  {
    num: "10",
    title: "OUR FOOD ADVENTURES",
    subtitle: "Just a quick bite that turned into a food crawl",
    bg1: "#141E28", bg2: "#2A1F18", accent: "#FFD98E",
    elements: `<circle cx="400" cy="300" r="180" fill="#FFD98E" opacity="0.15" filter="blur(45px)"/>
               <ellipse cx="400" cy="340" rx="200" ry="80" fill="none" stroke="#FFD98E" stroke-width="2" opacity="0.3"/>`
  },
  {
    num: "11",
    title: "THE RANDOM LAUGHING MOMENT",
    subtitle: "Laughing so hard that no sound comes out",
    bg1: "#071426", bg2: "#202F49", accent: "#FFB6D5",
    elements: `<circle cx="400" cy="280" r="160" fill="#F45B9A" opacity="0.2" filter="blur(45px)"/>
               <path d="M280 320 Q400 420 520 320" fill="none" stroke="#FFD98E" stroke-width="3" opacity="0.5" stroke-linecap="round"/>`
  },
  {
    num: "12",
    title: "THE SILLY FIGHT",
    subtitle: "Mad for 5 minutes, laughing 5 minutes later",
    bg1: "#1C1428", bg2: "#071426", accent: "#C9B6FF",
    elements: `<circle cx="320" cy="280" r="100" fill="#C9B6FF" opacity="0.2" filter="blur(35px)"/>
               <circle cx="480" cy="280" r="100" fill="#F45B9A" opacity="0.2" filter="blur(35px)"/>
               <line x1="400" y1="180" x2="400" y2="380" stroke="#FFF8FC" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3"/>`
  },
  {
    num: "13",
    title: "THE CANDID SHOT",
    subtitle: "Unposed, unfiltered, genuine friendship",
    bg1: "#071426", bg2: "#12253D", accent: "#FFD98E",
    elements: `<circle cx="400" cy="260" r="130" fill="#FFF8FC" opacity="0.12" filter="blur(30px)"/>
               <rect x="240" y="140" width="320" height="240" fill="none" stroke="#FFD98E" stroke-width="1.5" stroke-opacity="0.3" rx="8"/>`
  },
  {
    num: "14",
    title: "THE DAY WE NEVER WANTED TO END",
    subtitle: "Golden hour talks and twilight skies",
    bg1: "#071426", bg2: "#422336", accent: "#FFD98E",
    elements: `<circle cx="400" cy="380" r="190" fill="#FFB6D5" opacity="0.2" filter="blur(40px)"/>
               <circle cx="400" cy="340" r="80" fill="#FFD98E" opacity="0.3" filter="blur(20px)"/>
               <line x1="0" y1="420" x2="800" y2="420" stroke="#FFD98E" stroke-width="2" opacity="0.4"/>`
  },
  {
    num: "15",
    title: "MORE MEMORIES TO COME",
    subtitle: "Here's to a lifetime of adventures ahead",
    bg1: "#050F1D", bg2: "#192841", accent: "#FFD98E",
    elements: `<circle cx="400" cy="270" r="210" fill="#C9B6FF" opacity="0.18" filter="blur(50px)"/>
               <circle cx="250" cy="200" r="3" fill="#FFF8FC" opacity="0.9"/>
               <circle cx="550" cy="180" r="3" fill="#FFD98E" opacity="0.9"/>
               <circle cx="400" cy="120" r="3.5" fill="#FFB6D5" opacity="0.9"/>
               <circle cx="480" cy="340" r="2.5" fill="#FFF8FC" opacity="0.8"/>`
  }
];

photoScenes.forEach((s) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="photoGrad${s.num}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${s.bg1}" />
      <stop offset="100%" stop-color="${s.bg2}" />
    </linearGradient>
    <radialGradient id="vignette${s.num}" cx="50%" cy="50%" r="65%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.65" />
    </radialGradient>
  </defs>

  <!-- Base Photographic Background -->
  <rect width="800" height="520" fill="url(#photoGrad${s.num})" />

  <!-- Atmospheric Background Elements & Subtle Depth -->
  ${s.elements}

  <!-- Dark Photographic Vignette -->
  <rect width="800" height="520" fill="url(#vignette${s.num})" />

  <!-- Elegant Clean Composition Text -->
  <g transform="translate(400, 240)" text-anchor="middle">
    <!-- Clean Subtle Aperture Ring -->
    <circle cx="0" cy="-25" r="54" fill="none" stroke="${s.accent}" stroke-width="1.5" stroke-opacity="0.35" />
    <circle cx="0" cy="-25" r="36" fill="none" stroke="#FFF8FC" stroke-width="1" stroke-opacity="0.25" />
    <circle cx="0" cy="-25" r="3" fill="${s.accent}" opacity="0.8" />

    <!-- Title -->
    <text y="75" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="24" fill="#FFF8FC" letter-spacing="2">
      ${s.title}
    </text>

    <!-- Subtitle -->
    <text y="105" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" font-size="14" fill="#FFB6D5" opacity="0.85" letter-spacing="0.5">
      ${s.subtitle}
    </text>

    <!-- Tasteful note for adding personal photograph -->
    <text y="132" font-family="'Plus Jakarta Sans', sans-serif" font-weight="300" font-size="11" fill="#FFF8FC" opacity="0.5" letter-spacing="0.5">
      Replace with real photo: /public/images/memories/memory-${s.num}.jpg
    </text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(targetDir, `memory-${s.num}.svg`), svg, 'utf-8');
  fs.writeFileSync(path.join(targetDir, `memory-${s.num}.jpg`), svg, 'utf-8');
});

console.log('Successfully generated 15 cinematic photographic placeholders in ' + targetDir);
