# CSS összefoglaló 


**Fontos**: Ez a gyorstalpaló elsősorban arra szolgál, hogy a legfontosabb CSS-fogalmak és gyakran használt megoldások egy helyen, röviden és sallang nélkül áttekinthetők legyenek.
A gyorstalpaló megtanulása önmagában nem feltétlenül elegendő a ZH-ra való felkészüléshez. A hivatalos követelmény továbbra is az, hogy a laborgyakorlatok teljes anyagából bármi előfordulhat.
Érdemes ezért ezt az összefoglalót a laboranyagok átnézésével és a korábbi feladatok gyakorlásával együtt használni.
---

# 1. CSS-szabály felépítése

Egy CSS-szabály általános alakja:

```css
selector {
    property: value;
}
```

Például:

```css
title {
    font-size: 2em;
    font-weight: bold;
}
```

- a **szelektor** (`title`) megadja, mely elemeket választjuk ki;
- a **tulajdonság** (`font-size`) megadja, mit szeretnénk változtatni;
- az **érték** (`2em`) megadja a beállítást.

---

# 2. Legfontosabb szelektorok

## Elemnév szerinti kiválasztás

```css
title {
    ...
}
```

Minden `title` elemet kiválaszt.

Akkor érdemes használni, ha az adott elemtípus **minden előfordulását ugyanúgy** szeretnénk formázni.

---

## Univerzális szelektor: `*`

```css
* {
    ...
}
```

Minden elemet kiválaszt.

Például:

```css
* {
    box-sizing: border-box;
}
```

vagy XML esetén kiindulási megjelenítéshez:

```css
* {
    display: block;
}
```

Összetett szelektorban is használható:

```css
book > *
```

Ez a `book` **összes közvetlen elemgyerekét** választja ki.

```css
* > title
```

Ez minden olyan `title` elemet kiválaszt, amelynek van elemszülője.

---

## Több szelektor felsorolása: `,`

```css
author, title, year {
    ...
}
```

A vesszővel **több külön szelektort** csoportosítunk ugyanahhoz a CSS-szabályhoz.

A fenti példa minden `author`, `title` és `year` elemet kiválaszt.

Összetett szelektorok is felsorolhatók:

```css
artist, album > title, year {
    ...
}
```

---

## Közvetlen gyerek: `>`

```css
book > title {
    ...
}
```

Azokat a `title` elemeket választja ki, amelyeknek **közvetlen szülője** `book`.

Példa:

```xml
<book>
    <title>Book title</title>

    <chapter>
        <title>Chapter title</title>
    </chapter>
</book>
```

A

```css
book > title
```

csak a `Book title` elemet választja ki.

A `>` akkor hasznos, ha ugyanaz az elemnév a dokumentum több szintjén is előfordul, de csak egy konkrét szülő közvetlen gyerekeit szeretnénk formázni.

---

## Közvetlenül következő testvér: `+`

```css
title + para {
    ...
}
```

Azokat a `para` elemeket választja ki, amelyek:

- ugyanannak a szülőnek a gyerekei, mint a `title`;
- **közvetlenül egy `title` után következnek**.

Példa:

```xml
<chapter>
    <title>Title</title>
    <para>First paragraph</para>
    <para>Second paragraph</para>
</chapter>
```

A

```css
title + para
```

csak az első `para` elemet választja ki.

Ha közéjük kerül egy másik elem:

```xml
<title>Title</title>
<note>Note</note>
<para>Paragraph</para>
```

akkor a `title + para` **nem választja ki** a `para` elemet.

A `+` ismétlődő elemeknél is hasznos:

```css
item + item {
    ...
}
```

Ez az első kivételével minden olyan `item` elemet kiválaszt, amelyet közvetlenül egy másik `item` előz meg.

---

## Attribútumszelektor

(Ezt még nem vettük, de az a biztos, ha ránéztek)

Egy attribútum megléte alapján:

```css
item[status] {
    ...
}
```

Azokat az `item` elemeket választja ki, amelyeknek van `status` attribútuma.

Konkrét attribútumérték alapján:

```css
item[status="active"] {
    background-color: lightgreen;
}
```

Csak azokat az `item` elemeket választja ki, amelyeknél:

```xml
<item status="active">
```

szerepel.

Ez akkor hasznos, ha ugyanannak az elemtípusnak a megjelenését egy attribútum értékétől függően szeretnénk megváltoztatni.

---

# 3. Pszeudoosztályok

## `:hover`

