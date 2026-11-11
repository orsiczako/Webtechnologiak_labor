# HTML-űrlapok – elméleti áttekintő

A HTML-űrlapok segítségével a felhasználótól adatokat kérhetünk be, például nevet, születési dátumot, e-mail-címet vagy egy listából kiválasztott értéket.

Az űrlap különböző HTML-elemekből épül fel. Egyes elemek adatbevitelt tesznek lehetővé, mások a mezők feliratait, csoportosítását vagy az adatok elküldését biztosítják.

Az alábbiakban egy regisztrációs űrlap felépítését vizsgáljuk meg, **az űrlap felépítését lépésenként megismerve**.

---

# 1. A HTML-dokumentum fejléce

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roxforti regisztrációs űrlap</title>
    <link rel="stylesheet" href="hogwarts-form.css">
</head>
```

A korábbi feladatokból ezek az elemek már ismerősek:

- `<html lang="hu">` – a dokumentum nyelvét magyarra állítja.
- `<meta charset="UTF-8">` – beállítja a karakterkódolást.
- `<title>` – megadja a böngészőfül címét.
- `<link rel="stylesheet">` – külső CSS-stíluslapot kapcsol a dokumentumhoz.

A következő metaelem a különböző képernyőméretekhez történő alkalmazkodást segíti:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Itt:

- `name="viewport"` – a böngésző megjelenítési területére vonatkozó beállítást ad meg;
- `width=device-width` – a megjelenítési terület szélességét az eszköz szélességéhez igazítja;
- `initial-scale=1.0` – a kezdeti nagyítást 100%-ra állítja.

Ez különösen mobiltelefonokon fontos, de **önmagában nem teszi reszponzívvá az oldalt**. Ehhez megfelelő CSS is szükséges.

---

# 2. Az űrlap és a mezőkhöz tartozó feliratok


Az oldal főcíme után következik az űrlap:

```html
<h1>Roxforti regisztrációs űrlap</h1>

<form class="fancy-form" method="post" enctype="multipart/form-data"
      action="https://webhook.site/YOUR_WEBHOOK_ID">
    ...
</form>
```

A `<form>` elem **összefogja az űrlaphoz tartozó mezőket**, és lehetővé teszi a kitöltött adatok elküldését.


Az első adatbeviteli mező példáján nézzük meg, hogyan kapcsoljuk a feliratot a mezőhöz:

```html
<div>
    <label for="name">Név</label>
    <input type="text" name="name" id="name" required placeholder="pl. Harry James Potter">
</div>
```

A `<div>` itt a feliratot és a hozzá tartozó adatbeviteli mezőt fogja össze.

## A `label` elem

```html
<label for="name">Név</label>
```

A `<label>` egy űrlapmező **feliratát** adja meg.

A `for` attribútum meghatározza, hogy melyik mezőhöz tartozik.

```html
for="name"
```

Ez a következő elemre hivatkozik:

```html
<input id="name">
```

Tehát a `for` és az `id` értékének meg kell egyeznie.

Ennek az egyik előnye, hogy **a feliratra kattintva is aktiválható a hozzá tartozó mező**, például a szövegmező fókuszba kerül.

A `label` az akadálymentesség szempontjából is fontos.

## A `label` másik használati módja

Korábban így kapcsoltunk feliratot egy mezőhöz:

```html
<label for="name">Név</label>
<input type="text" id="name">
```

Itt viszont ezt látjuk:

```html
<label>
    Faj
    <input type="text" name="pet-species" placeholder="pl. bagoly">
