# HTML, CSS és JavaScript 



# A `tfoot` elem

A `thead` a táblázat fejlécét, a `tbody` a táblázat törzsét fogja össze. Ezek mellett létezik egy harmadik nagy táblázatrész is:

```html
<tfoot>
    ...
</tfoot>
```

A `tfoot` a táblázat **láblécét** jelöli.

Tipikus használata például:

- összesítő sor;
- végösszeg;
- megjegyzés;
- a táblázat alján megismételt fejléc.

Példa:

```html
<table>
    <thead>
        <tr>
            <th>Termék</th>
            <th>Ár</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>Könyv</td>
            <td>5000 Ft</td>
        </tr>
        <tr>
            <td>Füzet</td>
            <td>1000 Ft</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th>Összesen</th>
            <td>6000 Ft</td>
        </tr>
    </tfoot>
</table>
```


---

# Numerikus HTML karakterreferenciák

Korábban láttunk névvel megadott karakterreferenciákat:

```html
&amp;
&lt;
&gt;
```

Nem minden karakternek van könnyen megjegyezhető neve. Ilyenkor a karakter Unicode-kódja alapján is megadhatjuk.

Két gyakori forma van.

## Decimális forma

```html
&#9733;
```

Megjelenítve:

```text
★
```

## Hexadecimális forma

```html
&#x2605;
```

Megjelenítve ugyanúgy:

```text
★
```



A `#x` tehát azt jelzi, hogy a szám hexadecimális formában van megadva.

Ez akkor hasznos, ha például olyan szimbólumot szeretnénk megjeleníteni, amelyet nem akarunk közvetlenül beírni a HTML-kódba.

---

# Strukturális pszeudoosztályok

A CSS nemcsak attribútumok vagy osztályok alapján tud elemeket kiválasztani, hanem az alapján is, hogy az adott elem **hányadik helyen áll a testvérei között**.

## `:nth-child()`

A `:nth-child()` az elem összes elemtestvér között elfoglalt helyét vizsgálja.

Például:

```css
li:nth-child(2) {
    font-weight: bold;
}
```

Ez azt a `li` elemet választja ki, amely a szülő **második elemgyereke**.

Használhatunk kulcsszavakat is:

```css
li:nth-child(odd) {
    ...
}
```

→ páratlan sorszámú gyerekek

```css
li:nth-child(even) {
    ...
}
```

→ páros sorszámú gyerekek

Számolási képlet is megadható:

```css
li:nth-child(2n) {
    ...
}
```

Ez szintén minden második elemet választja ki.

```css
li:nth-child(2n + 1) {
    ...
}
```

Ez a páratlan helyen álló elemeket választja ki.

---

# `:nth-child()` és `:nth-of-type()` különbsége

Ez a két szelektor hasonló, de nem ugyanazt számolja.

Tegyük fel, hogy a HTML:

```html
<section>
    <h2>Cím</h2>
    <p>Első bekezdés</p>
    <p>Második bekezdés</p>
    <p>Harmadik bekezdés</p>
</section>
```

A gyerekek sorrendje:

```text
1. h2
2. p
3. p
4. p
```

Ez:

```css
p:nth-child(2)
```

kiválasztja az első `p` elemet, mert az a szülő **második gyereke**.

Viszont:

```css
p:nth-of-type(2)
```

a második `p` elemet választja ki, mert csak a `p` típusú testvéreket számolja.



Ez különösen fontos olyan szerkezetnél, ahol például egy sorban `th` és `td` elemek is vannak.

---

# `:first-child` és `:last-child`

A `:first-child` azt vizsgálja, hogy az elem a szülő **első gyereke-e**.

```css
p:first-child {
    ...
}
```

Ez csak akkor illeszkedik egy `p` elemre, ha az valóban a szülő legelső elemgyereke.

A `:last-child` ugyanezt a szülő utolsó gyermekére vizsgálja:

```css
p:last-child {
    ...
}
```

---

# `:first-of-type` és `:last-of-type`

A `:first-of-type` nem az összes gyerek közül keresi az elsőt, hanem az adott **elemtípusból az elsőt**.

