
const users = [
    { "id": 1, "name": "Alejandro Gómez", "email": "alejandro.gomez@example.com" },
    { "id": 2, "name": "María Fernanda López", "email": "maria.lopez@example.com" },
    { "id": 3, "name": "Carlos Andrés Ruiz", "email": "carlos.ruiz@example.com" },
    { "id": 4, "name": "Laura Daniela Martínez", "email": "laura.martinez@example.com" },
    { "id": 5, "name": "Juan Sebastián Torres", "email": "juan.torres@example.com" }
];

const inputId = document.getElementById('input-id');
const btnBuscar = document.getElementById('btn-buscar');
const divResultado = document.getElementById('resultado');

function simularBusquedaServidor(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);
            if (user) {
                resolve(user); 
            } else {
                reject("No se encontró ningún usuario con ese ID."); 
            }
        }, 2000);
    });
}

btnBuscar.addEventListener('click', () => {
    const valorRaw = inputId.value.trim(); 
    const idABuscar = parseInt(valorRaw);

    if (valorRaw === "" || isNaN(idABuscar) || idABuscar <= 0) {
        divResultado.innerHTML = `<p class="mensaje error"> Por favor, ingresa un número de ID válido.</p>`;
        return;
    }

    divResultado.innerHTML = `<p class="mensaje cargando">Consultando servidor... </p>`;
    btnBuscar.disabled = true;

    simularBusquedaServidor(idABuscar)
        .then((usuario) => {
            divResultado.innerHTML = `
                <div class="mensaje exito">
                    <strong> Usuario Encontrado</strong><br>
                    <span>ID: ${usuario.id}</span><br>
                    <span>Nombre: ${usuario.name}</span><br>
                    <span>Email: ${usuario.email}</span>
                </div>
            `;
        })
        .catch((errorMsg) => {
            divResultado.innerHTML = `<p class="mensaje error"> ${errorMsg}</p>`;
        })
        .finally(() => {
            btnBuscar.disabled = false;
        });
});