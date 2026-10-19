"""Manje verzije slika, da se stranica brže učitava.

Pokretanje (iz glavnog foldera projekta, treba Python i Pillow: pip install Pillow):
    python alati/male-slike.py

Pravi:
- slike/proizvodi/mala/<id>.webp  – 500 x 500 px, za kartice proizvoda
  (velika slika od 1000 px ostaje za stranicu proizvoda i oštre ekrane)
- slike/logo-mali.webp            – 104 x 104 px, za zaglavlje i podnožje

Pravi samo slike koje nedostaju ili su starije od velike slike.
Nakon toga pokrenite: node alati/generisi-stranice.js
"""
import os
import sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VELIKE = os.path.join(ROOT, "slike", "proizvodi")
MALE = os.path.join(VELIKE, "mala")


def treba(izvor, cilj):
    return not os.path.exists(cilj) or os.path.getmtime(cilj) < os.path.getmtime(izvor)


def main():
    os.makedirs(MALE, exist_ok=True)
    napravljeno = 0
    for ime in sorted(os.listdir(VELIKE)):
        if not ime.endswith(".webp"):
            continue
        izvor, cilj = os.path.join(VELIKE, ime), os.path.join(MALE, ime)
        if not treba(izvor, cilj):
            continue
        slika = Image.open(izvor).convert("RGB")
        slika.thumbnail((500, 500), Image.LANCZOS)
        slika.save(cilj, "WEBP", quality=82, method=6)
        napravljeno += 1
        print("mala slika:", ime)

    logo, logo_mali = os.path.join(ROOT, "slike", "logo.png"), os.path.join(ROOT, "slike", "logo-mali.webp")
    if os.path.exists(logo) and treba(logo, logo_mali):
        slika = Image.open(logo).convert("RGBA")
        slika.thumbnail((104, 104), Image.LANCZOS)
        slika.save(logo_mali, "WEBP", quality=90, method=6)
        napravljeno += 1
        print("logo:", "slike/logo-mali.webp")

    print("Gotovo. Novih slika:", napravljeno)


if __name__ == "__main__":
    sys.exit(main())
