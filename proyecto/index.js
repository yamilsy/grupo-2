const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const categoria=require('./rutas/categoria')
const cliente=require('./rutas/cliente')
const compras=require('./rutas/compras')
const login=require('./rutas/login')
const empleado=require('./rutas/empleado')
const pagos=require('./rutas/pagos')
const persona=require('./rutas/persona')
const productos=require('./rutas/productos')
const acceso=require('./rutas/acceso')




app.use('/categoria',categoria);
app.use('/cli',cliente);
app.use('/compra',compras);
app.use('/emp',empleado);
app.use('/pago',pagos);
app.use('/person',persona);
app.use('/produc',productos);
app.use('/login',login);
app.use('/acceso',acceso);


const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});