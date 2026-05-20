import { Link } from 'react-router-dom'
import personal from '../../data/personal.json'

export default function ResumePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#151515', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        background: '#1a1a1a',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #333'
      }}>
        <Link to="/" style={{ color: '#ffc451', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
          <i className="bi bi-arrow-left"></i> Back to Portfolio
        </Link>
        <span style={{ color: '#fff', fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
          {personal.name} — Resume
        </span>
        <a
          href={personal.resumeUrl}
          download
          style={{
            background: '#ffc451',
            color: '#151515',
            padding: '8px 20px',
            borderRadius: 4,
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <i className="bi bi-download"></i> Download
        </a>
      </div>

      {/* PDF Viewer */}
      <iframe
        src={personal.resumeUrl}
        title="Resume"
        style={{ flex: 1, width: '100%', height: 'calc(100vh - 57px)', border: 'none' }}
      />
    </div>
  )
}
