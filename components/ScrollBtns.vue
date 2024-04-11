<script setup>
const props = defineProps({
  visibleBtnUp: {
    type: Boolean,
    default: true,
  },
  visibleBtnDown: {
    type: Boolean,
    default: true,
  },
  visibleOffset: {
    type: Number,
    default: 0,
  },
});

const popper = {
  arrow: false,
  placement: 'left',
}

const handleScroll = (direction = 'up') => {
  const scrollElem = document.scrollingElement || document.documentElement;
  scrollElem.scrollTop = direction === 'up' ? 0 : scrollElem.scrollHeight;
};

const visible = ref(false);
const handleVisible = () => {
  const scrollElem = document.scrollingElement || document.documentElement;
  const visibleOffset = props.visibleOffset || window.innerHeight;
  visible.value = scrollElem.scrollTop > visibleOffset;
};

onMounted(() => {
  window.addEventListener('scroll', handleVisible);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleVisible);
});
</script>

<template>
  <aside class="scroll-btns flex flex-col fixed right-4 bottom-16 md:bottom-8 md:right-8 lg:right-12 lg:bottom-16"
    v-show="visible">
    <UPopover mode="hover" :popper="popper" v-if="visibleBtnUp">
      <UButton icon="i-heroicons-chevron-up" size="sm" color="sky" variant="soft" v-bind="$attrs"
        @click="handleScroll('up')"></UButton>
      <template #panel>
        <span class="p-2 truncate text-sm text-sky-500">滚动到顶部</span>
      </template>
    </UPopover>
    <UPopover mode="hover" :popper="popper" v-if="visibleBtnDown">
      <UButton icon="i-heroicons-chevron-down" size="sm" color="sky" variant="soft" v-bind="$attrs"
        @click="handleScroll('down')"></UButton>
      <template #panel>
        <span class="p-2 truncate text-sm text-sky-500">滚动到底部</span>
      </template>
    </UPopover>
  </aside>
</template>
