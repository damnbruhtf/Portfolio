document.addEventListener('DOMContentLoaded', () => {

    // --- Data Definition ---
    const allItems = [
        { src: "Behind the Scenes. /ekraj-1.jpg", type: "image", title: "Development Shot 1" },
        { src: "Behind the Scenes. /ekraj-image-2021-09-29-164852.jpg", type: "image", title: "Development Shot 2" },
        { src: "Behind the Scenes. /ekraj-image-2021-09-29-164930.jpg", type: "image", title: "Development Shot 3" },
        { src: "Behind the Scenes. /ekraj-image-2021-09-29-164955.jpg", type: "image", title: "Development Shot 4" },
        { src: "Behind the Scenes. /ekraj-image-2021-09-29-181159.jpg", type: "image", title: "Development Shot 5" },
        { src: "Behind the Scenes. /ekraj-image-2021-11-02-223411.jpg", type: "image", title: "Development Shot 6" },
        { src: "Behind the Scenes. /ekraj-image-2022-01-17-212031.jpg", type: "image", title: "Development Shot 7" },
        { src: "Behind the Scenes. /ekraj-image-2022-01-17-212107.jpg", type: "image", title: "Development Shot 8" },
        { src: "Behind the Scenes. /ekraj-image-2022-01-17-212251.jpg", type: "image", title: "Development Shot 9" },
        { src: "Behind the Scenes. /ekraj-image-2022-01-17-212323.jpg", type: "image", title: "Development Shot 10" },
        { src: "Behind the Scenes. /ekraj-narang-image-2021-08-26-181106.jpg", type: "image", title: "Development Shot 11" },
        { src: "Behind the Scenes. /ekraj-narang-image-2021-08-26-181126.jpg", type: "image", title: "Development Shot 12" },
        { src: "Behind the Scenes. /ekraj-narang-image-2021-08-26-181154.jpg", type: "image", title: "Development Shot 13" }
    ];

    // Create Categories - Just one main category for Bloopers to show everything
    const categories = [
        {
            title: "Behind the Scenes Gallery",
            items: allItems
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
        const bgX = 40 + (xPos * 0.2); // shifts between 40% and 60%
        const bgY = 40 + (yPos * 0.2); // shifts between 40% and 60%

        document.body.style.backgroundPosition = `${bgX}% ${bgY}%`;
    });

    // --- Hero Banner Logic ---
    const heroMediaContainer = document.getElementById('hero-media-container');
    const heroTitle = document.getElementById('hero-title');
    const heroPlayBtn = document.getElementById('hero-play-btn');
    const heroInfoBtn = document.getElementById('hero-info-btn');

    // Select a random image for Hero
    const featured = allItems[Math.floor(Math.random() * allItems.length)] || allItems[0];

    // Inject Hero Media
    let heroMediaEl = document.createElement('img');
    heroMediaEl.src = featured.src;
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
        slider.className = 'slider bloopers-slider'; // Added subclass for potentially custom styling later

        const btnRight = document.createElement('button');
        btnRight.className = 'slider-btn right';
        btnRight.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        // Add items to slider
        category.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item';

            let mediaEl = document.createElement('img');
            mediaEl.src = item.src;
            mediaEl.loading = 'lazy';
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

        let mediaEl = document.createElement('img');
        mediaEl.src = item.src;

        modalMediaContainer.insertBefore(mediaEl, modalMediaContainer.firstChild);
        modalTitle.textContent = item.title;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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
