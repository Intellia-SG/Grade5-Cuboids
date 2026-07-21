import React from 'react';
import { Delete, Check } from 'lucide-react';

export default function NumberPad({ value = '', onChange, onSubmit, allowDecimal = false }) {
  const handleDigit = (digit) => {
    if (value.length < 6) {
      onChange(value + digit);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '260px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigit(digit)}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#f8fafc',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            {digit}
          </button>
        ))}

        {allowDecimal ? (
          <button
            onClick={() => handleDigit('.')}
            disabled={value.includes('.')}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#f8fafc',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
            }}
          >
            .
          </button>
        ) : (
          <button
            onClick={handleDelete}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              color: '#f87171',
              background: 'rgba(248, 113, 113, 0.12)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete size={18} />
          </button>
        )}

        <button
          onClick={() => handleDigit('0')}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#f8fafc',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer',
          }}
        >
          0
        </button>

        {allowDecimal ? (
          <button
            onClick={handleDelete}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              color: '#f87171',
              background: 'rgba(248, 113, 113, 0.12)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete size={18} />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!value}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              color: '#0f172a',
              background: 'linear-gradient(135deg, #38bdf8, #34d399)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !value ? 0.4 : 1,
            }}
          >
            <Check size={20} />
          </button>
        )}
      </div>

      {allowDecimal && (
        <button
          className="btn-primary"
          onClick={onSubmit}
          disabled={!value}
          style={{ width: '100%', marginTop: '6px', opacity: !value ? 0.4 : 1 }}
        >
          Submit Answer <Check size={20} />
        </button>
      )}
    </div>
  );
}
