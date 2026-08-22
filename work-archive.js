document.addEventListener('DOMContentLoaded', () => {
    const items = [
        { title: 'Mystical Cave', type: 'video', src: 'media/web/cave.mp4', poster: 'media/posters/cave.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'Atmosphere, lighting and cinematic environment composition.', facts: ['Environment', 'Lighting', 'Camera'] },
        { title: 'Sci-Fi Ship Interior', type: 'video', src: 'media/web/ship.mp4', poster: 'media/posters/ship.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'Hard-surface environment design, lighting and cinematic camera work.', facts: ['Hard Surface', 'Environment', 'Lighting'] },
        { title: 'Future Attic Flythrough', type: 'video', src: 'media/web/future-attic.mp4', poster: 'media/posters/future-attic.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'A moving view through a compact hard-surface environment study.', facts: ['Spatial Design', 'Hard Surface', 'Camera'] },
        { title: 'Restroom Animation', type: 'video', src: 'media/web/restroom.mp4', poster: 'media/posters/restroom.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'Camera movement, lighting and atmosphere inside a confined interior.', facts: ['Interior', 'Lighting', 'Composition'] },
        { title: 'Lush Forest Landscape', type: 'video', src: 'media/web/forest-landscape.mp4', poster: 'media/posters/forest-landscape.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'Foliage composition, environmental mood and camera movement.', facts: ['Foliage', 'Composition', 'Atmosphere'] },
        { title: 'Throned Skull', type: 'video', src: 'media/web/throned-skull.mp4', poster: 'media/posters/throned-skull.m4v.png', category: 'character motion', label: 'Character · Motion', description: 'Character presentation, simulation and cinematic art direction.', facts: ['Character', 'Simulation', 'Presentation'] },
        { title: 'Mystical Sword', type: 'image', src: 'Sword.jpg', alt: 'Ornate fantasy sword presented against purple clouds', category: 'prop concept', label: 'Prop · 3D Art', description: 'Ornate hard-surface prop design, materials and dramatic presentation.', facts: ['Prop', 'Materials', 'Lighting'] },
        { title: 'Wraith Concept', type: 'image', src: 'Wraith.PNG', alt: 'Wraith character concept', category: 'character concept', label: 'Character · Concept', description: 'Silhouette exploration and supernatural character design.', facts: ['Character', 'Silhouette', 'Concept'] },
        { title: 'Skull Girl Animation', type: 'video', src: 'media/web/skull-girl.mp4', poster: 'media/posters/skull-girl.m4v.png', category: 'character motion', label: 'Character · Motion', description: 'An animated extension of a surreal portrait and anatomy study.', facts: ['Character', 'Anatomy', 'Motion'] },
        { title: 'Tornado Simulation', type: 'video', src: 'media/web/tornado-sim.mp4', poster: 'media/posters/tornado-sim.m4v.png', category: 'motion concept', label: 'FX · Simulation', description: 'A procedural-effects study exploring turbulent volume and motion.', facts: ['Simulation', 'Volume', 'FX'] },
        { title: 'Future Attic', type: 'image', src: 'Future attic.png', alt: 'Future Attic environment concept', category: 'environment concept', label: 'Environment · Concept', description: 'Hard-surface environment concept and spatial storytelling.', facts: ['Environment', 'Hard Surface', 'Concept'] },
        { title: 'Abandoned Hospital', type: 'image', src: 'Hospital.jpg', alt: 'Abandoned hospital environment concept', category: 'environment concept', label: 'Environment · Concept', description: 'Horror environment framing, value structure and visual narrative.', facts: ['Environment', 'Horror', 'Composition'] },
        { title: 'Restroom Fisheye', type: 'image', src: "Restroom fisheye'.png", alt: 'Fisheye composition of a restroom environment', category: 'environment concept', label: 'Environment · Composition', description: 'Stylized lens treatment and claustrophobic environmental framing.', facts: ['Interior', 'Composition', 'Lens Study'] },
        { title: 'Dark Forest', type: 'video', src: 'media/web/dark-forest.mp4', poster: 'media/posters/dark-forest.m4v.png', category: 'environment motion', label: 'Environment · Motion', description: 'A darker environmental study focused on silhouettes, depth and mood.', facts: ['Environment', 'Depth', 'Atmosphere'] },
        { title: 'Mystical Stag: Moonlit Study', type: 'image', src: 'Stag v.2', alt: 'A glowing white stag framed by a dark forest', category: 'environment concept', label: 'Environment · Concept', description: 'Atmospheric forest composition built around a high-contrast focal silhouette.', facts: ['Environment', 'Silhouette', 'Mood'] },
        { title: 'Mystical Stag: Ember Study', type: 'image', src: 'Stag.jpg', alt: 'A glowing stag in a warm foggy forest', category: 'environment concept', label: 'Environment · Concept', description: 'A warm color and fog variation exploring the same forest encounter.', facts: ['Environment', 'Color', 'Fog'] },
        { title: 'Deep Space Exploration', type: 'image', src: 'space.jpg', alt: 'Colorful deep-space nebula and star field', category: 'environment concept', label: 'Environment · Concept', description: 'Nebula, star-field and color-composition study for a cosmic environment.', facts: ['Environment', 'Color', 'Concept'] },
        { title: 'Wall-E Tribute Environment', type: 'image', src: 'Wall-E.jpg', alt: 'Dark reflective environment with a small robot and illuminated screens', category: 'environment concept', label: 'Environment · Tribute', description: 'Reflective surfaces, emissive screens and cinematic low-key lighting.', facts: ['Environment', 'Emissive', 'Lighting'] },
        { title: 'Lady Lighting Study', type: 'image', src: 'Lady.PNG', alt: 'Full-body character form lit with red and green rim lights', category: 'character concept', label: 'Character · Lighting', description: 'Full-body form, pose and colored rim-light exploration.', facts: ['Character', 'Pose', 'Lighting'] },
        { title: 'Skull Girl Portrait', type: 'image', src: 'S Girl.jpg', alt: 'Surreal portrait of a skull opening above a human head', category: 'character concept', label: 'Character · Concept', description: 'Surreal character composition exploring anatomy, silhouette and mood.', facts: ['Character', 'Anatomy', 'Concept'] },
        { title: 'Character Study: Face', type: 'image', src: 'Face.jpg', alt: 'Character face study', category: 'character concept', label: 'Character · Study', description: 'Portrait study focused on form, planes and expression.', facts: ['Character', 'Form', 'Expression'] },
        { title: 'Cyber Wolf', type: 'video', src: 'media/web/cyber-wolf.mp4', poster: 'media/posters/cyber-wolf.m4v.png', category: 'character motion', label: 'Character · Motion', description: 'Creature presentation combining motion and a stylized technological treatment.', facts: ['Creature', 'Motion', 'Presentation'] },
        { title: 'Zombie Animation', type: 'video', src: 'media/web/zombie.mp4', poster: 'media/posters/zombie.m4v.png', category: 'character motion', label: 'Character · Motion', description: 'Undead character motion study focused on weight and unsettling movement.', facts: ['Character', 'Weight', 'Motion'] },
        { title: 'Tornado Simulation Still', type: 'image', src: 'tornado still%3B.png', alt: 'Blue volumetric tornado simulation on black', category: 'motion concept', label: 'FX · Still', description: 'A close render highlighting the simulation’s layered volume and color.', facts: ['Simulation', 'Volume', 'FX'] }
    ];

    const grid = document.querySelector('#complete-work-grid');
    if (!grid) return;

    items.forEach(item => {
        const article = document.createElement('article');
        article.className = 'work-card reveal';
        article.dataset.category = item.category;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'media-button';
        button.dataset.lightboxSrc = item.src;
        button.dataset.lightboxType = item.type;
        button.dataset.lightboxTitle = item.title;

        const media = document.createElement(item.type === 'video' ? 'video' : 'img');
        if (item.type === 'video') {
            media.dataset.src = item.src;
            media.poster = item.poster;
            media.preload = 'none';
            media.muted = true;
            media.loop = true;
            media.playsInline = true;
        } else {
            media.src = item.src;
            media.alt = item.alt;
            media.loading = 'lazy';
        }

        const label = document.createElement('span');
        label.className = 'media-type';
        label.textContent = item.label;
        button.append(media, label);

        const heading = document.createElement('h3');
        heading.textContent = item.title;
        const description = document.createElement('p');
        description.textContent = item.description;
        const facts = document.createElement('ul');
        facts.className = 'work-facts';
        item.facts.forEach(fact => {
            const listItem = document.createElement('li');
            listItem.textContent = fact;
            facts.appendChild(listItem);
        });

        article.append(button, heading, description, facts);
        grid.appendChild(article);
    });
});
