# 2. labor – DTD és haladóbb CSS-formázás

## Rövid elméleti bevezető

Az előző laborban azt láttuk, hogyan lehet egy egyszerű szöveges tartalmat XML-elemek segítségével **strukturált dokumentummá alakítani**, majd CSS segítségével megjeleníteni.

A mai laborban erre építünk tovább. Két új irány jelenik meg:

- az XML szerkezetét már nemcsak kialakítjuk, hanem **szabályokkal is leírjuk és ellenőrizhetővé tesszük** egy DTD segítségével,

- a CSS-ben olyan lehetőségeket használunk, amelyekkel **sorszámozást, táblázatszerű elrendezést, interakciót és generált tartalmat** is létrehozhatunk.

---

# XML-validáció és DTD

## Jólformált és érvényes XML

A **jólformáltság** és az **érvényesség** két külön fogalom.

Egy XML-dokumentum akkor **jólformált** (*well-formed*), ha megfelel az XML alapvető szintaktikai és szerkezeti szabályainak. A legfontosabbak közül néhány:

- pontosan egy felső szintű elem, vagyis **gyökérelem** van;
- minden nyitó címkéhez a megfelelő nevű záró címke tartozik;
- az elemek szabályosan vannak egymásba ágyazva, nem fedhetik át egymást;
- az elem- és attribútumnevek kis- és nagybetűérzékenyek;
- az attribútumértékeket idézőjelek között kell megadni;
- ugyanaz az attribútumnév egy nyitó vagy üres elem címkében legfeljebb egyszer szerepelhet;
- a speciális karaktereket megfelelően kell használni, például szövegben az `&` helyett `&amp;`, a `<` helyett `&lt;` szükséges.

Például:

```xml
<book>
    <banana>Hamlet</banana>
</book>
```

Ez **jólformált lehet**: attól, hogy a `banana` elem egy könyv leírásában furcsának tűnik, az XML szintaxisa még lehet helyes.

Az **érvényesség** (*validity*) ennél többet követel meg. A diasorban használt XML 1.0 szerinti értelemben egy XML-dokumentum akkor **érvényes**, ha:

1. tartozik hozzá **dokumentumtípus-deklaráció** (`DOCTYPE`);
2. a dokumentum megfelel a hozzá tartozó DTD által előírt megszorításoknak.

Az érvényesség vizsgálatánál többek között ellenőrizni kell, hogy:

- a `DOCTYPE`-ban megadott név megegyezik-e a gyökérelem elemtípusával;
- minden használt elem deklarálva van-e a DTD-ben;
- az elemek tartalma megfelel-e a deklarált tartalommodellnek, például a gyermekelemek típusa, sorrendje és előfordulási száma megfelelő-e;
- minden használt attribútum deklarálva van-e, és az értéke megfelel-e a deklarációjának;
- a `#REQUIRED` attribútumok minden szükséges helyen szerepelnek-e.

Például a következő DTD:

```dtd
<!ELEMENT book (author, title, chapter*)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT chapter (#PCDATA)>
```

és az ehhez kapcsolódó XML:

```xml
<!DOCTYPE book SYSTEM "book.dtd">
<book>
    <author>Sir Arthur Conan Doyle</author>
    <title>The Hound of the Baskervilles</title>
</book>
```

**jólformált és érvényes** lehet, mert a `chapter*` nulla vagy több `chapter` elemet engedélyez.

Ha azonban felcseréljük az `author` és a `title` sorrendjét:

```xml
<!DOCTYPE book SYSTEM "book.dtd">
<book>
    <title>The Hound of the Baskervilles</title>
    <author>Sir Arthur Conan Doyle</author>
</book>
```

akkor a dokumentum továbbra is **jólformált**, de **nem érvényes**, mert nem felel meg a DTD-ben előírt `(author, title, chapter*)` sorrendnek.

Ha nincs dokumentumtípus-deklaráció, a dokumentum lehet **jólformált**, de a diasorban használt definíció szerint **nem érvényes**.

Röviden:

```text
jólformált XML
        ↓
megfelel az XML jólformáltsági szabályainak
érvényes XML
        ↓
jólformált
+ tartozik hozzá dokumentumtípus-deklaráció
+ megfelel a DTD érvényességi megszorításainak
```

Ezért **érvényes, de nem jólformált XML nem létezhet**.

---

## Mi az a DTD?

