// Função para alternar entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '🌞' : '🌓';
    themeToggle.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    
    // Salvar preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Função para scroll suave ao clicar nos links do menu
function initSmoothScroll() {
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function(evento) {
            const alvoId = this.getAttribute('href');
            
            if (alvoId !== '#' && alvoId !== '') {
                const elementoAlvo = document.querySelector(alvoId);
                
                if (elementoAlvo) {
                    evento.preventDefault();
                    elementoAlvo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    if (history.pushState) {
                        history.pushState(null, null, alvoId);
                    } else {
                        location.hash = alvoId;
                    }
                }
            }
        });
    });
}

// Efeito de destaque no menu ao scrollar
function initMenuHighlight() {
    const secoes = document.querySelectorAll('section[id]');
    const linksMenu = document.querySelectorAll('nav a[href^="#"]');
    
    function updateActiveMenu() {
        let secaoAtual = '';
        const scrollPos = window.scrollY + 100;
        
        secoes.forEach(secao => {
            const secaoTop = secao.offsetTop;
            const secaoBottom = secaoTop + secao.offsetHeight;
            
            if (scrollPos >= secaoTop && scrollPos < secaoBottom) {
                secaoAtual = '#' + secao.id;
            }
        });
        
        linksMenu.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === secaoAtual) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveMenu);
}

// Efeito de redução do header no scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
}

// Carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '🌞';
        themeToggle.setAttribute('aria-label', 'Alternar para tema claro');
    } else {
        themeToggle.textContent = '🌓';
        themeToggle.setAttribute('aria-label', 'Alternar para tema escuro');
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initMenuHighlight();
    initHeaderScroll();
    loadSavedTheme();
    
    // Adicionar evento ao botão de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});