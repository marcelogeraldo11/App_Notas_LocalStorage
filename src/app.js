// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

const modoOscuroBtn = document.getElementById('modoOscuroBtn');
        const body = document.body;
    
        // Evento para alternar entre modos claro y oscuro
        modoOscuroBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
        });

// Event Listeners
eventListeners();

function eventListeners() {
    // El usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Text area donde el usuario escribe
    const tweetTextArea = document.querySelector('#tweet');
    const tweet = tweetTextArea.value;

    // Validación
    if (tweet.trim() === '') {
        mostrarError('La nota no puede ir vacía');
        return;
    }

    // Añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    tweets = [...tweets, tweetObj];
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.querySelector('#mensaje-error');
    mensajeError.textContent = error;
    mensajeError.style.display = 'block';
    mensajeError.style.opacity = 1;

    setTimeout(() => {
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
        mensajeError.style.opacity = 0;
    }, 3000);
}

// Muestra listado de los tweets
function crearHTML() {
    limpiarHTML();
    listaTweets.innerHTML = '';

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            li.classList.add('mb-2', 'flex', 'justify-between', 'items-center');

            // Agregar el texto del tweet
            const tweetText = document.createElement('span');
            tweetText.classList.add('text-blue-500', 'font-bold', 'text-2xl', 'bg-light');
            tweetText.innerText = tweet.texto;

            // Agregar el ícono de basurero
            const btnEliminar = document.createElement('a');
            btnEliminar.innerHTML = '<i class="fas fa-trash-alt text-red-500"></i>';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Añadir elementos al elemento "li"
            li.appendChild(tweetText);
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agregar a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}