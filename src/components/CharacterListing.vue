<template>
  <ul class="dms-character-container">
    <CharacterCard
      v-for="char in characters"
      :key="char.characterId"
      :character="char"
    >
    </CharacterCard>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { get, post } from "../utils";
import CharacterCard from "./CharacterCard.vue";
import { CharacterData, ActiveCharacter } from "../models/CharacterData";

const campaignIDRegex = /\/(\d+)\/*$/;
const campaignBaseURL = "https://www.dndbeyond.com/api/campaign";
const scdsBaseURL = "https://character-service-scds.dndbeyond.com/";

const getActiveCharacters = async () => {
  const campaignID = window.location.pathname.match(campaignIDRegex);
  const result = await get(
    `${campaignBaseURL}/stt/active-short-characters/${campaignID[1]}`
  );
  return result.data.data;
};

const getSCDSData = async (ids: number[]) => {
  const result = await post(scdsBaseURL + "v1/characters", {
    characterIds: ids,
  });
  return result.data.foundCharacters;
};

export default defineComponent({
  name: "CharacterListing",
  components: {
    CharacterCard,
  },
  setup: async () => {
    let characters = ref<CharacterData[]>([]);
    const fetchData = async () => {
      const activeChars: ActiveCharacter[] = await getActiveCharacters();

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
          ch.avatarUrl =
            ACChar.avatarUrl != ""
              ? ACChar.avatarUrl
              : "https://www.dndbeyond.com/content/1-0-1772-0/skins/waterdeep/images/characters/default-avatar.png";
          ch.userName = ACChar.userName;
          return ch;
        })
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
    };

    fetchData();
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
