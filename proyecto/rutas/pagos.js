const express = require('express');

const route = express.Router()
const {conexion} = require ('../configuracion/database')

route.get('/',(req, res) => {
    let sql = "Select Id_pago,Id_cli,Id_empleado,date_format(Fecha_pago,'%d-%m-%Y') As Fecha_pago,Monto,Tipo from pagos;"
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
    let sql = 'Select Id_pago,Id_cli,Id_empleado,Fecha_pago,Monto,Tipo from pagos where id_pago=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {Id_cli:req.body.Id_cli,Id_empleado:req.body.Id_empleado,Fecha_pago:req.body.Fecha_pago,Monto:req.body.Monto,Tipo:req.body.Tipo}
    let sql = 'Insert into pagos set ?';
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
    let idemp = req.body.Id_empleado;
    let fecha = req.body.Fecha_pago;
    let mon = req.body.Monto;
    let tip = req.body.Tipo;
    let sql = 'Update pagos set Id_cli = ?, Id_empleado=?, Fecha_pago=?, Monto=?,Tipo=? where Id_pago = ?';
    conexion.query(sql,[idcli,idemp,fecha,mon,tip,codigo],function(err,resul){
        if(err){
            console.log(err.message);
            
        }else{
            res.json(resul);
        }
    });
 });

 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from pagos where id_pago = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
            
        }else{
            res.json(resul);
        }
    });
 });

module.exports=route