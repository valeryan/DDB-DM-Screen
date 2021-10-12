import Vue from 'vue';
import Card from './templates/Card.vue';

import { get, post } from "./utils";
import "./style/main.scss";

const campaignIDRegex = /\/(\d+)\/*$/;
const campaignBaseURL = "https://www.dndbeyond.com/api/campaign";
const scdsBaseURL = "https://character-service-scds.dndbeyond.com/";

const getActiveCharacters = async () => {
  const campaignID = window.location.pathname.match(campaignIDRegex);
  const result = await get(
    `${campaignBaseURL}/stt/active-short-characters/${campaignID[1]}`
  );
  return result.data.data.map(function (ch: any) {
    return ch.id;
  });
};

const getSCDSData = async (ids: number[]) => {
  const result = await post(scdsBaseURL + "v1/characters", {
    characterIds: ids,
  });
  return result.data.foundCharacters;
};

async function main() {
  const activeChars = await getActiveCharacters();
  const scdsData = await getSCDSData(activeChars);
  console.log(scdsData);
}

main().catch((e) => {
  console.log(e);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = new Vue({
  el: '.listing-body',
  render: h => h(Card)
});
