# Sass és SCSS 


## CSS, Sass és SCSS – mi a különbség?

### CSS

A **CSS (Cascading Style Sheets)** a weboldalak megjelenítésének leírására szolgál. A böngésző közvetlenül értelmezi a CSS-szabályokat.

```css
#base {
    background-color: plum;
}
```

### Sass

A **Sass** egy CSS-t kiegészítő stíluslapnyelv és eszközrendszer. Többek között változókat, beágyazott szabályokat és függvényeket használhatunk benne, hogy a stíluslapokat egyszerűbben lehessen megírni és karbantartani.

**Fontos: a Sass-forráskódot előbb CSS-re kell fordítani.** A böngésző a fordítás eredményeként létrejövő `.css` fájlt használja, nem a `.scss` fájlt.

### SCSS

Az **SCSS** a Sass egyik szintaxisa. A `.scss` kiterjesztésű fájlok a hagyományos CSS-hez nagyon hasonlóan, kapcsos zárójelekkel és pontosvesszőkkel írhatók.

Például:

```scss
$base: plum;

#base {
    background-color: $base;
}
```

A `$base` Sass-változó: a fordító a változó helyére annak értékét (`plum`) helyettesíti.

A Sass másik, `.sass` kiterjesztésű szintaxisa behúzásokat használ, és nem igényel kapcsos zárójeleket, illetve pontosvesszőket. **Ebben a feladatban az SCSS-szintaxist használjuk.**

---

## 3. A `colors.html` felépítése – fentről lefelé

A teljes HTML-fájl:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sass Color Manipulation Functions</title>
    <link rel="stylesheet" href="colors.css">
</head>
<body>
    <div class="columns">
        <div id="lighter2"></div>
        <div id="lighter1"></div>
        <div id="base"></div>
        <div id="darker1"></div>
        <div id="darker2"></div>
    </div>
