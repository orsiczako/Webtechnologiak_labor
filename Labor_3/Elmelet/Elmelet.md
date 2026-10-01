
---

# 1. XML – attribútumok

Az XML-ben egy elemhez nemcsak gyermekelemek és szöveges tartalom tartozhat, hanem **attribútumok** is.

Például:

```xml
<movie id="0062622" mpa-rating="G">
```

Ebben:

- az elem neve `movie`;
- az `id` egy attribútum;
- az `mpa-rating` szintén attribútum.

Az attribútum általános alakja:

```xml
<elem attribútum="érték">
```

Az attribútum értékét idézőjelek közé kell tenni:

```xml
<book language="hu">
```

vagy:

```xml
<book language='hu'>
```

Mindkét idézőjeltípus használható, de a nyitó és záró idézőjelnek természetesen azonosnak kell lennie.

---

## 1.1. Mire használható egy attribútum?

Az attribútum egy elemhez tartozó kiegészítő adatot tárol.

Például:

```xml
<movie id="0078748" mpa-rating="R">
```

Itt az elem maga egy filmet ír le, az attribútumok pedig további információkat kapcsolnak hozzá.

Egy másik példa:

```xml
<person id="42" active="yes">
    ...
</person>
```

Az attribútumok használata különösen akkor kényelmes, ha az adat:

- rövid;
- közvetlenül az adott elem tulajdonsága;
- nem igényel további belső szerkezetet.

---


Nincs olyan általános szabály, hogy minden adatot mindig elemként vagy mindig attribútumként kell tárolni.

Az attribútum jellemzően valamilyen rövid tulajdonság vagy metaadat megadására alkalmas, míg összetettebb vagy további szerkezetet igénylő adatokhoz célszerűbb lehet külön elemet használni.

---

## 1.2. Egy elem több attribútuma

Egy nyitó címkében több attribútum is megadható:

```xml
<movie id="0062622" mpa-rating="G">
```

Az attribútumokat szóközzel választjuk el egymástól.

Egy adott elemben ugyanaz az attribútumnév nem szerepelhet kétszer:

```xml
<!-- Hibás -->
<movie id="1" id="2">
```

---

## 1.3. Az attribútumok sorrendje

Az attribútumok sorrendje nem hordoz jelentést.

Ez a két nyitó címke XML-szempontból ugyanazokat az attribútumokat tartalmazza:

```xml
<movie id="0062622" mpa-rating="G">
```

```xml
<movie mpa-rating="G" id="0062622">
```

A gyermekelemek sorrendje ezzel szemben lehet fontos, például ha azt a DTD előírja.

---

## 1.6. Az `xml:lang` attribútum

Az XML rendelkezik néhány szabványosan definiált, `xml:` előtaggal kezdődő attribútummal. Ezek közül az egyik:

```xml
xml:lang
```

Az `xml:lang` az elem tartalmának nyelvét jelöli.

Például:

```xml
<title xml:lang="en">Alien</title>
<title xml:lang="hu">A nyolcadik utas: a Halál</title>
```

Az első cím angol, a második magyar nyelvű.

Ez különösen hasznos akkor, ha ugyanannak az adatnak több nyelvi változatát is tároljuk.

A CSS képes a nyelvi információ alapján is elemeket kiválasztani, erre később a `:lang()` pszeudoosztálynál térünk ki.

---

# 2. DTD – attribútumok deklarálása

A DTD-ben nemcsak azt lehet megadni, hogy milyen elemek léteznek és azok milyen gyermekelemeket tartalmazhatnak, hanem az elemekhez tartozó attribútumokat is deklarálhatjuk.

Erre az `ATTLIST` deklaráció szolgál.

Általános alak:

```dtd
<!ATTLIST elemnév
    attribútumnév attribútumtípus alapértelmezési-szabály>
```

Például:

```dtd
<!ATTLIST movie
    id CDATA #REQUIRED>
```

Ez azt mondja ki, hogy a `movie` elemnek van egy `id` nevű attribútuma.

---

## 2.1. Több attribútum deklarálása

Egy `ATTLIST` deklarációban több attribútum is megadható:

```dtd
<!ATTLIST movie
    id CDATA #REQUIRED
    mpa-rating (G|NC-17|PG|PG-13|R) #IMPLIED>
```

Itt a `movie` elemhez két attribútum tartozik:

- `id`;
- `mpa-rating`.

Minden attribútumnál meg kell adni:

1. az attribútum nevét;
2. a típusát;
3. azt, hogy kötelező-e, elhagyható-e, vagy van-e alapértelmezett értéke.

---

## 2.2. `CDATA`

Az egyik legegyszerűbb attribútumtípus:

```dtd
CDATA
```

Például:

```dtd
id CDATA #REQUIRED
```

A `CDATA` azt jelenti, hogy az attribútum értéke karakteres adat.

Például:

```xml
<movie id="0062622">
```

Fontos különbség:

- `#PCDATA` elemek szöveges tartalmánál fordul elő;
- `CDATA` attribútumtípusként használható.

