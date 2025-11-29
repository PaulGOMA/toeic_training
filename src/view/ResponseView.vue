<script setup>
import { ref, onMounted, computed } from 'vue'
import { ResponseManager } from '@/core/responseManager'
import { useRouter } from 'vue-router'
import Button from 'primevue/button';
import Tag from 'primevue/tag';


const router = useRouter()
const results = ref([])
const score = computed(() => ResponseManager.computeScore(results.value))

onMounted(() => {
    results.value = ResponseManager.getAllResults()
})

function restartQuiz() {
    ResponseManager.clearResults()
    router.push('/')
}
</script>


<template>
    <section class="page-container">
        <h2 class="title-response-view">Responses Overview</h2>
        <h3>Score: {{ score.correct }} / {{ score.total }}</h3>
        <div v-for="(set, sIndex) in results" :key="sIndex" class="set-block">
            <h3>Set {{ sIndex + 1 }}</h3>
            <div v-for="(q, qIndex) in set.questions" :key="qIndex" class="question-block">
                <p>{{ qIndex + 1 }}. {{ q }}</p>
                <ul>
                    <li
                        v-for="(choice, cIndex) in set.choices[qIndex]"
                        :key="cIndex"
                        :class="{
                        correct: cIndex === set.correct[qIndex],
                        wrong: set.answers[qIndex]?.choiceIndex === cIndex && cIndex !== set.correct[qIndex]
                        }"
                    >
                        {{ choice }}

                        <Tag 
                            v-if="cIndex === set.correct[qIndex]" 
                            severity="success" 
                            value="✔ Correct"
                        />
                        <Tag
                            v-else-if="set.answers[qIndex]?.choiceIndex === cIndex"
                            severity="danger"
                            value="✘ Your answer"
                        />
                    </li>
                </ul>
            </div>
        </div>
        <Button label="Restart test" @click="restartQuiz" icon-pos="right" icon="pi pi-undo"/>
    </section>
</template>


<style scoped>

.page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}

.title-response-view {
    margin-bottom: 2rem;
}

.set-block {
    margin-bottom: 2rem;
    text-align: left; /* garder les questions alignées à gauche */
}

.question-block {
    margin-bottom: 1rem;
}

.question-block p {
    font-weight: bold;
}

ul {
    list-style: none;
    padding-left: 0;
}

li {
    margin: 0.25rem 0;
}

.correct {
    font-weight: bold;
    color: green;
}

.wrong {
    font-weight: bold;
    color: red;
}
</style>
