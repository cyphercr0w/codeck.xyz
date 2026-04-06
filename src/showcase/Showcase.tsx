import "./showcase.css";
import { useState, useEffect, useCallback } from "preact/hooks";
import { BYOKSlide } from "./BYOKSlide";
import { TerminalSlide } from "./TerminalSlide";
import { MemorySlide } from "./MemorySlide";
import { TeamsSlide } from "./TeamsSlide";
import { ConfigSlide } from "./ConfigSlide";
import { IntegrationsSlide } from "./IntegrationsSlide";

const SLIDES = [
	{
		id: "byok",
		label: "Connect",
		title: "Bring your own key",
		desc: "Connect your Anthropic account in seconds. Your API key, your usage — Claude powers up with 120+ skills, hooks, and tools.",
	},
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
	BYOKSlide,
	TerminalSlide,
	MemorySlide,
	TeamsSlide,
	ConfigSlide,
	IntegrationsSlide,
];

// Full duration for each slide: animation time + 3s viewing pause
const SLIDE_DURATIONS = [
	6500, // BYOK: idle(1.2s) + loading(1s) + done(0.8s) + workspace(3.5s)
	8000, // Terminal: typing(0.8s) + send(0.2s) + preview(2s) + skeleton(1.7s) + 3s
	7000, // Memory: typing(0.5s) + send(0.2s) + output(3.2s) + 3s
	17000, // Teams: typing(0.7s) + lead(6.5s) + researcher(5.2s) + return(1.3s) + 3s
	13500, // Config: 3 phases × 3.5s + 3s
	11000, // Integrations: grid(3s) + flow(5s) + 3s
];

export function Showcase() {
	const [active, setActive] = useState(0);
	// key increments on every slide change (including re-selecting same slide)
	// to force component remount and restart animations
	const [epoch, setEpoch] = useState(0);

	const goTo = useCallback((i: number) => {
		setActive(i);
		setEpoch((e) => e + 1);
	}, []);

	// Auto-advance: one timeout per slide, resets on any active/epoch change
	useEffect(() => {
		const id = setTimeout(() => {
			setActive((p) => (p + 1) % SLIDES.length);
			setEpoch((e) => e + 1);
		}, SLIDE_DURATIONS[active]);
		return () => clearTimeout(id);
	}, [active, epoch]);

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
				<div class="showcase-slide" key={epoch}>
					<Comp />
				</div>
			</div>
			<div class="showcase-dots" role="tablist">
				{SLIDES.map((_, i) => (
					<button
						key={i}
						class={`showcase-dot${i === active ? " active" : ""}`}
						onClick={() => goTo(i)}
						role="tab"
						aria-selected={i === active}
						aria-label={`Go to slide ${i + 1}: ${SLIDES[i].label}`}
					/>
				))}
			</div>
		</section>
	);
}
