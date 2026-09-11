// ==========================================
// CONFIG & DATA GLOBAL
// ==========================================

// ==========================================
// CONFIG & DATA GLOBAL
// ==========================================

// Supabase
window.SUPABASE_URL =
    window.SUPABASE_URL ||
    'https://dlbmoqkstharevuryzyx.supabase.co';

window.SUPABASE_KEY =
    window.SUPABASE_KEY ||
    'sb_publishable_PBlrVmuJYizxvuTywaKCIQ_QvmVzx9d';

if (
    window.supabase &&
    typeof window.supabase.createClient === 'function'
) {
    window.loveSupabase =
        window.loveSupabase ||
        window.supabase.createClient(
            window.SUPABASE_URL,
            window.SUPABASE_KEY
        );
}

var supabase =
    window.loveSupabase || null;


// Tanggal jadian
const startDate = new Date('2026-05-14');


// Slider memory
let currentCardIndex = 0;


// Album
const albumsData = [
    {
        title: 'Album 1',
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
        title: 'Album 2',
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
        title: 'Album 3',
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
        title: 'Album 4',
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


// Suara klik
const clickSound = new Audio('assets/click.mp3');
clickSound.preload = 'auto';


// Notes
const notes = {
    capek:
        'Semangat selalu ya sayangku. Kamu hebat banget dan aku selalu bangga sama kamu. Kalau kamu merasa capek, aku ada di sini kapan pun kamu butuh.',

    kangen:
        'Kamu kangen aku ya? Hehe, aku juga sangat kangen sama kamu! Kalau ada waktu, ayo kita jalan bareng biar kangennya hilang.',

    sedih:
        'Kamu lagi sedih ya? Cerita ke aku kalau kamu siap ya. Kalau butuh pelukan, aku selalu siap peluk kamu. Kalau penyebab kamu sedih karena aku, aku minta maaf ya sayang. I love you so much!'
};


// ==========================================
// UTILITY
// ==========================================

function playClickSound() {
    try {
        clickSound.currentTime = 0;

        const promise = clickSound.play();

        if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {});
        }
    } catch (error) {}
}


function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }

    return String(text).replace(/[&<>"']/g, function (character) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[character];
    });
}


// ==========================================
// THEME
// ==========================================

function setTheme(themeName) {
    const validThemes = [
        'default',
        'cyberpunk',
        'vintage',
        'pastel'
    ];

    if (!validThemes.includes(themeName)) {
        themeName = 'default';
    }

    playClickSound();

    document.body.classList.remove(
        'theme-cyberpunk',
        'theme-vintage',
        'theme-pastel'
    );

    if (themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }

    try {
        localStorage.setItem(
            'selectedTheme',
            themeName
        );
    } catch (error) {}

    document.querySelectorAll('.theme-btn').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton =
        document.querySelector(`.theme-btn.${themeName}`);

    if (activeButton) {
        activeButton.classList.add('active');
    }
}


function loadTheme() {
    let theme = 'default';

    try {
        theme =
            localStorage.getItem('selectedTheme') ||
            'default';
    } catch (error) {
        theme = 'default';
    }

    setThemeWithoutSound(theme);
}


function setThemeWithoutSound(themeName) {
    const validThemes = [
        'default',
        'cyberpunk',
        'vintage',
        'pastel'
    ];

    if (!validThemes.includes(themeName)) {
        themeName = 'default';
    }

    document.body.classList.remove(
        'theme-cyberpunk',
        'theme-vintage',
        'theme-pastel'
    );

    if (themeName !== 'default') {
        document.body.classList.add(
            `theme-${themeName}`
        );
    }

    document.querySelectorAll('.theme-btn').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton =
        document.querySelector(
            `.theme-btn.${themeName}`
        );

    if (activeButton) {
        activeButton.classList.add('active');
    }
}


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {
    if (!pageId) return;

    playClickSound();

    const targetPage =
        document.getElementById(pageId);

    if (!targetPage) {
        console.warn(
            'Halaman tidak ditemukan:',
            pageId
        );
        return;
    }

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    targetPage.classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if (pageId === 'page-diary') {
        renderDiaryEntries();
    }

    if (pageId === 'page-playlist') {
        updatePlaylistState();
    }
}


// ==========================================
// COUNTER HARI
// ==========================================

