// Tanggal jadian
const startDate = new Date('2026-05-14');

// Variable Slider Counting Days
let currentCardIndex = 0;

function openLoveCounterModal() {
    playClickSound();
    const modal = document.getElementById('counter-modal');
    if (modal) {
        modal.classList.remove('hidden');
        currentCardIndex = 0;
        updateSliderPosition();
    }
}

function closeLoveCounterModal() {
    playClickSound();
    const modal = document.getElementById('counter-modal');
    if (modal) modal.classList.add('hidden');
}

// Logika Navigasi Slider Counting Days
function updateSliderPosition() {
    const wrapper = document.querySelector('.cards-slider-wrapper');
    const cards = document.querySelectorAll('.memory-card');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (cards.length > 0 && wrapper) {
        const cardWidth = cards[0].offsetWidth + 15; // Width + gap
        wrapper.scrollTo({
            left: currentCardIndex * cardWidth,
            behavior: 'smooth'
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentCardIndex);
        });
    }
}

function moveCard(direction) {
    playClickSound();
    const cards = document.querySelectorAll('.memory-card');
    currentCardIndex += direction;

    if (currentCardIndex < 0) {
        currentCardIndex = cards.length - 1;
    } else if (currentCardIndex >= cards.length) {
        currentCardIndex = 0;
    }

    updateSliderPosition();
}

function goToCard(index) {
    playClickSound();
    currentCardIndex = index;
    updateSliderPosition();
}

// Data Album Foto
const albumsData = [
    {
        title: "Album 1",
        photos: [
            { src: 'assets/foto6.jpeg', caption: 'Momen Indah 1.1' },
            { src: 'assets/foto7.jpeg', caption: 'Momen Indah 1.2' },
            { src: 'assets/foto8.jpeg', caption: 'Momen Indah 1.3' },
            { src: 'assets/foto9.jpeg', caption: 'Momen Indah 1.4' },
            { src: 'assets/foto10.jpeg', caption: 'Momen Indah 1.5' },
            { src: 'assets/foto11.jpeg', caption: 'Momen Indah 1.6' }
        ]
    },
    {
        title: "Album 2",
        photos: [
            { src: 'assets/foto12.jpeg', caption: 'Momen Indah 2.1' },
            { src: 'assets/foto13.jpeg', caption: 'Momen Indah 2.2' },
            { src: 'assets/foto14.jpeg', caption: 'Momen Indah 2.3' },
            { src: 'assets/foto15.jpeg', caption: 'Momen Indah 2.4' },
            { src: 'assets/foto16.jpeg', caption: 'Momen Indah 2.5' },
            { src: 'assets/foto17.jpeg', caption: 'Momen Indah 2.6' }
        ]
    },
    {
        title: "Album 3",
        photos: [
            { src: 'assets/foto18.jpeg', caption: 'Momen Indah 3.1' },
            { src: 'assets/foto19.jpeg', caption: 'Momen Indah 3.2' },
            { src: 'assets/foto20.jpeg', caption: 'Momen Indah 3.3' },
            { src: 'assets/foto21.jpeg', caption: 'Momen Indah 3.4' },
            { src: 'assets/foto22.jpeg', caption: 'Momen Indah 3.5' },
            { src: 'assets/foto23.jpeg', caption: 'Momen Indah 3.6' }
        ]
    },
    {
        title: "Album 4",
        photos: [
            { src: 'assets/foto24.jpeg', caption: '4.1' },
            { src: 'assets/foto25.jpeg', caption: '4.2' },
            { src: 'assets/foto26.jpeg', caption: '4.3' },
            { src: 'assets/foto27.jpeg', caption: '4.4' },
            { src: 'assets/foto28.jpeg', caption: '4.5' },
            { src: 'assets/foto29.jpeg', caption: '4.6' }
        ]
    }
];

let currentAlbumIndex = 0;
let currentPhotoIndex = 0;
let activePhotoList = [];

const clickSound = new Audio('assets/click.mp3');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

function setTheme(themeName) {
    playClickSound();
    document.body.classList.remove('theme-cyberpunk', 'theme-vintage', 'theme-pastel');

    if (themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }

    localStorage.setItem('selectedTheme', themeName);
}

