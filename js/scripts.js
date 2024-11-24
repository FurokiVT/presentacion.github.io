window.onload = function() {
    const modal = document.getElementById('modal');
    const audio = document.getElementById('musica');
    audio.loop = true;
    audio.pause();
    audio.volume = 0.1;
};


const hoverSound = new Audio('https://furokivt.github.io/presentacion.github.io/Musica/efecto.mp3');
hoverSound.volume = 1.0; 

function cerrarModal() {
    const modal = document.getElementById('modal');
    const audio = document.getElementById('musica');
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    
    modal.classList.add('hidden');
    audio.play();
    videoContainer.style.display = 'block';
    video.play();

    video.onended = function() {
        videoContainer.style.display = 'none';
        audio.play();
    };
}


function abrirMenu() {
    const socialMenu = document.getElementById('socialMenu');
    socialMenu.style.display = 'flex';
}


function cerrarMenu() {
    const socialMenu = document.getElementById('socialMenu');
    socialMenu.style.display = 'none';
}


const socialLinks = document.querySelectorAll('.social-menu a');


socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

function abrirJuegosMenu() {
    const gameMenu = document.getElementById('gameMenu');
    gameMenu.style.display = 'block';
}

function cerrarJuegosMenu() {
    const gameMenu = document.getElementById('gameMenu');
    gameMenu.style.display = 'none';
}

function abrirJuego(juego) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    if (juego === 'pong') {
        cargarPong();
    } else if (juego === 'snake') {
        cargarSnake();
    }

    cerrarJuegosMenu();
}

function cargarPong() {
    const pongScript = document.createElement('script');
    pongScript.src = 'js/pong.js';
    document.getElementById('gameContainer').appendChild(pongScript);
}

function cargarSnake() {
    const snakeScript = document.createElement('script');
    snakeScript.src = 'js/snake.js';
    document.getElementById('gameContainer').appendChild(snakeScript);
}