import type { ImageMetadata } from 'astro';
import type { Locale } from '../routes';

import bonaventuraImg from '../../assets/media/home/teaser-box/Bonaventura.jpg';
import bonaventuraLogo from '../../assets/media/home/teaser-box/Bonaventura-logo.svg';
import eastForkImg from '../../assets/media/home/teaser-box/East-Fork.jpg';
import eastForkLogo from '../../assets/media/home/teaser-box/East-Fork-logo.svg';
import ftcImg from '../../assets/media/home/teaser-box/FTC.jpg';
import ftcLogo from '../../assets/media/home/teaser-box/FTC-logo.svg';
import glossierImg from '../../assets/media/home/teaser-box/Glossier.jpg';
import glossierLogo from '../../assets/media/home/teaser-box/Glossier-logo.svg';
import houseplantImg from '../../assets/media/home/teaser-box/Houseplant.jpg';
import houseplantLogo from '../../assets/media/home/teaser-box/Houseplant-logo.svg';
import kotnImg from '../../assets/media/home/teaser-box/Kotn.jpg';
import kotnLogo from '../../assets/media/home/teaser-box/Kotn-logo.svg';
import monosImg from '../../assets/media/home/teaser-box/Monos.jpg';
import monosLogo from '../../assets/media/home/teaser-box/Monos-logo.svg';
import onlyNyImg from '../../assets/media/home/teaser-box/OnlyNY.jpg';
import onlyNyLogo from '../../assets/media/home/teaser-box/OnlyNY-logo.svg';
import ornotImg from '../../assets/media/home/teaser-box/Ornot.jpg';
import ornotLogo from '../../assets/media/home/teaser-box/Ornot-logo.svg';
import owieImg from '../../assets/media/home/teaser-box/Owie.jpg';
import owieLogo from '../../assets/media/home/teaser-box/Owie-logo.svg';
import stanleyImg from '../../assets/media/home/teaser-box/Stanley.jpg';
import stanleyLogo from '../../assets/media/home/teaser-box/Stanley-logo.svg';
import steveMaddenImg from '../../assets/media/home/teaser-box/Steve-Madden.jpg';
import steveMaddenLogo from '../../assets/media/home/teaser-box/Steve-Madden-logo.svg';

export type TeaserCardVariant = 'wide' | 'narrow';

export interface TeaserCard {
  brand: string;
  domain: string;
  href: string;
  image: ImageMetadata;
  logo: ImageMetadata;
  variant: TeaserCardVariant;
  alt: Record<Locale, string>;
}

export interface TeaserGroup {
  id: string;
  label: Record<Locale, string>;
  cards: TeaserCard[];
}

export const TEASER_BOX_COPY: Record<Locale, { tablistAriaLabel: string }> = {
  en: { tablistAriaLabel: 'Browse merchant categories' },
  pl: { tablistAriaLabel: 'Przeglądaj kategorie sprzedawców' },
};

