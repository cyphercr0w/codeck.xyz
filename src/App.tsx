import { useState } from 'preact/hooks';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <button class="copy-btn" onClick={handleCopy} title="Copy to clipboard">
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
      )}
    </button>
  );
}

export function App() {
  const installCmd = 'curl -fsSL https://codeck.xyz/install | bash';

  return (
    <div class="page">
      {/* Nav */}
      <nav class="nav">
        <div class="nav-inner">
          <a href="/" class="nav-brand">
            <span class="nav-logo">C</span>
            <span class="nav-name">Codeck</span>
          </a>
          <div class="nav-links">
            <a href="https://github.com/cyphercr0w/codeck" target="_blank" rel="noopener noreferrer" class="nav-link">GitHub</a>
            <a href="https://github.com/cyphercr0w/codeck/blob/main/docs/DEPLOYMENT.md" target="_blank" rel="noopener noreferrer" class="nav-link">Docs</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section class="hero">
        <div class="hero-badge">Open Source &middot; Self-Hosted &middot; Free</div>
        <h1 class="hero-title">
          Your AI coding agent,<br />
          <span class="hero-gradient">always on.</span>
        </h1>
        <p class="hero-sub">
          A persistent cloud sandbox for Claude Code. Memory that survives between sessions,
          accessible from any device, with pre-configured tools and skills.
          One command to install.
        </p>
        <div class="install-box">
          <code class="install-cmd">{installCmd}</code>
          <CopyButton text={installCmd} />
        </div>
        <p class="hero-hint">Requires Docker. Works on any Linux VPS or macOS.</p>
      </section>

      {/* Features */}
      <section class="features">
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">&#129504;</div>
            <h3>Persistent Memory</h3>
            <p>Claude remembers your projects, preferences, and decisions across sessions. No more re-explaining your codebase every time.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">&#9889;</div>
            <h3>Always On</h3>
            <p>Your machine runs 24/7 on your VPS. Access it from your laptop, phone, or tablet. Pick up where you left off.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">&#128268;</div>
            <h3>Pre-configured Tools</h3>
            <p>6 MCP servers, 60+ skills, 30+ slash commands, and 12 sub-agents ready to use. Zero configuration needed.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">&#128272;</div>
            <h3>Bring Your Own Key</h3>
            <p>Use your own Anthropic account. We charge nothing for the software — you only pay for your Claude subscription and VPS.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">&#128640;</div>
            <h3>Automated Agents</h3>
            <p>Schedule AI agents to run on a cron — monitoring, testing, maintenance. They work while you sleep.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">&#128225;</div>
            <h3>Migration Ready</h3>
            <p>Export your entire memory and import it on another machine. Your agent's knowledge is portable.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section class="how">
        <h2 class="section-title">Up and running in 30 seconds</h2>
        <div class="steps">
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-content">
              <h4>Install</h4>
              <p>One command pulls the Docker image and starts the container.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-content">
              <h4>Set Password</h4>
              <p>Open the web UI and create your access password.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-content">
              <h4>Login with Claude</h4>
              <p>Authenticate with your Anthropic account via OAuth.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-num">4</div>
            <div class="step-content">
              <h4>Start Coding</h4>
              <p>Open a terminal and start building. Claude already knows who you are.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section class="included">
        <h2 class="section-title">What's included</h2>
        <div class="included-grid">
          <div class="included-item">
            <span class="included-label">MCP Servers</span>
            <span class="included-value">Context7, Playwright, ESLint, Sequential Thinking, Brave Search, GitHub</span>
          </div>
          <div class="included-item">
            <span class="included-label">Skills</span>
            <span class="included-value">60+ knowledge packs — frontend, backend, TDD, security, Docker, deployment</span>
          </div>
          <div class="included-item">
            <span class="included-label">Sub-Agents</span>
            <span class="included-value">Planner, Architect, Code Reviewer, Security Reviewer, TDD Guide, and more</span>
          </div>
          <div class="included-item">
            <span class="included-label">Hooks</span>
            <span class="included-value">Auto-format, dangerous command guard, memory nudge, learning observer</span>
          </div>
          <div class="included-item">
            <span class="included-label">Skills Marketplace</span>
            <span class="included-value">Search and install from 89K+ community skills with one click</span>
          </div>
          <div class="included-item">
            <span class="included-label">Web UI</span>
            <span class="included-value">Terminal, file browser, dashboard, memory management, GitHub integration</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="cta">
        <h2 class="cta-title">Start building with persistent AI</h2>
        <p class="cta-sub">Free. Open source. Self-hosted. Your data stays on your machine.</p>
        <div class="install-box">
          <code class="install-cmd">{installCmd}</code>
          <CopyButton text={installCmd} />
        </div>
        <div class="cta-links">
          <a href="https://github.com/cyphercr0w/codeck" target="_blank" rel="noopener noreferrer" class="cta-link">
            View on GitHub
          </a>
          <a href="https://github.com/cyphercr0w/codeck/blob/main/docs/DEPLOYMENT.md" target="_blank" rel="noopener noreferrer" class="cta-link secondary">
            Read the docs
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <span>Codeck &copy; {new Date().getFullYear()}</span>
        <span class="footer-sep">&middot;</span>
        <a href="https://github.com/cyphercr0w/codeck" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  );
}
