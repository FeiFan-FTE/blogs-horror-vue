<!--
 * @Author: feifan
 * @Date: 2020-12-03 16:29:09
 * @LastEditors: feifan
 * @LastEditTime: 2020-12-03 16:51:43
-->
<template>
    <div class="v-marquee" @click="$emit('click',$event)">
        <div :style="{'animation-duration':time,'animation-name':name}" :class="animate?'running':'pause'">
            <slot>
                <div v-html="content"></div>
            </slot>
        </div>
    </div>
</template>
<script>
let count = 0;
export default {
    name: 'VTextMarquee',
    props: {
        speed: {
            type: Number,
            default: 50,
        },
        content: String,
        animate: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        count++;
        return {
            time: 0,
            name: 'marquee' + count,
            styleEl: document.createElement('style'),
        };
    },
    watch: {
        content() {
            this.start();
        },
        speed() {
            this.start();
        },
    },
    methods: {
        getTime() {
            return Math.max(this.$el.firstChild.offsetWidth, this.$el.offsetWidth) / this.speed + 's';
        },
        prefix(key, value) {
            return ['-webkit-', '-moz-', '-ms-', ''].map(el => `${el + key}:${value};`).join('');
        },
        keyframes() {
            const from = this.prefix('transform', `translateX(${this.$el.offsetWidth}px)`);
            const to = this.prefix('transform', `translateX(-${this.$el.firstChild.offsetWidth}px)`);
            const v = `@keyframes ${this.name} {
                from { ${from} }
                to { ${to} }
            }`;
            this.styleEl.innerHTML = v;
            document.head.appendChild(this.styleEl);
        },
        start() {
            this.$nextTick(() => {
                this.time = this.getTime();
                this.keyframes();
            });
        },
    },
    mounted() {
        this.start();
    },
}
</script>
<style lang="less" scoped>
.v-marquee {
    white-space: nowrap;
    overflow: hidden;

    >div {
        display: inline-block;
        animation: marquee linear infinite;
    }

    .pause {
        animation-play-state: paused;
    }

    .running {
        animation-play-state: running;
    }
}
</style>