# Flexbox – interaktív elrendezések megértése

A feladatban egy **600 × 600 px-es demonstrációs területen** hozunk létre számozott négyzeteket. A jobb oldali vezérlőkkel módosíthatjuk az elrendezésüket.

A cél annak megértése, hogy **melyik elemre állítjuk be a Flexbox-tulajdonságokat, mely elemekre hatnak ezek a beállítások, és hogyan befolyásolják az elrendezést**.

![A feladatban szereplő Flexbox Playground – balra a színes négyzetek, jobbra a vezérlők](https://arato.inf.unideb.hu/jeszenszky.peter/webtech/lab/html/flexbox-playground/flexbox-playground.png)

---

## 1. Mit csinál a `display: flex`?

**Egy elem akkor válik flexkonténerré, ha `display: flex`-et állítunk be rajta. Ettől a közvetlen gyermekei flexelemekké válnak, és a böngésző Flexbox szerint rendezi el őket.**

Például:

```html
<div class="szulo">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

```css
.szulo {
    display: flex;
}
```

A `display: flex` **a `.szulo` elemre kerül**, de a hatását elsősorban annak **három közvetlen gyermekén** látjuk. Alapértelmezés szerint ezek egy sorban, egymás mellé kerülnek.

```text
Flex nélkül:                 A szülőn display: flex:

┌───────────────┐             ┌───────────────┐
│       1       │             │  1   2   3    │
│       2       │             └───────────────┘
│       3       │
└───────────────┘
```

A Flexbox **nem öröklődik automatikusan minden leszármazottra**. Ha egy gyermeken belül is Flexbox szerint szeretnénk elrendezni az elemeket, arra a gyermekre külön `display: flex` szükséges.

### A feladatban miért szerepel háromszor a `display: flex`?

A CSS-ben három különböző szinten használjuk:

```css
body {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

div#container {
    display: flex;
    height: 600px;
    width: 600px;
}

div.item {
    align-items: center;
    display: flex;
    font-size: large;
    height: 50px;
    justify-content: center;
    width: 50px;
}
```

| Flexkonténer | Közvetlen gyermekei | Miért használunk Flexboxot? |
|---|---|---|
| `body` | `#container` és `#controls` | A demonstrációs terület és a vezérlőpanel egymás mellé kerül. |
| `#container` | A JavaScript által létrehozott `.item` elemek | A számozott négyzetek elrendezését szabályozzuk. |
| `.item` | Az adott négyzetben megjelenő sorszám | A számot a négyzet közepére igazítjuk. |

**Fontos:** egy elem egyszerre lehet egy flexkonténer gyermeke és maga is flexkonténer.

Például a `#container` a `body` szempontjából flexelem, de a benne található négyzetek szempontjából flexkonténer.

---

## 2. A Flexbox két tengelye

A Flexboxot akkor lehet megérteni, ha nem mindig **vízszintes** és **függőleges** irányban gondolkodunk, hanem két tengellyel:

- **Főtengely (main axis):** az az irány, amely mentén a flexelemek alapvetően egymás után helyezkednek el.
- **Kereszttengely (cross axis):** a főtengelyre merőleges irány.

![Flexkonténer, flexelemek, főtengely és kereszttengely az MDN ábráján](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox/flex_terms.png)

A tengelyek irányát a `flex-direction` tulajdonság határozza meg.

| `flex-direction` | Főtengely | Kereszttengely |
|---|---|---|
| `row` | Vízszintes | Függőleges |
| `column` | Függőleges | Vízszintes |

Ez azért fontos, mert az elemek igazítását végző tulajdonságok ezekhez a tengelyekhez igazodnak.

**A `justify-content` nem mindig vízszintesen, az `align-items` pedig nem mindig függőlegesen hat!**

Ha megváltoztatjuk a főtengely irányát, az igazítás iránya is megváltozik.

---

# 3. A tengely irányát meghatározó tulajdonság

## 3.1. `flex-direction` – milyen irányban helyezkedjenek el az elemek?

A `flex-direction` a flexkonténer **főtengelyének irányát** határozza meg.

A feladat CSS-ében:

```css
body {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
```

Itt a `row` azt jelenti, hogy a `body` két közvetlen gyermeke, a `#container` és a `#controls`, egymás mellett helyezkedik el.

A demonstrációs `#container` elemben a JavaScript segítségével szintén módosíthatjuk a `flex-direction` értékét.

| Érték | Mit csinál? |
|---|---|
| `row` | A flexelemeket egy sorban, alapértelmezett írásirány esetén balról jobbra rendezi. |
| `row-reverse` | Megfordítja a vízszintes főtengely irányát, így az első elem a jobb oldal felől indul. |
| `column` | Felülről lefelé, egy oszlopban helyezi el az elemeket. |
| `column-reverse` | Megfordítja a függőleges főtengely irányát, így az első elem alulról indul. |

Három elem esetén:

```text
row:                 [1] [2] [3] →

row-reverse:      ←  [3] [2] [1]


column:              [1]
                     [2]
                     [3]
                      ↓

column-reverse:       ↑
                     [3]
                     [2]
                     [1]
```

A `row-reverse` és a `column-reverse` **nem módosítja a HTML-elemek sorrendjét**, csak a vizuális megjelenítésüket.

---

# 4. A flexelemek elhelyezését befolyásoló tulajdonságok

Miután meghatároztuk a főtengely irányát, azt is szabályozhatjuk, hogy **az elemek hol helyezkedjenek el a rendelkezésre álló területen belül**.

Ehhez a feladatban a következő tulajdonságokat használjuk:

- `justify-content` – elrendezés a főtengely mentén;
- `align-items` – igazítás a kereszttengely mentén;
- `align-self` – egyetlen flexelem saját kereszttengely menti igazítása;
- `gap` – térköz a flexelemek között.

## 4.1. `justify-content` – elrendezés a főtengely mentén

A `justify-content` azt határozza meg, hogy a flexkonténer **hogyan ossza el a szabad helyet a főtengely mentén**.

Például ha egy 600 px széles konténerben három 50 px-es négyzet található, a négyzetek összesen 150 px-ot foglalnak el.

A fennmaradó szabad hely elosztását a `justify-content` szabályozhatja.

| Érték | Hatás a főtengely mentén |
|---|---|
| `flex-start` | Az elemek a főtengely kezdőpontjához kerülnek. |
| `flex-end` | Az elemek a főtengely végpontjához kerülnek. |
| `center` | Az elemek csoportja középre kerül. |
| `start` | Az elemek a megfelelő logikai kezdőélhez kerülnek. |
| `end` | Az elemek a megfelelő logikai végélhez kerülnek. |
| `space-between` | Az első elem a kezdőélre, az utolsó a végélre kerül, közöttük egyenlő hézagokkal. |
| `space-around` | Az elemek körül egyenlő mértékű helyet oszt el; a szélső hézagok feleakkorák, mint a belsők. |
| `space-evenly` | Az elemek közötti és a széleken található hézagok egyforma méretűek. |

`flex-direction: row` esetén:

```text
flex-start:       |[1][2][3]                   |

flex-end:         |                   [1][2][3]|

center:           |          [1][2][3]         |

space-between:    |[1]        [2]          [3]|

space-around:     |  [1]       [2]       [3]  |

space-evenly:     |    [1]     [2]     [3]    |
```

### `start` és `flex-start` közötti különbség

A `flex-start` a **főtengely kezdőpontjához** igazít. Ez a kezdőpont megfordulhat például `row-reverse` esetén.

A `start` ezzel szemben a **megfelelő logikai kezdőélhez** igazít.

Ezért a két érték egyszerű `row` esetén gyakran ugyanazt eredményezi, `row-reverse` mellett viszont eltérhetnek.

### Mi történik, ha megváltozik a főtengely?

Ha a `flex-direction` értéke `row`, a `justify-content: center` vízszintesen helyezi középre a négyzeteket.

Ha `column` értékre váltunk, **ugyanez a tulajdonság már függőlegesen igazít középre**.

A `justify-content` tehát mindig a főtengelyen működik, nem pedig egy rögzített vízszintes irányban.

### Hol használjuk a konkrét CSS-ben?

```css
div.item {
    display: flex;
    justify-content: center;
}
```

Itt nem a teljes négyzetcsoportot igazítjuk középre, hanem **az egyes négyzeteken belüli sorszámot**.

A négyzet saját flexkonténerként viselkedik, és a `justify-content: center` a sorszámot a saját főtengelye mentén középre helyezi.

A legördülő lista ezzel szemben a `#container` `justify-content` tulajdonságát módosítja, tehát **a teljes négyzetcsoport elhelyezkedésére hat**.

---

## 4.2. `align-items` – igazítás a kereszttengely mentén

Az `align-items` a **főtengelyre merőleges irányban** igazítja a flexelemeket.

Ezért a működését mindig a `flex-direction` értékével együtt kell értelmezni.

| Érték | Mit jelent? |
|---|---|
| `flex-start` | Az elemeket a kereszttengely flexes kezdőéléhez igazítja. |
| `flex-end` | Az elemeket a kereszttengely flexes végéhez igazítja. |
| `center` | Az elemeket a kereszttengely mentén középre igazítja. |
| `start` | Az elemeket a megfelelő logikai kezdőélhez igazítja. |
| `end` | Az elemeket a megfelelő logikai végélhez igazítja. |

A `start` és a `flex-start` sok alaphelyzetben ugyanazt eredményezi, de a logikai és a flexes kezdőirány nem minden elrendezésben egyezik meg.

### Példa

Tegyük fel, hogy a konténerben három négyzet található.

**Ha `flex-direction: row`:**

A főtengely vízszintes, a kereszttengely függőleges.

Ezért:

```css
align-items: center;
```

a négyzeteket **függőlegesen** helyezi középre.

**Ha `flex-direction: column`:**

A főtengely függőleges, a kereszttengely vízszintes.

Ugyanez az `align-items: center` beállítás a négyzeteket **vízszintesen** helyezi középre.

### `justify-content` és `align-items` összehasonlítása

| Tulajdonság | `row` esetén | `column` esetén |
|---|---|---|
| `justify-content` | Vízszintes elrendezés | Függőleges elrendezés |
| `align-items` | Függőleges igazítás | Vízszintes igazítás |

**Tehát a két tulajdonság nem egymás helyett használható: két különböző tengelyen dolgoznak.**

### Hol szerepel a konkrét CSS-ben?

```css
div.item {
    align-items: center;
    display: flex;
    justify-content: center;
}
```

Mivel az egyes `.item` elemeknél a főtengely alapértelmezés szerint vízszintes:

- `justify-content: center` – vízszintesen középre helyezi a sorszámot;
- `align-items: center` – függőlegesen középre helyezi a sorszámot.

A kettő együtt eredményezi, hogy **a szám pontosan a négyzet közepére kerül**.

Fontos, hogy a legördülő lista az `align-items` értékét nem az `.item` elemeken, hanem a `#container` elemen módosítja. Ilyenkor a négyzetek helyzete változik, nem a bennük lévő számok igazítása.

### Miért nem nyúlnak meg a négyzetek?

Az `align-items` alapértelmezett értéke `normal`, amely Flexbox esetén többnyire a `stretch` értékhez hasonlóan viselkedik.

A példában viszont a négyzetek CSS-ében konkrét méretek szerepelnek:

```css
div.item {
    height: 50px;
    width: 50px;
}
```

Ezért a négyzetek nem nyúlnak automatikusan a teljes 600 px-es kereszttengely menti méretre.

---

## 4.3. `align-self` – egyetlen flexelem külön igazítása

Az `align-items` a flexkonténeren beállítva **a közvetlen flexelemeinek igazítását szabályozza**.

Az `align-self` ezzel szemben **egy konkrét flexelemen** állítható be, és annak saját kereszttengely menti igazítását módosítja.

A feladat CSS-ében:

```css
div#controls {
    align-self: start;
    padding: 0.5rem;
    width: 200px;
}
```

Miért a `#controls` elemen szerepel ez a tulajdonság?

Mert a `#controls` a `body` közvetlen gyermeke, vagyis **a `body` flexkonténer egyik flexeleme**.

A `body` esetén:

```css
body {
    display: flex;
    flex-direction: row;
}
```

A főtengely vízszintes, a kereszttengely függőleges.

Az `align-self: start` ezért a vezérlőpanelt **a kereszttengely kezdőéléhez, jelen esetben felülre igazítja**.

Emellett megakadályozza, hogy a panel az alapértelmezett nyújtási viselkedés következtében a mellette lévő 600 px magas bemutatóterület magasságához igazodjon.

### `align-items` vagy `align-self`?

- `align-items` – a **szülő flexkonténeren** állítjuk be, és a gyermekek közös igazítását szabályozza.
- `align-self` – **egy konkrét flexelemen** állítjuk be, és felülírhatja annak a szülőtől kapott igazítását.

**Fontos:** a demonstrációs felület `align-items` legördülő listája a `#container` elemet módosítja, ezért nem befolyásolja a `#controls` vezérlőpanel igazítását.

---

## 4.4. `gap` – térköz a flexelemek között

A `gap` a flexelemek közötti távolságot határozza meg.

A feladatban:

```css
body {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
```

A `body` két közvetlen flexeleme:

```html
<div id="container"></div>
<div id="controls"></div>
```

A `gap: 0.5rem` ezért **a demonstrációs terület és a vezérlőpanel közé helyez térközt**.

A `rem` mértékegység a gyökérelem betűméretéhez viszonyít. Ha ez 16 px, akkor:

```text
0.5rem = 8px
```

A `gap` nem azonos a `margin` tulajdonsággal:

- A `gap` a konténerben elrendezett elemek **közötti térközt** szabályozza.
- A `margin` az adott elem **külső margóját** állítja be.

**Fontos:** mivel a `gap` ebben a példában a `body` elemre van beállítva, nem a számozott négyzetek között hoz létre hézagot.

Ha a négyzetek között szeretnénk térközt, a `gap` tulajdonságot a `#container` elemre kellene beállítanunk.

---

## 5. Miért van `(unset)` a listákban, és miért üres a `value`?

A HTML-ben például ezt látjuk:

```html
<select id="flex-direction-select">
    <option value="">(unset)</option>
    <option value="column">column</option>
    <option value="row">row</option>
</select>
```

A megjelenített **`(unset)` felirat** itt nem azt jelenti, hogy a JavaScript a CSS `unset` kulcsszót állítja be.

Ebben a feladatban azt jelenti: **ne legyen külön, JavaScriptből beállított inline érték**.

A JavaScriptben:

```javascript
function changeFlexDirection(event) {
    const value = event.currentTarget.value;
    container.style.flexDirection = value;
}
```

Amikor `column` értéket választunk:

```javascript
container.style.flexDirection = "column";
```

Ezzel a `#container` elemre inline stílust állítunk be.

Amikor viszont az `(unset)` lehetőséget választjuk, a `value` üres karakterlánc (`""`) lesz:

```javascript
container.style.flexDirection = "";
```

Ez eltávolítja a korábbi inline értéket. Ezután ismét a CSS-stíluslapból származó vagy az alapértelmezett érték érvényesül.

| Beállítás | `(unset)` esetén |
|---|---|
| `flex-direction` | A `#container` ismét az alapértelmezett `row` irányt használja. |
| `justify-content` | Megszűnik a JavaScriptből beállított igazítás; a szokásos, főtengely eleji elhelyezés érvényesül. |
| `align-items` | Megszűnik az inline igazítás; az alapértelmezett viselkedés lép életbe. |

A **Reset** gomb a négyzetek eltávolítása mellett törli a JavaScriptből beállított Flexbox-értékeket, és visszaállítja a legördülő listákat.

---
