document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CONFIGURAÇÕES & DADOS --- */
    const startDate = new Date('2025-05-01T00:00:00');
    const chapters = [
        { title: "01. O Começo", date: "01/05/2025", text: "Tudo começou no dia 01/05/2025, quando uma amiga — a Erika — comentou sobre você, que também se chama Erika (kkk). Ela disse que queria nos apresentar, e eu, achando que não daria em nada, respondi: “por que não?”. Mal sabia que essa atitude mudaria minha vida para sempre." },
        { title: "02. Encontro", date: "06/05/2025", text: "Te chamei no Instagram, conversamos e fomos para o WhatsApp. No dia 06/05/2025 nos vimos pela primeira vez. Você estava linda — tipo o Johnny de Hotel Transilvânia vendo a Mavis. Meu coração reconheceu: “é ela”. Fomos ver Thunderbolts (péssima escolha de filme kkk), mas o dia foi maravilhoso." },
        { title: "03. O Beijo", date: "18/05/2025", text: "No dia 18/05/2025 você me chamou para jogar Banco Imobiliário na sua vó (eu só queria te ver kkk). Depois, na sua casa, assistimos Alvin e os Esquilos. Em um momento inesperado nossos olhares se cruzaram e nos beijamos. Um dos melhores dias da minha vida." },
        { title: "04. O Pedido", date: "30/05 e 06/06", text: "No dia 30/05 rolou um pedido improvisado; o oficial veio em 06/06/2025. Comprei as alianças mais valiosas do mundo — não pelo preço, mas porque estariam no dedo da pessoa mais importante pra mim." },
        { title: "05. Morar Juntos", date: "23/10/2025", text: "Depois de meses, decidimos morar juntos. Foi corrido, mas deu certo. Em 23/10/2025 dormimos pela primeira vez no nosso novo apê." },
        { title: "06. Hoje", date: "Atualmente", text: "Hoje tenho a sorte de acordar ao seu lado. Vivemos momentos bons e ruins, aprendemos e crescemos, sempre juntos com carinho e cumplicidade. Nossa história está só começando. ❤️" }
    ];

    /* --- 2. CONTADOR --- */
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        if (diff < 0) {
            ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.innerText = '00';
            });
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const elDays = document.getElementById('days');
        if(elDays) elDays.innerText = days;
        const elHours = document.getElementById('hours');
        if(elHours) elHours.innerText = String(hours).padStart(2, '0');
        const elMinutes = document.getElementById('minutes');
        if(elMinutes) elMinutes.innerText = String(minutes).padStart(2, '0');
        const elSeconds = document.getElementById('seconds');
        if(elSeconds) elSeconds.innerText = String(seconds).padStart(2, '0');
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    /* --- 3. MÚSICA (PLAY / PAUSE + NEXT) --- */
    const audioEl = document.getElementById('bg-music');
    const audioBtn = document.getElementById('audioBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicIcon = document.getElementById('music-icon');
    const audioToast = document.getElementById('audio-toast');

    const playlist = [
        { title: "Em Teu Olhar", src: "musicas_site/musica1.mp3" },
        { title: "Para Sempre", src: "musicas_site/musica2.mp3" }
    ];
    let currentTrackIndex = 0;

    function showToast(text) {
        if(!audioToast) return;
        audioToast.innerText = text;
        audioToast.classList.add('visible');
        setTimeout(() => audioToast.classList.remove('visible'), 3000);
    }

    function loadTrack(index) {
        if(index >= playlist.length) index = 0;
        currentTrackIndex = index;
        audioEl.src = playlist[index].src;
    }

    function playTrack() {
        audioEl.play().then(() => {
            musicIcon.innerText = "⏸"; // Pause icon
            audioBtn.classList.add('playing');
            audioBtn.setAttribute('aria-pressed', 'true');
            showToast("Tocando: " + playlist[currentTrackIndex].title);
        }).catch((err) => {
            console.warn("Autoplay bloqueado:", err);
            musicIcon.innerText = "▶"; // Play icon
            audioBtn.classList.remove('playing');
            audioBtn.setAttribute('aria-pressed', 'false');
            showToast("Clique para ativar áudio");
        });
    }

    function pauseTrack() {
        audioEl.pause();
        musicIcon.innerText = "▶";
        audioBtn.classList.remove('playing');
        audioBtn.setAttribute('aria-pressed', 'false');
        showToast("Pausado");
    }

    function nextTrack() {
        showToast("Tocando próxima música...");
        let nextIndex = currentTrackIndex + 1;
        if(nextIndex >= playlist.length) nextIndex = 0;
        loadTrack(nextIndex);
        playTrack();
    }

    // Botão Play/Pause Lógica
    if(audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (audioEl.paused) {
                // Se o src estiver vazio (primeiro load), carrega
                if(!audioEl.src || audioEl.src === "") loadTrack(currentTrackIndex);
                playTrack();
            } else {
                pauseTrack();
            }
        });
    }

    // Botão Próximo
    if(nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
    }

    // Auto-advance
    if(audioEl) {
        audioEl.addEventListener('ended', nextTrack);
        loadTrack(0); // Prepara a primeira
    }

    /* --- 4. SLIDESHOW --- */
    let slideIndex = 0;
    let slideInterval;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        if (slides.length === 0) return;
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[slideIndex].classList.add('active');
        if(dots[slideIndex]) dots[slideIndex].classList.add('active');
    }

    window.changeSlide = function(n) { showSlide(slideIndex += n); };
    window.setSlide = function(n) { showSlide(slideIndex = n); };
    window.pauseSlide = function() { clearInterval(slideInterval); };
    window.resumeSlide = function() { startSlideShow(); };

    function startSlideShow() { 
        if(slides.length > 0) slideInterval = setInterval(() => window.changeSlide(1), 5000); 
    }
    
    startSlideShow(); 

    /* --- 5. MODAL DA HISTÓRIA --- */
    const modal = document.getElementById('story-modal');
    const chapterTextEl = document.getElementById('chapter-text');
    let currentChapter = 0;
    let typewriterTimeout;

    window.openStoryModal = function() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        loadChapter(0);
    };
    window.closeStoryModal = function() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        clearTimeout(typewriterTimeout);
    };

    function typeWriter(text, i) {
        if (i < text.length) {
            chapterTextEl.innerHTML += text.charAt(i);
            typewriterTimeout = setTimeout(() => typeWriter(text, i + 1), 20); 
        }
    }

    window.loadChapter = function(index) {
        clearTimeout(typewriterTimeout);
        currentChapter = index;
        const chap = chapters[index];
        
        const titleEl = document.getElementById('chapter-title');
        const dateEl = document.getElementById('chapter-date');
        
        if(titleEl) titleEl.innerText = chap.title;
        if(dateEl) dateEl.innerText = chap.date;
        if(chapterTextEl) chapterTextEl.innerHTML = ""; 
        
        document.querySelectorAll('.chapter-list li').forEach((li, idx) => {
            li.classList.toggle('active', idx === index);
        });

        const prevBtn = document.getElementById('btn-prev-chap');
        const nextBtn = document.getElementById('btn-next-chap');
        if(prevBtn) prevBtn.disabled = index === 0;
        if(nextBtn) nextBtn.innerText = index === chapters.length - 1 ? "Fechar" : "Próximo";

        typeWriter(chap.text, 0);
    };

    window.nextChapter = function() {
        if (currentChapter < chapters.length - 1) loadChapter(currentChapter + 1);
        else closeStoryModal();
    };
    window.prevChapter = function() {
        if (currentChapter > 0) loadChapter(currentChapter - 1);
    };

    /* --- 6. LIGHTBOX --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    window.openLightbox = function(index) {
        if(!lightbox || !lightboxImg) return;
        lightbox.style.display = 'flex';
        const img = slides[index].querySelector('img');
        if(img) lightboxImg.src = img.src;
    };
    window.closeLightbox = function(e) {
        if (!e || e.target === lightbox || e.target.classList.contains('close-lightbox')) {
            if(lightbox) lightbox.style.display = 'none';
        }
    };

    /* --- 7. PARTÍCULAS (Canvas) --- */
    const canvas = document.getElementById('heroCanvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 6 + 3; // Um pouco maiores
                this.speedX = Math.random() * 0.8 - 0.4;
                this.speedY = Math.random() * 0.8 - 0.4;
                this.color = Math.random() > 0.5 ? 'rgba(255, 122, 160, 0.3)' : 'rgba(255, 255, 255, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                // Forma de coração simplificada (2 círculos + triângulo ou apenas círculo)
                // Usando círculo para performance e leveza
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Aumentar densidade
            const baseCount = Math.round(window.innerWidth / 80); 
            const count = window.innerWidth < 720 ? Math.max(10, Math.floor(baseCount / 2)) : Math.max(30, baseCount);
            
            for (let i = 0; i < count; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    /* --- UTILITÁRIOS --- */
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") { closeStoryModal(); closeLightbox(); }
    });
    window.onclick = (e) => {
        if (e.target == modal) closeStoryModal();
    };

});