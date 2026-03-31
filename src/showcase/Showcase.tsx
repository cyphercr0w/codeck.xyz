import "./showcase.css";
import { useState, useEffect, useCallback, useRef } from "preact/hooks";
import { TerminalSlide } from "./TerminalSlide";
import { MemorySlide } from "./MemorySlide";
import { TeamsSlide } from "./TeamsSlide";
import { ConfigSlide } from "./ConfigSlide";
import { IntegrationsSlide } from "./IntegrationsSlide";

const SLIDES = [
	{
		id: "terminal",
		label: "Terminal + Preview",
		title: "Code and preview, side by side",
		desc: "Claude writes code in a real terminal. When the dev server starts, a live preview opens automatically.",
	},
	{
		id: "memory",
		label: "Persistent Memory",
		title: "Remembers everything, forever",
		desc: "Ask what happened 10 days ago — Claude reads its own memory and gives you a full recap.",
	},
	{
		id: "teams",
		label: "Agent Teams",
		title: "Claude assembles its own team",
		desc: "Researchers, implementers, and reviewers spawn in parallel. Multi-agent orchestration built in.",
	},
	{
		id: "config",
		label: "Agent Config",
		title: "Skills, servers, and token control",
		desc: "Browse 89K+ skills, connect MCP servers, and fine-tune token usage. Everything configurable from the browser.",
	},
	{
		id: "integrations",
		label: "Integrations",
		title: "Connect GitHub in 30 seconds",
		desc: "Device flow auth — press Connect, enter the code on github.com, done. Claude uses it across every session.",
	},
];

const SLIDE_COMPONENTS = [
	TerminalSlide,
	MemorySlide,
	TeamsSlide,
	ConfigSlide,
	IntegrationsSlide,
];

// Duration of each slide's animation + 3s pause after it finishes
const SLIDE_DURATIONS = [
	8500, // Terminal: typing(1s) + output(3.2s) + preview(1.4s) + 3s
	7000, // Memory: typing(0.7s) + output(3.2s) + 3s
	13000, // Teams: typing(0.9s) + agents(5.5s) + researcher(3.7s) + 3s
	13500, // Config: 3 phases × 3.5s + 3s
	9000, // Integrations: grid(2.5s) + flow(3.5s) + 3s
];

export function Showcase() {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const goTo = useCallback((i: number) => {
		setActive(i);
		setPaused(true);
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setPaused(false), SLIDE_DURATIONS[i]);
	}, []);

	// Auto-advance: wait per-slide duration, then go to next (loops infinitely)
	useEffect(() => {
		if (paused) return;
		const id = setTimeout(
			() => setActive((p) => (p + 1) % SLIDES.length),
			SLIDE_DURATIONS[active],
		);
		return () => clearTimeout(id);
	}, [paused, active]);

	useEffect(
		() => () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		},
		[],
	);

	const Comp = SLIDE_COMPONENTS[active];

	return (
		<section class="showcase">
			<h2 class="showcase-title">See it in action</h2>
			<div class="showcase-tabs">
				{SLIDES.map((s, i) => (
					<button
						key={s.id}
						class={`showcase-tab${i === active ? " active" : ""}`}
						onClick={() => goTo(i)}
					>
						{s.label}
					</button>
				))}
			</div>
			<div class="showcase-caption">
				<h3 class="showcase-cap-title">{SLIDES[active].title}</h3>
				<p class="showcase-cap-desc">{SLIDES[active].desc}</p>
			</div>
			<div class="showcase-viewport">
				<div class="showcase-slide" key={active}>
					<Comp />
				</div>
			</div>
			<div class="showcase-dots">
				{SLIDES.map((_, i) => (
					<button
						key={i}
						class={`showcase-dot${i === active ? " active" : ""}`}
						onClick={() => goTo(i)}
					/>
				))}
			</div>
		</section>
	);
}