```css
item:hover {
    background-color: lightgray;
}
```

Akkor választja ki az elemet, amikor az egérmutató fölötte van.

Gyakori használat:

- háttérszín változtatása;
- szövegszín változtatása;
- kurzor változtatása;
- interaktív kiemelés.

---

## `:nth-child()`

Az elemnek a **testvérei között elfoglalt pozíciója** alapján választ.

Páratlan pozíciók:

```css
item:nth-child(odd) {
    background-color: #f2f2f2;
}
```

Páros pozíciók:

```css
item:nth-child(even) {
    background-color: white;
}
```

Fontos: az `:nth-child()` nem csak az azonos nevű elemek között számol, hanem az adott szülő **összes elemgyereke között**.

Például:

```xml
<items>
    <heading>Items</heading>
    <item>A</item>
    <item>B</item>
    <item>C</item>
</items>
```

A pozíciók:

```text
1. heading
2. item A
3. item B
4. item C
```

Ezért:

```css
item:nth-child(odd)
```

ebben a példában csak a `B` elemet választja ki.

---

# 4. Pszeudoelemek

## `::before`

Az elem tartalma **elé** generál megjelenített tartalmat.

```css
price::before {
    content: "Price: ";
}
```

---

## `::after`

Az elem tartalma **után** generál megjelenített tartalmat.

```css
price::after {
    content: " Ft";
}
```

A generált tartalom nem kerül bele az XML-fájlba, csak a megjelenítés része.

---

## `::first-letter`

Az elem első betűjét célozza meg.

```css
para::first-letter {
    font-size: 1.7em;
    font-weight: bold;
}
```

Kombinátorral együtt is használható:

```css
title + para::first-letter {
    ...
}
```

Ez csak a közvetlenül `title` után következő `para` első betűjére vonatkozik.

---

# 5. `content`

A `content` tulajdonságot tipikusan `::before` és `::after` pszeudoelemekkel használjuk.

```css
year::before {
    content: "(";
}

year::after {
    content: ")";
}
```

Megjelenés:

```text
(2026)
```

Szöveg mellett számláló is megjeleníthető:

```css
item::before {
    content: counter(item-number) ". ";
}
```

Unicode karakter is megadható CSS-sztringben:

```css
height::after {
    content: " × ";
}
```

vagy escape formában:

```css
height::after {
    content: " \d7 ";
}
```

---

# 6. CSS-számlálók

A számláló három legfontosabb része:

```text
counter-reset       → számláló létrehozása / újraindítása
counter-increment   → számláló növelése
counter()           → aktuális érték megjelenítése
```

## `counter-reset`

```css
items {
    counter-reset: item-number;
}
```

A számlálót tipikusan azon a **konténeren** érdemes létrehozni vagy újraindítani, amelyen belül a számozást szeretnénk végezni.

Ha minden csoportban újra `1`-től kell indulnia a számozásnak, a `counter-reset` a csoportot tartalmazó elemre kerülhet.

---

## `counter-increment`

```css
item {
    counter-increment: item-number;
}
```

A számlálót azon az elemen növeljük, amelynek minden előfordulásánál tovább kell lépnie a számozásnak.

Gyakran a pszeudoelemen adjuk meg:

```css
item::before {
    counter-increment: item-number;
    content: counter(item-number) ". ";
}
```

---

## `counter()`

A számláló aktuális értékét adja vissza:

```css
content: counter(item-number);
```

Formátum is megadható:

```css
content: counter(chapter-number, upper-roman);
```

Például:

```text
I
II
III
IV
```

### Tipikus minta

```css
items {
    counter-reset: item-number;
}

item::before {
    counter-increment: item-number;
    content: counter(item-number) ". ";
}
```

---

# 7. `display`

A `display` határozza meg, hogyan vesz részt egy elem az oldal elrendezésében.

## `display: block`

```css
item {
    display: block;
}
```

- új sorban kezdődik;
- dobozszerűen viselkedik;
- a `width` és `height` használható rajta.

Akkor célszerű, ha az elemeket **egymás alatt** szeretnénk megjeleníteni.

---

## `display: inline`

```css
item {
    display: inline;
}
```

- nem kezd automatikusan új sort;
- a környező szöveggel egy sorban maradhat;
- normál inline elemnél a `width` és `height` nem használható úgy, mint blokkelemnél.

Akkor jó, ha több adatot **folyószövegként, egy sorban** szeretnénk megjeleníteni.

---

## `display: inline-block`

