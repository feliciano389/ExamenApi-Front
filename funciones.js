const url = 'http://localhost:8094/api/colegio';

const listarDatos = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaColegios = data.colegios;
      listaColegios.map(function (colegio) {
        respuesta += `<tr><td>${colegio.nombreColegio}</td>` +
          `<td>${colegio.direccion}</td>` +
          `<td>${colegio.latitud}</td>` +
          `<td>${colegio.longitud}</td>` +
          `<td>${colegio.descripcion}</td>` +
          `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(colegio)})'>Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red" onclick='eliminar(${JSON.stringify(colegio)})'>Eliminar</a></td>` +
          `</tr>`;
        body.innerHTML = respuesta;
      });
    });
};
//-----------------------------------------------------------------------------
const registrar = async () => {
  let _nombreColegio= document.getElementById('nombreColegio').value;
  let _direccion = document.getElementById('direccion').value;
  let _latitud = document.getElementById('latitud').value;
  let _longitud = document.getElementById('longitud').value;
  let _descripcion = document.getElementById('descripcion').value;

  let Colegio= {
    nombreColegio:_nombreColegio,
    direccion:_direccion,
    latitud:_latitud,
    longitud:_longitud,
    descripcion:_descripcion
    
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(Colegio),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const json = await response.json();

    if (json.msg) {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    }
  } catch (error) {
    Swal.fire(
      'Error al insertar.',
      '',
      'error'
    );
  }
};

const eliminar = (nombreColegio) => {

  const url = 'http://localhost:8094/api/colegio';

  if(confirm('¿esta seguro que desea realizar la eliminación ')== true){

    let Colegio = {
      nombreColegio: nombreColegio.nombreColegio
    }

    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(Colegio),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json())
    .then(json => {
      alert(json.msg)
    })
  }

}

//-----------------------------------------------------------------------------

const editar = () => {
  const nombreColegioInput = document.getElementById('nombreColegio');
  const direccionInput = document.getElementById('direccion');
  const latitudput = document.getElementById('latitud');
  const longitudput = document.getElementById('longitud');
  const descripcionput = document.getElementById('descripcion').value;


  if (Colegio) {
    nombreColegioInput.value = colegio.nombreColegio || '';
    direccionInput.value = colegio.direccion || '';
    latitudput.value = colegio.latitud || '';
    longitudput.value = colegio.longitud || '';
    descripcionput.value = colegio.descripcion || '';


  } else {
    // Mensaje de error en caso de que no se pueda realizar la edición
    console.log('¡Hubo un problema al editar el colegio!');
  }
};


const actualizar = async () => {
  let _nombreColegio= document.getElementById('nombreColegio').value;
  let _direccion = document.getElementById('direccion').value;
  let _latitud = document.getElementById('latitud').value;
  let _longitud = document.getElementById('longitud').value;
  let _descripcion = document.getElementById('descripcion').value;

  let Colegio = {
    nombreColegio:_nombreColegio,
    direccion:_direccion,
    latitud:_latitud,
    longitud:_longitud,
    descripcion:_descripcion
  };

  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(rol),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      alert(json.msg);
    })
    .catch(() => {
      Swal.fire(
        'Error al actualizar.',
        '',
        'error'
      );
    });
};






if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar')
  .addEventListener('click', () => {registrar()});
}


if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}




