document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const btnPrimary = document.getElementById('bt-primary');
    const headerContainer = document.querySelector('header .container'); // Para devolver o botão

    menuToggle.addEventListener('click', function () {
        const target = document.getElementById(this.getAttribute('data-toggle-target'));
        target.classList.toggle('show');

        if (navMenu.classList.contains('show')) {
            // Mover o botão para dentro do menu quando o menu está aberto
            navMenu.appendChild(btnPrimary);
        } else {
            // Devolver o botão para o container do header quando o menu é fechado
            headerContainer.appendChild(btnPrimary);
        }
    });

    document.addEventListener('click', function (event) {
        const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target) || btnPrimary.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            // Devolver o botão para o container do header quando o menu é fechado
            headerContainer.appendChild(btnPrimary);
        }
    });
});

///////////////////////  SCROLLER ////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o container onde o scroll irá acontecer
    const brandingContent = document.querySelector('.branding-content');

    // Velocidade do scroll, controla quão rápido o conteúdo se move 
    const scrollSpeed = 0.5; // Menor valor significa movimento mais lento
    let scrollAmount = 0; // Inicia o scroll no início do conteúdo

    // Calcula a largura total do conteúdo original
    const totalContentWidth = Array.from(brandingContent.children).reduce((sum, child) => sum + child.offsetWidth, 0);

    // Determina quantos clones são necessários para preencher a viewport sem repetição visível imediata
    const clonesNeeded = Math.ceil(window.innerWidth / totalContentWidth);

    // Clona o conteúdo para criar um loop contínuo
    for (let i = 0; i < clonesNeeded; i++) {
        const clone = brandingContent.cloneNode(true);
        clone.childNodes.forEach(child => brandingContent.appendChild(child.cloneNode(true)));
    }

    // Função para mover o conteúdo continuamente
    function scrollContinuously() {
        // Move o conteúdo para a esquerda, diminuindo scrollAmount
        scrollAmount -= scrollSpeed;
        // Aplica a transformação para mover o conteúdo
        brandingContent.style.transform = `translateX(${scrollAmount}px)`;

        // Quando o scrollAmount chega ao fim do conteúdo original, reinicia
        if (Math.abs(scrollAmount) >= totalContentWidth) {
            scrollAmount = 0;
        }

        // Solicita ao navegador para chamar esta função novamente antes do próximo repaint
        requestAnimationFrame(scrollContinuously);
    }

    // Inicia o scroll
    scrollContinuously();
});

/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.s-hero-services');
    const infoBlocks = document.querySelectorAll('.info-block');
    const sliderImg = document.getElementById('slider-vertical');
    const viewportHeight = window.innerHeight;

    // Função para checar a posição do scroll
    function checkScroll() {
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        let currentIndex = -1; // Começa com -1 para indicar que nenhum bloco foi revelado ainda

        infoBlocks.forEach((block, index) => {
            const blockTop = block.offsetTop + sectionTop;
            const blockBottom = blockTop + block.offsetHeight;
            const blockCenter = blockTop + (block.offsetHeight / 2); // Centro do bloco

            // Verifica se o centro do bloco está acima do meio da viewport
            if (blockCenter > scrollPosition && blockCenter < (scrollPosition + (viewportHeight / 2))) {
                currentIndex = index;
            }
        });

        // Atualiza a visibilidade dos blocos baseado no índice atual
        infoBlocks.forEach((block, index) => {
            if (index <= currentIndex) {
                block.classList.add('reveal');
            } else {
                block.classList.remove('reveal');
            }
        });

        // Atualiza a imagem do slider
        updateSliderImage(currentIndex);
    }

    // Função para atualizar a imagem do slider
    function updateSliderImage(index) {
        // Se nenhum bloco foi revelado, usa a imagem inicial
        if (index === -1) {
            sliderImg.src = './assets/imgs/slider-services-step-0.svg';
        } else {
            sliderImg.src = `./assets/imgs/slider-services-step-${index + 1}.svg`;
        }
    }

    // Adicionar listener de scroll
    window.addEventListener('scroll', checkScroll);

    // Chamada inicial para garantir que a função seja executada uma vez ao carregar a página
    checkScroll();
});