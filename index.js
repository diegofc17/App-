const destinationContent = document.getElementById('destination-content');
const form = document.getElementById('basic-data-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const celularInput = document.getElementById('celular');
const confirmar_destinoInput = document.getElementById('confirmar_destino');
const fechaInput = document.getElementById('fecha');
const destinations = {
    colombia: ['Cartagena', 'Barichara'],
    brazil: ['Selva', 'Rio de Janeiro'],
    londres: ['Paris', 'Catacumbas'],
};

function showDestinationContent(destination) {
    const options = destinations[destination];
    let content = `<h2>${destination.toUpperCase()}</h2>`;
    options.forEach((option) => {
        content += `<button class="option-button" data-destination="${option}">${option}</button>`;
    });
    destinationContent.innerHTML = content;
}

function showForm(destination) {
    form.hidden = false;
    nameInput.value = '';
    emailInput.value = '';
    form.dataset.destination = destination;
    loadFormData();
}

function loadFormData() {
    nameInput.value = localStorage.getItem('name') || '';
    emailInput.value = localStorage.getItem('email') || '';
    celularInput.value = localStorage.getItem('celular') || '';
    confirmar_destinoInput.value = localStorage.getItem('confirmar_destino') || '';
    fechaInput.value = localStorage.getItem('fecha') || '';
}

function saveFormData() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('celular', celularInput.value);
    localStorage.setItem('confirmar_destino', confirmar_destinoInput.value);
    localStorage.setItem('fecha', fechaInput.value);
    localStorage.setItem('destination', form.dataset.destination);
}

function resetFormData() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('celular');
    localStorage.removeItem('confirmar_destino');
    localStorage.removeItem('fecha');
    localStorage.removeItem('destination');
}

document.getElementById('colombia').addEventListener('click', () => {
    showDestinationContent('colombia');
});

document.getElementById('brazil').addEventListener('click', () => {
    showDestinationContent('brazil');
});

document.getElementById('londres').addEventListener('click', () => {
    showDestinationContent('londres');
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-button')) {
        showForm(e.target.dataset.destination);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveFormData();
    const name = nameInput.value;
    const email = emailInput.value;
    const celular = celularInput.value;
    const confirmar_destino = confirmar_destinoInput.value;
    const fecha = fechaInput.value;
    const destination = form.dataset.destination;
    console.log(`Name: ${name}, Email: ${email}, Destination: ${destination}, confirmar_destino: ${confirmar_destino}, celular: ${celular}, fecha: ${fecha}`);
});

const consultButton = document.getElementById('consult-button');
consultButton.addEventListener('click', () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const destination = form.dataset.destination;
    const cancelForm = confirm(`Name: ${name}, Email: ${email}, Destination: ${destination}. Esta consulta es su destino?`);
    if (cancelForm) {
        resetFormData();
        showDestinationContent(destination);
    }
});