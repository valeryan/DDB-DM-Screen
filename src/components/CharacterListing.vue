<template>
  <ul class="dms-character-container">
    <CharacterCard v-for="char in characters" :key="char.characterId" :character="char">
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
import CharacterCard from "./CharacterCard.vue";
import { CharacterData, ActiveCharacter } from "../models/CharacterData";
import { appStore } from "../store/app-store";
import { get, post } from "../utils/apiAdapter";
import { constants } from "../utils";

interface CampaignResponse {
  id: number;
  dmId: number;
  dmUsername: string;
  name: string;
  playerCount: number;
}

interface simpleCharacterResponse {
  foundCharacters: CharacterData[];
  queuedIds: number[];
  notFoundIds: number[];
}

const getActiveCharacters = async (campaignID: number) => {
  const result = await get<ActiveCharacter[]>(
    `${constants.activeCharacterUrl}/${campaignID}`
  );
  return result;
};

const getSimpleCharacterData = async (ids: number[]) => {
  const result = await post<simpleCharacterResponse>(constants.scdsUrl, {
    characterIds: ids,
  });
  return result.foundCharacters;
};

const setInviteCode = () => {
  const inviteElements = document.getElementsByClassName(
    constants.inviteFooterClass
  );
  if (!inviteElements || inviteElements.length < 1) {
    return;
  }

  const inviteUrl = inviteElements[0].attributes.getNamedItem("data-clipboard-text")?.value;
  if (!inviteUrl) {
    return;
  }

  const inviteMatch = inviteUrl.match(constants.iDRegex);
  if (!inviteMatch || inviteMatch.length < 2) {
    return;
  }

  const inviteCode = parseInt(inviteMatch[1]);
  appStore.setInviteCode(inviteCode);
};

const setCampaignData = async (campaignID: number) => {
  const result = await get<CampaignResponse>(
    `${constants.campaignUrl}/${campaignID}`
  );
  const campaign = result;
  appStore.setCampaign(campaign);
};

export default defineComponent({
  name: "CharacterListing",
  components: {
    ConfirmDialog,
    CharacterCard,
  },
  setup: async () => {
    let characters = ref<CharacterData[]>([]);

    // Campaign phase
    const campaignIdMatch = window.location.pathname.match(constants.iDRegex);
    if (!campaignIdMatch) {
      return {
        characters,
      };
    }
    const campaignID = parseInt(campaignIdMatch[1]);

    setInviteCode();
    setCampaignData(campaignID);

    // Character phase
    const fetchData = async () => {
      const activeChars: ActiveCharacter[] = await getActiveCharacters(
        campaignID
      );
      console.log(activeChars);
      const charIds = activeChars.map((ch) => {
        return ch.id;
      });

      let simpleCharacters: CharacterData[] = await getSimpleCharacterData(charIds);

      simpleCharacters = simpleCharacters.filter((ch) => {
        return ch.isAssignedToPlayer;
      });

      characters.value = simpleCharacters
        .map((ch) => {
          const active = activeChars.find((el) => {
            return el.id === ch.characterId;
          });

          const avatarUrl =
            active && active.avatarUrl
              ? active.avatarUrl
              : constants.defaultAvatarUrl;
          const userName = active && active.userName ? active.userName : "Unknown";

          ch.avatarUrl = avatarUrl;
          ch.userName = userName;
          return ch;
        })
        .sort((a, b) => {
          const aName = a && a.name ? a.name : "";
          const bName = b && b.name ? b.name : "";
          return aName.localeCompare(bName);
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