function calculateDays() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const daysElement = document.getElementById('days-count');
    if (daysElement) {
        daysElement.innerText = `${diffDays} Days`;
    }
}

function autoPlayMusic() {
    const music = document.getElementById('bg-music');
    const vinyl = document.getElementById('vinyl-img');

    if (music) {
        music.play().then(() => {
            if (vinyl) vinyl.classList.add('spin');
        }).catch(() => {
            const startMusicOnUserInteraction = () => {
                music.play().then(() => {
                    if (vinyl) vinyl.classList.add('spin');
                });
                document.removeEventListener('click', startMusicOnUserInteraction);
            };
            document.addEventListener('click', startMusicOnUserInteraction);
        });
    }
}

const notes = {
    capek: "semangat selalu ya sayanggku,sayangg sangat sangatt hebat aku bangga sama sayang,kalau sayang capek aku ada buat sayang kapanpun itu.",
    kangen: "yoo sayang kangen aku nyak,wleekk akuu juga sangatt sangat kangen sayangg,kalau sayangg bisa main ayo kita main biar kangen eni hilang,walaupun nanti pas selesai main pasti kangen lagi,tapi tak apa yang penting kita bisa main bareng.",
    sedih: "sayang lagi sedih yaa?:(, sayang bisa cerita ke aku kalau sayang mau,dan kalau sayang mau peluk aku juga bisa buat peluk sayang kapanpun itu,dan kalau penyebab sayang sedih gara gara aku maafinn aku yaa sayangg,aku pasti bisa mgertiin sayang cuman aku harus mikir keras biar sayang engga sedih lagi,i lovee u sayanggkuu",
};

function showNote(type) {
    playClickSound();
    const modal = document.getElementById('note-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    if (type === 'capek') modalTitle.innerText = "Saat Kamu Capek";
    if (type === 'kangen') modalTitle.innerText = "Saat Kamu Kangen";
    if (type === 'sedih') modalTitle.innerText = "Saat Kamu Sedih";

    modalText.innerText = notes[type];
    modal.classList.remove('hidden');
}

function closeNote() {
    playClickSound();
    const modal = document.getElementById('note-modal');
    modal.classList.add('hidden');
}

function createFloatingElements() {
    const container = document.getElementById('heart-container');
    if (!container) return;

    setInterval(() => {
        const img = document.createElement('img');
        img.src = 'assets/heart.png';
        img.classList.add('floating-element');
        img.style.left = Math.random() * 100 + 'vw';
        img.style.animationDuration = Math.random() * 3 + 3 + 's';
        img.style.width = Math.random() * 15 + 15 + 'px';
        
        container.appendChild(img);

        setTimeout(() => {
            img.remove();
        }, 6000);
    }, 800);
}

function openEnvelope() {
    playClickSound();
    const envelopeWrap = document.querySelector("#page-envelope .envelope-wrapper");
    const envelopeSub = document.getElementById("envelope-sub");
    
    if (envelopeWrap) envelopeWrap.style.display = "none";
    if (envelopeSub) envelopeSub.style.display = "none";

    const surpriseBox = document.getElementById("surprise-box");
    if (surpriseBox) {
        surpriseBox.classList.remove("hidden");
        surpriseBox.style.display = "block";
    }
}

function openGift() {
    playClickSound();
    const giftWrap = document.querySelector("#page-gift .envelope-wrapper");
    const giftSub = document.getElementById("gift-sub");

    if (giftWrap) giftWrap.style.display = "none";
    if (giftSub) giftSub.style.display = "none";

    const giftSurpriseBox = document.getElementById("gift-surprise-box");
    if (giftSurpriseBox) {
        giftSurpriseBox.classList.remove("hidden");
        giftSurpriseBox.style.display = "block";
    }
}

function showPage(pageId) {
    playClickSound();
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    const youtubePlayer = document.getElementById('youtube-player');
    if (youtubePlayer && pageId !== 'page-playlist') {
        youtubePlayer.src = youtubePlayer.src;
    }
}

function togglePlayMusic() {
    playClickSound();
    const music = document.getElementById('bg-music');
    const vinyl = document.getElementById('vinyl-img');

    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            if (vinyl) vinyl.classList.add('spin');
        });
    } else {
        music.pause();
        if (vinyl) vinyl.classList.remove('spin');
    }
}

