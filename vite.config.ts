import { defineConfig, Plugin } from "vite";
import preact from "@preact/preset-vite";

function deferCss(): Plugin {
	return {
		name: "defer-css",
		enforce: "post",
		transformIndexHtml(html) {
			return html.replace(
				/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/,
				'<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'">' +
					'<noscript><link rel="stylesheet" href="$1"></noscript>',
			);
		},
	};
}

export default defineConfig({
	plugins: [preact(), deferCss()],
});
