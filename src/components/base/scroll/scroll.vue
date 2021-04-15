<template>
    <div ref="rootRef">
        <slot></slot>
    </div>
</template>

<script>
import { ref } from 'vue';
import UseScroll from './use-scroll';
export default {
    name: 'scroll',
    props: {
        click: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const rootRef = ref(null);
        UseScroll(rootRef, props);

        return {
            rootRef,
        };
    },
};
</script>

<style lang="scss" scoped></style>