function calculateDays() {
    const now = new Date();

    const diffTime =
        Math.max(
            0,
            now.getTime() -
            startDate.getTime()
        );

    const diffDays =
        Math.floor(
            diffTime /
            (1000 * 60 * 60 * 24)
        );

    const daysElement =
        document.getElementById(
            'days-count'
        );

    if (daysElement) {
        daysElement.innerText =
            `${diffDays} Days`;
    }
}


function updateLoveCounter() {
    calculateDays();
}


// ==========================================
// FLOATING HEART
// ==========================================

function createFloatingElements() {
    const container =
        document.getElementById(
            'heart-container'
        );

    if (!container) return;

    setInterval(() => {
        const img =
            document.createElement('img');

        img.src = 'assets/heart.png';

        img.className =
            'floating-element';

        img.style.left =
            Math.random() * 100 + 'vw';

        img.style.animationDuration =
            Math.random() * 3 + 3 + 's';

        img.style.width =
            Math.random() * 15 + 15 + 'px';

        container.appendChild(img);

        setTimeout(() => {
            if (img.parentNode) {
                img.remove();
            }
        }, 6000);

    }, 800);
}


// ==========================================
// DIARY - SUPABASE
// ==========================================

async function renderDiaryEntries() {
    const diaryList =
        document.getElementById(
            'diary-list'
        );

    if (!diaryList) return;

    if (!supabase) {
        diaryList.innerHTML =
            '<p style="opacity:0.7; color:#ff75a0; font-size:0.85rem;">Supabase belum berhasil terhubung.</p>';

        return;
    }

    diaryList.innerHTML =
        '<p style="opacity:0.7; font-size:0.9rem;">Memuat catatan...</p>';

    try {
        const {
            data,
            error
        } = await supabase
            .from('diaries')
            .select('*')
            .order(
                'created_at',
                {
                    ascending: false
                }
            );

        if (error) {
            throw error;
        }

        diaryList.innerHTML = '';

        if (
            !data ||
            data.length === 0
        ) {
            diaryList.innerHTML =
                '<p style="opacity:0.7; font-size:0.9rem;">Belum ada catatan diary di database.</p>';

            return;
        }

        data.forEach(entry => {
            const dateValue =
                entry.entry_date ||
                entry.date ||
                entry.created_at;

            let dateFormatted = '';

            if (dateValue) {
                try {
                    const parsedDate =
                        new Date(dateValue);

                    if (
                        !Number.isNaN(
                            parsedDate.getTime()
                        )
                    ) {
                        dateFormatted =
                            parsedDate
                                .toISOString()
                                .split('T')[0];
                    }
                } catch (error) {
                    dateFormatted =
                        String(dateValue);
                }
            }

            const card =
                document.createElement('div');

            card.className =
                'diary-card';

            card.innerHTML = `
                <div class="diary-card-header">
                    <h3>${escapeHtml(entry.title)}</h3>
                    <span class="diary-card-date">${escapeHtml(dateFormatted)}</span>
                </div>

                <div class="diary-card-body">
                    ${escapeHtml(entry.content).replace(/\n/g, '<br>')}
                </div>

                <div class="diary-card-footer">
                    <button
                        type="button"
                        class="btn-diary-action"
                        onclick="deleteDiaryEntry('${String(entry.id).replace(/'/g, "\\'")}')"
                    >
                        Hapus
                    </button>
                </div>
            `;

            diaryList.appendChild(card);
        });

    } catch (error) {
        console.error(
            'Error fetching diary from Supabase:',
            error
        );

        diaryList.innerHTML =
            '<p style="opacity:0.7; color:#ff75a0; font-size:0.85rem;">Gagal memuat catatan dari Supabase. Periksa koneksi, URL, API key, tabel diaries, dan RLS Supabase.</p>';
    }
}