```css
item {
    display: inline-block;
}
```

Az `inline` és `block` viselkedését kombinálja:

- egy sorban maradhat más elemekkel;
- ugyanakkor dobozszerűen méretezhető;
- `width`, `height`, `padding`, `margin` jól használható rajta.

Akkor célszerű, ha elemeket **egymás mellé** szeretnénk rakni, de külön dobozként akarjuk őket kezelni.

---

## `display: none`

```css
metadata {
    display: none;
}
```

Az elem nem jelenik meg.

Az adat ettől még az XML-ben megmarad.

---

# 8. Táblázatszerű elrendezés

XML-elemekből CSS-sel táblázatszerű szerkezet készíthető.

Tipikus felépítés:

```css
items {
    display: table;
}

item {
    display: table-row;
}

name,
value,
date {
    display: table-cell;
}
```

Logikája:

```text
display: table       → teljes táblázat
display: table-row   → egy sor
display: table-cell  → egy cella
```

Akkor érdemes használni, ha az ismétlődő adatoknak **oszlopokban egymás alá igazítva** kell megjelenniük.

A cellák közötti térközhöz használható például:

```css
item > * {
    padding: 0.5em;
}
```

---

# 9. Méret és szélesség

## `width`

```css
menu {
    width: 500px;
}
```

Az elem szélességét állítja be.

---

## `max-width`

```css
book {
    max-width: 80ch;
}
```

Az elem legnagyobb megengedett szélességét adja meg.

A `ch` egység szöveges tartalmaknál hasznos; nagyjából a `0` karakter szélességéhez viszonyít.

---

## `width: fit-content`

```css
album {
    width: fit-content;
}
```

Az elem szélességét a tartalomhoz igazítja, a rendelkezésre álló helyet is figyelembe véve.

---

# 10. `margin` és `padding`

## `margin`

Az elem **külső térköze**.

```css
item {
    margin: 1em;
}
```

## `padding`

Az elem tartalma és a saját kerete közötti **belső térköz**.

```css
item {
    padding: 1em;
}
```

### Shorthand sorrend

Egy érték:

```css
margin: 1em;
```

minden oldal.

Két érték:

```css
margin: 1em 2em;
```

```text
függőleges | vízszintes
```

Három érték:

```css
margin: 1em 2em 3em;
```

```text
felső | jobb és bal | alsó
```

Négy érték:

```css
margin: 1em 2em 3em 4em;
```

```text
felső | jobb | alsó | bal
```

---

## Vízszintes középre igazítás

Egy meghatározott szélességű blokk gyakran így igazítható középre:

```css
item {
    width: 500px;
    margin: 0 auto;
}
```

Az `auto` bal és jobb margó egyenletesen osztja el a rendelkezésre álló helyet.

---

# 11. Keretek

## `border`

```css
item {
    border: 2px solid black;
}
```

A shorthand sorrendje:

```text
vastagság | stílus | szín
```

Például:

```css
border: 3px solid gray;
```

---

## Oldalankénti keret

```css
title {
    border-bottom: 1px solid black;
}
```

Hasznos például vizuális elválasztó vonalhoz.

---

## `border-radius`

```css
item {
    border-radius: 0.5rem;
}
```

Lekerekíti a sarkokat.

---

# 12. Árnyék

## `box-shadow`

```css
item {
    box-shadow: 0.25rem 0.25rem 0.5rem gray;
}
```

Ebben a formában:

```text
vízszintes eltolás | függőleges eltolás | elmosás | szín
```

---

# 13. Színek és háttér

## `color`

A szöveg színe:

```css
item {
    color: white;
}
```

## `background-color`

A háttér színe:

```css
item {
    background-color: lightgray;
}
```

Attribútumszelektorral együtt különösen hasznos:

```css
item[type="yes"] {
    background-color: lightgreen;
}

item[type="no"] {
    background-color: lightcoral;
}
```

---

# 14. Betűformázás

## `font-family`

```css
item {
    font-family: Inter, Arial, sans-serif;
}
```

A böngésző balról jobbra próbálja a felsorolt betűtípusokat.

