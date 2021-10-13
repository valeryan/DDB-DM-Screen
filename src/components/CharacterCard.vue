<template>
  <div>{{ character.name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: {
      type: Object,
      require: true
    }
  }
});
</script>
