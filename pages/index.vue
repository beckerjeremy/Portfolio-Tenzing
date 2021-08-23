<template>
  <div>
    <div class="flex justify-between p-24 absolute w-screen bottom-0">
      <NuxtLink class="flex-initial text-5xl text-pink-600" to="/portfolio">Work</NuxtLink>
      <NuxtLink class="flex-initial text-5xl text-indigo-600" to="/about">About</NuxtLink>
    </div>
    <TitleText />
  </div>
</template>

<script>
import TitleText from '../components/TitleText.vue'
export default {
  layout: 'landing',

  components: { TitleText },
  
}
</script>