async function addDiaryEntry() {
    playClickSound();

    const titleInput =
        document.getElementById(
            'diary-title'
        );

    const dateInput =
        document.getElementById(
            'diary-date'
        );

    const contentInput =
        document.getElementById(
            'diary-content'
        );

    if (
        !titleInput ||
        !dateInput ||
        !contentInput
    ) {
        return;
    }

    const title =
        titleInput.value.trim();

    const date =
        dateInput.value;

    const content =
        contentInput.value.trim();

    if (
        !title ||
        !date ||
        !content
    ) {
        alert(
            'Mohon isi judul, tanggal, dan cerita kamu dengan lengkap.'
        );

        return;
    }

    if (!supabase) {
        alert(
            'Supabase belum terhubung.'
        );

        return;
    }

    const button =
        document.querySelector(
            '#page-diary .diary-form-card .btn-next'
        );

    if (button) {
        button.disabled = true;
        button.dataset.originalText =
            button.textContent;
        button.textContent =
            'Menyimpan...';
    }

    try {
        const {
            error
        } = await supabase
            .from('diaries')
            .insert([
                {
                    title: title,
                    entry_date: date,
                    content: content
                }
            ]);

        if (error) {
            throw error;
        }

        titleInput.value = '';
        dateInput.value = '';
        contentInput.value = '';

        await renderDiaryEntries();

    } catch (error) {
        console.error(
            'Error adding diary to Supabase:',
            error
        );

        alert(
            'Gagal menyimpan catatan ke database Supabase.'
        );

    } finally {
        if (button) {
            button.disabled = false;
            button.textContent =
                button.dataset.originalText ||
                'Simpan Catatan';
        }
    }
}


async function deleteDiaryEntry(id) {
    playClickSound();

    if (
        !confirm(
            'Yakin ingin menghapus catatan ini dari database?'
        )
    ) {
        return;
    }

    if (!supabase) {
        alert(
            'Supabase belum terhubung.'
        );

        return;
    }

    try {
        const {
            error
        } = await supabase
            .from('diaries')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        await renderDiaryEntries();

    } catch (error) {
        console.error(
            'Error deleting diary from Supabase:',
            error
        );

        alert(
            'Gagal menghapus catatan dari Supabase.'
        );
    }
}


// ==========================================
// LOVE COUNTER MODAL
// ==========================================

function openLoveCounterModal() {
    playClickSound();

    const modal =
        document.getElementById(
            'counter-modal'
        );

    if (!modal) return;

    modal.classList.remove('hidden');

    currentCardIndex = 0;

    updateSliderPosition();

    updateLoveCounter();
}


function closeLoveCounterModal() {
    playClickSound();

    const modal =
        document.getElementById(
            'counter-modal'
        );

    if (!modal) return;

    modal.classList.add('hidden');
}


// ==========================================
// MEMORY SLIDER
// ==========================================

function updateSliderPosition() {
    const wrapper =
        document.querySelector(
            '.cards-slider-wrapper'
        );

    const track =
        document.getElementById(
            'slider-track'
        );

    const cards =
        document.querySelectorAll(
            '#slider-track .memory-card'
        );

    const dots =
        document.querySelectorAll(
            '#slider-dots .dot'
        );

    if (
        !wrapper ||
        !track ||
        !cards.length
    ) {
        return;
    }

    if (
        currentCardIndex < 0
    ) {
        currentCardIndex =
            cards.length - 1;
    }

    if (
        currentCardIndex >= cards.length
    ) {
        currentCardIndex = 0;
    }

    const card =
        cards[currentCardIndex];

    if (card) {
        const wrapperRect =
            wrapper.getBoundingClientRect();

        const cardRect =
            card.getBoundingClientRect();

        const targetLeft =
            wrapper.scrollLeft +
            (cardRect.left -
            wrapperRect.left) -
            (
                wrapper.clientWidth -
                cardRect.width
            ) / 2;

        wrapper.scrollTo({
            left: Math.max(
                0,
                targetLeft
            ),
            behavior: 'smooth'
        });
    }

    dots.forEach(
        (dot, index) => {
            dot.classList.toggle(
                'active',
                index === currentCardIndex
            );
        }
    );
}


function moveCard(direction) {
    playClickSound();

    const cards =
        document.querySelectorAll(
            '#slider-track .memory-card'
        );

    if (!cards.length) {
        return;
    }

    const numericDirection =
        Number(direction);

    if (
        Number.isNaN(
            numericDirection
        )
    ) {
        return;
    }

    currentCardIndex +=
        numericDirection;

    if (
        currentCardIndex < 0
    ) {
        currentCardIndex =
            cards.length - 1;
    }

    if (
        currentCardIndex >= cards.length
    ) {
        currentCardIndex = 0;
    }

    updateSliderPosition();
}


