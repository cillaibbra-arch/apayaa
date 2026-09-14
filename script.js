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
        'pastel',
        'sky',
        'red'
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
        'theme-pastel',
        'theme-sky',
        'theme-red'
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
        'pastel',
        'sky',
        'red'
    ];

    if (
        !validThemes.includes(themeName)
    ) {
        themeName = 'default';
    }

    document.body.classList.remove(
        'theme-cyberpunk',
        'theme-vintage',
        'theme-pastel',
        'theme-sky',
        'theme-red'
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


/* =========================================================
   DIARY BOOK
   1 CARD = 1 HALAMAN
   EDIT + DELETE
   ========================================================= */

let diaryCurrentPage = 1;
let diaryIsFlipping = false;
let diaryEditingId = null;

const DIARY_ITEMS_PER_PAGE = 1;
const DIARY_FLIP_DURATION = 520;


/* =========================================================
   AMBIL DATA DIARY
   ========================================================= */

async function getDiaryEntries() {
    if (!supabase) {
        return {
            data: null,
            error: new Error(
                'Supabase belum berhasil terhubung.'
            )
        };
    }

    const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .order('created_at', {
            ascending: false
        });

    return {
        data,
        error
    };
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeDiaryHtml(value) {
    const div = document.createElement('div');

    div.textContent =
        value === null ||
        value === undefined
            ? ''
            : String(value);

    return div.innerHTML;
}


/* =========================================================
   FORMAT TANGGAL DIARY
   ========================================================= */

function getDiaryDateText(entry) {
    const rawDate =
        entry.entry_date ||
        entry.date ||
        entry.created_at;

    if (!rawDate) {
        return '';
    }

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) {
        return String(rawDate);
    }

    return date.toLocaleDateString(
        'id-ID',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }
    );
}


/* =========================================================
   RENDER DIARY
   1 CARD = 1 HALAMAN
   ========================================================= */

 async function renderDiaryEntries(page = 1) {
    const diaryList = document.getElementById('diary-list');

    if (!diaryList) return;

    if (!supabase) {
        diaryList.innerHTML =
            '<div class="diary-empty">Supabase belum berhasil terhubung.</div>';

        renderDiaryPagination(0);
        return;
    }

    diaryList.innerHTML =
        '<div class="diary-loading">Memuat catatan...</div>';

    const { data, error } = await getDiaryEntries();

    if (error) {
        console.error('Gagal memuat diary:', error);

        diaryList.innerHTML =
            '<div class="diary-empty">Gagal memuat catatan diary.</div>';

        renderDiaryPagination(0);
        return;
    }

    const entries = Array.isArray(data) ? data : [];

    if (entries.length === 0) {
        diaryCurrentPage = 1;

        diaryList.innerHTML =
            '<div class="diary-empty">Belum ada catatan diary di database.</div>';

        renderDiaryPagination(0);
        return;
    }

    /*
     * 1 DIARY = 1 HALAMAN
     */
    const totalPages = Math.ceil(
        entries.length / DIARY_ITEMS_PER_PAGE
    );

    let safePage = Number(page);

    if (!Number.isInteger(safePage)) {
        safePage = 1;
    }

    if (safePage < 1) {
        safePage = 1;
    }

    if (safePage > totalPages) {
        safePage = totalPages;
    }

    diaryCurrentPage = safePage;

    const startIndex =
        (safePage - 1) * DIARY_ITEMS_PER_PAGE;

    const pageEntries = entries.slice(
        startIndex,
        startIndex + DIARY_ITEMS_PER_PAGE
    );

    diaryList.innerHTML = pageEntries.map(entry => {

        const title = escapeDiaryHtml(
            entry.title || 'Diary'
        );

        const content = escapeDiaryHtml(
            entry.content || ''
        ).replace(/\n/g, '<br>');

        const dateText = escapeDiaryHtml(
            getDiaryDateText(entry)
        );

        const safeId = String(entry.id)
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'");

        return `
            <article
                class="diary-card"
                data-diary-id="${escapeDiaryHtml(entry.id)}"
            >

                <div class="diary-card-header">

                    <h3 class="diary-title">
                        ${title}
                    </h3>

                    <span class="diary-date">
                        ${dateText}
                    </span>

                </div>

                <div class="diary-content">
                    ${content}
                </div>

                <div class="diary-card-actions">

                    <button
                        type="button"
                        class="diary-edit-btn"
                        onclick="editDiaryEntry('${safeId}')"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="diary-delete-btn"
                        onclick="deleteDiaryEntry('${safeId}')"
                    >
                        Hapus
                    </button>

                </div>

            </article>
        `;
    }).join('');

    renderDiaryPagination(totalPages);
}


