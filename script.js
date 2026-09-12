// ==========================================
// CONFIG & DATA GLOBAL
// ==========================================

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


// ==========================================
// TANGGAL JADIAN
// ==========================================

const startDate =
    new Date('2026-05-14');


// ==========================================
// COUNTER SLIDER
// ==========================================

let currentCardIndex = 0;


// ==========================================
// ALBUM
// ==========================================

const albumsData = [
    {
        title: 'Album 1',
        photos: [
            {
                src: 'assets/foto6.jpeg',
                caption: 'Momen Indah 1.1'
            },
            {
                src: 'assets/foto7.jpeg',
                caption: 'Momen Indah 1.2'
            },
            {
                src: 'assets/foto8.jpeg',
                caption: 'Momen Indah 1.3'
            },
            {
                src: 'assets/foto9.jpeg',
                caption: 'Momen Indah 1.4'
            },
            {
                src: 'assets/foto10.jpeg',
                caption: 'Momen Indah 1.5'
            },
            {
                src: 'assets/foto11.jpeg',
                caption: 'Momen Indah 1.6'
            }
        ]
    },

    {
        title: 'Album 2',
        photos: [
            {
                src: 'assets/foto12.jpeg',
                caption: 'Momen Indah 2.1'
            },
            {
                src: 'assets/foto13.jpeg',
                caption: 'Momen Indah 2.2'
            },
            {
                src: 'assets/foto14.jpeg',
                caption: 'Momen Indah 2.3'
            },
            {
                src: 'assets/foto15.jpeg',
                caption: 'Momen Indah 2.4'
            },
            {
                src: 'assets/foto16.jpeg',
                caption: 'Momen Indah 2.5'
            },
            {
                src: 'assets/foto17.jpeg',
                caption: 'Momen Indah 2.6'
            }
        ]
    },

    {
        title: 'Album 3',
        photos: [
            {
                src: 'assets/foto18.jpeg',
                caption: 'Momen Indah 3.1'
            },
            {
                src: 'assets/foto19.jpeg',
                caption: 'Momen Indah 3.2'
            },
            {
                src: 'assets/foto20.jpeg',
                caption: 'Momen Indah 3.3'
            },
            {
                src: 'assets/foto21.jpeg',
                caption: 'Momen Indah 3.4'
            },
            {
                src: 'assets/foto22.jpeg',
                caption: 'Momen Indah 3.5'
            },
            {
                src: 'assets/foto23.jpeg',
                caption: 'Momen Indah 3.6'
            }
        ]
    },

    {
        title: 'Album 4',
        photos: [
            {
                src: 'assets/foto24.jpeg',
                caption: '4.1'
            },
            {
                src: 'assets/foto25.jpeg',
                caption: '4.2'
            },
            {
                src: 'assets/foto26.jpeg',
                caption: '4.3'
            },
            {
                src: 'assets/foto27.jpeg',
                caption: '4.4'
            },
            {
                src: 'assets/foto28.jpeg',
                caption: '4.5'
            },
            {
                src: 'assets/foto29.jpeg',
                caption: '4.6'
            }
        ]
    }
];

let currentAlbumIndex = 0;
let currentPhotoIndex = 0;
let activePhotoList = [];


// ==========================================
// CLICK SOUND
// ==========================================

const clickSound =
    new Audio('assets/click.mp3');

clickSound.preload = 'auto';

function playClickSound() {
    try {
        clickSound.currentTime = 0;

        const promise =
            clickSound.play();

        if (
            promise &&
            typeof promise.catch === 'function'
        ) {
            promise.catch(() => {});
        }
    } catch (error) {}
}


// ==========================================
// UTILITY
// ==========================================

