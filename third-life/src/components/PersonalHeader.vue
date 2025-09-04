
<template>
    <header>
        <nav class="container">
            <button @click="goToHome" class="link-btn">INÍCIO</button>
            <button @click="goToEditor" class="link-btn">EDITOR</button>
            <button @click="goToTable" class="link-btn">MESAS</button>
            <button @click="goToAbout" class="link-btn">SOBRE</button>
        </nav>
    </header>
</template>

<script setup lang="ts">
//@ts-ignore
import router from "../router/index";

const goToHome = () => {
  router.push('/');
};

const goToEditor = () => {
  router.push('/editor');
};

const goToTable = () => {
  router.push('/tables');
};


const goToAbout = () => {
  router.push('/about');
};

</script>

<style scoped>
.container {
    background-color: #0A1828;
    padding: 1vh;
    margin: 1vw 3vw 0vw 3vw;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    box-shadow: inset 0 4px 6px rgba(252, 252, 252, 0.3); /* sombra interna */
    transition: box-shadow 0.2s ease-in-out;
    outline: none;
}

.link-btn {
    background: none;
    color: #BFA181;
    font-family: Montserrat;
    font-size: 2vh;
    border: none;
    height: 3vh;
    width: 7vw;
    border-radius: 50px;
    transition: 0.3s;
    outline: none;
}

.link-btn:hover {
    background-color: white;
    color:#0A1828;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>