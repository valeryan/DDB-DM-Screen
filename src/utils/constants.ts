const iDRegex = /\/(\d+)\/*$/;
const scdsUrl = 'https://character-service-scds.dndbeyond.com/v2/characters';
const baseUrl = 'https://www.dndbeyond.com';
const campaignBaseUrl = `${baseUrl}/api/campaign/stt`;
const campaignUrl = `${campaignBaseUrl}/active-campaigns`;
const activeCharacterUrl = `${campaignBaseUrl}/active-short-characters`;
const defaultAvatarUrl = `${baseUrl}/content/1-0-1772-0/skins/waterdeep/images/characters/default-avatar.png`;
const inviteFooterClass =
  'ddb-campaigns-invite-footer-item ddb-campaigns-invite-footer-item-copy-link';

export {iDRegex, scdsUrl, baseUrl, campaignUrl, activeCharacterUrl, defaultAvatarUrl, inviteFooterClass};
