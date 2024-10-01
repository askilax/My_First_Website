const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Charger les images pour les deux directions
const playerImgRight = new Image();
playerImgRight.src = '../assets/images/player-right.png';  // Image du joueur face droite

const playerImgLeft = new Image();
playerImgLeft.src = '../assets/images/player-left.png';  // Image du joueur face gauche

let playerImg = playerImgRight; //le joueur regarde vers la droite

const zombieImg = new Image();
zombieImg.src = '../assets/images/zombie.png';

// Paramètres du joueur
const player = {
    x: 50,  // Le joueur commence à gauche
    y: canvas.height / 2 - 20,
    width: 90,
    height: 90,
    speed: 5,
    dx: 0,
    dy: 0,
    alive: true  // État de vie du joueur
};

// Tableau pour stocker les zombies
const zombies = [];
const bullets = [];
let score = 0;  // Nombre de zombies tués
let zombiesPassed = 0;  // Nombre de zombies ayant traversé l'écran

// Dessiner le joueur avec l'image correspondante (droite ou gauche)
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Déplacer le joueur dans toutes les directions
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Empêcher le joueur de sortir de l'écran
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// Ajouter un zombie qui se déplace de droite à gauche
function spawnZombie() {
    const zombie = {
        x: canvas.width,  // Zombies apparaissent à droite
        y: Math.random() * (canvas.height - 40),  // Position aléatoire en hauteur
        width: 90,
        height: 90,
        speed: 2
    }; 
    zombies.push(zombie);
}

// Dessiner les zombies et les déplacer de droite à gauche
function drawZombies() {
    zombies.forEach((zombie, index) => {
        ctx.drawImage(zombieImg, zombie.x, zombie.y, zombie.width, zombie.height);
        zombie.x -= zombie.speed;  // Déplacer les zombies vers la gauche

        // Vérifier si un zombie touche le joueur
        if (zombie.x < player.x + player.width &&
            zombie.x + zombie.width > player.x &&
            zombie.y < player.y + player.height &&
            zombie.y + zombie.height > player.y) {
            player.alive = false;  // Le joueur est touché
        }

        // Vérifier si un zombie est passé derrière l'écran
        if (zombie.x + zombie.width < 0) {
            zombies.splice(index, 1);
            zombiesPassed++;  // Incrémenter le nombre de zombies ayant passé l'écran
        }
    });
}

// Tirer des projectiles vers la droite
function shoot() {
    const bullet = {
        x: player.x + player.width,
        y: player.y + player.height / 2 - 5,
        width: 20,
        height: 10,
        color: 'red',
        speed: 7
    };
    bullets.push(bullet);
}

// Dessiner les projectiles et les déplacer vers la droite
function drawBullets() {
    bullets.forEach((bullet, index) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.x += bullet.speed;  // Déplacer les balles vers la droite

        // Supprimer les balles hors écran
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

// Détecter les collisions entre les balles et les zombies
function detectCollisions() {
    bullets.forEach((bullet, bIndex) => {
        zombies.forEach((zombie, zIndex) => {
            if (
                bullet.x < zombie.x + zombie.width &&
                bullet.x + bullet.width > zombie.x &&
                bullet.y < zombie.y + zombie.height &&
                bullet.height + bullet.y > zombie.y
            ) {
                // Supprimer la balle et le zombie en cas de collision
                bullets.splice(bIndex, 1);
                zombies.splice(zIndex, 1);
                score++;  // Incrémenter le score
            }
        });
    });
}

// Afficher le score et les zombies passés
function displayScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Zombies tués: ' + score, 10, 20);
    ctx.fillText('Zombies passés: ' + zombiesPassed, 10, 40);
}

// Vérifier si le jeu est terminé
function checkGameOver() {
    if (!player.alive) {
        alert('Game Over');
        return true;
    }
    return false;
}

// Mise à jour de l'état du jeu
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!checkGameOver()) {
        drawPlayer();
        movePlayer();
        drawZombies();
        drawBullets();
        detectCollisions();
        displayScore();
    }
}

// Boucle de jeu
function gameLoop() {
    if (player.alive) {
          update();
        requestAnimationFrame(gameLoop);
    }
}

// Contrôles du joueur pour se déplacer dans toutes les directions et changer la direction de l'image
// Empêcher le défilement de la page avec les touches fléchées
document.addEventListener('keydown', function(event) {
    // Vérifier si la touche pressée est une flèche directionnelle
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();  // Empêche l'action par défaut (défilement)
    }

    // Déplacements et changement d'image selon la direction
    if (event.key === 'ArrowDown') {
        player.dy = player.speed;
    } else if (event.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (event.key === 'ArrowRight') {
        player.dx = player.speed;
        playerImg = playerImgRight;  // Changer l'image du joueur vers la droite
    } else if (event.key === 'ArrowLeft') {
        player.dx = -player.speed;
        playerImg = playerImgLeft;  // Changer l'image du joueur vers la gauche
    } else if (event.key === ' ') {
        shoot();
    }
});


document.addEventListener('keyup', () => {
    player.dy = 0;
    player.dx = 0;
});

// Générer des zombies à intervalles réguliers
setInterval(spawnZombie, 1000);
gameLoop();
