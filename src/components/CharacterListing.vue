<template>
  <ul class="ddbdms-character-list">
    <CharacterCard v-for="char in characters" :key="char.characterId" :character="char"> </CharacterCard>
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

    const activeChars: ActiveCharacter[] = await getActiveCharacters();

    const charIds = activeChars.map((ch) => {
      return ch.id;
    });
    const scdsChars: CharacterData[] = await getSCDSData(charIds);

    scdsChars.map((ch) => {
      const ACChar = activeChars.find((el) => { return el.id === ch.characterId });
      ch.avatarUrl = ACChar.avatarUrl;
      ch.userName = ACChar.userName;
      characters.value.push(ch);
    });

    console.log(characters.value);

    return {
      characters,
    };
  },
});
</script>

<style lang="scss">
</style>
