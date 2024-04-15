
let tbody = document.getElementById("cuerpo");


let canciones = [];
window.onload = obtenerData(); //al cargar la pagina se obtienen los datos

// funcion obtenerData se encarga de estructura de la tabla lista de canciones
async function obtenerData() {
  await axios.get("/obtenerData").then((data) => { //obtiene datos de la db y se almacenan en data
    canciones = data.data; //variable canciones almacena los datos de variable data
    tbody.innerHTML = ""; //inner cambia lo que hay dentro por el string vacio
    canciones.forEach((c, i) => { //array de objetos canciones, c = cancion, i = indice
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.titulo}</td>
          <td>${c.artista}</td>
          <td>${c.tono}</td>
          <td>
            <button class="btn btn-warning" data-index="${i}" data-id="${c.id}">Editar</button>
            <button class="btn btn-danger" data-index="${i}" data-id="${c.id}">Eliminar</button>
          </td>
        </tr>
      `;
      //botones de editar y eliminar dentro de la tabla lista de canciones
    });
  });
  // Limpia los campos de entrada después de obtener los datos
  cancion.value = "";
  artista.value = "";
  tono.value = "";
}
// Agrega un listener a todos los botones de editar dentro de tabla
document.querySelectorAll('.btn-warning').forEach(btn => {
  btn.addEventListener('click', (e) => editarData(btn.dataset.index, btn.dataset.id, e));
});

document.querySelectorAll('.btn-danger').forEach(btn => {
  btn.addEventListener('click', () => eliminarData(btn.dataset.index, btn.dataset.id));
});
// Agrega un listener a todos los botones de registrar dentro de formulario
document.querySelectorAll('.btn-registrar').forEach(btn => btn.addEventListener("click", registrarData));

// Función para registrar una nueva canción
function registrarData() {
  const titulo = document.getElementById("cancion").value;
  const artista = document.getElementById("artista").value;
  const tono = document.getElementById("tono").value;

  console.log(titulo, artista, tono);
  // Realiza una solicitud POST para registrar la canción
  axios.post("/registrarData", { titulo, artista, tono }).then(() => obtenerData());
}
// Función para eliminar una canción
function eliminarData(i, id, e) {
  console.log(i, id, "eliminar");
  e.stopPropagation();
  console.log(i, id);
  axios.delete("/eliminarData/ " + id).then(() => {
    alert("Canción " + canciones[i].cancion + " eliminada");
    obtenerData();
  });
}

function editarData(i, id) {

  const titulo = document.getElementById("cancion");
  const artista = document.getElementById("artista");
  const tono = document.getElementById("tono");
  const botonEditar = document.getElementById("editar");

  // Llena los campos de entrada con los datos de la canción seleccionada
  titulo.value = canciones[i].titulo;  // Asegúrate que 'titulo' es la propiedad correcta
  artista.value = canciones[i].artista;
  tono.value = canciones[i].tono;

  // Configura el botón de editar para llamar a la función actualizarData con el ID de la canción
  botonEditar.onclick = function () { actualizarData(id); };

  // Oculta el botón de agregar y muestra el botón de editar
  document.getElementById("agregar").style.display = "none";
  botonEditar.style.display = "block";
}

function actualizarData(id) {
  const titulo = document.getElementById("cancion").value;
  const artista = document.getElementById("artista").value;
  const tono = document.getElementById("tono").value;
  console.log(titulo, artista, tono);
  axios.put(`/actualizarData/${id}`, {
    titulo,
    artista,
    tono
  }).then(() => {
    alert('Canción actualizada con éxito');
    obtenerData();  // Actualiza la tabla para mostrar los cambios
    document.getElementById("agregar").style.display = "block";
    document.getElementById("editar").style.display = "none";
  }).catch(error => {
    console.error('Error al actualizar la canción:', error);
    alert('Error al actualizar la canción');
  });
}


// Esta función se coloca fuera de cualquier otra función para asegurarse de que solo se establece una vez
document.getElementById("cuerpo").addEventListener("click", function (e) {
  // Comprueba si el elemento clicado es un botón de editar
  if (e.target && e.target.matches(".btn-warning")) {
    let btn = e.target;
    editarData(btn.dataset.index, btn.dataset.id);
  }

  // Comprueba si el elemento clicado es un botón de eliminar
  if (e.target && e.target.matches(".btn-danger")) {
    let btn = e.target;
    eliminarData(btn.dataset.index, btn.dataset.id);
  }
});


tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    let id = e.target.getAttribute("data-id");
    console.log(id);
    axios.delete("/eliminarData/" + id).then(() => obtenerData());
  }
});