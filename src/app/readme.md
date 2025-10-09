# Fejlesztési és Telepítési útmutató

## Projekt telepítése

Projekt gyökér mappában
```
npm install
```
---


## Github Pages deployment ##

```
ng build --output-path docs --base-href https://himzo-sch.github.io/embroidery_calculator/
```

Projekt gyökér mappában újra létre kell hozni a docs mappába a `404.html` fájlt, az `index.html` fájl tartalmát belemásolni és úgy felkommitolni a `gh-pages` ágra a többi módosítással együtt.

---