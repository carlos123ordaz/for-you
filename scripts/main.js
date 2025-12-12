let pregunta = [
    {
        letra: '¿',
        visible: false,
        turno: true,
        puesto: ''
    },
    {
        letra: 'Q',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'u',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'r',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 's',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 's',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'r',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'm',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'n',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'o',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'v',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'a',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '?',
        visible: false,
        turno: false,
        puesto: ''
    },
];

let puesto = 0;
let _fin = false;
let _over = false;
let teclado = pregunta.map(x => x.letra).sort(() => Math.random() - 0.5);
teclado = teclado.map(x => ({ letra: x, usado: false }));

// Variables de audio
const audioPlayer = document.getElementById('background-music');
let musicPlaying = false;

// Configurar volumen inicial
audioPlayer.volume = 0.6; // 60% de volumen

function toggleMusic() {
    const musicButton = document.querySelector('.music-control');
    const musicIcon = document.getElementById('music-icon');

    if (!musicPlaying) {
        // Reproducir música
        audioPlayer.play().then(() => {
            musicPlaying = true;
            musicIcon.textContent = '⏸️';
            musicButton.classList.add('playing');

            // Mostrar control de volumen
            document.querySelector('.audio-control').style.display = 'flex';
        }).catch(error => {
            console.error('Error al reproducir audio:', error);
            alert('No se pudo reproducir el audio. Asegúrate de tener el archivo de música en la carpeta ./audio/');
        });
    } else {
        // Pausar música
        audioPlayer.pause();
        musicPlaying = false;
        musicIcon.textContent = '▶️';
        musicButton.classList.remove('playing');
    }
}

function toggleAudio() {
    const icon = document.getElementById('audio-icon');

    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        icon.textContent = '🔇';
    } else {
        audioPlayer.volume = 0.6;
        icon.textContent = '🔊';
    }
}

// Configuración del canvas de confeti
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];
let animationId = null;

// Clase para las piezas de confeti
class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.color = this.randomColor();
        this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    }

    randomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
            '#F8B739', '#52D273', '#FF85A2', '#5DADE2'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Añadir efecto de gravedad
        this.speedY += 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;

        if (this.shape === 'rect') {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.5);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            confettiPieces.push(new Confetti());
        }, i * 10);
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces = confettiPieces.filter(piece => piece.y < canvas.height + 20);

    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });

    if (confettiPieces.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    }
}

function launchConfetti() {
    confettiPieces = [];
    createConfetti();
    animateConfetti();

    // Cambiar el título
    $('.title').text('¡Felicidades! 🎉').addClass('success');
}

// Ajustar canvas al redimensionar la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function updateTeclado() {
    $('.teclado').html('');
    for (let i = 0; i < teclado.length; i++) {
        t = teclado[i];
        $('.teclado').append(`<span class="tecla ${t.usado ? 'usado' : ''}" onclick="ponerLetra(${i})">${t.usado ? '' : t.letra}</span>`);
    }
}

function mostrarLetras() {
    $('.panel').html('');
    for (let i = 0; i < pregunta.length; i++) {
        const p = pregunta[i];
        $('.panel').append(`<span onclick="soltar(${i})" class="letra ${p.turno ? 'turno' : ''} ${p.visible ? 'visible' : ''} ${_fin ? 'fin' : ''} ${_over ? 'over' : ''}">${p.puesto}</span>`);
    }
}

function soltar(index) {
    const item = pregunta[index];
    if (item.puesto == '') return;
    let tecla = teclado.find(x => x.letra == item.puesto && x.usado);
    tecla.usado = false;
    item.puesto = '';
    pregunta = pregunta.map(x => ({ ...x, turno: false }));
    moverTurno();
    fin();
    mostrarLetras();
    updateTeclado();
}

function moverTurno() {
    let existe = false;
    for (let i = 0; i < pregunta.length; i++) {
        if (pregunta[i].puesto == '') {
            puesto = i;
            pregunta[i].turno = true;
            existe = true;
            break;
        }
    }
    if (!existe) puesto = pregunta.length;
}

function fin() {
    let val = true;
    for (let i = 0; i < pregunta.length; i++) {
        if (pregunta[i].puesto != pregunta[i].letra) {
            val = false;
            break;
        }
    }
    if (val) {
        _fin = true;
        // ¡Lanzar confeti cuando se completa!
        setTimeout(() => {
            launchConfetti();
        }, 300);
    }
    if (puesto == pregunta.length && !val) _over = true;
    else _over = false;
}

function ponerLetra(index) {
    const tecla = teclado[index];
    if (tecla.usado) return;
    tecla.usado = true;
    pregunta[puesto].puesto = tecla.letra;
    pregunta = pregunta.map(x => ({ ...x, turno: false }));
    moverTurno();
    fin();
    mostrarLetras();
    updateTeclado();
}

updateTeclado();
mostrarLetras();