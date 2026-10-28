# HTML 

## További metaadatok

A `<head>` elemben a dokumentumról különböző információkat adhatunk meg a `<meta>` elem segítségével.

Korábban már láttuk a karakterkódolás megadását:

```html
<meta charset="UTF-8">
```

A `meta` elem a `name` és `content` attribútumokkal további információkat is tárolhat.

Például:

```html
<meta name="author" content="William Shakespeare">
<meta name="description" content="A literary work by William Shakespeare.">
<meta name="keywords" content="drama, literature, shakespeare">
<meta name="googlebot" content="notranslate">
```

Az egyes beállítások jelentése:

- **`author`** – a dokumentum szerzőjének neve.
- **`description`** – a dokumentum rövid leírása, amelyet például keresőmotorok is felhasználhatnak.
- **`keywords`** – a dokumentumhoz kapcsolódó kulcsszavak. Régebben keresőoptimalizálási célokra is gyakran használták, ma már a nagy keresőmotorok többségénél nincs jelentős szerepe.
- **`googlebot`** – a Google keresőrobotjának szóló utasítás. A `notranslate` érték azt kéri, hogy a Google ne kínálja fel az oldal automatikus fordítását.

A `name` tehát megmondja, **milyen információt adunk meg**, a `content` pedig annak **értékét tartalmazza**.

---

# A `hgroup` elem

A `<hgroup>` segítségével egy címsort és a hozzá kapcsolódó kiegészítő szöveget foghatjuk össze.

Például:

```html
<header>
    <hgroup>
        <p>William Shakespeare</p>
        <h1>Hamlet</h1>
    </hgroup>
</header>
```

Ebben:

- a `<header>` a dokumentum fejlécét jelöli;
- a `<hgroup>` összefogja az egymáshoz tartozó címet és kiegészítő információt;
- a `<h1>` a főcím;
- a `<p>` a címhez kapcsolódó kiegészítő szöveg, jelen esetben a szerző neve.

A `hgroup` önmagában nem határozza meg, hogy a címek pontosan hogyan jelenjenek meg. A megjelenést CSS-sel szabályozhatjuk.

---

# A `section` elem

A `<section>` egy dokumentum **önálló, tematikus részét** jelöli.

Akkor érdemes használni, ha a tartalom logikailag egy külön szakaszt alkot, amelyhez általában saját címsor is tartozik.

Például:

```html
<main>
    <section>
        <h2>Első fejezet</h2>
        <p>Az első fejezet tartalma.</p>
    </section>

    <section>
        <h2>Második fejezet</h2>
        <p>A második fejezet tartalma.</p>
    </section>
</main>
```

A `section` elemek egymásba is ágyazhatók:

```html
<section>
    <h2>Első felvonás</h2>

    <section>
        <h3>Első jelenet</h3>
        <p>A jelenet tartalma.</p>
    </section>
</section>
```

Itt a belső `section` az első felvonás egyik jelenetét jelöli.

**Fontos:** a `section` nem egyszerűen tetszőleges elemek csoportosítására való. Akkor használjuk, ha a csoportnak önálló témája, jelentése van.

Különbség `section` és `article` között:
- `section`: a dokumentum egy tematikusan elkülönülő részét jelöli. Általában saját címsora van, és a nagyobb tartalom egyik szakaszát alkotja.
- `article`: olyan önálló tartalmi egységet jelöl, amely önmagában is értelmezhető, és akár a dokumentumtól függetlenül is közzétehető.

---

# A `div` elem

A `<div>` egy általános célú **csoportosító elem**.

Akkor használjuk, ha több elemet szeretnénk összefogni, például közös CSS-formázás céljából, de nincs szükség külön szemantikus elemre.

Például:

```html
<div class="card">
    <h2>Termék neve</h2>
    <p>Termékleírás</p>
    <p>Ár: 5000 Ft</p>
</div>
```

A `div` alapértelmezetten blokkszintű megjelenítésű, tehát új sorban kezdődik.

Önmagában **nem ad külön jelentést** a tartalomnak, csak csoportosítja azt.

---

# A `span` elem

A `<span>` szintén általános célú csoportosító elem, de elsősorban **szövegrészletek elkülönítésére** használjuk.

Például:

```html
<p>
    A termék ára:
    <span class="price">5000 Ft</span>
</p>
```

CSS-ben:

```css
.price {
    color: red;
    font-weight: bold;
}
```

A `span` alapértelmezetten inline elem, ezért nem kezd új sort.

## `div` és `span` különbsége

| `div` | `span` |
|---|---|
| Általában nagyobb tartalmi egységeket fog össze | Általában szövegrészleteket fog össze |
| Alapértelmezetten blokkszintű | Alapértelmezetten inline |
| Új sorban kezdődik | A szöveggel egy sorban marad |
| Nincs önálló szemantikus jelentése | Nincs önálló szemantikus jelentése |

Mindkettőhöz rendelhetünk `class` attribútumot, így CSS segítségével könnyen formázhatjuk őket.

---

# A `cite` elem

A `<cite>` egy alkotás vagy mű **címének megjelölésére** szolgál.

Például:

```html
<p>
    William Shakespeare egyik legismertebb műve a
    <cite>Hamlet</cite>.
</p>
```

Használható például könyvek, filmek, színdarabok és más művek címének megjelölésére.

A böngészők alapértelmezetten gyakran dőlt betűvel jelenítik meg a `cite` tartalmát, de ez CSS-sel módosítható.

---

# További HTML karakterreferencia

Az `&mdash;` egy hosszú gondolatjelet jelenít meg:

```html
<p>Hamlet&mdash;William Shakespeare</p>
```

Megjelenítve:

```text
Hamlet—William Shakespeare
```

Nem összekeverendő a korábban látott `&ndash;` karakterreferenciával, amely rövidebb nagykötőjelet (`–`) jelenít meg.

---

https://quizlet.com/hu/1227420907/webtechnologiak-html-css-es-karakterhivatkozasok-flash-cards/?i=79t58a&x=1qqt