import { useState, useEffect } from "preact/hooks";
import { Sidebar, ClaudeIcon } from "./shared";

const FEATURES = [
	{ label: "+120 Skills", icon: "⚡" },
	{ label: "Agent Teams", icon: "◆" },
	{ label: "MCP Servers", icon: "◈" },
	{ label: "Hooks", icon: "⟡" },
	{ label: "RTK Optimize", icon: "◎" },
	{ label: "Memory", icon: "◉" },
	{ label: "Live Preview", icon: "◐" },
	{ label: "Integrations", icon: "◇" },
];

// All positions in percentages so the diagram scales with CSS container size
const HUB_PCT = 10; // hub edge offset in % from center
const RADIUS_PCT = 36; // node distance from center in %

function RadialDiagram() {
	const [visibleNodes, setVisibleNodes] = useState(0);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const timers: ReturnType<typeof setTimeout>[] = [];
		FEATURES.forEach((_, i) => {
			timers.push(setTimeout(() => setVisibleNodes(i + 1), 200 + i * 180));
		});
		timers.push(
			setTimeout(() => setReady(true), 200 + FEATURES.length * 180 + 300),
		);
		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<div class="ck-byok-workspace">
			<div class="ck-byok-ws-title">Workspace configured</div>
			<div class="ck-byok-radial">
				{/* SVG uses viewBox so it scales with container */}
				<svg
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid meet"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						pointerEvents: "none",
					}}
				>
					{FEATURES.map((_, i) => {
						const angle = (i * 360) / FEATURES.length - 90;
						const rad = (angle * Math.PI) / 180;
						const cos = Math.cos(rad);
						const sin = Math.sin(rad);
						const x1 = 50 + HUB_PCT * cos;
						const y1 = 50 + HUB_PCT * sin;
						const x2 = 50 + RADIUS_PCT * cos;
						const y2 = 50 + RADIUS_PCT * sin;
						const len = RADIUS_PCT - HUB_PCT;
						const visible = i < visibleNodes;
						return (
							<line
								key={i}
								x1={x1}
								y1={y1}
								x2={x2}
								y2={y2}
								stroke="rgba(99,102,241,0.25)"
								stroke-width="0.4"
								stroke-dasharray={len}
								stroke-dashoffset={visible ? 0 : len}
								style={{ transition: "stroke-dashoffset 0.5s ease" }}
							/>
						);
					})}
				</svg>

				{/* Center hub */}
				<div class="ck-byok-hub">
					<ClaudeIcon />
					<span class="ck-byok-hub-label">Claude</span>
				</div>

				{/* Feature nodes — positioned with % so they scale with container */}
				{FEATURES.map((f, i) => {
					const angle = (i * 360) / FEATURES.length - 90;
					const rad = (angle * Math.PI) / 180;
					const x = 50 + RADIUS_PCT * Math.cos(rad);
					const y = 50 + RADIUS_PCT * Math.sin(rad);
					const visible = i < visibleNodes;
					return (
						<div
							key={f.label}
							class={`ck-byok-node${visible ? " visible" : ""}`}
							style={{ left: `${x}%`, top: `${y}%` }}
						>
							<div class="ck-byok-node-circle">{f.icon}</div>
							<span class="ck-byok-node-label">{f.label}</span>
						</div>
					);
				})}
			</div>
			<div class={`ck-byok-ready${ready ? " visible" : ""}`}>
				<span class="ck-byok-ready-dot" />
				Workspace ready
			</div>
		</div>
	);
}

export function BYOKSlide() {
	const [btn, setBtn] = useState<"idle" | "pressed" | "loading" | "done">(
		"idle",
	);
	const [showWorkspace, setShowWorkspace] = useState(false);

	useEffect(() => {
		const timers = [
			setTimeout(() => setBtn("pressed"), 1100),
			setTimeout(() => setBtn("loading"), 1400),
			setTimeout(() => setBtn("done"), 2400),
			setTimeout(() => setShowWorkspace(true), 3100),
		];
		return () => timers.forEach(clearTimeout);
	}, []);

	const isIdle = btn === "idle" || btn === "pressed";

	return (
		<div class="ck-app">
			<Sidebar active="config" />
			<div class="ck-content">
				{!showWorkspace && (
					<div class="ck-byok-wizard">
						<div class="ck-byok-title">Connect Claude Code</div>
						<div class="ck-byok-subtitle">
							Bring your own API key. Your account, your usage.
						</div>
						<button class={`ck-byok-connect-btn ${btn}`}>
							{isIdle && (
								<>
									<ClaudeIcon />
									Connect with Anthropic
								</>
							)}
							{btn === "loading" && (
								<>
									<span class="ck-spinner ck-spinner-light" />
									Connecting...
								</>
							)}
							{btn === "done" && (
								<>
									<span class="ck-byok-btn-check">✓</span>
									Connected
								</>
							)}
						</button>
						<span class="ck-byok-hint">
							Your key stays local. We never store it.
						</span>
					</div>
				)}

				{showWorkspace && <RadialDiagram />}
			</div>
		</div>
	);
}
