const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function push(direction, index) {
    let zeros = 0;

    if (direction <= 1) {
        let row = grid[index].filter(num => num !== 0);
        zeros = 4 - row.length;

        for (let _ = 0; _ < zeros; _++) {
            if (direction === 0) {
                row.push(0);
            } else {
                row.unshift(0); 
            }
        }
        grid[index] = row;
    } else {
        let vertical = [];
        for (let j = 0; j < 4; j++) {
            vertical.push(grid[j][index]); 
        }

        vertical = vertical.filter(num => num !== 0); 
        zeros = 4 - vertical.length;

        for (let _ = 0; _ < zeros; _++) {
            if (direction === 2) {
                vertical.push(0); 
            } else {
                vertical.unshift(0);
            }
        }

        for (let j = 0; j < 4; j++) {
            grid[j][index] = vertical[j];
        }
    }
}

function left() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            push(0, i);
            if (grid[i][j] === grid[i][j + 1]) {
                grid[i][j] *= 2;
                grid[i][j + 1] = 0;
                score += grid[i][j]/2
            }
        }
        push(0, i);
    }
}

function right() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            push(1, i);
            if (grid[i][j] === grid[i][j - 1]) {
                grid[i][j] *= 2;
                grid[i][j - 1] = 0;
                score += grid[i][j]/2
            }
        }
        push(1, i);
    }
}

function up() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            push(2, i);
            if (grid[j][i] === grid[j + 1][i]) {
                grid[j][i] *= 2;
                grid[j + 1][i] = 0;
                score += grid[i][j]/2
            }
        }
        push(2, i);
    }
}

function down() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            push(3, i);
            if (grid[j][i] === grid[j - 1][i]) {
                grid[j][i] *= 2;
                grid[j - 1][i] = 0;
                score += grid[i][j]/2
            }
        }
        push(3, i);
    }
}

function newTile() {
    const possibleIndexes = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                possibleIndexes.push([i, j]);
            }
        }
    }

    if (possibleIndexes.length > 0) {
        const [x, y] = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
        grid[x][y] = Math.random() < 0.1 ? 4 : 2;
    }
}

function renderGrid() {
    const container = document.getElementById('game-container');
    container.innerHTML = ''; 

    grid.forEach(row => {
        row.forEach(cell => {
            const tile = document.createElement('div');
            tile.className = 'tile'; 

            if (cell === 0) {
                tile.classList.add('tile-empty');
            } else {
                tile.classList.add(`tile-${cell}`); 
                tile.textContent = cell; 
            }

            container.appendChild(tile);
        });
    });
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

let score = 0;

newTile();
renderGrid();

document.addEventListener('keydown', (event) => {
    const prevGrid = JSON.stringify(grid); 
    switch (event.key) {
        case 'ArrowUp':
            up();
            break;
        case 'ArrowLeft':
            left();
            break;
        case 'ArrowDown':
            down();
            break;
        case 'ArrowRight':
            right();
            break;
        default:
            console.log('Invalid key');
            return;
    }

    if (JSON.stringify(grid) !== prevGrid) {
        newTile();       
        updateScore();  
        renderGrid();  
    }
});
