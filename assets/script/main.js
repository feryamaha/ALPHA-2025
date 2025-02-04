document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Adiciona ou remove a classe 'active' ao menu de navegação ao clicar no toggle
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Adiciona evento de redimensionamento para garantir que, em telas maiores que 1024px, o menu não seja ativo
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) {
            navMenu.classList.remove('active');
        }
    });

    // Verifica se a largura atual é menor ou igual a 1024px ao carregar a página
    if (window.innerWidth <= 1024) {
        navMenu.classList.remove('active'); // Garante que o menu comece fechado em modo mobile
    }
});