function goToCard(index) {
    playClickSound();

    const cards =
        document.querySelectorAll(
            '#slider-track .memory-card'
        );

    if (!cards.length) {
        return;
    }

    const numericIndex =
        Number(index);

    if (
        Number.isNaN(
            numericIndex
        )
    ) {
        return;
    }

    currentCardIndex =
        Math.max(
            0,
            Math.min(
                numericIndex,
                cards.length - 1
            )
        );

    updateSliderPosition();
}


// ==========================================
// IMAGE PREVIEW / LIGHTBOX
// ==========================================

function openImagePreview(src) {
    playClickSound();

    if (!src) return;

    activePhotoList = [
        {
            src: src,
            caption: ''
        }
    ];

    currentPhotoIndex = 0;

    updateLightboxImage();

    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (modal) {
        modal.classList.remove(
            'hidden'
        );
    }

    document.body.classList.add(
        'modal-open'
    );
}


function openAlbum(albumIndex) {
    playClickSound();

    const index =
        Number(albumIndex);

    if (
        Number.isNaN(index) ||
        !albumsData[index]
    ) {
        return;
    }

    currentAlbumIndex = index;

    activePhotoList =
        albumsData[index].photos;

    currentPhotoIndex = 0;

    updateLightboxImage();

    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (modal) {
        modal.classList.remove(
            'hidden'
        );
    }

    document.body.classList.add(
        'modal-open'
    );
}


function updateLightboxImage() {
    const image =
        document.getElementById(
            'preview-image'
        );

    const caption =
        document.getElementById(
            'preview-caption'
        );

    const prevButton =
        document.querySelector(
            '#image-preview-modal .prev-btn'
        );

    const nextButton =
        document.querySelector(
            '#image-preview-modal .next-btn'
        );

    if (
        !image ||
        !activePhotoList.length
    ) {
        return;
    }

    if (
        currentPhotoIndex < 0
    ) {
        currentPhotoIndex =
            activePhotoList.length - 1;
    }

    if (
        currentPhotoIndex >=
        activePhotoList.length
    ) {
        currentPhotoIndex = 0;
    }

    const item =
        activePhotoList[
            currentPhotoIndex
        ];

    image.src =
        item.src;

    image.alt =
        item.caption ||
        'Pratinjau Foto';

    if (caption) {
        caption.textContent =
            item.caption || '';

        caption.style.display =
            item.caption
                ? 'block'
                : 'none';
    }

    if (
        activePhotoList.length <= 1
    ) {
        if (prevButton) {
            prevButton.style.display =
                'none';
        }

        if (nextButton) {
            nextButton.style.display =
                'none';
        }
    } else {
        if (prevButton) {
            prevButton.style.display =
                'flex';
        }

        if (nextButton) {
            nextButton.style.display =
                'flex';
        }
    }
}


function nextSlide() {
    playClickSound();

    if (
        activePhotoList.length <= 1
    ) {
        return;
    }

    currentPhotoIndex =
        (
            currentPhotoIndex + 1
        ) %
        activePhotoList.length;

    updateLightboxImage();
}


function prevSlide() {
    playClickSound();

    if (
        activePhotoList.length <= 1
    ) {
        return;
    }

    currentPhotoIndex =
        (
            currentPhotoIndex - 1 +
            activePhotoList.length
        ) %
        activePhotoList.length;

    updateLightboxImage();
}


function closeImagePreview() {
    playClickSound();

    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (modal) {
        modal.classList.add(
            'hidden'
        );
    }

    document.body.classList.remove(
        'modal-open'
    );
}


// ==========================================
// MUSIC
// ==========================================

function togglePlayMusic() {
    playClickSound();

    const music =
        document.getElementById(
            'bg-music'
        );

    const vinyl =
        document.getElementById(
            'vinyl-img'
        );

    if (!music) return;

    if (music.paused) {
        const promise =
            music.play();

        if (
            promise &&
            typeof promise.then === 'function'
        ) {
            promise
                .then(() => {
                    if (vinyl) {
                        vinyl.classList.add(
                            'spin'
                        );
                    }
                })
                .catch(() => {});
        } else {
            if (vinyl) {
                vinyl.classList.add(
                    'spin'
                );
            }
        }

    } else {
        music.pause();

        if (vinyl) {
            vinyl.classList.remove(
                'spin'
            );
        }
    }
}


