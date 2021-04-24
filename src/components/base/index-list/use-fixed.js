import { ref, watch, nextTick, computed } from 'vue';

export default function useFixed(props) {
    const TITLE_HEIGHT = 30;
    const groupRef = ref(null);
    const listHeights = ref([]);
    const scrollY = ref(0);
    const currentIndex = ref(0);
    const distance = ref(0);

    const fixedTitle = computed(() => {
        if (scrollY.value < 0) {
            return '';
        }
        // 获取当前组得数据
        const currentGroup = props.data[currentIndex.value];
        return currentGroup ? currentGroup.title : '';
    });

    const fixedStyle = computed(() => {
        const distanceValue = distance.value;
        // 计算偏移量
        const diff =
            distanceValue > 0 && distanceValue < TITLE_HEIGHT
                ? distanceValue - TITLE_HEIGHT
                : 0;
        return {
            transform: `translate3d(0, ${diff}px, 0)`,
        };
    });
    watch(
        () => props.data,
        async () => {
            await nextTick();
            calculate();
        },
    );

    watch(scrollY, (newY) => {
        const listHeightValue = listHeights.value;
        for (let i = 0; i < listHeightValue.length - 1; i++) {
            const heightTop = listHeightValue[i];
            const heightBottom = listHeightValue[i + 1];
            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i;
                distance.value = heightBottom - newY;
            }
        }
    });

    function calculate() {
        const list = groupRef.value.children;
        let listHeightValue = listHeights.value;
        listHeightValue.length = 0; // 清零
        let height = 0;

        listHeightValue.push(height);

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight;
            listHeightValue.push(height);
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y;
    }

    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle,
    };
}
