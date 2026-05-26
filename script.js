// Data structure for multiple videos
const videoLibrary = [
    {
        id: "eJDUZv2vE4k",
        title: "Discépolo: El Filósofo del Tango",
        description: "Historia Crítica del Pensamiento Argentino - Capítulo 1",
        segments: [
            { time: 0, title: "Contexto Histórico", desc: "La Década Infame" },
            { time: 240, title: "La Metafísica del Tango", desc: "El sentimiento discepoliano" },
            { time: 900, title: "Yira, Yira", desc: "La indiferencia del mundo" },
            { time: 1500, title: "Cambalache", desc: "La biblia y el calefón" },
            { time: 2100, title: "Mordisquito", desc: "Compromiso político" }
        ]
    },
    {
        id: "qcJEEyJGl7M",
        title: "Discépolo y el Pensamiento Nacional",
        description: "Análisis profundo de su legado cultural",
        segments: [
            { time: 0, title: "Introducción", desc: "El rol de la cultura" },
            { time: 300, title: "Discépolo y el Pueblo", desc: "Lírica popular" },
            { time: 800, title: "El Grotesco", desc: "Teatro y realidad" }
        ]
    },
    {
        id: "9e9PAFqWfjE",
        title: "Discépolo: Mordisquito (Capítulo 3)",
        description: "Historia Crítica del Pensamiento Argentino - Capítulo 3",
        segments: [
            { time: 0, title: "Introducción", desc: "El contexto de Mordisquito" },
            { time: 300, title: "El Personaje", desc: "A mí no me la vas a contar" },
            { time: 900, title: "Legado", desc: "Impacto político y cultural" }
        ]
    },
    {
        id: "EtH_J6wYOv8",
        title: "Discépolo: Vida y Obra (Capítulo 4)",
        description: "Documental biográfico y análisis de su legado",
        segments: [
            { time: 0, title: "Inicios", desc: "La familia y los primeros años" },
            { time: 600, title: "Éxito en el Tango", desc: "Grandes composiciones" },
            { time: 1200, title: "Legado Eterno", desc: "Influencia posterior" }
        ]
    },
    {
        id: "nMQMQXDTH34",
        title: "Discépolo: Reflexiones Finales (Capítulo 5)",
        description: "El impacto cultural y social de Enrique Santos Discépolo",
        segments: [
            { time: 0, title: "Introducción", desc: "El rol del artista" },
            { time: 400, title: "Visión Social", desc: "Crítica y esperanza" },
            { time: 1000, title: "Conclusión", desc: "La vigencia de su obra" }
        ]
    }
];

let player;
let apiReady = false;
let currentVideoIndex = 0;

const placeholder = document.getElementById('video-placeholder');
const placeholderImg = document.getElementById('placeholder-img');
const playerDiv = document.getElementById('main-player');
const mainChapterGrid = document.getElementById('main-chapter-grid');
const chapterList = document.getElementById('chapter-list');
const currentVideoTitle = document.getElementById('current-video-title');

// Initialize UI
function initUI() {
    renderVideoGrid();
    loadVideoData(0);
}

function renderVideoGrid() {
    mainChapterGrid.innerHTML = '';
    videoLibrary.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = `video-card ${index === currentVideoIndex ? 'active' : ''}`;
        card.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
            <div class="video-card-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        card.onclick = () => switchMainVideo(index);
        mainChapterGrid.appendChild(card);
    });
}

function loadVideoData(index) {
    currentVideoIndex = index;
    const video = videoLibrary[index];

    // Update Placeholder
    placeholder.classList.remove('hidden');
    playerDiv.classList.add('hidden');
    placeholderImg.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

    // Update Segments
    currentVideoTitle.innerText = `Capítulos: ${video.title}`;
    renderSegments(video.segments);

    // Reset player if it exists
    if (player) {
        player.destroy();
        player = null;
    }

    // Highlight active card
    renderVideoGrid();
}

