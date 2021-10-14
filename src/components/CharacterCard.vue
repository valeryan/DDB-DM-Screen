<template>
  <li class="ddb-campaigns-character-card-wrapper">
    <div class="card">
      <div class="ddb-campaigns-character-card-header-upper-portrait">
        <div class="image user-selected-avatar" :style="'background-image: url(' + character.avatarUrl + ');'"></div>
      </div>
      <div class="ddb-campaigns-character-card-header-upper-character-info">
        <div class="ddb-campaigns-character-card-header-upper-character-info-primary">
          {{ character.name }}
        </div>
        <div class="ddb-campaigns-character-card-header-upper-character-info-secondary">
          Lvl {{ character.level }} | {{ character.race.name }} | <span v-for="cl in character.classes" :key="cl.name">{{ cl.name }} {{ cl.subclassName != null ? '/ ' + cl.subclassName : '' }}</span>
        </div>
        <div class="ddb-campaigns-character-card-header-upper-character-info-secondary">
          {{ character.userName }}
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: {
      type: Object as PropType<CharacterData>,
      require: true,
    },
  },
});
</script>

<style lang="scss">
  .card {
    background: rgb(27, 27, 27);
  }
</style>
