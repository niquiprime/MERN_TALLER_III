import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
    const [form, setForm] = useState({
        nombre: "",
         apellido: "",
         email: "",
         rut: "",
         password: "",
         rol: "",
         anio_ingreso: "",
      });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    nombre: form.nombre,
    apellido: form.apellido,
    email: form.email,
    rut: form.rut,
    password: form.password,
    rol: form.rol,
    anio_ingreso: form.anio_ingreso,
    
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
    <div>
    <h2>Regístrate!!</h2>
    <form onSubmit={onSubmit}>
        <div>
            <label>Nombre</label>
            <input type="text" name="nombre" id="nombre" 
            value={form.nombre}
            onChange={(e) => updateForm({ nombre: e.target.value })}/>
        </div>
        <div>
            <label >Apellido</label>
            <input type="text" name="apellido" id="apellido"
            value={form.apellido}
            onChange={(e) => updateForm({ apellido: e.target.value })}/>
        </div>
        <div>
            <label >Email</label>
            <input type="email" name="email" id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}/>
        </div>
        <div>
            <label >RUT</label>
            <input type="text" name="rut" id="rut"
            value={form.rut}
            onChange={(e) => updateForm({ rut: e.target.value })}/>
        </div>
        <div>
            <label >Contraseña</label>
            <input type="password" name="password" id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}/>
        </div>
        <div>
            <label >Repetir contraseña</label>
            <input type="password" name="password2" id="password2"/>
        </div>
        <div>
            <label >Rol</label>
            <select name="rol" id="rol" value={form.rol} onChange={(e) => updateForm({ rol: e.target.value })} >
                <option value="profesor">Profesor</option>
                <option value="estudiante">Estudiante</option>
            </select>
        </div>
        <div>
            <label >Año de ingreso</label>
            <input type="text" name="anio_ingreso" id="anio_ingreso"
            value={form.anio_ingreso}
            onChange={(e) => updateForm({ anio_ingreso: e.target.value })}/>
        </div>
        <div>
            <button type="submit" >Enviar</button>
        </div>
    </form>
</div>
 );
}