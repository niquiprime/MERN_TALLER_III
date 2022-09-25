import React from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from "./actions/validator";
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


const Formulario =() => {

    const formOptions = { resolver: yupResolver(formSchema) }
    const { /* watch ,*/ register, handleSubmit, formState: { errors } } = useForm(formOptions)

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className={styles.container}>
            <h2>Regístrate!!</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={styles.label} >Nombre</label>
                    <input type="text" name="nombre" className={styles.input} {...register("nombre")} />
                    {errors.nombre && <p className={styles.error}>{errors.nombre.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Apellido</label>
                    <input type="text" name="apellido" className={styles.input} {...register("apellido")}/>
                    {errors.apellido && <p className={styles.error}>{errors.apellido.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Email</label>
                    <input type="email" name="email" className={styles.input} {...register("email")} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>RUT</label>
                    <input type="number" name="rut" className={styles.input} {...register("rut")}/>
                    {errors.rut && <p className={styles.error}>{errors.rut.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Contraseña</label>
                    <input type="password" name="contraseña" className={styles.input} {...register("contraseña")}/>
                    {errors.contraseña && <p className={styles.error}>{errors.contraseña.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Repetir contraseña</label>
                    <input type="password" name="repetirContraseña" className={styles.input} {...register("repetirContraseña")}/>
                    {errors.repetirContraseña && <p className={styles.error}>{errors.repetirContraseña.message}</p>}
                    {/*<span>Pass1: {watch("contraseña")} Pass2: {watch("repetirContraseña")}</span> */}
                </div>
                <div>
                    <label className={styles.label}>Rol</label>
                    <select name="rol" className={styles.input} {...register("rol")}>
                        <option value="profesor">Profesor</option>
                        <option value="estudiante">Estudiante</option>
                    </select>
                    {errors.rol && <p className={styles.error}>{errors.rol.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Año de ingreso</label>
                    <input type="number" name="añoIngreso" className={styles.input} {...register("añoIngreso")}/>
                    {errors.añoIngreso && <p className={styles.error}>{errors.añoIngreso.message}</p>}
                </div>
                <div>
                    <button type="submit" className={styles.button}>Enviar</button>
                </div>
            </form>
        </div>
)}

export default Formulario