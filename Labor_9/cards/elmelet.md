# CSS és Flexbox – Kártyalapok megjelenítése

# Stíluslapok szétválasztása és a `@import` szabály

A feladat három fájlból áll:

```text
cards-flex.html   -->   a kártyák HTML-szerkezete és adatai
cards-flex.css    -->   az elrendezés szabályai (Flexbox)
cards.css         -->   a kártyalapok alapvető kinézete
```

A HTML-dokumentum `<head>` részében csak egyetlen CSS-fájlra hivatkozunk:

```html
<link rel="stylesheet" href="cards-flex.css">
```

A `cards-flex.css` fájl legelején pedig betöltjük a kártyák kinézetét leíró `cards.css` stíluslapot:

```css
@import "cards.css";
```

Ez a felosztás azért praktikus, mert a kártyalapok alapformázása (`cards.css`) teljesen független marad attól, hogy milyen elrendezési technikával helyezzük el őket az oldalon. Ha később például CSS Grid vagy abszolút pozicionálás segítségével rendeznénk el ugyanazokat a kártyákat, a `cards.css` változatlanul újrahasznosítható.

**Fontos:** az `@import` szabálynak mindig a CSS-fájl **legelején** kell állnia (legfeljebb `@charset` előzheti meg), minden más stílusszabály előtt. Ha egy szabály után írjuk, a böngésző figyelmen kívül hagyja.

---

# Egyedi HTML-attribútumok: `data-*`

A HTML-ben nem találhatunk külön `suit` (szín) vagy `rank` (érték) nevű szabványos attribútumot. Ha saját névvel vennénk fel ilyeneket, a HTML-dokumentum érvénytelenné válna.

Erre szolgálnak a **`data-*` egyedi adatattribútumok**: bármilyen saját attribútumot létrehozhatunk, ha a neve `data-` előtaggal kezdődik.

Például egy pikk ász kártya a `cards-flex.html` fájlban:

```html
<div class="card" data-suit="spades" data-rank="A">
    <span class="topLeft">
        <span class="rank"></span>
        <br>
        <span class="suit"></span>
    </span>
    <span class="center suit"></span>
    <span class="bottomRight">
        <span class="rank"></span>
        <br>
        <span class="suit"></span>
    </span>
</div>
```

A szerkezet fa formájában:

```text
div.card  [data-suit, data-rank]
├── span.topLeft
│   ├── span.rank
│   ├── br
│   └── span.suit
├── span.center.suit
└── span.bottomRight
    ├── span.rank
    ├── br
    └── span.suit
```

**Miért előnyös ez a megoldás?**

- A HTML-dokumentum továbbra is szabványos és érvényes marad.

- A kártya adatai (`data-suit`, `data-rank`) egyetlen helyen, a külső `.card` elemen szerepelnek, nem kell háromszor beírni ugyanazt a szimbólumot a HTML-be.

- A CSS attribútumszelektorokkal közvetlenül ki tudja olvasni ezeket az értékeket.

---

## Több CSS-osztály egyetlen elemen

A kártya középső jelzésénél a `class` attribútumban két osztálynév szerepel szóközzel elválasztva:

```html
<span class="center suit"></span>
```

Ez **nem** egyetlen `"center suit"` nevű osztályt jelent, hanem azt, hogy az elem egyszerre tartozik a `center` és a `suit` osztályba is.

Így a `.center` szelektorral beállíthatjuk a középső szimbólum nagy méretét, miközben a `.suit` szelektor ugyanúgy elhelyezi benne a kártyaszín jelét, mint a sarkokban lévő `span.suit` elemekben.

---

# A kártyalap alapformázása (`cards.css`)

## Dobozmodell és a `box-sizing: border-box`

A kártyalap alapméreteit és keretét a `.card` szabály adja meg:

```css
.card {
    background-color: white;
    border: medium solid black;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-family: sans-serif;
    height: 3.5in;
    width: 2.5in;
}
```

A CSS alapértelmezett dobozmodelljében (`box-sizing: content-box`) a `width` és a `height` csak a **belső tartalmi terület** méretét adja meg. A `padding` és a `border` ezen felül hozzáadódik az elem teljes szélességéhez és magasságához.

Ha azonban beállítjuk a `box-sizing: border-box` tulajdonságot, a megadott `width` és `height` már magában foglalja a belső térközt és a szegélyt is:

```text
content-box:   teljes szélesség = width + padding + border
border-box:    teljes szélesség = width (benne van a padding és a border)
```

Ennek köszönhetően a kártya külső mérete a fekete szegéllyel együtt is pontosan `2.5in` × `3.5in` marad.

