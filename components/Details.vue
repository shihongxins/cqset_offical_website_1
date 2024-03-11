<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    open?: boolean;
    icon?: boolean;
    summary?: string;
    content?: string;
  }>(), {
  icon: true,
});
const emit = defineEmits(['update:open', 'toggle']);
const _state = ref(props.open);
const state = computed({
  get: () => {
    return _state.value || props.open || null;
  },
  set: (newState) => {
    _state.value = Boolean(newState);
    emit('update:open', newState);
    emit('toggle', newState);
  }
});
const toggleDetails = () => {
  _state.value = !state.value;
}
</script>

<template>
  <div class="details" :open="state">
    <div class="details__summary" @click="toggleDetails">
      <slot name="summary">{{ summary }}</slot>
      <div class="details__icon" v-if="icon">
        <slot name="icon">
          <i></i>
        </slot>
      </div>
    </div>
    <div class="details__content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  padding: 0.5rem;

  &__summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    margin-left: auto;

    >i {
      display: inline-block;
      padding: 0.5rem;
      width: 1rem;
      height: 1rem;
      position: relative;
      transform: rotate(0deg);
      transition: transform 0.3s ease-out;

      &::before,
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        margin: auto;
        width: 0.8em;
        height: 2px;
        background-color: currentColor;
        transition: all 0.3s ease-out;
      }

      &::after {
        width: 0.7em;
        transform: rotate(90deg);
        opacity: 1;
      }
    }

  }

  &__content {
    padding: 0.5rem;
    max-height: 0px;
    overflow: hidden;
    transition: max-height .5s ease-out;
  }

  &[open] {
    .details__icon>i {
      transform: rotate(180deg);

      &::after {
        opacity: 0;
      }
    }

    .details__content {
      max-height: 1000px;
    }
  }
}
</style>
