document.addEventListener('DOMContentLoaded', () => {

    // --- Data Definition ---
    const allItems = [
        { src: "space.jpg", type: "image", title: "Deep Space Exploration" },
        { src: "Cave.mp4", type: "video", title: "Mystical Cave" },
        { src: "Face.jpg", type: "image", title: "Character Study: Face" },
        { src: "Forest Landscape.mp4", type: "video", title: "Lush Forest Landscape" },
        { src: "Forest.mp4", type: "video", title: "Dark Forest" },
        { src: "Future attic flythrough.mp4", type: "video", title: "Future Attic Flythrough" },
        { src: "Future attic.png", type: "image", title: "Future Attic Concept" },
        { src: "Hospital.jpg", type: "image", title: "Abandoned Hospital" },
        { src: "Lady.PNG", type: "image", title: "Character Study: Lady" },
        { src: "Restroom fisheye'.png", type: "image", title: "Restroom Fisheye" },
        { src: "Restroom.mp4", type: "video", title: "Restroom Animation" },
        { src: "S Girl.jpg", type: "image", title: "Skull Girl Portrait" },
        { src: "Ship.mp4", type: "video", title: "Sci-Fi Ship Interior" },
        { src: "Skull Girl .mp4", type: "video", title: "Skull Girl Animation" },
        { src: "Stag.jpg", type: "image", title: "Mystical Stag" },
        { src: "Stag v.2", type: "image", title: "Mystical Stag V2" },
        { src: "Sword.jpg", type: "image", title: "Mystical Sword" },
        { src: "Throned skull.mp4", type: "video", title: "Throned Skull" },
        { src: "Wall-E.jpg", type: "image", title: "Wall-E Tribute" },
        { src: "Wolf nano.mp4", type: "video", title: "Cyber Wolf" },
        { src: "Wraith.PNG", type: "image", title: "Wraith Concept" },
        { src: "Zombie.mp4", type: "video", title: "Zombie Animation" }
    ];

    // Create Categories
    const categories = [
        {
            title: "Trending Animations",
            items: allItems.filter(i => i.type === 'video').sort(() => 0.5 - Math.random()).slice(0, 8) // Randomize 8 videos
        },
        {
            title: "Cinematic Environments",
            items: allItems.filter(i => i.title.toLowerCase().includes('forest') || i.title.toLowerCase().includes('cave') || i.title.toLowerCase().includes('restroom') || i.title.toLowerCase().includes('ship'))
        },
        {
            title: "Concept Art & Stills",
            items: allItems.filter(i => i.type === 'image')
        },
        {
            title: "Simulations & Characters",
            items: allItems.filter(i => i.title.toLowerCase().includes('skull') || i.title.toLowerCase().includes('zombie') || i.title.toLowerCase().includes('wolf') || i.title.toLowerCase().includes('face') || i.title.toLowerCase().includes('lady') || i.title.toLowerCase().includes('wraith'))
        }
    ];

    // --- Intro Animation ---
    const introBrand = document.getElementById('intro-brand');
    const introScreen = document.getElementById('intro-screen');
    const mainBrand = document.getElementById('main-brand');

    if (introBrand && introScreen) {
        document.body.style.overflow = 'hidden'; // Lock scrolling during intro
        setTimeout(() => {
            introBrand.classList.add('shrink');
            introScreen.classList.add('fade');

            setTimeout(() => {
                mainBrand.style.opacity = '1';
                introBrand.remove();
                introScreen.remove();
                document.body.style.overflow = ''; // Unlock scrolling
            }, 1000); // Wait for transition to finish
        }, 1500); // Hold in middle for 1.5s
    }

    // --- Mouse Tracking Gradient ---
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position as a percentage of the window
        const xPos = (e.clientX / window.innerWidth) * 100;
        const yPos = (e.clientY / window.innerHeight) * 100;

        // Slightly constrain the movement so it is subtle
        // We move the background position based on mouse position
        // 50% is center. We shift it slightly around the center.
        const bgX = 40 + (xPos * 0.2); // shifts between 40% and 60%
        const bgY = 40 + (yPos * 0.2); // shifts between 40% and 60%

        document.body.style.backgroundPosition = `${bgX}% ${bgY}%`;
    });

    // --- Hero Banner Logic ---
    const heroMediaContainer = document.getElementById('hero-media-container');
    const heroTitle = document.getElementById('hero-title');
    const heroPlayBtn = document.getElementById('hero-play-btn');
    const heroInfoBtn = document.getElementById('hero-info-btn');

    // Select a random video for Hero
    const heroVideos = allItems.filter(i => i.type === 'video');
    const featured = heroVideos[Math.floor(Math.random() * heroVideos.length)] || allItems[0];

    // Inject Hero Media
    let heroMediaEl;
    if (featured.type === 'video') {
        heroMediaEl = document.createElement('video');
        heroMediaEl.src = featured.src;
        heroMediaEl.autoplay = true;
        heroMediaEl.muted = true;
        heroMediaEl.loop = true;
        heroMediaEl.playsInline = true;
    } else {
        heroMediaEl = document.createElement('img');
        heroMediaEl.src = featured.src;
    }
    heroMediaContainer.insertBefore(heroMediaEl, heroMediaContainer.firstChild);
    heroTitle.textContent = featured.title;

    heroPlayBtn.addEventListener('click', () => openModal(featured));
    heroInfoBtn.addEventListener('click', () => openModal(featured));

    // --- Navbar Scroll Logic ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Build Content Rows ---
    const mainContent = document.getElementById('main-content');

    categories.forEach(category => {
        if (category.items.length === 0) return;

        const rowEl = document.createElement('div');
        rowEl.className = 'row';

        const headerEl = document.createElement('h2');
        headerEl.className = 'row-header';
        headerEl.textContent = category.title;
        rowEl.appendChild(headerEl);

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const btnLeft = document.createElement('button');
        btnLeft.className = 'slider-btn left';
        btnLeft.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

        const slider = document.createElement('div');
        slider.className = 'slider';

        const btnRight = document.createElement('button');
        btnRight.className = 'slider-btn right';
        btnRight.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        // Add items to slider
        category.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item';

            let mediaEl;
            if (item.type === 'video') {
                mediaEl = document.createElement('video');
                mediaEl.src = item.src;
                mediaEl.muted = true;
                mediaEl.loop = true;
                mediaEl.autoplay = true;
                mediaEl.playsInline = true;

            } else {
                mediaEl = document.createElement('img');
                mediaEl.src = item.src;
                mediaEl.loading = 'lazy';
            }
            mediaEl.className = 'item-media';

            const infoEl = document.createElement('div');
            infoEl.className = 'item-info';
            const titleEl = document.createElement('span');
            titleEl.className = 'item-title';
            titleEl.textContent = item.title;
            infoEl.appendChild(titleEl);

            itemEl.appendChild(mediaEl);
            itemEl.appendChild(infoEl);

            itemEl.addEventListener('click', () => openModal(item));

            slider.appendChild(itemEl);
        });

        // Scroll Logic
        btnLeft.addEventListener('click', () => {
            slider.scrollBy({ left: -window.innerWidth / 2, behavior: 'smooth' });
        });
        btnRight.addEventListener('click', () => {
            slider.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
        });

        sliderContainer.appendChild(btnLeft);
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(btnRight);
        rowEl.appendChild(sliderContainer);
        mainContent.appendChild(rowEl);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const modalTitle = document.getElementById('modal-title');

    function openModal(item) {
        // Clear old media (except vignette)
        const oldMedia = modalMediaContainer.querySelector('video, img');
        if (oldMedia) oldMedia.remove();

        let mediaEl;
        if (item.type === 'video') {
            mediaEl = document.createElement('video');
            mediaEl.src = item.src;
            mediaEl.controls = true;
            mediaEl.autoplay = true;
            mediaEl.loop = true;
        } else {
            mediaEl = document.createElement('img');
            mediaEl.src = item.src;
        }

        modalMediaContainer.insertBefore(mediaEl, modalMediaContainer.firstChild);
        modalTitle.textContent = item.title;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const media = modalMediaContainer.querySelector('video');
        if (media) {
            media.pause();
            setTimeout(() => media.remove(), 300);
        }
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Smooth scroll for nav links (anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
