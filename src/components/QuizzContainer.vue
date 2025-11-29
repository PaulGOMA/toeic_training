<script setup lang="js">
import { computed, defineProps } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const props = defineProps({
    isQuestionList: {
        type: Boolean,
        default: false
    },
    disabledButton: {
        type: Boolean,
        default: false
    },
    buttonFunction: {
        type: Function,
        default: null
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
        <template #footer>
            <div class="card-footer">
                <Button 
                    label="Next" 
                    icon="pi pi-angle-right" 
                    icon-pos="right"  
                    class="card-button"
                    :disabled="disabledButton"
                    @click="buttonFunction"
                />  
            </div>  
        </template>
    </Card>
</template>
