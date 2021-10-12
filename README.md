# DDB DM Screen
This Tampermonkey userscript that enhances the campaign page on dndbeyond.com. It adds extra character data to the character cards to function like a DM screen.

## Usage

1. Install Tampermonkey addon for managing userscripts. Get [Tampermonkey](https://www.tampermonkey.net/)
2. Install new script from below link: https://valeryan.github.io/DDB-DM-Screen/ddb-dm-screen.user.js
3. Open your campaign, can be found here https://dndbeyond.com/my-campaigns
4. When a release is published it will be automatically published to the github page and should prompt to update the installed script.

## Features
1. Uses publicly accessible API endpoints and a tool called Simplified Character Data System(SCDS) to display extra information about characters on your campaign screen.

## Security

Remember to never paste unknown userscripts from some shady github repos to your tampermonkey addon as this can severely compromise your PC.

## Note about other DM Screen Scripts
There are several such user scripts around and some Chrome extensions, etc. I draw inspiration from all these.

## Development

The development method is based on [webpack-usersript-template](https://github.com/Trim21/webpack-userscript-template).
Development of this script requires a Chrome base browser for file system access by Tampermonkey.

### Setup
1. Allow Tampermonkey's access to local file URIs in Chrome, follow [tampermonkey/faq](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
2. Run the command `npm run dev`
2. install deps with `npm i` or `npm ci`.
3. `npm run dev` to start your development.
4. open `webpack-userscript-template/dist/ddb-dm-screen.dev.user.js` in your Chrome browser and install it with your userscript manager.

this userscript's meta contains `// @require file://path/to/dist/ddb-dm-screen.debug.user.js`,
which take [src/index.ts](./src/index.ts) as entry point.

every times you edit your metadata, you'll have to install it again,
because Tampermonkey does not read it from dist every times.

5. edit [src/index.ts](./src/index.ts)

livereload is enabled by default, use [this chrome extension](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei)

### dependencies

Add dependencies to your [user script metadata's require section](./config/metadata.cjs#L13-L17) , and exclude them in [config/webpack.config.base.cjs](./config/webpack.config.base.cjs#L18-L20)

## Deployment

[github actions](./.github/workflows/deploy.yaml#L36) will deploy production userscript to this projects [gh-pages](https://valeryan.github.io/DDB-DB-Screen/).
