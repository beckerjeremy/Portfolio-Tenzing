<template>
  <div>
    <div class="flex justify-between p-24 absolute w-screen bottom-0">
      <div @mouseleave="dropdownOpen = false">
        <div v-if="dropdownOpen" class="flex flex-col">
          <NuxtLink class="flex-initial text-5xl text-blue font-title" to="/studio">Studio</NuxtLink>
          <NuxtLink class="flex-initial text-5xl text-blue font-title" to="/portfolio">Portfolio</NuxtLink>
        </div>
        <span class="flex-initial text-5xl text-pink font-title" to="/portfolio" @mouseenter="dropdownOpen = true">Work</span>
      </div>
      <NuxtLink class="flex-initial text-5xl text-blue font-title self-end" to="/about">About</NuxtLink>
    </div>
    <TitleText />
  </div>
</template>

<script>
import TitleText from '../components/TitleText.vue'
export default {
  layout: 'landing',

  components: { TitleText },

  data: function () {
        return {
            dropdownOpen: false,
        }
    },
  
}
</script>
