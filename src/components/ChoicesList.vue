<script setup lang="js">
import { defineProps, defineEmits, ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';

const props = defineProps({
    choices: {
        type: Array,
        required: true
    },

    startIndex: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['update:answers']);

const selectedAnswers = ref(Array(props.choices.length).fill(null));

function updateAnswer(questionIndex, choiceIndex, choiceValue) {
    selectedAnswers.value[questionIndex] = {
        questionIndex: props.startIndex + questionIndex, // numéro de la question
        choiceIndex, // indice du choix
        choiceValue // texte du choix
    }
    emit('update:answers', selectedAnswers.value); // remonte au parent
}
</script>

<template>
    <ul v-for="(choices, qIndex) in props.choices" :key="qIndex" class="choices-Container">
        <p>{{ startIndex + qIndex }}.</p>
        <RadioButtonGroup :name="`${qIndex}`" class="choices-list">
            <li v-for="(choice, cIndex) in choices" :key="cIndex" class="choice-item">
                <RadioButton 
                    :inputId="`choice-${startIndex}-${qIndex}-${cIndex}`" 
                    :value="choice" 
                    v-model="selectedAnswers[qIndex]"
                    @change="updateAnswer(qIndex, cIndex, choice)"
                />
                <label :for="`choice-${startIndex}-${qIndex}-${cIndex}`">{{ choice }}</label>
            </li>
        </RadioButtonGroup>
    </ul>
</template>