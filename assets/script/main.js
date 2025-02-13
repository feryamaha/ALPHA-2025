// Seleciona os elementos
const menuToggle = document.getElementById('menu-toggle');
const menuHeader = document.getElementById('menu-header');
const btnPrimary = document.getElementById('bt-primary');

// Adiciona evento de clique no botão de toggle
menuToggle.addEventListener('click', () => {
    // Alterna a classe 'active' no menu de navegação
    menuHeader.classList.toggle('active');

    // Alterna a classe 'active' no botão "Solicitar orçamento"
    btnPrimary.classList.toggle('active');

    // Alterna a classe 'active' no botão de toggle (para mudar o ícone, se necessário)
    menuToggle.classList.toggle('active');
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