function renderDiaryPagination(totalPages) {

    const pagination =
        document.getElementById('diary-pagination');

    if (!pagination) return;

    pagination.innerHTML = '';

    if (!totalPages || totalPages <= 1) {
        return;
    }

    /*
     * TOMBOL SEBELUMNYA
     */
    const previousButton =
        document.createElement('button');

    previousButton.type = 'button';
    previousButton.className = 'diary-page-btn';
    previousButton.textContent = 'Sebelumnya';

    previousButton.disabled =
        diaryCurrentPage <= 1 ||
        diaryIsFlipping;

    previousButton.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (diaryIsFlipping) return;

        if (diaryCurrentPage <= 1) return;

        flipDiaryPage(
            diaryCurrentPage - 1,
            'prev'
        );
    });

    pagination.appendChild(previousButton);


    /*
     * NOMOR HALAMAN
     */
    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const pageButton =
            document.createElement('button');

        pageButton.type = 'button';
        pageButton.className = 'diary-page-btn';

        if (page === diaryCurrentPage) {
            pageButton.classList.add('active');
        }

        pageButton.textContent = String(page);

        pageButton.disabled =
            diaryIsFlipping ||
            page === diaryCurrentPage;

        pageButton.addEventListener(
            'click',
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (diaryIsFlipping) return;

                if (page === diaryCurrentPage) {
                    return;
                }

                const direction =
                    page > diaryCurrentPage
                        ? 'next'
                        : 'prev';

                flipDiaryPage(
                    page,
                    direction
                );
            }
        );

        pagination.appendChild(pageButton);
    }


    /*
     * TOMBOL BERIKUTNYA
     */
    const nextButton =
        document.createElement('button');

    nextButton.type = 'button';
    nextButton.className = 'diary-page-btn';
    nextButton.textContent = 'Berikutnya';

    nextButton.disabled =
        diaryCurrentPage >= totalPages ||
        diaryIsFlipping;

    nextButton.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (diaryIsFlipping) return;

        if (diaryCurrentPage >= totalPages) {
            return;
        }

        flipDiaryPage(
            diaryCurrentPage + 1,
            'next'
        );
    });

    pagination.appendChild(nextButton);
}