A **DTD** (**Document Type Definition**) azt írja le, hogy egy adott XML-dokumentumban:

- milyen elemek szerepelhetnek;

- ezek milyen sorrendben következhetnek;

- mely elemek ismétlődhetnek;

- mely elemek tartalmazhatnak szöveget;

- milyen szülő–gyerek kapcsolatok engedélyezettek.

A könyves példában a DTD külön fájlban található:

```text
book.dtd
```

Az XML-dokumentum pedig hivatkozik erre:

```xml
<!DOCTYPE book SYSTEM "book.dtd">
```

A `DOCTYPE` itt azt mondja meg, hogy:

- a dokumentum gyökéreleme `book`;

- a hozzá tartozó külső DTD a `book.dtd` fájlban található.

A `SYSTEM` azt jelzi, hogy a DTD-t egy külső erőforrásból, jelen esetben egy helyi fájlból töltjük be.

---

## Elem deklarálása DTD-ben

Egy elem legegyszerűbben így deklarálható:

```dtd
<!ELEMENT author (#PCDATA)>
```

Ez azt jelenti, hogy létezhet egy `author` nevű elem, amely **szöveges tartalmat** tartalmaz.

Például:

```xml
<author>Sir Arthur Conan Doyle</author>
```

---

## Gyerekelemek sorrendje

Nézzük a könyv gyökérelemének deklarációját:

```dtd
<!ELEMENT book (author, title, chapter*)>
```

Ez nemcsak azt mondja meg, hogy milyen gyerekei lehetnek a `book` elemnek, hanem a **sorrendet is meghatározza**.

A szerkezet:

```text
book
├── author
├── title
└── chapter
    └── ...
```

A DTD szerint tehát először `author`, utána `title`, majd `chapter` elemek következhetnek.

Ez például megfelel a deklarációnak:

```xml
<book>
    <author>Sir Arthur Conan Doyle</author>
    <title>The Hound of the Baskervilles</title>
    <chapter>
        ...
    </chapter>
</book>
```

Ez azonban nem:

```xml
<book>
    <title>The Hound of the Baskervilles</title>
    <author>Sir Arthur Conan Doyle</author>
</book>
```

Hiába vannak benne a megfelelő elemek, a sorrend nem felel meg a DTD-ben megadott szabálynak.

---

## Ismétlődés megadása DTD-ben

A DTD-ben különböző jelekkel adhatjuk meg, hogy egy elem hányszor fordulhat elő.

### `*` – nulla vagy több

```dtd
<!ELEMENT book (author, title, chapter*)>
```

A `chapter*` azt jelenti, hogy a `book` elemben:

- lehet nulla `chapter`;

- lehet egy `chapter`;

- lehet több `chapter`.

---

### `+` – egy vagy több

Például:

```dtd
<!ELEMENT playlist (track+)>
```

Itt legalább egy `track` elemnek szerepelnie kell, de több is lehet.

---

### `?` – nulla vagy egy

Például:

```dtd
<!ELEMENT person (name, nickname?)>
```

A `nickname` opcionális:

```xml
<person>
    <name>Alice</name>
</person>
```

és ez is megfelelhet:

```xml
<person>
    <name>Alice</name>
    <nickname>Ali</nickname>
</person>
```

Kettő `nickname` azonban már nem.

---

## Választási lehetőség: `|`

A `|` jel alternatívákat jelent.

Például:

```dtd
<!ELEMENT message (text | image)>
```

Ez azt jelenti, hogy a `message` egy `text` **vagy** egy `image` elemet tartalmazhat.

---

## Vegyes tartalom

A könyvben a bekezdések nemcsak szöveget tartalmaznak, hanem a szöveg közepén `footnote` elemek is megjelenhetnek.

Például:

```xml
<para>
    ... M.R.C.S.
    <footnote>Member of the Royal Colleges of Surgeons</footnote>,
    from his friends ...
</para>
```

Ehhez a DTD-ben a következő deklaráció tartozik:

```dtd
<!ELEMENT para (#PCDATA | footnote)*>
```

Ez **vegyes tartalom** (**mixed content**).

A `para` tehát tartalmazhat:

- normál szöveget (`#PCDATA`);

- `footnote` elemeket;

és ezek a tartalmak többször, egymással keveredve is előfordulhatnak.

---

# Külső betűtípusok használata CSS-ben

A laborban Google Fonts betűtípusokat is használunk.

