export const useHeaderOpacityStyle = () => {
  const opacity = ref(1);
  const headerOpacityStyle = computed(() => ({
    '--tw-bg-opacity': opacity.value.toString(),
  }));
  const { y } = useWindowScroll();
  const effect = () => {
    opacity.value = Math.min(1, (y.value + 100) / 300);
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
