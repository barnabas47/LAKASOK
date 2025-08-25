import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar, BlogHeader, CategoryFilter, BlogSearch, BlogCard } from './BlogComponents';

const categories = ['Összes város', 'Budapest', 'Debrecen', 'Balaton', 'Szeged'];


function App() {
  const [modalType, setModalType] = useState(null); // 'login' vagy 'register'
  const handleOpenModal = (type) => setModalType(type);
  const handleCloseModal = () => setModalType(null);
  const [activeTab, setActiveTab] = useState('house');
  const [activeCategory, setActiveCategory] = useState('Összes város');
  const [search, setSearch] = useState('');
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('localhost:3001/api/houses')
      .then(res => res.json())
      .then(data => {
        // Átalakítás: author objektumot generálunk
        const converted = data.map(house => ({
          ...house,
          author: {
            name: house.author_name,
            avatar: house.author_avatar
          }
        }));
        setHouses(converted);
      });
  }, []);

  const filteredBlogs = houses.filter(b => {
    const matchesCategory = activeCategory === 'Összes város' || b.category === activeCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
  <div style={{ background: '#fafbfc', minHeight: '100vh', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto', padding: '1px' }}>
  <Navbar onTabChange={setActiveTab} activeTab={activeTab} onLogin={() => handleOpenModal('login')} onRegister={() => handleOpenModal('register')} />
      {modalType && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(2px)',
            zIndex: 1000
          }} onClick={handleCloseModal} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 24px rgba(0,0,0,0.12)',
            padding: 36,
            minWidth: 340,
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18 }}>{modalType === 'login' ? 'Bejelentkezés' : 'Regisztráció'}</h2>
            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" placeholder="Felhasználónév" style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', fontSize: 16 }} />
              <input type="email" placeholder="Email" style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', fontSize: 16 }} />
              <input type="password" placeholder="Jelszó" style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', fontSize: 16 }} />
              {modalType === 'register' && (
                <input type="password" placeholder="Jelszó megerősítése" style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', fontSize: 16 }} />
              )}
              <button type="button" style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 17, cursor: 'pointer' }} onClick={handleCloseModal}>
                {modalType === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
              </button>
              <button type="button" style={{ background: 'none', color: '#222', border: 'none', fontWeight: 500, fontSize: 15, cursor: 'pointer' }} onClick={handleCloseModal}>Mégse</button>
            </form>
          </div>
        </>
      )}
  {/* LAKÁSOK tab eltávolítva */}
      {activeTab === 'house' && (
  <div style={{ maxWidth: 1200, margin: '30px auto', padding: 32 }}>
          <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 32 }}>ELADÓ LAKÁSOK</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
            <BlogSearch value={search} onChange={setSearch} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {houses
              .filter(h => (h.type === 'flat' || h.type === 'apartment'))
              .filter(b => {
                const matchesCategory = activeCategory === 'Összes város' || b.category === activeCategory;
                const matchesSearch =
                  b.title.toLowerCase().includes(search.toLowerCase()) ||
                  b.description.toLowerCase().includes(search.toLowerCase()) ||
                  b.category.toLowerCase().includes(search.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .map((blog, idx) => (
                <BlogCard key={idx} {...blog} />
              ))}
          </div>
        </div>
      )}
      {activeTab === 'apartment' && (
  <div style={{ maxWidth: 1200, margin: '30px auto', padding: 32 }}>
          <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 32 }}>ELADÓ HÁZAK</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
            <BlogSearch value={search} onChange={setSearch} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {houses
              .filter(h => h.type === 'house')
              .filter(b => {
                const matchesCategory = activeCategory === 'Összes város' || b.category === activeCategory;
                const matchesSearch =
                  b.title.toLowerCase().includes(search.toLowerCase()) ||
                  b.description.toLowerCase().includes(search.toLowerCase()) ||
                  b.category.toLowerCase().includes(search.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .map((blog, idx) => (
                <BlogCard key={idx} {...blog} />
              ))}
          </div>
        </div>
      )}
            {activeTab === 'blog' && (
        <div style={{ maxWidth: 900, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h1 style={{ fontSize: 38, fontWeight: 700 }}>EZ ITT A BLOG OLDAL</h1>
        </div>
      )}
      {activeTab === 'hirdetes' && (
        <div style={{ maxWidth: 900, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h1 style={{ fontSize: 38, fontWeight: 700 }}>EZ ITT A HIRDETÉS FELADÁSA OLDAL</h1>
        </div>
      )}
    </div>
  );
}
// ...existing code...

export default App;
