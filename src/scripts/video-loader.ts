import type { VideoLoadStrategy, VideoSource } from '../lib/media';

const initialized = new WeakSet<Element>();

function parseSources(raw: string | undefined): VideoSource[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as VideoSource[];
  } catch {
    return [];
  }
}

function getEffectiveSources(video: HTMLVideoElement): VideoSource[] {
  const media = video.dataset.desktopMedia;
  const mobile = parseSources(video.dataset.mobileSources);
  const desktop = parseSources(video.dataset.desktopSources);

  if (media && (mobile.length || desktop.length)) {
    const isDesktop = window.matchMedia(media).matches;
    return isDesktop ? (desktop.length ? desktop : mobile) : (mobile.length ? mobile : desktop);
  }
  return parseSources(video.dataset.sources);
}

function attachSources(video: HTMLVideoElement, shouldPlay: boolean) {
  if (video.dataset.loaded === 'true') return;
  const sources = getEffectiveSources(video);
  if (!sources.length) return;

  for (const { src, type } of sources) {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    video.appendChild(source);
  }

  video.preload = 'auto';
  video.dataset.loaded = 'true';
  video.load();

  const reveal = () => {
    video.classList.remove('opacity-0');
    video.classList.add('opacity-100');
  };

  if (shouldPlay) {
    video.addEventListener('playing', reveal, { once: true });
    video.play().catch(() => {});
  } else {
    video.addEventListener('canplay', reveal, { once: true });
  }
}

function observeOffscreenPause(video: HTMLVideoElement) {
  if (video.dataset.pauseOffscreen !== 'true' || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (video.dataset.loaded !== 'true') continue;
        if (entry.isIntersecting) {
          if (video.dataset.autoplay === 'true' && video.paused) {
            video.play().catch(() => {});
          }
        } else if (!video.paused) {
          video.pause();
        }
      }
    },
    { threshold: 0.05 },
  );

  observer.observe(video);
}

function scheduleAfterLcpImage(video: HTMLVideoElement, callback: () => void) {
  const container = video.closest('[data-video-container]');
  const img = container?.querySelector('img');

  const trigger = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 500 });
    } else {
      requestAnimationFrame(() => setTimeout(callback, 0));
    }
  };

  if (!img || img.complete) {
    trigger();
  } else {
    img.addEventListener('load', trigger, { once: true });
    img.addEventListener('error', trigger, { once: true });
  }
}

function scheduleLoad(video: HTMLVideoElement, strategy: VideoLoadStrategy) {
  const shouldPlay = video.dataset.autoplay === 'true';

  if (strategy === 'immediate') {
    attachSources(video, shouldPlay);
    return;
  }

  if (strategy === 'idle') {
    scheduleAfterLcpImage(video, () => attachSources(video, shouldPlay));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    attachSources(video, shouldPlay);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        obs.disconnect();
        attachSources(video, shouldPlay);
      }
    },
    { rootMargin: '250px 0px' },
  );
  observer.observe(video);
}

export function initSmartVideos() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData =
    'connection' in navigator &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

  document.querySelectorAll<HTMLVideoElement>('video[data-smart-video]').forEach((video) => {
    if (initialized.has(video)) return;
    initialized.add(video);

    if (video.dataset.ambient === 'true' && (prefersReducedMotion || saveData)) {
      return;
    }

    observeOffscreenPause(video);
    scheduleLoad(video, (video.dataset.loadStrategy ?? 'idle') as VideoLoadStrategy);
  });

  document.querySelectorAll<HTMLElement>('[data-video-facade]').forEach((wrapper) => {
    if (initialized.has(wrapper)) return;
    initialized.add(wrapper);

    const trigger = wrapper.querySelector<HTMLButtonElement>('[data-video-play]');
    const video = wrapper.querySelector<HTMLVideoElement>('video[data-facade-video]');
    if (!trigger || !video) return;

    trigger.addEventListener(
      'click',
      () => {
        wrapper.querySelector('picture')?.classList.add('hidden');
        trigger.remove();
        video.classList.remove('hidden', 'opacity-0');
        attachSources(video, true);
        video.focus();
      },
      { once: true },
    );
  });
}

initSmartVideos();