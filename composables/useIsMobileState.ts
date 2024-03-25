const isMobile = useMediaQuery('(max-width:640px)');

export const useIsMobileState = () => {
  const state = ref(true);
  const effect = () => {
    state.value = isMobile.value;
  }
  const unWatch = watch(isMobile, effect);
  onMounted(effect);
  onUnmounted(unWatch);
  return {
    isMobile,
    state,
    effect,
    unWatch,
  };
}