export const TEASER_BOX_GROUPS: TeaserGroup[] = [
  {
    id: 'everywhere',
    label: {
      en: 'Sell everywhere people shop.',
      pl: 'Sprzedawaj wszędzie tam, gdzie ludzie robią zakupy.',
    },
    cards: [
      {
        brand: 'Steve Madden',
        domain: 'stevemadden.com',
        href: 'https://www.stevemadden.com/',
        image: steveMaddenImg,
        logo: steveMaddenLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Steve Madden website selling shoes and accessories',
          pl: 'Zrzut ekranu sklepu Steve Madden sprzedającego obuwie i akcesoria',
        },
      },
      {
        brand: 'Ornot',
        domain: 'ornotbike.com',
        href: 'https://www.ornotbike.com/',
        image: ornotImg,
        logo: ornotLogo,
        variant: 'narrow',
        alt: {
          en: 'Image of Ornot website selling cycling apparel',
          pl: 'Zrzut ekranu sklepu Ornot sprzedającego odzież kolarską',
        },
      },
      {
        brand: 'Glossier',
        domain: 'glossier.com',
        href: 'https://www.glossier.com/',
        image: glossierImg,
        logo: glossierLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Glossier website selling beauty products',
          pl: 'Zrzut ekranu sklepu Glossier sprzedającego kosmetyki',
        },
      },
    ],
  },
  {
    id: 'online-in-person',
    label: {
      en: 'Online and in person.',
      pl: 'Online i stacjonarnie.',
    },
    cards: [
      {
        brand: 'Houseplant',
        domain: 'houseplant.com',
        href: 'https://www.houseplant.com/',
        image: houseplantImg,
        logo: houseplantLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Houseplant website selling home goods',
          pl: 'Zrzut ekranu sklepu Houseplant sprzedającego artykuły do domu',
        },
      },
      {
        brand: 'Kotn',
        domain: 'kotn.com',
        href: 'https://kotn.com/',
        image: kotnImg,
        logo: kotnLogo,
        variant: 'narrow',
        alt: {
          en: 'Image of Kotn website selling ethically made essentials',
          pl: 'Zrzut ekranu sklepu Kotn sprzedającego odzież z bawełny egipskiej',
        },
      },
      {
        brand: 'East Fork',
        domain: 'eastfork.com',
        href: 'https://eastfork.com/',
        image: eastForkImg,
        logo: eastForkLogo,
        variant: 'wide',
        alt: {
          en: 'Image of East Fork website selling pottery and ceramics',
          pl: 'Zrzut ekranu sklepu East Fork sprzedającego ceramikę',
        },
      },
    ],
  },
  {
    id: 'ai-and-social',
    label: {
      en: 'Across AI and on social.',
      pl: 'Z pomocą AI i w mediach społecznościowych.',
    },
    cards: [
      {
        brand: 'Monos',
        domain: 'monos.com',
        href: 'https://monos.com/',
        image: monosImg,
        logo: monosLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Monos website selling luggage and travel accessories',
          pl: 'Zrzut ekranu sklepu Monos sprzedającego walizki i akcesoria podróżne',
        },
      },
      {
        brand: 'Stanley',
        domain: 'stanley1913.com',
        href: 'https://www.stanley1913.com/',
        image: stanleyImg,
        logo: stanleyLogo,
        variant: 'narrow',
        alt: {
          en: 'Image of Stanley website selling drinkware and gear',
          pl: 'Zrzut ekranu sklepu Stanley sprzedającego kubki termiczne i sprzęt',
        },
      },
      {
        brand: 'Yowie',
        domain: 'shopyowie.com',
        href: 'https://shopyowie.com/',
        image: owieImg,
        logo: owieLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Yowie website selling curated home goods and design objects',
          pl: 'Zrzut ekranu sklepu Yowie sprzedającego wyselekcjonowane przedmioty do domu',
        },
      },
    ],
  },
  {
    id: 'local-and-global',
    label: {
      en: 'Locally and globally.',
      pl: 'Lokalnie i globalnie.',
    },
    cards: [
      {
        brand: 'FTC',
        domain: 'ftcsf.com',
        href: 'https://ftcsf.com/',
        image: ftcImg,
        logo: ftcLogo,
        variant: 'narrow',
        alt: {
          en: 'Image of FTC website selling skateboarding apparel',
          pl: 'Zrzut ekranu sklepu FTC sprzedającego odzież skate',
        },
      },
      {
        brand: 'OnlyNY',
        domain: 'onlyny.com',
        href: 'https://onlyny.com/',
        image: onlyNyImg,
        logo: onlyNyLogo,
        variant: 'wide',
        alt: {
          en: 'Image of website for clothing brand OnlyNY',
          pl: 'Zrzut ekranu sklepu marki odzieżowej OnlyNY',
        },
      },
      {
        brand: 'Bonaventura',
        domain: 'jp.bonaventura.shop',
        href: 'https://jp.bonaventura.shop/',
        image: bonaventuraImg,
        logo: bonaventuraLogo,
        variant: 'wide',
        alt: {
          en: 'Image of Bonaventura website selling Italian leather goods',
          pl: 'Zrzut ekranu sklepu Bonaventura sprzedającego włoską galanterię skórzaną',
        },
      },
    ],
  },
];