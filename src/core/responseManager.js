// src/core/responseManager.js

const STORAGE_KEY = 'quizResults'

export const ResponseManager = {
    saveSet(setIndex, questions, choices, answers, correct) {
        const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

        const enrichedSet = {
            setIndex,
            questions,
            choices,
            answers,
            correct
        }

        previous.push(enrichedSet)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(previous))
    },

    getAllResults() {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    },

    clearResults() {
        localStorage.removeItem(STORAGE_KEY)
    },

    computeScore(results) {
        let total = 0
        let correctCount = 0

        results.forEach(set => {
            set.answers.forEach((answer, i) => {
                total++
                if (answer?.choiceIndex === set.correct[i]) correctCount++
            })
        })

        return { correct: correctCount, total }
    }
}