async function flipDiaryPage(
    targetPage,
    direction = 'next'
) {

    const diaryList =
        document.getElementById('diary-list');

    if (!diaryList) return;

    if (diaryIsFlipping) return;

    const numericPage =
        Number(targetPage);

    if (
        !Number.isInteger(numericPage) ||
        numericPage < 1
    ) {
        return;
    }

    if (numericPage === diaryCurrentPage) {
        return;
    }

    const currentCard =
        diaryList.querySelector('.diary-card');

    /*
     * Kalau card belum ada,
     * langsung render halaman.
     */
    if (!currentCard) {

        diaryCurrentPage = numericPage;

        await renderDiaryEntries(
            numericPage
        );

        return;
    }

    diaryIsFlipping = true;

    playClickSound();

    const safeDirection =
        direction === 'prev'
            ? 'prev'
            : 'next';

    /*
     * Matikan semua tombol selama animasi.
     */
    const pagination =
        document.getElementById(
            'diary-pagination'
        );

    if (pagination) {

        pagination
            .querySelectorAll('button')
            .forEach(button => {
                button.disabled = true;
            });
    }


    /*
     * Bersihkan class animasi lama.
     */
    currentCard.classList.remove(
        'diary-book-flip-next',
        'diary-book-flip-prev',
        'diary-book-new-next',
        'diary-book-new-prev'
    );

    void currentCard.offsetWidth;


    /*
     * Jalankan animasi halaman lama.
     */
    currentCard.classList.add(
        safeDirection === 'next'
            ? 'diary-book-flip-next'
            : 'diary-book-flip-prev'
    );


    /*
     * Tunggu animasi selesai.
     */
    await new Promise(resolve => {

        setTimeout(
            resolve,
            DIARY_FLIP_DURATION
        );

    });


    /*
     * Render halaman baru.
     */
    diaryCurrentPage = numericPage;

    await renderDiaryEntries(
        numericPage
    );


    /*
     * Animasi halaman baru.
     */
    const newCard =
        diaryList.querySelector('.diary-card');

    if (newCard) {

        newCard.classList.add(
            safeDirection === 'next'
                ? 'diary-book-new-next'
                : 'diary-book-new-prev'
        );

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                newCard.classList.remove(
                    'diary-book-new-next',
                    'diary-book-new-prev'
                );

            });

        });
    }


    /*
     * Buka kembali pagination.
     */
    diaryIsFlipping = false;

    /*
     * Pastikan tombol pagination
     * mendapatkan status terbaru.
     */
    const refreshedPagination =
        document.getElementById(
            'diary-pagination'
        );

    if (refreshedPagination) {

        refreshedPagination
            .querySelectorAll('button')
            .forEach(button => {

                button.disabled = false;

            });
    }

    /*
     * Render ulang agar nomor halaman
     * aktif dan tombol sebelumnya/berikutnya
     * benar-benar sesuai halaman saat ini.
     */
    const { data } =
        await getDiaryEntries();

    const entries =
        Array.isArray(data)
            ? data
            : [];

    const totalPages =
        Math.ceil(
            entries.length /
            DIARY_ITEMS_PER_PAGE
        );

    renderDiaryPagination(
        totalPages
    );
}


/* =========================================================
   EDIT DIARY
   ========================================================= */

async function editDiaryEntry(
    id
) {
    if (!supabase) {

        alert(
            'Supabase belum berhasil terhubung.'
        );

        return;
    }

    if (
        id === null ||
        id === undefined ||
        id === ''
    ) {
        return;
    }

    const {
        data,
        error
    } = await supabase
        .from('diaries')
        .select('*')
        .eq(
            'id',
            id
        )
        .single();

    if (error) {

        console.error(
            'Gagal mengambil diary:',
            error
        );

        alert(
            'Gagal membuka catatan untuk diedit.'
        );

        return;
    }

    if (!data) {

        alert(
            'Catatan diary tidak ditemukan.'
        );

        return;
    }


    /* =====================================================
       AMBIL FORM
       ===================================================== */

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


    /* =====================================================
       MASUKKAN DATA KE FORM
       ===================================================== */

    if (titleInput) {

        titleInput.value =
            data.title || '';

    }

    if (contentInput) {

        contentInput.value =
            data.content || '';

    }

    if (dateInput) {

        const rawDate =
            data.entry_date ||
            data.date ||
            '';

        dateInput.value =
            rawDate
                ? String(
                    rawDate
                ).slice(
                    0,
                    10
                )
                : '';

    }


    /* =====================================================
       SIMPAN ID YANG SEDANG DI-EDIT
       ===================================================== */

    diaryEditingId =
        data.id;


    /* =====================================================
       CARI TOMBOL SIMPAN
       ===================================================== */

    const diaryPage =
        document.getElementById(
            'page-diary'
        );

    if (diaryPage) {

        const buttons =
            diaryPage.querySelectorAll(
                'button'
            );

        buttons.forEach(
            button => {

                const text =
                    (
                        button.textContent ||
                        ''
                    )
                        .trim()
                        .toLowerCase();

                if (
                    text ===
                        'simpan catatan' ||
                    text ===
                        'update catatan'
                ) {

                    button.textContent =
                        'UPDATE CATATAN';

                }

            }
        );

    }


    /* =====================================================
       TAMPILKAN BATAL UPDATE
       ===================================================== */

    const cancelButton =
        document.getElementById(
            'diary-cancel-update'
        );

    if (cancelButton) {

        cancelButton.style.display =
            'block';

    }


    /* =====================================================
       SCROLL KE FORM
       ===================================================== */

    const form =
        titleInput ||
        contentInput ||
        dateInput;

    if (form) {

        form.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        setTimeout(
            () => {

                if (titleInput) {
                    titleInput.focus();
                }

            },
            400
        );

    }
}