</label>
```

Ebben az esetben az `input` **közvetlenül a `label` elem belsejében szerepel**.

Ilyenkor nincs szükség `for` és `id` párosítására, mert a címke a benne található mezőhöz kapcsolódik.

Tehát a két megoldás közötti különbség:

- `for` + `id` – explicit összekapcsolás;
- `input` a `label` belsejében – közvetlen beágyazás.

Mindkettő használható.

---

# 3. A `form` elem attribútumai

Miután megismertük a feliratok és a mezők összekapcsolását, nézzük meg, mit jelentenek a `<form>` elem attribútumai.

## A `class` attribútum

```html
class="fancy-form"
```

Az űrlaphoz egy CSS-osztályt rendelünk, így külön formázhatjuk:

```css
.fancy-form {
    border: 1px solid gray;
    padding: 1rem;
}
```

A `class` önmagában nem eredményez különleges megjelenítést; a hozzá tartozó CSS-szabályok határozzák meg a formázást.

## A `method` attribútum

```html
method="post"
```

A `method` azt határozza meg, hogy **milyen HTTP-metódussal küldjük el az űrlap adatait**.

Két gyakori értéke:

| Érték | Jelentés |
|---|---|
| `get` | Az űrlap adatai jellemzően az URL lekérdezési paraméterei közé kerülnek |
| `post` | Az űrlap adatai a HTTP-kérés törzsében kerülnek elküldésre |

Például egy GET-kérés esetén a böngésző ilyen URL-t is előállíthat:

```text
https://example.com/search?name=Harry&house=gryffindor
```

POST esetén az adatok nem így, az URL lekérdezési paramétereiként kerülnek továbbításra, hanem a kérés törzsében.

**Fontos:** a POST önmagában nem titkosítja az adatokat. A biztonságos továbbításhoz HTTPS szükséges.

## Az `enctype` attribútum

```html
enctype="multipart/form-data"
```

Az `enctype` az űrlapadatok elküldéskor alkalmazott kódolási formátumát határozza meg.

Gyakori értékei:

- `application/x-www-form-urlencoded` – a hagyományos alapértelmezett űrlapadat-formátum;
- `multipart/form-data` – az adatokat külön részekben továbbítja, és fájlfeltöltéshez is használható;
- `text/plain` – egyszerű szöveges formátum, főleg tesztelési célokra.

A példában `multipart/form-data` szerepel, **annak ellenére, hogy jelenleg nincs fájlfeltöltő mező az űrlapon**. Ez a formátum ettől még használható.

## Az `action` attribútum

```html
action="https://webhook.site/YOUR_WEBHOOK_ID"
```

Az `action` azt adja meg, hogy **hová küldje a böngésző az űrlap adatait**.

A példában egy Webhook.site-cím szerepel. Ez a szolgáltatás lehetővé teszi, hogy megvizsgáljuk a beérkező HTTP-kéréseket.

A `YOUR_WEBHOOK_ID` helyére egy tényleges Webhook.site-azonosítót kell megadni.

Például az űrlap kitöltése és elküldése után megvizsgálhatjuk, milyen mezőnevekkel és értékekkel érkezett a kérés.

---

# 4. Az `input` elem és attribútumai – név megadása

## Az `input` elem

Az `<input>` különböző típusú adatbeviteli mezők létrehozására használható.

```html
<input type="text" name="name" id="name" required placeholder="pl. Harry James Potter">
```

Vizsgáljuk meg az attribútumokat!

### `type="text"`

Egysoros szövegbeviteli mezőt hoz létre.

A felhasználó ide szabadon beírhat egy nevet.

### `name="name"`

A `name` azt határozza meg, hogy **milyen néven küldjük el az adott mező értékét**.

Ha például a felhasználó a következőt írja be:

```text
Harry James Potter
```

akkor a szerver felé elküldött adatok között szerepelhet:

```text
name = Harry James Potter
```

Fontos különbség:

- `id` – az elem azonosítására szolgál a HTML-ben, CSS-ben és JavaScriptben;
- `name` – az űrlap elküldésekor az adat mezőneve lesz.

### `id="name"`

Azonosítja a mezőt, és lehetővé teszi, hogy a `label` hozzá kapcsolódjon.

### `required`

A `required` azt jelenti, hogy **a mező kitöltése kötelező**.

```html
<input type="text" required>
```

Ha a felhasználó üresen hagyja, a böngésző normál esetben nem engedi elküldeni az űrlapot, hanem jelzi, hogy a mezőt ki kell tölteni.

Mivel ez egy logikai (boolean) HTML-attribútum, elegendő magát az attribútumnevet megadni.

### `placeholder`

```html
placeholder="pl. Harry James Potter"
```

Egy rövid mintaszöveget jelenít meg az üres mezőben.

A placeholder:

- segíti a felhasználót a kitöltésben;
- nem számít előre megadott értéknek;
- a gépelés megkezdésekor általában eltűnik.

Nem helyettesíti a `label` elemet.

## Várható megjelenés

A böngészőben egy „Név” felirat és egy egysoros szövegmező jelenik meg:

```text
Név
┌───────────────────────────────┐
│ pl. Harry James Potter       │
└───────────────────────────────┘
```

A pontos elrendezést és megjelenést a CSS is befolyásolja.

---

# 5. Dátum megadása – `type="date"`
```html
<div>
    <label for="dob">Születési dátum</label>
    <input type="date" name="dob" id="dob" required>