Példa:

```html
<div>
    <h2>Cím</h2>
    <p>Első bekezdés</p>
    <p>Második bekezdés</p>
</div>
```

Ez:

```css
p:first-child
```

nem választ ki semmit, mert az első gyerek egy `h2`.

Ez viszont:

```css
p:first-of-type
```

kiválasztja az első bekezdést, mert az az első `p` típusú elem.

Ugyanez hátulról:

```css
p:last-of-type
```

az utolsó `p` elemet választja ki.

Röviden:

```text
:first-child    → a szülő legelső gyereke
:last-child     → a szülő legutolsó gyereke

:first-of-type  → az adott elemtípus első példánya
:last-of-type   → az adott elemtípus utolsó példánya
```

---

# A `!important`

Normál esetben, ha több CSS-szabály ugyanazt a tulajdonságot állítja be, a CSS kaszkádja dönti el, melyik érték érvényesül.

A `!important` egy deklaráció prioritását erősen megnöveli.

Például:

```css
p {
    color: blue;
}

p:hover {
    color: red !important;
}
```

Hover állapotban a piros szín `!important` jelölést kap.

A szintaxis:

```css
tulajdonság: érték !important;
```

Például:

```css
background-color: salmon !important;
```

A `!important` hasznos lehet, ha egy értéknek mindenképpen felül kell írnia más szabályokat, de **nem érdemes túl gyakran használni**, mert megnehezítheti a CSS későbbi felülírását és karbantartását.

Általában először érdemes a szelektorokat és a specificitást megfelelően kialakítani.

---

# Másik CSS-fájl betöltése: `@import`

Egy CSS-fájl egy másik CSS-fájlt is be tud tölteni.

Szintaxis:

```css
@import "alap.css";
```

Ez azt jelenti, hogy az aktuális stíluslap az `alap.css` szabályait is használja.

Például lehet egy közös alapstílus:

```css
/* base.css */
body {
    font-family: Arial, sans-serif;
}
```

majd egy másik fájl:

```css
@import "base.css";

h1 {
    color: darkred;
}
```

Így a második CSS-fájl az első szabályait is megkapja, majd további szabályokat ad hozzá.

Az `@import` szabályt a stíluslap elején kell elhelyezni, még a normál CSS-szabályok előtt.

---

# Unicode karakter CSS-ben

Unicode karaktert nemcsak HTML-ben, hanem CSS-ben is megadhatunk.

Például pszeudoelemmel:

```css
.star::before {
    content: "\2605";
}
```

Ez a következő karaktert jeleníti meg:

```text
★
```

A `content` tulajdonságban a Unicode-kód előtt fordított perjelet használunk:

```text
"\2605"
```

Figyeljük meg a különbséget.

HTML-ben:

```html
&#x2605;
```

CSS-ben:

```css
content: "\2605";
```

Mindkettő ugyanahhoz a Unicode karakterhez vezethet, csak a két nyelv szintaxisa különbözik.

Ez jól használható olyan esetekben, amikor maga a HTML csak egy osztályt tartalmaz, a tényleges szimbólumot pedig a CSS generálja.

Például:

```html
<span class="star"></span>
```

```css
.star::before {
    content: "\2605";
}
```

---

# Emmet – gyors HTML-generálás

Az Emmet segítségével rövid kifejezésekből teljes HTML-szerkezeteket lehet generálni.

VS Code-ban általában:

```text
Emmet-kifejezés + Tab
```

hatására készül el a HTML.

---

# Alap HTML-dokumentum Emmettel

Írjuk be:

```text
!
```

majd nyomjunk `Tab`-ot.

Ebből egy alap HTML5-dokumentum jön létre.

---

# Gyakori `meta` rövidítések

UTF-8 karakterkódolás:

```text
meta:utf
```

→

```html
<meta charset="UTF-8">
```

Viewport:

```text
meta:vp
```

→

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

# Elem létrehozása

Ha csak az elem nevét írjuk:

```text
div
```

→

```html
<div></div>
```

```text
table
```

→

