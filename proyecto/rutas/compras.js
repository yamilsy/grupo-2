const express = require('express');

const route = express.Router()
const { conexion } = require('../configuracion/database');

route.get('/',(req, res) => {
    let sql = "Select Id_Compra,Id_cli,Id_prod,date_format(fecha,'%d-%m-%Y') As fecha,Cantidad,Precio from compras;"
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
    let sql = 'Select Id_Compra,Id_cli,Id_prod,fecha,Cantidad,Precio from compras where Id_Compra=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {Id_cli:req.body.Id_cli,Id_prod:req.body.Id_prod,fecha:req.body.fecha,Cantidad:req.body.Cantidad,Precio:req.body.Precio}
    let sql = 'Insert into compras set ?';
    conexion.query(sql,data, function(err,resul){
        if(err){
            console.log(err.message);
            res.send('Error no se adiciono');
            throw response.json(err.message)
        }else{
            res.json(resul);
            console.log('Datos adicionados');
        }
    });
});

route.put('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let idcli = req.body.Id_cli;
    let idprod = req.body.Id_prod;
    let fecha = req.body.fecha;
    let cant = req.body.Cantidad;
    let pre = req.body.Precio;
    let sql = 'Update compras set Id_cli = ?, Id_prod=?, fecha=?, Cantidad=?,Precio=? where Id_Compra = ?';
    conexion.query(sql,[idcli,idprod,fecha,cant,pre,codigo],function(err,resul){
        if(err){
            console.log(err.message);
            
        }else{
            res.json(resul);
        }
    });
 });


 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from compras where Id_Compra = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
            
        }else{
            res.json(resul);
        }
    });
 });

module.exports=route