Egy webes betűtípus CSS-fájlba importálható például így:

```css
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond");
```

Ezután használható a `font-family` tulajdonsággal:

```css
book {
    font-family: "EB Garamond", Garamond, Georgia, "Times New Roman", Times, serif;
}
```

A felsorolás itt **fallback láncot** alkot.

A böngésző balról jobbra halad:

1. először megpróbálja az `EB Garamond` betűtípust;

2. ha az nem érhető el, megpróbálja a `Garamond` betűtípust;

3. utána a `Georgia`-t;

4. majd a `Times New Roman`-t;

5. végül bármilyen általános `serif` betűtípust.

Ez azért hasznos, mert így a megjelenítés akkor sem omlik össze, ha valamelyik konkrét betűtípus nem érhető el.

---

# CSS-szelektorok pontosítása

## Közvetlen gyerek: `>`

Az előző laborból már ismert forma:

```css
book > title {
    ...
}
```

Csak azt a `title` elemet választja ki, amelynek **közvetlen szülője** a `book`.

Ez fontos, mert a könyvben többféle `title` is található:

```xml
<book>
    <title>A könyv címe</title>
    <chapter>
        <title>A fejezet címe</title>
    </chapter>
</book>
```

A

```css
book > title
```

csak a könyv címét választja ki.

A

```css
chapter > title
```

pedig a fejezetcímeket.

---

## Közvetlenül következő testvérelem: `+`

Új szelektor a laborban a **szomszédos testvérkombinátor** (**adjacent sibling combinator**).

Például:

```css
title + para {
    text-indent: 0;
}
```

Az `A + B` azokat a `B` elemeket választja ki, amelyek:

- ugyanannak a szülőnek a gyerekei, mint az `A`;

- és **közvetlenül az `A` után következnek**.

Például:

```xml
<chapter>
    <title>Mr. Sherlock Holmes</title>
    <para>Első bekezdés...</para>
    <para>Második bekezdés...</para>
</chapter>
```

A

```css
title + para
```

csak az **első** `para` elemet választja ki.

A második bekezdést már nem, mert az közvetlenül egy másik `para` után következik.

Ez akkor hasznos, ha például egy fejezet első bekezdését másképpen szeretnénk formázni.

---

# Szöveg tipográfiai formázása

## `line-height`

A `line-height` a sorok közötti függőleges távolságot szabályozza.

```css
para {
    line-height: 1.5;
}
```

Az `1.5` itt azt jelenti, hogy a sormagasság a betűméret körülbelül másfélszerese.

Folyószövegnél ez javíthatja az olvashatóságot.

---

## `text-indent`

A `text-indent` a szöveg **első sorának behúzását** adja meg.

```css
para {
    text-indent: 1.5em;
}
```

Ez könyvszerű bekezdésformázást eredményez.

Ha például az első bekezdést nem szeretnénk behúzni:

```css
title + para {
    text-indent: 0;
}
```

Itt a két korábban látott fogalom együtt jelenik meg:

- `+`: a cím után közvetlenül következő bekezdés;

- `text-indent`: az első sor behúzása.

---

## `letter-spacing`

A `letter-spacing` a karakterek közötti távolságot állítja.

```css
author {
    letter-spacing: 0.1em;
}
```

Pozitív érték esetén a betűk távolabb kerülnek egymástól.

---

## `font-variant: small-caps`

```css
author {
    font-variant: small-caps;
}
```

A `small-caps` kiskapitális megjelenítést kér.

Ez azt jelenti, hogy a kisbetűk a nagybetűkhöz hasonló formában, de kisebb méretben jelennek meg, amennyiben a használt betűtípus és böngésző ezt támogatja.

---

# Pszeudoelemek további használata

## `::first-letter`

A `::first-letter` egy blokk első betűjét célozza meg.

Például:

```css
para::first-letter {
    font-size: 1.7em;
    font-weight: bold;
}
```

Ez a bekezdés első betűjét nagyobbá és félkövérré teszi.

Ha csak a cím után közvetlenül következő első bekezdésen akarjuk ezt alkalmazni:

```css
title + para::first-letter {
    font-size: 1.7em;
    font-weight: bold;
}
```

Itt több CSS-eszközt kapcsolunk össze:

```text
title + para

a title után közvetlenül következő para
::first-letter

annak az első betűje
```

---

# Automatikus számozás CSS-sel

