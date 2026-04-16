// Get elements
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const bigImage = document.getElementById('bigImage');
const images = gallery.querySelectorAll('img');
let currentIndex = 0;

// Add click event to gallery images
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openImage(index);
    });
});

// Create fullscreen button
const fullscreenBtn = document.createElement('button');
fullscreenBtn.textContent = '⛶';
fullscreenBtn.className = 'fullscreen';
fullscreenBtn.onclick = toggleFullscreen;
lightbox.appendChild(fullscreenBtn);

// Functions
function openImage(index) {
    currentIndex = index;
    bigImage.src = images[index].src;
    bigImage.alt = images[index].alt;
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeImage() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, 300);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    bigImage.src = images[currentIndex].src;
    bigImage.alt = images[currentIndex].alt;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    bigImage.src = images[currentIndex].src;
    bigImage.alt = images[currentIndex].alt;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        lightbox.requestFullscreen().catch(err => {
            console.log(err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            closeImage();
        }
    }
});
