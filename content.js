let scrollInterval;

const newDiv = document.createElement('div');

// Asignar clase para aplicar estilos
newDiv.className = 'floating-element';

// Agregar contenido al nuevo elemento
newDiv.innerHTML = '<button id="startAutoScroll" type="button" style="postion:absolute" class="btn btn-primary">Autoscroll</button><button id="stopAutoScroll" type="button" style="postion:absolute" class="btn btn-primary">Stopscroll</button><button id="downloadUsers" type="button" style="postion:absolute" class="btn btn-primary">Download Friends</button>';

// Insertar el nuevo elemento al final del body
document.body.appendChild(newDiv);

function startAutoScroll() {
  const scrollAmount = 1; // Cantidad de píxeles a desplazar en cada paso
  scrollInterval = setInterval(() => {
      window.scrollBy(0, scrollAmount);
  }, 10); // Intervalo de tiempo en milisegundos
}
function stopAutoScroll() {
  clearInterval(scrollInterval);
}

document.getElementById('startAutoScroll').addEventListener('click', startAutoScroll);
document.getElementById('downloadUsers').addEventListener('click', scraperUserFriends);
document.getElementById('stopAutoScroll').addEventListener('click', stopAutoScroll);

function scraperUserFriends() {
  // Obtener todos los elementos que tienen la clase especificada
  const elementos = document.querySelectorAll('.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u');

  // Crear un array para almacenar los datos a exportar como CSV
  let csvData = [];

  // Recorrer cada elemento para obtener el texto, el href y los amigos en común
  elementos.forEach(elemento => {
      const texto = elemento.textContent.trim(); // Obtener el texto y eliminar espacios al inicio y al final
      if (elemento.closest('a')) {
        const href = elemento.closest('a').getAttribute('href'); // Obtener el valor del atributo href del elemento <a> más cercano
        const amigosEnComun =  elemento.parentNode.parentNode.parentNode.querySelector('.x1gslohp').textContent  // Obtener la cantidad de amigos en común
        // Agregar los datos al array csvData
        csvData.push([texto, href, amigosEnComun]);
      }
  });

  // Función para convertir el array de datos a formato CSV
  function convertToCSV(array) {
      const header = ['Nombre', 'Link perfil', 'Amigos en comun'];
      let csv = header.join(',') + '\n';

      array.forEach(row => {
          csv += row.join(',') + '\n';
      });

      return csv;
  }

  // Función para descargar el archivo CSV
  function downloadCSV(csv) {
      const csvFile = new Blob([csv], { type: 'text/csv' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(csvFile);
      let nameUser = document.querySelector('.html-h1.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1vvkbs.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz').textContent;
      downloadLink.download = nameUser+'.csv';
      downloadLink.click();
  }

  // Convertir los datos a formato CSV y descargar el archivo
  const csv = convertToCSV(csvData);
  downloadCSV(csv);
}