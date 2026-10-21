import { BirthdayConfig } from '../types';

export const birthdayConfig: BirthdayConfig = {
  friend: {
    name: "Sophia",
    nickname: "Bestie",
    birthdayDate: "December 8",
    zodiacSign: "Sagittarius ♐",
  },
  
  security: {
    // 4-digit secret combination
    lockCombination: "1208",
    clue: "The secret is hidden in a number only we would understand...",
    hint: "Think of our special bestie code & anniversary date 🌸",
    incorrectAttemptMessage: "Not quite! Think of our inside joke / special memory 😂",
  },

  letter: {
    title: "To My Dearest Best Friend & Partner-in-Crime,",
    subtitle: "There's something I've always wanted you to know...",
    paragraphs: [
      "Happy Birthday to one of the most hilarious, chaotic, and truly special people in my life! 🎂✨",
      "Life threw so many random moments at us, but having you as my best friend is hands down one of the absolute best things that ever happened.",
      "Thank you for every burst of uncontrollable laughter, every late-night gossip session, every terrible selfie, and every single time we turned an ordinary day into absolute madness.",
      "I hope this new chapter brings you endless happiness, wild opportunities, great food, zero stress, and everything your crazy heart wishes for.",
      "No matter where life takes us or how old we get, I know we'll still be annoying each other and laughing at the exact same silly jokes years from now.",
      "Today is all about celebrating YOU. You deserve the biggest slice of cake, the loudest cheers, and the happiest year ahead.",
      "Happy Birthday, bestie! Stay iconic, stay hilarious, and never change! 🥳💖"
    ],
    signOff: "With endless laughs, high fives, and tight hugs,",
    signature: "Your Best Friend Forever 📸✨"
  },

  celebration: {
    wishPrompt: "Ready for your final surprise?",
    mainHeadline: "HAPPY BIRTHDAY, SOPHIA! 🎂🎉",
    subheadline: "May your year ahead be packed with endless adventures, unstoppable laughter, and unlimited food!",
    cakeMessage: "Make a wish & blow out the candles 🕯️✨",
    candlesCount: 3,
    closingToast: "Here's to partners in nonsense, 200 unposed photos, and another year of legendary friendship!"
  },

  memories: [
    {
      id: "mem-1",
      url: "/images/memories/memory-01.jpg",
      title: "FIRST TIME WE MET",
      category: "FIRST MEETINGS",
      date: "Day One",
      location: "Where It All Began",
      caption: "Who knew that one random meeting would give us this many stories to laugh about? 😂",
      longDescription: "From quiet introductions to realizing we shared the exact same chaotic sense of humor. That single day changed everything for the better.",
      tag: "FIRST MEETINGS"
    },
    {
      id: "mem-2",
      url: "/images/memories/memory-02.jpg",
      title: "OUR FIRST PHOTO TOGETHER",
      category: "FIRST MEETINGS",
      date: "The First Snap",
      location: "The Archives",
      caption: "That first photo together. Back then, we had no idea how many more pictures we'd take! 📸",
      longDescription: "A slightly awkward pose, genuine smiles, and zero clue that we were looking at the start of thousands of photo dump memories.",
      tag: "FIRST MEETINGS"
    },
    {
      id: "mem-3",
      url: "/images/memories/memory-03.jpg",
      title: "THE WHOLE GANG",
      category: "THE GANG",
      date: "Squad Goals",
      location: "Usual Hangout Spot",
      caption: "One gang, unlimited noise, zero normal pictures. Wouldn't trade this madness for anything! 🤣",
      longDescription: "Everyone talking at the same time, laughing at jokes no one else understands, and creating pure noise pollution in the best way possible.",
      tag: "THE GANG"
    },
    {
      id: "mem-4",
      url: "/images/memories/memory-04.jpg",
      title: "RANDOM OUTING PLANS",
      category: "OUTINGS",
      date: "Spontaneous",
      location: "Everywhere & Nowhere",
      caption: "The plan was simple: go out, have fun, and somehow return with 200 photos and zero battery. 🔋😂",
      longDescription: "'Let's just take a quick walk' turned into an all-day quest across town, 1% phone battery emergencies, and memories for a lifetime.",
      tag: "OUTINGS"
    },
    {
      id: "mem-5",
      url: "/images/memories/memory-05.jpg",
      title: "OUR CANTEEN STORIES",
      category: "COLLEGE DAYS",
      date: "Snack Break",
      location: "College Canteen",
      caption: "Went to the canteen for a snack. Stayed for the gossip, jokes, and completely unnecessary discussions. 🍟",
      longDescription: "Three cold drinks, one plate of fries shared between five people, and solving world problems over college canteen tables.",
      tag: "COLLEGE DAYS"
    },
    {
      id: "mem-6",
      url: "/images/memories/memory-06.jpg",
      title: "CLASSROOM NONSENSE",
      category: "COLLEGE DAYS",
      date: "Backbenchers",
      location: "Last Row",
      caption: "Trying to act serious in class while one look from the gang was enough to ruin everything. 😭",
      longDescription: "Biting your lips trying not to laugh out loud during a lecture because someone made the dumbest face across the room.",
      tag: "COLLEGE DAYS"
    },
    {
      id: "mem-7",
      url: "/images/memories/memory-07.jpg",
      title: "THE UNPLANNED TRIP",
      category: "OUTINGS",
      date: "Roadtrip",
      location: "Chasing Horizons",
      caption: "Nobody planned this properly, but somehow this became one of our favourite days out! 🚌✨",
      longDescription: "Packed zero essentials, took the wrong turn twice, played the playlist on loop, and had the absolute time of our lives.",
      tag: "OUTINGS"
    },
    {
      id: "mem-8",
      url: "/images/memories/memory-08.jpg",
      title: "THE MOST CHAOTIC SELFIE",
      category: "THE GANG",
      date: "0.5x Mayhem",
      location: "Camera Roll Crime Scene",
      caption: "Why does everyone look different in every picture? Who was even taking this selfie? 💀📸",
      longDescription: "Out-of-focus faces, somebody blinking, someone screaming in the background—objectively terrible photography, subjectively legendary.",
      tag: "THE GANG"
    },
    {
      id: "mem-9",
      url: "/images/memories/memory-09.jpg",
      title: "BIRTHDAY CELEBRATIONS",
      category: "BIRTHDAYS",
      date: "Party Central",
      location: "Cake Smudge Zone",
      caption: "The cake, the photos, the shouting, and everyone fighting to get the best piece. 🎂😂",
      longDescription: "Screaming the birthday song off-key at the top of our lungs and making sure the birthday person gets covered in frosting.",
      tag: "BIRTHDAYS"
    },
    {
      id: "mem-10",
      url: "/images/memories/memory-10.jpg",
      title: "OUR FOOD ADVENTURES",
      category: "FOOD & FUN",
      date: "Foodie Tour",
      location: "Three Stops Later",
      caption: "We said we'd just grab a quick bite. Three food stops later, we finally went home. 🍕",
      longDescription: "Started with 'just coffee', added pizza, stopped for ice cream, and complained about being too full while ordering dessert.",
      tag: "FOOD & FUN"
    },
    {
      id: "mem-11",
      url: "/images/memories/memory-11.jpg",
      title: "THE RANDOM LAUGHING MOMENT",
      category: "CANDID MOMENTS",
      date: "Tears of Laughter",
      location: "Giggle Fit Zone",
      caption: "Still don't know what was so funny, but looking at this picture makes me laugh all over again. 🤣",
      longDescription: "That specific brand of laughing where stomach muscles ache, tears stream down your face, and clapping like a seal is required.",
      tag: "CANDID MOMENTS"
    },
    {
      id: "mem-12",
      url: "/images/memories/memory-12.jpg",
      title: "THE SILLY FIGHT",
      category: "CANDID MOMENTS",
      date: "Drama Episode #42",
      location: "Peace Treaty Corner",
      caption: "Fought over the smallest thing, ignored each other for five minutes, and went back to talking like nothing happened. 😂",
      longDescription: "Arguing passionately about something completely irrelevant, dramatically sulking for 180 seconds, and laughing over memes immediately after.",
      tag: "CANDID MOMENTS"
    },
    {
      id: "mem-13",
      url: "/images/memories/memory-13.jpg",
      title: "THE CANDID SHOT",
      category: "CANDID MOMENTS",
      date: "Caught in Action",
      location: "Unfiltered Reality",
      caption: "The pictures we didn't pose for always turn out to be the ones worth keeping. 📷",
      longDescription: "Mid-laugh, mid-sentence, zero filters, and 100% genuine friendship. Real life beats any posed photo every single time.",
      tag: "CANDID MOMENTS"
    },
    {
      id: "mem-14",
      url: "/images/memories/memory-14.jpg",
      title: "THE DAY WE NEVER WANTED TO END",
      category: "OUTINGS",
      date: "Golden Hour",
      location: "Best Evening Ever",
      caption: "No big occasion, no special plan. Just our people, a good day, and memories worth keeping. 🌇",
      longDescription: "Sitting around watching the sky turn pink and orange, realizing that the simplest hangout days with the gang are the most precious.",
      tag: "OUTINGS"
    },
    {
      id: "mem-15",
      url: "/images/memories/memory-15.jpg",
      title: "MORE MEMORIES TO COME",
      category: "THE GANG",
      date: "To Be Continued",
      location: "Everywhere Next",
      caption: "We've collected this many memories already. The gallery is definitely going to need more space! 🫶",
      longDescription: "More chaotic plans, worse selfies, louder laughs, and a lifetime supply of unforgettable friendship still waiting to happen.",
      tag: "THE GANG"
    }
  ],

  milestones: [
    {
      id: "milestone-1",
      yearOrPhase: "Chapter 1",
      title: "The Unplanned Beginning",
      date: "Where it all started",
      image: "/images/memories/memory-01.jpg",
      caption: "Two strangers who exchanged one silly joke and immediately knew they were destined to become best friends.",
      highlight: "The Spark"
    },
    {
      id: "milestone-2",
      yearOrPhase: "Chapter 2",
      title: "The Funniest Disasters",
      date: "Chaotic Chronicles",
      image: "/images/memories/memory-03.jpg",
      caption: "When everything that could go wrong did, but we turned it into our greatest comedy show of all time.",
      highlight: "Unstoppable Laughs"
    },
    {
      id: "milestone-3",
      yearOrPhase: "Chapter 3",
      title: "Our Unforgettable Adventures",
      date: "Chasing Horizons",
      image: "/images/memories/memory-07.jpg",
      caption: "Sunrise drives, singing at the top of our lungs with the windows down, and making plans to explore the world.",
      highlight: "Golden Horizons"
    },
    {
      id: "milestone-4",
      yearOrPhase: "Chapter 4",
      title: "The Memories We Keep Repeating",
      date: "Infinite Playlists",
      image: "/images/memories/memory-05.jpg",
      caption: "'Remember when...' stories that we tell for the hundredth time and still laugh just as hard every single time.",
      highlight: "Endless Nostalgia"
    },
    {
      id: "milestone-5",
      yearOrPhase: "Chapter 5",
      title: "The Gang That Sticks Together",
      date: "Present & Forever",
      image: "/images/memories/memory-15.jpg",
      caption: "Partners in nonsense. The gang that made ordinary days unforgettable, cheering each other on through every milestone.",
      highlight: "Bestie Bond"
    }
  ],

  finale: {
    quote1: "Partners in nonsense, laughter, and unforgettable days.",
    quote2: "Too many memories, not enough phone storage! Thank you for being the most supportive, chaotic, and wonderful best friend in the world.",
    closingText: "MADE WITH LOVE FOR MY BEST FRIEND 💖✨"
  },

  audio: {
    ambientMusicEnabled: true,
    soundEffectsEnabled: true,
    defaultVolume: 0.6
  }
};
