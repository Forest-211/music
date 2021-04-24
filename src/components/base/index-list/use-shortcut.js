import { ref, computed } from 'vue';

export default function useShortcut(props, groupRef) {
    const ANCHOR_HEIGHT = 18;
    const scrollRef = ref(null);
    const touch = {};

    const shortcutList = computed(() => props.data.map((group) => group.title));

    // 实现右侧点击字母切换
    function onShortcutTouchStart(e) {
        const anchorIndex = parseInt(e.target.dataset.index);
        touch.y1 = e.touches[0].pageY;
        touch.anchorIndex = anchorIndex;
        scrollTo(anchorIndex);
    }

    // 实现手指滑动切换
    function onShortcutTouchMove(e) {
        touch.y2 = e.touches[0].pageY;
        const delte = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
        const anchorIndex = touch.anchorIndex + delte;
        scrollTo(anchorIndex);
    }

    function scrollTo(index) {
        if (isNaN(index)) return;
        index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
        const targetElement = groupRef.value.children[index];
        const scroll = scrollRef.value.scroll;
        scroll.scrollToElement(targetElement, 0);
    }
    return {
        shortcutList,
        scrollRef,
        onShortcutTouchStart,
        onShortcutTouchMove,
    };
}
