# SCSS – Színoszlopok generálása ciklussal és mixinnel

Ebben a feladatban az előző példához hasonlóan színes oszlopokat jelenítünk meg, azonban **az egyes oszlopok CSS-szabályait már nem kézzel írjuk meg, hanem SCSS segítségével automatikusan generáljuk**.

## 1. Sass-modulok és változó

```scss
@use 'sass:color';
@use 'sass:math';

$base-color: pink;
```

A `@use` segítségével a Sass beépített moduljait használhatjuk:

- `sass:color` – színek módosítására szolgáló függvényeket tartalmaz.
- `sass:math` – matematikai műveletekhez biztosít függvényeket, például osztáshoz.

A `$base-color` változó a kiindulási színt tárolja, amely jelen esetben `pink`.

## 2. Az oszlopok elrendezése

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

Ez a rész az előző feladatból már ismerős:

- A külső `display: flex` egymás mellé rendezi az oszlopokat.
- A `height: 100vh` a konténer magasságát a megjelenítési terület magasságához igazítja.
- A `> div` a konténer közvetlen `div` gyermekeit választja ki.
- A `flex: 1` egyenlő arányban osztja el közöttük a rendelkezésre álló szélességet.
- A belső `display: flex`, valamint a `justify-content` és az `align-items` középre igazítja az oszlopok feliratát.

## 3. A `@mixin` – újrafelhasználható SCSS-szabályok

```scss
@mixin color-columns($n) {
    // Ide kerülnek a generálandó CSS-szabályok.
}
```

A `@mixin` segítségével **elnevezhetünk egy SCSS-szabálycsoportot**, amelyet később meghívhatunk.

Hasonlóan működik, mint egy függvény, de itt nem egy értéket számítunk ki és adunk vissza, hanem CSS-szabályokat állítunk elő.

- `color-columns` – a mixin neve.
- `$n` – a mixin paramétere, amely megadja, hány oszlophoz szeretnénk szabályokat generálni.

A mixint az `@include` utasítással használhatjuk:

```scss
@include color-columns(10);
```

Ez azt jelenti, hogy **a `color-columns` mixint 10-es paraméterrel hajtjuk végre**, tehát `$n = 10` lesz.

Fontos: a mixin meghívása önmagában nem hoz létre HTML-elemeket. A már meglévő oszlopokhoz generál CSS-szabályokat.

## 4. A `@for` – ciklus használata SCSS-ben

A mixinen belül egy ciklus szerepel:

```scss
@for $i from 1 through $n {
    // Az ismétlődő szabályok.
}
```

A `@for` segítségével ugyanazt a műveletet többször elvégezhetjük, miközben a `$i` ciklusváltozó értéke változik.

- `$i` – a ciklusváltozó.
- `from 1` – a ciklus 1-től indul.
- `through $n` – a ciklus `$n` értékéig tart, **a végértéket is beleértve**.

Mivel a mixint `10` paraméterrel hívtuk meg, a ciklus tízszer fut le, és `$i` értéke sorban 1, 2, 3, ..., 10 lesz.

Ha `through` helyett `to` szerepelne, a végérték már nem tartozna bele a ciklusba.

## 5. Az oszlopok színének kiszámítása

```scss
$color: color.adjust(
    $base-color,
    $hue: ($i - 1) * math.div(360, $n - 1)
);
```

A `color.adjust()` az alapul szolgáló szín tulajdonságait módosítja.

Ebben az esetben a `$hue` paramétert változtatjuk, amely a szín **színárnyalatát** jelenti.

A színárnyalatot egy 360 fokos színkörön képzelhetjük el. A hue módosításával ezen a színkörön haladunk körbe, így különböző színeket kapunk.

A módosítás mértéke:

```scss
($i - 1) * math.div(360, $n - 1)
```

A `math.div()` osztást végez. Mivel `$n = 10`, ezért:

```text
360 / (10 - 1) = 40
```

Így minden újabb oszlopnál 40 fokkal módosítjuk a színárnyalatot.

