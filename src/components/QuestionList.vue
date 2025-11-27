<script setup lang="js">
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    questions: {
        type: Array,
        required: true
    },

    startIndex: {
        type: Number,
        default: 1
    }
});

const questionList = ref(props.questions);

</script>

<template>
    <li v-for="(question, index) in questionList" :key="index" class="question-item">
        {{ startIndex + index }}. {{ question }}
    </li>
</template>