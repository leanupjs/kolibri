import { promises as fs } from 'fs';

import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { JsonDocs, OutputTarget } from '@stencil/core/internal';
import { reactOutputTarget } from '@stencil/react-output-target';
import { solidOutputTarget } from '@stencil/solid-output-target';
// import { vueOutputTarget } from '@stencil/vue-output-target';
// import { svelteOutputTarget } from '@stencil/svelte-output-target';

const TAGS = ['lean-input-adapter'];
const EXCLUDE_TAGS = [];
const BUNDLES: {
	components: string[];
}[] = [];
TAGS.forEach((tag) => {
	BUNDLES.push({
		components: [tag],
	});
});
// console.log(TAGS, TAGS.length);

// const util = require('util');
// async function generateCSPHashes(config: Config, compilerCtx: any, buildCtx: any, docs: any): Promise<void> {
//   // console.log('config', config.bundles);
//   // console.log('compilerCtx', util.inspect(compilerCtx.moduleMap, { depth: 1 }));
//   console.log('buildCtx', util.inspect(buildCtx.components, { depth: 1 }));
//   return new Promise((resolve: Function) => {
//     // require('./hashing')();
//     resolve();
//   });
// }

async function generateCustomElementsJson(docsData: JsonDocs) {
	const jsonData = {
		version: require('./package.json').version,
		tags: docsData.components.map((component) => ({
			name: component.tag,
			// path: component.filePath,
			description: component.docs,

			attributes: component.props
				.filter((prop) => prop.attr)
				.map((prop) => ({
					name: prop.attr,
					type: prop.type,
					description: prop.docs,
					defaultValue: prop.default,
					required: prop.required,
				})),

			events: component.events.map((event) => ({
				name: event.event,
				description: event.docs,
			})),

			methods: component.methods.map((method) => ({
				name: method.name,
				description: method.docs,
				signature: method.signature,
			})),

			slots: component.slots.map((slot) => ({
				name: slot.name,
				description: slot.docs,
			})),

			cssProperties: component.styles
				.filter((style) => style.annotation === 'prop')
				.map((style) => ({
					name: style.name,
					description: style.docs,
				})),

			cssParts: component.parts.map((part) => ({
				name: part.name,
				description: part.docs,
			})),
		})),
	};

	await fs.writeFile('./custom-elements.json', JSON.stringify(jsonData, null, 2));
}

let outputTargets: OutputTarget[] = [
	{
		type: 'dist',
		copy: [
			{
				src: 'assets',
			},
		],
	},
	{
		type: 'www',
		serviceWorker: null,
		copy: [
			{
				src: 'assets',
			},
		],
	},
	// {
	//   type: 'custom',
	//   name: 'CSP',
	//   generator: generateCSPHashes,
	// },
];
if (process.env.NODE_ENV === 'production') {
	outputTargets = outputTargets.concat([
		angularOutputTarget({
			componentCorePackage: '@leanup/kolibri-components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/src/components.ts',
			includeImportCustomElements: false,
		}),
		// preactOutputTarget({
		//   componentCorePackage: '@leanup/kolibri-components',
		//   excludeComponents: EXCLUDE_TAGS,
		//   proxiesFile: '../adapters/preact/src/adapter/index.ts',
		//   includeDefineCustomElements: false,
		// }),
		reactOutputTarget({
			componentCorePackage: '@leanup/kolibri-components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/react/src/adapter/index.ts',
			includeDefineCustomElements: false,
		}),
		solidOutputTarget({
			componentCorePackage: '@leanup/kolibri-components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/solid/src/adapter/index.ts',
			includeDefineCustomElements: false,
		}),
		// svelteOutputTarget({
		// 	componentCorePackage: '@leanup/kolibri-components',
		// 	excludeComponents: EXCLUDE_TAGS,
		// 	proxiesFile: '../adapters/svelte/src/index.ts',
		// 	includeDefineCustomElements: false,
		// }),
		// vueOutputTarget({
		// 	componentCorePackage: '@leanup/kolibri-components',
		// 	excludeComponents: EXCLUDE_TAGS,
		// 	proxiesFile: '../adapters/vue/src/index.ts',
		// 	includeDefineCustomElements: false,
		// }),
		{
			type: 'dist-custom-elements',
		},
		// {
		// 	type: 'dist-hydrate-script',
		// },
		{
			// https://stenciljs.com/docs/docs-vscode
			type: 'docs-vscode',
			file: 'vscode-custom-data.json',
		},
		{
			type: 'docs-custom',
			generator: generateCustomElementsJson,
		},
		// {
		//   file: 'docs.json',
		//   type: 'docs-json',
		// },
		{
			// dir: 'docs',
			footer: '',
			type: 'docs-readme',
			strict: true,
		},
	]);
}

export const config: Config = {
	// buildEs5: true,
	// extras: {
	//   cssVarsShim: true,
	//   dynamicImportShim: true,
	//   shadowDomShim: true,
	//   safari10: true,
	//   scriptDataOpts: true,
	//   appendChildSlotFix: false,
	//   cloneNodeFix: false,
	//   slotChildNodesFix: true,
	// },
	// enableCache: true,
	invisiblePrehydration: true,
	hashFileNames: false,
	bundles: BUNDLES,
	globalScript: 'src/global/script.ts',
	// globalStyle: 'src/global/style.css',
	namespace: 'leanup-kolibri',
	preamble: 'Leanup web component components',
	outputTargets: outputTargets,
	plugins: [],
	rollupPlugins: {
		before: [],
		after: [],
	},
	taskQueue: 'immediate',
};
