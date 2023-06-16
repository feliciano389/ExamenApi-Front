const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{colegioGet, colegioPost, colegioPut, colegioDelete}=require('../controllers/colegio')
route.get('/', colegioGet)
route.post('/',colegioPost )
route.put('/',colegioPut )
route.delete('/',colegioDelete )



module.exports = route
