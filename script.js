// Ubah tanggal jadian di sini (Format: YYYY-MM-DD)
const startDate = new Date('2026-05-14');

// Data Album Momen Indah
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
    }
];

let currentAlbumIndex = 0;
let currentPhotoIndex = 0;
let activePhotoList = [];

// Buat objek audio untuk efek klik
const clickSound = new Audio('assets/click.mp3');

// Fungsi untuk memainkan efek suara klik
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
    kangen: "yoo sayang kangen aku nyak,wleekk akuu juga sangatt sangat kangen sayangg,kalau sayan bisa main ayo kita main biar kangen eni hilang,walaupun nanti pas selesai main pasti kangen lagi,tapi tak apa yang penting kita bisa main bareng.",
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

// Fungsi Membuka Album
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

// Fungsi Membuka Foto Satuan
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

// Fungsi Mengubah Foto di Lightbox
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

// Navigasi Selanjutnya (Geser Kiri / Next)
function nextSlide() {
    playClickSound();
    if (activePhotoList.length <= 1) return;
    
    currentPhotoIndex = (currentPhotoIndex + 1) % activePhotoList.length;
    updateLightboxImage();
}

// Navigasi Sebelumnya (Geser Kanan / Prev)
function prevSlide() {
    playClickSound();
    if (activePhotoList.length <= 1) return;

    currentPhotoIndex = (currentPhotoIndex - 1 + activePhotoList.length) % activePhotoList.length;
    updateLightboxImage();
}

// Fungsi Menutup Modal Pratinjau Gambar
function closeImagePreview() {
    playClickSound();
    const previewModal = document.getElementById('image-preview-modal');
    if (previewModal) {
        previewModal.classList.add('hidden');
    }
}

// Inisialisasi Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }

    calculateDays();
    createFloatingElements();
    autoPlayMusic();

    // Navigasi Keyboard
    document.addEventListener('keydown', (e) => {
        const previewModal = document.getElementById('image-preview-modal');
        if (previewModal && !previewModal.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') closeImagePreview();
        }
    });

    // Support Swipe Gesture di HP
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