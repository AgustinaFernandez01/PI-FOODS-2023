import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postRecipe, getDiets } from "../../Redux/actions";
import styles from './CreateForm.module.css';

// Función para validar los campos del formulario de creación
function validate(post, recipesCheck) {  
    let errors = {};
    let recipesNames = recipesCheck.map(r =>  r = r.name) 
    if (!post.name || post.name.trim() === '') {
        errors.name = 'Enter a name for the recipe'
    } else if (recipesNames.includes(post.name)) {
        errors.name = "The name can't be the same as an existing recipe";
    }
    if (!post.summary || post.summary.trim() === '') {
        errors.summary = 'Write a short summary of your recipe'
    }
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Enter a value between 0 and 100'
    } 
    if (!post.stepByStep.length) {
        errors.stepByStep = 'Write the steps to your recipe without the numbers'
    }
    if (!post.image || post.image.trim() === '') {
        errors.image = 'Use a URL for the image'
    }
    if (!post.diets.length) {
        errors.diets = 'Choose at least a diets'
    }
    return errors; 
} 

// Componente del formulario de creación de recetas
export default function CreateForm() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const recipesCheck = useSelector(state => state.recipes)
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    // Estado local para almacenar si el usuario ha tocado los campos del formulario
    const [touchedFields, setTouchedFields] = useState({});


    useEffect(() => {
        dispatch(getDiets())
    }, [])

    // Estado local para almacenar los datos del formulario
    const [post, setPost] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        image: '',
        stepByStep: [],
        diets: []
    });

    // Función para marcar un campo como tocado cuando el usuario interactúa con él
  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

    // Función para verificar si el formulario es válido
  const checkFormValidity = () => {
    const formIsValid = Object.keys(errors).length === 0;
    setIsFormValid(formIsValid);
  };

    // Función para manejar los cambios en los campos del formulario
  function handleInputChange(e) {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
    setErrors(
      validate(
        {
          ...post,
          [name]: value,
        },
        recipesCheck
      )
    );
    checkFormValidity();
  }
    // Función para manejar el envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert("Please fill in all the fields");
        } else {
            // Llamar a la acción de Redux para crear la receta
            try {
                await dispatch(postRecipe(post));
                // Una vez que la receta se ha creado correctamente, limpiar los campos del formulario
                setPost({
                    name: '',
                    summary: '',
                    healthScore: 0,
                    image: '',
                    stepByStep: [], // Restablecer a un solo string vacío
                    diets: []
                });
                setIsFormValid(false);
            } catch (error) {
                alert('Error creating recipe. Please try again.');
            }
        }
    }

    // Función para manejar la selección de los tipos de dieta
  function handleSelectDiets(e) {
    const { value } = e.target;
    if (!post.diets.includes(value)) {
      setPost({
        ...post,
        diets: [...post.diets, value],
      });
      setErrors(
        validate(
          {
            ...post,
            diets: [...post.diets, value],
          },
          recipesCheck
        )
      );
    }
    checkFormValidity();
  }

    // Función para manejar los cambios en los pasos del formulario
    function handleSteps(e) {
        const { value } = e.target;
        // Separa la cadena de texto en líneas y crea un nuevo arreglo de objetos
        const steps = value.split('\n').map((step, index) => ({
            number: index + 1,
            step: step.trim()
        }));
        setPost({
            ...post,
            stepByStep: steps // Actualizar como arreglo de objetos con número de paso y descripción
        });
        setErrors(validate({ 
            ...post,
            stepByStep: steps
        }, recipesCheck));
    }
    // Función para eliminar un tipo de dieta seleccionado
    function handleDietDelete(diet) {
        setPost({
            ...post,
            diets: post.diets.filter(elemet => elemet !== diet)
        })
        setErrors(validate({
            ...post,
            diets: [...post.diets]
        }, recipesCheck));

    };

    // Renderizado del formulario de creación
    return (
        <div className={styles.container}>
            <div className={styles.bkg} />
            <div className={styles.bkgcolor}>
                <div className={styles.form}>
                    <h1>Share your Recipe:</h1>
                    <form onSubmit={e => handleSubmit(e)}>
                        {/* Campo: Nombre */}
                        <div>
                            <label>Name</label>
                            <input type="text" onBlur={handleInputBlur}  value={post.name} name='name' onChange={e => handleInputChange(e)} />
                            {touchedFields.name && errors.name && (
                            <p>{errors.name}</p>
                            )}
                        </div>
                        {/* Campo: Resumen */}
                        <div>
                            <label>Summary</label>
                            <textarea value={post.summary} name='summary' onChange={e => handleInputChange(e)} />
                            {errors.summary && (
                                <p>{errors.summary}</p>
                            )}
                        </div>
                        {/* Campo: Puntaje de salud */}
                        <div>
                            <label>Health Score</label>
                            <input type="number" min="0" max='100' value={post.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
                            {errors.healthScore && (
                                <p>{errors.healthScore}</p>
                            )}
                        </div>
                        {/* Campo: URL de la imagen */}
                        <div>
                            <label>Image</label>
                            <input type="text" value={post.image} name='image' onChange={e => handleInputChange(e)} />
                            {errors.image && (
                                <p>{errors.image}</p>
                            )}
                        </div>
                        {/* Campo: Pasos */}
                        <div>
                            <label>Steps</label>
                            <textarea
                            value={post.stepByStep.map(step => step.step).join('\n')}
                            name='stepByStep'
                            onChange={e => handleSteps(e)}
                            />
                            {errors.stepByStep && (
                            <p>{errors.stepByStep}</p>)}
                        </div> 
                        {/* Campo: Tipos de dieta */}
                        <div>
                            <select onChange={e => handleSelectDiets(e)} defaultValue='default' className={styles.dietSelect}>
                                <option value="default" disabled className={styles.dietOption}>Choose a Diet</option>
                                {
                                    diets && diets.map(d => (
                                        <option value={d.name} key={d.id} className={styles.dietOption}>{d.name}</option>
                                    ))
                                }
                            </select>
                            {errors.diets && (
                                <p style={{ float: 'right' }}>{errors.diets}</p>
                            )}
                            {post.diets.map(d =>
                                <div key={d.id} className={styles.divdiets}>
                                    <p className={styles.selecteddiets}>{d}</p>
                                    <button onClick={() => handleDietDelete(d)} className={styles.buttonclose}>X</button>
                                </div>
                            )}
                        </div>
                        {/* Botón para enviar el formulario */}
                        <button type='submit' className={styles.createButton} disabled={!isFormValid}>¡Create!</button>
                    </form>
                    {/* Botón para volver a la página de inicio */}
                    <NavLink to='/home'>
                        <button className={styles.createButton}>Back</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}