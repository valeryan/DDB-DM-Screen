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
      <!-- Unassign or Deactivate -->
      <a
        v-if="character.userId == appState.authUserId"
        :href="
          '/campaigns/' +
          appState.campaign?.id +
          '/' +
          appState.inviteCode +
          '/unclaim-assigned-character'
        "
        v-on:click.prevent="unassign($event)"
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
        v-on:click.prevent="deactivate($event)"
        >Deactivate</a
      >
      <!-- /Unassign or Deactivate -->

      <!-- Dropdown or Remove -->
      <div
        v-if="character.userId == appState.authUserId"
        class="dms-footer-links-dropdown"
      >
        <button class="dms-footer-links-dropdown-btn">More</button>
        <div class="dms-footer-links-dropdown-content">
          <a
            :href="
              '/campaigns/' +
              appState.campaign.id +
              '/deactivate-character/' +
              character.characterId
            "
            v-on:click.prevent="deactivate($event)"
            >Deactivate</a
          >

          <a
            :href="
              '/campaigns/' +
              appState.campaign.id +
              '/remove-character/' +
              character.characterId
            "
            v-on:click.prevent="remove($event)"
            >Remove</a
          >
        </div>
      </div>

      <a
        v-else
        :href="
          '/campaigns/' +
          appState.campaign?.id +
          '/remove-character/' +
          character.characterId
        "
        v-on:click.prevent="remove($event)"
        >Remove</a
      >
      <!-- /Dropdown or remove -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { CharacterData } from "../models/CharacterData";
import { appStore } from "../store/app-store";
import { get } from "../utils/apiAdapter";

export default defineComponent({
  name: "CharacterCardFooter",
  props: {
    character: {
      type: Object as () => CharacterData,
      require: true,
    },
  },
  methods: {
    async showModal(header: string, msg: string, action: string) {
      const result = await get(action);
      console.log(result);
      this.confirm.require({
        message: msg,
        header: header,
        acceptLabel: "Confirm",
        rejectLabel: "Cancel",
        accept: () => {
          console.log(action);
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    unassign(ev: any) {
      this.showModal(
        "Unassign Character",
        "Are you sure you want to unassign this character? If the character is claimed by another player in your campaign, you will no longer be able to edit that character unless you are the DM of that character's campaign.",
        ev.target.href
      );
    },
    remove(ev: any) {
      this.showModal(
        "Remove Character",
        "Are you sure you want to remove this character?",
        ev.target.href
      );
    },
    deactivate(ev: any) {
      this.showModal(
        "Deactivate Character",
        "Are you sure you want to deactivate this character?",
        ev.target.href
      );
    },
  },
  setup: () => {
    const confirm = useConfirm();

    return {
      confirm: confirm,
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
      color: $link-color;
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
    }
    .dms-footer-links-dropdown {
      position: relative;
      display: inline-block;
      .dms-footer-links-dropdown-btn {
        background-color: transparent;
        color: $link-color;
        font-size: 13px;
        font-weight: bold;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        &::before {
          background-image: url(https://www.dndbeyond.com/content/1-0-1786-0/skins/waterdeep/images/icons/chevron-down-grey.svg);
          content: "";
          height: 14px;
          width: 14px;
          display: inline-block;
          background-size: cover;
          margin-right: 3px;
        }
      }
      .dms-footer-links-dropdown-content {
        display: none;
        position: absolute;
        background-color: rgb(27, 27, 27);
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        right: 0;
        a {
          color: rgb(180, 180, 180);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          &:hover {
            color: rgb(255, 255, 255);
          }
        }
      }
      &:hover .dms-footer-links-dropdown-content {
        display: block;
      }
    }
  }
}
</style>
