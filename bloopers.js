document.addEventListener('DOMContentLoaded', () => {
    const files = [
        'ekraj-1.jpg','ekraj-image-2021-09-29-164852.jpg','ekraj-image-2021-09-29-164930.jpg','ekraj-image-2021-09-29-164955.jpg','ekraj-image-2021-09-29-181159.jpg','ekraj-image-2021-11-02-223411.jpg','ekraj-image-2022-01-17-212031.jpg','ekraj-image-2022-01-17-212107.jpg','ekraj-image-2022-01-17-212251.jpg','ekraj-image-2022-01-17-212323.jpg','ekraj-narang-image-2021-08-26-181106.jpg','ekraj-narang-image-2021-08-26-181126.jpg','ekraj-narang-image-2021-08-26-181154.jpg'
    ];
    const grid = document.querySelector('#archive-grid');
    files.forEach((file, index) => {
        const figure = document.createElement('figure');
        figure.className = 'archive-card reveal visible';
        const button = document.createElement('button');
        button.type = 'button';
        const path = `Behind the Scenes. /${file}`;
        button.dataset.lightboxSrc = path;
        button.dataset.lightboxType = 'image';
        button.dataset.lightboxTitle = `Development capture ${String(index + 1).padStart(2, '0')}`;
        const image = document.createElement('img');
        image.src = path;
        image.loading = 'lazy';
        image.alt = `Development process capture ${index + 1}`;
        button.appendChild(image);
        const caption = document.createElement('figcaption');
        caption.textContent = `Process capture ${String(index + 1).padStart(2, '0')}`;
        figure.append(button, caption);
        grid.appendChild(figure);
    });
});
