# CSS Grid – reszponzív képgaléria készítése

A feladatban egy **reszponzív képgalériát** készítünk nyolc képpel, amely automatikusan a rendelkezésre álló képernyőszélességhez igazítja az oszlopok számát – **külön `@media` szabályok (media queryk) használata nélkül**.

A cél annak megértése, hogy **hogyan alakítunk ki kétdimenziós rácselrendezést a `display: grid` segítségével, hogyan számolja ki a böngésző dinamikusan az oszlopszámot, és hogyan illesztjük be a képeket torzulás nélkül a cellákba**.

---

## 1. Rövid elméleti bevezető: mi a CSS Grid?

Míg a Flexbox elsősorban **egydimenziós** elrendezési modell (vagy egy sor, vagy egy oszlop mentén rendezi el az elemeket), a **CSS Grid kétdimenziós**: egyszerre képes **sorok és oszlopok** mentén rácsba szervezni a tartalmat.

**Egy elem akkor válik gridkonténerré, ha `display: grid` tulajdonságot állítunk be rajta. Ettől a közvetlen gyermekei gridelemekké válnak, amelyeket a böngésző a megadott sor- és oszlopszerkezet celláiba helyez el.**

A feladatban:

```html
<div class="images">
    <img width="300" height="200" src="[https://picsum.photos/300/200?random=1](https://picsum.photos/300/200?random=1)" alt="Random placeholder image">
    <!-- további 7 kép -->
</div>
```

```css
.images {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    padding: 1rem;
}
```

A `display: grid` a `.images` elemre kerül, így annak nyolc közvetlen gyermeke (az `<img>` elemek) automatikusan **gridelemként** viselkedik.

```text
┌───────────────────────────────────────────────────────────┐  ← gridkonténer (.images)
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│  │  gridelem   │   │  gridelem   │   │  gridelem   │      │  ← 1. sor
│  └─────────────┘   └─────────────┘   └─────────────┘      │
│                         ↕ gap                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│  │  gridelem   │   │  gridelem   │   │  gridelem   │      │  ← 2. sor
│  └─────────────┘   └─────────────┘   └─────────────┘      │
└───────────────────────────────────────────────────────────┘
```

**Fontos:** a Flexboxhoz hasonlóan a CSS Grid sem öröklődik automatikusan a mélyebben beágyazott elemekre, kizárólag a konténer **közvetlen gyermekeire** hat.

---

## 2. Reszponzív oszlopok media query nélkül: `grid-template-columns`

A galéria elrendezésének kulcsa a következő egyetlen sor:

```css
.images {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

Ez a kifejezés három CSS Grid-eszközt kapcsol össze, amelyek együtt hozzák létre a képernyőmérethez alkalmazkodó rácsot.

### 2.1. A `fr` (fraction) mértékegység

Az `fr` a **rendelkezésre álló szabad hely egy töredékét** jelenti a gridkonténeren belül.

- Ha két oszlop szélessége `1fr 1fr`, akkor a szabad helyet **két egyenlő részre** osztja el a böngésző (50%–50%).
- Ha három oszlop szélessége `1fr 1fr 1fr`, mindegyik az elérhető hely **egyharmadát** kapja.

Előnye a százalékos megadással (`33.33%`) szemben, hogy az `fr` **automatikusan levonja a `gap` által elfoglalt helyet** a felosztás előtt, így az elemek nem lógnak ki a konténerből.

### 2.2. A `minmax(300px, 1fr)` függvény

A `minmax(min, max)` egy oszlop **legkisebb és legnagyobb megengedett szélességét** adja meg:

- **`300px` (minimum):** egy oszlop soha nem lehet keskenyebb 300 pixelnél (kivéve, ha maga a konténer is keskenyebb 300 pixelnél).
- **`1fr` (maximum):** ha marad még szabad hely a sorban, az oszlopok egyenlő arányban szétnyúlnak, hogy teljesen kitöltsék a konténer szélességét.

**Miért jobb ez, mintha csak fix `300px`-et adnánk meg?**  
Fix `300px` esetén a sor végén gyakran maradna egy 100–250 px-es üres sáv, ahová már nem fér be újabb kép. Az `1fr` felső korlát miatt ezt a maradék helyet a meglévő oszlopok elosztják egymás között.

### 2.3. A `repeat(auto-fit, ...)` szerkezet

A `repeat()` függvény ismétlődő oszlopsablonok tömör megadására szolgál. Az `auto-fit` kulcsszó pedig megkéri a böngészőt, hogy **számolja ki automatikusan, hány legalább 300 px széles oszlop fér el egymás mellett**.

```text
Széles képernyő (pl. 1300 px) → 4 oszlop fér el:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Kép 1   │ │  Kép 2   │ │  Kép 3   │ │  Kép 4   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Közepes ablak (pl. 700 px) → 2 oszlop fér el (3 × 300 px már nem):
┌────────────────────┐ ┌────────────────────┐
│       Kép 1        │ │       Kép 2        │
└────────────────────┘ └────────────────────┘

