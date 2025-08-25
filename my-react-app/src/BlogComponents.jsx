import * as React from 'react';

export function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date
}) {
  const avatarSrc = author && author.avatar ? author.avatar : 'https://via.placeholder.com/32';
  const authorName = author && author.name ? author.name : 'Ismeretlen';
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        background: hovered ? '#f8f9fa' : '#fff',
        borderRadius: 20,
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.18)' : '0 2px 16px rgba(0,0,0,0.06)',
        border: hovered ? '2px solid #222' : '2px solid transparent',
        overflow: 'visible',
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        maxWidth: 520,
        cursor: 'pointer',
        transition: 'box-shadow 0.25s, background 0.25s, border 0.25s, transform 0.25s',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        zIndex: hovered ? 2 : 1,
        position: 'relative',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          transition: 'filter 0.25s, transform 0.25s, border-radius 0.25s',
          filter: hovered ? 'brightness(1.08) saturate(1.08)' : 'none',
          transform: hovered ? 'scale(1.001)' : 'scale(1)',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <div style={{ padding: 24 }}>
        <span style={{
          display: 'inline-block',
          background: '#f5f5f5',
          borderRadius: 12,
          padding: '2px 12px',
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 8,
          transition: 'background 0.25s',
        }}>{category}</span>
        <h3 style={{
          margin: '8px 0 8px 0',
          fontSize: 22,
          transition: 'color 0.25s',
          color: hovered ? '#222' : '#111',
        }}>{title}</h3>
        <p style={{
          color: hovered ? '#333' : '#555',
          fontSize: 15,
          marginBottom: 16,
          transition: 'color 0.25s',
        }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={avatarSrc} alt={authorName} style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8, transition: 'box-shadow 0.25s', boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.12)' : 'none' }} />
            <span style={{ fontSize: 14, color: hovered ? '#222' : '#444', transition: 'color 0.25s' }}>{authorName}</span>
          </div>
          <span style={{ fontSize: 13, color: '#888' }}>{date}</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            border: 'none',
            outline: 'none',
            background: active === cat ? '#222' : '#f5f5f5',
            color: active === cat ? '#fff' : '#222',
            borderRadius: 20,
            padding: '8px 20px',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: active === cat ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export function BlogHeader() {
  return (
    <div style={{ textAlign: 'center', margin: '64px 0 32px 0' }}>
      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>LAKÁSOK</h1>
      <p style={{ fontSize: 20, color: '#555' }}>Legjobb lakások az országban</p>
    </div>
  );
}

export function BlogSearch({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Keresés lakásra, városra..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            borderRadius: 20,
            border: '1px solid #eee',
            padding: '8px 36px 8px 16px',
            fontSize: 15,
            outline: 'none',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        />
        <svg style={{ position: 'absolute', right: 10, top: 8 }} width="20" height="20" fill="#888" viewBox="0 0 20 20">
          <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" fill="none"/>
          <line x1="15" y1="15" x2="19" y2="19" stroke="#888" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
}

export function Navbar({ onTabChange, activeTab, onLogin, onRegister }) {
  const navLinks = [
    { key: 'house', label: 'Eladó lakások' },
    { key: 'apartment', label: 'Eladó házak' },
    { key: 'blog', label: 'Blog' },
    { key: 'hirdetes', label: 'Hirdetés feladása' }
  ];
  return (
    <nav style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      padding: '12px 32px',
      margin: '24px auto',
      maxWidth: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>LAKÁSOK</div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {navLinks.map(link => (
          <button
            key={link.key}
            onClick={() => onTabChange(link.key)}
            style={{
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              background: activeTab === link.key ? '#222' : 'none',
              color: activeTab === link.key ? '#fff' : '#222',
              border: 'none',
              padding: '4px 12px',
              borderRadius: 8,
              transition: 'background 0.2s',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          style={{ background: 'none', border: 'none', color: '#222', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
          onClick={onLogin}
        >
          Bejelentkezés
        </button>
        <button
          style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          onClick={onRegister}
        >
          Regisztráció
        </button>
      </div>
    </nav>
  );
}