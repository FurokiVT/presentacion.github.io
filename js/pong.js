// Pong Game Logic (Se mejorará la velocidad, controles y tamaño)
let canvas, ctx, ball, paddle1, paddle2;
let ballSpeedX = 5, ballSpeedY = 3;
let paddleSpeed = 15;

window.onload = function() {
    canvas = document.createElement('canvas');
    document.getElementById('gameContainer').appendChild(canvas);
    canvas.width = 600;
    canvas.height = 400;
    ctx = canvas.getContext('2d');

    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        color: 'white',
        speedX: ballSpeedX,
        speedY: ballSpeedY
    };

    paddle1 = {
        x: 20,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        color: 'white',
        up: false,
        down: false
    };

    paddle2 = {
        x: canvas.width - 30,
        y: canvas.height / 2 - 40,
        width: 10,
        height: 80,
        color: 'white',
        up: false,
        down: false
    };

    // Añadir eventos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'w') paddle1.up = true;
        if (e.key === 's') paddle1.down = true;
        if (e.key === 'ArrowUp') paddle2.up = true;
        if (e.key === 'ArrowDown') paddle2.down = true;
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'w') paddle1.up = false;
        if (e.key === 's') paddle1.down = false;
        if (e.key === 'ArrowUp') paddle2.up = false;
        if (e.key === 'ArrowDown') paddle2.down = false;
    });

    // Iniciar el juego
    requestAnimationFrame(gameLoop);
};

function gameLoop() {
    moveBall();
    movePaddles();
    checkCollisions();
    draw();
    requestAnimationFrame(gameLoop);
}

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        resetBall();
    }
}

function movePaddles() {
    if (paddle1.up && paddle1.y > 0) paddle1.y -= paddleSpeed;
    if (paddle1.down && paddle1.y < canvas.height - paddle1.height) paddle1.y += paddleSpeed;
    if (paddle2.up && paddle2.y > 0) paddle2.y -= paddleSpeed;
    if (paddle2.down && paddle2.y < canvas.height - paddle2.height) paddle2.y += paddleSpeed;
}

function checkCollisions() {
    if (ball.x - ball.radius <= paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
        ball.speedX = -ball.speedX;
    }

    if (ball.x + ball.radius >= paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.speedX = -ball.speedX;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = paddle1.color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2.color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = ballSpeedX;
    ball.speedY = ballSpeedY;
}
