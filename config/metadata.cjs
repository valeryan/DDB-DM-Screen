const { author, dependencies, repository, homepage, version } = require('../package.json');

module.exports = {
  name: 'D&DBeyond DM Screen',
  namespace: 'https://github.com/valeryan/DDB-DM-Screen/',
  version: version,
  author: author,
  source: repository.url,
  updateURL: `${homepage}/ddb-dm-screen.user.js`,
  license: `MIT; ${repository.url}/blob/master/LICENSE`,
  match: [
    'https://www.dndbeyond.com/campaigns/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/vue@${dependencies.vue}/dist/vue.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest'
  ],
  connect: [
    'dndbeyond.com'
  ],
  'run-at': 'document-end'
};