function playSong(youtubeUrl) {
    playClickSound();
    const iframe = document.getElementById('youtube-player');
    if (!iframe) return;

    let videoId = '';

    if (youtubeUrl.includes('youtu.be/')) {
        videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
    } else if (youtubeUrl.includes('watch?v=')) {
        videoId = youtubeUrl.split('watch?v=')[1].split('&')[0];
    }

    if (videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
    }
}

function openAlbum(albumIndex) {
    playClickSound();
    
    currentAlbumIndex = albumIndex;
    activePhotoList = albumsData[albumIndex].photos;
    currentPhotoIndex = 0;
    
    updateLightboxImage();
    
    const previewModal = document.getElementById('image-preview-modal');
    if (previewModal) {
        previewModal.classList.remove('hidden');
    }
}

function openImagePreview(src) {
    playClickSound();
    
    activePhotoList = [{ src: src, caption: '' }];
    currentPhotoIndex = 0;
    
    updateLightboxImage();
    
    const previewModal = document.getElementById('image-preview-modal');
    if (previewModal) {
        previewModal.classList.remove('hidden');
    }
}

function updateLightboxImage() {
    const previewImage = document.getElementById('preview-image');
    const previewCaption = document.getElementById('preview-caption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (activePhotoList.length > 0) {
        const item = activePhotoList[currentPhotoIndex];
        if (previewImage) previewImage.src = item.src;
        
        if (previewCaption) {
            previewCaption.innerText = item.caption || '';
            previewCaption.style.display = item.caption ? 'block' : 'none';
        }

        if (activePhotoList.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    }
}

function nextSlide() {
    playClickSound();
    if (activePhotoList.length <= 1) return;
    
    currentPhotoIndex = (currentPhotoIndex + 1) % activePhotoList.length;
    updateLightboxImage();
}

function prevSlide() {
    playClickSound();
    if (activePhotoList.length <= 1) return;

    currentPhotoIndex = (currentPhotoIndex - 1 + activePhotoList.length) % activePhotoList.length;
    updateLightboxImage();
}

function closeImagePreview() {
    playClickSound();
    const previewModal = document.getElementById('image-preview-modal');
    if (previewModal) {
        previewModal.classList.add('hidden');
    }
}

function initHugFeature() {
    const hugBtn = document.getElementById('hug-btn');
    const hugOverlay = document.getElementById('hug-overlay');

    if (!hugBtn || !hugOverlay) return;

    function startHug(e) {
        if (e.type === 'touchstart') e.preventDefault();
        
        playClickSound();
        hugOverlay.classList.remove('hidden');
        hugOverlay.classList.add('active');

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    function endHug() {
        hugOverlay.classList.remove('active');
        hugOverlay.classList.add('hidden');
    }

    hugBtn.addEventListener('mousedown', startHug);
    window.addEventListener('mouseup', endHug);

    hugBtn.addEventListener('touchstart', startHug, { passive: false });
    window.addEventListener('touchend', endHug);
}

// Event Listener Utama
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }

    calculateDays();
    createFloatingElements();
    autoPlayMusic();
    initHugFeature();

    // Event Scroll Manual untuk Slider Counting Days
    const wrapper = document.querySelector('.cards-slider-wrapper');
    if (wrapper) {
        wrapper.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.memory-card');
            if (cards.length > 0) {
                const cardWidth = cards[0].offsetWidth + 15;
                const newIndex = Math.round(wrapper.scrollLeft / cardWidth);
                
                const dots = document.querySelectorAll('.slider-dots .dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === newIndex);
                });
                currentCardIndex = newIndex;
            }
        });
    }

    // Keyboard Navigation untuk Lightbox Modal
    document.addEventListener('keydown', (e) => {
        const previewModal = document.getElementById('image-preview-modal');
        if (previewModal && !previewModal.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') closeImagePreview();
        }
    });

    // Swipe Gesture untuk Mobile Lightbox
    let touchStartX = 0;
    let touchEndX = 0;
    const modalContent = document.querySelector('.preview-content');

    if (modalContent) {
        modalContent.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalContent.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
});