Tehát:

```dtd
<!ELEMENT title (#PCDATA)>
```

és:

```dtd
<!ATTLIST movie id CDATA #REQUIRED>
```

nem ugyanazt a fogalmat használja.

---

## 2.3. Felsorolt attribútumértékek

Nem mindig szeretnénk tetszőleges karakterláncot engedélyezni.

Megadható az engedélyezett értékek felsorolása:

```dtd
mpa-rating (G|NC-17|PG|PG-13|R) #IMPLIED
```

Ez azt jelenti, hogy az attribútum értéke kizárólag a felsorolt lehetőségek valamelyike lehet.

Érvényes például:

```xml
<movie mpa-rating="PG">
```

vagy:

```xml
<movie mpa-rating="R">
```

Viszont a következő érték nincs a felsorolásban:

```xml
<movie mpa-rating="18">
```

Ezért egy ilyen dokumentum nem felelne meg ennek a DTD-deklarációnak.

A `|` itt „vagy” jelentésű:

```text
G vagy NC-17 vagy PG vagy PG-13 vagy R
```

---

## 2.4. `#REQUIRED`

Ha egy attribútum deklarációjának végén ez áll:

```dtd
#REQUIRED
```

akkor az attribútum megadása kötelező.

Például:

```dtd
id CDATA #REQUIRED
```

esetén minden érintett elemnek rendelkeznie kell `id` attribútummal.

Megfelel:

```xml
<movie id="123">
```

Nem felel meg:

```xml
<movie>
```

---

## 2.5. `#IMPLIED`

Az:

```dtd
#IMPLIED
```

azt jelenti, hogy az attribútum megadása nem kötelező.

Például:

```dtd
mpa-rating (G|NC-17|PG|PG-13|R) #IMPLIED
```

esetén mindkettő lehetséges:

```xml
<movie mpa-rating="R">
```

és:

```xml
<movie>
```

Ha az attribútum szerepel, akkor az értékének meg kell felelnie a deklarált típusnak.  
Ha nem szerepel, az önmagában nem sérti a DTD-t.

A `#IMPLIED` nem azt jelenti, hogy a DTD automatikusan behelyettesít valamilyen értéket. Egyszerűen azt jelzi, hogy az attribútum elhagyható.

---

## 2.6. `NMTOKEN`

Egy másik attribútumtípus:

```dtd
NMTOKEN
```

Például:

```dtd
<!ATTLIST title
    xml:lang NMTOKEN #REQUIRED>
```

Az `NMTOKEN` olyan értéket enged meg, amely XML-névtokenként érvényes karakterekből áll.

Például megfelelő lehet:

```text
en
hu
fr
PG-13
```

Az `NMTOKEN` kevésbé szigorú, mint az XML-elemek és attribútumok neveire vonatkozó `Name` szabály. Például egy `NMTOKEN` kezdődhet számjeggyel is.

Az `NMTOKEN` szintaktikai megszorítást ad. Attól, hogy egy érték `NMTOKEN` szempontból helyes, még nem feltétlenül jelent szemantikailag helyes nyelvkódot vagy más valós adatot.

---

## 2.7. Attribútumtípus és kötelezőség két külön kérdés

Egy attribútum deklarációjában két külön dolgot adunk meg.

Például:

```dtd
id CDATA #REQUIRED
```

A:

```text
CDATA
```

azt mondja meg, **milyen értéket** tárolhat az attribútum.

A:

```text
#REQUIRED
```

azt mondja meg, hogy **kötelező-e megadni**.

Ugyanígy:

```dtd
mpa-rating (G|NC-17|PG|PG-13|R) #IMPLIED
```

esetén:

- a zárójeles felsorolás az engedélyezett értékeket szabályozza;
- a `#IMPLIED` azt mondja ki, hogy maga az attribútum elhagyható.

---

# 3. CSS 


## 3.1. `:lang()`

A CSS képes egy elem nyelve alapján is kiválasztani.

Például:

```css
title:lang(en) {
    display: inline-block;
}
```

A `:lang(en)` azokat az elemeket választja ki, amelyek nyelve angol.

XML-ben a nyelvet például az `xml:lang` attribútummal lehet megadni:

```xml
<title xml:lang="en">Example</title>
```

A `:lang()` tehát nem általános attribútumszelektor, hanem kifejezetten a nyelvi információ alapján működő pszeudoosztály.

Például:

```css
title:lang(hu)
```

magyar nyelvű `title` elemekre illeszkedik.

---

## 3.2. XML-attribútum értékének felhasználása CSS-ben: `attr()`

A CSS `attr()` függvénye képes kiolvasni egy attribútum értékét.

Például az XML:

```xml
<item id="42">
```

és a CSS:

```css
item::after {
    content: attr(id);
}
```

hatására a böngésző az `id` attribútum értékét jeleníti meg az elem után.

Az eredmény:

```text
42
```

Fix szöveggel is kombinálható:

```css
item::after {
    content: "Azonosító: " attr(id);
}
```

Ekkor például:

```text
Azonosító: 42
```

