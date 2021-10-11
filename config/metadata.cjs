const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'D&DBeyond DM Screen',
  namespace: 'https://github.com/valeryan/DDB-DM-Screen/',
  version: version,
  author: author,
  source: repository.url,
  updateURL:`${repository.url}/raw/master/dist/ddb-dm-screen.user.js`,
  // 'license': 'MIT',
  match: [
    'https://www.dndbeyond.com/campaigns/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest',
    'GM.setValue',
    'GM.getValue'
  ],
  connect: [
    'dndbeyond.com'
  ],
  'run-at': 'document-end'
}
