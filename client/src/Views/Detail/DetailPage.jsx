import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { recipeDetail } from "../../Redux/actions";
import style from "./DetailPage.module.css";
import { NavLink } from "react-router-dom";

 
export default function DetailPage() {
    const { id } = useParams();
 // Estado local para almacenar la información de la receta
 const [recipe, setRecipe] = useState({});
// useEffect se utiliza para cargar los detalles de la receta al cargar la página
 useEffect(() => {
// Llama a la función recipeDetail del Redux para obtener los detalles de la receta
    recipeDetail(id, setRecipe)
 }, [id])
// Extrae la información relevante de la receta del estado local para usarla en la renderización                                        
const {image, name, healthScore, diets,steps, summary} = recipe;
 // Limpia el resumen de la receta eliminando las etiquetas HTML
const cleanSummary = summary?.replace(/<.*?>/g, ''); 

// Función para parsear los pasos que vienen en formato JSON
const parseSteps = (steps) => {
  if (typeof steps === "string") {
    try { 
      // Split the steps string into an array by line breaks ("\n")
      const stepsArray = steps.split("\n");
      // Remove any empty elements
      const filteredSteps = stepsArray.filter((step) => step.trim() !== "");
      // Map the filtered steps to an array of objects
      const parsedSteps = filteredSteps.map((step, index) => ({
        number: index + 1,
        step: step.trim(),
      }));
      return parsedSteps;
    } catch (error) {
      console.error("Error parsing steps:", error);
      return [];
    }
  }
  return [];
};

const renderCleanedSteps = (steps) => {
  const cleanedSteps = parseSteps(steps).map((stepObj) => {
    const cleanedStep = stepObj.step
      .replace(/step/g, "") // Eliminar la palabra "step"
      .replace(/[":,{}\\]/g, "") // Eliminar comillas, dos puntos, comas, llaves y barras invertidas
      .replace(/number\d+/g, "") // Eliminar "numberX,step:" o "numberXstep:"
      .trim(); // Eliminar espacios en blanco al inicio y al final
    return { step: cleanedStep };
  });

  const separatedSentences = cleanedSteps.flatMap((stepObj) =>
  stepObj.step.split(/\./)?.map((sentence) => sentence.trim())
);

  return separatedSentences.map((sentence, index) => (
    <li key={index}>{sentence}</li>
  ));
};

    return (
        <div className={style.component}>
                    <div>
                        <h1 className={style.title}>{id}- {name}</h1>
                        <div className={style.imgContainer}>
                            <img src={image} alt='img'
                                width="500px" height="400px" className={style.img} />
                        </div>
                        <div className={style.detailContainer}>
                            <h3 className={style.h3}>Healthy-Food level: {healthScore}</h3>
                            <h3 className={style.h3}>Summary:</h3><p className={style.p}>{cleanSummary}</p>
                            <h3 className={style.h3}>Step by step:</h3>
                            {/* Renderiza los pasos de la receta como una lista */}
                            <ol className={style.p}>
                              {Array.isArray(steps) ? (
                                steps.map((s, index) => <li key={index}>{s.step}</li>)
                                ) : (
                                  renderCleanedSteps(steps)
                                  )}
                                  </ol> 
                            <h3 className={style.h3}>Diets:</h3>
                            {/* Renderiza los tipos de dieta de la receta como una lista */}
                            <ul className={style.p}>{diets?.map((diet, index) => {
                               if(typeof diet === 'string'){
                                return (<li className={style.li} key={index}>{diet}</li>)
                               } else {
                                return (<li className={style.li} key={index}>{diet.name}</li>)
                               }})}</ul>
                        </div>
                        <button><NavLink to='/home'>Back</NavLink></button>
                    </div> 
        </div>
    )
};