// Snake Game Logic (Arreglo de la comida, velocidad y contador de puntaje)
let canvas, ctx;
let snake = [{x: 50, y: 50}];
let direction = 'RIGHT';
let food = {x: 100, y: 100};
let score = 0;
let speed = 100;

window.onload = function() {
    canvas = document.createElement('canvas');
    document.getElementById('gameContainer').appendChild(canvas);
    canvas.width = 300;
    canvas.height = 300;
    ctx = canvas.getContext('2d');

    // Añadir eventos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'w' && direction !== 'DOWN') direction = 'UP';
        if (e.key === 's' && direction !== 'UP') direction = 'DOWN';
        if (e.key === 'a' && direction !== 'RIGHT') direction = 'LEFT';
        if (e.key === 'd' && direction !== 'LEFT') direction = 'RIGHT';
    });

    requestAnimationFrame(gameLoop);
};

function gameLoop() {
    moveSnake();
    checkCollisions();
    draw();
    setTimeout(gameLoop, speed);
}

function moveSnake() {
    const head = {...snake[0]};

    if (direction === 'UP') head.y -= 10;
    if (direction === 'DOWN') head.y += 10;
    if (direction === 'LEFT') head.x -= 10;
    if (direction === 'RIGHT') head.x += 10;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function checkCollisions() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert('Game Over');
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over');
            resetGame();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la serpiente
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Dibuja la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Dibuja el puntaje
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Puntaje: ' + score, 10, 20);
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return {x, y};
}

function resetGame() {
    snake = [{x: 50, y: 50}];
    direction = 'RIGHT';
    score = 0;
    food = generateFood();
}
