import { getExercisesName } from "../Apis/Exercises/ExercisesService";

export const fetchExercise = async (exerciseName) => {
    try {
        const exerciseData = await getExercisesName(exerciseName);

        if (exerciseData.length > 0) {
            const exercise = exerciseData[0];

            return {
                example: {
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    gifUrl: exercise.gifUrl,
                    instructions: exercise.instructions,
                    secondaryMuscles: exercise.secondaryMuscles,
                    target: exercise.target,
                },
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar o exercício:", error);
        throw error;
    }
};