---

## Mértékegységek: `in`, `rem` és `%`

A `cards.css` fájlban többféle mértékegység jelenik meg egyszerre:

| Mértékegység | Típus | Jelentése a feladatban |
|---|---|---|
| `in` | Abszolút (fizikai) | *Inch* (hüvelyk). A szabványos pókerkártya valódi mérete `2.5in` × `3.5in`. |
| `rem` | Relatív | *Root em*, a gyökérelem (`<html>`) betűméretéhez viszonyított egység (`0.5rem`, `0.25rem`). |
| `%` | Relatív | Az örökölt betűmérethez viszonyított százalékos érték (`200%`, `400%`). |

A `rem` és a `%` használata azért előnyös, mert ha az alapértelmezett betűméret megváltozik, a sarkok lekerekítése, a belső térközök és a szimbólumok mérete arányosan követi azt.

---

## Attribútumszelektorok és generált tartalom (`::before`)

A HTML-ben a `.rank` és `.suit` elemek üresek. A megjelenő karaktereket CSS-ből hozzuk létre attribútumszelektorok és a `::before` pszeudoelem segítségével:

```css
.card[data-rank=A] span.rank::before {
    content: "A";
}

.card[data-suit=spades] span.suit::before {
    content: "\2660";
}

.card[data-suit=clubs] span.suit::before {
    content: "\2663";
}

.card[data-suit=hearts] span.suit::before {
    content: "\2665";
}

.card[data-suit=diamonds] span.suit::before {
    content: "\2666";
}
```

Nézzük meg, hogyan épül fel egy ilyen szelektor:

```text
.card[data-suit=hearts]
    olyan .card elem, amelynek data-suit attribútuma "hearts"
span.suit
    a benne található "suit" osztályú span elem
::before
    az elem tartalma elé beszúrt pszeudoelem
```

A `content` tulajdonságban szereplő `\2660`, `\2663`, `\2665` és `\2666` értékek **Unicode escape szekvenciák** (hexadecimális karakterkódok):

```text
\2660   -->   ♠ (pikk / spades)
\2663   -->   ♣ (treff / clubs)
\2665   -->   ♥ (kőr / hearts)
\2666   -->   ♦ (káró / diamonds)
```

Ha a HTML-ben egyetlen attribútumot átírunk (például `data-suit="spades"` helyett `data-suit="hearts"`), a böngésző automatikusan kicseréli a kártya mindhárom szimbólumát és a színét is.

---

## A `:is()` pszeudoosztály

A `:is()` funkcionális pszeudoosztály egy szelektorlistát vesz át, és minden olyan elemre illeszkedik, amelyre a listából legalább egy szelektor igaz. Segítségével elkerülhető a hosszú ismétlés.

### Kártyaszínek beállítása

```css
.card:is([data-suit=clubs], [data-suit=spades]) {
    color: black;
}

.card:is([data-suit=diamonds], [data-suit=hearts]) {
    color: red;
}
```

Ez rövidebb formája annak, mintha külön-külön írnánk fel a két szelektort:

```css
.card[data-suit=clubs],
.card[data-suit=spades] {
    color: black;
}
```

### Sarkok közös formázása

```css
.card :is(.topLeft, .bottomRight) {
    display: inline-block;
    font-size: 200%;
    padding: 0.25rem;
    text-align: center;
}
```

**Ne keverjük össze a szóköz miatt:**

- `.card:is(...)` (**szóköz nélkül**): olyan `.card` elemet választ ki, amely *saját maga* rendelkezik a felsorolt tulajdonságokkal.

- `.card :is(...)` (**szóközzel**): leszármazott-szelektor, vagyis a `.card` elemen *belüli* `.topLeft` és `.bottomRight` elemeket választja ki.

---

## 2D transzformáció: `transform: rotate()`

A valódi francia kártyákon a jobb alsó sarokban lévő jelzés fejjel lefelé áll, hogy a kártya bármelyik irányból leolvasható legyen.

Ezt CSS-ben a `transform` tulajdonsággal valósítjuk meg:

```css
.card .bottomRight {
    transform: rotate(180deg);
}
```

A `rotate(180deg)` az elemet a saját középpontja körül `180` fokkal elforgatja.

**Fontos:** a `transform` csak az elem **vizuális megjelenítését** változtatja meg, az oldal elrendezésében (layout) továbbra is az eredeti helyét és méretét foglalja el, így nem tolja el a környező elemeket.

---

# Elrendezés Flexbox segítségével (`cards-flex.css`)

