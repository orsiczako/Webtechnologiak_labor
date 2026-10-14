# HTML és CSS

## XML-ben és HTML-ben hogyan készül táblázat?

Az eddigi XML-feladatokban a táblázatos megjelenítést **CSS segítségével hoztuk létre**. Az XML-ben ugyanis nincs beépített `<table>`, `<tr>` vagy `<td>` elem: az XML-elemek neveit mi választjuk meg, és önmagukban nincs megjelenítési jelentésük.

Például XML-ben lehetett ilyen szerkezetünk:

```xml
<people>
    <person>
        <name>Anna</name>
        <age>21</age>
    </person>
</people>
```

és a táblázatos megjelenítést CSS adta hozzá:

```css
people {
    display: table;
}

person {
    display: table-row;
}

name,
age {
    display: table-cell;
}
```

Itt tehát a **CSS mondja meg**, hogy az XML-elemek táblázatként, sorokként és cellákként viselkedjenek.

HTML-ben viszont erre külön, előre definiált elemek vannak:

```html
<table>
    <tr>
        <td>Anna</td>
        <td>21</td>
    </tr>
</table>
```

A böngésző tudja, hogy:

- a `<table>` egy táblázat;
- a `<tr>` egy táblázatsor;
- a `<td>` egy adatcella;
- a `<th>` egy fejléc-cella.

Vagyis HTML-ben **nem CSS-sel kell „táblázattá alakítani” az elemeket**. A HTML már magában leírja a táblázat szerkezetét, a CSS pedig ezután főleg a megjelenését szabályozza.

## `class` / attribútum

Fontos, hogy a `class` **maga is egy HTML-attribútum**, csak speciális szerepe van.

A `class`-t elsősorban arra használjuk, hogy több elemet **egy csoportba soroljunk**, majd ezt a csoportot CSS-ből vagy JavaScriptből könnyen kiválasszuk.

Például:

```html
<td class="highlighted">Bájitaltan</td>
<td class="highlighted">Bűbájtan</td>
```

CSS-ben:

```css
.highlighted {
    background-color: yellow;
}
```

A többi attribútum általában valamilyen **tulajdonságot, állapotot vagy információt** ír le az elemről.

Például:

```html
<td colspan="4">Szünet</td>
```

Itt a `colspan="4"` nem egy tetszőleges csoportnév, hanem azt mondja meg, hogy a cella **négy oszlopot foglaljon el**.

CSS-ben attribútum alapján is választhatunk:

```css
td[colspan] {
    background-color: cornsilk;
}
```

Saját adat tárolására HTML-ben érdemes `data-*` attribútumot használni:

```html
<div class="student" data-status="active">Anna</div>
```

Ebben:

- `class="student"` → azt jelzi, hogy az elem a `student` csoportba tartozik;
- `data-status="active"` → egy konkrét információt tárol az elemről.

Általában akkor használjunk `class`-t, ha azt akarjuk kifejezni, hogy **„ezek az elemek ugyanabba a csoportba tartoznak”**, és attribútumot akkor, ha azt akarjuk leírni, hogy **„ennek az elemnek ez a tulajdonsága vagy értéke”**.

# HTML-táblázatok

## A `table` elem

A teljes táblázatot a `<table>` elem fogja össze:

```html
<table>
    ...
</table>
```

Egy táblázat tipikusan sorokból és cellákból áll.

---

## A `tr` elem – táblázatsor

A `tr` jelentése **table row**, vagyis táblázatsor.

```html
<tr>
    ...
</tr>
```

Minden külön sorhoz külön `tr` elem tartozik.

---

## A `td` elem – adatcella

A `td` jelentése **table data**. Normál adatcellát hoz létre:

```html
<td>Bájitaltan</td>
```

Egy sorban több `td` is szerepelhet.

---

## A `th` elem – fejléc-cella

A `th` jelentése **table header**.

```html
<th>Hétfő</th>
```

Olyan celláknál célszerű használni, amelyek más cellákat azonosítanak, például:

