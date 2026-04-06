import { useState, useEffect, useRef } from "preact/hooks";
import { lazy, Suspense } from "preact/compat";

const Showcase = lazy(() =>
	import("./showcase/Showcase").then((m) => ({ default: m.Showcase })),
);

function LazyShowcase() {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					io.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} style={{ minHeight: visible ? undefined : "400px" }}>
			{visible && (
				<Suspense fallback={null}>
					<Showcase />
				</Suspense>
			)}
		</div>
	);
}

function WaitlistForm() {
	const [email, setEmail] = useState("");
	const [state, setState] = useState<
		"idle" | "loading" | "done" | "exists" | "error"
	>("idle");

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email.trim() || state === "loading") return;
		setState("loading");
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email.trim() }),
			});
			if (res.status === 409) {
				setState("exists");
			} else if (res.ok) {
				setState("done");
			} else {
				setState("error");
			}
		} catch {
			setState("error");
		}
	}

	if (state === "done") {
		return (
			<p class="waitlist-success">You're on the list. We'll reach out soon.</p>
		);
	}

	return (
		<form class="waitlist-form" onSubmit={handleSubmit}>
			<input
				type="email"
				class="waitlist-input"
				placeholder="you@email.com"
				value={email}
				onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
				required
			/>
			<button class="waitlist-btn" type="submit" disabled={state === "loading"}>
				{state === "loading" ? "Joining..." : "Join waitlist"}
			</button>
			{state === "exists" && (
				<p class="waitlist-msg">You're already on the list!</p>
			)}
			{state === "error" && (
				<p class="waitlist-msg waitlist-error">
					Something went wrong. Try again.
				</p>
			)}
		</form>
	);
}

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	function handleCopy() {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch(() => {});
	}

	return (
		<button
			class="copy-btn"
			onClick={handleCopy}
			title="Copy to clipboard"
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect x="9" y="9" width="13" height="13" rx="2" />
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
				</svg>
			)}
		</button>
	);
}

function detectOS(): "linux" | "windows" {
	const ua = navigator.userAgent.toLowerCase();
	if (ua.includes("win")) return "windows";
	return "linux";
}

const INSTALL_CMDS = {
	linux: "curl -fsSL https://codeck.xyz/install | bash",
	windows: "irm https://codeck.xyz/install.ps1 | iex",
};

function InstallBox() {
	const [os, setOs] = useState<"linux" | "windows">(detectOS);

	return (
		<div class="install-wrapper">
			<div class="install-tabs">
				<button
					class={`install-tab${os === "linux" ? " active" : ""}`}
					onClick={() => setOs("linux")}
				>
					Linux / macOS
				</button>
				<button
					class={`install-tab${os === "windows" ? " active" : ""}`}
					onClick={() => setOs("windows")}
				>
					Windows
				</button>
			</div>
			<div class="install-box">
				<code class="install-cmd">{INSTALL_CMDS[os]}</code>
				<CopyButton text={INSTALL_CMDS[os]} />
			</div>
		</div>
	);
}

