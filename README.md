# 🌌 DREAMSCAPE — Interactive 3D Birthday Surprise Website

> A magical, cinematic 3D birthday journey, authentic best-friendship scrapbook, and digital memory box crafted with love.

---

## ✨ Features & Scene Flow

The website is engineered as a multi-page interactive adventure with 7 distinct scenes:

1. **Scene 1: The Magical Invitation (`/`)**
   - 3D Floating pink gift box with metallic gold ribbons.
   - Floating glass heart with realistic optical transmission, roughness, and pulsing glow.
   - Swirling celestial particle halo and drifting rose petals.
   - Interactive opening animation: gift box opens, pink & gold particles burst out, camera dives into a glowing portal.

2. **Scene 2: The Secret Number Lock (`#/secret-lock`)**
   - Realistic 3D metallic safe vault with midnight-blue casing, brushed gold corners, and glowing keyhole.
   - 4-wheel rotary combination dials (0–9) with mechanical audio click feedback.
   - Secret clue card toggle: *"The secret is hidden in a number only we would understand..."*
   - Configurable combination (default: **`1208`** in [src/config/birthdayConfig.ts](file:///d:/birthday/src/config/birthdayConfig.ts)).
   - Wrong attempt: friendly wobble animation with gentle message (*"Not quite! Think of our inside joke / special memory 😂"*).
   - Correct attempt: safe door swings open in 3D, golden light floods out, fanfare chime plays, and auto-navigates to the vault!

3. **Scene 3: The Unlocked Memory Vault (`#/memory-vault`)**
   - **Friendship Scrapbook**: Polaroid frames with realistic washi tape, camera stickers, doodles, and film strips.
   - **15 Bestie Memories**: From "FIRST TIME WE MET" and "CLASSROOM NONSENSE" to "OUR CANTEEN STORIES", "THE UNPLANNED TRIP", and "THE MOST CHAOTIC SELFIE".
   - **Gallery Filter Bar**: Filter by `ALL MEMORIES`, `FIRST MEETINGS`, `THE GANG`, `OUTINGS`, `COLLEGE DAYS`, `FOOD & FUN`, `BIRTHDAYS`, and `CANDID MOMENTS`.
   - **Memory Counter**: *"15 little moments and counting 📸"*.
   - **Interactive Modal**: Centered viewport modal with full descriptions, dates, locations, and arrow navigation.
   - **Ending Scrapbook Card**: *"THIS IS JUST THE BEGINNING... More random plans, more terrible selfies, more inside jokes, and a lifetime supply of memories still waiting to happen. 😂💗"*

4. **Scene 4: Our Friendship Timeline (`#/our-story`)**
   - Interactive glowing pathway connecting friendship milestones across chapters.
   - Animated progress wire with milestones: The Beginning, Funniest Disasters, Unforgettable Adventures, Repeating Memories, and The Gang That Sticks Together.
   - Previous/Next step navigation with smooth camera focus.

5. **Scene 5: The Secret Letter (`#/secret-letter`)**
   - Moonlit garden atmosphere under a glowing pink moon and fireflies.
   - Sealed 3D envelope with a golden wax seal and envelope unfold rustle sound.
   - Unfolds into a handwritten-style letter with a gentle, progressive typewriter paragraph reveal.

6. **Scene 6: The Ultimate Birthday Surprise (`#/birthday-surprise`)**
   - Starts with a darkened anticipation screen: *"Ready for your final surprise?"*
   - Clicking **"MAKE A WISH ✨"** illuminates the scene with pink and gold ambient light.
   - Multi-tier detailed 3D birthday cake with cream borders, golden pearl beads, and flickering candle flames.
   - Interactive candles: click or tap the cake/candles or press **"BLOW CANDLES 💨"** to extinguish them with a breath sound, rising smoke particles, and multi-shot fireworks confetti!
   - Floating balloons rising into the sky.

7. **Scene 7: The Memory Finale (`#/forever-memories`)**
   - Star constellation of friendship memories floating like shining stars in space.
   - Selecting any star photo brings it into focus with heartfelt reflections.
   - Closing tribute: *"MADE WITH LOVE FOR MY BEST FRIEND 💖✨"*
   - **"START THE SURPRISE AGAIN"** button to restart the journey from the beginning.

---

## 🛠️ Personalization (One Single Config File)

All text, secret lock combination, photos, letter paragraphs, and milestones can be personalized in:

📁 **[src/config/birthdayConfig.ts](file:///d:/birthday/src/config/birthdayConfig.ts)**

### Adding Personal Photographs

Drop your 15 friendship photos into:
`public/images/memories/`

Named:
- `memory-01.jpg` (FIRST TIME WE MET)
- `memory-02.jpg` (OUR FIRST PHOTO TOGETHER)
- `memory-03.jpg` (THE WHOLE GANG)
- `memory-04.jpg` (RANDOM OUTING PLANS)
- `memory-05.jpg` (OUR CANTEEN STORIES)
- `memory-06.jpg` (CLASSROOM NONSENSE)
- `memory-07.jpg` (THE UNPLANNED TRIP)
- `memory-08.jpg` (THE MOST CHAOTIC SELFIE)
- `memory-09.jpg` (BIRTHDAY CELEBRATIONS)
- `memory-10.jpg` (OUR FOOD ADVENTURES)
- `memory-11.jpg` (THE RANDOM LAUGHING MOMENT)
- `memory-12.jpg` (THE SILLY FIGHT)
- `memory-13.jpg` (THE CANDID SHOT)
- `memory-14.jpg` (THE DAY WE NEVER WANTED TO END)
- `memory-15.jpg` (MORE MEMORIES TO COME)

*(If any image is missing, the included [FallbackImage](file:///d:/birthday/src/components/common/FallbackImage.tsx) component automatically displays an artistic scrapbook placeholder with a camera icon and "Your memory goes here 📸").*

---

## 🚀 Running the Project

```bash
# Start local development server
npm run dev

# Build for production
npm run build
```