</div>
```

Az új elem itt:

```html
<input type="date">
```

A `date` egy **dátum megadására szolgáló beviteli mezőt** hoz létre.

A böngésző általában dátumválasztó felületet biztosít, amellyel például a napot, hónapot és évet tudjuk kiválasztani.

Az attribútumok:

- `type="date"` – dátumválasztó mező;
- `name="dob"` – az elküldött adat neve;
- `id="dob"` – azonosító, amelyre a label hivatkozik;
- `required` – a dátum megadása kötelező.

## Várható megjelenés

```text
Születési dátum
┌────────────────────────┐
│ 2008. 07. 31.       ▾  │
└────────────────────────┘
```

A dátumválasztó pontos megjelenése böngészőnként és operációs rendszerenként eltérhet.

**Fontos:** a felhasználó számára megjelenített dátumformátum eltérhet az elküldött érték formátumától. Az űrlapban a dátum értéke `YYYY-MM-DD` formában kerül továbbításra.

Például:

```text
dob = 2008-07-31
```

---

# 6. Legördülő lista – `select` és `option`
A következő mezőben a felhasználónak egy roxforti házat kell kiválasztania.

```html
<div>
    <label for="house">Ház</label>
    <select name="house" id="house" required>
        <option value="">--Válassz egy lehetőséget--</option>
        <option value="gryffindor">Griffendél</option>
        <option value="hufflepuff">Hugrabug</option>
        <option value="ravenclaw">Hollóhát</option>
        <option value="slytherin">Mardekár</option>
    </select>
</div>
```

## A `select` elem

A `<select>` egy **választható lehetőségeket tartalmazó vezérlőt** hoz létre.

Ebben a példában legördülő listaként jelenik meg.

```html
<select name="house" id="house" required>
```

- `name="house"` – az elküldött adat neve;
- `id="house"` – azonosító;
- `required` – a felhasználónak érvényes lehetőséget kell választania.

## Az `option` elem

A `<select>` elemen belül az `<option>` elemek adják meg a választható lehetőségeket.

```html
<option value="gryffindor">Griffendél</option>
```

Itt két különböző dolgot látunk:

- `Griffendél` – ezt látja a felhasználó;
- `value="gryffindor"` – ezt az értéket küldi el az űrlap.

Tehát ha a felhasználó a Griffendélt választja, a továbbított adat:

```text
house = gryffindor
```

## Miért van egy üres értékű lehetőség?

```html
<option value="">--Válassz egy lehetőséget--</option>
```

Ez a lista kezdeti, tájékoztató lehetősége.

A `value=""` azt jelenti, hogy az értéke üres.

Mivel a `select` kötelező (`required`), az üres értékű kezdeti lehetőség nem számít érvényes választásnak. A felhasználónak ténylegesen ki kell választania valamelyik házat.

## Várható megjelenés

```text
Ház
┌───────────────────────────────┐
│ --Válassz egy lehetőséget-- ▾ │
└───────────────────────────────┘
```

A legördülő lista megnyitásakor megjelennek a választható házak.

---

# 7. Jelölőnégyzet – `type="checkbox"`
A következő mezőben a felhasználó megadhatja, hogy van-e kisállata.

```html
<div>
    <label for="has-pet">Kijelentem, hogy van kisállatom.</label>
    <input type="checkbox" name="has-pet" id="has-pet" value="yes">
    ...
</div>
```

Az új elemtípus:

```html
<input type="checkbox">
```

A `checkbox` egy **jelölőnégyzetet** hoz létre.

A jelölőnégyzet két állapotban lehet:

- nincs bejelölve;
- be van jelölve.

## A `value` attribútum

```html
value="yes"
```

Ez azt határozza meg, milyen értéket küldjön el az űrlap, **ha a jelölőnégyzet be van jelölve**.

Ebben az esetben:

```text
has-pet = yes
```

Ha a jelölőnégyzet nincs bejelölve, akkor az adott mező normál HTML-űrlapelküldésnél **egyáltalán nem szerepel az elküldött adatok között**.

Tehát nem automatikusan `false` értéket küld.

## Várható megjelenés

```text
Kijelentem, hogy van kisállatom.  ☐
```

Bejelölve:

```text
Kijelentem, hogy van kisállatom.  ☑
```

---

# 8. Összetartozó mezők csoportosítása – `fieldset` és `legend`
A kisállathoz további adatokat is megadhatunk:

```html
<fieldset class="conditional">
    <legend>Kisállat</legend>
    <label>Faj<input type="text" name="pet-species" placeholder="pl. bagoly"></label>
    <label>Név<input type="text" name="pet-name" placeholder="pl. Hedvig"></label>
