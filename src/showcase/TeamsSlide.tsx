import { useState, useCallback } from "preact/hooks";
import { Sidebar, StatusBar, TermTabs, TerminalWithInput } from "./shared";

const TEAM_AGENTS = ["main", "researcher", "implementer", "reviewer"] as const;

export function TeamsSlide() {
	const [phase, setPhase] = useState<
		"typing" | "output" | "chips" | "select" | "entered"
	>("typing");
	const [selected, setSelected] = useState(-1);

	const handleSent = useCallback(() => {
		setPhase("output");
		setTimeout(() => setPhase("chips"), 3500);
		setTimeout(() => {
			setPhase("select");
			setSelected(1);
		}, 4800);
		setTimeout(() => setPhase("entered"), 5800);
	}, []);

	const showChips =
		phase === "chips" || phase === "select" || phase === "entered";
	const chipBar = showChips ? (
		<div class="ck-agent-chips">
			{TEAM_AGENTS.map((name, i) => (
				<span
					key={name}
					class={`ck-agent-chip${selected === i ? " ck-agent-chip-selected" : ""}`}
				>
					@{name}
				</span>
			))}
			<span class="ck-agent-chip-hint">· shift + ↓ to expand</span>
		</div>
	) : undefined;

	return (
		<div class="ck-app">
			<Sidebar active="terminal" />
			<div class="ck-content">
				<TermTabs
					tabs={[
						{ name: "feature-auth", active: true },
						{ name: "main", idle: true },
					]}
				/>
				<TerminalWithInput
					message="Implement OAuth2 PKCE authentication with tests"
					onSent={handleSent}
					chips={chipBar}
				>
					<div class="cc-line cc-d1">
						<span class="cc-tool">⚡ TeamCreate</span>
						<span class="cc-tool-detail">feature-auth</span>
					</div>
					<div class="cc-line cc-d2">
						<span class="cc-tool">⚡ TaskCreate</span>
						<span class="cc-tool-cmd">Research OAuth2 PKCE flow</span>
					</div>
					<div class="cc-line cc-d3">
						<span class="cc-tool">⚡ TaskCreate</span>
						<span class="cc-tool-cmd">Implement auth middleware</span>
					</div>
					<div class="cc-line cc-d4">
						<span class="cc-tool">⚡ TaskCreate</span>
						<span class="cc-tool-cmd">Write integration tests</span>
					</div>
					<div class="cc-line cc-d5">
						<span class="cc-tool">⚡ Agent</span>
						<span class="cc-agent-badge researcher">researcher</span>
						<span class="cc-tool-detail">Analyzing OAuth2 PKCE flow</span>
					</div>
					<div class="cc-line cc-d6">
						<span class="cc-tool">⚡ Agent</span>
						<span class="cc-agent-badge implementer">implementer</span>
						<span class="cc-tool-detail">Writing auth middleware</span>
					</div>
					<div class="cc-line cc-d7">
						<span class="cc-tool">⚡ Agent</span>
						<span class="cc-agent-badge reviewer">reviewer</span>
						<span class="cc-tool-detail">Waiting for implementation</span>
					</div>
					{phase === "entered" ? (
						<div class="cc-line cc-d8">
							<span class="cc-output">
								Switched to <strong>@researcher</strong> — reading OAuth2 PKCE
								spec...
							</span>
						</div>
					) : (
						<div class="cc-line cc-d8">
							<span class="cc-output cc-dim">
								3 agents running in parallel...
							</span>
						</div>
					)}
					<div class="cc-line cc-d9">
						<span class="cc-cursor">█</span>
					</div>
				</TerminalWithInput>
				<StatusBar extra="3 agents" />
			</div>
		</div>
	);
}