jelenik meg.

Az `attr()` tehát nem kiválasztásra szolgál. **Egy már kiválasztott elem attribútumának értékét használja fel.**

---

## 3.3. Attribútumszelektor

CSS-ben egy elem az attribútuma alapján is kiválasztható.

Például:

```css
movie[mpa-rating="R"] {
    color: red;
}
```

Ez azokat a `movie` elemeket választja ki, amelyeknek:

- van `mpa-rating` attribútumuk;
- annak értéke pontosan `R`.

Általános alak:

```css
elem[attribútum="érték"]
```

Például:

```css
person[status="active"]
```

azokat a `person` elemeket választja ki, amelyeknél:

```xml
status="active"
```

szerepel.

---

## 3.4. Attribútum meglétének vizsgálata

Az attribútumszelektor érték megadása nélkül is használható:

```css
movie[mpa-rating]
```

Ez minden olyan `movie` elemet kiválaszt, amely rendelkezik `mpa-rating` attribútummal, függetlenül annak értékétől.

Tehát:

```css
[attribute]
```

az attribútum **meglétét**,

míg:

```css
[attribute="value"]
```

egy konkrét attribútumértéket vizsgál.

---

## 3.5. `attr()` és attribútumszelektor különbsége

A két konstrukció könnyen összekeverhető, pedig teljesen más feladatot végeznek.

### Attribútumszelektor

```css
movie[mpa-rating="R"]
```

Feladata:

> kiválasztani azokat az elemeket, amelyek megfelelnek az attribútumfeltételnek.

### `attr()`

```css
content: attr(id);
```

Feladata:

> kiolvasni a már kiválasztott elem egyik attribútumának értékét.

Röviden:

```text
[attribútum="érték"]  → kiválasztás
attr(attribútum)      → érték kiolvasása
```

---

## 3.6. `:is()`

A `:is()` pszeudoosztály segítségével több lehetséges szelektort lehet egy közös részbe csoportosítani.

Például:

```css
:is(title, year) {
    color: red;
}
```

Ez a `title` **vagy** `year` elemeket választja ki.

A következő két szabály:

```css
title {
    color: red;
}

year {
    color: red;
}
```

összevonható:

```css
:is(title, year) {
    color: red;
}
```

Egyszerű esetben ugyanez vesszővel is leírható:

```css
title, year {
    color: red;
}
```

A `:is()` fő előnye összetettebb szelektoroknál jelenik meg.

---

## 3.7. `:is()` összetettebb szelektorban

Például:

```css
movie:is([mpa-rating="R"], [mpa-rating="NC-17"])
```

jelentése:

> olyan `movie` elem, amelynek `mpa-rating` értéke `R` vagy `NC-17`.

A `:is()` tehát lehetővé teszi több alternatíva rövid megadását.

Tovább folytatva:

```css
movie:is([mpa-rating="R"], [mpa-rating="NC-17"]) > :is(title, year)
```

jelentése:

> válasszuk ki azoknak a `movie` elemeknek a közvetlen `title` vagy `year` gyermekeit, amelyek `mpa-rating` attribútuma `R` vagy `NC-17`.

A `>` gyermekkombinátor már korábban szerepelt, itt csak új szelektorokkal kombináljuk.

---

## 3.8. Miért hasznos a `:is()`?

Nélküle ugyanaz a feltétel sokszor ismétléssel írható csak le.

Például:

```css
movie[mpa-rating="R"] > title,
movie[mpa-rating="R"] > year,
movie[mpa-rating="NC-17"] > title,
movie[mpa-rating="NC-17"] > year {
    color: red;
}
```

A `:is()` segítségével:

```css
movie:is([mpa-rating="R"], [mpa-rating="NC-17"]) > :is(title, year) {
    color: red;
}
```

Ez rövidebb, és az összetett feltétel szerkezete is könnyebben áttekinthető.

---

## 3.9. `monospace` mint általános betűtípuscsalád

A `font-family` tulajdonságnál nemcsak konkrét betűtípusok adhatók meg, hanem általános betűtípuscsaládok is.

Például:

```css
font-family: monospace;
```

A `monospace` azt kéri a böngészőtől, hogy olyan betűtípust használjon, amelyben a karakterek azonos szélességűek.

Gyakori felhasználási területei:

- programkód;
- technikai azonosítók;
- URL-ek;
- konzolos vagy terminálszerű megjelenítés.

A konkrét betűtípust ilyenkor a böngésző és az operációs rendszer választja ki.

---


A legfontosabbak:

```xml
<movie mpa-rating="R">
```

Az XML **tárolja** az attribútumot.

```dtd
mpa-rating (G|NC-17|PG|PG-13|R) #IMPLIED
```

A DTD **szabályozza**, hogy az attribútum milyen értékeket vehet fel és kötelező-e.

```css
movie[mpa-rating="R"]
```

A CSS **kiválaszthat** elemeket az attribútum alapján.

```css
content: attr(id);
```

A CSS pedig az attribútum **értékét is felhasználhatja** a megjelenítés során.