/* =========================================================
   SIMPAN / UPDATE DIARY
   ========================================================= */

async function saveDiaryEntry() {

    if (!supabase) {

        alert(
            'Supabase belum berhasil terhubung.'
        );

        return;
    }


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

        alert(
            'Form diary tidak ditemukan.'
        );

        return;
    }


    const title =
        titleInput.value.trim();

    const content =
        contentInput.value.trim();

    const date =
        dateInput
            ? dateInput.value
            : '';


    if (!title) {

        alert(
            'Judul diary belum diisi.'
        );

        titleInput.focus();

        return;
    }


    if (!content) {

        alert(
            'Isi diary belum diisi.'
        );

        contentInput.focus();

        return;
    }


    const payload = {
        title: title,
        content: content,
        entry_date:
            date || null
    };


    let error = null;


    /* =====================================================
       MODE UPDATE
       ===================================================== */

    if (
        diaryEditingId !== null &&
        diaryEditingId !== undefined
    ) {

        const result =
            await supabase
                .from('diaries')
                .update(
                    payload
                )
                .eq(
                    'id',
                    diaryEditingId
                );

        error =
            result.error;


        if (!error) {

            alert(
                'Catatan diary berhasil diperbarui.'
            );

        }

    }


    /* =====================================================
       MODE TAMBAH
       ===================================================== */

    else {

        const result =
            await supabase
                .from('diaries')
                .insert(
                    payload
                );

        error =
            result.error;


        if (!error) {

            alert(
                'Catatan diary berhasil disimpan.'
            );

        }

    }


    /* =====================================================
       ERROR
       ===================================================== */

    if (error) {

        console.error(
            'Gagal menyimpan diary:',
            error
        );

        alert(
            'Gagal menyimpan catatan diary.'
        );

        return;
    }


    /* =====================================================
       RESET MODE EDIT
       ===================================================== */

    diaryEditingId =
        null;


    titleInput.value =
        '';

    contentInput.value =
        '';

    if (dateInput) {

        dateInput.value =
            '';

    }


    /* =====================================================
       KEMBALIKAN TOMBOL SIMPAN
       ===================================================== */

    const diaryPage =
        document.getElementById(
            'page-diary'
        );

    if (diaryPage) {

        diaryPage
            .querySelectorAll(
                'button'
            )
            .forEach(
                button => {

                    const text =
                        (
                            button.textContent ||
                            ''
                        )
                            .trim()
                            .toLowerCase();

                    if (
                        text ===
                            'update catatan'
                    ) {

                        button.textContent =
                            'SIMPAN CATATAN';

                    }

                }
            );

    }


    /* =====================================================
       SEMBUNYIKAN BATAL UPDATE
       ===================================================== */

    const cancelButton =
        document.getElementById(
            'diary-cancel-update'
        );

    if (cancelButton) {

        cancelButton.style.display =
            'none';

    }


    /* =====================================================
       KEMBALI KE HALAMAN 1
       ===================================================== */

    diaryCurrentPage =
        1;

    await renderDiaryEntries(
        diaryCurrentPage
    );
}


/* =========================================================
   BATAL UPDATE DIARY
   ========================================================= */

function cancelDiaryUpdate() {

    /*
       HAPUS STATUS EDIT
    */

    diaryEditingId =
        null;


    /*
       AMBIL FORM
    */

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


    /*
       KOSONGKAN FORM
    */

    if (titleInput) {

        titleInput.value =
            '';

    }

    if (contentInput) {

        contentInput.value =
            '';

    }

    if (dateInput) {

        dateInput.value =
            '';

    }


    /*
       KEMBALIKAN TOMBOL
    */

    const diaryPage =
        document.getElementById(
            'page-diary'
        );

    if (diaryPage) {

        diaryPage
            .querySelectorAll(
                'button'
            )
            .forEach(
                button => {

                    const text =
                        (
                            button.textContent ||
                            ''
                        )
                            .trim()
                            .toLowerCase();

                    if (
                        text ===
                            'update catatan'
                    ) {

                        button.textContent =
                            'SIMPAN CATATAN';

                    }

                }
            );

    }


    /*
       SEMBUNYIKAN TOMBOL BATAL
    */

    const cancelButton =
        document.getElementById(
            'diary-cancel-update'
        );

    if (cancelButton) {

        cancelButton.style.display =
            'none';

    }

}