Külső betűtípus betöltése:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter");
```

---

## `font-size`

```css
title {
    font-size: 2em;
}
```

A betűméretet állítja.

---

## `font-weight`

```css
title {
    font-weight: bold;
}
```

A betűvastagságot állítja.

---

## `font-style`

```css
label {
    font-style: italic;
}
```

Például dőlt megjelenítéshez.

---

## `font-variant: small-caps`

```css
author {
    font-variant: small-caps;
}
```

Kiskapitális megjelenítést kér.

---

## `font-variant-numeric: tabular-nums`

```css
length {
    font-variant-numeric: tabular-nums;
}
```

Azonos szélességű számjegyformákat kér a betűtípustól.

Hasznos például időtartamok, árak vagy más oszlopba rendezett számadatok esetén.

---

# 15. Szöveg igazítása és térköze

## `text-align`

```css
title {
    text-align: center;
}
```

A szöveg vízszintes igazítását szabályozza.

Gyakori értékek:

```text
left
center
right
```

---

## `line-height`

```css
para {
    line-height: 1.5;
}
```

A sorok közötti függőleges távolságot szabályozza.

---

## `text-indent`

```css
para {
    text-indent: 1.5em;
}
```

Az első sor behúzását adja meg.

---

## `letter-spacing`

```css
author {
    letter-spacing: 0.1em;
}
```

A karakterek közötti távolságot változtatja.

---

# 16. `vertical-align`

```css
footnote {
    vertical-align: super;
}
```

Inline vagy táblázatcellaszerű elemek függőleges igazítására használható.

Gyakori példa:

```css
vertical-align: super;
```

felső indexhez hasonló pozíció.

Normál szövegsorra visszaállítás:

```css
vertical-align: baseline;
```

---

# 17. `cursor`

```css
item {
    cursor: pointer;
}
```

A kurzor megjelenését változtatja meg.

Gyakori értékek:

```text
pointer
help
default
```

Fontos: a `cursor: pointer` **önmagában nem teszi kattinthatóvá** az elemet.

---

# 18. `transition`

```css
item {
    transition: background-color 0.4s, color 0.4s;
}
```

Megadja, hogy egy tulajdonság változása mennyi idő alatt történjen.

Gyakori használat:

```css
item {
    transition: background-color 0.3s;
}

item:hover {
    background-color: lightgray;
}
```

A háttérszín így nem azonnal, hanem rövid átmenettel változik.

---

# 19. Ismétlődő elemek vizuális elválasztása

## Páros és páratlan sorok

```css
item:nth-child(odd) {
    background-color: #f2f2f2;
}

item:nth-child(even) {
    background-color: white;
}
```

---

## Elválasztó karakter ismétlődő elemek között

Ha az első elem elé nem szeretnénk elválasztót:

```css
value + value::before {
    content: ", ";
}
```

Például több egymást követő `value` megjelenhet így:

```text
A, B, C
```

Ez a `+` kombinátor és a `::before` hasznos kombinációja.

---

# 20. Címke csak egyszer egy elemcsoport előtt

Ha egy ismétlődő adathalmaznak van külön konténere, a címke egyszerűen a konténer `::before` pszeudoelemével írható ki:

```css
genres::before {
    content: "Genres: ";
}
```

Így a címke egyszer jelenik meg, nem minden egyes `genre` előtt.

Ugyanez más csoportosított adatoknál is használható.

---

# 21. Gyakori kombinációk

## Dobozok egymás alatt

```css
item {
    display: block;
    margin: 1em 0;
    padding: 1em;
    border: 1px solid gray;
}
```

---

## Több adat egy sorban

```css
name,
year,
price {
    display: inline-block;
}
```

---

## Táblázatos adatok

```css
items {
    display: table;
}

item {
    display: table-row;
}

item > * {
    display: table-cell;
    padding: 0.5em;
}
```

---

## Állapot szerinti színezés

```css
item[status="active"] {
    background-color: lightgreen;
}

item[status="inactive"] {
    background-color: lightgray;
}
```

---

## Rámutatásos kiemelés

```css
item {
    transition: background-color 0.3s;
}

item:hover {
    background-color: gold;
    cursor: pointer;
}
```

---

## Automatikus számozás

```css
items {
    counter-reset: item-number;
}

item::before {
    counter-increment: item-number;
    content: counter(item-number) ". ";
}
```

---

## Mértékegység vagy egyéb szöveg hozzáadása

```css
price::after {
    content: " Ft";
}
```

## Fontos

A szelektoroknál mindig az XML **fa szerkezetét** kell végiggondolni:

```text
Ki a szülő?
Ki a közvetlen gyerek?
Mely elemek testvérek?
Mi következik közvetlenül mi után?
Hányadik elemgyerek az adott elem?
Milyen attribútum és attribútumérték tartozik hozzá?
```