</fieldset>
```

## A `fieldset` elem

A `<fieldset>` **logikailag összetartozó űrlapmezőket csoportosít**.

A böngészők általában egy kerettel veszik körül az ilyen mezőcsoportokat.

Például:

```text
┌── Kisállat ────────────────────┐
│                               │
│ Faj  [pl. bagoly            ] │
│ Név  [pl. Hedvig            ] │
│                               │
└───────────────────────────────┘
```

A csoportosítás a felhasználó számára is érthetőbbé teszi az űrlapot, és az akadálymentességet is segíti.

## A `legend` elem

```html
<legend>Kisállat</legend>
```

A `<legend>` a `fieldset` csoport **feliratát vagy címét** adja meg.

A böngésző ezt általában a mezőcsoport keretének felső részén jeleníti meg.

## A `class="conditional"` szerepe

```html
<fieldset class="conditional">
```

A `conditional` osztálynév arra utal, hogy a mezőcsoport megjelenítése valamilyen feltételtől függhet.

Például CSS-sel megoldható, hogy a kisállat adatai csak akkor jelenjenek meg, ha a jelölőnégyzet be van jelölve.

**Fontos:** az osztálynév önmagában ezt még nem valósítja meg. A feltételes megjelenítéshez megfelelő CSS-szabály vagy JavaScript szükséges.

Az elemek pusztán CSS-es elrejtése továbbá nem akadályozza meg automatikusan az adatok elküldését.

---

# 9. E-mail-cím megadása és ellenőrzése
A következő mező:

```html
<div>
    <label for="email">Email cím</label>
    <input type="email" name="email" id="email" pattern=".+@hogwarts\.ac\.uk"
           placeholder="pl. hjp@hogwarts.ac.uk"
           title="Egy @hogwarts.ac.uk végződésű email cím megadása kötelező.">
</div>
```

Ebben több új attribútum is szerepel.

## `type="email"`

```html
<input type="email">
```

E-mail-cím megadására szolgáló mezőt hoz létre.

Megjelenésében hasonló a hagyományos szövegmezőhöz, de a böngésző **ellenőrizni tudja, hogy a megadott szöveg megfelel-e az e-mail-cím alapvető formai követelményeinek**.

Például:

```text
harry@example.com
```

formailag megfelelő lehet, míg:

```text
harryexample.com
```

nem, mert hiányzik belőle a `@` karakter.

## A `pattern` attribútum

```html
pattern=".+@hogwarts\.ac\.uk"
```

A `pattern` egy **reguláris kifejezést** tartalmaz, amellyel további formai követelményeket adhatunk meg.

Vizsgáljuk meg részenként:

| Rész | Jelentés |
|---|---|
| `.` | Tetszőleges karakter, általában a sortörések kivételével |
| `+` | Az előző minta legalább egyszer szerepeljen |
| `@hogwarts` | Ennek a szövegnek kell következnie |
| `\.` | Egy tényleges pont karakter |
| `ac` | Az `ac` szöveg |
| `\.` | Újabb tényleges pont |
| `uk` | Az `uk` szöveg |

A `.` önmagában egy reguláris kifejezésben speciális jelentésű, ezért amikor **valódi pontot szeretnénk megadni**, `\.` formában írjuk.

Így az űrlap csak olyan, formailag is megfelelő e-mail-címeket fogad el, amelyek `@hogwarts.ac.uk` végződésűek.

Például:

```text
harry@hogwarts.ac.uk    → megfelelő
hermione@gmail.com      → nem megfelelő
harry@hogwarts.com      → nem megfelelő
```

A HTML `pattern` attribútumánál a teljes mezőértéknek meg kell felelnie a mintának.

## A `title` attribútum

```html
title="Egy @hogwarts.ac.uk végződésű email cím megadása kötelező."
```

A `title` kiegészítő információt ad az elemről.

Egyes böngészőkben például az egérmutatót az elem fölé helyezve jelenhet meg.

A mező érvényesítési hibájának jelzésénél is felhasználható, de ez böngészőfüggő.

**Fontos különbség:** bár a `title` szövege szerint az e-mail-cím megadása kötelező, a mezőben valójában **nem szerepel `required` attribútum**.

Ezért az e-mail-mező üresen is hagyható. Ha viszont a felhasználó megad egy értéket, akkor annak meg kell felelnie az előírt követelményeknek.

---

# 10. Többsoros szövegbevitel – `textarea`
Az űrlap végén egy megjegyzésmező is található:

```html
<div>
    <label for="comments">Megjegyzések</label>
    <textarea name="comments" id="comments" rows="5" maxlength="200"
              placeholder="pl. Benne szeretnék lenni a kviddics csapatban."></textarea>
