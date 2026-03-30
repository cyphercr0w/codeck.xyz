import { useState, useEffect } from "preact/hooks";
import { Sidebar } from "./shared";

const AC_TABS = ["Memory", "Skills", "MCP Servers", "Rules", "Hooks"];
const PHASE_TABS = ["Memory", "Skills", "MCP Servers"] as const;

export function ConfigSlide() {
	const [phase, setPhase] = useState(0);
	const [compactVal, setCompactVal] = useState(50);
	const [saved, setSaved] = useState(false);
	const [installing, setInstalling] = useState(false);

	// Phase 0: slider animates to 60%, then "Save" confirms
	useEffect(() => {
		if (phase !== 0) {
			setCompactVal(50);
			setSaved(false);
			return;
		}
		const t1 = setTimeout(() => setCompactVal(60), 1500);
		const t2 = setTimeout(() => setSaved(true), 2500);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [phase]);

	// Phase 1: frontend-design starts installing at 1.8s
	useEffect(() => {
		if (phase !== 1) {
			setInstalling(false);
			return;
		}
		const t = setTimeout(() => setInstalling(true), 1800);
		return () => clearTimeout(t);
	}, [phase]);

	// Cycle phases
	useEffect(() => {
		const id = setInterval(() => setPhase((p) => (p + 1) % 3), 3500);
		return () => clearInterval(id);
	}, []);

	return (
		<div class="ck-app">
			<Sidebar active="config" />
			<div class="ck-content">
				<div class="ck-ac-tabs">
					{AC_TABS.map((t) => (
						<span
							key={t}
							class={`ck-ac-tab${t === PHASE_TABS[phase] ? " active" : ""}`}
						>
							{t}
						</span>
					))}
				</div>

				{/* Phase 0: Token Optimization */}
				{phase === 0 && (
					<div class="ck-ac-body ck-phase-in" key="tok">
						<div class="ck-ac-section">
							<div class="ck-ac-section-title">Token Optimization</div>
						</div>
						<div class="ck-tok-card">
							<div class="ck-tok-row tok-anim-1">
								<div class="ck-tok-info">
									<span class="ck-tok-name">Auto-compact at</span>
									<span class="ck-tok-desc">
										Compress context when usage reaches threshold
									</span>
								</div>
								<div class="ck-tok-control">
									<input
										type="range"
										class="ck-range"
										value={compactVal}
										disabled
									/>
									<span class="ck-tok-val">{compactVal}%</span>
								</div>
							</div>
							<div class="ck-tok-row tok-anim-2">
								<div class="ck-tok-info">
									<span class="ck-tok-name">Default effort level</span>
									<span class="ck-tok-desc">
										Controls reasoning depth per response
									</span>
								</div>
								<div class="ck-tok-control">
									<div class="ck-segmented">
										<span class="ck-seg">low</span>
										<span class="ck-seg active">medium</span>
										<span class="ck-seg">high</span>
									</div>
								</div>
							</div>
							<div class="ck-tok-row tok-anim-3">
								<div class="ck-tok-info">
									<span class="ck-tok-name">MCP tool defer threshold</span>
									<span class="ck-tok-desc">
										Deferred tools load on-demand after N calls
									</span>
								</div>
								<div class="ck-tok-control">
									<input type="range" class="ck-range" value="25" disabled />
									<span class="ck-tok-val">5</span>
								</div>
							</div>
							<div class="ck-tok-row tok-anim-4">
								<div class="ck-tok-info">
									<span class="ck-tok-name">Max thinking tokens</span>
									<span class="ck-tok-desc">
										Cap on internal reasoning budget
									</span>
								</div>
								<div class="ck-tok-control">
									<input type="range" class="ck-range" value="20" disabled />
									<span class="ck-tok-val">10K</span>
								</div>
							</div>
							<div class="ck-tok-save tok-anim-5">
								<button class={`ck-btn-primary${saved ? " ck-btn-saved" : ""}`}>
									{saved ? "✓ Saved" : "Save"}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Phase 1: Skills */}
				{phase === 1 && (
					<div class="ck-ac-body ck-phase-in" key="skills">
						<div class="ck-ac-section">
							<div class="ck-ac-section-title">Browse Skills</div>
							<div class="ck-ac-search">
								<span class="ck-ac-search-icon">⌕</span>
								<span class="ck-ac-search-text">
									Search 89K+ skills from skills.sh...
								</span>
							</div>
						</div>
						<div class="ck-ac-list">
							<div class="ck-ac-item sk-anim-1">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">security-review</span>
									<span class="ck-ac-item-meta">ECC · 12.4K installs</span>
								</div>
								<span class="ck-badge success">INSTALLED</span>
							</div>
							<div class="ck-ac-item sk-anim-2">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">tdd-workflow</span>
									<span class="ck-ac-item-meta">ECC · 9.8K installs</span>
								</div>
								<span class="ck-badge success">INSTALLED</span>
							</div>
							<div class="ck-ac-item sk-anim-3">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">deployment-patterns</span>
									<span class="ck-ac-item-meta">ECC · 7.1K installs</span>
								</div>
								<span class="ck-badge success">INSTALLED</span>
							</div>
							<div
								class={`ck-ac-item sk-anim-4${installing ? " sk-installing" : ""}`}
							>
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">frontend-design</span>
									<span class="ck-ac-item-meta">ECC · 15.2K installs</span>
								</div>
								{installing ? (
									<button class="ck-btn-install installing">
										<span class="ck-spinner" />
										Installing...
									</button>
								) : (
									<button class="ck-btn-install">
										<span class="ck-plus">+</span> Install
									</button>
								)}
							</div>
							<div class="ck-ac-item sk-anim-5">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">eval-harness</span>
									<span class="ck-ac-item-meta">ECC · 4.3K installs</span>
								</div>
								<button class="ck-btn-install">
									<span class="ck-plus">+</span> Install
								</button>
							</div>
							<div class="ck-ac-item sk-anim-6">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">pytorch-patterns</span>
									<span class="ck-ac-item-meta">Community · 3.9K installs</span>
								</div>
								<button class="ck-btn-install">
									<span class="ck-plus">+</span> Install
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Phase 2: MCP Servers */}
				{phase === 2 && (
					<div class="ck-ac-body ck-phase-in" key="mcp">
						<div class="ck-ac-section">
							<div class="ck-ac-section-title">
								Installed <span class="ck-count">(4)</span>
							</div>
						</div>
						<div class="ck-ac-list">
							<div class="ck-ac-item mcp-anim-1">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">Context7</span>
									<span class="ck-ac-item-meta">
										npx -y @upstash/context7-mcp@latest
									</span>
								</div>
								<div class="ck-ac-item-actions">
									<label class="ck-toggle">
										<input type="checkbox" checked disabled />
										<span class="ck-toggle-slider" />
									</label>
								</div>
							</div>
							<div class="ck-ac-item mcp-anim-2">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">Playwright</span>
									<span class="ck-ac-item-meta">
										npx @anthropic/mcp-playwright
									</span>
								</div>
								<div class="ck-ac-item-actions">
									<label class="ck-toggle">
										<input type="checkbox" checked disabled />
										<span class="ck-toggle-slider" />
									</label>
								</div>
							</div>
							<div class="ck-ac-item mcp-anim-3">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">ESLint</span>
									<span class="ck-ac-item-meta">npx -y eslint-mcp</span>
								</div>
								<div class="ck-ac-item-actions">
									<label class="ck-toggle">
										<input type="checkbox" checked disabled />
										<span class="ck-toggle-slider" />
									</label>
								</div>
							</div>
							<div class="ck-ac-item mcp-anim-4 ck-disabled">
								<div class="ck-ac-item-info">
									<span class="ck-ac-item-name">Sequential Thinking</span>
									<span class="ck-ac-item-meta">
										npx -y @anthropic/mcp-sequentialthinking
									</span>
								</div>
								<div class="ck-ac-item-actions">
									<label class="ck-toggle">
										<input type="checkbox" disabled />
										<span class="ck-toggle-slider" />
									</label>
								</div>
							</div>
						</div>
						<div class="ck-ac-section" style="margin-top:14px">
							<div class="ck-ac-section-title">Browse Registry</div>
							<div class="ck-ac-search">
								<span class="ck-ac-search-icon">⌕</span>
								<span class="ck-ac-search-text">
									Search 12K+ MCP servers...
								</span>
							</div>
						</div>
						<div class="ck-mcp-config mcp-anim-5">
							<div class="ck-mcp-config-title">
								supabase requires configuration
							</div>
							<div class="ck-mcp-config-field">
								<span class="ck-mcp-config-label">SUPABASE_URL</span>
								<div class="ck-mcp-config-input">https://abc.supabase.co</div>
							</div>
							<div class="ck-mcp-config-field">
								<span class="ck-mcp-config-label">SUPABASE_KEY</span>
								<div class="ck-mcp-config-input secret">••••••••••••••••</div>
							</div>
							<div class="ck-mcp-config-actions">
								<button class="ck-btn-ghost">Cancel</button>
								<button class="ck-btn-primary">
									<span class="ck-dl-icon">↓</span> Install
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
