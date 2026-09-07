import { toast } from 'react-toastify'

const DOWNLOAD_PLATFORMS = [
  {
    id: 'windows',
    name: 'Windows Desktop',
    icon: '🪟',
    version: 'v1.3.0',
    size: '64.2 MB',
    requirements: 'Windows 10 / 11 (64-bit)',
    badge: 'Popular',
    downloads: [
      { label: 'Download .exe (Installer)', file: 'CSTicket-Setup-v1.3.0.exe' },
      { label: 'Download .zip (Portable)', file: 'CSTicket-Portable-v1.3.0.zip' },
    ],
  },
  {
    id: 'macos',
    name: 'macOS Desktop',
    icon: '🍏',
    version: 'v1.3.0',
    size: '58.7 MB',
    requirements: 'macOS 12 Monterey or newer',
    badge: 'Universal',
    downloads: [
      { label: 'Apple Silicon (M1/M2/M3/M4)', file: 'CSTicket-v1.3.0-arm64.dmg' },
      { label: 'Intel Mac (x64)', file: 'CSTicket-v1.3.0-x64.dmg' },
    ],
  },
  {
    id: 'linux',
    name: 'Linux Desktop',
    icon: '🐧',
    version: 'v1.3.0',
    size: '52.1 MB',
    requirements: 'Ubuntu 20.04+, Fedora 36+, Debian 11+',
    badge: 'Open Source',
    downloads: [
      { label: 'Download .deb Package', file: 'csticket_1.3.0_amd64.deb' },
      { label: 'Download .AppImage', file: 'CSTicket-1.3.0.AppImage' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Apps (iOS & Android)',
    icon: '📱',
    version: 'v1.2.4',
    size: '28.4 MB',
    requirements: 'iOS 15.0+ / Android 10.0+',
    badge: 'Beta',
    downloads: [
      { label: 'Download for iOS (IPA / TestFlight)', file: 'CSTicket-iOS-Beta.mobileconfig' },
      { label: 'Download Android APK', file: 'CSTicket-v1.2.4.apk' },
    ],
  },
]

function DownloadSection({ onNavigate }) {
  function handleDownload(fileName, platformName) {
    // Generate a downloadable release package manifest file on the fly
    const manifestContent = [
      `=============================================================`,
      `CS — Ticket System Desktop Client Package`,
      `=============================================================`,
      `Package:       ${fileName}`,
      `Platform:      ${platformName}`,
      `Version:       1.3.0 Stable Release`,
      `Release Date:  September 2024`,
      `Checksum:      sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
      `Repository:    https://github.com/farabi1/customer-support-app`,
      `Documentation: https://customer-support-app-one.vercel.app`,
      ``,
      `Installation Instructions:`,
      `1. Run the downloaded installer package or unpack archive.`,
      `2. Authenticate with your support workspace credentials.`,
      `3. Enjoy instant desktop notifications and keyboard shortcuts!`,
      `=============================================================`,
    ].join('\n')

    const blob = new Blob([manifestContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)

    toast.success(`Download started: ${fileName}`, {
      position: 'top-right',
      autoClose: 3500,
    })
  }

  return (
    <section className="download-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <span className="page-badge">Cross-Platform Apps</span>
          <h1 className="page-title">Download CS Ticket System</h1>
          <p className="page-subtitle">
            Get lightning-fast native support workflows on your desktop and mobile devices with offline caching and instant alerts.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="download-grid">
          {DOWNLOAD_PLATFORMS.map((platform) => (
            <div key={platform.id} className="download-card">
              <div className="download-card__top">
                <div className="download-card__icon-wrap">
                  <span className="download-card__icon">{platform.icon}</span>
                </div>
                <span className="download-badge">{platform.badge}</span>
              </div>

              <h2 className="download-card__title">{platform.name}</h2>
              <div className="download-card__meta">
                <span>{platform.version}</span>
                <span>•</span>
                <span>{platform.size}</span>
              </div>
              <p className="download-card__reqs">{platform.requirements}</p>

              <div className="download-card__buttons">
                {platform.downloads.map((dl, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === 0 ? 'btn-download-primary' : 'btn-download-secondary'}
                    onClick={() => handleDownload(dl.file, platform.name)}
                  >
                    <span className="btn-dl-arrow">⬇</span>
                    <span>{dl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CLI Companion Card */}
        <div className="download-cli-card">
          <div className="download-cli-card__content">
            <span className="download-cli-tag">Developer Tools</span>
            <h3 className="download-cli-title">Command Line Interface (CLI)</h3>
            <p className="download-cli-desc">
              Manage tickets, automate status updates, and integrate ticket creation directly into your CI/CD build scripts.
            </p>
            <div className="download-cli-code">
              <code>npm install -g @cs-ticket/cli</code>
              <button
                type="button"
                className="cli-copy-btn"
                onClick={() => {
                  navigator.clipboard?.writeText('npm install -g @cs-ticket/cli')
                  toast.success('CLI install command copied to clipboard!')
                }}
              >
                Copy Command
              </button>
            </div>
          </div>
        </div>

        {/* Help card */}
        <div className="download-help-banner">
          <div>
            <h4 className="help-title">Need help with installation?</h4>
            <p className="help-desc">
              Check our FAQ for troubleshooting guide or talk directly with our support engineers.
            </p>
          </div>
          <div className="help-actions">
            {onNavigate && (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    onNavigate('faq')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  View FAQ
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    onNavigate('contact')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Contact Support
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection
