var canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = -1;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var particles = [];
var mouse = {};
var symbols = ['<', '>', '||', '[', ']', '{', '}', ';', ':', '=', '+', '-', '*', '/', '%', '&', '|', '^', '~', '`', '!', '@', '#', '$', '?', '.', ','];
var color = 'rgba(0, 255, 255, 0.5)'; // Aqua color with 50% transparency

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 1; // Extend only up to 85vh
    for (var i = 0; i < 1000; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 1 - 0.5,
            vy: Math.random() * 1 - 0.5,
            sym: symbols[Math.floor(Math.random() * symbols.length)],
            z: Math.random() * 10
        });
    }
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.85; // Extend only up to 85vh
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.sort(function(a, b) {
        return b.z - a.z;
    });
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.font = 'bold ' + (p.z + 5) + 'px Courier New';
        ctx.fillStyle = color;
        ctx.globalAlpha = p.z / 10;
        ctx.fillText(p.sym, p.x, p.y);
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height * 0.99) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height * 0.99;
        }
        if (Math.abs(mouse.x - p.x) < 50 && Math.abs(mouse.y - p.y) < 50) {
            p.vx = (mouse.x - p.x) * 0.02;
            p.vy = (mouse.y - p.y) * 0.02;
        }
    }
    requestAnimationFrame(draw);
}

init();
draw();

