<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue';
const props = withDefaults(
  defineProps<{
    name?: string;
    open?: boolean;
    autoClose?: boolean;
    icon?: boolean;
    summary?: string;
    content?: string;
  }>(), {
  icon: true,
});
const name = ref(props.name);
const emit = defineEmits(['update:open', 'show', 'close', 'toggle']);
const _state = ref(props.open);
const state = computed({
  get: () => {
    return _state.value || props.open || null;
  },
  set: (newState) => {
    _state.value = Boolean(newState);
    emit('update:open', newState);
    emit('toggle', newState);
    handleAccordion();
  }
});
const show = () => {
  state.value = true;
}
const close = () => {
  state.value = null;
}
const toggle = () => {
  state.value ? close() : show();
}
const handleAutoClose = () => {
  if (props.autoClose && state.value) {
    close();
  }
}

const instance = getCurrentInstance();
onMounted(() => {
  if (instance && instance.vnode.el) {
    instance.vnode.el.vm = instance;
  }
});
const handleAccordion = async () => {
  if (state.value) {
    await nextTick();
    const details = document.querySelectorAll(`.details[open][name='${name.value}']`);
    for (let i = 0; i < details.length; i++) {
      const vm: ComponentInternalInstance = (details[i] as any).vm;
      if (vm && vm !== instance) {
        vm.exposed!.toggle();
      }
    }
  }
}
defineExpose({
  name,
  state,
  show,
  close,
  toggle,
});
</script>

<template>
  <div class="details" :name="name" :open="state">
    <div class="details__summary" @click="toggle">
      <slot name="summary">{{ summary }}</slot>
      <slot name="icon" v-if="icon">
        <i class="details__icon"></i>
      </slot>
    </div>
    <div class="details__content" @click="handleAutoClose">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  padding: 0.5rem;
  background: inherit;

  &__summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__icon {
    margin-left: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      display: list-item;
      list-style: disclosure-closed inside;
      margin-left: 8px;
      cursor: pointer;
    }
  }

  &__content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height .5s ease-out;
  }

  &[open] {
    .details__icon::before {
      list-style: disclosure-open inside;
    }

    .details__content {
      max-height: unset;
    }
  }
}
</style>