export function App() {
	return (
		<div class="page">
			{/* Nav */}
			<nav class="nav">
				<div class="nav-inner">
					<a href="/" class="nav-brand">
						<svg
							class="nav-logo"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="32" height="32" rx="6" fill="#0a0a0b" />
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
						<span class="nav-name">Codeck</span>
					</a>
					<div class="nav-links">
						<a
							href="https://github.com/cyphercr0w/codeck"
							target="_blank"
							rel="noopener noreferrer"
							class="nav-link"
						>
							GitHub
						</a>
						<a
							href="https://github.com/cyphercr0w/codeck/blob/main/docs/DEPLOYMENT.md"
							target="_blank"
							rel="noopener noreferrer"
							class="nav-link"
						>
							Docs
						</a>
					</div>
				</div>
			</nav>

			<main>
				{/* Hero */}
				<section class="hero">
					<h1 class="hero-title">
						Claude Code,
						<br />
						<span class="hero-gradient">always on.</span>
					</h1>
					<p class="hero-sub">
						Self-hosted sandbox with persistent memory. Access from any device.
						One command to install.
					</p>
					<InstallBox />
					<p class="hero-meta">
						Open source &middot; Self-hosted &middot; Free &middot; Requires
						Docker
					</p>
				</section>

				<LazyShowcase />

				{/* What you get */}
				<section class="features">
					<h2 class="features-title">What you get</h2>
					<div class="feature-grid">
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
									<path d="M12 6v6l4 2" />
								</svg>
							</div>
							<span class="feature-name">Persistent memory</span>
							<span class="feature-desc">
								Claude remembers your projects, preferences, and decisions
								across every session.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="5" y="2" width="14" height="20" rx="2" />
									<path d="M12 18h.01" />
								</svg>
							</div>
							<span class="feature-name">Any device</span>
							<span class="feature-desc">
								Terminal in the browser — use it from your phone, tablet, or
								laptop without setup.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
								</svg>
							</div>
							<span class="feature-name">
								66 sub-agents &middot; 116 skills &middot; 59 commands
							</span>
							<span class="feature-desc">
								Pre-configured tool suite — planner, reviewer, security auditor,
								TDD guide, and more.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="3" />
									<path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
								</svg>
							</div>
							<span class="feature-name">Scheduled agents</span>
							<span class="feature-desc">
								Run agents on a cron — monitoring, testing, maintenance. They
								work while you sleep.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="2" y="3" width="20" height="14" rx="2" />
									<path d="M8 21h8M12 17v4" />
								</svg>
							</div>
							<span class="feature-name">Live preview panel</span>
							<span class="feature-desc">
								Dev server output renders in a split panel next to the terminal.
								HMR works out of the box.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
									<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
								</svg>
							</div>
							<span class="feature-name">One-click integrations</span>
							<span class="feature-desc">
								GitHub, Vercel, Supabase, Stripe, Slack, AWS — connect once, the
								agent uses it everywhere.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<span class="feature-name">Agent Teams</span>
							<span class="feature-desc">
								Claude assembles its own team — spawns researchers,
								implementers, and reviewers that work in parallel.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
								</svg>
							</div>
							<span class="feature-name">Token optimization</span>
							<span class="feature-desc">
								On-demand rules, output compression, and smart compaction keep
								Claude effective in long sessions.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
									<line x1="4" y1="22" x2="4" y2="15" />
								</svg>
							</div>
							<span class="feature-name">89K+ community skills</span>
							<span class="feature-desc">
								Browse and install from the largest skill marketplace. One click
								to add any capability.
							</span>
						</div>
						<div class="feature-card">
							<div class="feature-icon-wrap">
								<svg
									class="feature-icon"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="23 4 23 10 17 10" />
									<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
								</svg>
							</div>
							<span class="feature-name">1-command updates</span>
							<span class="feature-desc">
								Run the installer again to update. Your data, memory, and config
								are always preserved.
							</span>
						</div>
					</div>
				</section>

				{/* Cloud Waitlist */}
				<section class="waitlist">
					<h2 class="waitlist-title">Codeck Cloud — coming soon</h2>
					<p class="waitlist-sub">
						Don't want to self-host? We'll run Codeck for you — a dedicated VPS
						online 24/7 with your own subdomain. Join the waitlist for a 7-day
						free trial.
					</p>
					<WaitlistForm />
				</section>

				{/* Footer CTA */}
				<section class="footer-cta">
					<h2 class="footer-cta-title">Ready to start?</h2>
					<p class="footer-cta-sub">
						Free forever. Your data stays on your machine.
					</p>
					<InstallBox />
				</section>
			</main>

			{/* Footer */}
			<footer class="footer">
				<span>Codeck &copy; {new Date().getFullYear()}</span>
				<span class="footer-sep">&middot;</span>
				<a
					href="https://github.com/cyphercr0w/codeck"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<span class="footer-sep">&middot;</span>
				<a
					href="https://github.com/cyphercr0w/codeck/blob/main/docs/DEPLOYMENT.md"
					target="_blank"
					rel="noopener noreferrer"
				>
					Docs
				</a>
			</footer>
		</div>
	);
}
