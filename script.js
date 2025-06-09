document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentIndex = 0;
    let filteredImages = Array.from(galleryItems); // Initially all images

    // --- Lightbox Functionality ---
    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = 'flex';
        lightboxImg.src = filteredImages[currentIndex].querySelector('img').src;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        lightboxImg.src = filteredImages[currentIndex].querySelector('img').src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        lightboxImg.src = filteredImages[currentIndex].querySelector('img').src;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Find the index of the clicked item within the currently filtered images
            const clickedSrc = item.querySelector('img').src;
            const newIndex = filteredImages.findIndex(imgItem => imgItem.querySelector('img').src === clickedSrc);
            openLightbox(newIndex);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // --- Filtering Functionality ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            filteredImages = []; // Reset filtered images

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    filteredImages.push(item); // Add to filtered images
                } else {
                    item.style.display = 'none';
                }
            });
            // Reset current index for lightbox if filtering changes the set of images
            currentIndex = 0;
        });
    });
});