Keskeny mobilképernyő (pl. 400 px) → 1 oszlopra vált:
┌───────────────────────────────────────────┐
│                   Kép 1                   │
└───────────────────────────────────────────┘
```

| Konténer belső szélessége | Hány db `300px`-es oszlop fér el (`gap`-pel)? | Egy oszlop tényleges szélessége (`1fr`) |
|---|---|---|
| `1300px` | 4 oszlop | kb. `313px` |
| `1000px` | 3 oszlop | kb. `322px` |
| `700px` | 2 oszlop | kb. `342px` |
| `400px` | 1 oszlop | `400px` |

**Tehát a lényeg:** a sorok száma automatikusan alakul ki (*implicit grid*) – ha 8 képünk van, 4 oszlop esetén 2 sor, 2 oszlop esetén 4 sor, 1 oszlop esetén pedig 8 sor jön létre.

---

## 3. Térközök és igazítás a rácsban: `gap`, `padding` és `justify-items`

A `.images` konténerben kétféle térközt és egy cellán belüli igazítást is beállítunk:

```css
.images {
    gap: 1rem;
    justify-items: center;
    padding: 1rem;
}
```

### 3.1. `gap` és `padding` együttműködése

- **`gap: 1rem`:** kizárólag a rács **sorai és oszlopai közé** tesz `1rem` (alapértelmezetten `16px`) távolságot. A konténer külső szélére nem hat.
- **`padding: 1rem`:** a `.images` konténer **belső margóját** állítja be, vagyis a külső képek és a konténer széle között hoz létre ugyanakkora `1rem`-es keretet.

```text
┌──────────── padding: 1rem ────────────┐
│  ┌─────────┐             ┌─────────┐  │
│  │  Kép 1  │ ← gap:1rem→ │  Kép 2  │  │
│  └─────────┘             └─────────┘  │
│                  ↕ gap                │
│  ┌─────────┐             ┌─────────┐  │
│  │  Kép 3  │             │  Kép 4  │  │
│  └─────────┘             └─────────┘  │
└───────────────────────────────────────┘
```

A kettő együtt biztosítja, hogy a képek között és a galéria szélein is **teljesen egyforma** távolság legyen.

### 3.2. `justify-items: center`

A `justify-items` azt szabályozza, hogyan igazodjanak a gridelemek **vízszintesen a saját cellájukon belül**.

- `start` – a cella bal szélére igazít;
- `end` – a cella jobb szélére igazít;
- `center` – a cella közepére igazít;
- `stretch` – kitölti a cella teljes szélességét (ez az alapértelmezett viselkedés).

**Miért nem látunk különbséget a képek elhelyezkedésében a `justify-items: center` hatására?**  
Mert a `.images > img` szabályban megadtuk a `width: 100%` tulajdonságot. Mivel minden kép a teljes cellaszélességet kitölti, nincs szabad hely a cellán belül, ahol elmozdulhatna. Ha a képek keskenyebbek lennének a cellánál (például `width: 80%`), azonnal láthatóvá válna, hogy mindegyik a saját cellája közepére kerül.

---

## 4. Képek méretezése és aránytartása a cellákon belül

A képek formázását közvetlen gyermek kombinátorral (`>`) adjuk meg:

```css
.images > img {
    aspect-ratio: 3 / 2;
    border-radius: 1rem;
    box-shadow: 0 0 0.25rem darkblue;
    height: auto;
    object-fit: cover;
    transition: transform 0.5s ease;
    width: 100%;
}
```

### 4.1. Miért szerepel `width` és `height` a HTML-ben és a CSS-ben is?

A HTML-ben minden képen találunk méretattribútumokat:

```html
<img width="300" height="200" src="[https://picsum.photos/300/200?random=1](https://picsum.photos/300/200?random=1)" alt="Random placeholder image">
```

A CSS-ben viszont ezeket felülírjuk:

```css
.images > img {
    height: auto;
    width: 100%;
}
```

Ennek fontos gyakorlati oka van:

1. **Betöltés közbeni elrendezés-stabilitás:** amíg a böngésző letölti a képeket a hálózatról, a HTML `width` és `height` attribútumaiból már előre tudja a kép oldalarányát, így lefoglalja a helyét az oldalon, és betöltéskor nem „ugrik szét” az elrendezés (*Cumulative Layout Shift* elkerülése).
2. **Rugalmas igazodás a cellához:** a CSS-ben megadott `width: 100%` felülírja a fix `300px`-es szélességet, így a kép mindig pontosan kitölti az aktuális gridcellát (akár 300 px, akár 420 px széles), a `height: auto` pedig ehhez igazítja a magasságot.

### 4.2. `aspect-ratio` és `object-fit: cover`

- **`aspect-ratio: 3 / 2`:** rögzíti, hogy a kép dobozának szélessége és magassága minden képernyőméreten pontosan `3 : 2` arányú legyen.
- **`object-fit: cover`:** meghatározza, hogyan töltse ki a kép tartalma a megadott dobozt, ha a forráskép eredeti képaránya esetleg eltérne a `3 / 2`-től.

| `object-fit` érték | Mit csinál a képpel? |
|---|---|
| `fill` (alapértelmezett) | Torzítja (összenyomja vagy széthúzza) a képet, hogy pontosan kitöltse a dobozt. |
| `contain` | Megőrzi az eredeti arányt és a teljes képet mutatja, de üres sávok maradhatnak mellette/alatta. |
| `cover` | **Megőrzi az eredeti arányt, és teljesen kitölti a dobozt**; a kilógó széleket levágja. |

---

## 5. Interaktív nagyítás rámutatáskor: `transform` és `transition`

Amikor a felhasználó az egérmutatót egy kép fölé viszi, a kép enyhén felnagyítódik:

```css
.images > img {
    transition: transform 0.5s ease;
}