```html
<table></table>
```

---

# Osztály megadása Emmetben

A pont ugyanúgy jelöli az osztályt, mint CSS-ben:

```text
div.card
```

→

```html
<div class="card"></div>
```

Ha az elem egyértelmű, bizonyos esetekben az elemnév el is hagyható:

```text
.card
```

→

```html
<div class="card"></div>
```

---

# Gyermek létrehozása: `>`

A `>` azt jelenti, hogy a következő elem az előző elem **gyereke** legyen.

```text
ul>li
```

→

```html
<ul>
    <li></li>
</ul>
```

Több szint is egymásba ágyazható:

```text
table>tbody>tr>td
```

→

```html
<table>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>
```

---

# Testvérelem létrehozása: `+`

A `+` egymás melletti, azonos szinten lévő elemeket hoz létre.

```text
h1+p
```

→

```html
<h1></h1>
<p></p>
```

Például:

```text
th+td+td
```

három egymás melletti cellát hoz létre.

---

# Többszörözés: `*`

A `*` segítségével egy elemet többször is létrehozhatunk.

```text
li*3
```

→

```html
<li></li>
<li></li>
<li></li>
```

Ez táblázatoknál különösen hasznos:

```text
tr*5
```

öt sort generál.

---

# Szövegtartalom: `{}`

Kapcsos zárójelek között megadhatjuk az elem szövegét.

```text
p{Helló}
```

→

```html
<p>Helló</p>
```

---

# Automatikus számozás: `$`

A `$` a többszörözés aktuális sorszámát helyettesíti.

```text
li{Elem $}*3
```

→

```html
<li>Elem 1</li>
<li>Elem 2</li>
<li>Elem 3</li>
```

Ez osztálynevekben is használható:

```text
div.item$*3
```

→

```html
<div class="item1"></div>
<div class="item2"></div>
<div class="item3"></div>
```

---

# Visszafelé számozás: `$@-`

Az Emmet alapértelmezetten növekvő sorrendben számoz.

```text
$ → 1, 2, 3, 4, ...
```

A `$@-` fordított számozást jelent:

```text
$@- → ..., 4, 3, 2, 1
```

Például:

```text
ul>li{$@-}*4
```

→

```html
<ul>
    <li>4</li>
    <li>3</li>
    <li>2</li>
    <li>1</li>
</ul>
```

Ez olyan esetekben hasznos, amikor csökkenő sorszámokat akarunk generálni.

---

# Visszalépés a szerkezetben: `^`

A `^` egy szinttel feljebb lép az aktuális HTML-szerkezetben.

Például:

```text
div>p^footer
```

→

```html
<div>
    <p></p>
</div>
<footer></footer>
```

Ha több szinttel szeretnénk feljebb lépni, több `^` jelet használhatunk:

```text
^^
```

→ két szinttel feljebb.

---

# Csoportosítás: `()`

Zárójelekkel nagyobb Emmet-részeket foghatunk össze.

Például:

```text
div>(header>h1)+(main>p)+footer
```

→

```html
<div>
    <header>
        <h1></h1>
    </header>
    <main>
        <p></p>
    </main>
    <footer></footer>
</div>
```

A zárójel különösen hosszabb szerkezeteknél teszi átláthatóbbá az Emmet-kifejezést.

---

# Összetettebb Emmet-kifejezés olvasása

Egy hosszabb Emmet-kifejezést mindig érdemes **balról jobbra, részenként** olvasni.

Például:

```text
table.board>(thead>tr>th*3)+(tbody>tr*2>td*3)
```

Lépések:

```text
table.board
```

→ `board` osztályú táblázat

```text
thead>tr>th*3
```

→ fejléc, benne egy sor, benne három fejléc-cella

```text
tbody>tr*2>td*3
```

→ törzs, benne két sor, soronként három adatcella

A `+` miatt a `thead` és a `tbody` egymás testvérei lesznek.

---

# JavaScript hozzákapcsolása HTML-hez

A JavaScriptet külső fájlból a `script` elemmel lehet hozzákapcsolni a HTML-hez.

Például:

