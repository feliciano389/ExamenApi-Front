const mongoose = require('mongoose');

const colegioSchema = new mongoose.Schema({
  nombreColegio: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    required: true,
    min: 6.14,
    max: 6.200
  },
  longitud: {
    type: Number,
    required: true,
    min: -75.5,
    max:  -75.43
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaDeReporte: {
    type: Date,
    default: Date.now
  }
});

const Colegio = mongoose.model('Colegio', colegioSchema);

module.exports = Colegio;
