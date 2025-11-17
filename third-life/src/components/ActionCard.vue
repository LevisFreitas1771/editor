<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>

.container {
    width: 17vw;
    height: 80vh;
    background-color: #EAEAEA;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3vh;
    border: 1px solid #999999;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
}
</style>