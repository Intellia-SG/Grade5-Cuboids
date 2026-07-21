import React from 'react';
import { Play, Sparkles, HelpCircle, BookOpen, Layers, Award } from 'lucide-react';
import Mascot from './shared/Mascot.jsx';
import CuboidDiagram from './shared/CuboidDiagram.jsx';

export default function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <div className="intro-badge">
        <Sparkles size={16} /> Grade 5 Mathematics Module
      </div>

      <h1 className="intro-title">
        <span className="title-main">Volume of Cuboids</span>
        <span className="title-sub">Measuring Volume & Cubic Units</span>
      </h1>

      <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
        Join Sarah, John, and Mike on a space mission to pack cargo holds, measure 3D space, and master the volume of cuboids!
      </p>

      {/* 5-Step Journey Map */}
      <div className="intro-journey-map">
        {[
          { icon: HelpCircle, title: 'Wonder', desc: 'Space Hook' },
          { icon: BookOpen, title: 'Story', desc: 'Concept' },
          { icon: Layers, title: 'Simulate', desc: '3 Stations' },
          { icon: Play, title: 'Play', desc: 'Quiz' },
          { icon: Award, title: 'Reflect', desc: 'Certify' },
        ].map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="glass-card intro-journey-step">
              <span className="step-icon">
                <Icon size={22} />
              </span>
              <div className="step-label">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '8px 0', flexWrap: 'wrap', alignItems: 'center' }}>
        <CuboidDiagram length={4} width={3} height={2} size="small" />
        <Mascot mood="happy" message="Ready to launch your space volume mission, Cadet?" />
      </div>

      <button className="btn btn-primary btn-lg" onClick={onStart} style={{ marginTop: '4px' }}>
        Start Mission <Play size={20} fill="#1a1a2e" />
      </button>
    </div>
  );
}