function renderSegments(segments) {
    chapterList.innerHTML = '';
    segments.forEach((seg, i) => {
        const li = document.createElement('li');
        li.className = `chapter-item ${i === 0 ? 'active' : ''}`;
        li.setAttribute('data-time', seg.time);
        li.innerHTML = `
            <span class="chapter-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="chapter-info">
                <h3>${seg.title}</h3>
                <p>${seg.desc}</p>
            </div>
        `;
        li.onclick = () => {
            const time = parseInt(seg.time);
            document.querySelectorAll('.chapter-item').forEach(item => item.classList.remove('active'));
            li.classList.add('active');

            if (player && player.seekTo) {
                player.seekTo(time, true);
                player.playVideo();
            } else {
                initPlayer(time);
            }
        };
        chapterList.appendChild(li);
    });
}

function switchMainVideo(index) {
    if (index === currentVideoIndex) return;
    loadVideoData(index);
}

// YT API
function onYouTubeIframeAPIReady() {
    apiReady = true;
}

function initPlayer(startTime = 0) {
    if (!apiReady) return;
    const video = videoLibrary[currentVideoIndex];

    placeholder.classList.add('hidden');
    playerDiv.classList.remove('hidden');

    player = new YT.Player('main-player', {
        height: '100%',
        width: '100%',
        videoId: video.id,
        playerVars: {
            'autoplay': 1,
            'start': startTime,
            'playsinline': 1,
            'enablejsapi': 1
        }
    });
}

function setupChapters() {
    const chapterItems = document.querySelectorAll('.chapter-item');
    chapterItems.forEach(item => {
        item.addEventListener('click', () => {
            const time = parseInt(item.getAttribute('data-time'));

            // Update active class
            chapterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Seek to specific time
            if (player && player.seekTo) {
                player.seekTo(time, true);
                player.playVideo();
            } else {
                // If player exists but not ready, or something else
                initPlayer(time);
            }
        });
    });
}

placeholder.addEventListener('click', () => initPlayer(0));

// Quiz Data (Remains mostly same but improved)
const quizData = [
    {
        question: "¿En qué década se sitúa la mayor parte de la obra de Discépolo?",
        options: ["1910", "1930", "1950", "1970"],
        correct: 1
    },
    {
        question: "¿Cuál de sus tangos describe el mundo como una 'porquería' donde todo es igual?",
        options: ["Uno", "Cafetín de Buenos Aires", "Cambalache", "Yira, Yira"],
        correct: 2
    },
    {
        question: "¿Cómo se llamaba el personaje de radio con el que Discépolo defendía sus ideas políticas?",
        options: ["El Manosanta", "Mordisquito", "Minguito", "Tato Bores"],
        correct: 1
    },
    {
        question: "¿Qué sentimiento predomina en la letra de 'Yira, Yira'?",
        options: ["Alegría desbordante", "Amor romántico", "Falta de solidaridad y desaliento", " Patriotismo"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizResult = document.getElementById('quiz-result');

function loadQuestion() {
    const data = quizData[currentQuestion];
    questionText.innerText = data.question;
    optionsContainer.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'options-grid';
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        grid.appendChild(btn);
    });
    optionsContainer.appendChild(grid);
    nextBtn.classList.add('hidden');
}

function checkAnswer(index, btn) {
    const correct = quizData[currentQuestion].correct;
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    if (index === correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
    }
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionText.classList.add('hidden');
    optionsContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');
    quizResult.classList.remove('hidden');
    const scoreText = document.getElementById('score-text');
    scoreText.innerText = `Has respondido correctamente ${score} de ${quizData.length} preguntas.`;
}

// Start API and UI
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    setupScrollReveal();
    setupMobileMenu();
});
loadQuestion();

// Scroll Reveal Logic
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '1rem';
                navLinks.style.textAlign = 'center';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
}

