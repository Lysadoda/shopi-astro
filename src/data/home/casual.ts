import type { ImageMetadata } from 'astro';
import type { VideoSource } from '../../lib/media';
import type { Locale } from '../routes';

import copilotIcon from '../../assets/media/casual/copilot.svg';
import googleIcon from '../../assets/media/casual/google.png';
import gptIcon from '../../assets/media/casual/gpt.svg';
import casualPoster from '../../assets/media/casual/poster.png';

export interface CasualBadgeIcon {
  alt: string;
  src: ImageMetadata;
  zIndex: number;
  overlap?: boolean;
}

export interface CasualCopy {
  heading: string;
  bodyBeforeLink: string;
  linkLabel: string;
  bodyAfterLink: string;
}

export const CASUAL_ICONS: CasualBadgeIcon[] = [
  { alt: 'ChatGPT', src: gptIcon, zIndex: 3 },
  { alt: 'Google', src: googleIcon, zIndex: 2, overlap: true },
  { alt: 'Copilot', src: copilotIcon, zIndex: 1, overlap: true },
];

export const CASUAL_POSTER = casualPoster;

export const CASUAL_VIDEO_SOURCES: VideoSource[] = [
  { src: '/media/casual/casual.webm', type: 'video/webm' },
  { src: '/media/casual/casual.mp4', type: 'video/mp4' },
];

export const CASUAL_COPY: Record<Locale, CasualCopy> = {
  en: {
    heading: 'Your brand has entered the\u00A0chat',
    bodyBeforeLink:
      'Get discovered across AI channels. Shoppers check out right in the chat. You don’t lift a finger. All powered by ',
    linkLabel: 'Agentic Storefronts',
    bodyAfterLink: '.',
  },
  pl: {
    heading: 'Twoja marka wkracza na czat',
    bodyBeforeLink:
      'Zyskaj widoczność w kanałach AI. Klienci realizują zakupy bezpośrednio na czacie. Ty nie musisz nawet kiwnąć palcem. Wszystko to dzięki technologii ',
    linkLabel: 'Agentic Storefronts',
    bodyAfterLink: '.',
  },
};