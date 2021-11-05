<template>
  <ul class="dms-character-container">
    <CharacterCard
      v-for="char in characters"
      :key="char.characterId"
      :character="char"
    >
    </CharacterCard>
  </ul>
  <ConfirmDialog
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
  ></ConfirmDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import { get, post } from "../utils";
import CharacterCard from "./CharacterCard.vue";
import { CharacterData, ActiveCharacter } from "../models/CharacterData";
import { appStore } from "../store/app-store";
import * as constants from "../constants";

const getActiveCharacters = async (campaignID: number) => {
  const result = await get(
    `${constants.campaignBaseURL}/stt/active-short-characters/${campaignID}`
  );
  return result.data.data;
};

const getSCDSData = async (ids: number[]) => {
  const result = await post(constants.scdsBaseURL + "v1/characters", {
    characterIds: ids,
  });
  return result.data.foundCharacters;
};

const setInviteCode = () => {
  const inviteUrl = document
    .getElementsByClassName(
      "ddb-campaigns-invite-footer-item ddb-campaigns-invite-footer-item-copy-link"
    )[0]
    .attributes.getNamedItem("data-clipboard-text").value;
  const inviteCode = parseInt(inviteUrl.match(constants.iDRegex)[1]);
  appStore.setInviteCode(inviteCode);
};

const setCampaignData = async (campaignID: number) => {
  const result = await get(
    `${constants.campaignBaseURL}/stt/active-campaigns/${campaignID}`
  );
  const campaign = result.data.data;
  appStore.setCampaign(campaign);
};

export default defineComponent({
  name: "CharacterListing",
  components: {
    ConfirmDialog,
    CharacterCard,
  },
  setup: async () => {
    const campaignID = parseInt(window.location.pathname.match(constants.iDRegex)[1]);

    setInviteCode();
    setCampaignData(campaignID);

    let characters = ref<CharacterData[]>([]);

    const fetchData = async () => {
      const activeChars: ActiveCharacter[] = await getActiveCharacters(
        campaignID
      );
      console.log(activeChars);
      const charIds = activeChars.map((ch) => {
        return ch.id;
      });
      let scdsChars: CharacterData[] = await getSCDSData(charIds);

      scdsChars = scdsChars.filter((ch) => {
        return ch.isAssignedToPlayer;
      });

      characters.value = scdsChars
        .map((ch) => {
          const ACChar = activeChars.find((el) => {
            return el.id === ch.characterId;
          });
          ch.userName = ACChar.userName;
          return ch;
        })
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
    };

    await fetchData();

    console.log(characters.value);
    setInterval(fetchData, 30000);

    return {
      characters,
    };
  },
});
</script>

<style lang="scss">
.dms-character-container {
  display: grid;
  grid-gap: 10px;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  list-style: none;
  grid-template-columns: repeat(1, 1fr);
  @media screen and (min-width: 740px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
