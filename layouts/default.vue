<template>
    <div class="wrapper">
        <div class="fixed top-10 right-10 flex flex-col" @mouseleave="dropdownOpen = false">
            <span class="text-5xl font-bold text-pink font-title self-end logo"  @mouseenter="dropdownOpen = true"><NuxtLink to="/">TB</NuxtLink></span>
            <div class="flex flex-col" v-if="dropdownOpen">
                <NuxtLink class="flex-initial text-5xl text-blue font-title self-end" to="/studio">Studio</NuxtLink>
                <NuxtLink class="flex-initial text-5xl text-blue font-title self-end" to="/portfolio">Portfolio</NuxtLink>
                <NuxtLink class="flex-initial text-5xl text-blue font-title self-end" to="/about">About</NuxtLink>
            </div>
        </div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            dropdownOpen: false,
        }
    },
}
</script>

<style scoped>
    @-moz-keyframes rotate { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes rotate { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

    .wrapper {
        background-color: #000000;
        min-height: 100vh;
    }

    .logo {
        -webkit-animation:rotate 8s linear infinite;
        -moz-animation:rotate 8s linear infinite;
        animation:rotate 8s linear infinite;
    }
</style>