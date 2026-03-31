import { useState, useEffect } from "preact/hooks";
import { Sidebar } from "./shared";

const GH_SVG = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
	</svg>
);

export function IntegrationsSlide() {
	const [phase, setPhase] = useState<"grid" | "flow">("grid");
	const [step, setStep] = useState(0);
	useEffect(() => {
		const timers = [
			setTimeout(() => setPhase("flow"), 3000),
			setTimeout(() => setStep(1), 4000),
			setTimeout(() => setStep(2), 6000),
			setTimeout(() => setStep(3), 8000),
		];
		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<div class="ck-app">
			<Sidebar active="config" />
			<div class="ck-content">
				<div class="ck-integ-wizard">
					{phase === "grid" ? (
						<>
							<div class="ck-integ-title">Integrations</div>
							<div class="ck-integ-subtitle">
								Connect your services. One click to authenticate.
							</div>
							<div class="ck-integ-grid">
								<div class="ck-integ-card ig-anim-1 ck-integ-card-active">
									<div class="ck-integ-card-icon ck-ig-gh">{GH_SVG}</div>
									<span class="ck-integ-card-name">GitHub</span>
									<button class="ck-btn-primary">Connect</button>
								</div>
								<div class="ck-integ-card ig-anim-2">
									<div class="ck-integ-card-icon ck-ig-vercel">
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M12 1L24 22H0L12 1z" />
										</svg>
									</div>
									<span class="ck-integ-card-name">Vercel</span>
									<button class="ck-btn-secondary-sm">Connect</button>
								</div>
								<div class="ck-integ-card ig-anim-3">
									<div class="ck-integ-card-icon ck-ig-supa">
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M13.36 21.89c-.4.53-1.23.2-1.22-.48l.18-6.2H3.07c-.6 0-.93-.7-.55-1.16L10.64 2.11c.4-.53 1.23-.2 1.22.48l-.18 6.2h9.25c.6 0 .93.7.55 1.16L13.36 21.89z" />
										</svg>
									</div>
									<span class="ck-integ-card-name">Supabase</span>
									<button class="ck-btn-secondary-sm">Connect</button>
								</div>
								<div class="ck-integ-card ig-anim-4">
									<div class="ck-integ-card-icon ck-ig-stripe">
										<span style="font-weight:700;font-size:15px;color:#635bff">
											S
										</span>
									</div>
									<span class="ck-integ-card-name">Stripe</span>
									<button class="ck-btn-secondary-sm">Connect</button>
								</div>
								<div class="ck-integ-card ig-anim-5">
									<div class="ck-integ-card-icon ck-ig-aws">
										<span style="font-weight:700;font-size:10px;color:#f90">
											AWS
										</span>
									</div>
									<span class="ck-integ-card-name">AWS</span>
									<button class="ck-btn-secondary-sm">Connect</button>
								</div>
								<div class="ck-integ-card ig-anim-6">
									<div class="ck-integ-card-icon ck-ig-slack">
										<span style="font-size:16px">#</span>
									</div>
									<span class="ck-integ-card-name">Slack</span>
									<button class="ck-btn-secondary-sm">Connect</button>
								</div>
							</div>
						</>
					) : (
						<>
							<div class="ck-integ-title">Connect to GitHub</div>
							<div class="ck-integ-subtitle">
								Authenticate via device flow — no tokens to copy-paste.
							</div>
							<div class="ck-integ-steps">
								<div class={`ck-integ-step${step >= 1 ? " done" : " active"}`}>
									<div class="ck-integ-step-num">1</div>
									<div class="ck-integ-step-content">
										<span class="ck-integ-step-label">Press Connect</span>
										{step === 0 && (
											<button class="ck-btn-primary ck-integ-connect-btn">
												Connect to GitHub
											</button>
										)}
										{step >= 1 && (
											<span class="ck-integ-step-done">✓ Started</span>
										)}
									</div>
								</div>
								<div
									class={`ck-integ-step${step === 1 ? " active" : step > 1 ? " done" : ""}`}
								>
									<div class="ck-integ-step-num">2</div>
									<div class="ck-integ-step-content">
										<span class="ck-integ-step-label">
											Enter this code at{" "}
											<strong>github.com/login/device</strong>
										</span>
										{step >= 1 && <div class="ck-integ-code">ABCD-1234</div>}
										{step === 1 && (
											<span class="ck-integ-waiting">
												<span class="ck-spinner" /> Waiting for authorization...
											</span>
										)}
										{step >= 2 && (
											<span class="ck-integ-step-done">✓ Authorized</span>
										)}
									</div>
								</div>
								<div
									class={`ck-integ-step${step >= 3 ? " done" : step === 2 ? " active" : ""}`}
								>
									<div class="ck-integ-step-num">3</div>
									<div class="ck-integ-step-content">
										<span class="ck-integ-step-label">Connected!</span>
										{step >= 3 && (
											<div class="ck-integ-connected">
												{GH_SVG}
												<span>
													Logged in as <strong>codeck</strong>
												</span>
												<span class="ck-integ-check-badge">✓</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
