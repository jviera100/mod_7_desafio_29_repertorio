 // import axios from "/node_modules/axios/dist/axios.min.js";
  
  // let url = "/";
  let tbody = document.getElementById("cuerpo");


  let canciones = [];
  window.onload = obtenerData(); //al cargar la pagina se obtienen los datos

// funcion obtenerData se encarga de estructura de la tabla lista de canciones
  async function obtenerData() {
    await axios.get("/obtenerData").then((data) => { //obtiene datos de la db y se almacenan en data
      canciones = data.data; //variable canciones almacena los datos de variable data
      tbody.innerHTML = ""; //inner cambia lo que hay dentro por el string vacio
      console.log(canciones)
      canciones.forEach((c, i) => { //array de objetos canciones, c = cancion, i = indice
        tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.cancion}</td>
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
  document.querySelectorAll('.btn-warning').forEach(btn => { //seleciona boton editar dentro de tabla
    btn.addEventListener('click', () => editarData(btn.dataset.index, btn.dataset.id)); //edita indice y id señalado
  });
  // Agrega un listener a todos los botones de eliminar dentro de tabla
  document.querySelectorAll('.btn-danger').forEach(btn => { //seleciona boton eliminar dentro de tabla
    btn.addEventListener('click', () => eliminarData(btn.dataset.index, btn.dataset.id)); //elimina indice y id senalado
  });
  // Agrega un listener a todos los botones de registrar dentro de formulario
  document.querySelectorAll('.btn-registrar').forEach(btn => btn.addEventListener("click", registrarData));

  // Función para registrar una nueva canción
  function registrarData() {
    const cancion = document.getElementById("cancion").value;
    const artista = document.getElementById("artista").value;
    const tono = document.getElementById("tono").value;
    // const data = {
    //   titulo: titulo.value,
    //   artista: artista.value,
    //   tono: tono.value,
    // };
    console.log(cancion, artista, tono);
     // Realiza una solicitud POST para registrar la canción
    axios.post("/registrarData", {cancion, artista, tono}).then(() => obtenerData());
  }
// Función para eliminar una canción
  function eliminarData(i, id) {
    console.log(i, id);
    axios.delete("/eliminarData/ " + id).then(() => {
      alert("Canción " + canciones[i].cancion + " eliminada");
      obtenerData();
    });
  }
// Función para editar una canción
   function editarData(i, id) {
    // Llena los campos de entrada con los datos de la canción seleccionada
     cancion.value = canciones[i].cancion;
    artista.value = canciones[i].artista;
    tono.value = canciones[i].tono;
    // Configura el botón de editar para llamar a la función actualizarData con el ID de la canción
     document
      .getElementById("editar")
       .setAttribute("onclick", `editarCancion('${id}')`);
    // Oculta el botón de agregar y muestra el botón de editar
     document.getElementById("agregar").style.display = "none";
     document.getElementById("editar").style.display = "block";
   }
// Función para actualizar una canción
   function actualizarData(id) {
    // Realiza una solicitud PUT para actualizar la canción con el ID proporcionado
    axios
      .put(`/actualizarData/${id}`, { // Utiliza la ruta correcta con el ID
        titulo: cancion.value,
        artista: artista.value,
        tono: tono.value,
      })
      .then(() => {
        obtenerData(); // Llama a la función para actualizar los datos después de la edición
        document.getElementById("agregar").style.display = "block";
        document.getElementById("editar").style.display = "none";
      })
      .catch((error) => {
        console.error('Error al actualizar la canción:', error);
        // Manejar el error si es necesario
      });
  }
// Agrega un listener para detectar clics en cualquier botón dentro del tbody
tbody.addEventListener("click", (e) => { //e = evento
  if (e.target.classList.contains("btn")) { // verifica si el elemento clickeado tiene la clase btn
    let id = e.target.getAttribute("data-id"); //obtiene el id del elemento clickeado
    console.log(id);
     axios.delete("/eliminarData/" + id).then(() => obtenerData()); //elimina el elemento clickeado   
  }});