- oszlopfejlécek;
- sorfejlécek.

A példában az oszlopfejlécek a hét napjai, a sorfejlécek pedig az időpontok. fileciteturn24file2L11-L18

---

# A `thead` és `tbody`

Egy HTML-táblázatot több logikai részre is fel lehet osztani. Ebben segít a `thead` és a `tbody`.

Egy egyszerű felépítés például:

```html
<table>
    <thead>
        <!-- A táblázat fejléce -->
    </thead>

    <tbody>
        <!-- A táblázat adatai -->
    </tbody>
</table>
```

Fontos, hogy a `thead` és a `tbody` **nem helyettesíti a sorokat és a cellákat**. Ezek csak összefogják a táblázat különböző részeit.

A sorokat továbbra is `tr`, a cellákat pedig `th` vagy `td` elemekkel adjuk meg.

## `thead`

A `thead` a táblázat **fejlécét** fogja össze.

Egy órarendben például ide kerülhetnek a hét napjai:

```html
<thead>
    <tr>
        <th>Időpont</th>
        <th>Hétfő</th>
        <th>Kedd</th>
        <th>Szerda</th>
        <th>Csütörtök</th>
    </tr>
</thead>
```

Ebben:

- a `thead` jelzi, hogy ez a táblázat fejléce;
- a `tr` létrehoz egy sort;
- a `th` elemek pedig a fejléc cellái.



## `tbody`

A `tbody` a táblázat **tényleges adatait tartalmazó sorokat** fogja össze.

Például:

```html
<tbody>
    <tr>
        <th>8:00–9:00</th>
        <td>Átváltoztatástan</td>
        <td>Bájitaltan</td>
        <td>Bűbájtan</td>
        <td>Sötét varázslatok kivédése</td>
    </tr>

    <tr>
        <th>9:00–10:00</th>
        <td>Átváltoztatástan</td>
        <td>Jóslástan</td>
        <td>Bűbájtan</td>
        <td>Sötét varázslatok kivédése</td>
    </tr>
</tbody>
```

Itt a `tbody` két külön `tr` elemet, vagyis két sort tartalmaz.

A `thead` és `tbody` használatának egyik előnye, hogy a táblázat szerkezete egyértelműbb lesz: külön látszik, hogy **mi a fejléc és mik a tényleges adatok**.

CSS-ben is egyszerűbb külön formázni őket:

```css
thead {
    background-color: burlywood;
}

tbody {
    background-color: floralwhite;
}
```

Vagy például csak a fejléc celláit:

```css
thead th {
    font-weight: bold;
}
```


---
# A `scope` attribútum

A `th` elem azt jelzi, hogy egy cella **fejléc-cella**, de önmagában még nem mondja meg, hogy ez a fejléc egy teljes sorhoz vagy egy teljes oszlophoz tartozik.

Ebben segít a `scope` attribútum.

## Oszlopfejléc

```html
<th scope="col">Hétfő</th>
```

A `scope="col"` azt jelenti, hogy ez a fejléc az **alatta lévő oszlophoz** tartozik.

Például:

```text
          Hétfő
            ↓
       Átváltoztatástan
       Kviddics
       ...
```

## Sorfejléc

```html
<th scope="row">8:00–9:00</th>
```

A `scope="row"` azt jelenti, hogy ez a fejléc az **adott sorhoz** tartozik.

Például:

```text
8:00–9:00 → Átváltoztatástan | Bájitaltan | Bűbájtan | ...
```

A `scope` elsősorban a táblázat jelentését teszi pontosabbá. Ez például a képernyőolvasók számára is fontos, mert így egyértelműen megállapítható, hogy egy fejléc mely adatokhoz tartozik.

Röviden:

```text
scope="col" → oszlop fejléce
scope="row" → sor fejléce
```

---

# Cellák összevonása

Egy HTML-táblázatban előfordulhat, hogy egy cellának több sort vagy több oszlopot kell elfoglalnia.

Erre szolgál:

