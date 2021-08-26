<template>
    <div>
        <h2 class="text-9xl text-pink font-title tracking-widest py-32 px-10">Portfolio</h2>

        <portfolio-slider src="/slide1.jpg" title="Project 1" />
        <portfolio-slider src="/slide1.jpg" title="Project 2" />
        <portfolio-slider src="/slide1.jpg" title="Project 3" />
        <portfolio-slider src="/slide1.jpg" title="Project 4" />
    </div>
</template>

<script>
import PortfolioSlider from '../components/PortfolioSlider.vue'
export default {
  components: { PortfolioSlider },
}
</script>