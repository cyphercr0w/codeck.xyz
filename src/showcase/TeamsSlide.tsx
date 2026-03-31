import { useState, useCallback } from "preact/hooks";
import {
	Sidebar,
	StatusBar,
	TermTabs,
	TerminalWithInput,
	TermScroll,
} from "./shared";

const AGENTS = ["main", "researcher", "implementer", "reviewer"] as const;

export function TeamsSlide() {
	const [visibleChips, setVisibleChips] = useState(0);
	const [selected, setSelected] = useState(-1);
	const [entered, setEntered] = useState(false);

	const handleSent = useCallback(() => {
		// @main appears with TeamCreate (cc-d6=2.7s)
		setTimeout(() => setVisibleChips(1), 2800);
		// Agents spawn one by one (cc-d7=3.2s, cc-d8=3.7s, cc-d9=4.2s)
		setTimeout(() => setVisibleChips(2), 3300);
		setTimeout(() => setVisibleChips(3), 3800);
		setTimeout(() => setVisibleChips(4), 4300);
		// Select @researcher at 5.5s
		setTimeout(() => setSelected(1), 5500);
		// Enter researcher at 6.5s
		setTimeout(() => setEntered(true), 6500);
	}, []);

	const chipBar =
		visibleChips > 0 ? (
			<div class="ck-agent-chips">
				{AGENTS.slice(0, visibleChips).map((name, i) => (
					<span
						key={name}
						class={`ck-agent-chip${selected === i ? " ck-agent-chip-selected" : ""}`}
					>
						@{name}
					</span>
				))}
				{!entered && (
					<span class="ck-agent-chip-hint">· shift + ↓ to expand</span>
				)}
			</div>
		) : undefined;

	const researcherOutput = (
		<TermScroll>
			<div class="cc-line cc-d0">
				<span class="cc-agent-badge researcher" style="margin-right:6px">
					researcher
				</span>
				<span class="cc-output">Analyzing OAuth2 PKCE flow</span>
			</div>
			<div class="cc-line cc-d1">
				<span class="cc-thinking">⟳ Thinking...</span>
			</div>
			<div class="cc-line cc-d2">
				<span class="cc-tool">⚡ WebSearch</span>
				<span class="cc-tool-cmd">OAuth2 PKCE best practices 2026</span>
			</div>
			<div class="cc-line cc-d3">
				<span class="cc-tool">⚡ Read</span>
				<span class="cc-tool-path">docs/AUTH.md</span>
			</div>
			<div class="cc-line cc-d4">
				<span class="cc-output">Found 3 relevant sources. Summarizing...</span>
			</div>
			<div class="cc-line cc-d5">
				<span class="cc-tool">⚡ Write</span>
				<span class="cc-tool-path">research/oauth2-pkce.md</span>
				<span class="cc-tool-detail">+47 lines</span>
			</div>
			<div class="cc-line cc-d6">
				<span class="cc-success">✓</span>
				<span class="cc-output">
					{" "}
					Research complete. Sending findings to team-lead.
				</span>
			</div>
			<div class="cc-line cc-d7">
				<span class="cc-tool">⚡ SendMessage</span>
				<span class="cc-tool-cmd">to: team-lead</span>
			</div>
			<div class="cc-line cc-d8">
				<span class="cc-cursor">█</span>
			</div>
		</TermScroll>
	);

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
				{entered ? (
					<div class="ck-term-input-wrap">
						<div class="ck-term-output">{researcherOutput}</div>
						<div class="ck-input-bar">
							<span class="ck-input-prompt">❯</span>
							<span class="ck-input-cursor">█</span>
						</div>
						{chipBar}
					</div>
				) : (
					<TerminalWithInput
						message="Implement OAuth2 PKCE authentication with tests"
						onSent={handleSent}
						chips={chipBar}
					>
						{/* Phase 1: Break down into tasks */}
						<div class="cc-line cc-d1">
							<span class="cc-output">
								I'll break this into three tasks first.
							</span>
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
						{/* Phase 2: Assemble the team */}
						<div class="cc-line cc-d5">
							<span class="cc-output">
								Now let me assemble a team to tackle these in parallel.
							</span>
						</div>
						<div class="cc-line cc-d6">
							<span class="cc-tool">⚡ TeamCreate</span>
							<span class="cc-tool-detail">feature-auth</span>
						</div>
						<div class="cc-line cc-d7">
							<span class="cc-tool">⚡ Agent</span>
							<span class="cc-agent-badge researcher">researcher</span>
							<span class="cc-tool-detail">Analyzing OAuth2 PKCE flow</span>
						</div>
						<div class="cc-line cc-d8">
							<span class="cc-tool">⚡ Agent</span>
							<span class="cc-agent-badge implementer">implementer</span>
							<span class="cc-tool-detail">Writing auth middleware</span>
						</div>
						<div class="cc-line cc-d9">
							<span class="cc-tool">⚡ Agent</span>
							<span class="cc-agent-badge reviewer">reviewer</span>
							<span class="cc-tool-detail">Waiting for implementation</span>
						</div>
						<div class="cc-line cc-d10">
							<span class="cc-output cc-dim">
								3 agents running in parallel...
							</span>
						</div>
						<div class="cc-line cc-d11">
							<span class="cc-cursor">█</span>
						</div>
					</TerminalWithInput>
				)}
				<StatusBar extra={entered ? "researcher" : "3 agents"} />
			</div>
		</div>
	);
}