.images > img:hover {
    transform: scale(1.05);
}
```

### 5.1. `transform: scale(1.05)`

A `scale(1.05)` a kép méretét **105%-ra (5%-kal nagyobbra)** skálázza a középpontjából kiindulva.

**Fontos előnye:** a `transform` csak a **vizuális megjelenítést** módosítja, a dokumentum elrendezését nem számolja újra. Ezért nagyításkor a kép nem tolja arrébb a mellette és alatta lévő többi képet a rácsban.

### 5.2. Miért az alap `img` szabályon van a `transition`?

A `transition: transform 0.5s ease;` azt írja elő, hogy a `transform` tulajdonság minden változása **0,5 másodperc alatt**, fokozatos gyorsulással és lassulással (`ease`) menjen végbe.

- Mivel az alap `.images > img` szelektoron szerepel (és nem a `:hover` állapoton), **mindkét irányban** működik: rámutatáskor finoman felnagyítódik a kép, az egér elhúzásakor pedig ugyanilyen simán visszatér az eredeti méretére.

---

## 6. Fontos HTML-beállítások a feladatban

### 6.1. A `viewport` meta elem

A `<head>` részben található egy kulcsfontosságú beállítás:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Mobilböngészők sokszor egy nagyobb, virtuális (pl. 980 px széles) nézőablakba renderelik az oldalt, majd lekicsinyítik azt, ha nincs megadva ez a sor. A `width=device-width` utasítja a böngészőt, hogy **a kijelző tényleges szélességét** használja alapul – enélkül a `minmax(300px, 1fr)` mobilon sem váltana át egyoszlopos nézetre.

### 6.2. Szemantikus felépítés és csoportosított szelektor

- **`<main>`:** az oldal fő tartalmát (a címet és magát a képgalériát) fogja össze.
- **`<footer>` és `<small>`:** az oldal láblécét és a forrásmegjelölést (*Lorem Picsum*) jelöli.
- **`h1, footer { text-align: center; }`:** a vesszővel elválasztott szelektorlista lehetővé teszi, hogy ugyanazt a középre igazítást két különböző elemre egyszerre alkalmazzuk.