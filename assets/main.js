/* ==========================================================================
   Daniel Cruz — Portfolio shared behaviour
   Nav, cursor, marquee, magnetic buttons, GSAP scroll reveals, counters.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- scroll-to-explore hint ---------- */
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    const onHintScroll = () => {
      scrollHint.classList.toggle('hidden', window.scrollY > 120);
    };
    onHintScroll();
    window.addEventListener('scroll', onHintScroll, { passive: true });
  }

  /* ---------- back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- services accordion ---------- */
  document.querySelectorAll('.services-list .service-row').forEach((row) => {
    row.addEventListener('click', () => {
      const item = row.closest('.service-item');
      const list = row.closest('.services-list');
      const wasOpen = item.classList.contains('open');

      list.querySelectorAll('.service-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.service-row')?.setAttribute('aria-expanded', 'false');
      });

      const isOpen = !wasOpen;
      item.classList.toggle('open', isOpen);
      row.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* ---------- testimonial carousel ---------- */
  const testimonialSlides = document.querySelectorAll('[data-testimonial-slide]');
  const testimonialDots = document.querySelectorAll('[data-testimonial-dot]');
  if (testimonialSlides.length && testimonialDots.length) {
    const showTestimonial = (index) => {
      testimonialSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      testimonialDots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });
  }

  /* ---------- mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) navLinks.classList.remove('open');
    });
  }

  /* ---------- custom cursor ---------- */
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;
    window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    const loop = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('a, button, .magnetic').forEach((el) => {
      el.addEventListener('mouseenter', () => dot.classList.add('hover'));
      el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (canHover && window.gsap) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        moveX((e.clientX - r.left - r.width / 2) * 0.35);
        moveY((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('mouseleave', () => { moveX(0); moveY(0); });
    });
  }

  /* ---------- hero word reveal (case pages etc.) ---------- */
  document.querySelectorAll('.reveal-line span').forEach((span, i) => {
    span.style.transform = 'translateY(115%)';
    span.style.transition = `transform .9s cubic-bezier(.16,1,.3,1) ${0.05 * i}s`;
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal-line span').forEach((span) => {
        span.style.transform = 'translateY(0)';
      });
    });
  });

  /* ---------- hero typewriter ---------- */
  // Real text lives in the markup (visible even if this script never runs,
  // is delayed, or throws). JS only reads it, clears it, then types it back.
  // The rotating accent word (below) is kicked off only once the first
  // line finishes, so nothing appears out of order while it's typing.
  const typeLines = document.querySelectorAll('.hero-title-type .type-line');
  const rotatingWord = document.getElementById('heroRotatingWord');
  const rotatingWordText = rotatingWord && rotatingWord.querySelector('.rotating-word-text');
  let startRotatingWord = () => {};

  if (typeLines.length) {
    const CHAR_SPEED = 42;
    const LINE_PAUSE = 220;
    const texts = Array.from(typeLines).map((el) => el.textContent);
    typeLines.forEach((el) => { el.textContent = ''; });
    let i = 0;
    const typeNext = () => {
      if (i >= typeLines.length) return;
      const el = typeLines[i];
      const text = texts[i];
      let c = 0;
      el.classList.add('typing');
      const tick = () => {
        c++;
        el.textContent = text.slice(0, c);
        if (c < text.length) {
          setTimeout(tick, CHAR_SPEED);
        } else {
          el.classList.remove('typing');
          i++;
          if (i === 1) setTimeout(startRotatingWord, LINE_PAUSE);
          if (i < typeLines.length) setTimeout(typeNext, LINE_PAUSE);
        }
      };
      setTimeout(tick, CHAR_SPEED);
    };
    typeNext();
  } else {
    startRotatingWord();
  }

  /* ---------- hero rotating word (typewriter) ---------- */
  // Types out each word, holds, deletes it, then types the next one.
  // Word list + starting word live in the markup via data-words, so the
  // page still reads fine if this script never runs.
  if (rotatingWord && rotatingWordText) {
    const words = (rotatingWord.dataset.words || rotatingWordText.textContent)
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
    const TYPE_SPEED = 70;
    const ERASE_SPEED = 40;
    const HOLD_TIME = 1400;
    const PAUSE_BETWEEN = 250;
    let wordIndex = 0;

    const typeWord = (word, cb) => {
      let c = 0;
      const tick = () => {
        c++;
        rotatingWordText.textContent = word.slice(0, c);
        if (c < word.length) setTimeout(tick, TYPE_SPEED);
        else cb();
      };
      tick();
    };

    const eraseWord = (word, cb) => {
      let c = word.length;
      const tick = () => {
        c--;
        rotatingWordText.textContent = word.slice(0, c);
        if (c > 0) setTimeout(tick, ERASE_SPEED);
        else cb();
      };
      tick();
    };

    const cycle = () => {
      const word = words[wordIndex];
      typeWord(word, () => {
        setTimeout(() => {
          eraseWord(word, () => {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(cycle, PAUSE_BETWEEN);
          });
        }, HOLD_TIME);
      });
    };

    if (words.length > 1) {
      rotatingWordText.textContent = '';
      startRotatingWord = cycle;
    }
  }

  /* ---------- GSAP scroll reveals ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-up').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    });

    gsap.utils.toArray('[data-stagger]').forEach((group) => {
      const items = group.children;
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    /* animated counters */
    // Real value lives in the markup (visible even if this script never
    // runs). JS only resets to 0 and counts back up as a visual flourish.
    document.querySelectorAll('.count').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const obj = { val: 0 };
      el.textContent = '0' + suffix;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = (target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
            },
          });
        },
      });
    });

    /* floating CTA pill on case pages */
    const floatCta = document.querySelector('.float-cta');
    if (floatCta) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -400',
        onEnter: () => floatCta.classList.add('show'),
        onLeaveBack: () => floatCta.classList.remove('show'),
      });
    }
  }
});