| Oszlop (`$i`) | Számítás | Hue módosítása |
|---|---|---|
| 1 | (1 − 1) × 40 | 0° |
| 2 | (2 − 1) × 40 | 40° |
| 3 | (3 − 1) × 40 | 80° |
| 4 | (4 − 1) × 40 | 120° |
| ... | ... | ... |
| 10 | (10 − 1) × 40 | 360° |

**Fontos:** a 360°-os módosítás egy teljes körbefordulás, ezért az utolsó oszlop színe megegyezik az elsőével.

## 6. A `#{}` – értékek beillesztése SCSS-ben

A ciklusban a következő szabály szerepel:

```scss
> div:nth-child(#{$i}) {
    background-color: $color;

    &::before {
        content: "#{$color}";
    }
}
```

### Dinamikus szelektor

```scss
> div:nth-child(#{$i})
```

Az `:nth-child()` az adott sorszámú gyermekelemet választja ki.

A `#{}` az SCSS **interpolációs szintaxisa**: lehetővé teszi, hogy egy változó aktuális értékét beillesszük például egy szelektorba vagy szövegbe.

A ciklus ezért ilyen szelektorokat generál:

```css
div.columns > div:nth-child(1) { ... }
div.columns > div:nth-child(2) { ... }
div.columns > div:nth-child(3) { ... }
/* ... */
div.columns > div:nth-child(10) { ... }
```

Így minden oszlophoz külön CSS-szabály készül.

### A háttérszín beállítása

```scss
background-color: $color;
```

Az aktuális oszlop háttérszínét a korábban kiszámított `$color` változó határozza meg.

### A szín értékének megjelenítése

```scss
&::before {
    content: "#{$color}";
}
```

- `&` – az aktuálisan kiválasztott oszlopra hivatkozik.
- `::before` – az elem tartalma előtt hoz létre egy pszeudoelemet.
- `content` – megadja a megjelenítendő szöveget.
- `"#{$color}"` – a kiszámított szín értékét szövegként illeszti be.

Ezért az előző feladattól eltérően **az oszlopokon nem az `id` értéke, hanem a generált szín értéke jelenik meg**.

## 7. A teljes mixin működése

```scss
@mixin color-columns($n) {
    @for $i from 1 through $n {
        $color: color.adjust(
            $base-color,
            $hue: ($i - 1) * math.div(360, $n - 1)
        );

        > div:nth-child(#{$i}) {
            background-color: $color;

            &::before {
                content: "#{$color}";
            }
        }
    }
}

@include color-columns(10);
```

A működés sorrendje:

1. Meghívjuk a `color-columns` mixint `10` paraméterrel.
2. A `@for` ciklus tízszer ismétlődik.
3. Minden ismétlésnél kiszámítunk egy új színárnyalatot.
4. A `#{}` segítségével létrehozzuk az aktuális oszlop szelektorát.
5. Beállítjuk az oszlop háttérszínét.
6. A `::before` pszeudoelemmel megjelenítjük a kiszámított szín értékét.

Az SCSS fordításakor a Sass **tíz különálló CSS-szabályt generál**, amelyeket a böngésző már hagyományos CSS-ként tud értelmezni.

## Összefoglalás

| SCSS-elem | Feladata |
|---|---|
| `@use 'sass:math'` | Matematikai függvények használata |
| `@mixin` | Újrafelhasználható CSS-szabálycsoport definiálása |
| `@include` | Egy mixin meghívása |
| `$n` | A generálandó oszlopok száma |
| `@for` | Ciklus, ismétlődő szabályok generálásához |
| `$i` | Az aktuális ciklusváltozó |
| `through` | A végértéket is tartalmazó ciklus |
| `math.div()` | Osztás végrehajtása |
| `color.adjust()` | Egy szín tulajdonságainak módosítása |
| `$hue` | A színárnyalat módosításának mértéke |
| `#{}` | Változó vagy kifejezés értékének beillesztése |
| `:nth-child()` | Adott sorszámú gyermekelem kiválasztása |

**A feladat lényege:** az SCSS segítségével nem kell minden oszlop színét és szelektorát kézzel megírni. Egyetlen mixin és ciklus segítségével tetszőleges számú oszlophoz generálhatunk stílusokat.