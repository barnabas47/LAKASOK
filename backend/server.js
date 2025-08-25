const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// SQLite adatbázis létrehozása
const db = new sqlite3.Database('./houses.db', (err) => {
  if (err) {
    console.error('Nem sikerült megnyitni az adatbázist:', err.message);
  } else {
    console.log('SQLite adatbázis csatlakoztatva.');
  }
});

// Tábla létrehozása, ha nem létezik
const createTable = `CREATE TABLE IF NOT EXISTS houses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT,
  category TEXT,
  title TEXT,
  description TEXT,
  author_name TEXT,
  author_avatar TEXT,
  date TEXT,
  type TEXT
)`;
db.run(createTable, () => {
  // Minta adatok beszúrása, ha üres
  const seedData = [
  {
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=800',
    category: 'Budapest',
    title: 'Budapesti családi ház',
    description: 'Világos, tágas ház a város szívében, kiváló közlekedéssel.',
    author_name: 'Kiss Anna',
    author_avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '2025-08-01',
    type: 'house'
  },
  {
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800',
    category: 'Debrecen',
    title: 'Debreceni családi ház',
    description: 'Nagy kert, csendes környék, ideális családoknak.',
    author_name: 'Nagy Péter',
    author_avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2025-07-15',
    type: 'house'
  },
  {
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&w=800',
    category: 'Szeged',
    title: 'Szegedi családi ház',
    description: 'Modern berendezés, alacsony rezsi, jó közlekedés.',
    author_name: 'Szabó Eszter',
    author_avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: '2025-06-30',
    type: 'house'
  },
  {
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=800',
    category: 'Pécs',
    title: 'Pécsi családi ház',
    description: 'Panorámás kilátás, csendes környezet, új bútorok.',
    author_name: 'Tóth Gábor',
    author_avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    date: '2025-08-10',
    type: 'house'
  },
  {
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&w=800',
    category: 'Győr',
    title: 'Győri családi ház',
    description: 'Nagy udvar, garázs, jó szomszédság.',
    author_name: 'Farkas Zsuzsa',
    author_avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: '2025-07-25',
    type: 'house'
  },
  {
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&w=800',
    category: 'Budapest',
    title: 'Belvárosi lakás',
    description: 'Felújított, modern lakás a belvárosban, közel a metróhoz.',
    author_name: 'Varga Dóra',
    author_avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    date: '2025-08-12',
    type: 'apartment'
  },
  {
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800',
    category: 'Szeged',
    title: 'Szegedi panel lakás',
    description: 'Világos, tágas panel lakás, jó közlekedéssel és alacsony rezsivel.',
    author_name: 'Kovács Gergő',
    author_avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    date: '2025-07-28',
    type: 'apartment'
  },
  {
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800',
    category: 'Pécs',
    title: 'Pécsi új építésű lakás',
    description: 'Új építésű lakás, modern berendezéssel, csendes környezetben.',
    author_name: 'Tóth László',
    author_avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    date: '2025-08-05',
    type: 'apartment'
  },
  ];
  db.get('SELECT COUNT(*) AS count FROM houses', (err, row) => {
    if (row && row.count === 0) {
      seedData.forEach(house => {
        db.run(`INSERT INTO houses (image, category, title, description, author_name, author_avatar, date, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [house.image, house.category, house.title, house.description, house.author_name, house.author_avatar, house.date, house.type]);
      });
    }
  });
});

// API végpont: összes ház/lakás lekérése
app.get('/api/houses', (req, res) => {
  db.all('SELECT * FROM houses', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

const os = require('os');
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIp();
  console.log(`Backend szerver fut: http://${ip}:${PORT} vagy http://localhost:${PORT}`);
});
