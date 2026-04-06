import { defineConfig, Plugin } from "vite";
import preact from "@preact/preset-vite";

function optimizeLoading(): Plugin {
	return {
		name: "optimize-loading",
		enforce: "post",
		transformIndexHtml(html) {
			// Defer CSS to avoid render-blocking
			html = html.replace(
				/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/,
				'<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'">' +
					'<noscript><link rel="stylesheet" href="$1"></noscript>',
			);
			// Add modulepreload for the JS bundle
			const jsMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
			if (jsMatch) {
				html = html.replace(
					"</title>",
					`</title>\n    <link rel="modulepreload" href="${jsMatch[1]}">`,
				);
			}
			return html;
		},
	};
}

export default defineConfig({
	plugins: [preact(), optimizeLoading()],
});