- `rowspan` → több sor összekapcsolása;
- `colspan` → több oszlop összekapcsolása.

## `rowspan`

A `rowspan` azt mondja meg, hogy egy cella **hány sor magasságát foglalja el**.

```html
<td rowspan="2">Átváltoztatástan</td>
```

Ez azt jelenti, hogy az `Átváltoztatástan` cella két egymás alatti soron keresztül tart.

Például:

```text
8:00–9:00    Átváltoztatástan
              │
9:00–10:00    │
              ↓
```

Egyszerűbb HTML-példa:

```html
<table>
    <tr>
        <td rowspan="2">Két sort foglal el</td>
        <td>Első sor</td>
    </tr>
    <tr>
        <td>Második sor</td>
    </tr>
</table>
```

Fontos, hogy a második sorban már **nem kell újra létrehozni** azt a cellát, amelyet az előző `rowspan="2"` már lefed.

---

## `colspan`

A `colspan` azt mondja meg, hogy egy cella **hány oszlop szélességét foglalja el**.

```html
<td colspan="4">Szünet</td>
```

Ez azt jelenti, hogy a `Szünet` cella négy normál cella helyét foglalja el.

Például:

```text
| Hétfő | Kedd | Szerda | Csütörtök |

|              SZÜNET                 |
```

Egyszerű HTML-példa:

```html
<table>
    <tr>
        <td colspan="3">Három oszlop széles cella</td>
    </tr>
</table>
```

Röviden:

```text
rowspan → függőlegesen von össze cellákat
colspan → vízszintesen von össze cellákat
```

---

# HTML karakterreferenciák

Bizonyos karaktereket HTML-ben karakterreferenciával is megadhatunk.

A példában az időpont:

```html
8:00&ndash;9:00
```

A böngészőben így jelenik meg:

```text
8:00–9:00
```

Az `&ndash;` tehát az `–` karaktert jelenti.

További gyakori példák:

```html
&amp;    → &
&lt;     → <
&gt;     → >
&copy;   → ©
```

Erre például akkor lehet szükség, ha olyan karaktert szeretnénk megjeleníteni, amely HTML-ben különleges jelentéssel rendelkezik.

---

# Táblázatok formázása CSS-ben

A HTML megadja a táblázat **szerkezetét**, a CSS pedig annak **megjelenését** szabályozza.

Például:

```css
table {
    border-collapse: collapse;
}
```

## `border-collapse`

A táblázat celláinak saját keretük lehet.

Ha ezt írjuk:

```css
table {
    border-collapse: collapse;
}
```

akkor a szomszédos cellák keretei **összeolvadnak**.

Enélkül a cellák keretei különállóak lehetnek.



Táblázatoknál a `collapse` nagyon gyakori beállítás.

---

# A `:is()` pszeudoosztály

A `:is()` segítségével több különböző szelektort lehet egy helyen felsorolni.

Például:

```css
table :is(td, th) {
    border: thin solid black;
    padding: 1rem;
}
```

Ez azt jelenti:

> válasszuk ki a táblázaton belül az összes `td` és `th` elemet.

Ugyanez `:is()` nélkül:

```css
table td,
table th {
    border: thin solid black;
    padding: 1rem;
}
```

A két megoldás ugyanazokat az elemeket választja ki.

A `:is()` előnye, hogy hosszabb szelektoroknál rövidebbé és áttekinthetőbbé teheti a CSS-t.

Például:

```css
article :is(h1, h2, h3) {
    color: darkred;
}
```

Ez az `article` elemen belüli `h1`, `h2` és `h3` elemeket választja ki.

---

# Gyermek- és leszármazott-kombinátor együtt

Nézzük ezt a szelektort:

```css
table.timetable > thead th
```

Elsőre hosszúnak tűnhet, ezért érdemes részenként elolvasni.

```text
table.timetable > thead th
```

## `table.timetable`

```css
table.timetable
```

Olyan `table` elemet választ ki, amelynek `timetable` osztálya van:

```html
<table class="timetable">
```

## `> thead`

