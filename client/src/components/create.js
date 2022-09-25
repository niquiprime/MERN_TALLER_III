import React, { useState } from "react";
import { useNavigate } from "react-router";
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
export default function Create() {
 const [form, setForm] = useState({
   nombre: "",
    apellido: "",
    email: "",
    rut: "",
    password: "",
    rol: "",
    anio_ingreso: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ nombre: "", apellido: "", email: "", rut: "", password: "", rol: "", anio_ingreso: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
    <div>
        <h2>Regístrate!!</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" name="nombre" id="nombre"/>
            </div>
            <div>
                <label >Apellido</label>
                <input type="text" name="apellido" id="apellido"/>
            </div>
            <div>
                <label >Email</label>
                <input type="email" name="email"id="email"/>
            </div>
            <div>
                <label >RUT</label>
                <input type="text" name="rut"id="rut"/>
            </div>
            <div>
                <label >Contraseña</label>
                <input type="password" name="password" id="password"/>
            </div>
            <div>
                <label >Repetir contraseña</label>
                <input type="password" name="password2" id="password2"/>
            </div>
            <div>
                <label >Rol</label>
                <select name="rol" id="rol">
                    <option value="profesor">Profesor</option>
                    <option value="estudiante">Estudiante</option>
                </select>
            </div>
            <div>
                <label >Año de ingreso</label>
                <input type="text" name="anio_ingreso" id="anio_ingreso"/>
            </div>
            <div>
                <button type="submit" >Enviar</button>
            </div>
        </form>
    </div>
 );
}