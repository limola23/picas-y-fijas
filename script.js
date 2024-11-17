let clave = generarNumeroClave();
let intentos = 0;
const maxIntentos = 12;

document.getElementById('submit-btn').addEventListener('click', () => {
    const intento = document.getElementById('guess').value;
    if (intento.length !== 4 || new Set(intento).size !== 4 || isNaN(intento)) {
        mostrarFeedback('El número debe tener 4 dígitos únicos.', true);
        return;
    }
    intentos++;
    const { picas, fijas } = calcularPicasYFijas(clave, intento);
    actualizarIntentos();
    if (fijas === 4) {
        mostrarFeedback(`¡Ganaste! La clave era ${clave}.`, false);
        deshabilitarJuego();
    } else if (intentos >= maxIntentos) {
        mostrarFeedback(`Perdiste. La clave era ${clave}.`, true);
        deshabilitarJuego();
    } else {
        mostrarFeedback(`Picas: ${picas}, Fijas: ${fijas}.`, false);
    }
});

function generarNumeroClave() {
    const digitos = Array.from({ length: 10 }, (_, i) => i.toString());
    digitos.sort(() => Math.random() - 0.5);
    return digitos.slice(0, 4).join('');
}

function calcularPicasYFijas(clave, intento) {
    let picas = 0, fijas = 0;
    for (let i = 0; i < 4; i++) {
        if (clave[i] === intento[i]) {
            fijas++;
        } else if (clave.includes(intento[i])) {
            picas++;
        }
    }
    return { picas, fijas };
}

function mostrarFeedback(mensaje, error) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = mensaje;
    feedback.style.color = error ? '#f44336' : '#4caf50';
}

function actualizarIntentos() {
    document.getElementById('attempts').textContent = `Intentos: ${intentos}/${maxIntentos}`;
}

function deshabilitarJuego() {
    document.getElementById('guess').disabled = true;
    document.getElementById('submit-btn').disabled = true;
}