// Mesostico Data and Logic
const mesosticoData = [
    { word: "RECADO", centerIndex: 1, spineChar: "E", hint: "El boliche como último amparo o RECADO del alma" },
    { word: "ESTAÑO", centerIndex: 1, spineChar: "S", hint: "El ESTAÑO de metal donde se apoya el fracaso" },
    { word: "CATERVA", centerIndex: 2, spineChar: "T", hint: "La CATERVA de náufragos y bohemios del café" },
    { word: "MAURA", centerIndex: 1, spineChar: "A", hint: "El MAURA que está abandonado, triste o desahuciado en la mesa" },
    { word: "PERCANTA", centerIndex: 2, spineChar: "R", hint: "La PERCANTA, el recuerdo del amor perdido que ronda en la noche" },
    { isSpace: true },
    { word: "MISHIADURA", centerIndex: 2, spineChar: "S", hint: "La MISHIADURA o escasez compartida en una taza de café" },
    { word: "TAITA", centerIndex: 2, spineChar: "I", hint: "El TAITA, el malevo de ley que se planta frente al destino" },
    { word: "FECA", centerIndex: 1, spineChar: "E", hint: "El FECA, la pócima amarga que enseña más que la universidad" },
    { word: "MINGA", centerIndex: 2, spineChar: "N", hint: "La MINGA, la nada misma o el desprecio con el que el mundo responde" },
    { word: "CADENERO", centerIndex: 2, spineChar: "D", hint: "El CADENERO, el compadrito que camina la noche con prepotencia" },
    { word: "FONDIN", centerIndex: 1, spineChar: "O", hint: "El FONDÍN oscuro, el refugio final donde se mastica el olvido" }
];

let completedWords = 0;
const totalWords = mesosticoData.filter(d => !d.isSpace).length;

function initMesostico() {
    const container = document.getElementById('mesostico-container');
    if (!container) return;
    
    // Setup initial hints
    const hintBox = document.getElementById('mesostico-hint');
    if (hintBox) {
        hintBox.innerText = "Toca cualquier casillero vacío para ver la pista de la palabra a descubrir.";
    }

    mesosticoData.forEach((row, rowIndex) => {
        if (row.isSpace) {
            const spaceRow = document.createElement('div');
            spaceRow.className = 'meso-row empty-row';
            container.appendChild(spaceRow);
            return;
        }

        const rowDiv = document.createElement('div');
        rowDiv.className = 'meso-row';
        rowDiv.setAttribute('data-word', row.word);
        rowDiv.setAttribute('data-hint', row.hint);

        const leftDiv = document.createElement('div');
        leftDiv.className = 'meso-left';
        const rightDiv = document.createElement('div');
        rightDiv.className = 'meso-right';
        const centerDiv = document.createElement('div');
        centerDiv.className = 'meso-center';

        // Center spine cell
        const spineCell = document.createElement('div');
        spineCell.className = 'meso-cell spine';
        spineCell.innerText = row.spineChar;
        centerDiv.appendChild(spineCell);

        // Inputs before spine
        for (let i = 0; i < row.centerIndex; i++) {
            leftDiv.appendChild(createMesoInput(row.word[i], row.hint, rowDiv));
        }

        // Inputs after spine
        for (let i = row.centerIndex + 1; i < row.word.length; i++) {
            rightDiv.appendChild(createMesoInput(row.word[i], row.hint, rowDiv));
        }

        rowDiv.appendChild(leftDiv);
        rowDiv.appendChild(centerDiv);
        rowDiv.appendChild(rightDiv);
        container.appendChild(rowDiv);
    });
}

function createMesoInput(expectedChar, hintText, rowDiv) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'meso-input';
    // Remove accents for data-expected to make checking easier
    input.dataset.expected = expectedChar.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    
    // Show hint on focus
    input.addEventListener('focus', function() {
        if (!rowDiv.classList.contains('completed')) {
            const hintBox = document.getElementById('mesostico-hint');
            if (hintBox) {
                hintBox.innerText = "Pista: " + hintText;
                hintBox.style.color = "var(--primary-color)";
                hintBox.style.borderColor = "var(--primary-color)";
            }
        }
    });

    input.addEventListener('input', function() {
        this.value = this.value.toUpperCase();
        
        // Auto focus next
        if (this.value) {
            const nextInput = this.parentElement.nextElementSibling?.querySelector('.meso-input') || 
                              this.nextElementSibling || 
                              this.closest('.meso-row').querySelector('.meso-right .meso-input');
            if (nextInput && !nextInput.classList.contains('correct') && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            }
        }
        
        checkRow(rowDiv);
    });
    
    return input;
}

