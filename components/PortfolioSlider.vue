<template>
    <div class="grid h-screen grid-rows-portfolio sticky" ref="wrapper">
        <p class="project-title text-blue text-5xl leading-portfolio pl-20 inline-block tracking-title">{{ title }}</p>
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

            this.scrollThreshhold = this.clamp(e.wheelDelta * 2, 300, 10000);

            if (this.hasContent(e.wheelDelta) && Math.abs(element.getBoundingClientRect().y) < this.scrollThreshhold) {
                window.scrollBy(0, element.getBoundingClientRect().y);
                e.preventDefault();
                this.setImageOffset(this.clamp(this.backgroundPosition += e.wheelDelta, this.startOffset - this.backgroundWidth, this.startOffset));
            }
        },

        hasContent(delta) {
            if (delta > 0 && this.backgroundPosition < this.startOffset) return true;
            if (delta < 0 && this.backgroundPosition > this.startOffset - this.backgroundWidth) return true;
            return false;
        },

        clamp: function (num, min, max) { return Math.min(Math.max(num, min), max) },

        setImageWidth: async function (src) {
            let imageWrapper = this.$refs.background;

            const img = new Image();
            img.onload = function () {
                let scale = imageWrapper.clientHeight / img.height;

                this.backgroundWidth = img.width * scale;
                console.log(this.backgroundWidth)
            };
            img.setAttribute('src', src);
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