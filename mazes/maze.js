const SIDE = 0;
const START = 1;
const PATH = 2;
const END = 3;

const W = 65;
const H = 65;
const SCALE = 8;

const canvas = document.getElementById('mazeCanvas');
canvas.width = (W + 2) * SCALE;
canvas.height = (H + 2) * SCALE;
const ctx = canvas.getContext('2d');

function isPossible(field, x, y, val, W, H) {
    if (x < 0 || y < 0 || x >= W || y >= H) {
        return false;
    }
    return (val === 1) ? (field[y * W + x] !== 1) : (field[y * W + x] === 1);
}

function fill(field, ox, oy, nx, ny, W) {
    if (ox !== nx) {
        field[oy * W + ((nx - ox) / 2) + ox] = 1;
    } else {
        field[((ny - oy) / 2 + oy) * W + ox] = 1;
    }
}

function createMaze(field, W, H) {
    const history = new Array(W * H);
    for (let i = 0; i < W * H; i++) {
        history[i] = [0, 0];
    }

    let historySize = 0;
    const pos = [0, 0];

    for (let i = 0; i < W * H; i++) {
        field[i] = 0;
    }

    field[0] = 1;
    history[historySize][0] = 0;
    history[historySize][1] = 0;
    historySize++;

    while (historySize > 0) {
        const possible = [];
        const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];
        
        for (let i = 0; i < 4; i++) {
            const nx = pos[0] + directions[i][0];
            const ny = pos[1] + directions[i][1];
            if (isPossible(field, nx, ny, 1, W, H)) {
                possible.push([nx, ny]);
            }
        }

        if (possible.length === 0) {
            historySize--;
            if (historySize > 0) {
                pos[0] = history[historySize - 1][0];
                pos[1] = history[historySize - 1][1];
            }
            continue;
        }

        const choice = Math.floor(Math.random() * possible.length);
        const nx = possible[choice][0];
        const ny = possible[choice][1];

        field[ny * W + nx] = 1;
        fill(field, pos[0], pos[1], nx, ny, W);

        pos[0] = nx;
        pos[1] = ny;

        history[historySize][0] = pos[0];
        history[historySize][1] = pos[1];
        historySize++;
    }
}

function drawMaze(field, W, H, scale) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < H + 2; y++) {
        for (let x = 0; x < W + 2; x++) {
            let color;
            if (x === 0 || y === 0 || x === W + 1 || y === H + 1) {
                color = "#1a1a1a";
            } else if (x === 1 && y === 1) {
                color = "#FF0000";
            } else if (x === W && y === H) {
                color = "#0088FF";
            } else {
                const val = field[(x - 1) + (y - 1) * W];
                color = val === 0 ? "#1a1a1a" : "#e0e0e0";
            }

            ctx.fillStyle = color;
            ctx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

function generateMaze() {
    const field = new Array(W * H);
    createMaze(field, W, H);
    drawMaze(field, W, H, SCALE);
}

document.getElementById('mazeCanvas').addEventListener('click', generateMaze);
window.onload = generateMaze;
