<script setup lang="js">
import Timer from '@/components/Timer.vue'
import QuestionList from '@/components/QuestionList.vue'
import ChoicesList from '@/components/ChoicesList.vue'
import QuizzContainer from '@/components/QuizzContainer.vue'
import JSONExtractor from '@/core/extractor'
import { ResponseManager } from '@/core/responseManager'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Extraction des données du fichier JSON
const extractor = new JSONExtractor('./src/data/training1.json')
const setIndex = ref(0)
const setQuestions = ref([])
const setChoices = ref([])
const questionsisVisible = ref(false)
const isReady = ref(false)
const userAnswers = ref([])
const correctAnswers = ref([])
const router = useRouter()
const maxSetCount = ref(0)

function updateAnswers(newAnswers) {
    userAnswers.value = newAnswers
}

const isSetComplete = computed(() => {
    return (
        userAnswers.value.length === setChoices.value.length &&
        userAnswers.value.every(
            answer => answer !== null && answer.choiceIndex !== null
        )
    )
})

function handleTimerUp() {
    questionsisVisible.value = false
}

function nextQuestionSet() {
  // Sauvegarder les réponses du set actuel
    ResponseManager.saveSet(
        setIndex.value,
        [...setQuestions.value],
        [...setChoices.value],
        [...userAnswers.value],
        [...correctAnswers.value]
    )

  // Si c'était le dernier set → redirection vers la page des réponses
    if (setIndex.value >= maxSetCount.value - 1) {
        router.push('/responses')
        return
    }

  // Préparer le set suivant
    questionsisVisible.value = false
    isReady.value = false
    setIndex.value += 1

    Promise.all([
        extractor.extractQuestionSet(setIndex.value),
        extractor.extractChoicesSet(setIndex.value),
        extractor.extractSet(setIndex.value)
    ]).then(([questions, choices, set]) => {
        setQuestions.value = questions
        setChoices.value = choices
        userAnswers.value = Array(choices.length).fill(null)
        correctAnswers.value = set.questions.map(q => q.correctIndex)

        questionsisVisible.value = true
        isReady.value = true
    })
}

onMounted(async () => {
    const totalSets = await extractor.extractData()
    maxSetCount.value = totalSets.length

    const firstSet = await extractor.extractSet(setIndex.value)
    correctAnswers.value = firstSet.questions.map(q => q.correctIndex)

    setQuestions.value = await extractor.extractQuestionSet(setIndex.value)
    setChoices.value = await extractor.extractChoicesSet(setIndex.value)
    userAnswers.value = Array(setChoices.value.length).fill(null)

    questionsisVisible.value = true
    isReady.value = true
})
</script>

<template>
    <section class="quizz-view">
        <div class="card-timer-container">
        <timer
            v-if="isReady"
            :seconds="5"
            @time-up="handleTimerUp"
            :key="setIndex"
        />
        </div>
        <quizz-container
        v-if="isReady"
        :is-question-list="questionsisVisible"
        :button-function="nextQuestionSet"
        :disabled-button="!isSetComplete"
        >
        <question-list
            v-if="questionsisVisible"
            :questions="setQuestions"
            :start-index="1"
        />
        <choices-list
            v-else
            :choices="setChoices"
            :start-index="1"
            @update:answers="updateAnswers"
        />
        </quizz-container>
    </section>
</template>
