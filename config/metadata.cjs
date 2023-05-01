const { author, dependencies, repository, homepage, version } = require('../package.json');

module.exports = {
  name: 'D&DBeyond DM Screen',
  namespace: 'https://github.com/valeryan/DDB-DM-Screen/',
  version,
  author,
  source: repository.url,
  updateURL: `${homepage}/ddb-dm-screen.user.js`,
  license: `MIT; ${repository.url}/blob/master/LICENSE`,
  match: [
    'https://www.dndbeyond.com/campaigns/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/vue@${dependencies.vue}/dist/vue.global.prod.js`,
    `https://cdn.jsdelivr.net/npm/jwt-decode@${dependencies['jwt-decode']}/build/jwt-decode.js`,
    `https://cdn.jsdelivr.net/npm/@trim21/gm-fetch@${dependencies['@trim21/gm-fetch']}/dist/gm_fetch.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest'
  ],
  connect: [
    'dndbeyond.com'
  ],
  'run-at': 'document-end'
};
