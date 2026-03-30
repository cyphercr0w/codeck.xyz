import { useState } from "preact/hooks";
import { Sidebar, StatusBar, TermTabs, TerminalWithInput } from "./shared";

export function TerminalSlide() {
	const [showPreview, setShowPreview] = useState(false);
	return (
		<div class="ck-app">
			<Sidebar active="terminal" />
			<div class="ck-content">
				<TermTabs
					tabs={[
						{ name: "my-app", active: true },
						{ name: "deploy", idle: true },
					]}
				/>
				<div class={`ck-term-split${showPreview ? " ck-split-open" : ""}`}>
					<div class="ck-term-half">
						<TerminalWithInput
							message="Build a landing page with feature cards and a hero section"
							onSent={() => setTimeout(() => setShowPreview(true), 2000)}
						>
							<div class="cc-line cc-d1">
								<span class="cc-thinking">⟳ Thinking...</span>
							</div>
							<div class="cc-line cc-d2">
								<span class="cc-tool">⚡ Write</span>
								<span class="cc-tool-path">src/App.tsx</span>
								<span class="cc-tool-detail">+84 lines</span>
							</div>
							<div class="cc-line cc-d3">
								<span class="cc-tool">⚡ Write</span>
								<span class="cc-tool-path">src/style.css</span>
								<span class="cc-tool-detail">+127 lines</span>
							</div>
							<div class="cc-line cc-d4">
								<span class="cc-tool">⚡ Bash</span>
								<span class="cc-tool-cmd">
									npx vite --host 0.0.0.0 --port 5173
								</span>
							</div>
							<div class="cc-line cc-d5">
								<span class="cc-output">VITE v6.0.3 ready in 412ms</span>
							</div>
							<div class="cc-line cc-d6">
								<span class="cc-success">✓</span>
								<span class="cc-output"> Preview opened on port 5173.</span>
							</div>
							<div class="cc-line cc-d7">
								<span class="cc-cursor">█</span>
							</div>
						</TerminalWithInput>
					</div>
					{showPreview && (
						<div class="ck-preview-panel ck-preview-slide-in">
							<div class="ck-preview-toolbar">
								<div class="ck-preview-url">localhost:5173</div>
							</div>
							<div class="ck-preview-body">
								<div class="prev-skeleton">
									<div class="prev-sk-nav" />
									<div class="prev-sk-hero">
										<div class="prev-sk-h1" />
										<div class="prev-sk-sub" />
										<div class="prev-sk-btn" />
									</div>
									<div class="prev-sk-cards">
										<div class="prev-sk-card c1" />
										<div class="prev-sk-card c2" />
										<div class="prev-sk-card c3" />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<StatusBar />
			</div>
		</div>
	);
}
