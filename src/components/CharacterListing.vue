<template>
  <div class="character-list">
    <CharacterCard v-for="char in chracters" :key="char.characterId" :character="char"> </CharacterCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { get, post } from "../utils";
import CharacterCard from "./CharacterCard.vue";

const campaignIDRegex = /\/(\d+)\/*$/;
const campaignBaseURL = "https://www.dndbeyond.com/api/campaign";
const scdsBaseURL = "https://character-service-scds.dndbeyond.com/";

const getActiveCharacters = async () => {
  const campaignID = window.location.pathname.match(campaignIDRegex);
  const result = await get(
    `${campaignBaseURL}/stt/active-short-characters/${campaignID[1]}`
  );
  return result.data.data.map((ch: { id: any }) => {
    return ch.id;
  });
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
    let chracters = ref([]);

    const activeChars = await getActiveCharacters();
    chracters = await getSCDSData(activeChars);
    console.log(chracters);

    return {
      chracters,
    };
  },
});
</script>
