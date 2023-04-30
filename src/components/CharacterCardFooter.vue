<template>
  <div class="dms-footer" v-if="character">
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
          appState.campaign?.id +
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
          appState.campaign?.id +
          '/deactivate-character/' +
          character.characterId
        "
        >Deactivate</a
      >

      <div
        v-if="character.userId == appState.authUserId"
        class="ddb-campaigns-character-card-footer-links-more"
      >
        <div class="links">
          <div class="button-alt-group">
            <span
              class="
                ddb-campaigns-character-card-footer-links-item
                ddb-campaigns-character-card-footer-links-item-more
              "
            >
              More
            </span>
            <div class="button-alt-group-dropdown">
              <a
                class="
                  button-alt-group-item
                  modal-link
                  ddb-campaigns-character-card-footer-links-item-more-deactivate
                "
                :href="
                  '/campaigns/' +
                  appState.campaign?.id +
                  '/deactivate-character/' +
                  character.characterId
                "
                data-title="Deactivate Character"
                data-confirm-message="Are you sure you want to deactivate this character?"
                data-modal-class="t-deactivate-character-modal"
                >Deactivate</a
              >

              <a
                class="
                  button-alt-group-item
                  modal-link
                  ddb-campaigns-character-card-footer-links-item-more-remove
                "
                :href="
                  '/campaigns/' +
                  appState.campaign?.id +
                  '/remove-character/' +
                  character.characterId
                "
                data-title="Remove Character"
                data-confirm-message="Are you sure you want to remove this character?"
                data-modal-class="t-remove-character-modal"
                >Remove</a
              >
            </div>
          </div>
        </div>
      </div>

      <a
        v-else
        class="
          modal-link
          ddb-campaigns-character-card-footer-links-item
          ddb-campaigns-character-card-footer-links-item-remove
        "
        :href="
          '/campaigns/' +
          appState.campaign?.id +
          '/remove-character/' +
          character.characterId
        "
        data-title="Remove Character"
        data-confirm-message="Are you sure you want to remove this character?"
        data-modal-class="t-remove-character-modal"
        >Remove</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { CharacterData } from "../models/CharacterData";
import { defineComponent } from "vue";
import { appStore } from "../store/app-store";

export default defineComponent({
  name: "CharacterCardFooter",
  props: {
    character: {
      type: Object as () => CharacterData,
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