```html
<script src="app.js" defer></script>
```

A `src` megadja a JavaScript-fájl helyét.

A `defer` azt jelzi, hogy a böngésző betöltheti a JavaScriptet a HTML feldolgozása közben, de a program csak akkor fusson le, amikor a HTML-dokumentum feldolgozása már elkészült.

---

# A DOM röviden

A böngésző a HTML-dokumentumból egy objektumfát készít. Ezt nevezzük **DOM-nak**:

```text
Document Object Model
```

A JavaScript ezen keresztül tudja:

- megkeresni a HTML-elemeket;
- módosítani a szövegüket;
- eseményekre reagálni;
- attribútumokat és osztályokat kezelni.

A globális:

```js
document
```

objektum a betöltött HTML-dokumentumot reprezentálja.

---

# Elem kiválasztása CSS-szelektorral

## `querySelectorAll()`

```js
document.querySelectorAll('p')
```

megkeresi az összes `p` elemet.

A zárójelben **CSS-szelektort** adunk meg, ezért összetettebb kiválasztás is használható:

```js
document.querySelectorAll('table td')
```

A visszaadott gyűjteményen végig lehet menni:

```js
document.querySelectorAll('p').forEach((element) => {
    // az aktuális elem
});
```

---

# Elem kiválasztása `id` alapján

Ha a HTML-ben:

```html
<p id="message"></p>
```

akkor JavaScriptben:

```js
document.getElementById('message')
```

közvetlenül megkeresi ezt az elemet.

---

# Eseménykezelés

Az `addEventListener()` segítségével megadhatjuk, hogy mi történjen egy esemény bekövetkezésekor.

Szintaxis:

```js
element.addEventListener('esemény', () => {
    // végrehajtandó utasítások
});
```

Például kattintás:

```js
button.addEventListener('click', () => {
    console.log('Kattintás történt');
});
```

---

# `mouseenter` és `mouseleave`

A `mouseenter` akkor következik be, amikor az egérmutató belép egy elem területére.

```js
element.addEventListener('mouseenter', () => {
    ...
});
```

A `mouseleave` akkor következik be, amikor az egérmutató elhagyja az elemet.

```js
element.addEventListener('mouseleave', () => {
    ...
});
```

Ezekkel JavaScriptből is lehet a hoverhez hasonló interakciókat kezelni.

---

# Az eseményobjektum

Az eseménykezelő megkaphatja az esemény adatait:

```js
element.addEventListener('click', (event) => {
    ...
});
```

Az `event` az eseményhez kapcsolódó információkat tartalmazza.

Például:

```js
event.currentTarget
```

azt az elemet jelenti, amelyhez az eseménykezelőt hozzáadtuk.

---

# `const`

A `const` segítségével változót hozhatunk létre:

```js
const name = 'Anna';
```

A `const`-tal létrehozott változóhoz később nem rendelhetünk új értéket:

```js
const x = 5;
```

Az ilyen változókat érdemes használni, ha a hivatkozást később nem akarjuk más értékre cserélni.

---

# Nyílfüggvény

A JavaScriptben a következő:

```js
(element) => {
    ...
}
```

egy **nyílfüggvény**.

Egyszerű példa:

```js
const double = (x) => {
    return x * 2;
};
```

Használat:

```js
double(4)
```

eredménye:

```text
8
```

Eseménykezelőknél és `forEach()` esetén nagyon gyakori.

---

# `forEach()`

A `forEach()` egy gyűjtemény minden elemére végrehajt egy műveletet.

Példa:

```js
const names = ['Anna', 'Béla', 'Csaba'];

names.forEach((name) => {
    console.log(name);
});
```

A függvény egyszer lefut minden névre.

---

# Szülő és gyerek elemek elérése

Egy DOM-elemnél:

```js
element.parentNode
```

a szülő csomópontot adja vissza.

```js
element.parentNode.children
```

a szülő elemgyerekeit adja vissza.

Ez akkor hasznos, ha azt akarjuk megállapítani, hogy egy elem hol helyezkedik el a testvérei között.

---

# `Array.from()`

