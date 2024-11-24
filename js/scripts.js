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

function abrirMenuJuegos() {
    const gameMenu = document.getElementById('gameMenu');
    gameMenu.style.display = 'flex';
}

function cerrarMenuJuegos() {
    const gameMenu = document.getElementById('gameMenu');
    gameMenu.style.display = 'none';
}

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
function iniciarPong(mode) {
    const canvas = document.getElementById('pongCanvas');
    const rickroll = document.querySelector('a[href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"]');
    const ctx = canvas.getContext('2d');
    const player1 = { x: 10, y: canvas.height / 2 - 50, width: 10, height: 100, score: 0 };
    const player2 = { x: canvas.width - 20, y: canvas.height / 2 - 50, width: 10, height: 100, score: 0 };
    const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 4, dy: 4 };
    let gameInterval;
    let keys = {};
    if (rickroll) rickroll.style.display = 'none';

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
        ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillText(`P1: ${player1.score}`, 50, 20);
        ctx.fillText(`P2: ${player2.score}`, canvas.width - 100, 20);
    }

    function update() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

        if (
            (ball.x - ball.radius <= player1.x + player1.width &&
                ball.y >= player1.y &&
                ball.y <= player1.y + player1.height) ||
            (ball.x + ball.radius >= player2.x &&
                ball.y >= player2.y &&
                ball.y <= player2.y + player2.height)
        ) {
            ball.dx *= -1;
        }

        if (ball.x < 0) {
            player2.score++;
            resetBall();
        } else if (ball.x > canvas.width) {
            player1.score++;
            resetBall();
        }

        if (keys['w'] && player1.y > 0) player1.y -= 5;
        if (keys['s'] && player1.y < canvas.height - player1.height) player1.y += 5;

        if (mode === '2P') {
            if (keys['ArrowUp'] && player2.y > 0) player2.y -= 5;
            if (keys['ArrowDown'] && player2.y < canvas.height - player2.height) player2.y += 5;
        } else {
            if (ball.y < player2.y + player2.height / 2) player2.y -= 3;
            if (ball.y > player2.y + player2.height / 2) player2.y += 3;
        }
    }

    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }

    document.addEventListener('keydown', (e) => (keys[e.key] = true));
    document.addEventListener('keyup', (e) => (keys[e.key] = false));

    gameInterval = setInterval(() => {
        update();
        draw();
    }, 1000 / 60);
}
canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    let touchY = e.touches[0].clientY;
    if (touchY < player1.y) {
        player1.y = touchY - player1.height / 2;
    } else if (touchY > player1.y + player1.height) {
        player1.y = touchY - player1.height / 2;
    }
});

canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    let touchY = e.touches[0].clientY;
    if (touchY < player1.y) {
        player1.y = touchY - player1.height / 2;
    } else if (touchY > player1.y + player1.height) {
        player1.y = touchY - player1.height / 2;
    }
});

function iniciarSnake() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block'; 
    canvas.focus(); 

    const box = 20; 
    let snake = [{ x: 9 * box, y: 9 * box }]; 
    let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Comida
    let direction = null;
    let score = 0;

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
        const key = event.key;
        if (key === 'w' && direction !== 'DOWN') direction = 'UP';
        else if (key === 's' && direction !== 'UP') direction = 'DOWN';
        else if (key === 'a' && direction !== 'RIGHT') direction = 'LEFT';
        else if (key === 'd' && direction !== 'LEFT') direction = 'RIGHT';
    }

    function collision(head, body) {
        for (let segment of body) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        for (let segment of snake) {
            ctx.fillStyle = 'lime';
            ctx.fillRect(segment.x, segment.y, box, box);
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'UP') snakeY -= box;
        if (direction === 'DOWN') snakeY += box;
        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'RIGHT') snakeX += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box,
            };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY };

        if (
            snakeX < 0 ||
            snakeY < 0 ||
            snakeX >= canvas.width ||
            snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            clearInterval(game);
            alert('Game Over');
            canvas.style.display = 'none';
            return;
        }

        snake.unshift(newHead);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
    }

    const game = setInterval(draw, 100);
}
let touchStartX, touchStartY, direction;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction !== 'LEFT') {
            direction = 'RIGHT';
        } else if (diffX < 0 && direction !== 'RIGHT') {
            direction = 'LEFT';
        }
    } else {
        if (diffY > 0 && direction !== 'UP') {
            direction = 'DOWN';
        } else if (diffY < 0 && direction !== 'DOWN') {
            direction = 'UP';
        }
    }
});
