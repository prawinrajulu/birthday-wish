export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date?: string;
  location?: string;
  category: 'FIRST MEETINGS' | 'THE GANG' | 'OUTINGS' | 'COLLEGE DAYS' | 'FOOD & FUN' | 'BIRTHDAYS' | 'CANDID MOMENTS';
  caption: string;
  longDescription?: string;
  tag?: string;
}

export interface TimelineMilestone {
  id: string;
  yearOrPhase: string;
  title: string;
  date: string;
  image: string;
  caption: string;
  highlight: string;
}

export interface BirthdayConfig {
  friend: {
    name: string;
    nickname: string;
    birthdayDate: string;
    zodiacSign?: string;
  };
  security: {
    lockCombination: string; // 4-digit code e.g. "1208"
    clue: string;
    hint: string;
    incorrectAttemptMessage: string;
  };
  letter: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
  };
  celebration: {
    wishPrompt: string;
    mainHeadline: string;
    subheadline: string;
    cakeMessage: string;
    candlesCount: number;
    closingToast: string;
  };
  memories: MemoryPhoto[];
  milestones: TimelineMilestone[];
  finale: {
    quote1: string;
    quote2: string;
    closingText: string;
  };
  audio: {
    ambientMusicEnabled: boolean;
    soundEffectsEnabled: boolean;
    defaultVolume: number;
  };
}
