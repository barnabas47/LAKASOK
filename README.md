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
<img width="1838" height="1064" alt="image" src="https://github.com/user-attachments/assets/3169792b-a3b9-4c48-9256-f8270818bb35" />
<img width="1836" height="1068" alt="image" src="https://github.com/user-attachments/assets/622ab1c1-e32f-4251-8ec2-43829eb280c2" />
<img width="1834" height="1069" alt="image" src="https://github.com/user-attachments/assets/c647c8fc-8f9e-4b76-802c-fd850ea599f6" />