function checkRow(rowDiv) {
    const inputs = rowDiv.querySelectorAll('.meso-input');
    let allCorrect = true;

    inputs.forEach(input => {
        const val = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        if (val !== input.dataset.expected) {
            allCorrect = false;
        }
    });

    if (allCorrect && !rowDiv.classList.contains('completed')) {
        rowDiv.classList.add('completed');
        inputs.forEach(input => input.classList.add('correct'));
        
        const feedback = document.getElementById('mesostico-feedback');
        if (feedback) {
            feedback.innerText = "¡Correcto! " + rowDiv.getAttribute('data-hint');
            feedback.classList.remove('hidden');
            feedback.style.color = "#00ff00";
            feedback.style.borderColor = "#00ff00";
        }

        const hintBox = document.getElementById('mesostico-hint');
        if (hintBox) {
            hintBox.innerText = "¡Fila completada!";
            hintBox.style.color = "#00ff00";
        }

        completedWords++;
        if (completedWords === totalWords) {
            setTimeout(() => {
                if (feedback) {
                    feedback.innerText = "¡ESTAR SIENDO completado! Has descifrado la ontología del arrabal y la poética de Kusch en las sombras del cafetín.";
                    feedback.style.color = "#00ff00";
                    feedback.style.borderColor = "#00ff00";
                }
            }, 1500);
        }
    }
}

// Ensure initMesostico runs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMesostico();
    // Scale after a brief paint so offsetWidth is reliable
    requestAnimationFrame(() => scaleMesostico());
});

/**
 * Dynamically computes the optimal cell size for the mesostico grid
 * so the longest row (MISHIADURA: 7 cells on the right) always fits
 * within the actual container width without overflowing.
 */
function scaleMesostico() {
    const grid = document.getElementById('mesostico-container');
    if (!grid) return;

    // Max cells on ONE side across all rows (MISHIADURA has 7 on the right)
    const maxCellsOneSide = Math.max(
        ...mesosticoData
            .filter(d => !d.isSpace)
            .map(d => Math.max(d.centerIndex, d.word.length - d.centerIndex - 1))
    );

    const gridWidth = grid.offsetWidth;

    // Constants for the column gap between the three grid areas (left | center | right)
    const colGap = 4;

    // Tentative center (spine) cell size — we'll match it to the computed cell size
    // Space available for each side column
    const centerSize = 36; // start with default
    const availablePerSide = (gridWidth - centerSize - colGap * 2) / 2;

    // Cell gap between cells inside left/right
    // We'll derive it proportionally after computing cell size
    const tentativeCellGap = 3;
    const cellSize = Math.floor(
        (availablePerSide - tentativeCellGap * (maxCellsOneSide - 1)) / maxCellsOneSide
    );

    // Clamp: max 35px (desktop default), min 18px (still usable on phone)
    const finalCell = Math.min(35, Math.max(18, cellSize));
    const finalGap  = finalCell >= 28 ? 4 : finalCell >= 22 ? 3 : 2;
    const finalCenter = Math.min(36, finalCell + 2);
    const finalFontSize = Math.max(10, Math.round(finalCell * 0.5)) + 'px';

    // Apply via CSS custom properties on the grid container
    grid.style.setProperty('--meso-cell-size',   finalCell + 'px');
    grid.style.setProperty('--meso-cell-gap',    finalGap  + 'px');
    grid.style.setProperty('--meso-col-gap',     colGap    + 'px');
    grid.style.setProperty('--meso-center-size', finalCenter + 'px');
    grid.style.setProperty('--meso-font-size',   finalFontSize);
}

// Re-scale on resize (debounced)
let _mesoResizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(_mesoResizeTimer);
    _mesoResizeTimer = setTimeout(scaleMesostico, 120);
});
