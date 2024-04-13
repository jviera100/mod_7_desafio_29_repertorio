  // import axios from "axios";
  
 
  let tbody = document.getElementById("cuerpo");
  let cancion = document.getElementById("cancion");
  let artista = document.getElementById("artista");
  let tono = document.getElementById("tono");

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
            <button class="btn btn-warning" onclick="actualizarData(${i},'${c.id
          }')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarData(${i},'${c.id
          }')">Eliminar</button>
          </td>
        </tr>
      `;
      });
    });
    cancion.value = "";
    artista.value = "";
    tono.value = "";
  }

  function registrarData() {
    cancion;
    artista;
    tono;
    let data = {
      titulo: cancion.value,
      artista: artista.value,
      tono: tono.value,
    };
    console.log(data);
    axios.post(url, data).then(() => getData());
  }

  function eliminarData(i, id) {
    console.log(i, id);
    axios.delete("/eliminarData/ " + id).then(() => {
      alert("Canción " + canciones[i].titulo + " eliminada");
      obtenerData();
    });
  }

  // function actualizarData(i, id) {
  //   cancion.value = canciones[i].titulo;
  //   artista.value = canciones[i].artista;
  //   tono.value = canciones[i].tono;
  //   document
  //     .getElementById("editar")
  //     .setAttribute("onclick", `editarCancion('${id}')`);
  //   document.getElementById("agregar").style.display = "none";
  //   document.getElementById("editar").style.display = "block";
  // }

  // function actualizarData(id) {
  //   axios
  //     .put(url + "/" + id, {
  //       titulo: cancion.value,
  //       artista: artista.value,
  //       tono: tono.value,
  //     })
  //     .then(() => {
  //       obtenerDataData();
  //       document.getElementById("agregar").style.display = "block";
  //       document.getElementById("editar").style.display = "none";
  //     });
  // }