function autoPlayMusic() {
    const music =
        document.getElementById(
            'bg-music'
        );

    const vinyl =
        document.getElementById(
            'vinyl-img'
        );

    if (!music) return;

    const tryPlay =
        () => {
            const promise =
                music.play();

            if (
                promise &&
                typeof promise.then === 'function'
            ) {
                promise
                    .then(() => {
                        if (vinyl) {
                            vinyl.classList.add(
                                'spin'
                            );
                        }

                        removeMusicUnlock();
                    })
                    .catch(() => {});
            }
        };

    const removeMusicUnlock =
        () => {
            document.removeEventListener(
                'click',
                tryPlay
            );

            document.removeEventListener(
                'touchstart',
                tryPlay
            );

            document.removeEventListener(
                'pointerdown',
                tryPlay
            );
        };

    const promise =
        music.play();

    if (
        promise &&
        typeof promise.then === 'function'
    ) {
        promise
            .then(() => {
                if (vinyl) {
                    vinyl.classList.add(
                        'spin'
                    );
                }
            })
            .catch(() => {
                document.addEventListener(
                    'click',
                    tryPlay,
                    {
                        once: true
                    }
                );

                document.addEventListener(
                    'touchstart',
                    tryPlay,
                    {
                        once: true,
                        passive: true
                    }
                );

                document.addEventListener(
                    'pointerdown',
                    tryPlay,
                    {
                        once: true
                    }
                );
            });
    }
}


function updatePlaylistState() {
    const iframe =
        document.getElementById(
            'youtube-player'
        );

    if (!iframe) return;

    if (
        !iframe.src
    ) {
        iframe.src =
            'https://www.youtube.com/embed/d90e0b3V8w4?enablejsapi=1';
    }
}


function playSong(youtubeUrl) {
    playClickSound();

    if (!youtubeUrl) {
        return;
    }

    const iframe =
        document.getElementById(
            'youtube-player'
        );

    if (!iframe) {
        return;
    }

    let videoId = '';

    try {
        const url =
            new URL(
                youtubeUrl,
                window.location.href
            );

        if (
            url.hostname.includes(
                'youtu.be'
            )
        ) {
            videoId =
                url.pathname
                    .replace(
                        /^\/+/,
                        ''
                    )
                    .split('/')[0];

        } else if (
            url.hostname.includes(
                'youtube.com'
            )
        ) {
            videoId =
                url.searchParams.get(
                    'v'
                ) || '';

            if (
                !videoId &&
                url.pathname.startsWith(
                    '/embed/'
                )
            ) {
                videoId =
                    url.pathname
                        .split('/embed/')[1]
                        .split('/')[0];
            }
        }

    } catch (error) {
        videoId = '';
    }

    if (!videoId) {
        const match =
            String(youtubeUrl).match(
                /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/
            );

        if (match) {
            videoId =
                match[1];
        }
    }

    if (!videoId) {
        return;
    }

    iframe.src =
        `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&enablejsapi=1&rel=0`;

    document.querySelectorAll(
        '.song-card'
    ).forEach(card => {
        card.classList.remove(
            'active'
        );
    });

    const cards =
        Array.from(
            document.querySelectorAll(
                '.song-card'
            )
        );

    const currentCard =
        cards.find(card => {
            const handler =
                card.getAttribute(
                    'onclick'
                ) || '';

            return handler.includes(
                youtubeUrl
            );
        });

    if (currentCard) {
        currentCard.classList.add(
            'active'
        );
    }
}


// ==========================================
// OPEN WHEN NOTES
// ==========================================

function showNote(type) {
    playClickSound();

    const modal =
        document.getElementById(
            'note-modal'
        );

    const modalTitle =
        document.getElementById(
            'modal-title'
        );

    const modalText =
        document.getElementById(
            'modal-text'
        );

    if (!modal) return;

    const titles = {
        capek: 'Saat Kamu Capek',
        kangen: 'Saat Kamu Kangen',
        sedih: 'Saat Kamu Sedih'
    };

    if (
        !notes[type]
    ) {
        return;
    }

    if (modalTitle) {
        modalTitle.innerText =
            titles[type] ||
            'Pesan untuk kamu';
    }

    if (modalText) {
        modalText.innerText =
            notes[type];
    }

    modal.classList.remove(
        'hidden'
    );

    document.body.classList.add(
        'modal-open'
    );
}


function closeNote() {
    playClickSound();

    const modal =
        document.getElementById(
            'note-modal'
        );

    if (modal) {
        modal.classList.add(
            'hidden'
        );
    }

    document.body.classList.remove(
        'modal-open'
    );
}


