window.onload = function() {
    const modal = document.getElementById('modal');
    const audio = document.getElementById('musica');
    audio.loop = true;
    audio.pause();
}

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