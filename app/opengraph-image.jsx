import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jabir Mahmud — Creative Developer — jabx_fx';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient blobs for visual depth */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,97,255,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,212,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            color: '#00F5D4',
            fontSize: 22,
            margin: 0,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          jabx_fx
        </p>

        {/* Main headline */}
        <h1
          style={{
            color: '#FFFFFF',
            fontSize: 72,
            margin: '20px 0 0 0',
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}
        >
          Build interfaces
          <br />
          <span style={{ color: '#00F5D4' }}>people don't skip.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: '#A0A0A0',
            fontSize: 26,
            margin: '28px 0 0 0',
            fontWeight: 400,
          }}
        >
          Design · Dev · AI — jabx.bro.bd
        </p>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0,245,212,0.1)',
            border: '1px solid rgba(0,245,212,0.3)',
            borderRadius: '50px',
            padding: '10px 24px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#00F5D4',
            }}
          />
          <span style={{ color: '#00F5D4', fontSize: 18, fontWeight: 600 }}>
            Available for projects · 2025
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