// ==========================================
// ENVELOPE
// ==========================================

function openEnvelope() {
    playClickSound();

    const envelope =
        document.querySelector(
            '#page-envelope .envelope-wrapper'
        );

    const subtitle =
        document.getElementById(
            'envelope-sub'
        );

    const surpriseBox =
        document.getElementById(
            'surprise-box'
        );

    if (envelope) {
        envelope.style.display = 'none';
    }

    if (subtitle) {
        subtitle.style.display = 'none';
    }

    if (surpriseBox) {
        surpriseBox.classList.remove('hidden');
        surpriseBox.style.display = 'block';
    }
}


// ==========================================
// GIFT
// ==========================================

function openGift() {
    playClickSound();

    const giftWrapper =
        document.querySelector(
            '#page-gift .envelope-wrapper'
        );

    const giftSubtitle =
        document.getElementById(
            'gift-sub'
        );

    const surpriseBox =
        document.getElementById(
            'gift-surprise-box'
        );

    if (giftWrapper) {
        giftWrapper.style.display =
            'none';
    }

    if (giftSubtitle) {
        giftSubtitle.style.display =
            'none';
    }

    if (surpriseBox) {
        surpriseBox.classList.remove(
            'hidden'
        );

        surpriseBox.style.display =
            'block';
    }
}


// ==========================================
// HUG FEATURE
// ==========================================

function initHugFeature() {
    const hugButton =
        document.getElementById(
            'hug-btn'
        );

    const overlay =
        document.getElementById(
            'hug-overlay'
        );

    if (
        !hugButton ||
        !overlay
    ) {
        return;
    }

    let holding = false;

    function startHug(event) {
        if (holding) {
            return;
        }

        holding = true;

        if (
            event &&
            event.cancelable
        ) {
            event.preventDefault();
        }

        playClickSound();

        overlay.classList.remove(
            'hidden'
        );

        overlay.classList.add(
            'active'
        );

        if (
            navigator.vibrate
        ) {
            try {
                navigator.vibrate(
                    [100, 50, 100]
                );
            } catch (error) {}
        }
    }

    function endHug() {
        if (!holding) {
            return;
        }

        holding = false;

        overlay.classList.remove(
            'active'
        );

        overlay.classList.add(
            'hidden'
        );
    }

    hugButton.addEventListener(
        'pointerdown',
        startHug
    );

    window.addEventListener(
        'pointerup',
        endHug
    );

    window.addEventListener(
        'pointercancel',
        endHug
    );

    window.addEventListener(
        'blur',
        endHug
    );
}


// ==========================================
// MODAL HANDLING
// ==========================================

function closeAllModals() {
    document.querySelectorAll(
        '.modal'
    ).forEach(modal => {
        modal.classList.add(
            'hidden'
        );

        modal.classList.remove(
            'active'
        );
    });

    const overlay =
        document.getElementById(
            'hug-overlay'
        );

    if (overlay) {
        overlay.classList.add(
            'hidden'
        );

        overlay.classList.remove(
            'active'
        );
    }

    document.body.classList.remove(
        'modal-open'
    );
}


document.addEventListener(
    'click',
    function (event) {
        const target =
            event.target;

        if (
            target &&
            target.classList &&
            target.classList.contains(
                'modal'
            )
        ) {
            target.classList.add(
                'hidden'
            );

            target.classList.remove(
                'active'
            );

            document.body.classList.remove(
                'modal-open'
            );
        }
    }
);


// ==========================================
// MEMORY SLIDER TOUCH
// ==========================================

function initMemoryTouch() {
    const wrapper =
        document.querySelector(
            '.cards-slider-wrapper'
        );

    if (!wrapper) {
        return;
    }

    let startX = 0;
    let startY = 0;

    wrapper.addEventListener(
        'touchstart',
        function (event) {
            if (
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }

            startX =
                event.touches[0].clientX;

            startY =
                event.touches[0].clientY;
        },
        {
            passive: true
        }
    );

    wrapper.addEventListener(
        'touchend',
        function (event) {
            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {
                return;
            }

            const endX =
                event.changedTouches[0].clientX;

            const endY =
                event.changedTouches[0].clientY;

            const diffX =
                endX - startX;

            const diffY =
                endY - startY;

            if (
                Math.abs(diffX) < 40
            ) {
                return;
            }

            if (
                Math.abs(diffX) <=
                Math.abs(diffY)
            ) {
                return;
            }

            if (diffX < 0) {
                moveCard(1);
            } else {
                moveCard(-1);
            }
        },
        {
            passive: true
        }
    );
}


