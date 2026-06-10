'use client';

const faces = [
  { label: 'Java', color: '#f59e0b' },
  { label: 'Vue 3', color: '#10b981' },
  { label: 'Agent', color: '#a855f7' },
  { label: 'Spring', color: '#f97316' },
  { label: 'UniApp', color: '#06b6d4' },
  { label: 'Docker', color: '#3b82f6' },
];

export default function SkillCube() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="title-md mb-8 text-center scroll-reveal">核心技能</h3>
        <div className="scroll-reveal flex justify-center" style={{ perspective: '600px' }}>
          <div
            className="relative"
            style={{
              width: '120px',
              height: '120px',
              transformStyle: 'preserve-3d',
              animation: 'cube-rotate 12s linear infinite',
            }}
          >
            {faces.map((face, i) => {
              const transforms = [
                'rotateY(0deg) translateZ(60px)',
                'rotateY(90deg) translateZ(60px)',
                'rotateY(180deg) translateZ(60px)',
                'rotateY(270deg) translateZ(60px)',
                'rotateX(90deg) translateZ(60px)',
                'rotateX(-90deg) translateZ(60px)',
              ];
              return (
                <div
                  key={face.label}
                  className="absolute inset-0 flex items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    transform: transforms[i],
                    background: `${face.color}20`,
                    border: `1px solid ${face.color}50`,
                    color: face.color,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {face.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
