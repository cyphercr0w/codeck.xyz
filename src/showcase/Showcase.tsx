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

export function Showcase() {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const goTo = useCallback((i: number) => {
		setActive(i);
		setPaused(true);
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setPaused(false), 12000);
	}, []);

	useEffect(() => {
		if (paused) return;
		const id = setInterval(
			() => setActive((p) => (p + 1) % SLIDES.length),
			8000,
		);
		return () => clearInterval(id);
	}, [paused]);

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