// ==========================================
// IMAGE PREVIEW TOUCH
// ==========================================

function initPreviewTouch() {
    const content =
        document.querySelector(
            '.preview-content'
        );

    if (!content) {
        return;
    }

    let startX = 0;
    let startY = 0;

    content.addEventListener(
        'touchstart',
        function (event) {
            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {
                return;
            }

            startX =
                event.changedTouches[0].clientX;

            startY =
                event.changedTouches[0].clientY;
        },
        {
            passive: true
        }
    );

    content.addEventListener(
        'touchend',
        function (event) {
            if (
                !event.changedTouches ||
                !event.changedTouches.length
            ) {
                return;
            }

            const endX =
                event.changedTouches[0].clientX;

            const endY =
                event.changedTouches[0].clientY;

            const diffX =
                endX - startX;

            const diffY =
                endY - startY;

            if (
                Math.abs(diffX) < 50
            ) {
                return;
            }

            if (
                Math.abs(diffX) <=
                Math.abs(diffY)
            ) {
                return;
            }

            if (diffX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        },
        {
            passive: true
        }
    );
}


// ==========================================
// KEYBOARD
// ==========================================

function initKeyboard() {
    document.addEventListener(
        'keydown',
        function (event) {
            const preview =
                document.getElementById(
                    'image-preview-modal'
                );

            if (
                preview &&
                !preview.classList.contains(
                    'hidden'
                )
            ) {
                if (
                    event.key ===
                    'ArrowRight'
                ) {
                    nextSlide();
                }

                if (
                    event.key ===
                    'ArrowLeft'
                ) {
                    prevSlide();
                }

                if (
                    event.key ===
                    'Escape'
                ) {
                    closeImagePreview();
                }

                return;
            }

            if (
                event.key ===
                'Escape'
            ) {
                closeAllModals();
            }
        }
    );
}


// ==========================================
// BUTTON / MOBILE TOUCH FIX
// ==========================================

function initMobileClickFix() {
    const elements =
        document.querySelectorAll(
            'button, .menu-item, .album-card, .song-card, .polaroid, .love-counter-box, .envelope-wrapper, .btn-next, .btn-back, .btn-open-when, .btn-hug, .nav-btn, .slider-btn, .dot, .theme-btn, .close-modal, .preview-close, [onclick]'
        );

    elements.forEach(element => {
        element.style.touchAction =
            'manipulation';

        if (
            element.tagName ===
            'BUTTON' ||
            element.hasAttribute(
                'onclick'
            ) ||
            element.classList.contains(
                'menu-item'
            ) ||
            element.classList.contains(
                'album-card'
            ) ||
            element.classList.contains(
                'song-card'
            ) ||
            element.classList.contains(
                'polaroid'
            )
        ) {
            element.style.cursor =
                'pointer';
        }

        element.addEventListener(
            'pointerdown',
            function () {
                this.classList.add(
                    'pressed'
                );
            }
        );

        element.addEventListener(
            'pointerup',
            function () {
                this.classList.remove(
                    'pressed'
                );
            }
        );

        element.addEventListener(
            'pointercancel',
            function () {
                this.classList.remove(
                    'pressed'
                );
            }
        );

        element.addEventListener(
            'pointerleave',
            function () {
                this.classList.remove(
                    'pressed'
                );
            }
        );
    });
}


// ==========================================
// SLIDER SCROLL SYNC
// ==========================================

function initSliderScroll() {
    const wrapper =
        document.querySelector(
            '.cards-slider-wrapper'
        );

    if (!wrapper) {
        return;
    }

    let scrollTimer = null;

    wrapper.addEventListener(
        'scroll',
        function () {
            clearTimeout(
                scrollTimer
            );

            scrollTimer =
                setTimeout(() => {
                    const cards =
                        document.querySelectorAll(
                            '#slider-track .memory-card'
                        );

                    if (!cards.length) {
                        return;
                    }

                    const wrapperRect =
                        wrapper.getBoundingClientRect();

                    let closestIndex = 0;
                    let closestDistance =
                        Infinity;

                    cards.forEach(
                        (card, index) => {
                            const rect =
                                card.getBoundingClientRect();

                            const cardCenter =
                                rect.left +
                                rect.width / 2;

                            const wrapperCenter =
                                wrapperRect.left +
                                wrapperRect.width / 2;

                            const distance =
                                Math.abs(
                                    cardCenter -
                                    wrapperCenter
                                );

                            if (
                                distance <
                                closestDistance
                            ) {
                                closestDistance =
                                    distance;

                                closestIndex =
                                    index;
                            }
                        }
                    );

                    currentCardIndex =
                        closestIndex;

                    document
                        .querySelectorAll(
                            '#slider-dots .dot'
                        )
                        .forEach(
                            (
                                dot,
                                index
                            ) => {
                                dot.classList.toggle(
                                    'active',
                                    index ===
                                    closestIndex
                                );
                            }
                        );

                }, 80);
        },
        {
            passive: true
        }
    );
}


// ==========================================
// IMAGE ERROR HANDLING
// ==========================================

function initImageHandling() {
    document.querySelectorAll(
        'img'
    ).forEach(image => {
        image.addEventListener(
            'error',
            function () {
                this.classList.add(
                    'image-error'
                );
            }
        );
    });
}


// ==========================================
// DIARY DATE
// ==========================================

function initDiaryDate() {
    const input =
        document.getElementById(
            'diary-date'
        );

    if (
        input &&
        !input.value
    ) {
        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                '0'
            );

        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                '0'
            );

        input.value =
            `${year}-${month}-${day}`;
    }
}


