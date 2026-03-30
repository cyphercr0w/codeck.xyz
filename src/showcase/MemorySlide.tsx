import { Sidebar, StatusBar, TermTabs, TerminalWithInput } from "./shared";

export function MemorySlide() {
	const d = new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10);
	return (
		<div class="ck-app">
			<Sidebar active="terminal" />
			<div class="ck-content">
				<TermTabs tabs={[{ name: "my-project", active: true }]} />
				<TerminalWithInput message="What did we work on 10 days ago?">
					<div class="cc-line cc-d1">
						<span class="cc-thinking">⟳ Thinking...</span>
					</div>
					<div class="cc-line cc-d2">
						<span class="cc-tool">⚡ Read</span>
						<span class="cc-tool-path">.codeck/memory/daily/{d}.md</span>
					</div>
					<div class="cc-line cc-d3">
						<span class="cc-output">Found daily log for {d}:</span>
					</div>
					<div class="cc-line cc-d4">
						<span class="cc-mem-block">
							<div>
								📋 <strong>Auth middleware rewrite</strong> — migrated from JWT
								to OAuth2 PKCE
							</div>
							<div>🧪 Added 14 integration tests (all passing)</div>
							<div>
								🔒 Security review flagged 2 issues → both fixed same day
							</div>
							<div>
								📝 Decision: chose Passport.js over custom implementation
							</div>
						</span>
					</div>
					<div class="cc-line cc-d5">
						<span class="cc-output">You also saved a preference that day:</span>
					</div>
					<div class="cc-line cc-d6">
						<span class="cc-mem-pref">
							"Always use sub-agents for implementation. Never skip review."
						</span>
					</div>
					<div class="cc-line cc-d7">
						<span class="cc-cursor">█</span>
					</div>
				</TerminalWithInput>
				<StatusBar />
			</div>
		</div>
	);
}
