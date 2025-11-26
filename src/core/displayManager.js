class DisplayManager {
    constructor(data) {
        this.data = data;
    }

    /**
     * Affiche d'abord les questions, puis les remplace par les choix après un délai
     * @param {number} index - index du set dans le JSON
     * @param {number} delay - délai en ms avant de remplacer par les choix
     * @param {function} callback - fonction appelée à chaque étape
     */
    async displaySet(index = 0, delay = 1000, callback = console.log) {
        const questionList = await this.data;
        const questionSet = questionList[index];

        if (questionSet) {
            // Étape 1 : afficher les questions
            const questionTexts = questionSet.questions.map(item => item.text);
            callback({ type: "questions", data: questionTexts });

            // Étape 2 : attendre le délai puis remplacer par les choix
            await new Promise(resolve => setTimeout(resolve, delay));
            const questionChoices = questionSet.questions.map(item => item.choices);
            callback({ type: "choices", data: questionChoices });
        } else {
            console.log(`No question set found at index ${index}.`);
        }
    }
}