</div>
```

A `<textarea>` **többsoros szövegbevitelre** szolgál.

Ez a legfontosabb különbség a hagyományos:

```html
<input type="text">
```

és a:

```html
<textarea></textarea>
```

között.

Az `input type="text"` egysoros, a `textarea` pedig több sort is tartalmazhat.

## A `rows` attribútum

```html
rows="5"
```

A megjelenő szövegmező alapértelmezett magasságát adja meg, nagyjából **öt szövegsornak megfelelően**.

Ez nem jelenti azt, hogy a felhasználó legfeljebb öt sort írhat bele.

A `rows` a mező látható méretét befolyásolja, nem az engedélyezett sorok számát.

## A `maxlength` attribútum

```html
maxlength="200"
```

A felhasználó által megadható szöveg maximális hosszát korlátozza.

Ebben az esetben a böngésző legfeljebb **200 UTF-16 kódegységnyi szöveget** enged megadni. A hétköznapi magyar szövegeknél ez általában 200 karakternek felel meg.

## A `placeholder` attribútum

```html
placeholder="pl. Benne szeretnék lenni a kviddics csapatban."
```

Itt is egy mintaszöveget jelenít meg az üres mezőben.

## Várható megjelenés

```text
Megjegyzések
┌──────────────────────────────────────────┐
│ pl. Benne szeretnék lenni a kviddics    │
│ csapatban.                               │
│                                          │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

A mezőben a felhasználó több sorba is írhat szöveget.

---

# 11. Az űrlap elküldése – `button`
Az űrlap utolsó része:

```html
<div>
    <button type="submit">Küldés</button>
</div>
```

A `<button>` egy kattintható gombot hoz létre.

## `type="submit"`

A `submit` azt jelenti, hogy a gomb **az űrlap elküldésére szolgál**.

Amikor a felhasználó rákattint:

1. A böngésző ellenőrzi az űrlapmezők beépített érvényességi feltételeit.
2. Ha valamelyik kötelező mező hiányzik vagy valamelyik érték érvénytelen, az elküldést megakadályozhatja.
3. Ha minden feltétel teljesül, a böngésző összeállítja az űrlap adatait.
4. Az adatokat a `<form>` elem `method`, `enctype` és `action` attribútumainak megfelelően elküldi.

A gomb megjelenített szövege:

```text
Küldés
```

A `button` további gyakori típusai:

| Típus | Jelentés |
|---|---|
| `submit` | Az űrlap elküldése |
| `reset` | Az űrlap mezőinek visszaállítása a kezdeti értékükre |
| `button` | Általános gomb, amelyhez például JavaScript-művelet rendelhető |

---

# 12. Mit küld el valójában az űrlap?
Tegyük fel, hogy a felhasználó a következő adatokat adja meg:

| Mező | Megadott érték |
|---|---|
| Név | Harry James Potter |
| Születési dátum | 1980-07-31 |
| Ház | Griffendél |
| Van kisállata | Igen |
| Kisállat faja | bagoly |
| Kisállat neve | Hedvig |
| E-mail | harry@hogwarts.ac.uk |
| Megjegyzés | Kviddicsezni szeretnék. |

Az elküldött adatok logikailag ilyen név–érték párokból állnak:

```text
name = Harry James Potter
dob = 1980-07-31
house = gryffindor
has-pet = yes
pet-species = bagoly
pet-name = Hedvig
email = harry@hogwarts.ac.uk
comments = Kviddicsezni szeretnék.
```

Figyeljük meg, hogy:

- az adatneveket a **`name` attribútumok** adják;
- a kiválasztott háznál az `option` **`value` értéke** kerül elküldésre;
- a bejelölt checkbox a saját `value` értékét küldi;
- a `placeholder` szövege nem kerül automatikusan elküldésre;
- az `id` és a `class` nem válik automatikusan elküldött adatmezővé.

Mivel az űrlap `multipart/form-data` formátumot használ, ezek a név–érték párok a tényleges HTTP-kérésben külön részekként szerepelnek, nem a fenti egyszerű szöveges felsorolásként.


---