</body>
</html>
```

### A fejléc

- `<link rel="stylesheet" href="colors.css">`: a **lefordított CSS-fájlt** kapcsolja a HTML-hez.

**Miért nem `href="colors.scss"`?** Mert a böngésző számára a lefordított CSS szükséges. A Sass-függvényeket és a `$`-os változókat a Sass-fordító dolgozza fel.

---

## 4. A `colors.scss` szerkezete – a stílusok magyarázata

### 4.1. A Sass színmoduljának betöltése

```scss
@use "sass:color";
```

- Az `@use` egy Sass-modult tesz elérhetővé az SCSS-fájlban.
- A `sass:color` a Sass **beépített** színkezelő modulja. Nem egy külön letöltendő CSS-fájl vagy webcím.
- Így a modul függvényeit például `color.adjust(...)` formában használhatjuk.

**Ne keverjük össze:** a CSS-es `@import` stíluslapok betöltésére is használható; az itt alkalmazott Sass-`@use` viszont fordítás közben tesz elérhetővé függvényeket és más Sass-tagokat.

### 4.2. A böngésző alapértelmezett margójának eltávolítása

```scss
body {
    margin: 0;
}
```

A `body` elem külső margóját nullára állítjuk. Így a színoszlopok közvetlenül a böngésző megjelenítési területének széléig érhetnek, nem marad körülöttük az alapértelmezett térköz.

### 4.3. A külső konténer: Flexbox

```scss
div.columns {
    display: flex;
    height: 100vh;
}
```
Alapvetően egymás alá tenné a columns osztályú divnek a gyermekeit, viszont a `display: flex`-el már így egymás mellé kerülnek, a külső div flexkonténerré válik, és az öt gyermekét alapértelmezés szerint egymás mellé rendezi.


- `height: 100vh`: a konténer magassága a böngésző megjelenítési területének magasságával egyezik meg. A `vh` a viewport magasságának századrésze; `100vh` ennek százszorosa.


### 4.4. Beágyazott szabály: `> div`

Az SCSS-ben a konténer szabálya **belsejébe** írjuk az oszlopokra vonatkozó szabályt:

```scss
div.columns {
    display: flex;
    height: 100vh;

    > div {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: center;
    }
}
```


A Sass a beágyazott szabályból a következő CSS-szelektort állítja elő:

```css
div.columns > div {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
}
```

**Mi az előnye?** Nem kell minden szabálynál újra leírni a teljes `div.columns > div` szelektort; a kapcsolódó formázások egy helyen olvashatók.
Ezekre is beállítjuk a display: flex tulajdonságot, tehát mind az öt oszlop külön-külön flexkonténerré válik.

**Miért kell még egy display:flex?**
Mert most már nem az öt oszlopot akarjuk elrendezni egymáshoz képest, hanem az egyes oszlopokon belüli szöveget.
Ilyenkor lényegében meg a korábban gyermek div kell, hogy felvegye a konténer szerepét, és ahhoz viszonyítva igazítjuk majd a szöveget.

**Miért nem elég egyetlen display: flex?**
Mert a display: flex csak az adott elem közvetlen gyermekeinek elrendezésére vonatkozik, nem automatikusan az összes további leszármazottra.

A belső tulajdonságok:

| Tulajdonság | Jelentés ebben a példában |
|---|---|
| `display: flex` | Minden színoszlop maga is flexkonténer lesz |
| `flex: 1` | Az öt oszlop egyenlő arányban osztozik a rendelkezésre álló szélességen |
| `align-items: center` | A feliratot az oszlopon belül **függőlegesen** középre igazítja (az aktuális flexirány mellett) |
| `justify-content: center` | A feliratot **vízszintesen** középre igazítja |

A `flex: 1` egy rövidítés, amelynek itt az a gyakorlati hatása, hogy az öt hasonló oszlop azonos szélességet kap. Eltérő tartalom vagy további méretkorlátok mellett a Flexbox méretezése összetettebb lehet.

### 4.5. Az `&::before` és az `attr(id)`

Az előző szabályon belül még egy beágyazott szabály található:

```scss
div.columns {
    > div {
        &::before {
            content: attr(id);
        }
    }
}
```

**Mit jelent az `&`?** Sass-beágyazásnál az `&` az **aktuális szülőszelektorra** hivatkozik.

Ebben a helyzetben a szülőszelektor: `div.columns > div`. Ezért a lefordított CSS:

```css
div.columns > div::before {
    content: attr(id);
}
```

- A `::before` egy pszeudoelem, amely a kiválasztott elem tartalmának elején jeleníthet meg generált tartalmat.
- A `content` adja meg a pszeudoelem tartalmát.
- Az `attr(id)` **kiolvassa a HTML-elem `id` attribútumának értékét**, és azt jeleníti meg.

Például a HTML-ben:

```html
<div id="lighter1"></div>
```

A hozzá tartozó CSS:

```css
#lighter1 {
    background-color: ...;
}

