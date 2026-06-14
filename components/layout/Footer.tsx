export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      width: '100%',
      padding: '2rem 0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--muted)' }}>
          © 2026 Thirunavukkarasu Veeramani · Chennai, India
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'rgba(100,116,139,0.5)', letterSpacing: '0.12em' }}>
          ROBOTICS & AUTOMATION · DATA SCIENCE · EMBEDDED SYSTEMS
        </span>
      </div>
    </footer>
  );
}
