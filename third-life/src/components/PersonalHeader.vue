
<template>
    <header>
      <nav class="container">
          <div class="logoContainer">
            <img src="../../public/logo.svg" class="logo"/>
            <p>F L O R I U M</p>
          </div>
          <div class="actionsContainer">
            <button @click="goToHome" class="link-btn">INÍCIO</button>
            <button @click="goToEditor" class="link-btn">EDITOR</button>
            <button @click="goToTable" class="link-btn">MESAS</button>
            <button @click="goToAbout" class="link-btn">SOBRE</button>
          </div>
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
    padding: 0vh 10vh 0vh 10vh;
    margin: 1vw 3vw 0vw 3vw;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.logo {
  width: 3vh;
}

.logoContainer {
  display: flex;
}

.logoContainer p {
  color: #BFA181;
  font-family: montserrat;
  font-weight: 500;
  font-size: 2vh;
  padding: none;
  margin-left: 2vh;
}

</style>