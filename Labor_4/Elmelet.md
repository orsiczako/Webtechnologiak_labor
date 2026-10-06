# Markdown 

A **Markdown** egy egyszerű, szöveges jelölőnyelv. Segítségével úgy lehet formázott dokumentumokat készíteni, hogy a forráskód közben továbbra is könnyen olvasható marad.

A Markdown-fájlok kiterjesztése általában:

```text
.md
```

Például:

```markdown
# Cím

Ez egy **fontos** mondat.

- első elem
- második elem
```

A Markdown-megjelenítő ebből címsort, félkövér szöveget és felsorolást készít.

---

# Hol találkozhatunk Markdownnal?

A Markdown nem csak dokumentációkban jelenik meg. Sok hétköznapi és fejlesztői felületen Markdown vagy Markdown-szerű jelölés használható.

- **GitHub / GitLab:** `README.md` fájlok, dokumentációk, issue-k és hozzászólások.
- **Jupyter Notebook:** a kódcellák közé formázott Markdown-cellák tehetők.
- **Mesterséges intelligenciával folytatott beszélgetések:** a válaszokban gyakran címsorok, listák, kiemelések és kódblokkok jelennek meg Markdown-szerű formázással.
- **Discord:** üzenetekben használhatók például kiemelések, kódblokkok és idézetek.
- **Reddit:** bejegyzések és hozzászólások szerkesztésénél Markdown-formázás is használható.
- **Messenger:** egyes felületeken Markdown-szerű szövegformázás is megjelenhet; a támogatás kliens- és verziófüggő lehet.
- **Notion:** több Markdown-jelölés gépelés közben formázássá alakulhat, illetve Markdown-tartalom importálható és exportálható.
- **Technikai dokumentációk, jegyzetek és blogok:** egyszerű szövegből jól strukturált tartalom készíthető.

## Példa: Markdown egy notebookban

A notebookokban a Markdown különösen hasznos, mert a kódcellákat jól formázott magyarázó részekkel lehet elválasztani.

```text
[Markdown-cella]

# Lineáris regresszió

Ebben a részben betanítjuk a modellt.

**Cél:** a célváltozó becslése.

[Kódcella]

model.fit(X_train, y_train)

[Markdown-cella]

## Eredmény

Az átlagos négyzetes hiba:

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$
```

Így a notebook nem csak futtatható kód, hanem egy jól strukturált, magyarázatokat és képleteket is tartalmazó dokumentum.

## Példa: üzenetek és közösségi felületek

A Markdown vagy Markdown-szerű jelölés segítségével egy egyszerű szöveg:

```markdown
**Fontos**

`npm install`

> Ezt futtasd először.
```

egy támogató felületen félkövér kiemeléssel, kódként és idézetként jelenhet meg.

Nem minden alkalmazás ugyanazokat a Markdown-elemeket támogatja, ezért a pontos működés mindig az adott felülettől függ.

---

# Blokkszintű elemek

## Címsorok

A címsorokat leggyakrabban `#` karakterekkel adjuk meg:

```markdown
# Első szintű címsor

## Második szintű címsor

### Harmadik szintű címsor

#### Negyedik szintű címsor
```

Minél több `#` karakter szerepel a sor elején, annál alacsonyabb szintű a címsor.

Az első két címsorszint másik szintaxissal is megadható:

```markdown
Első szintű címsor
==================

Második szintű címsor
---------------------
```

---

## Bekezdések

Egy bekezdéshez nem szükséges külön jelölés:

```markdown
Ez az első bekezdés. Több sorból is állhat,
a megjelenítő ettől még egyetlen bekezdésként
kezelheti.

Ez már egy új bekezdés.
```

Az új bekezdést egy üres sor választja el az előzőtől.

---

## Felsorolások

### Felsorolásjeles lista

```markdown
- alma
- körte
- szilva
```

A lista egymásba is ágyazható:

```markdown
- Programozási nyelvek
  - Python
  - JavaScript
    - Node.js
    - böngésző
- Jelölőnyelvek
  - HTML
  - Markdown
```

Felsorolásjeles listához többek között `-`, `*` vagy `+` is használható.

### Számozott lista

```markdown
1. Első lépés
2. Második lépés
3. Harmadik lépés
```

Gyakori megoldás az is, hogy minden elem elé `1.` kerül:

```markdown
1. Első lépés
1. Második lépés
1. Harmadik lépés
```

A megjelenítő ekkor automatikusan számozhatja a listaelemeket.

Beágyazott számozott lista:

```markdown
1. Első pont
   1. Első alpont
   1. Második alpont
1. Második pont
```

---

## Fenced code block


Három backtick karakterrel kódblokk hozható létre:

````markdown
```
print("Hello, World!")
```
````

A kódblokk tartalma formázás nélkül jelenik meg.

### Nyelv megadása

A nyitó backtickek után a nyelv neve is megadható:

````markdown
```python
def hello():
    print("Hello, World!")
```
````

HTML esetén:

````markdown
```html
<!DOCTYPE html>
<html lang="hu">
    <head>
        <title>Hello, World!</title>
    </head>
    <body>
        <p>Hello, World!</p>
    </body>
</html>
```
````

A nyelvazonosító lehetővé teszi, hogy a megjelenítő **szintaxiskiemelést** alkalmazzon.

---

## Táblázatok

Sok Markdown-megjelenítő támogat táblázatokat:

