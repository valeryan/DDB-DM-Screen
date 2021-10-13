<template>
  <suspense>
    <template #default>
      <CharacterListing></CharacterListing>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";

import CharacterListing from "./CharacterListing.vue";

export default defineComponent({
  name: "App",
  components: {
    CharacterListing,
  },
  setup: () => {
    onMounted(() => {
      console.log("App mounted");
    });
  },
});
</script>
