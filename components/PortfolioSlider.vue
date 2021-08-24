<template>
    <div class="grid h-screen grid-rows-portfolio sticky" ref="wrapper">
        <span class="project-title text-blue text-5xl leading-portfolio">{{ title }}</span>
        <div class="h-full image-wrapper bg-no-repeat" :style="'background-image:url(' + src + ')'" ref="background"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'src'],

    data: function () {
        return {
            backgroundWidth: 2500,
            backgroundPosition: 0,
            startOffset: 0,
            scrollThreshhold: 300,
        }
    },
    
    mounted () {
        this.startOffset = window.innerWidth / 2;
        this.setImageOffset( this.startOffset );
        this.setImageWidth( this.src ).then(() =>{
            window.addEventListener('mousewheel', this.onScroll, { passive: false });
        });
    },

    beforeDestroy () {
        window.removeEventListener('mousewheel', this.onScroll);
    },

    methods: {
        onScroll: function (e) {
            let element = this.$refs.wrapper;

            this.scrollThreshhold = (Math.abs(e.wheelDelta) + 100);

            // Scroll up
            if (e.wheelDelta > 0 && element.getBoundingClientRect().y >= - e.wheelDelta && element.getBoundingClientRect().y < 0) {
                e.preventDefault();
                window.scrollBy(0, element.getBoundingClientRect().y);
            }

            // Scroll down
            if (e.wheelDelta < 0 && element.getBoundingClientRect().y <= - e.wheelDelta && element.getBoundingClientRect().y > 0) {
                e.preventDefault();
                window.scrollBy(0, element.getBoundingClientRect().y);
            }

            console.log(this.title, element.getBoundingClientRect().y)

            if (element.getBoundingClientRect().y == 0) {
                if (e.wheelDelta > 0 && this.backgroundPosition < this.startOffset || e.wheelDelta < 0 && this.backgroundPosition > this.startOffset - this.backgroundWidth || e.wheelDelta == 0) {
                    e.preventDefault();
                    this.setImageOffset(this.clamp(this.backgroundPosition += e.wheelDelta, this.startOffset - this.backgroundWidth, this.startOffset));
                }
            }
        },

        clamp: function (num, min, max) { return Math.min(Math.max(num, min), max) },

        setImageWidth: async function (src) {
            let image = new Image();

            image.onload = function () {
                this.backgroundWidth = image.width;
            };

            image.scr = src;
        },

        setImageOffset: function (offset) {
            this.backgroundPosition = offset;
            let background = this.$refs.background;
            background.style.backgroundPosition =  offset + 'px 0px ';
        }
    }
}
</script>

<style scoped>
    .image-wrapper {
        background-size: cover;
    }
</style>