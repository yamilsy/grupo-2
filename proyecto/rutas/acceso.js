const express = require('express')
const encrypt= require('bcryptjs')

const route = express.Router()
const { conexion } = require('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');


route.post('/',function(req,res) {
    const usuario = req.body.usuario;
   let sql = 'select usuario,clave from login where usuario = ?';
   conexion.query(sql, [usuario], async function(error, results)  {
     if (error) {
       res.json({mensaje:'Error'});
     }
     if (results.length == 0) {
       res.json({mensaje:'Usuario no encontrado'});
       return;
     }
      const contra= results[0].clave;
        await encrypt.compare(req.body.clave, contra)
        .then((result) => {
          if (result) {
      
              jwt.sign(usuario, jwt_secret, function (err,token)
              {
              if(err){
                  console.log("error");
              }else{
                  res.json(token);
              }
           });
       
          } else {
            res.json({mensaje:'Dato Incorrecto'});
          }
 })
   })
});
   
module.exports=route