A labor egyik fontos új eleme a **CSS counter**, vagyis számláló.

Ezzel úgy tudunk például fejezetszámokat vagy sorszámokat megjeleníteni, hogy azoknak nem kell szerepelniük magában az XML-ben.

Ez fontos különbség:

```text
XML
az adat és a dokumentumszerkezet
CSS counter
a megjelenítés során előállított számozás
```

---

## `counter-reset`

Először létrehozunk vagy lenullázunk egy számlálót:

```css
book {
    counter-reset: chapter-number;
}
```

A `chapter-number` itt egy általunk választott számlálónév.

Kezdőértéke alapértelmezés szerint `0`.

---

## `counter-increment`

Ezután megadjuk, mikor növekedjen:

```css
chapter > title::before {
    counter-increment: chapter-number;
}
```

Minden fejezetcím előtt eggyel növekszik a számláló.

---

## `counter()`

A számláló aktuális értéke a `counter()` függvénnyel jeleníthető meg:

```css
chapter > title::before {
    content: "Chapter " counter(*chapter-number*);
}
```

A megjelenés például:

```text
Chapter 1
Chapter 2
Chapter 3
```

A számozás formátuma is megadható.

```css
counter(chapter-number, upper-roman)
```

Ezzel:

```text
I
II
III
IV
...
```

formában jelenik meg.

Például:

```css
chapter > title::before {
    content: "Chapter " counter(*chapter-number*, upper-roman) " — ";
}
```

A generált szöveg **nem kerül bele az XML-be**. Csak a CSS által létrehozott megjelenítés része.

---

## Több számláló egyszerre

Egy elemen több számlálót is nullázhatunk:

```css
book {
    counter-reset: chapter-number footnote-number;
}
```

Ez két külön számlálót hoz létre:

```text
chapter-number
footnote-number
```

Ezek egymástól függetlenül növelhetők.

---

# Lábjegyzet készítése XML-ből

A könyves feladatban a `footnote` elem a bekezdés szövegében található.

Például:

```xml
<para>
    ... M.R.C.S.
    <footnote>Member of the Royal Colleges of Surgeons</footnote>
    ...
</para>
```

A cél az, hogy normál állapotban ne a teljes lábjegyzetszöveget lássuk, hanem csak egy sorszámot.

Ehhez több CSS-eszközt kombinálhatunk.

---

## `vertical-align: super`

```css
footnote {
    vertical-align: super;
}
```

A `super` az elemet a környező szöveghez képest felső indexhez hasonló pozícióba emeli.

Ez például lábjegyzetszámoknál hasznos.

---

## Tartalom vizuális elrejtése

A labor egyik megoldásában a lábjegyzet normál szövege nagyon kicsi betűmérettel elrejthető:

```css
footnote {
    font-size: 0;
}
```

Ezután a `::before` pszeudoelemmel egy számozás jeleníthető meg:

```css
footnote::before {
    content: "[" counter(*footnote-number*) "]";
    counter-increment: footnote-number;
    font-size: small;
}
```

Így a tényleges XML-ben továbbra is ott marad a lábjegyzet teljes tartalma, de normál állapotban csak például:

```text
[1]
[2]
```

látszik.

---

# Interakció a `:hover` pszeudoosztállyal

A `:hover` akkor választ ki egy elemet, amikor az egérmutató fölötte van.

Például:

```css
para:hover {
    background-color: #f0f0f0;
}
```

Ez azt eredményezi, hogy egy bekezdés háttere megváltozik, amikor fölé visszük az egeret.

---

## Lábjegyzet megjelenítése rámutatáskor

A lábjegyzetnél ugyanez használható arra, hogy az elrejtett tartalom megjelenjen.

Például:

```css
footnote:hover {
    font-size: large;
    vertical-align: baseline;
}
```

Normál állapot:

```text
... M.R.C.S.[1], from his friends ...
```

Rámutatáskor pedig megjelenhet a tényleges lábjegyzetszöveg.

Ez jó példa arra, hogy ugyanaz az XML-adat a CSS segítségével **állapottól függően eltérően jelenhet meg**.

---

## `cursor`

A kurzor megjelenése is változtatható.

```css
footnote {
    cursor: help;
}
```

A `help` azt jelzi a felhasználónak, hogy az elemhez valamilyen magyarázó információ tartozhat.

Másik példa:

```css
track:hover {
    cursor: pointer;
}
```

