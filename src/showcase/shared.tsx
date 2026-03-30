import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import type { ComponentChildren } from "preact";

/* ── Claude Code icon (Anthropic asterisk) ── */
export function ClaudeIcon() {
	return (
		<svg
			class="cc-icon"
			width="20"
			height="20"
			viewBox="0 0 100 100"
			fill="#d4845a"
		>
			<path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
		</svg>
	);
}

/* ── Codeck logo SVG ── */
export const CODECK_LOGO = (
	<svg viewBox="0 0 32 32" fill="none">
		<rect width="32" height="32" rx="6" fill="#09090b" />
		<g
			stroke="#6366f1"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M4 24h24" />
			<path d="M8 24V12" />
			<path d="M24 24V12" />
			<path d="M8 12c0-4 3.5-7 8-7s8 3 8 7" />
			<path d="M13 24v-5" />
			<path d="M19 24v-5" />
			<path d="M4 19h24" />
		</g>
	</svg>
);

/* ── Mini sidebar ── */
export function Sidebar({ active }: { active: "terminal" | "config" }) {
	return (
		<div class="ck-sidebar">
			<div class="ck-sidebar-brand">
				<div class="ck-sidebar-logo">{CODECK_LOGO}</div>
				<span class="ck-sidebar-name">Codeck</span>
			</div>
			<div class="ck-sidebar-nav">
				<div class={`ck-sidebar-item${active === "terminal" ? " active" : ""}`}>
					<span class="ck-sidebar-icon">⌘</span>
					<span>Terminal</span>
				</div>
				<div class={`ck-sidebar-item${active === "config" ? " active" : ""}`}>
					<span class="ck-sidebar-icon">⚙</span>
					<span>Agent Config</span>
				</div>
			</div>
			<div class="ck-sidebar-footer">
				<div class="ck-sidebar-usage">
					<span class="ck-sidebar-usage-label">Tokens</span>
					<div class="ck-sidebar-usage-track">
						<div class="ck-sidebar-usage-fill" style="width:34%" />
					</div>
					<span class="ck-sidebar-usage-pct">34%</span>
				</div>
				<div class="ck-sidebar-version">v0.5.0</div>
			</div>
		</div>
	);
}

/* ── Status bar (matches real Codeck) ── */
export function StatusBar({ extra }: { extra?: string }) {
	return (
		<div class="ck-status-bar">
			<div class="tsb-limits">
				<span class="tsb-lim-label">5h</span>
				<div class="tsb-lim-track">
					<div class="tsb-lim-fill tsb-lim-blue" style="width:28%" />
				</div>
				<span class="tsb-lim-pct">28%</span>
				<span class="tsb-lim-label tsb-lim-resets">7d</span>
				<div class="tsb-lim-track">
					<div class="tsb-lim-fill tsb-lim-orange" style="width:61%" />
				</div>
				<span class="tsb-lim-pct">61%</span>
			</div>
			<span class="tsb-sep">|</span>
			<span class="tsb-model">Opus 4.6 (1M)</span>
			<span class="tsb-sep">|</span>
			<span class="tsb-lim-label">CTX</span>
			<div class="tsb-lim-track tsb-ctx-track">
				<div class="tsb-lim-fill tsb-lim-purple" style="width:25%" />
			</div>
			<span class="tsb-lim-pct">25%</span>
			<div class="tsb-right">
				<span class="tsb-dot-active" />
				<span class="tsb-active-label">{extra || "Active"}</span>
				<span class="tsb-sep">|</span>
				<span class="tsb-uptime">3h 1m</span>
			</div>
		</div>
	);
}

/* ── Terminal tab bar ── */
export function TermTabs({
	tabs,
}: {
	tabs: { name: string; active?: boolean; idle?: boolean }[];
}) {
	return (
		<div class="ck-term-tabs">
			{tabs.map((t) => (
				<div key={t.name} class={`ck-term-tab${t.active ? " active" : ""}`}>
					<span
						class={`ck-tab-dot${t.active ? " active" : t.idle ? " idle" : ""}`}
					/>
					<span>{t.name}</span>
				</div>
			))}
			<div class="ck-term-tab-new">+</div>
		</div>
	);
}

/* ── Auto-scroll: only when VISIBLE content overflows ── */
function useTermScroll() {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const parent = el.parentElement;
		if (!parent) return;
		const check = () => {
			let visibleH = 0;
			for (const child of el.children) {
				if (parseFloat(getComputedStyle(child).opacity) > 0.01)
					visibleH += (child as HTMLElement).offsetHeight;
			}
			const overflow = visibleH - parent.clientHeight;
			el.style.transform = overflow > 0 ? `translateY(-${overflow}px)` : "";
		};
		const id = setInterval(check, 400);
		return () => clearInterval(id);
	}, []);
	return ref;
}

export function TermScroll({ children }: { children: ComponentChildren }) {
	const ref = useTermScroll();
	return (
		<div class="ck-term-scroll" ref={ref}>
			{children}
		</div>
	);
}

/* ── Typing hook: ~15ms/char (fast) ── */
function useTyping(text: string, speed = 15) {
	const [idx, setIdx] = useState(0);
	const [done, setDone] = useState(false);
	useEffect(() => {
		setIdx(0);
		setDone(false);
		let i = 0;
		const id = setInterval(() => {
			i++;
			if (i >= text.length) {
				setIdx(text.length);
				setDone(true);
				clearInterval(id);
			} else setIdx(i);
		}, speed);
		return () => clearInterval(id);
	}, [text, speed]);
	return [text.slice(0, idx), done] as const;
}

/* ── Terminal with typing input bar ──
   - Types message in input bar at bottom
   - On send: message becomes first terminal line, children render with animation delays
   - Input bar always visible (empty after send)
   - Optional chips slot below input (for agent chips in Teams slide)
*/
export function TerminalWithInput({
	message,
	children,
	onSent,
	chips,
}: {
	message: string;
	children: ComponentChildren;
	onSent?: () => void;
	chips?: ComponentChildren;
}) {
	const [typed, done] = useTyping(message, 15);
	const [sent, setSent] = useState(false);
	useEffect(() => {
		if (!done) return;
		const t = setTimeout(() => {
			setSent(true);
			onSent?.();
		}, 200);
		return () => clearTimeout(t);
	}, [done]);
	return (
		<div class="ck-term-input-wrap">
			<div class="ck-term-output">
				{sent && (
					<TermScroll>
						<div class="cc-line cc-d0">
							<ClaudeIcon />
							<span class="cc-prompt">❯</span>
							<span class="cc-user-msg">{message}</span>
						</div>
						{children}
					</TermScroll>
				)}
			</div>
			<div class="ck-input-bar">
				<span class="ck-input-prompt">❯</span>
				{!sent && <span class="ck-input-text">{typed}</span>}
				<span class="ck-input-cursor">█</span>
			</div>
			{chips}
		</div>
	);
}
