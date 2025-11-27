<script setup lang="js">
import { computed, defineProps } from 'vue';
import Card from 'primevue/card';

const props = defineProps({
    isQuestionList: {
        type: Boolean,
        default: false
    }
});

const cardTitle = computed(() => {
    return props.isQuestionList ? 'Record what these questions imply ' : 
        'Select the best implication related to the previous questions.';
});

</script>

<template>
    <Card class="quizz-container">
        <template #title>
            <h3>{{ cardTitle }}</h3>
        </template>
        <template #content>
            <slot></slot>
        </template>
    </Card>
</template>