A `pointer` tipikusan kattintható vagy interaktív elem érzetét kelti.

Fontos: a `cursor: pointer` **önmagában nem teszi kattinthatóvá** az elemet. Csak a kurzor megjelenését változtatja meg.

---

# Átmenetek: `transition`

A CSS-ben nem minden állapotváltozásnak kell azonnal történnie.

Például:

```css
track {
    transition: background-color 0.4s, font-weight 0.4s;
}
```

Ez azt jelenti, hogy ha például a `background-color` vagy a `font-weight` értéke megváltozik, a böngésző körülbelül `0.4s` alatt hajtja végre az átmenetet.

Ehhez társítható:

```css
track:hover {
    background-color: gold;
    font-weight: bold;
}
```

Az eredmény: a sor rámutatáskor nem teljesen hirtelen, hanem rövid átmenettel változik meg.

---

# Táblázatszerű elrendezés XML-elemekkel

A zenei album feladatban a számok címe és hossza sorokba rendezve jelenik meg.

Ehhez nem feltétlenül szükséges HTML `<table>` elem.

CSS-sel XML-elemeket is megjeleníthetünk táblázatszerűen.

---

## `display: table`

```css
tracks {
    display: table;
}
```

A `tracks` elem így táblázathoz hasonló elrendezési konténerré válik.

---

## `display: table-row`

```css
track {
    display: table-row;
}
```

Minden `track` egy táblázatsornak megfelelő módon viselkedik.

---

## `display: table-cell`

```css
track > title,
track > length {
    display: table-cell;
}
```

A cím és az időtartam pedig cellaként viselkedik.

A szerkezet:

```text
tracks                       display: table
│
├── track                    display: table-row
│   ├── title                display: table-cell
│   └── length               display: table-cell
│
├── track                    display: table-row
│   ├── title                display: table-cell
│   └── length               display: table-cell
│
└── ...
```

Ez jól illeszkedik az XML fa jellegű szerkezetéhez.

---

# Automatikus sorszámozás zeneszámoknál

A zeneszámok sorszámát sem feltétlenül kell beírni az XML-be.

A számláló lenullázható a `tracks` elemen:

```css
tracks {
    counter-reset: track-number;
}
```

Ezután minden szám címénél növelhető:

```css
track > title::before {
    counter-increment: track-number;
    content: counter(*track-number*) ".";
}
```

Ha az XML-ben csak ez szerepel:

```xml
<track>
    <title>Broken Bits</title>
    <length>6:51</length>
</track>
```

a böngészőben megjelenhet:

```text
1. Broken Bits     6:51
```

A `1.` tehát nem része az XML-adatnak.

---

# Páros és páratlan elemek kiválasztása

## `:nth-child()`

A `:nth-child()` pszeudoosztállyal egy elemnek a testvérei közötti pozíciója alapján választhatunk.

Például:

```css
track:nth-child(odd) {
    background-color: whitesmoke;
}
```

Az `odd` jelentése:

```text
1., 3., 5., 7., ...
```

Páros elemek:

```css
track:nth-child(even) {
    background-color: white;
}
```

Az `even` jelentése:

```text
2., 4., 6., 8., ...
```

Ezzel könnyen létrehozható úgynevezett **zebra striping**, vagyis váltakozó sorháttér:

```text
1. sor   világosszürke
2. sor   fehér
3. sor   világosszürke
4. sor   fehér
...
```

Ez hosszabb felsorolásoknál javíthatja az olvashatóságot.

---

# Számjegyek azonos szélességgel

## `font-variant-numeric: tabular-nums`

Az albumon az időtartamok például ilyenek:

```text
6:51
5:54
8:20
5:37
```

Bizonyos betűtípusokban az egyes számjegyek nem egyforma szélességűek.

Például az `1` gyakran keskenyebb, mint a `8`.

Táblázatos adatoknál ez zavaró lehet, mert az oszlopok kevésbé rendezettnek tűnnek.

Erre használható:

```css
length {
    font-variant-numeric: tabular-nums;
}
```

A `tabular-nums` azt kéri, hogy a számjegyek azonos szélességű helyet foglaljanak el.

Ez főleg olyan adatoknál hasznos, mint:

- időpontok;

- időtartamok;

- árak;

- táblázatos számadatok;

- sorszámok.

A különbség egyes betűtípusoknál látványosabb, másoknál alig észrevehető.

---

