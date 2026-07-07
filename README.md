# Kobalt Real Estate — strona internetowa

Statyczna strona (HTML/CSS/JS, bez frameworków, bez backendu), gotowa pod GitHub Pages.

## Struktura

```
index.html              wersja polska (główna)
en/index.html           placeholder pod przyszłą wersję angielską
assets/
  css/style.css          style
  js/script.js           menu mobilne, scroll-reveal, rok w stopce
  img/
    favicon.svg
    hero/                zdjęcie tła Hero
    sections/             zdjęcia Development / Doradztwo + rezerwa
    projects/              zdjęcie lotnicze Projekty + rezerwa
    team/                  puste — miejsce na zdjęcia Michała i Daniela
```

## Uruchomienie lokalne

To zwykłe pliki statyczne — wystarczy otworzyć `index.html` w przeglądarce, albo odpalić dowolny lokalny serwer statyczny w tym folderze (np. rozszerzenie „Live Server” w VS Code).

## Do uzupełnienia przed publikacją

- Bio Daniela Cymerskiego (sekcja „Kim jesteśmy”, obecnie: *treść oczekiwana*)
- Liczby `[X]` / `[Y]` / `[Z]` w sekcji „Track Record” (statystyki zespołu)
- `[N] mkw.` oraz nazwy/kategorie projektów w sekcji „Projekty”
- Adresy e-mail i numery telefonów w sekcji „Kontakt” (obecnie `[email]` / `[telefon]`)
- Zdjęcia Michała Białasa i Daniela Cymerskiego → wrzucić do `assets/img/team/` i podmienić inicjały (`.avatar`) w `index.html` na `<img>`

## Wersja angielska

`en/index.html` to na razie zaślepka. Docelowo: skopiować strukturę `index.html`, przetłumaczyć treść, zaktualizować przełącznik językowy w nawigacji (obecnie „EN” jest nieaktywne).
