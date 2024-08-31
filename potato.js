const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let trexX = 50;
let trexY = 150;
let trexSpeed = 5;
let obstacleX = 400;
let obstacleY = 150;
let obstacleSpeed = 5;
let jump = false;
let gravity = 0.5;

// Game loop
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw T-Rex
    ctx.fillStyle = 'blue';
    ctx.fillRect(trexX, trexY, 20, 20);

    // Draw obstacle
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacleX, obstacleY, 20, 20);

    // Update T-Rex position
    if (jump) {
        trexY -= trexSpeed;
        trexSpeed -= gravity;
        if (trexY >= 150) {
            trexY = 150;
            jump = false;
        }
    }

    // Update obstacle position
    obstacleX -= obstacleSpeed;
    if (obstacleX < 0) {
        obstacleX = 400;
    }

    // Check collision
    if (checkCollision()) {
        alert(`Game Over! Score: ${score}`);
        location.reload();
    }

    // Update score
    score++;
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);

    // Request next frame
    requestAnimationFrame(update);
}

// Check collision between T-Rex and obstacle
function checkCollision() {
    if (trexX + 20 > obstacleX && trexX < obstacleX + 20 && trexY + 20 > obstacleY && trexY < obstacleY + 20) {
        return true;
    }
    return false;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        jump = true;
        trexSpeed = 5;
    }
});

// Start game loop
update();