Egyes DOM-gyűjtemények nem valódi JavaScript-tömbök.

Az:

```js
Array.from(...)
```

egy ilyen gyűjteményt valódi tömbbé alakíthat.

Példa:

```js
const elements = Array.from(parent.children);
```

Ezután használhatók rajta a tömbök műveletei.

---

# `indexOf()`

Az `indexOf()` megadja, hogy egy elem hányadik helyen található egy tömbben.

```js
const values = ['a', 'b', 'c'];

values.indexOf('b');
```

eredmény:

```text
1
```

A JavaScriptben az indexelés **0-tól indul**:

```text
'a' → 0
'b' → 1
'c' → 2
```

---

# Karakter kiválasztása: `charAt()`

A `charAt()` egy szöveg adott pozícióján lévő karakterét adja vissza.

```js
'abcdef'.charAt(2)
```

eredménye:

```text
c
```

Itt is 0-tól indul a számozás:

```text
a → 0
b → 1
c → 2
```

---

# Template literal

A backtick karakterrel:

```text
`
```

olyan szöveget hozhatunk létre, amelybe változókat is beilleszthetünk.

Példa:

```js
const name = 'Anna';

const text = `Helló, ${name}!`;
```

A `${...}` belsejében JavaScript-kifejezés állhat.

Az eredmény:

```text
Helló, Anna!
```

---

# Egy elem szövegének módosítása: `textContent`

Egy HTML-elem szövege JavaScriptből módosítható:

```js
element.textContent = 'Új szöveg';
```

Például:

```js
document.getElementById('message').textContent = 'Sikeres művelet';
```

A böngészőben az elem tartalma erre a szövegre változik.

---

# Kiírás a konzolra

A:

```js
console.log(...)
```

a böngésző fejlesztői konzoljára ír.

Például:

```js
console.log('Teszt');
```

Ez főleg hibakereséshez és a program működésének ellenőrzéséhez hasznos.

---

# Fontos megjegyzés a JavaScript-példához

A JavaScript-fájl önmagában még nem fut le attól, hogy ugyanabban a mappában van a HTML-lel.

A HTML-ben hozzá kell kapcsolni:

```html
<script src="app.js" defer></script>
```

Ha a JavaScript például ezt keresi:

```js
document.getElementById('message')
```

akkor a HTML-ben léteznie kell a megfelelő elemnek is:

```html
<p id="message"></p>
```

---

# Rövid összefoglaló

```text
HTML
tfoot               táblázat lábléce
&#...;               decimális karakterreferencia
&#x...;              hexadecimális karakterreferencia

CSS
:nth-child()         pozíció az összes elemtestvér között
:nth-of-type()       pozíció az azonos típusú testvérek között
:first-child         első gyerek
:last-child          utolsó gyerek
:first-of-type       első az adott elemtípusból
:last-of-type        utolsó az adott elemtípusból
!important           deklaráció prioritásának erős növelése
@import              másik CSS-fájl betöltése
"\...."              Unicode karakter CSS-ben

EMMET
!                    alap HTML-dokumentum
meta:utf             UTF-8 meta elem
meta:vp              viewport meta elem
>                    gyermek
+                    testvér
*                    többszörözés
{}                   szövegtartalom
$                    növekvő számozás
$@-                  visszafelé számozás
^                    egy szinttel feljebb
()                   csoportosítás
.                    osztály

JAVASCRIPT
document             a HTML-dokumentum DOM-reprezentációja
querySelectorAll()   több elem kiválasztása CSS-szelektorral
getElementById()     elem kiválasztása id alapján
addEventListener()   eseménykezelő hozzáadása
mouseenter           egér belép az elemre
mouseleave           egér elhagyja az elemet
currentTarget        az eseménykezelőhöz tartozó elem
forEach()            művelet minden elemen
Array.from()         gyűjtemény tömbbé alakítása
indexOf()            elem indexének meghatározása
charAt()             karakter kiválasztása pozíció alapján
textContent          elem szövegének lekérése/módosítása
console.log()        kiírás a fejlesztői konzolra
```
