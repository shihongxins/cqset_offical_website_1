export const useHeaderOpacityStyle = () => {
  const opacity = ref(1);
  const headerOpacityStyle = computed(() => ({
    '--tw-bg-opacity': opacity.value.toString(),
  }));
  const { y } = useWindowScroll();
  const { state: isMobile } = useIsMobileState();
  const effect = () => {
    opacity.value = Math.max(isMobile.value ? 0.7 : 0.5, Math.min(y.value / window.innerHeight, 1));
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
