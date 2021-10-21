<template>
  <div class="dms-footer">
    <div class="dms-footer-links">
      <a
        :href="
          '/profile/' +
          character.userName +
          '/characters/' +
          character.characterId
        "
        >View</a
      >
      <a
        :href="
          '/profile/' +
          character.userName +
          '/characters/' +
          character.characterId +
          '/builder'
        "
        >Edit</a
      >
      <a
        v-if="character.userId == appState.authUserId"
        :href="
          '/campaigns/' +
          appState.campaign.id +
          '/' +
          appState.inviteCode +
          '/unclaim-assigned-character'
        "
        >Unassign</a
      >
      <a
        v-else
        :href="
          '/campaigns/' +
          appState.campaign.id +
          '/deactivate-character/' +
          character.characterId
        "
        >Deactivate</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent, PropType } from "vue";
import { appStore } from "../store/app-store";

export default defineComponent({
  name: "CharacterCardFooter",
  props: {
    character: {
      type: Object as PropType<CharacterData>,
      require: true,
    },
  },
  setup: () => {
    return {
      appState: appStore.getState(),
    };
  },
});
</script>
<style lang="scss">
.dms-footer {
  border-top: 1px solid #dedede;
  padding: 0 20px;
  .dms-footer-links {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
      display: flex;
      align-items: flex-start;
      color: #1b9af0;
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}
</style>