```css
table.timetable > thead
```

A `>` a **gyermekkombinátor**.

Ez azt jelenti, hogy csak olyan `thead` elemet keresünk, amely a `table.timetable` **közvetlen gyermeke**.

Például:

```html
<table class="timetable">
    <thead>
        ...
    </thead>
</table>
```

## `thead th`

A `thead` és `th` között csak szóköz van:

```css
thead th
```

Ez a **leszármazott-kombinátor**.

Azt jelenti, hogy a `th` valahol a `thead` belsejében található.

Ez azért fontos, mert a szerkezet valójában:

```html
<thead>
    <tr>
        <th>Hétfő</th>
    </tr>
</thead>
```

A `th` tehát nem közvetlenül a `thead` gyereke, hanem van közöttük egy `tr`.

A teljes szelektor:

```css
table.timetable > thead th
```

jelentése tehát:

> válaszd ki azokat a `th` elemeket, amelyek a `table.timetable` közvetlen `thead` gyermekének belsejében találhatók.

---

# Attribútumszelektor

CSS-ben egy elemet az attribútuma alapján is ki lehet választani.

Például:

```css
td[colspan] {
    background-color: cornsilk;
}
```

Ez minden olyan `td` elemet kiválaszt, amelynek **van `colspan` attribútuma**.

Például ez kiválasztódik:

```html
<td colspan="4">Szünet</td>
```

Ez viszont nem:

```html
<td>Bájitaltan</td>
```

Itt nem az attribútum konkrét értékét vizsgáljuk, csak azt, hogy **létezik-e az attribútum**.

Ha konkrét értéket szeretnénk vizsgálni, akkor például:

```css
td[colspan="4"] {
    ...
}
```

Ez már csak azokat a `td` elemeket választaná ki, amelyeknél pontosan:

```html
colspan="4"
```

szerepel.

---

# A `:not()` pszeudoosztály

A `:not()` jelentése lényegében:

> minden ilyen elem, **kivéve** amit a zárójelben megadunk.

Például:

```css
td:not([colspan]) {
    ...
}
```

Ez azt jelenti:

> válasszuk ki azokat a `td` elemeket, amelyeknek **nincs `colspan` attribútumuk**.

Például:

```html
<td>Bájitaltan</td>
```

kiválasztódik.

Ez:

```html
<td colspan="4">Szünet</td>
```

nem választódik ki.

A példában ez azért hasznos, mert a normál tantárgycellákra szeretnénk hover effektust tenni, a teljes sort átfogó szünetcellákra viszont nem.

---


# CSS átmenetek

Ha egy CSS-tulajdonság értéke megváltozik, a változás alapértelmezetten azonnal történik.

Például:

```css
td:hover {
    background-color: yellow;
}
```

Az egér rákerül a cellára, és a háttérszín azonnal sárga lesz.

A `transition` segítségével ezt a változást **folyamatossá, animálttá** lehet tenni.

Például:

```css
td {
    transition-property: background-color;
    transition-duration: 0.5s;
}
```

Ekkor a háttérszín fél másodperc alatt változik meg.



## `transition-property`

Megadja, hogy **mely tulajdonságok változását** animáljuk.

```css
transition-property: background-color, transform;
```

## `transition-duration`

Megadja, hogy **mennyi ideig tartson** az átmenet.

```css
transition-duration: 0.5s;
```

Ez fél másodpercet jelent.

## `transition-timing-function`

Megadja, hogyan változzon az animáció sebessége az idő során.

```css
transition-timing-function: ease;
```

Az `ease` esetén az animáció nem teljesen egyenletes sebességű: lassabban indul, középen gyorsabb, majd ismét lassul.

---

# `outline` és `outline-offset`

Az `outline` egy elem köré rajzolt körvonal.

Például:

```css
outline: 4px solid goldenrod;
```

Ez egy 4 pixel vastag, folytonos, aranyszínű körvonalat rajzol.

Az `outline` hasonlít a `border` tulajdonságra, de fontos különbség, hogy az `outline` általában **nem foglal külön helyet a box modelben**.