/* =========================================================
   HAPUS DIARY
   ========================================================= */

async function deleteDiaryEntry(
    id
) {

    if (!supabase) {

        alert(
            'Supabase belum berhasil terhubung.'
        );

        return;
    }


    if (
        id === null ||
        id === undefined ||
        id === ''
    ) {

        return;
    }


    const confirmed =
        window.confirm(
            'Apakah kamu yakin ingin menghapus catatan diary ini?'
        );


    if (!confirmed) {

        return;
    }


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

        console.error(
            'Gagal menghapus diary:',
            error
        );

        alert(
            'Gagal menghapus catatan diary.'
        );

        return;
    }


    /*
       KALAU YANG DIHAPUS
       SEDANG DIEDIT
    */

    if (
        diaryEditingId !== null &&
        String(
            diaryEditingId
        ) ===
        String(id)
    ) {

        cancelDiaryUpdate();

    }


    /*
       AMBIL DATA TERBARU
    */

    const {
        data,
        error: fetchError
    } = await getDiaryEntries();


    if (fetchError) {

        diaryCurrentPage =
            1;

        await renderDiaryEntries(
            1
        );

        return;
    }


    const remaining =
        Array.isArray(data)
            ? data.length
            : 0;


    /*
       HITUNG ULANG TOTAL HALAMAN
    */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                remaining /
                DIARY_ITEMS_PER_PAGE
            )
        );


    /*
       JIKA HALAMAN SAAT INI
       SUDAH TIDAK ADA
    */

    if (
        diaryCurrentPage >
        totalPages
    ) {

        diaryCurrentPage =
            totalPages;

    }


    /*
       RENDER ULANG
    */

    await renderDiaryEntries(
        diaryCurrentPage
    );
}


/* =========================================================
   GLOBAL
   ========================================================= */

window.editDiaryEntry =
    editDiaryEntry;

window.deleteDiaryEntry =
    deleteDiaryEntry;

window.saveDiaryEntry =
    saveDiaryEntry;

window.cancelDiaryUpdate =
    cancelDiaryUpdate;

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

        envelope.style.display = 'none';

        message.classList.remove('hidden');
        message.classList.add('active');

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
        return [];
    }

    const {
        data,
        error
    } = await supabase
        .from('feelings_logs')
        .select('*')
        .order('date', {
            ascending: false
        })
        .order('created_at', {
            ascending: false
        });

    if (error) {
        console.error(
            'Error getting feeling logs:',
            error
        );

        return [];
    }

    return data || [];
}



