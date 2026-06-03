// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== ANIMAÇÃO SCROLL (FADE IN) =====
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ===== BARRAS DE PROGRESSO =====
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== SIMULAÇÃO DO DASHBOARD =====
const btnSimular = document.getElementById('btnSimular');
const areaValor = document.getElementById('areaValor');
const produtorValor = document.getElementById('produtorValor');
const co2Valor = document.getElementById('co2Valor');
const agroValor = document.getElementById('agroValor');

let simulando = false;

// Dados da simulação ano a ano
const dadosSimulacao = [
    { ano: 1, area: 50,  produtores: 12, co2: 15,  agro: 10 },
    { ano: 2, area: 200, produtores: 35, co2: 80,  agro: 30 },
    { ano: 3, area: 500, produtores: 68, co2: 250, agro: 60 },
    { ano: 4, area: 800, produtores: 95, co2: 500, agro: 75 },
    { ano: 5, area: 1200, produtores: 130, co2: 900, agro: 85 },
];

let etapaAtual = 0;

btnSimular.addEventListener('click', () => {
    if (simulando) return;
    simulando = true;
    etapaAtual = 0;
    btnSimular.textContent = '⏳ Simulando...';
    btnSimular.style.background = '#ccc';
    animarEtapa();
});

function animarEtapa() {
    if (etapaAtual >= dadosSimulacao.length) {
        btnSimular.textContent = '✅ Simulação Completa';
        btnSimular.style.background = '#4caf50';
        btnSimular.style.color = 'white';
        simulando = false;
        return;
    }

    const dados = dadosSimulacao[etapaAtual];

    // Anima contagem dos valores
    animarContador(areaValor, dados.area, ' ha');
    animarContador(produtorValor, dados.produtores, '');
    animarContador(co2Valor, dados.co2, ' t');
    animarContador(agroValor, dados.agro, '%');

    etapaAtual++;
    setTimeout(animarEtapa, 1500);
}

function animarContador(elemento, valorFinal, sufixo) {
    let valorAtual = 0;
    const duracao = 800;
    const intervalos = 30;
    const incremento = valorFinal / intervalos;
    const tempoIntervalo = duracao / intervalos;

    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.round(valorAtual) + sufixo;
    }, tempoIntervalo);
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(27, 63, 30, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(27, 63, 30, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== EFEITO HOVER NOS CARDS =====
document.querySelectorAll('.card, .tech-card, .impact-col').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    });
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});

// ===== TOOLTIP NOS INDICADORES =====
document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('click', function() {
        const label = this.querySelector('.metric-header h3').textContent;
        const valor = this.querySelector('.metric-value').textContent;
        console.log(`📊 Indicador: ${label} | Meta: ${valor}`);
    });
});

console.log('🌾 Agro Forte, Futuro Sustentável — Projeto carregado com sucesso!');