Ezért az elem mérete nem változik meg attól, hogy outline kerül rá.

## `outline-offset`

Az `outline-offset` azt szabályozza, milyen messze legyen az outline az elem szélétől.

```css
outline-offset: 4px;
```

Pozitív értéknél kijjebb kerül.

```css
outline-offset: -4px;
```

Negatív értéknél beljebb kerül.

A példában:

```css
outline: 4px solid goldenrod;
outline-offset: -4px;
```

a körvonal a cella belseje felé kerül.

---

# Transzformáció: `transform` és `scale()`

A `transform` segítségével egy elem megjelenítése geometriailag módosítható.

Például:

```css
transform: scale(1.05);
```

A `scale()` az elem méretét változtatja meg.

```text
scale(1)    → eredeti méret
scale(1.05) → 105%-os méret
scale(1.5)  → 150%-os méret
scale(0.5)  → 50%-os méret
```

A példában hover esetén:

```css
td:hover {
    transform: scale(1.05);
}
```

a cella enyhén megnő, amikor fölé kerül az egér.

Ha ehhez `transition` is tartozik, akkor a nagyítás nem hirtelen, hanem fokozatosan történik.

---

# További, a példában használt CSS-tulajdonságok

## `vertical-align`

Táblázatcelláknál a tartalom függőleges igazítására használható.

```css
vertical-align: middle;
```

Ez a tartalmat függőlegesen a cella közepére igazítja.

---

## `text-align`

A tartalom vízszintes igazítását szabályozza.

```css
text-align: center;
```

Lehetséges értékek például:

```text
left
center
right
```

---

## `text-transform`

A szöveg megjelenített alakját változtatja meg.

```css
text-transform: uppercase;
```

Például:

```text
Szünet
```

megjelenítve:

```text
SZÜNET
```

Az eredeti HTML-szöveg ettől nem változik meg.

---

## `letter-spacing`

A karakterek közötti távolságot állítja:

```css
letter-spacing: 0.2rem;
```

Nagyobb értéknél a betűk távolabb kerülnek egymástól.

---

## `font-variant: small-caps`

```css
font-variant: small-caps;
```

Kiskapitális megjelenítést kér.

Ez azt jelenti, hogy a kisbetűk is nagybetűs jelleggel jelennek meg, de kisebb méretben.


---

# A példában szereplő CSS-szelektorok értelmezése

| Szelektor | Jelentés |
|---|---|
| `table.timetable` | olyan `table`, amelynek `timetable` osztálya van |
| `table.timetable :is(td, th)` | minden `td` és `th` a táblázaton belül |
| `table.timetable > thead th` | a táblázat közvetlen `thead` gyermekén belüli `th` elemek |
| `table.timetable > tbody :is(td, th)` | a táblázat közvetlen `tbody` gyermekén belüli `td` és `th` elemek |
| `table.timetable td[colspan]` | `colspan` attribútummal rendelkező `td` elemek |
| `table.timetable > tbody td:not([colspan])` | olyan `td` a `tbody`-ban, amelynek nincs `colspan` attribútuma |
| `table.timetable > tbody td:not([colspan]):hover` | ugyanez, amikor az egérmutató az elem fölött van |

---

# Rövid összefoglaló

```text
scope="col"       az adott th egy oszlop fejléce
scope="row"       az adott th egy sor fejléce

rowspan           egy cella több sort foglal el
colspan           egy cella több oszlopot foglal el

:is(...)          több lehetséges szelektor összefogása
:not(...)         bizonyos elemek kizárása
[attr]            attribútummal rendelkező elemek kiválasztása
:hover            az egérmutató fölé vitelekor érvényes állapot

border-collapse   táblázat cellakereteinek összevonása
transition        tulajdonságváltozás animálása
outline           az elem körüli körvonal
outline-offset    az outline távolsága az elem szélétől
transform         geometriai módosítás
scale()           nagyítás vagy kicsinyítés
```