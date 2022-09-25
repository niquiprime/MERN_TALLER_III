/* 
    
        CAMPOS FORM:
        - Email
        - Contraseña
    
    */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from "./actions/validator";
import styles from "../../css/form.module.css";

const Formulario = () => {

    const formOptions = { resolver: yupResolver(formSchema) }
    const {  register, handleSubmit, formState: { errors } } = useForm(formOptions)

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className={styles.container}>
            <h2>Inicia sesión</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={styles.label}>Email</label>
                    <input type="text" name="email" className={styles.input}
                    {... register("email")} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div>
                    <label className={styles.label}>Contraseña</label>
                    <input type="password" name="contraseña" className={styles.input} 
                    {...register("contraseña")} />
                    {errors.contraseña && <p className={styles.error}>{errors.contraseña.message}</p>}
                </div>
                {/*Por alguna razon el submit no pesca #SOLUCIONAR */}
                <div>
                    <button type="submit" className={styles.button}>Iniciar sesión</button>
                </div>
            </form>

            {/*href: ¿Aun no te registras?*/}
            <div className={styles.noRegister}>
                <a href="/register" className={styles.link}>¿Aun no te registras?</a>
            </div>
        </div>
    )
}
export default Formulario;