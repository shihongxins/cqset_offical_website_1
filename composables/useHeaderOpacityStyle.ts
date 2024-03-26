export const useHeaderOpacityStyle = () => {
  const opacity = ref(1);
  const headerOpacityStyle = computed(() => ({
    '--tw-bg-opacity': opacity.value.toString(),
  }));
  const { y } = useWindowScroll();
  const effect = () => {
    const isPC = useMediaQuery('(min-width: 1024px)');
    opacity.value = isPC.value ? Math.min(1, (y.value + 100) / 300) : 1;
  }
  const unWatch = watch(y, effect);
  onMounted(effect);
  onUnmounted(unWatch);
  return {
    opacity,
    headerOpacityStyle,
    effect,
    unWatch,
  }
}
