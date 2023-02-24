const express = require('express');
const { conexion } = require('../configuracion/database');
const route= express.Router();


route.get('/',(req, res) => {
    let sql = "Select Id_prod,Nombre,Descripcion,Precio,Cantidad,Id_cat from productos;"
    
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
    let sql = 'Select Id_prod,Nombre,Descripcion,Precio,Cantidad,Id_cat from productos where Id_prod=?'
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
                Nombre:req.body.Nombre,
                Descripcion:req.body.Descripcion,
                Precio:req.body.Precio,
                Cantidad:req.body.Cantidad,
                Id_cat:req.body.Id_cat
            }
    let sql = 'Insert into productos set ?';
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
    let Nombre = req.body.Nombre;
    let Descripcion = req.body.Descripcion;
    let Precio = req.body.Precio;
    let Cantidad = req.body.Cantidad;
    let Id_cat = req.body.Id_cat;
    let sql = 'Update productos set Nombre = ?, Descripcion=?, Precio=?, Cantidad=?, Id_cat=? where Id_prod = ?';
    conexion.query(sql,[Nombre,Descripcion,Precio,Cantidad,Id_cat,codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from productos where Id_prod = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

module.exports =  route ;