async function saveFeelingLog() {

    playClickSound();

    if (!supabase) {
        alert('Supabase belum terhubung.');
        return;
    }

    const dateInput =
        document.getElementById('feelings-date');

    const feelingInput =
        document.getElementById('feelings-today');

    const answerInput =
        document.getElementById('feelings-answer');

    const saveButton =
        document.querySelector('.feelings-save-btn');

    if (
        !dateInput ||
        !feelingInput ||
        !answerInput
    ) {
        alert('Form Feelings Log tidak ditemukan.');
        return;
    }

    const date =
        dateInput.value;

    const feeling =
        feelingInput.value.trim();

    const answer =
        answerInput.value.trim();

    const rating =
        Number(currentFeelingRating || 0);

    if (!date) {
        alert('Tanggal perasaan harus diisi.');
        dateInput.focus();
        return;
    }

    if (
        !rating ||
        rating < 1 ||
        rating > 5
    ) {
        alert('Silakan pilih rating perasaan 1 sampai 5.');
        return;
    }

    if (!feeling) {
        alert('Perasaan kamu harus diisi.');
        feelingInput.focus();
        return;
    }

    if (!answer) {
        alert('Jawaban dari today i feel harus diisi.');
        answerInput.focus();
        return;
    }

    if (saveButton) {
        saveButton.disabled = true;

        saveButton.dataset.originalText =
            saveButton.textContent;

        saveButton.textContent =
            'Menyimpan...';
    }

    try {

        const payload = {
            date: date,
            rating: rating,
            feeling: feeling,
            answer: answer,
            photo_url:
                currentFeelingPhotoUrl || null
        };

        const {
            data,
            error
        } = await supabase
            .from('feelings_logs')
            .insert([payload])
            .select()
            .single();

        if (error) {
            throw error;
        }

        console.log(
            'Feelings Log berhasil disimpan:',
            data
        );

        dateInput.value = '';
        feelingInput.value = '';
        answerInput.value = '';

        currentFeelingRating = 0;
        currentFeelingPhotoUrl = '';
        currentFeelingPhotoPath = '';

        setFeelingRating(0);

        const photoInput =
            document.getElementById(
                'feelings-photo-input'
            );

        if (photoInput) {
            photoInput.value = '';
        }

        showFeelingPhotoPreview('');

        initFeelingsDate();

        feelingsCurrentPage = 1;

        await renderFeelingLogs(1);

        alert('Feelings Log berhasil disimpan.');

    } catch (error) {

        console.error(
            'Error saving feeling log:',
            error
        );

        alert(
            error && error.message
                ? error.message
                : 'Gagal menyimpan Feelings Log.'
        );

    } finally {

        if (saveButton) {
            saveButton.disabled = false;

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
                        log.date
                    );

                const feeling =
                    escapeHtml(
                        log.feeling || ''
                    );

                const answer =
                    escapeHtml(
                        log.answer || ''
                    ).replace(
                        /\n/g,
                        '<br>'
                    );

               const ratingValue =
    Number(log.rating);

const rating =
    Number.isFinite(ratingValue)
        ? Math.max(
            0,
            Math.min(
                5,
                Math.round(ratingValue)
            )
        )
        : 0;

                let stars = '';

for (let i = 1; i <= 5; i++) {
    stars += `
        <span class="${i <= rating ? 'active' : ''}">
            ${i <= rating ? '★' : '☆'}
        </span>
    `;
}

                const photoUrl =
                    log.photo_url ||
                    '';

                card.innerHTML = `
    ${
        photoUrl
            ? `
        <div class="feeling-log-photo">
            <img
                src="${escapeHtml(photoUrl)}"
                alt="Foto feelings"
                loading="lazy"
                onclick="openFeelingPhoto('${escapeHtml(photoUrl)}')"
            >
        </div>
        `
            : ''
    }

    <div class="feeling-log-content">

        <div class="feeling-log-header">

            <div class="feeling-log-main">

                <div class="feeling-log-date">
                    ${escapeHtml(dateText)}
                </div>

                <h3 class="feeling-log-mood">
                    ${feeling}
                </h3>

            </div>

            <div class="feeling-log-rating">
                ${stars}
            </div>

        </div>

        ${
            answer
                ? `
            <div class="feeling-log-note">
                ${answer}
            </div>
            `
                : ''
        }

        <div class="feeling-log-actions">

            <button
                type="button"
                class="delete-feeling-btn"
                onclick="deleteFeelingLog('${String(log.id)}')"
            >
                Hapus
            </button>

        </div>

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

async function deleteFeelingLog(id) {

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
        alert('Supabase belum terhubung.');
        return;
    }

    try {

        const {
            data,
            error
        } = await supabase
            .from('feelings_logs')
            .select('photo_url')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        const {
            error: deleteError
        } = await supabase
            .from('feelings_logs')
            .delete()
            .eq('id', id);

        if (deleteError) {
            throw deleteError;
        }

        if (
            data &&
            data.photo_url
        ) {

            try {

                const marker =
                    `/storage/v1/object/public/${FEELINGS_PHOTO_BUCKET}/`;

                const index =
                    data.photo_url.indexOf(marker);

                if (index !== -1) {

                    const path =
                        data.photo_url.substring(
                            index + marker.length
                        );

                    if (path) {

                        await supabase
                            .storage
                            .from(FEELINGS_PHOTO_BUCKET)
                            .remove([path]);
                    }
                }

            } catch (storageError) {

                console.warn(
                    'Data berhasil dihapus, tetapi foto Storage gagal dihapus:',
                    storageError
                );
            }
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
            error && error.message
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