div.columns > div::before {
    content: attr(id);
}
```

Így az oszlop belsejében a **`lighter1`** felirat látszik, noha a HTML-elem eredetileg üres volt.


---

## 5. Sass-változók és színmódosítás

Ez a példa legfontosabb, kifejezetten Sasshoz kapcsolódó része.

### 5.1. Változó létrehozása

```scss
$base: plum;
```

- A Sass-változó neve **`$base`**: a Sass-változókat `$` karakterrel kezdjük.

Például:

```scss
#base {
    background-color: $base;
}
```

Lefordítva a feltöltött `colors.css` szerint:

```css
#base {
    background-color: plum;
}
```

**Ne keverjük össze a CSS-változókkal:** a Sass `$base` változóját a **fordító** dolgozza fel. A CSS saját változóit más formában írjuk, például `--base-color: plum;` és `var(--base-color)`; ezeket a **böngésző** kezeli.

### 5.2. A `color.adjust()` függvény

```scss
$lighter1: color.adjust($base, $hue: 5, $lightness: 10%);
```

A függvény **egy meglévő szín meghatározott színtulajdonságait módosítja**, majd visszaadja az új színt.

A paraméterek:

| Rész | Jelentés |
|---|---|
| `color.adjust(...)` | A `sass:color` modul színmódosító függvénye |
| `$base` | A módosítandó kiindulási szín (`plum`) |
| `$hue: 5` | A színárnyalat szögét 5 fokkal növeli |
| `$lightness: 10%` | A világosság értékét **10 százalékponttal növeli** |
| `$lighter1:` | A kapott színt ebbe a Sass-változóba mentjük |

A `hue` a szín árnyalatát írja le egy színkör mentén; a `lightness` azt, mennyire világos vagy sötét a szín. A példa egy hagyományos szín HSL-jellemzőit módosítja.


### 5.3. Az öt szín változói

A teljes változódefiníciós rész:

```scss
$base: plum;
$lighter1: color.adjust($base, $hue: 5, $lightness: 10%);
$lighter2: color.adjust($base, $hue: 10, $lightness: 20%);
$darker1: color.adjust($base, $hue: -5, $lightness: -10%);
$darker2: color.adjust($base, $hue: -10, $lightness: -20%);
```

| Változó | Színárnyalat (`hue`) változása | Világosság (`lightness`) változása | Eredmény |
|---|---:|---:|---|
| `$lighter2` | +10° | +20 százalékpont | A legvilágosabb változat |
| `$lighter1` | +5° | +10 százalékpont | Világosabb változat |
| `$base` | 0° | 0 százalékpont | Az eredeti `plum` |
| `$darker1` | −5° | −10 százalékpont | Sötétebb változat |
| `$darker2` | −10° | −20 százalékpont | A legsötétebb változat |

A pozitív érték **növeli**, a negatív érték **csökkenti** az adott jellemzőt. A színek tehát nem pusztán sötétebbek vagy világosabbak: a `hue` változása miatt kissé az árnyalatuk is eltolódik.

### 5.4. A változók alkalmazása az oszlopokra

```scss
#lighter2 {
    background-color: $lighter2;
}

#lighter1 {
    background-color: $lighter1;
}

#base {
    background-color: $base;
}

#darker1 {
    background-color: $darker1;
}

#darker2 {
    background-color: $darker2;
}
```

- A `#lighter2` az `id="lighter2"` elemhez tartozik.
- A `background-color` az elem **háttérszínét** állítja be.
- A `$lighter2` helyére a fordításkor a Sass által kiszámolt konkrét szín kerül.
- A többi oszlop ugyanezen az elven működik.

Ha később megváltoztatjuk a `$base` értékét, majd **újrafordítjuk az SCSS-t**, a négy számított szín is az új alapból készül el. Így egyetlen alapszín módosításával teljes színpalettát alakíthatunk át.

---

## 6. Miért néz ki másképp a `colors.css`?

A feltöltött `colors.css` már a Sass-fordítás **eredménye**. Ebben:

1. Nincsenek `$base`, `$lighter1` stb. Sass-változók.
2. Nincsen `@use "sass:color"` és `color.adjust(...)` hívás.
3. A beágyazott szelektorokból teljes CSS-szelektorok lettek.
4. A kiszámított színértékek konkrét CSS-színként jelennek meg.

Például az eredeti SCSS:

```scss
$lighter1: color.adjust($base, $hue: 5, $lightness: 10%);

#lighter1 {
    background-color: $lighter1;
}
```

A csatolt CSS-ben ennek az eredménye:

```css
#lighter1 {
    background-color: rgb(91.9379844961%, 77.4737802098%, 90.7326341389%);
}
```

**Miért ilyen hosszúak a számok?** A Sass a színérték számítása után egy szabályos CSS `rgb(...)` kifejezést ír ki, itt százalékos vörös, zöld és kék komponensekkel. 

A csatolt CSS további színbeállításai:

```css
#lighter2 {
    background-color: rgb(97.2093023256%, 92.2024623803%, 96.3748290014%);
}

#base {
    background-color: plum;
}

#darker1 {
    background-color: rgb(78.6137710898%, 48.0164158687%, 81.3953488372%);
}

#darker2 {
    background-color: rgb(68.9846481228%, 33.2877336981%, 76.1240310078%);
}
```

