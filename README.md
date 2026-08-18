# LEGRADI weboldal - GitHub Pages csomag

Ez a mappaszerkezet kozvetlenul feltoltheto a GitHub `Legradis` repository gyokerebe.

## Fo mappak

- `index.html` - fooldal
- `*.html` - aloldalak
- `assets/css/styles.css` - teljes megjelenes
- `assets/js/main.js` - menu, galeria es interakciok
- `assets/images/headers/` - a Google Drive `fejlec kepek` mappajabol szarmazo, kesz fekete atmenetes fejlec kepek
- `assets/images/` - referencia- es tartalmi kepek

## Fejlec kepek kiosztasa

- `headers/home.png` -> Fooldal
- `headers/planning.png` -> Tervezes
- `headers/stairs.png` -> Design lepcsok
- `headers/furniture.png` -> Egyedi butorok
- `headers/retail.png` -> Uzletberendezesek
- `headers/stock.png` -> Butorok keszletrol
- `headers/technology.png` -> 3D nyomtatas / Technologia
- `headers/blog.png` -> Blog
- `headers/references.png` -> Referenciak
- `headers/about.png` -> Rolunk
- `headers/contact.png` -> Kapcsolat

A fejlec kepekre a CSS NEM tesz ujabb fekete vagy szurke reteget. A sotet atmenet mar magaban a kepben van.

## Kepek csereje

Ha kesobb ugyanazon oldal fejlecet akarod lecserelni, a legegyszerubb ugyanazzal a fajlnevvel felulirni a megfelelo fajlt az `assets/images/headers/` mappaban.

## GitHub Pages

A repositoryban:

1. `Settings`
2. `Pages`
3. `Source: Deploy from a branch`
4. `Branch: main`
5. `Folder: / (root)`

Az `index.html` kozvetlenul a repository gyokereben legyen.