// ==========================================
// PREVENT UNWANTED DOUBLE TAP ZOOM
// ==========================================

function initTouchOptimization() {
    let lastTouchEnd = 0;

    document.addEventListener(
        'touchend',
        function (event) {
            const now =
                Date.now();

            if (
                now - lastTouchEnd <=
                300
            ) {
                if (
                    event.cancelable
                ) {
                    event.preventDefault();
                }
            }

            lastTouchEnd = now;
        },
        {
            passive: false
        }
    );
}


// ==========================================
// SUPABASE STATUS
// ==========================================

function checkSupabaseConnection() {
    if (!supabase) {
        console.warn(
            'Supabase client tidak tersedia.'
        );

        return false;
    }

    return true;
}


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        loadTheme();

        calculateDays();

        createFloatingElements();

        initHugFeature();

        initMobileClickFix();

        initMemoryTouch();

        initPreviewTouch();

        initKeyboard();

        initSliderScroll();

        initImageHandling();

        initDiaryDate();

        initTouchOptimization();

        checkSupabaseConnection();

        renderDiaryEntries();

        const wrapper =
            document.querySelector(
                '.cards-slider-wrapper'
            );

        if (wrapper) {
            setTimeout(() => {
                updateSliderPosition();
            }, 150);
        }

        setInterval(
            calculateDays,
            1000
        );

        window.addEventListener(
            'resize',
            function () {
                clearTimeout(
                    window.__sliderResizeTimer
                );

                window.__sliderResizeTimer =
                    setTimeout(
                        function () {
                            updateSliderPosition();
                        },
                        150
                    );
            }
        );
    }
);


// ==========================================
// GLOBAL EXPORT
// Agar onclick="" di HTML tetap bekerja
// ==========================================

window.showPage =
    showPage;

window.setTheme =
    setTheme;

window.openEnvelope =
    openEnvelope;

window.openGift =
    openGift;

window.openAlbum =
    openAlbum;

window.openImagePreview =
    openImagePreview;

window.closeImagePreview =
    closeImagePreview;

window.nextSlide =
    nextSlide;

window.prevSlide =
    prevSlide;

window.openLoveCounterModal =
    openLoveCounterModal;

window.closeLoveCounterModal =
    closeLoveCounterModal;

window.moveCard =
    moveCard;

window.goToCard =
    goToCard;

window.showNote =
    showNote;

window.closeNote =
    closeNote;

window.togglePlayMusic =
    togglePlayMusic;

window.playSong =
    playSong;

window.addDiaryEntry =
    addDiaryEntry;

window.deleteDiaryEntry =
    deleteDiaryEntry;

window.renderDiaryEntries =
    renderDiaryEntries;

window.calculateDays =
    calculateDays;

window.updateLoveCounter =
    updateLoveCounter;