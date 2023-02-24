const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();


route.get('/',(req, res) => {
    let sql = "Select Id_empleado,Cargo,Sueldo,Id_persona from empleado;"
    
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+err.message);
            throw err
        }else{
            res.json(resul)
        }
    });
});

route.get('/:codigo',function(req,res) {
    let sql = 'Select Id_empleado,Cargo,Sueldo,Id_persona from empleado where Id_empleado=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
                Cargo:req.body.Cargo,
                Sueldo:req.body.Sueldo,
                Id_persona:req.body.Id_persona
            }
    let sql = 'Insert into empleado set ?';
    conexion.query(sql,data, function(err,resul){
        if(err){
            console.log(err.message);
            res.json('Error no se adiciono');
            throw response.json(err.message)
        }else{
            res.json(resul);
            console.log('Positiva, se adiciono');
        }
    });
});


route.put('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let Cargo = req.body.Cargo;
    let Sueldo = req.body.Sueldo;
    let Id_persona= req.body.Id_persona;
    let sql = 'Update empleado set Cargo = ?, Sueldo=?, Id_persona=? where Id_empleado = ?';
    conexion.query(sql,[Cargo,Sueldo,Id_persona,codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });
 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from empleado where Id_empleado = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

module.exports =  route ;
