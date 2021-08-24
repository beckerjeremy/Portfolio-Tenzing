<template>
    <div>
        <span class="text-7xl text-pink font-title tracking-widest">Portfolio</span>

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