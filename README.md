# LAKÁSOK

Ez a projekt egy egyszerű ingatlan (lakás/ház) kereső webalkalmazás React frontenddel és Express + SQLite backenddel.

## Fő funkciók
- Eladó lakások és házak listázása adatbázisból
- Kategória szűrő, kereső
- Modal ablak bejelentkezéshez/regisztrációhoz
- Backend API: Express + SQLite
- Frontend: React (Vite)

## Telepítés

1. Klónozd a repót:
   ```bash
   git clone https://github.com/barnabas47/LAKASOK.git
   ```
2. Telepítsd a backend és frontend függőségeit:
   ```bash
   cd LAKASOK/backend
   npm install
   cd ../my-react-app
   npm install
   ```
3. Indítsd el a backend szervert:
   ```bash
   cd ../backend
   node server.js
   ```
4. Indítsd el a frontendet:
   ```bash
   cd ../my-react-app
   npm run dev
   ```

## Használat
- A frontend elérhető böngészőből: `http://localhost:5173` (vagy a helyi IP-n)
- A backend API: `http://localhost:3001/api/houses`
- Mobilról teszteléshez a fetch URL-t állítsd a gép IP-címére!

## Képek
