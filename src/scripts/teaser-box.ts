const DESKTOP_MEDIA = '(min-width: 64rem)';
const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 48;

const initialized = new WeakSet<HTMLElement>();

function setupTeaserBox(root: HTMLElement) {
  if (initialized.has(root)) return;
  initialized.add(root);

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tb-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tb-panel]'));
  const viewport = root.querySelector<HTMLElement>('[data-tb-viewport]');
  const track = root.querySelector<HTMLElement>('[data-tb-track]');

  if (!tabs.length || !panels.length || !viewport || !track) return;

  const total = panels.length;
  const desktopMq = window.matchMedia(DESKTOP_MEDIA);
  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

  let activeIndex = 0;
  let isVisible = false;
  let isInteracting = false;
  let autoplayTimer: number | undefined;

  const setTrackTransform = (offsetPx = 0, animate = true) => {
    track.style.transition = animate && !reducedMotionMq.matches ? '' : 'none';
    track.style.transform = `translate3d(calc(${activeIndex} * (-100% - var(--margin, 0px)) + ${offsetPx}px), 0, 0)`;
  };

  const goTo = (rawIndex: number, { focusTab = false, animate = true } = {}) => {
    const isDesktop = desktopMq.matches;
    const nextIndex = isDesktop
      ? Math.max(0, Math.min(total - 1, rawIndex))
      : ((rawIndex % total) + total) % total;

    if (nextIndex === activeIndex && !focusTab) {
      setTrackTransform(0, animate);
      return;
    }

    activeIndex = nextIndex;

    tabs.forEach((tab, i) => {
      const selected = i === activeIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('!text-white', selected);
      if (selected && focusTab) {
        tab.focus();
      }
    });

    panels.forEach((panel, i) => {
      const active = i === activeIndex;
      panel.inert = !active;
      if (active) panel.scrollLeft = 0;
    });

    setTrackTransform(0, animate);
  };

  const stopAutoplay = () => {
    if (autoplayTimer !== undefined) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotionMq.matches || !isVisible || isInteracting) return;

    autoplayTimer = window.setInterval(() => {
      const isDesktop = desktopMq.matches;
      if (isDesktop && activeIndex >= total - 1) {
        stopAutoplay();
        return;
      }
      goTo(activeIndex + 1);
    }, AUTOPLAY_INTERVAL_MS);
  };

  // Tab click + WAI-ARIA keyboard navigation
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      goTo(index);
      startAutoplay();
    });

    tab.addEventListener('keydown', (e) => {
      const isDesktop = desktopMq.matches;
      let target: number | null = null;

      if (e.key === 'ArrowRight') {
        target = isDesktop ? Math.min(total - 1, index + 1) : index + 1;
      } else if (e.key === 'ArrowLeft') {
        target = isDesktop ? Math.max(0, index - 1) : index - 1;
      } else if (e.key === 'Home') {
        target = 0;
      } else if (e.key === 'End') {
        target = total - 1;
      }

      if (target !== null) {
        e.preventDefault();
        goTo(target, { focusTab: true });
        startAutoplay();
      }
    });
  });

  // Pause on hover or focus inside section
  root.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopAutoplay();
  });
  root.addEventListener('mouseleave', () => {
    isInteracting = false;
    startAutoplay();
  });
  root.addEventListener('focusin', () => {
    isInteracting = true;
    stopAutoplay();
  });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node | null)) {
      isInteracting = false;
      startAutoplay();
    }
  });

  // Pause when scrolled offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(root);
  } else {
    isVisible = true;
    startAutoplay();
  }

  // Pointer swipe on desktop (with end blockade) & edge swipe on mobile (looping)
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let isDragging = false;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('a, button')) return;

    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    deltaX = 0;
    isDragging = desktopMq.matches;

    if (isDragging) {
      isInteracting = true;
      stopAutoplay();
    }
  });

  viewport.addEventListener('pointermove', (e) => {
    if (pointerId !== e.pointerId || !isDragging) return;
    deltaX = e.clientX - startX;
    const atStart = activeIndex === 0 && deltaX > 0;
    const atEnd = activeIndex === total - 1 && deltaX < 0;
    const damped = atStart || atEnd ? deltaX * 0.2 : deltaX;
    setTrackTransform(damped, false);
  });

  const finishPointer = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const activePanel = panels[activeIndex];
    pointerId = null;

    if (isDragging) {
      isDragging = false;
      isInteracting = false;
      if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
        goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1);
      } else {
        setTrackTransform(0, true);
      }
      startAutoplay();
      return;
    }

    // Mobile (< lg): allow inner card horizontal scroll; advance/loop only at scroll edges
    if (!desktopMq.matches && Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      const atLeftEdge = activePanel.scrollLeft <= 2;
      const atRightEdge =
        activePanel.scrollLeft + activePanel.clientWidth >= activePanel.scrollWidth - 2;

      if (dx < 0 && atRightEdge) {
        goTo(activeIndex + 1);
        startAutoplay();
      } else if (dx > 0 && atLeftEdge) {
        goTo(activeIndex - 1);
        startAutoplay();
      }
    }
  };

  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  reducedMotionMq.addEventListener('change', () => {
    if (reducedMotionMq.matches) stopAutoplay();
    else startAutoplay();
  });

  setTrackTransform(0, false);
}

export function initTeaserBoxes() {
  document.querySelectorAll<HTMLElement>('[data-tb-root]').forEach(setupTeaserBox);
}

initTeaserBoxes();