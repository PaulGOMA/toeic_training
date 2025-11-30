<script setup lang="js">
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const startQuizz = () => {
    router.push('/quizz');
};
</script>

<template>
    <section class="home-container">
        <Card class="card-content">
            <template #content>
                
                    <p>
                        Welcome to your <strong>TOEIC training</strong> companion!  
                        <br/>This application is designed to boost your skills in parts 3 and 4 of the TOEIC test, helping you practice reading and understanding questions with confidence. 
                    </p>
                    <br/>
                    <ul>
                        Click the <strong>"Start"</strong> button to begin:  
                        <li>A set of 3 questions will appear on your screen for 5 seconds.</li> 
                        <li>Then, you'll see 3 possible responses.</li> 
                        <li>Your challenge is to choose the best response that matches the questions you just read.</li>  
                    </ul>
                    <br/>
                    <p>
                        <strong><em>Sharpen your reflexes, improve your comprehension, and get ready to succeed on the TOEIC!</em></strong>
                    </p>
            </template>
        </Card>
        <Button label="Start" @click="startQuizz" size="large"/>
    </section>
</template>

<style lang="css" scoped>
li {
    list-style-type: circle;
    margin-left: 1.25rem;
}
</style>