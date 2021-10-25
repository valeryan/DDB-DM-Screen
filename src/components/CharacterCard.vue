<template>
  <li class="dms-card">
    <CharacterCardHeader :character="character"></CharacterCardHeader>
    <CharacterCardFooter :character="character"></CharacterCardFooter>
  </li>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";
import CharacterCardHeader from "./CharacterCardHeader.vue";
import CharacterCardFooter from "./CharacterCardFooter.vue";
import { appStore } from "../store/app-store";

export default defineComponent({
  name: "CharacterCard",
  props: {
    character: {
      type: Object as PropType<CharacterData>,
      require: true,
    },
  },
  components: {
    CharacterCardHeader,
    CharacterCardFooter,
  },
  setup: () => {
    return {
      appState: appStore.getState(),
    };
  },
});
</script>

<style lang="scss">
.dms-character-container {

  .dms-card {
    border-left: 1px solid #d1cdca;
    border-right: 1px solid #d1cdca;
    border-top: 1px solid #d1cdca;
    background: #fff;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      left: -1px;
      right: -1px;
      height: 12px;
      background-image: url("https://www.dndbeyond.com/content/1-0-1784-0/skins/waterdeep/images/ddb-borders-med.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
