# Gustaw — Minimalistyczna strona projektów

Czysta, minimalistyczna, czarno-biała strona zawierająca Twoje dane kontaktowe oraz 5 wybranych projektów, gotowa do wdrożenia na **Cloudflare Pages**.

## 📁 Struktura plików

- [`index.html`](file:///Users/gustaw/CV/index.html) — Twoje imię i nazwisko, linki (GitHub, LinkedIn, Email) oraz 5 projektów
- [`style.css`](file:///Users/gustaw/CV/style.css) — Prosty, czytelny styl czarno-biały (automatycznie dopasowuje się do ciemnego/jasnego motywu systemu)
- [`_headers`](file:///Users/gustaw/CV/_headers) — Podstawowe nagłówki bezpieczeństwa i pamięci podręcznej dla Cloudflare Pages

---

## ✏️ Jak edytować stronę

Otwórz plik [`index.html`](file:///Users/gustaw/CV/index.html):
1. **Imię i nazwisko**: Zmień w linijce `<h1 class="name">Gustaw</h1>`
2. **Linki społecznościowe**: Zmień linki w sekcji `<nav class="links">` (do swojego GitHuba, LinkedIna i adres e-mail)
3. **5 Projektów**: W sekcji `<ul class="project-list">` podmień nazwy projektów, opisy i linki URL.

---

## 🚀 Jak wdrożyć na Cloudflare Pages

### Opcja 1: Przeciągnij i upuść w przeglądarce (30 sekund)
1. Zaloguj się na [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Przejdź do **Workers & Pages** -> **Create application** -> zakładka **Pages** -> **Upload assets**.
3. Wpisz nazwę projektu (np. `gustaw-cv`).
4. Przeciągnij ten folder (`CV`) i kliknij **Deploy site**.
5. Strona od razu działa pod darmowym adresem `https://twoja-nazwa.pages.dev`.

### Opcja 2: Przez Git (automatyczne aktualizacje przy każdym commicie)
1. Utwórz nowe repozytorium na GitHubie i wyślij pliki.
2. W Cloudflare Pages wybierz **Connect to Git** i wskaż swoje repozytorium.
3. Pozostaw ustawienia budowania puste (Build command: puste, Output directory: `.`).
4. Kliknij **Save and Deploy**.

### Opcja 3: Przez terminal (Wrangler)
```bash
npx wrangler pages deploy .
```
