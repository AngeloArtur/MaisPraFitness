import { ExerciseGif } from "./ExercisesGif";

export const getExercisesName = (exerciseName) => ExerciseGif(`name/${exerciseName}`);

export const allExercises = () => ExerciseGif("")