```markdown
| Balra      | Középre     | Jobbra      |
|:-----------|:------------:|------------:|
| alma       | körte        | szilva      |
| Python     | JavaScript   | Java        |
```

Az igazítást a kettőspont helye jelöli:

```text
:---    balra
:---:   középre
---:    jobbra
```

A táblázat nem minden Markdown-változat alapfunkciója.

---

## Idézetblokkok

Idézethez a `>` karakter használható:

```markdown
> Ez egy idézet.
>
> Több sort is tartalmazhat.
```

Egymásba ágyazott idézet:

```markdown
> Külső idézet
>
> > Belső idézet
```

---

## Tematikus elválasztó

Vízszintes elválasztó például:

```markdown
***

---

___
```

---

# Soron belüli elemek

## Soron belüli kód

Backtickek között rövid kódrészlet helyezhető el:

```markdown
A `printf()` függvény szöveget írhat ki.
```

Ez jól használható például:

- függvénynevekhez;
- változónevekhez;
- fájlnevekhez;
- parancsokhoz;
- rövid kódrészletekhez.

---

## Kiemelés

### Dőlt szöveg

```markdown
*Ez dőlt.*

_Ez is dőlt._
```

### Félkövér szöveg

```markdown
**Ez félkövér.**

__Ez is félkövér.__
```

### Dőlt és félkövér egyszerre

```markdown
***Ez dőlt és félkövér.***
```

---

# Hivatkozások

## Inline hivatkozás

```markdown
[CommonMark Spec](https://spec.commonmark.org/current/)
```

Opcionális cím is megadható:

```markdown
[CommonMark Spec](https://spec.commonmark.org/current/ "CommonMark Spec")
```

## Reference-style hivatkozás

```markdown
A részletek a [CommonMark Spec][commonmark-spec] oldalon találhatók.

[commonmark-spec]: https://spec.commonmark.org/current/ "CommonMark Spec"
```

## Automatikus hivatkozás

```markdown
<https://spec.commonmark.org/current/>
```

Email-cím is megadható:

```markdown
<example@example.com>
```

---

# Képek

A kép szintaxisa hasonló a hivatkozáséhoz, de `!` karakterrel kezdődik.

```markdown
![Macska](cat.jpg)

## Inline kép

```markdown
![Macska](https://placecats.com/240/240 "Macska")
```

A szögletes zárójelben lévő rész az **alternatív szöveg**.

## Reference-style kép

```markdown
![Macska][cat-image]

[cat-image]: https://placecats.com/240/240 "Macska"
```

---

# Hard line break

Markdownban egy egyszerű sortörés nem feltétlenül jelenik meg sortörésként a renderelt dokumentumban.

A példában használt szintaxis:

```markdown
első sor\
második sor\
harmadik sor
```

A `\` explicit sortörést eredményezhet.

---

# Speciális karakterek

## Escape

A `\` karakterrel a Markdownban különleges jelentésű karakterek jelentése kikapcsolható.

```markdown
\*Ez nem lesz dőlt.\*

\# Ez nem lesz címsor.
```

További példák:

```text
\< \> \[ \] \( \) \\ \$
```

---

## HTML karakterreferenciák

HTML karakterreferenciák Markdownban is használhatók:

```markdown
&euro;
&copy;
&#x263A;
&#x2026;
```

Eredményük:

```text
€ © ☺ …
```

---

# HTML-elemek Markdownban

Sok Markdown-megjelenítő közvetlen HTML használatát is engedi:

```html
<p>
    Press <kbd>Ctrl</kbd> + <kbd>W</kbd> to close the tab.
</p>
```

Ez akkor lehet hasznos, ha valamit a Markdown saját szintaxisával nem lehet vagy nem kényelmes megadni.

A HTML támogatása megjelenítőnként eltérhet.

---

# Matematikai képletek

Egyes Markdown-környezetek támogatják a LaTeX-szerű matematikai jelölést.

## Inline math

```markdown
$\int_{0}^{\pi} \sin x \, dx = 2$
```

## Display math

```markdown
$$
\int_{0}^{\pi} \sin x \, dx = 2
$$
```

Ez különösen hasznos notebookokban, tudományos jegyzetekben és műszaki dokumentációkban.

A matematikai képletek támogatása nem része minden Markdown-megjelenítő alapfunkcióinak.

---

# Nem minden Markdown-megjelenítő egyforma

A Markdownnak több változata és kiterjesztése létezik.

A **CommonMark** egy pontosan definiált Markdown-specifikáció, míg egyes rendszerek további lehetőségeket is biztosítanak.

Ezért előfordulhat, hogy ugyanaz a `.md` fájl két különböző alkalmazásban kissé eltérően jelenik meg.

Különösen környezetfüggő lehet:

- a táblázatok támogatása;
- a matematikai képletek;
- a HTML-elemek;
- a szintaxiskiemelés;
- a sortörések;
- egyes extra formázási lehetőségek.

---

# Rövid összefoglaló

| Cél | Markdown |
|---|---|
| Címsor | `## Cím` |
| Félkövér | `**szöveg**` |
| Dőlt | `*szöveg*` |
| Inline kód | `` `kód` `` |
| Felsorolás | `- elem` |
| Számozott lista | `1. elem` |
| Hivatkozás | `[szöveg](URL)` |
| Kép | `![alt](URL)` |
| Idézet | `> szöveg` |
| Kódblokk | három backtick |
| Elválasztó | `---` |
| Escape | `\*` |
| Inline képlet | `$x^2$` |
| Blokk képlet | `$$x^2$$` |