function escapeHtml(text) {
    if (
        text === null ||
        text === undefined
    ) {
        return '';
    }

    return String(text).replace(
        /[&<>"']/g,
        function (character) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[character];
        }
    );
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

    if (
        !validThemes.includes(themeName)
    ) {
        themeName = 'default';
    }

    playClickSound();

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

    try {
        localStorage.setItem(
            'selectedTheme',
            themeName
        );
    } catch (error) {}

    document
        .querySelectorAll('.theme-btn')
        .forEach(button => {
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


function setThemeWithoutSound(themeName) {
    const validThemes = [
        'default',
        'cyberpunk',
        'vintage',
        'pastel'
    ];

    if (
        !validThemes.includes(themeName)
    ) {
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

    document
        .querySelectorAll('.theme-btn')
        .forEach(button => {
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


function loadTheme() {
    let theme = 'default';

    try {
        theme =
            localStorage.getItem(
                'selectedTheme'
            ) ||
            'default';
    } catch (error) {
        theme = 'default';
    }

    setThemeWithoutSound(theme);
}


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {
    if (!pageId) {
        return;
    }

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

    document
        .querySelectorAll('.page')
        .forEach(page => {
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

    if (pageId === 'page-feelings') {
        initFeelingsLog();
    }

    if (pageId === 'page-playlist') {
        updatePlaylistState();
    }
}


// ==========================================
// COUNTER HARI
// ==========================================

function calculateDays() {
    const now =
        new Date();

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

    if (!container) {
        return;
    }

    setInterval(() => {
        const img =
            document.createElement('img');

        img.src =
            'assets/heart.png';

        img.className =
            'floating-element';

        img.style.left =
            Math.random() * 100 +
            'vw';

        img.style.animationDuration =
            Math.random() * 3 +
            3 +
            's';

        img.style.width =
            Math.random() * 15 +
            15 +
            'px';

        container.appendChild(img);

        setTimeout(() => {
            if (img.parentNode) {
                img.remove();
            }
        }, 6000);

    }, 800);
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

    if (!modal) {
        return;
    }

    currentCardIndex = 0;

    renderCounterCard();

    modal.classList.remove('hidden');
}


function closeLoveCounterModal() {
    playClickSound();

    const modal =
        document.getElementById(
            'counter-modal'
        );

    if (modal) {
        modal.classList.add('hidden');
    }
}


function renderCounterCard() {
    const track =
        document.getElementById(
            'slider-track'
        );

    if (!track) {
        return;
    }

    const cards =
        track.querySelectorAll(
            '.memory-card'
        );

    if (!cards.length) {
        return;
    }

    currentCardIndex =
        Math.max(
            0,
            Math.min(
                currentCardIndex,
                cards.length - 1
            )
        );

    track.style.transform =
        `translateX(-${currentCardIndex * 100}%)`;

    document
        .querySelectorAll(
            '#slider-dots .dot'
        )
        .forEach(
            (dot, index) => {
                dot.classList.toggle(
                    'active',
                    index === currentCardIndex
                );
            }
        );
}


function moveCard(direction) {
    const track =
        document.getElementById(
            'slider-track'
        );

    if (!track) {
        return;
    }

    const cards =
        track.querySelectorAll(
            '.memory-card'
        );

    if (!cards.length) {
        return;
    }

    const amount =
        Number(direction);

    if (!Number.isFinite(amount)) {
        return;
    }

    currentCardIndex += amount;

    if (
        currentCardIndex < 0
    ) {
        currentCardIndex =
            cards.length - 1;
    }

    if (
        currentCardIndex >=
        cards.length
    ) {
        currentCardIndex = 0;
    }

    playClickSound();

    renderCounterCard();
}


function goToCard(index) {
    const track =
        document.getElementById(
            'slider-track'
        );

    if (!track) {
        return;
    }

    const cards =
        track.querySelectorAll(
            '.memory-card'
        );

    const numericIndex =
        Number(index);

    if (
        !cards.length ||
        !Number.isInteger(numericIndex) ||
        numericIndex < 0 ||
        numericIndex >= cards.length
    ) {
        return;
    }

    currentCardIndex =
        numericIndex;

    playClickSound();

    renderCounterCard();
}


// ==========================================
// DIARY
// ==========================================

let diaryCurrentPage = 1;

const DIARY_ITEMS_PER_PAGE = 5;


async function renderDiaryEntries(
    page = diaryCurrentPage
) {
    const diaryList =
        document.getElementById(
            'diary-list'
        );

    if (!diaryList) {
        return;
    }

    if (!supabase) {
        diaryList.innerHTML =
            '<p>Supabase belum berhasil terhubung.</p>';

        removeDiaryPagination();

        return;
    }

    diaryList.innerHTML =
        '<p>Memuat catatan...</p>';

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
                '<p>Belum ada catatan diary di database.</p>';

            removeDiaryPagination();

            return;
        }

        const totalPages =
            Math.ceil(
                data.length /
                DIARY_ITEMS_PER_PAGE
            );

        diaryCurrentPage =
            Math.max(
                1,
                Math.min(
                    Number(page) || 1,
                    totalPages
                )
            );

        const startIndex =
            (
                diaryCurrentPage - 1
            ) *
            DIARY_ITEMS_PER_PAGE;

        const pageData =
            data.slice(
                startIndex,
                startIndex +
                DIARY_ITEMS_PER_PAGE
            );

        pageData.forEach(
            entry => {
                const dateValue =
                    entry.entry_date ||
                    entry.created_at;

                let dateFormatted = '';

                if (dateValue) {
                    const parsedDate =
                        new Date(
                            dateValue
                        );

                    if (
                        !Number.isNaN(
                            parsedDate.getTime()
                        )
                    ) {
                        dateFormatted =
                            parsedDate
                                .toISOString()
                                .split('T')[0];
                    } else {
                        dateFormatted =
                            String(
                                dateValue
                            );
                    }
                }

                const card =
                    document.createElement(
                        'div'
                    );

                card.className =
                    'diary-card';

                card.innerHTML = `
                    <div class="diary-card-header">
                        <h3>
                            ${escapeHtml(
                                entry.title || ''
                            )}
                        </h3>

                        <span class="diary-card-date">
                            ${escapeHtml(
                                dateFormatted
                            )}
                        </span>
                    </div>

                    <div class="diary-card-body">
                        ${escapeHtml(
                            entry.content || ''
                        ).replace(
                            /\n/g,
                            '<br>'
                        )}
                    </div>

                    <div class="diary-card-footer">
                        <button
                            type="button"
                            class="btn-diary-action"
                            onclick="deleteDiaryEntry('${String(
                                entry.id
                            )}')"
                        >
                            Hapus
                        </button>
                    </div>
                `;

                diaryList.appendChild(card);
            }
        );

        renderDiaryPagination(
            data.length,
            totalPages
        );

    } catch (error) {
        console.error(
            'Error loading diary:',
            error
        );

        diaryList.innerHTML =
            '<p>Gagal memuat catatan diary.</p>';

        removeDiaryPagination();
    }
}


function renderDiaryPagination(
    totalItems,
    totalPages
) {
    removeDiaryPagination();

    if (
        !totalPages ||
        totalPages <= 1
    ) {
        return;
    }

    const diaryList =
        document.getElementById(
            'diary-list'
        );

    if (
        !diaryList ||
        !diaryList.parentNode
    ) {
        return;
    }

    const pagination =
        document.createElement(
            'div'
        );

    pagination.id =
        'diary-pagination';

    pagination.className =
        'diary-pagination';

    const previousButton =
        document.createElement(
            'button'
        );

    previousButton.type =
        'button';

    previousButton.className =
        'diary-page-button';

    previousButton.textContent =
        'Sebelumnya';

    previousButton.disabled =
        diaryCurrentPage <= 1;

    previousButton.addEventListener(
        'click',
        function () {
            if (
                diaryCurrentPage > 1
            ) {
                renderDiaryEntries(
                    diaryCurrentPage - 1
                );
            }
        }
    );

    pagination.appendChild(
        previousButton
    );

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {
        const pageButton =
            document.createElement(
                'button'
            );

        pageButton.type =
            'button';

        pageButton.className =
            'diary-page-button';

        pageButton.textContent =
            String(page);

        if (
            page === diaryCurrentPage
        ) {
            pageButton.classList.add(
                'active'
            );
        }

        pageButton.addEventListener(
            'click',
            function () {
                renderDiaryEntries(
                    page
                );
            }
        );

        pagination.appendChild(
            pageButton
        );
    }

    const nextButton =
        document.createElement(
            'button'
        );

    nextButton.type =
        'button';

    nextButton.className =
        'diary-page-button';

    nextButton.textContent =
        'Berikutnya';

    nextButton.disabled =
        diaryCurrentPage >=
        totalPages;

    nextButton.addEventListener(
        'click',
        function () {
            if (
                diaryCurrentPage <
                totalPages
            ) {
                renderDiaryEntries(
                    diaryCurrentPage + 1
                );
            }
        }
    );

    pagination.appendChild(
        nextButton
    );

    diaryList.parentNode.appendChild(
        pagination
    );
}


function removeDiaryPagination() {
    const pagination =
        document.getElementById(
            'diary-pagination'
        );

    if (pagination) {
        pagination.remove();
    }
}


function initDiaryDate() {
    const dateInput =
        document.getElementById(
            'diary-date'
        );

    if (!dateInput) {
        return;
    }

    if (!dateInput.value) {
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

        dateInput.value =
            `${year}-${month}-${day}`;
    }
}


async function addDiaryEntry() {
    playClickSound();

    const titleInput =
        document.getElementById(
            'diary-title'
        );

    const contentInput =
        document.getElementById(
            'diary-content'
        );

    const dateInput =
        document.getElementById(
            'diary-date'
        );

    if (
        !titleInput ||
        !contentInput
    ) {
        return;
    }

    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();

    const entryDate =
        dateInput
            ? dateInput.value
            : '';

    if (
        !title ||
        !content
    ) {
        alert(
            'Judul dan isi diary harus diisi.'
        );

        return;
    }

    if (!supabase) {
        alert(
            'Supabase belum terhubung.'
        );

        return;
    }

    try {
        const insertData = {
            title: title,
            content: content
        };

        if (entryDate) {
            insertData.entry_date =
                entryDate;
        }

        const {
            error
        } = await supabase
            .from('diaries')
            .insert([
                insertData
            ]);

        if (error) {
            throw error;
        }

        titleInput.value = '';
        contentInput.value = '';

        if (dateInput) {
            dateInput.value = '';
            initDiaryDate();
        }

        alert(
            'Diary berhasil disimpan.'
        );

        diaryCurrentPage = 1;

        await renderDiaryEntries(1);

    } catch (error) {
        console.error(
            'Error adding diary:',
            error
        );

        alert(
            error &&
            error.message
                ? error.message
                : 'Gagal menyimpan diary.'
        );
    }
}


async function deleteDiaryEntry(id) {
    playClickSound();

    if (!id) {
        return;
    }

    if (
        !confirm(
            'Yakin ingin menghapus diary ini?'
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
            .eq(
                'id',
                id
            );

        if (error) {
            throw error;
        }

        await renderDiaryEntries(
            diaryCurrentPage
        );

    } catch (error) {
        console.error(
            'Error deleting diary:',
            error
        );

        alert(
            error &&
            error.message
                ? error.message
                : 'Gagal menghapus diary.'
        );
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

    if (
        !hugButton ||
        hugButton.dataset.hugInitialized
    ) {
        return;
    }

    hugButton.addEventListener(
        'click',
        function () {
            playClickSound();

            const overlay =
                document.getElementById(
                    'hug-overlay'
                );

            const message =
                document.getElementById(
                    'hug-message'
                );

            if (message) {
                message.textContent =
                    'Pelukan hangat terkirim! Aku selalu ada buat kamu.';
            }

            if (overlay) {
                overlay.classList.remove(
                    'hidden'
                );

                setTimeout(
                    function () {
                        overlay.classList.add(
                            'hidden'
                        );
                    },
                    1800
                );
            }
        }
    );

    hugButton.dataset.hugInitialized =
        'true';
}


// ==========================================
// NOTE MODAL
// ==========================================

const notes = {
    capek:
        'Semangat selalu ya sayangku. Kamu hebat banget dan aku selalu bangga sama kamu. Kalau kamu merasa capek, aku ada di sini kapan pun kamu butuh.',

    kangen:
        'Kamu kangen aku ya? Hehe, aku juga sangat kangen sama kamu! Kalau ada waktu, ayo kita jalan bareng biar kangennya hilang.',

    sedih:
        'Kamu lagi sedih ya? Cerita ke aku kalau kamu siap ya. Kalau butuh pelukan, aku selalu siap peluk kamu. Kalau penyebab kamu sedih karena aku, aku minta maaf ya sayang. I love you so much!'
};


function showNote(noteName) {
    playClickSound();

    const modal =
        document.getElementById(
            'note-modal'
        );

    const content =
        document.getElementById(
            'modal-text'
        );

    if (
        !modal ||
        !content
    ) {
        return;
    }

    content.textContent =
        notes[noteName] || '';

    modal.classList.remove(
        'hidden'
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

    const message =
        document.getElementById(
            'surprise-box'
        );

    const subtitle =
        document.getElementById(
            'envelope-sub'
        );

    if (!envelope || !message) {
        return;
    }

    envelope.classList.add('open');

    setTimeout(function () {

        // Hilangkan amplop sepenuhnya
        envelope.style.display = 'none';

        // Tampilkan surprise
        message.classList.remove('hidden');
        message.classList.add('active');

        // Hilangkan tulisan tap to lanjut
        if (subtitle) {
            subtitle.style.display = 'none';
        }

    }, 500);
}


// ==========================================
// GIFT
// ==========================================

function openGift() {
    playClickSound();

    const surpriseBox =
        document.getElementById(
            'gift-surprise-box'
        );

    const subtitle =
        document.getElementById(
            'gift-sub'
        );

    if (!surpriseBox) {
        return;
    }

    surpriseBox.classList.remove(
        'hidden'
    );

    if (subtitle) {
        subtitle.style.display =
            'none';
    }

    initHugFeature();
}


// ==========================================
// IMAGE PREVIEW
// ==========================================

function openImagePreview(
    src,
    caption = ''
) {
    playClickSound();

    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    const image =
        document.getElementById(
            'preview-image'
        );

    const text =
        document.getElementById(
            'preview-caption'
        );

    if (
        !modal ||
        !image
    ) {
        return;
    }

    image.src =
        src || '';

    image.alt =
        caption ||
        'Pratinjau Foto';

    if (text) {
        text.textContent =
            caption || '';
    }

    modal.classList.remove(
        'hidden'
    );
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
}


// ==========================================
// ALBUM
// ==========================================

function openAlbum(
    albumIndex
) {
    playClickSound();

    const index =
        Number(albumIndex);

    if (
        !Number.isInteger(index) ||
        !albumsData[index]
    ) {
        return;
    }

    currentAlbumIndex =
        index;

    currentPhotoIndex =
        0;

    activePhotoList =
        albumsData[index].photos;

    renderAlbum();

    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (modal) {
        modal.classList.remove(
            'hidden'
        );
    }
}


function renderAlbum() {
    const album =
        albumsData[
            currentAlbumIndex
        ];

    if (!album) {
        return;
    }

    const image =
        document.getElementById(
            'preview-image'
        );

    const caption =
        document.getElementById(
            'preview-caption'
        );

    const photo =
        album.photos[
            currentPhotoIndex
        ];

    if (!photo) {
        return;
    }

    if (image) {
        image.src =
            photo.src;

        image.alt =
            photo.caption || '';
    }

    if (caption) {
        caption.textContent =
            photo.caption || '';
    }
}


function nextSlide() {
    if (
        !activePhotoList ||
        !activePhotoList.length
    ) {
        return;
    }

    playClickSound();

    currentPhotoIndex =
        (
            currentPhotoIndex + 1
        ) %
        activePhotoList.length;

    renderAlbum();
}


function prevSlide() {
    if (
        !activePhotoList ||
        !activePhotoList.length
    ) {
        return;
    }

    playClickSound();

    currentPhotoIndex =
        (
            currentPhotoIndex -
            1 +
            activePhotoList.length
        ) %
        activePhotoList.length;

    renderAlbum();
}


// ==========================================
// TOUCH ALBUM
// ==========================================

function initAlbumTouch() {
    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (!modal) {
        return;
    }

    if (
        modal.dataset.touchInitialized
    ) {
        return;
    }

    let startX = 0;
    let startY = 0;

    modal.addEventListener(
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

    modal.addEventListener(
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
                Math.abs(diffX) < 50 ||
                Math.abs(diffX) <= Math.abs(diffY)
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

    modal.dataset.touchInitialized =
        'true';
}


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

    if (
        wrapper.dataset.touchInitialized
    ) {
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
                Math.abs(diffX) < 40 ||
                Math.abs(diffX) <= Math.abs(diffY)
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

    wrapper.dataset.touchInitialized =
        'true';
}


// ==========================================
// KEYBOARD
// ==========================================

function initKeyboardControls() {
    if (
        document.body.dataset.keyboardInitialized
    ) {
        return;
    }

    document.addEventListener(
        'keydown',
        function (event) {
            const modal =
                document.getElementById(
                    'image-preview-modal'
                );

            if (
                !modal ||
                modal.classList.contains(
                    'hidden'
                )
            ) {
                return;
            }

            if (
                event.key === 'ArrowRight'
            ) {
                nextSlide();
            }

            if (
                event.key === 'ArrowLeft'
            ) {
                prevSlide();
            }

            if (
                event.key === 'Escape'
            ) {
                closeImagePreview();
            }
        }
    );

    document.body.dataset.keyboardInitialized =
        'true';
}


// ==========================================
// PLAYLIST
// ==========================================

function playSong(url) {
    if (!url) {
        return;
    }

    playClickSound();

    const iframe =
        document.getElementById(
            'youtube-player'
        );

    if (!iframe) {
        return;
    }

    let videoId = '';

    try {
        const parsed =
            new URL(url);

        videoId =
            parsed.searchParams.get(
                'v'
            ) || '';

        if (
            !videoId &&
            parsed.hostname.includes(
                'youtu.be'
            )
        ) {
            videoId =
                parsed.pathname
                    .replace(
                        '/',
                        ''
                    )
                    .split('/')[0];
        }

    } catch (error) {
        const match =
            String(url).match(
                /(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/
            );

        videoId =
            match
                ? match[1]
                : '';
    }

    if (!videoId) {
        return;
    }

    iframe.src =
        `https://www.youtube.com/embed/${encodeURIComponent(
            videoId
        )}?enablejsapi=1&autoplay=1`;
}


function togglePlayMusic() {
    playClickSound();

    const audio =
        document.getElementById(
            'bg-music'
        );

    const vinyl =
        document.getElementById(
            'vinyl-img'
        );

    if (!audio) {
        return;
    }

    if (audio.paused) {
        const promise =
            audio.play();

        if (
            promise &&
            typeof promise.catch === 'function'
        ) {
            promise.catch(() => {});
        }

        if (vinyl) {
            vinyl.classList.add(
                'playing'
            );
        }

    } else {
        audio.pause();

        if (vinyl) {
            vinyl.classList.remove(
                'playing'
            );
        }
    }
}


function updatePlaylistState() {
    const audio =
        document.getElementById(
            'bg-music'
        );

    const vinyl =
        document.getElementById(
            'vinyl-img'
        );

    if (
        !audio ||
        !vinyl
    ) {
        return;
    }

    vinyl.classList.toggle(
        'playing',
        !audio.paused
    );

    if (
        !audio.dataset.listenerInitialized
    ) {
        audio.addEventListener(
            'play',
            function () {
                vinyl.classList.add(
                    'playing'
                );
            }
        );

        audio.addEventListener(
            'pause',
            function () {
                vinyl.classList.remove(
                    'playing'
                );
            }
        );

        audio.dataset.listenerInitialized =
            'true';
    }
}


// ==========================================
// FEELINGS LOG
// ==========================================

const FEELINGS_PHOTO_BUCKET =
    'feelings-photos';

const FEELINGS_ITEMS_PER_PAGE =
    5;

let currentFeelingRating = 0;

let currentFeelingPhotoUrl = '';

let currentFeelingPhotoPath = '';

let feelingsCurrentPage = 1;


// ==========================================
// FEELING RATING
// ==========================================

function setFeelingRating(
    rating
) {
    const numericRating =
        Number(rating);

    if (
        !Number.isFinite(
            numericRating
        ) ||
        numericRating < 0 ||
        numericRating > 5
    ) {
        return;
    }

    currentFeelingRating =
        numericRating;

    const stars =
        document.querySelectorAll(
            '#feelings-stars [data-rating]'
        );

    stars.forEach(
        star => {
            const starRating =
                Number(
                    star.dataset.rating
                );

            star.textContent =
                starRating <=
                numericRating
                    ? '★'
                    : '☆';

            star.classList.toggle(
                'active',
                starRating <=
                numericRating
            );
        }
    );
}


// ==========================================
// FEELING PHOTO
// ==========================================

function showFeelingPhotoPreview(
    url
) {
    const preview =
        document.getElementById(
            'feelings-photo-preview'
        );

    if (!preview) {
        return;
    }

    if (url) {
        preview.src =
            url;
    } else {
        preview.src =
            'assets/foto1.jpeg';
    }

    preview.style.display =
        'block';
}


function compressFeelingImage(
    file,
    maxWidth = 1200,
    quality = 0.8
) {
    return new Promise(
        (
            resolve,
            reject
        ) => {
            if (!file) {
                reject(
                    new Error(
                        'File foto tidak ditemukan.'
                    )
                );

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function (event) {
                    const image =
                        new Image();

                    image.onload =
                        function () {
                            let width =
                                image.width;

                            let height =
                                image.height;

                            if (
                                width >
                                maxWidth
                            ) {
                                height =
                                    Math.round(
                                        height *
                                        (
                                            maxWidth /
                                            width
                                        )
                                    );

                                width =
                                    maxWidth;
                            }

                            const canvas =
                                document.createElement(
                                    'canvas'
                                );

                            canvas.width =
                                width;

                            canvas.height =
                                height;

                            const context =
                                canvas.getContext(
                                    '2d'
                                );

                            if (!context) {
                                reject(
                                    new Error(
                                        'Canvas tidak tersedia.'
                                    )
                                );

                                return;
                            }

                            context.drawImage(
                                image,
                                0,
                                0,
                                width,
                                height
                            );

                            canvas.toBlob(
                                function (
                                    blob
                                ) {
                                    if (!blob) {
                                        reject(
                                            new Error(
                                                'Gagal memproses foto.'
                                            )
                                        );

                                        return;
                                    }

                                    resolve(
                                        blob
                                    );
                                },
                                'image/jpeg',
                                quality
                            );
                        };

                    image.onerror =
                        function () {
                            reject(
                                new Error(
                                    'Gagal membaca foto.'
                                )
                            );
                        };

                    image.src =
                        event.target.result;
                };

            reader.onerror =
                function () {
                    reject(
                        new Error(
                            'Gagal membaca file.'
                        )
                    );
                };

            reader.readAsDataURL(
                file
            );
        }
    );
}


async function uploadFeelingPhoto(
    file
) {
    if (!file) {
        return null;
    }

    if (!supabase) {
        throw new Error(
            'Supabase belum terhubung.'
        );
    }

    if (
        !file.type ||
        !file.type.startsWith(
            'image/'
        )
    ) {
        throw new Error(
            'File yang dipilih harus berupa gambar.'
        );
    }

    const compressedFile =
        await compressFeelingImage(
            file
        );

    const fileName =
        `feeling-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 10)}.jpg`;

    const filePath =
        `feelings/${fileName}`;

    const {
        error
    } = await supabase.storage
        .from(
            FEELINGS_PHOTO_BUCKET
        )
        .upload(
            filePath,
            compressedFile,
            {
                contentType:
                    'image/jpeg',
                upsert: false
            }
        );

    if (error) {
        throw error;
    }

    const {
        data
    } = supabase.storage
        .from(
            FEELINGS_PHOTO_BUCKET
        )
        .getPublicUrl(
            filePath
        );

    currentFeelingPhotoPath =
        filePath;

    currentFeelingPhotoUrl =
        data &&
        data.publicUrl
            ? data.publicUrl
            : '';

    showFeelingPhotoPreview(
        currentFeelingPhotoUrl
    );

    return {
        url:
            currentFeelingPhotoUrl,

        path:
            currentFeelingPhotoPath
    };
}


async function handleFeelingPhotoUpload(
    event
) {
    const input =
        event &&
        event.target
            ? event.target
            : null;

    if (!input) {
        return;
    }

    const file =
        input.files &&
        input.files[0]
            ? input.files[0]
            : null;

    if (!file) {
        return;
    }

    try {
        await uploadFeelingPhoto(
            file
        );

    } catch (error) {
        console.error(
            'Error uploading feeling photo:',
            error
        );

        alert(
            error &&
            error.message
                ? error.message
                : 'Gagal mengunggah foto.'
        );

        currentFeelingPhotoUrl =
            '';

        currentFeelingPhotoPath =
            '';

        showFeelingPhotoPreview(
            ''
        );

    } finally {
        input.value = '';
    }
}


async function removeFeelingPhoto() {
    playClickSound();

    const currentPath =
        currentFeelingPhotoPath;

    currentFeelingPhotoUrl =
        '';

    currentFeelingPhotoPath =
        '';

    const input =
        document.getElementById(
            'feelings-photo-input'
        );

    if (input) {
        input.value = '';
    }

    showFeelingPhotoPreview(
        ''
    );

    if (
        !supabase ||
        !currentPath
    ) {
        return;
    }

    try {
        await supabase.storage
            .from(
                FEELINGS_PHOTO_BUCKET
            )
            .remove([
                currentPath
            ]);

    } catch (error) {
        console.warn(
            'Gagal menghapus foto dari storage:',
            error
        );
    }
}


// ==========================================
// FEELINGS DATABASE
// ==========================================

async function getFeelingLogs() {
    if (!supabase) {
        throw new Error(
            'Supabase belum terhubung.'
        );
    }

    const {
        data,
        error
    } = await supabase
        .from('feelings_logs')
        .select('*')
        .order(
            'feeling_date',
            {
                ascending: false
            }
        )
        .order(
            'created_at',
            {
                ascending: false
            }
        );

    if (error) {
        throw error;
    }

    return data || [];
}


async function saveFeelingLog() {
    playClickSound();

    if (!supabase) {
        alert(
            'Supabase belum terhubung.'
        );

        return;
    }

    const dateInput =
        document.getElementById(
            'date'
        );

    const moodInput =
        document.getElementById(
            'feeling'
        );

    const noteInput =
        document.getElementById(
            'answer'
        );

    const saveButton =
        document.querySelector(
            '.feelings-save-btn'
        );

    if (
        !dateInput ||
        !moodInput ||
        !noteInput
    ) {
        alert(
            'Form Feelings Log tidak ditemukan.'
        );

        return;
    }

    const feelingDate =
        dateInput.value;

    const mood =
        moodInput.value.trim();

    const note =
        noteInput.value.trim();

    const rating =
        Number(
            currentFeelingRating || 0
        );

    if (!feelingDate) {
        alert(
            'Tanggal perasaan harus diisi.'
        );

        return;
    }

    if (!mood) {
        alert(
            'Perasaan kamu harus diisi.'
        );

        return;
    }

    if (
        !Number.isFinite(rating) ||
        rating < 0 ||
        rating > 5
    ) {
        alert(
            'Rating harus berada antara 0 sampai 5.'
        );

        return;
    }

    if (saveButton) {
        saveButton.disabled =
            true;

        saveButton.dataset.originalText =
            saveButton.textContent;

        saveButton.textContent =
            'Menyimpan...';
    }

    try {
        const payload = {
            feeling_date:
                feelingDate,

            mood:
                mood,

            note:
                note,

            rating:
                rating
        };

        if (
            currentFeelingPhotoUrl
        ) {
            payload.photo_url =
                currentFeelingPhotoUrl;
        }

        if (
            currentFeelingPhotoPath
        ) {
            payload.photo_path =
                currentFeelingPhotoPath;
        }

        const {
            error
        } = await supabase
            .from(
                'feelings_logs'
            )
            .insert([
                payload
            ]);

        if (error) {
            throw error;
        }

        dateInput.value = '';

        moodInput.value = '';

        noteInput.value = '';

        currentFeelingRating =
            0;

        currentFeelingPhotoUrl =
            '';

        currentFeelingPhotoPath =
            '';

        setFeelingRating(
            0
        );

        const photoInput =
            document.getElementById(
                'feelings-photo-input'
            );

        if (photoInput) {
            photoInput.value =
                '';
        }

        showFeelingPhotoPreview(
            ''
        );

        initFeelingsDate();

        feelingsCurrentPage =
            1;

        await renderFeelingLogs(
            1
        );

        alert(
            'Feelings berhasil disimpan.'
        );

    } catch (error) {
        console.error(
            'Error saving feeling log:',
            error
        );

        alert(
            error &&
            error.message
                ? error.message
                : 'Gagal menyimpan feelings log.'
        );

    } finally {
        if (saveButton) {
            saveButton.disabled =
                false;

            saveButton.textContent =
                saveButton.dataset.originalText ||
                'Simpan Feelings';
        }
    }
}


// ==========================================
// FEELINGS DATE
// ==========================================

function initFeelingsDate() {
    const dateInput =
        document.getElementById(
            'feelings-date'
        );

    if (!dateInput) {
        return;
    }

    if (!dateInput.value) {
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

        dateInput.value =
            `${year}-${month}-${day}`;
    }
}


function getFeelingDateText(
    dateValue
) {
    if (!dateValue) {
        return '';
    }

    const date =
        new Date(
            `${dateValue}T00:00:00`
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return String(
            dateValue
        );
    }

    return date.toLocaleDateString(
        'id-ID',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    );
}


// ==========================================
// RENDER FEELINGS
// ==========================================

async function renderFeelingLogs(
    page = feelingsCurrentPage
) {
    const list =
        document.getElementById(
            'feelings-list'
        );

    if (!list) {
        return;
    }

    if (!supabase) {
        list.innerHTML =
            '<p class="feelings-empty">Supabase belum terhubung.</p>';

        removeFeelingsPagination();

        return;
    }

    list.innerHTML =
        '<p class="feelings-loading">Memuat feelings log...</p>';

    try {
        const logs =
            await getFeelingLogs();

        if (
            !logs ||
            logs.length === 0
        ) {
            list.innerHTML =
                '<p class="feelings-empty">Belum ada feelings log.</p>';

            removeFeelingsPagination();

            return;
        }

        const totalPages =
            Math.ceil(
                logs.length /
                FEELINGS_ITEMS_PER_PAGE
            );

        feelingsCurrentPage =
            Math.max(
                1,
                Math.min(
                    Number(page) || 1,
                    totalPages
                )
            );

        const startIndex =
            (
                feelingsCurrentPage -
                1
            ) *
            FEELINGS_ITEMS_PER_PAGE;

        const pageLogs =
            logs.slice(
                startIndex,
                startIndex +
                FEELINGS_ITEMS_PER_PAGE
            );

        list.innerHTML = '';

        pageLogs.forEach(
            log => {
                const card =
                    document.createElement(
                        'article'
                    );

                card.className =
                    'feeling-log-card';

                const dateText =
                    getFeelingDateText(
                        log.feeling_date
                    );

                const mood =
                    escapeHtml(
                        log.mood || ''
                    );

                const note =
                    escapeHtml(
                        log.note || ''
                    ).replace(
                        /\n/g,
                        '<br>'
                    );

                const rating =
                    Math.max(
                        0,
                        Math.min(
                            5,
                            Number(
                                log.rating || 0
                            )
                        )
                    );

                const stars =
                    Array.from(
                        {
                            length: 5
                        },
                        (
                            _,
                            index
                        ) =>
                            `<span class="${
                                index < rating
                                    ? 'active'
                                    : ''
                            }">★</span>`
                    ).join('');

                const photoUrl =
                    log.photo_url ||
                    '';

                card.innerHTML = `
                    <div class="feeling-log-header">
                        <div>
                            <div class="feeling-log-date">
                                ${escapeHtml(
                                    dateText
                                )}
                            </div>

                            <h3 class="feeling-log-mood">
                                ${mood}
                            </h3>
                        </div>

                        <div class="feeling-log-rating">
                            ${stars}
                        </div>
                    </div>

                    ${
                        note
                            ? `
                        <div class="feeling-log-note">
                            ${note}
                        </div>
                    `
                            : ''
                    }

                    ${
                        photoUrl
                            ? `
                        <div class="feeling-log-photo">
                            <img
                                src="${escapeHtml(
                                    photoUrl
                                )}"
                                alt="Foto feelings"
                                loading="lazy"
                                onclick="openFeelingPhoto('${escapeHtml(
                                    photoUrl
                                )}')"
                            >
                        </div>
                    `
                            : ''
                    }

                    <div class="feeling-log-actions">
                        <button
                            type="button"
                            class="delete-feeling-btn"
                            onclick="deleteFeelingLog('${String(
                                log.id
                            )}')"
                        >
                            Hapus
                        </button>
                    </div>
                `;

                list.appendChild(
                    card
                );
            }
        );

        renderFeelingsPagination(
            totalPages
        );

    } catch (error) {
        console.error(
            'Error rendering feelings logs:',
            error
        );

        list.innerHTML =
            '<p class="feelings-empty">Gagal memuat feelings log.</p>';

        removeFeelingsPagination();
    }
}


// ==========================================
// FEELINGS PAGINATION
// ==========================================

function renderFeelingsPagination(
    totalPages
) {
    removeFeelingsPagination();

    if (
        !totalPages ||
        totalPages <= 1
    ) {
        return;
    }

    const list =
        document.getElementById(
            'feelings-list'
        );

    if (
        !list ||
        !list.parentNode
    ) {
        return;
    }

    const pagination =
        document.createElement(
            'div'
        );

    pagination.id =
        'feelings-pagination';

    pagination.className =
        'feelings-pagination';

    const previousButton =
        document.createElement(
            'button'
        );

    previousButton.type =
        'button';

    previousButton.className =
        'feelings-page-button';

    previousButton.textContent =
        'Sebelumnya';

    previousButton.disabled =
        feelingsCurrentPage <= 1;

    previousButton.addEventListener(
        'click',
        function () {
            if (
                feelingsCurrentPage > 1
            ) {
                renderFeelingLogs(
                    feelingsCurrentPage - 1
                );
            }
        }
    );

    pagination.appendChild(
        previousButton
    );

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {
        const pageButton =
            document.createElement(
                'button'
            );

        pageButton.type =
            'button';

        pageButton.className =
            'feelings-page-button';

        pageButton.textContent =
            String(page);

        if (
            page ===
            feelingsCurrentPage
        ) {
            pageButton.classList.add(
                'active'
            );
        }

        pageButton.addEventListener(
            'click',
            function () {
                renderFeelingLogs(
                    page
                );
            }
        );

        pagination.appendChild(
            pageButton
        );
    }

    const nextButton =
        document.createElement(
            'button'
        );

    nextButton.type =
        'button';

    nextButton.className =
        'feelings-page-button';

    nextButton.textContent =
        'Berikutnya';

    nextButton.disabled =
        feelingsCurrentPage >=
        totalPages;

    nextButton.addEventListener(
        'click',
        function () {
            if (
                feelingsCurrentPage <
                totalPages
            ) {
                renderFeelingLogs(
                    feelingsCurrentPage + 1
                );
            }
        }
    );

    pagination.appendChild(
        nextButton
    );

    list.parentNode.appendChild(
        pagination
    );
}


function removeFeelingsPagination() {
    const pagination =
        document.getElementById(
            'feelings-pagination'
        );

    if (pagination) {
        pagination.remove();
    }
}


// ==========================================
// DELETE FEELING
// ==========================================

async function deleteFeelingLog(
    id
) {
    playClickSound();

    if (!id) {
        return;
    }

    if (
        !confirm(
            'Yakin ingin menghapus feelings log ini?'
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
            data,
            error
        } = await supabase
            .from(
                'feelings_logs'
            )
            .select(
                'photo_path'
            )
            .eq(
                'id',
                id
            )
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (
            data &&
            data.photo_path
        ) {
            try {
                await supabase.storage
                    .from(
                        FEELINGS_PHOTO_BUCKET
                    )
                    .remove([
                        data.photo_path
                    ]);
            } catch (
                storageError
            ) {
                console.warn(
                    'Foto gagal dihapus dari storage:',
                    storageError
                );
            }
        }

        const {
            error: deleteError
        } = await supabase
            .from(
                'feelings_logs'
            )
            .delete()
            .eq(
                'id',
                id
            );

        if (deleteError) {
            throw deleteError;
        }

        const remainingLogs =
            await getFeelingLogs();

        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    remainingLogs.length /
                    FEELINGS_ITEMS_PER_PAGE
                )
            );

        if (
            feelingsCurrentPage >
            totalPages
        ) {
            feelingsCurrentPage =
                totalPages;
        }

        await renderFeelingLogs(
            feelingsCurrentPage
        );

    } catch (error) {
        console.error(
            'Error deleting feeling log:',
            error
        );

        alert(
            error &&
            error.message
                ? error.message
                : 'Gagal menghapus feelings log.'
        );
    }
}


// ==========================================
// OPEN FEELING PHOTO
// ==========================================

function openFeelingPhoto(
    url
) {
    if (!url) {
        return;
    }

    openImagePreview(
        url,
        'Foto feelings'
    );
}


// ==========================================
// FEELINGS INITIALIZATION
// ==========================================

function initFeelingsLog() {
    initFeelingsDate();

    const starsContainer =
        document.getElementById(
            'feelings-stars'
        );

    if (starsContainer) {
        const stars =
            starsContainer.querySelectorAll(
                '[data-rating]'
            );

        stars.forEach(
            star => {
                const rating =
                    Number(
                        star.dataset.rating
                    );

                star.textContent =
                    rating <=
                    currentFeelingRating
                        ? '★'
                        : '☆';

                star.classList.toggle(
                    'active',
                    rating <=
                    currentFeelingRating
                );
            }
        );
    }

    renderFeelingLogs(
        feelingsCurrentPage
    );
}


// ==========================================
// SUPABASE CHECK
// ==========================================

async function checkSupabaseConnection() {
    if (!supabase) {
        console.warn(
            'Supabase client belum tersedia.'
        );

        return false;
    }

    try {
        const {
            error
        } = await supabase
            .from('diaries')
            .select('id')
            .limit(1);

        if (error) {
            console.warn(
                'Supabase connection check:',
                error.message
            );

            return false;
        }

        return true;

    } catch (error) {
        console.warn(
            'Supabase connection error:',
            error
        );

        return false;
    }
}


// ==========================================
// MOBILE CLICK FIX
// ==========================================

function initMobileClickFix() {
    document
        .querySelectorAll(
            '[onclick]'
        )
        .forEach(
            element => {
                element.style.touchAction =
                    'manipulation';
            }
        );
}


// ==========================================
// PREVIEW TOUCH
// ==========================================

function initPreviewTouch() {
    const modal =
        document.getElementById(
            'image-preview-modal'
        );

    if (!modal) {
        return;
    }

    if (
        modal.dataset.previewTouchInitialized
    ) {
        return;
    }

    let startX = 0;
    let startY = 0;

    modal.addEventListener(
        'touchstart',
        event => {
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

    modal.addEventListener(
        'touchend',
        event => {
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
                Math.abs(diffX) < 50 ||
                Math.abs(diffX) <= Math.abs(diffY)
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

    modal.dataset.previewTouchInitialized =
        'true';
}


// ==========================================
// SLIDER SCROLL
// ==========================================

function initSliderScroll() {
    const wrapper =
        document.querySelector(
            '.cards-slider-wrapper'
        );

    if (!wrapper) {
        return;
    }

    wrapper.style.touchAction =
        'pan-y';
}


// ==========================================
// IMAGE HANDLING
// ==========================================

function initImageHandling() {
    document
        .querySelectorAll(
            'img'
        )
        .forEach(
            image => {
                image.addEventListener(
                    'error',
                    function () {
                        this.style.visibility =
                            'hidden';
                    }
                );
            }
        );
}


// ==========================================
// TOUCH OPTIMIZATION
// ==========================================

function initTouchOptimization() {
    document
        .querySelectorAll(
            'button, .menu-item, .album-card, .envelope-wrapper, img'
        )
        .forEach(
            element => {
                element.style.touchAction =
                    'manipulation';
            }
        );
}


// ==========================================
// EXPORT GLOBAL
// ==========================================

window.setTheme =
    setTheme;

window.showPage =
    showPage;

window.openEnvelope =
    openEnvelope;

window.openGift =
    openGift;

window.openImagePreview =
    openImagePreview;

window.closeImagePreview =
    closeImagePreview;

window.openAlbum =
    openAlbum;

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

window.playSong =
    playSong;

window.togglePlayMusic =
    togglePlayMusic;

window.updatePlaylistState =
    updatePlaylistState;

window.showNote =
    showNote;

window.closeNote =
    closeNote;

window.initFeelingsLog =
    initFeelingsLog;

window.setFeelingRating =
    setFeelingRating;

window.saveFeelingLog =
    saveFeelingLog;

window.renderFeelingLogs =
    renderFeelingLogs;

window.deleteFeelingLog =
    deleteFeelingLog;

window.handleFeelingPhotoUpload =
    handleFeelingPhotoUpload;

window.removeFeelingPhoto =
    removeFeelingPhoto;

window.openFeelingPhoto =
    openFeelingPhoto;

window.initFeelingsDate =
    initFeelingsDate;

window.addDiaryEntry =
    addDiaryEntry;

window.deleteDiaryEntry =
    deleteDiaryEntry;

window.renderDiaryEntries =
    renderDiaryEntries;


// ==========================================
// DOM READY
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        loadTheme();

        calculateDays();

        createFloatingElements();

        initMobileClickFix();

        initMemoryTouch();

        initAlbumTouch();

        initKeyboardControls();

        initPreviewTouch();

        initSliderScroll();

        initImageHandling();

        initDiaryDate();

        initFeelingsDate();

        initFeelingsLog();

        initTouchOptimization();

        initHugFeature();

        updatePlaylistState();

        checkSupabaseConnection();

        renderDiaryEntries();

    }
);