A **Flexbox** (*Flexible Box Layout*) egy egydimenziós elrendezési modell, amelyet arra terveztek, hogy egy konténeren belül rugalmasan ossza el a helyet és igazítsa a közvetlen gyerekelemeket.

A Flexbox két merőleges tengely mentén dolgozik:

```text
Főtengely (main axis)        -->   alapértelmezetten vízszintes (balról jobbra)
Kereszttengely (cross axis)  -->   a főtengelyre merőleges (fentről lefelé)
```

A feladat egyik legfontosabb megoldása, hogy a **Flexbox két szinten, egymásba ágyazva** jelenik meg:

```text
.cards   -->   Flex konténer (a kártyákat rendezi sorba az oldalon)
└── .card   -->   Flex elem ÉS egyben újabb Flex konténer is
    ├── .topLeft       -->   Flex elem
    ├── .center        -->   Flex elem
    └── .bottomRight   -->   Flex elem
```

---

## Külső Flex konténer: a kártyák elrendezése (`.cards`)

```css
body {
    margin: 0;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem;
}
```

- `display: flex`: a `.cards` elem flex konténerré válik, közvetlen gyerekei (`.card`) pedig alapértelmezés szerint egy sorba rendeződnek.

- `flex-wrap: wrap`: alapértelmezés szerint (`nowrap`) a flex elemek egyetlen sorba próbálnak bezsúfolódni. A `wrap` engedélyezi a **sortörést**, így ha az ablak keskenyebb, a kártyák automatikusan új sorba kerülnek.

- `gap: 1rem`: egységes távolságot (hézagot) hoz létre a kártyák között vízszintesen és függőlegesen is, anélkül, hogy az egyes kártyákra külön margót kellene tenni.

---

## Belső Flex konténer: a kártya elemei (`.card`)

```css
.card {
    align-items: center;
    display: flex;
    justify-content: space-between;
}
```

Mivel a `.card` is `display: flex` beállítást kapott, a benne lévő három elem (`.topLeft`, `.center`, `.bottomRight`) flex elemként helyezkedik el a vízszintes főtengely mentén.

### 1. Elosztás a főtengelyen: `justify-content: space-between`

A `justify-content` a vízszintes főtengely mentén osztja el a fennmaradó szabad helyet:

- az első elem (`.topLeft`) a kártya bal szélére kerül;

- az utolsó elem (`.bottomRight`) a kártya jobb szélére kerül;

- a középső elem (`.center`) pontosan a kettő között, vízszintesen középen helyezkedik el.

### 2. Igazítás a kereszttengelyen: `align-items: center`

Az `align-items` a függőleges kereszttengely mentén igazítja a konténer gyerekelemeit. A `center` érték mindent függőlegesen középre helyez – ez biztosítja, hogy a `.center` szimbólum pontosan a kártya közepén álljon.

---

## Egyedi igazítás a kereszttengelyen: `align-self`

A két sarokelemnek nem függőlegesen középen, hanem a kártya tetején és alján kell elhelyezkednie.

Az `align-self` tulajdonsággal **egyetlen kiválasztott flex elemnél** felülbírálhatjuk a szülő `align-items` beállítását:

```css
.topLeft {
    align-self: flex-start;
}

.bottomRight {
    align-self: flex-end;
}
```

| Szelektor | Beállítás | Eredmény a függőleges kereszttengelyen |
|---|---|---|
| `.topLeft` | `align-self: flex-start` | A kártya **tetejére** igazodik. |
| `.center` | *(örökli az `align-items: center`-t)* | A kártya **közepén** marad. |
| `.bottomRight` | `align-self: flex-end` | A kártya **aljára** igazodik. |

A kártyán belüli Flexbox elrendezés összefoglalva:

```text
+------------------------------------------+
| [topLeft]  <-- align-self: flex-start    |
|                                          |
|                                          |
|                 [center]  <-- align-items: center
|                                          |
|                                          |
|   align-self: flex-end --> [bottomRight] |
+------------------------------------------+
  ^                  ^                   ^
  |----- justify-content: space-between ---|
```

**Összefoglalva:** a `justify-content: space-between` vízszintesen húzza szét a három elemet a bal szélre, középre és a jobb szélre; az `align-items: center` függőlegesen középre teszi a középső szimbólumot; az `align-self` pedig a két sarokelemet külön-külön a kártya tetejére és aljára igazítja.

---

> **Fontos:** Ez a laboranyag az órai munkát és a gyakorlást segíti, de **nem helyettesíti az előadások anyagát**.  
> A vizsgára készülés során mindenképpen nézzék át az előadások fóliasorait is.