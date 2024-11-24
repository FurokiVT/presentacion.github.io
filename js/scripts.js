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
