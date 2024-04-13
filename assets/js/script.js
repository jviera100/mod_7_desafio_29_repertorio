 // import axios from "/node_modules/axios/dist/axios.min.js";
  
  // let url = "/";
  let tbody = document.getElementById("cuerpo");


  let canciones = [];
  window.onload = obtenerData();

  async function obtenerData() {
    await axios.get("/obtenerData").then((data) => {
      canciones = data.data;
      tbody.innerHTML = "";
      console.log(canciones)
      canciones.forEach((c, i) => {
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
      });
    });
    cancion.value = "";
    artista.value = "";
    tono.value = "";
  }

  document.querySelectorAll('.btn-warning').forEach(btn => {
    btn.addEventListener('click', () => editarData(btn.dataset.index, btn.dataset.id));
  });
  
  document.querySelectorAll('.btn-danger').forEach(btn => {
    btn.addEventListener('click', () => eliminarData(btn.dataset.index, btn.dataset.id));
  });
  document.querySelectorAll('.btn-registrar').forEach(btn => btn.addEventListener("click", registrarData));

  
  function registrarData() {
    const titulo = document.getElementById("cancion").value;
    const artista = document.getElementById("artista").value;
    const tono = document.getElementById("tono").value;
    // const data = {
    //   titulo: titulo.value,
    //   artista: artista.value,
    //   tono: tono.value,
    // };
    console.log(titulo, artista, tono);
    axios.post("/registrarData", {titulo, artista, tono}).then(() => obtenerData());
  }

  function eliminarData(i, id) {
    console.log(i, id);
    axios.delete("/eliminarData/ " + id).then(() => {
      alert("Canción " + canciones[i].titulo + " eliminada");
      obtenerData();
    });
  }

   function editarData(i, id) {
     cancion.value = canciones[i].titulo;
    artista.value = canciones[i].artista;
    tono.value = canciones[i].tono;
     document
      .getElementById("editar")
       .setAttribute("onclick", `editarCancion('${id}')`);
     document.getElementById("agregar").style.display = "none";
     document.getElementById("editar").style.display = "block";
   }

   function actualizarData(id) {
     axios
       .put(url + "/" + id, {
         titulo: cancion.value,
        artista: artista.value,
         tono: tono.value,
       })
       .then(() => {
         obtenerDataData();
         document.getElementById("agregar").style.display = "block";
        document.getElementById("editar").style.display = "none";
       });
   }
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    let id = e.target.getAttribute("data-id");
    console.log(id);
     axios.delete("/eliminarData/" + id).then(() => obtenerData());    
  }});