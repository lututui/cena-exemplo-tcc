const c = document.getElementById('c');
const ctx = c.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Color palette
const P_dark = {
    floor1: '#1a1a2e',
    floor2: '#16213e',
    wall: '#0f3460',
    wallTop: '#1a4a7a',
    wallDetail: 'rgba(255,255,255,0.03)',
    desk: '#2d4a7a',
    deskTop: '#3a6090',
    deskLegs: '#1a3050',
    plant: '#1a5a2a',
    plantLeaf: '#2d8a3a',
    window: '#4a90d9',
    windowGlow: '#7ab8f5',
    carpet: '#1a2a4a',
    carpetAccent: '#2a3a6a',
    screen: '#0a1a3a',
    screenOn: '#4dff91',
    npcSkin: '#f4c284',
    npcHair: '#3d2b1f',
    player: '#4a90d9',
    playerDark: '#2a5a8a',
    playerHead: '#e8b87a',
    playerHair: '#2a1a0a',
    playerEyes: '#1a0a0a',
    playerLegs: '#0a1525',
    shadow: 'rgba(0,0,0,0.4)',
    gridLine: 'rgba(255,255,255,0.03)',
    monitorStand: '#1a3050',
    monitor: '#0a1525',
    screenContent1: 'rgba(0,0,0,0.5)',
    screenContent2: '#4dff91',
    screenContent3: '#4a90d9',
    keyboard: '#1a2a40',
    eyeColor: '#2a1a0a',
    legsColor: '#1a2a4a',
    speechBubble1: 'rgba(8,8,18,0.9)',
    speechBubble2: '#4a90d9',
    speechBubble3: '#ff4d4d',
    speechBubble4: '#fff',
};

const P_light = {
    floor1: '#e8e8f0',
    floor2: '#dcdce8',
    wall: '#c8d4e8',
    wallTop: '#b0c0d8',
    wallDetail: 'rgba(0,0,0,0.04)',
    desk: '#8aa8cc',
    deskTop: '#6a8ab0',
    deskLegs: '#5a7898',
    plant: '#5a9a4a',
    plantLeaf: '#4aaa5a',
    window: '#5aa0e0',
    windowGlow: '#8ac8ff',
    carpet: '#ccd4e8',
    carpetAccent: '#b8c4dc',
    screen: '#d0e0f0',
    screenOn: '#29c476',
    npcSkin: '#c8843a',
    npcHair: '#3d2b1f',
    player: '#2a6aaa',
    playerDark: '#1a4a7a',
    playerHead: '#c09050',
    playerHair: '#2a1a0a',
    playerEyes: '#1a0a0a',
    playerLegs: '#1a2a4a',
    shadow: 'rgba(0,0,0,0.15)',
    gridLine: 'rgba(0,0,0,0.04)',
    monitorStand: '#5a7898',
    monitor: '#2a4060',
    screenContent1: 'rgba(0,0,0,0.2)',
    screenContent2: '#006633',
    screenContent3: '#2a6aaa',
    keyboard: '#6a8ab0',
    eyeColor: '#2a1a0a',
    legsColor: '#3a4a6a',
    speechBubble1: 'rgba(240,245,255,0.95)',
    speechBubble2: '#2a6aaa',
    speechBubble3: '#cc2a2a',
    speechBubble4: '#1a1a2a',
};

const isDark = false;

document.body.classList.toggle('theme-dark', isDark);
document.body.classList.toggle('theme-light', !isDark);

P = isDark ? P_dark : P_light;

const W = 640;
const H = 360;
const tamanhoGrid = 16;

function drawCheckerFloor() {
    for (let y = 80; y < H - 40; y += tamanhoGrid) {
        for (let x = 0; x < W; x += tamanhoGrid) {
            const even = ((x / tamanhoGrid + y / tamanhoGrid) % 2 === 0);
            ctx.fillStyle = even ? P.floor1 : P.floor2;
            ctx.fillRect(x, y, tamanhoGrid, tamanhoGrid);
        }
    }
}

function drawWall() {
    // Back wall
    ctx.fillStyle = P.wall;
    ctx.fillRect(0, 0, W, 88);

    // Wall base strip
    ctx.fillStyle = P.wallTop;
    ctx.fillRect(0, 76, W, 12);
    ctx.fillStyle = P.wall;
    ctx.fillRect(0, 80, W, 8);

    // Wall brick pattern
    ctx.fillStyle = P.wallDetail;
    for (let x = 0; x < W; x += 48) {
        for (let y = 0; y < 76; y += tamanhoGrid) {
            const offset = (y / tamanhoGrid % 2) * 24;
            ctx.fillRect(x + offset, y, 46, 14);
        }
    }
}

