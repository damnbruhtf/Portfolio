document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!reducedMotion && finePointer) {
        const root = document.documentElement;
        let pointerX = 0.54;
        let pointerY = 0.32;
        let targetX = pointerX;
        let targetY = pointerY;
        let backgroundFrame = null;

        const moveBackground = () => {
            pointerX += (targetX - pointerX) * 0.075;
            pointerY += (targetY - pointerY) * 0.075;
            root.style.setProperty('--pointer-x', `${(pointerX * 100).toFixed(2)}%`);
            root.style.setProperty('--pointer-y', `${(pointerY * 100).toFixed(2)}%`);
            root.style.setProperty('--pointer-x-alt', `${((1 - pointerX) * 100).toFixed(2)}%`);
            root.style.setProperty('--pointer-y-alt', `${((1 - pointerY) * 100).toFixed(2)}%`);

            if (Math.abs(targetX - pointerX) > 0.001 || Math.abs(targetY - pointerY) > 0.001) {
                backgroundFrame = requestAnimationFrame(moveBackground);
            } else {
                backgroundFrame = null;
            }
        };

        window.addEventListener('pointermove', event => {
            targetX = event.clientX / window.innerWidth;
            targetY = event.clientY / window.innerHeight;
            if (backgroundFrame === null) backgroundFrame = requestAnimationFrame(moveBackground);
        }, { passive: true });
    }

    const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    toggle?.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
    }));

    const reveals = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        reveals.forEach(item => item.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
        reveals.forEach(item => observer.observe(item));
    }

    const previewVideos = [...document.querySelectorAll('.media-button video')];
    const previewStates = new WeakMap();

    const loadPreviewVideo = video => {
        if (video.getAttribute('src') || !video.dataset.src) return;
        video.src = video.dataset.src;
        video.addEventListener('loadeddata', () => syncPreviewPlayback(video), { once: true });
        video.load();
    };

    const syncPreviewPlayback = video => {
        const state = previewStates.get(video);
        if (!state) return;
        const card = video.closest('.work-card');
        const isAvailable = !card?.hidden;
        const shouldPlay = !document.hidden && isAvailable && (state.hovered || (!reducedMotion && state.inViewport));

        if (shouldPlay) {
            loadPreviewVideo(video);
            if (video.readyState >= 2) video.play().catch(() => {});
        } else {
            video.pause();
            if (video.readyState > 0) video.currentTime = 0;
        }
    };

    previewVideos.forEach(video => {
        const state = { inViewport: false, hovered: false };
        previewStates.set(video, state);
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        const container = video.closest('.media-button');
        container?.addEventListener('pointerenter', () => {
            state.hovered = true;
            loadPreviewVideo(video);
            syncPreviewPlayback(video);
        });
        container?.addEventListener('pointerleave', () => {
            state.hovered = false;
            syncPreviewPlayback(video);
        });
    });

    if ('IntersectionObserver' in window) {
        const loadObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                loadPreviewVideo(entry.target);
                loadObserver.unobserve(entry.target);
            });
        }, { rootMargin: '500px 0px', threshold: 0 });
        previewVideos.forEach(video => loadObserver.observe(video));
    } else {
        previewVideos.forEach(loadPreviewVideo);
    }

    if (!reducedMotion && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const state = previewStates.get(entry.target);
                state.inViewport = entry.isIntersecting && entry.intersectionRatio >= 0.55;
                syncPreviewPlayback(entry.target);
            });
        }, { threshold: [0, 0.55, 1], rootMargin: '0px 0px -5% 0px' });

        previewVideos.forEach(video => videoObserver.observe(video));
    }

    document.addEventListener('visibilitychange', () => {
        previewVideos.forEach(syncPreviewPlayback);
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    const workCards = document.querySelectorAll('.work-card');
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    filterButtons.forEach(button => button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(candidate => {
            const isActive = candidate === button;
            candidate.classList.toggle('active', isActive);
            candidate.setAttribute('aria-pressed', String(isActive));
        });
        workCards.forEach(card => {
            const categories = card.dataset.category?.split(' ') || [];
            card.hidden = filter !== 'all' && !categories.includes(filter);
            const video = card.querySelector('video');
            if (video) syncPreviewPlayback(video);
        });
    }));

    const lightbox = document.querySelector('#lightbox');
    const stage = lightbox?.querySelector('.lightbox-stage');
    const title = lightbox?.querySelector('.lightbox-title');
    const closeButton = lightbox?.querySelector('.lightbox-close');
    let previousFocus = null;

    const closeLightbox = () => {
        if (!lightbox?.classList.contains('open')) return;
        const video = stage?.querySelector('video');
        video?.pause();
        stage?.replaceChildren();
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        previousFocus?.focus();
    };

    document.querySelectorAll('[data-lightbox-src]').forEach(trigger => trigger.addEventListener('click', () => {
        if (!lightbox || !stage || !title) return;
        previousFocus = trigger;
        const type = trigger.dataset.lightboxType;
        const media = document.createElement(type === 'video' ? 'video' : 'img');
        media.src = trigger.dataset.lightboxSrc;
        if (type === 'video') {
            media.controls = true;
            media.autoplay = true;
            media.playsInline = true;
        } else {
            media.alt = trigger.dataset.lightboxTitle || '';
        }
        stage.replaceChildren(media);
        title.textContent = trigger.dataset.lightboxTitle || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeButton?.focus();
    }));

    closeButton?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'Tab' && lightbox?.classList.contains('open')) {
            const focusable = [...lightbox.querySelectorAll('button, video[controls]')].filter(element => !element.disabled);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
});
