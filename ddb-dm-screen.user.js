// ==UserScript==
// @name            D&DBeyond DM Screen
// @namespace       https://github.com/valeryan/DDB-DM-Screen/
// @version         1.0.0
// @description     Advanced DM screen for D&DBeyond campaigns
// @author          Valeryan
// @match           https://www.dndbeyond.com/campaigns/*
// @updateURL       https://github.com/valeryan/DDB-DM-Screen/raw/master/ddb-dm-screen.user.js
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require         https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @license         MIT; https://github.com/valeryan/DDB-DM-Screen/blob/master/LICENSE
// ==/UserScript==
console.log("D&DBeyond DM Screen Starting");

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//        Script Globals
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const $ = window.jQuery;
const axios = window.axios.default;
const charIDRegex = /\/(\d+)\/*$/;
const campaignIDRegex = /\/(\d+)\/*$/;
const activeCharactersBaseURL = 'https://www.dndbeyond.com/api/campaign/stt/active-short-characters/';
const authURL = 'https://auth-service.dndbeyond.com/v1/cobalt-token';
const scdsBaseURL = 'https://character-service-scds.dndbeyond.com/';

const getSCDSData = async (characters) => {
    var result = await axios.post(scdsBaseURL + 'v1/characters', {characterIds: characters});
    return result.data.foundCharacters;
}

const getActiveCharacters = async () => {
    var campaignID = window.location.pathname.match(campaignIDRegex);
    var result = await axios.get(activeCharactersBaseURL + campaignID[1])
    return result.data.data.map(function (ch) { return ch.id});
}

const authenticate = async () => {
    var result = await axios.post(authURL, {}, {withCredentials: true});
    return result.data.token;
}

(async () => {
    const token = await authenticate();
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    const activeChars = await getActiveCharacters();
    const scdsData = await getSCDSData(activeChars);
    console.log(scdsData);
})();