A fordító verziójától és kimeneti beállításaitól függően a konkrét színértékek szöveges megjelenése eltérhet, de a lényeg ugyanaz: **a böngésző kész CSS-színértékeket kap**.

---

## 7. Mi az a `colors.css.map`?

A `.map` fájl **source map**, azaz *forrástérkép*. Nem stíluslap és nem HTML-dokumentum: **a fejlesztőeszközöknek szóló kiegészítő információ**.

### 7.1. Mire jó?

Amikor a Sass lefordítja a `colors.scss` fájlt, a létrejövő CSS szerkezete eltérhet az eredeti forrásétól. A forrástérkép megmondja, hogy a CSS egy adott részének **melyik SCSS-forrásrész felel meg**.

Ez hibakeresésnél hasznos: a böngésző fejlesztői eszközeiben az eredeti SCSS-re vonatkozó információk is megjelenhetnek, nem csak a generált CSS sorai.

### 7.2. Honnan tudja a böngésző, hogy létezik?

A `colors.css` utolsó sora:

```css
/*# sourceMappingURL=colors.css.map */
```

Ez egy speciális komment, amely a hozzá tartozó source map fájlt jelöli. A böngésző a stílusok értelmezésekor ettől még a **CSS szabályait** alkalmazza.


### 7.3. Kötelező a `.map` fájl?

**Nem.** A weboldal a `colors.css` segítségével akkor is megfelelően megjelenhet, ha nem készítünk source mapet. A `.map` elsősorban fejlesztéshez, hibakereséshez hasznos.

**Gyakorlati szabály:** a `colors.css.map` fájlt nem szükséges kézzel szerkeszteni. Ha az SCSS-t módosítjuk, **újrafordítjuk**, és a Sass szükség esetén újragenerálja a CSS-t és a source mapet is.

---

## 8. Hogyan fordítjuk le az SCSS-t CSS-re?

A Sass fordításához szükségünk van egy **Sass-fordítóra**. A VS Code önmagában attól még nem fordítja le az SCSS-t, hogy felismeri a fájl szintaxisát.

Az alábbi példa a hivatalos **Dart Sass** eszközzel működik.

### 8.1. Telepítés

Ha a gépen Node.js és npm már rendelkezésre áll, terminálban:

```bash
npm install -g sass
```
vagy https://github.com/sass/dart-sass/releases/tag/1.108.2

A telepítés ellenőrzése:

```bash
sass --version
```

Node.js nélkül a hivatalos weboldalról letölthető az önálló Sass-fordító is.

### 8.2. Egyszeri fordítás

A `colors.scss` fájlt tartalmazó mappában:

```bash
sass colors.scss colors.css
```

Ez az SCSS-forrásból létrehozza vagy frissíti a `colors.css` fájlt. A Dart Sass alapértelmezetten source mapet is készít a fájlba történő fordításhoz.

### 8.3. Automatikus újrafordítás módosításkor

```bash
sass --watch colors.scss:colors.css
```

A `--watch` figyeli a forrásfájlt, és **minden mentés után újragenerálja** a CSS-t. A figyelés a terminálban a `Ctrl + C` billentyűkombinációval állítható le.

### 8.4. Fordítás source map nélkül

Ha nincs szükség a `.css.map` fájlra:

```bash
sass --no-source-map colors.scss colors.css
```

Ebben az esetben az újonnan generált CSS nem hivatkozik source mapre. Egy korábbról megmaradt `.map` fájl ettől még fizikailag a mappában maradhat; azt szükség esetén külön törölhetjük.

---

## Hivatalos dokumentáció

- [Sass – dokumentáció és áttekintés](https://sass-lang.com/documentation/)
- [Sass – a `sass:color` modul és `color.adjust()`](https://sass-lang.com/documentation/modules/color/)
- [Sass – beágyazott szabályok](https://sass-lang.com/documentation/style-rules/)
- [Sass – a szülőszelektor (`&`)](https://sass-lang.com/documentation/style-rules/parent-selector/)
- [Sass – telepítés](https://sass-lang.com/install/)
- [Dart Sass – parancssor, `--watch` és source map](https://sass-lang.com/documentation/cli/dart-sass/)