# Az elem méretének igazítása a tartalomhoz

## `width: fit-content`

Például:

```css
album {
    width: fit-content;
}
```

A `fit-content` hatására az elem szélessége a tartalomhoz igazodhat, a rendelkezésre álló hely korlátait is figyelembe véve.

Ez akkor lehet hasznos, ha nem szeretnénk, hogy egy kisebb tartalmi doboz szükségtelenül kitöltse az egész oldal szélességét.

---

# Lekerekített sarkok

## `border-radius`

```css
album {
    border-radius: 0.5rem;
}
```

A `border-radius` az elem sarkait kerekíti le.

Nagyobb érték általában erősebben lekerekített megjelenést eredményez.

---

# Árnyék

## `box-shadow`

Például:

```css
album {
    box-shadow: 0.25rem 0.25rem 0.5rem gray;
}
```

A `box-shadow` az elem dobozához ad árnyékot.

Ebben a példában az értékek sorrendje:

```text
vízszintes eltolás
függőleges eltolás
elmosás mértéke
szín
```

Vagyis:

```css
box-shadow: 0.25rem 0.25rem 0.5rem gray;
```

nagyjából ezt jelenti:

```text
jobbra tolás   = 0.25rem
lefelé tolás   = 0.25rem
elmosás        = 0.5rem
árnyék színe   = gray
```

---

# Több elem kiválasztása különböző szerkezeti helyekről

Az album tetején az előadó, az album címe és az év egy sorban jelenhet meg.

Ehhez több különböző szelektort csoportosíthatunk:

```css
artist, album > title, year {
    display: inline-block;
}
```

Ez három külön szelektor:

```text
artist
album > title
year
```

A vessző azt jelenti, hogy ugyanazokat a deklarációkat mindhárom kiválasztásra alkalmazzuk.

Az `album > title` azért pontosabb egyszerűen a `title` szelektornál, mert a dokumentumban a zeneszámoknak is lehet `title` elemük.

---

# `inline-block`

Az `inline-block` egyfajta átmenetet jelent az `inline` és a `block` viselkedés között.

```css
artist {
    display: inline-block;
}
```

Az ilyen elem:

- egy sorban maradhat más elemekkel;

- ugyanakkor dobozszerűen méretezhető;

- alkalmazható rá például `width`, `height`, `margin` és `padding`.

Ez hasznos lehet olyan fejlécszerű elrendezésnél, ahol több külön XML-elemnek egymás mellett kell megjelennie.

---

# Generált írásjelek `::before` és `::after` segítségével

Az XML-ben nem feltétlenül kell tárolni azokat az írásjeleket, amelyek csak a megjelenítéshez szükségesek.

Például ha az XML:

```xml
<artist>Archive</artist>
<title>Glass Minds</title>
<year>2026</year>
```

a megjelenítés pedig:

```text
Archive – Glass Minds (2026)
```

akkor a gondolatjel és a zárójelek létrehozhatók CSS-ből.

Például:

```css
artist::after {
    content: " – ";
}
```

és:

```css
year::before {
    content: "(";
}
year::after {
    content: ")";
}
```

Így az XML-ben továbbra is csak maga az adat szerepel:

```xml
<year>2026</year>
```

nem pedig:

```xml
<year>(2026)</year>
```

Ez jó példa az **adat és a megjelenítés szétválasztására**.

---

# Elem elrejtése

Ha egy XML-elem adatait megtartjuk a dokumentumban, de egy adott megjelenítésben nem akarjuk láthatóvá tenni, használható:

```css
genres {
    display: none;
}
```

Az elem ettől **nem törlődik az XML-ből**.

Csak az adott CSS-megjelenítésben nem kap látható dobozt.

Ez fontos különbség:

```text
XML-adat megmarad,
CSS dönti el, hogy megjelenjen-e
```

---


---

> **Fontos:** Ez a laboranyag az órai munkát és a gyakorlást segíti, de **nem helyettesíti az előadások anyagát**.  
> A vizsgára készülés során mindenképpen nézzék át az előadások fóliasorait is.  
> A [Quizlet gyakorlókérdései](https://quizlet.com/hu/1212029834/labor2-flash-cards/?i=79t58a&x=1jqt) szintén gyakorlást szolgálnak; a bennük szereplő kérdéseket és válaszokat **ne vegyék készpénznek**, az elsődleges tananyag az előadások anyaga.
