const express = require("express");
 
 /* 
    
        CAMPOS FORM:
        - Nombre
        - Apellido
        - Email
        - RUT // type:INT
        - Contraseña
        - Repetir contraseña
        - Rol (Profesor, Estudiante)
        - Año de ingreso (solo para estudiantes)
    
    */ 

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("Taller_III");
 db_connect
   .collection("test")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("test")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
  nombre: req.body.nombre,
  apellido: req.body.apellido,
  rut: req.body.rut,
  email: req.body.email,
  password: req.body.password,
  rol: req.body.rol,
  anio_ingreso: req.body.anio_ingreso,
 };
 db_connect.collection("test").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    rut: req.body.rut,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
    anio_ingreso: req.body.anio_ingreso,

   },
 };
 db_connect
   .collection("test")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("test").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;