function drawDesk(x, y) {
    // Desk body
    ctx.fillStyle = P.desk;
    ctx.fillRect(x, y + 8, 80, 24);
    ctx.fillStyle = P.deskTop;
    ctx.fillRect(x, y, 80, 10);

    // Desk legs
    ctx.fillStyle = P.deskLegs;
    ctx.fillRect(x + 4, y + 30, 8, 12);
    ctx.fillRect(x + 68, y + 30, 8, 12);

    // Monitor stand
    ctx.fillStyle = P.monitorStand;
    ctx.fillRect(x + 30, y - 18, 4, 20);
    ctx.fillRect(x + 22, y - 2, 20, 4);

    // Monitor
    ctx.fillStyle = P.monitor;
    ctx.fillRect(x + 14, y - 38, 36, 22);
    ctx.fillStyle = P.screenOn;
    ctx.fillRect(x + 16, y - 36, 32, 18);

    // Screen content
    ctx.fillStyle = P.screenContent1;
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 === 0 ? P.screenContent2 : P.screenContent3;
        ctx.fillRect(x + 18, y - 34 + i * 4, 10, 2);
    }

    // Keyboard
    ctx.fillStyle = P.keyboard;
    ctx.fillRect(x + 20, y + 2, 30, 6);
}

function drawNPC(x, y, color, hairColor, isActive) {
    // Body
    ctx.fillStyle = color;
    ctx.fillRect(x - 6, y + 8, 12, 14);

    // Head
    ctx.fillStyle = P.npcSkin;
    ctx.fillRect(x - 5, y, 10, 10);

    // Hair
    ctx.fillStyle = hairColor;
    ctx.fillRect(x - 5, y - 2, 10, 4);
    ctx.fillRect(x - 6, y, 2, 6);

    // Eyes
    ctx.fillStyle = P.eyeColor;
    ctx.fillRect(x - 2, y + 3, 2, 2);
    ctx.fillRect(x + 1, y + 3, 2, 2);

    // Legs
    ctx.fillStyle = P.legsColor;
    ctx.fillRect(x - 4, y + 22, 4, 8);
    ctx.fillRect(x + 1, y + 22, 4, 8);

    if (isActive) {
        // Speech bubble
        ctx.fillStyle = P.speechBubble1;
        ctx.fillRect(x + 8, y - 20, 30, 14);

        ctx.strokeStyle = P.speechBubble2;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 8, y - 20, 30, 14);

        ctx.fillStyle = P.speechBubble3;
        ctx.fillRect(x + 11, y - 17, 4, 4);

        ctx.fillStyle = P.speechBubble4;
        ctx.font = '6px monospace';
        ctx.fillText('!LOREM', x + 10, y - 10);
    }
}

function drawPlayer(x, y) {
    // Body (hoodie style)
    ctx.fillStyle = P.player;
    ctx.fillRect(x - 7, y + 8, 14, 16);

    ctx.fillStyle = P.playerDark;
    ctx.fillRect(x - 7, y + 8, 14, 4);

    // Head
    ctx.fillStyle = P.playerHead;
    ctx.fillRect(x - 5, y, 10, 11);

    // Hair
    ctx.fillStyle = P.playerHair;
    ctx.fillRect(x - 5, y - 2, 10, 4);
    ctx.fillRect(x + 4, y, 2, 5);

    // Eyes
    ctx.fillStyle = P.playerEyes;
    ctx.fillRect(x - 2, y + 3, 2, 2);
    ctx.fillRect(x + 1, y + 3, 2, 2);

    // Legs
    ctx.fillStyle = P.playerLegs;
    ctx.fillRect(x - 5, y + 24, 5, 9);
    ctx.fillRect(x + 1, y + 24, 5, 9);

    // Shoes
    ctx.fillStyle = P.player;
    ctx.fillRect(x - 6, y + 31, 6, 4);
    ctx.fillRect(x + 1, y + 31, 6, 4);
}

function drawDialogAvatar() {
    // Draw NPC avatar for dialog
    const avCtx = document.getElementById('avatar').getContext('2d');
    avCtx.imageSmoothingEnabled = false;
    avCtx.fillStyle = '#1a2a4a';
    avCtx.fillRect(0, 0, 32, 32);
    avCtx.fillStyle = '#e8b07a';
    avCtx.fillRect(10, 8, 12, 12);
    avCtx.fillStyle = '#1a0a0a';
    avCtx.fillRect(10, 6, 12, 4);
    avCtx.fillStyle = '#c43a3a';
    avCtx.fillRect(8, 18, 16, 10);
    avCtx.fillStyle = '#1a0a0a';
    avCtx.fillRect(12, 12, 3, 3);
    avCtx.fillRect(17, 12, 3, 3);
}

function render() {
    ctx.clearRect(0, 0, W, H);
    drawWall();
    drawCheckerFloor();

    // Desks (back row)
    drawDesk(50, 140);
    drawDesk(170, 130);
    drawDesk(310, 120);
    drawDesk(460, 130);

    // Desks (front row)
    drawDesk(100, 220);
    drawDesk(380, 215);

    // NPCs
    drawNPC(110, 160, '#c43a3a', '#1a0a0a', true);
    drawNPC(230, 148, '#3a7a3a', '#4a3a20', false);
    drawNPC(490, 155, '#7a3ac4', '#1a1a2a', false);

    // Player
    drawPlayer(310, 200);

    requestAnimationFrame(render);
}

drawDialogAvatar();

render();