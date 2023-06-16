// Importar paquetes requeridos de Node.js
const { response } = require('express');

// Importar modelos
const Colegio = require('../models/colegio');

// Consultar 
const colegioGet = async (req, res = response) => {
    const { nombreColegio } = req.query;

    // Buscar todos los roles
    const colegios= await Colegio.find();
    
    res.json({
        colegios
    });
}

// Insertar rol
const colegioPost = async (req, res = response) => {
    const body = req.body;
    console.log(body)
    let mensaje = '';

    try {
        const colegio = new Colegio(body);
        await colegio.save();
        mensaje = 'La inserción se realizó exitosamente.';
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error(Object.values(error.errors).map(val => val.message));
          mensaje = Object.values(error.errors).map(val => val.message);
        } else {
          mensaje = 'El el colegio ya existe, por favor intente ingresar otro.';
        }
      }
      
      

    res.json({
        msg: mensaje
    });
}

// Modificar rol
const colegioPut = async (req, res = response) => {
    // Capturar atributos o parámetros
    const { nombreColegio,direccion, latitud,  longitud, descripcion,  fechaDeReporte} = req.body;
    let mensaje = '';
  
    try {
      // Realizar la modificación
      const colegio = await Colegio.findOneAndUpdate(
        { nombreColegio:nombreColegio},
        {
            direccion, latitud, nombreColegio, longitud, descripcion,  fechaDeReporte}
      );
  
      mensaje = 'La modificación se efectuó correctamente.';
    } catch (error) {
      mensaje = 'Se presentaron problemas en la modificación.';
    }
  
    res.json({
      msg: mensaje
    });
  };

// Eliminar rol
const colegioDelete = async (req, res = response) => {
    const { nombreColegio } = req.body;
    let mensaje = '';

    try {
        await Colegio.deleteOne({ nombreColegio:nombreColegio });
        mensaje = 'La eliminación se efectuó correctamente.';
    } catch (error) {
        mensaje = 'Se presentaron problemas en la eliminación.';
    }

    res.json({
        msg: mensaje
    });
}

module.exports = {
    colegioGet,
    colegioPost,
    colegioPut,
    colegioDelete
};
