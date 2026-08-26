import React from 'react'

// Animated Grid Background
export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] bg-grid-pattern"
        style={{
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}
      />

      {/* Gradient orbs for ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-[120px]" />

      {/* Subtle scanline effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%)',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  )
}

// Decorative glowing elements
export const GlowingOrb: React.FC<{
  className?: string
  color?: 'cyan' | 'violet' | 'blue'
  delay?: number
}> = ({ className = '', color = 'cyan', delay = 0 }) => {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 shadow-[0_0_80px_rgba(0,243,255,0.2)]',
    violet: 'bg-violet-500/10 shadow-[0_0_80px_rgba(188,19,254,0.2)]',
    blue: 'bg-blue-500/10 shadow-[0_0_80px_rgba(0,102,255,0.2)]',
  }

  return (
    <div
      className={`absolute rounded-full blur-3xl animate-float ${colorClasses[color]} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

// Glitch text effect component
export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-70"
        style={{ transform: 'translate(-2px, 0)', clipPath: 'inset(20% 0 80% 0)' }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-violet-400 opacity-70"
        style={{ transform: 'translate(2px, 0)', clipPath: 'inset(80% 0 20% 0)' }}
      >
        {text}
      </span>
    </div>
  )
}

// Technical border
export const TechnicalBorder: React.FC<{
  children: React.ReactNode
  className?: string
  cornerType?: 'sharp' | 'rounded'
}> = ({ children, className = '', cornerType = 'rounded' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-[1px] bg-gradient-to-tr from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg ${cornerType === 'sharp' ? '' : 'rounded-lg'}`} />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
