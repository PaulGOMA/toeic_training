<script setup lang="js">
import { defineProps, defineEmits, onUnmounted, onMounted, ref } from 'vue';
import Timing from '../core/timeHandler.js';

const props = defineProps({
    seconds: {
        type: Number,
        default: 5
    }
});

const emit = defineEmits(['time-up']);

const display = ref('00 : 00');
let timer = null;

onMounted(() => {
    timer = new Timing(
        props.seconds, 
        (timeString) => {display.value = timeString;},
        () => { emit('time-up'); }
    )
    timer.start();
})

onUnmounted(() => {
    timer.stop();
})

</script>

<template>
    <div class="timer-container">
        <i class="pi pi-stopwatch"></i>
        <span class="timer-value">{{display}}</span>
    </div>
</template>

