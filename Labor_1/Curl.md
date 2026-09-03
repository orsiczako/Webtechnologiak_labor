## Telepítés

Elsőként érdemes ellenőrizni, hogy a `curl` már megtalálható-e a számítógépen:

```bash
curl --version
```

Ha a parancs kiírja a telepített `curl` verzióját, akkor a program már rendelkezésre áll.

> A `curl --version` nemcsak a telepített verzió számát mutatja meg, hanem azt is, hogy az adott build milyen hálózati protokollokat és további funkciókat támogat.

### Linux (Ubuntu)

Ubuntu alatt a `curl` az `apt` csomagkezelővel telepíthető:

```bash
sudo apt install curl
```

### macOS

A macOS alapból tartalmazza a `curl` programot, ezért általában nincs szükség külön telepítésre.

### Windows

A Windows 10 és Windows 11 alapból tartalmazza a `curl` programot, ezért általában itt sincs szükség külön telepítésre.

A telepített verzió ellenőrizhető:

```powershell
curl.exe --version
```

> **Megjegyzés PowerShell használata esetén:**
> Windows PowerShell 5.1-ben a `curl` név az `Invoke-WebRequest` parancs egyik aliasa. Emiatt a valódi curl programot `curl.exe` néven kell meghívni:
>
> ```powershell
> curl.exe https://example.com
> ```
>
> PowerShell 7 vagy újabb verzióban ez az alias már nincs jelen.

#### Hivatalos Windows-verzió használata

Szükség esetén a curl hivatalos Windows-kiadása külön is letölthető a [curl Windows oldaláról](https://curl.se/windows/).

Ez például akkor lehet érdekes, ha a Windows beépített curl-változatából hiányzó funkcióra van szükségünk. Ilyen lehet a beépített teljes kézikönyv is: egyes Windows-buildek esetén a

```powershell
curl.exe --manual
```

parancs helyett a következő üzenet jelenhet meg:

```text
Warning: built-in manual was disabled at build-time
```

A hivatalos ZIP-fájlt csomagoljuk ki például ide:

```text
C:\curl
```

Ezután a benne található `curl.exe` közvetlenül futtatható:

```powershell
C:\curl\bin\curl.exe --version
```

Ha azt szeretnénk, hogy ez a verzió teljes elérési út megadása nélkül is használható legyen, a következő mappát hozzá kell adni a Windows `Path` környezeti változójához:

```text
C:\curl\bin
```

A módosítás után új terminálablakot kell nyitni.

# Segítség

## Segítség megjelenítése

A `curl` beépített súgóval rendelkezik. A legfontosabb parancsok és kapcsolók megjelenítéséhez használjuk:

```bash
curl --help
```

A kimenet elején ezt látjuk:

```text
Usage: curl [options...] <url>
```

Ez a `curl` parancs általános felépítését mutatja:

```text
curl [kapcsolók] URL
```

A **kapcsoló** vagy **opció** a parancs működését módosítja. Segítségével megadhatjuk például, hogy a `curl`:

* részletesebb információkat jelenítsen meg;
* a kapott tartalmat fájlba mentse;
* csak bizonyos információkat kérjen le;
* vagy további adatokat küldjön a szervernek.

A kapcsolók általában `-` vagy `--` jellel kezdődnek.

Például:

```bash
curl -o oldal.html https://example.com
```

Ebben a parancsban:

* `curl` – az elindított program;
* `-o oldal.html` – egy kapcsoló és a hozzá tartozó érték, amely azt mondja meg, hogy a kapott tartalmat az `oldal.html` nevű fájlba kell menteni;
* `https://example.com` – annak az erőforrásnak az URL-je, amelyet el szeretnénk érni.

A kapcsolók egy részének rövid és hosszú alakja is van. Például:

```text
-o
```

és

```text
--output
```

ugyanazt a lehetőséget jelöli.

Így az előző parancs hosszabb formában:

```bash
curl --output oldal.html https://example.com
```

A `curl --help` ezután felsorolja a gyakrabban használt kapcsolókat, és röviden leírja, hogy melyik mire szolgál.

| Kapcsoló               | Mire használható?                                                |
| ---------------------- | ---------------------------------------------------------------- |
| `-d`, `--data`         | Adatok küldésére HTTP-kérésben                                   |
| `-f`, `--fail`         | HTTP-hiba esetén a hibás válasz tartalmának elrejtésére          |
| `-I`, `--head`         | Csak a válaszhoz tartozó fejlécinformációk lekérésére            |
| `-H`, `--header`       | Saját HTTP-fejléc hozzáadására a kéréshez                        |
| `-h`, `--help`         | A beépített súgó megjelenítésére                                 |
| `-o`, `--output`       | A kapott tartalom általunk megadott fájlba mentésére             |
| `-O`, `--remote-name`  | A kapott tartalom mentésére a távoli fájl nevének használatával  |
| `-i`, `--show-headers` | A válasz fejléceinek megjelenítésére a tartalom mellett          |
| `-s`, `--silent`       | A `curl` saját tájékoztató üzeneteinek csökkentésére             |
| `-T`, `--upload-file`  | Fájl feltöltésére                                                |
| `-u`, `--user`         | Felhasználónév és jelszó megadására                              |
| `-A`, `--user-agent`   | A kérésben küldött User-Agent értékének megadására               |
| `-v`, `--verbose`      | A kommunikáció részleteinek megjelenítésére                      |
| `-V`, `--version`      | A telepített `curl` verziójának és képességeinek megjelenítésére |

### Kézikönyv megjelenítése:

```curl
curl --manual
curl -M
man curl
```
Dokumentáció: https://curl.se/docs/

A `curl` egyes változatai a teljes kézikönyvet is tartalmazzák, amely a következő paranccsal jeleníthető meg:

```bash
curl --manual
```

Nem minden `curl`-változat tartalmazza azonban a beépített kézikönyvet. Ilyenkor például a következő üzenet jelenhet meg:

```text
Warning: built-in manual was disabled at build-time
```
## Alapvető használat

A példákhoz az [ip-api.com](http://ip-api.com/) szolgáltatást használjuk. Az `ip-api.com/json` cím lekérdezésekor a szolgáltatás a kéréshez tartozó nyilvános IP-címről ad vissza információkat.

> **Ha az `ip-api.com` az adott hálózatról nem érhető el**, a példák a [httpbingo.org](https://httpbingo.org/) HTTP-tesztelő szolgáltatással is elvégezhetők. 

### Egyszerű lekérés

```bash
curl ip-api.com/json
```

A `curl` kapcsolatba lép az `ip-api.com` szerverrel, elküldi a kérést, majd a kapott választ kiírja a terminálra.

Bár az URL-ből itt hiányzik a séma (`http://`), a `curl` képes ezt kikövetkeztetni. Ha nem adunk meg sémát, és a host neve alapján sem következik más protokoll, a `curl` alapértelmezés szerint HTTP-t használ.

Ezért ebben az esetben a következő két parancs gyakorlatilag ugyanazt a címet éri el:

```bash
curl ip-api.com/json
```

```bash
curl http://ip-api.com/json
```

A második forma azért egyértelműbb, mert az URL-ben közvetlenül megadjuk, hogy HTTP-t szeretnénk használni.

> A szolgáltatás ingyenes API-ja HTTP-n keresztül érhető el, ezért szerepel a példákban `http://`.

Ha az `ip-api.com` nem érhető el, használható:

```bash
curl https://httpbingo.org/anything
```

A `httpbingo.org/anything` egy tesztelésre szolgáló cím, amely fogadja a HTTP-kérést, majd információt ad vissza a beérkezett kérésről.
A `httpbingo.org/anything` végpont visszaadja, hogy **milyen HTTP-kérést kapott a szerver**.

A fontosabb részek:

* `method` – a használt HTTP-metódus. Itt:

```text
GET
```

* `url` – az elért URL:

```text
https://httpbingo.org/anything
```

* `headers` – a kérésben elküldött HTTP-fejlécek. Például:

```text
User-Agent: curl/8.22.0
Accept: */*
```

* `origin` – annak a kliensnek a nyilvános IP-címe, ahonnan a kérés érkezett.
* `args` – az URL-ben megadott lekérdezési paraméterek. Jelenleg üres:

```json
{}
```

* `data` – a kérés törzsében elküldött adat. Ennél az egyszerű GET-kérésnél üres:

```text
""
```


---

### A válasz mentése fájlba

```bash
curl http://ip-api.com/json -O
```

A `-O`, vagy hosszabb nevén `--remote-name` kapcsoló azt mondja a `curl`-nek, hogy a kapott tartalmat **ne a terminálra írja ki, hanem mentse fájlba**.

A fájl nevét a `curl` az URL utolsó részéből veszi.

Ebben az URL-ben:

```text
http://ip-api.com/json
                  └─┬─┘
                   json
```

ezért a jelenlegi könyvtárban létrejön egy:

```text
json
```

nevű fájl.

A letöltés közben a terminálon továbbra is megjelenik a `curl` folyamatjelzője.

Ha az `ip-api.com` nem érhető el:

```bash
curl https://httpbingo.org/anything -O
```

Ebben az esetben az URL utolsó része `anything`, ezért a létrejövő fájl neve:

```text
anything
```

---

### Csendes mód

```bash
curl http://ip-api.com/json -O -s
```

A `-s`, vagy `--silent` kapcsoló bekapcsolja a **csendes módot**.

Ennek hatására a `curl` nem jeleníti meg például:

* a folyamatjelzőt,
* a saját tájékoztató üzeneteit,
* a szokásos hibaüzeneteit.

A letöltés ettől még ugyanúgy megtörténik, és továbbra is létrejön a:

```text
json
```

nevű fájl.

> A `-s` tehát nem azt jelenti, hogy a `curl` nem kér le adatot. Csak a program saját terminálkimenetét csökkenti.

Ha az `ip-api.com` nem érhető el:

```bash
curl https://httpbingo.org/anything -O -s
```

Ebben az esetben az `anything` nevű fájl jön létre, miközben a `curl` folyamatjelzője nem jelenik meg.

---

### Saját fájlnév megadása

```bash
curl http://ip-api.com/json -o ip-api.json -s
```

A kisbetűs `-o`, vagy `--output` kapcsolóval **mi adhatjuk meg a létrehozandó fájl nevét**.

Ebben az esetben a válasz az:

```text
ip-api.json
```

fájlba kerül.

A különbség tehát:

```text
-O              -> a fájl nevét az URL-ből veszi
-o ip-api.json  -> mi adjuk meg a fájl nevét
```

A `-s` miatt a folyamatjelző sem jelenik meg.

Ha az `ip-api.com` nem érhető el:

```bash
curl https://httpbingo.org/anything -o response.json -s
```

Ebben az esetben a kapott válasz a:

```text
response.json
```

fájlba kerül.

---

### Részletes működés megjelenítése

```bash
curl http://ip-api.com/json -o ip-api.json -v -s
```

A `-v`, vagy `--verbose` kapcsoló részletes információkat jelenít meg arról, hogy mi történik a kommunikáció során.

A válasz tartalma továbbra is az:

```text
ip-api.json
```

fájlba kerül, a terminálon viszont láthatjuk például:

* melyik szerverhez kapcsolódik a `curl`,
* milyen HTTP-kérést küld,
* milyen HTTP-fejléceket küld,
* milyen HTTP-választ kap,
* milyen válaszfejlécek érkeznek.

A verbose kimenetben a sorok elején található jelek segítenek megkülönböztetni az információkat:

```text
>   a curl által elküldött információ
<   a szervertől kapott információ
*   a curl saját működéséről szóló információ
```

Például:

```text
> GET /json HTTP/1.1
> Host: ip-api.com
```

azt mutatja, hogy a `curl` milyen HTTP-kérést küldött.

A:

```text
< HTTP/1.1 200 OK
```

pedig a szervertől érkező HTTP-válasz része.

A `-s` ebben a parancsban elsősorban a szokásos folyamatjelzőt tünteti el, miközben a `-v` által kért részletes információk továbbra is megjelennek.

Ha az `ip-api.com` nem érhető el:

```bash
curl https://httpbingo.org/anything -o response.json -v -s
```

Ebben az esetben a válasz a `response.json` fájlba kerül, miközben a terminálon továbbra is megfigyelhetők a `-v` által megjelenített kommunikációs részletek.


---

### Csak a válasz fejléceinek lekérése

```bash
curl --head http://ip-api.com/json
```

A `--head`, röviden `-I` kapcsoló HTTP esetén **HEAD kérést** küld.

Ennek célja, hogy a válasz tartalma helyett csak a válaszhoz tartozó fejlécinformációkat kérjük le.

A kimenet például ehhez hasonló lehet:

```text
HTTP/1.1 200 OK
Content-Type: application/json
...
```


Ha az `ip-api.com` nem érhető el:

```bash
curl --head https://httpbingo.org/anything
```

Ebben az esetben szintén a HTTP-válasz fejlécinformációi jelennek meg a terminálon.

---

### HEAD kérés részletes módban

```bash
curl --head http://ip-api.com/json -v
```

Ha az `ip-api.com` nem érhető el:

```bash
curl --head https://httpbingo.org/anything -v
```

---
### Más HTTP-metódus használata

```bash
curl -X DELETE http://ip-api.com/json -v
```

A `curl` egy egyszerű HTTP URL lekérésekor alapértelmezés szerint `GET` kérést küld.

A `-X`, vagy `--request` kapcsolóval ettől eltérő HTTP-metódust adhatunk meg.

Ebben az esetben:

```text
-X DELETE
```

miatt a kérésben `GET` helyett `DELETE` szerepel.

A `-v` kimenetében ez közvetlenül megfigyelhető:

```text
> DELETE /json HTTP/1.1
> Host: ip-api.com
```

Ez **nem azt jelenti, hogy a curl automatikusan töröl valamit**.

A `curl` mindössze `DELETE` metódusú HTTP-kérést küld. A szerver dönti el, hogy támogatja-e ezt a műveletet, és hogy a kérés hatására történik-e tényleges törlés.


Ha az `ip-api.com` nem érhető el:

```bash
curl -X DELETE https://httpbingo.org/anything -v
```

A `httpbingo.org` kifejezetten HTTP-kérések tesztelésére használható, ezért ennél a példánál jól megfigyelhető, hogy a szerverhez valóban `DELETE` metódusú kérés érkezik.

A részletes kimenetben például:

```text
> DELETE /anything HTTP/2
> Host: httpbingo.org
```

jelenhet meg, a válaszban pedig:

```json
"method": "DELETE"
```

Ez csak azt jelzi, hogy a szerver `DELETE` kérést kapott. A `httpbingo.org/anything` tesztvégpontnál **nem történik tényleges törlés**.


## Átirányítás

Előfordulhat, hogy a kért erőforrás már nem azon a címen található, amelyet megadtunk. Ilyenkor a szerver **átirányítással** jelezheti, hogy a kliensnek egy másik URL-t kell kérnie.

A böngészők az átirányításokat általában automatikusan követik. A `curl` alapértelmezés szerint viszont csak megkapja az átirányításról szóló választ, de **nem küld automatikusan új kérést az új URL-re**.

Ehhez használható a:

```text
--location
```

vagy röviden:

```text
-L
```

kapcsoló.

A `--location` tehát azt jelenti:

> Ha a szerver átirányítást küld, a `curl` kövesse a `Location` fejlécben megadott új URL-t, és küldjön arra is egy új kérést.

### Példa (1)

```bash
curl http://w3.org -v
```
Ha azt szeretnénk, hogy a `curl` az új címet is automatikusan lekérje:

```bash
curl http://w3.org -v --location -o w3.html
```


A:

```text
-o w3.html
```

a végül kapott tartalmat a `w3.html` fájlba menti.

A következő parancs ugyanezt teszi, csak a `--location` rövid alakját használja:

```bash
curl http://w3.org -v -L -o w3.html
```

## Tartalomegyeztetés

Ugyanaz az erőforrás többféle változatban is elérhető lehet, például különböző nyelveken vagy formátumokban.

A **tartalomegyeztetés** során a kliens HTTP-fejlécek segítségével jelezheti, milyen változatot részesít előnyben, a szerver pedig ezek alapján választhat a rendelkezésre álló reprezentációk közül.

### Példa (1): ugyanaz a tartalom több különböző nyelven

```bash
curl http://www.gnu.org/ -v -H Accept-Language:de -o gnu.de.html
```

A `-H` kapcsolóval saját HTTP-fejlécet adhatunk a kéréshez.

Az:

```text
Accept-Language: de
```

azt jelzi, hogy a kliens **német nyelvű tartalmat részesít előnyben**.

A válasz a `gnu.de.html` fájlba kerül.

A következő kérésben francia nyelvet kérünk:

```bash
curl http://www.gnu.org/ -v -H Accept-Language:fr -o gnu.fr.html
```

A két kérés URL-je ugyanaz, csak az elküldött `Accept-Language` fejléc különbözik.

> Az `Accept-Language` egy preferenciát jelez. A szerver dönti el, hogy figyelembe veszi-e, és milyen tartalmat küld vissza.

---

### Példa (2): eltérő User-Agent használata

```bash
curl https://www.youtube.com/ --http1.1 -v --user-agent "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1"
```

A `--user-agent` kapcsolóval megváltoztathatjuk a kérésben elküldött `User-Agent` fejlécet. Ez azonosítja a kliensprogramot a szerver felé.

Ebben a példában a `curl` egy iPhone böngészőjére jellemző User-Agent értéket küld.

A:

```text
--http1.1
```

kapcsoló arra utasítja a `curl`-t, hogy HTTP/1.1-et használjon.

A példa azt szemlélteti, hogy egy webhely a kliens által küldött információk alapján **eltérő választ adhat**. Az, hogy a YouTube ténylegesen átirányít-e mobil verzióra, a webhely aktuális működésétől függ.

---

### Példa (3): ugyanaz a tartalom több különböző formátumban

```bash
curl https://dbpedia.org/resource/Grumpy_Cat -v
```

Először külön kérés nélkül lekérjük az erőforrást.

Ezután jelezzük, hogy HTML-formátumot szeretnénk:

```bash
curl https://dbpedia.org/resource/Grumpy_Cat -v -H Accept:text/html
```

Az `Accept` fejléc azt jelzi a szervernek, hogy **milyen típusú választ részesít előnyben a kliens**.

Az átirányítást követve és az eredményt fájlba mentve:

```bash
curl https://dbpedia.org/resource/Grumpy_Cat -v -H Accept:text/html -L -o Grumpy_Cat.html
```

Itt:

* `-H Accept:text/html` – HTML-formátumot kér;
* `-L` – követi az átirányítást;
* `-o Grumpy_Cat.html` – fájlba menti a választ.

Más formátum is kérhető:

```bash
curl https://dbpedia.org/resource/Grumpy_Cat -v -H Accept:application/json
```

Ebben az esetben a kliens JSON-formátumú választ részesít előnyben.

Az átirányítást követve:

```bash
curl https://dbpedia.org/resource/Grumpy_Cat -v -H Accept:application/json -L -O
```

A DBpedia kifejezetten tartalomegyeztetést használ: ugyanahhoz az erőforráshoz a kliens által kért formátum alapján különböző reprezentációkat tud biztosítani.

> A lényeg: **ugyanazt az erőforrást kérjük, de a HTTP-fejlécekkel jelezhetjük, hogy milyen nyelvű vagy milyen formátumú változatot szeretnénk kapni.**

## Minták

A `curl` segítségével egyetlen parancsban **több, egymáshoz hasonló URL-t is előállíthatunk**. Ezt URL-minták (*URL globbing*) használatával tehetjük meg.

### Példa (1)

```bash
curl "https://www.gnu.org/licenses/gpl-3.0.{html,md,txt}" -O
```

A kapcsos zárójelek között több lehetséges értéket adunk meg:

```text
{html,md,txt}
```

A `-O` miatt mindhárom fájl az eredeti fájlnevével kerül mentésre.

> Ha a `www.gnu.org` nem érhető el, ugyanez a működés a `httpbingo.org` tesztszolgáltatással is kipróbálható:
>
> ```bash
> curl "https://httpbingo.org/anything/{html,md,txt}" -O
> ```
>
> Ebben az esetben a `curl` a következő három URL-t állítja elő:
>
> ```text
> https://httpbingo.org/anything/html
> https://httpbingo.org/anything/md
> https://httpbingo.org/anything/txt
> ```
>
> A `-O` miatt három fájl jön létre:
>
> ```text
> html
> md
> txt
> ```
>
> A fájlok tartalmából az is látható, hogy a szerverhez három külön kérés érkezett.

---

A következő parancs ugyanezt teszi:

```bash
curl "https://www.gnu.org/licenses/gpl-3.0.{html,md,txt}" -O
```

Az idézőjelek biztosítják, hogy a teljes URL változtatás nélkül a `curl`-höz kerüljön, és a mintát maga a `curl` dolgozza fel.

---

Részletes módban:

```bash
curl "https://www.gnu.org/licenses/gpl-3.0.{html,md,txt}" -O -v
```

A `-v` segítségével megfigyelhető, hogy a `curl` valóban három külön kérést hajt végre.

Ha a `www.gnu.org` nem érhető el:

```bash
curl "https://httpbingo.org/anything/{html,md,txt}" -O -v
```

A részletes kimenetben itt is látható, hogy három külön kérés indul:

```text
/anything/html
/anything/md
/anything/txt
```

---

A letöltött fájlokat külön könyvtárba is rendezhetjük:

```bash
curl "https://www.gnu.org/licenses/gpl-3.0.{html,md,txt}" --create-dirs -o "licenses/gpl-3.0.#1"
```

A:

```text
--create-dirs
```

létrehozza a megadott helyi könyvtárat, ha az még nem létezik.

A:

```text
#1
```

helyére mindig az URL-mintából éppen kiválasztott érték kerül.

Így létrejöhet például:

```text
licenses/gpl-3.0.html
licenses/gpl-3.0.md
licenses/gpl-3.0.txt
```

Ha az alternatív szolgáltatást használjuk:

```bash
curl "https://httpbingo.org/anything/{html,md,txt}" --create-dirs -o "examples/#1.txt"
```

akkor létrejön:

```text
examples/html.txt
examples/md.txt
examples/txt.txt
```

A `#1` helyére ebben az esetben rendre a `html`, `md` és `txt` érték kerül.

---

### Példa (2)

A minták segítségével számtartomány is megadható:

```bash
curl "https://en.wikisource.org/wiki/The_Hound_of_the_Baskervilles_(Newnes,_1902)/Chapter_[1-15]" -O
```

A:

```text
[1-15]
```

az 1-től 15-ig terjedő értékeket jelenti, ezért a `curl` egymás után több URL-t kér le:

```text
.../Chapter_1
.../Chapter_2
...
.../Chapter_15
```

A fájlokat saját könyvtárba és saját néven is menthetjük:

```bash
curl "https://en.wikisource.org/wiki/The_Hound_of_the_Baskervilles_(Newnes,_1902)/Chapter_[1-15]" --create-dirs -o "The_Hound_of_the_Baskervilles/Chapter_#1.html"
```

A `#1` helyére az aktuális fejezetszám kerül, így például:

```text
The_Hound_of_the_Baskervilles/Chapter_1.html
The_Hound_of_the_Baskervilles/Chapter_2.html
...
The_Hound_of_the_Baskervilles/Chapter_15.html
```

fájlok jönnek létre.

Ha a Wikisource nem érhető el, ugyanilyen számtartomány a `httpbingo.org` segítségével is kipróbálható:

```bash
curl "https://httpbingo.org/anything/[1-15]" -O
```

A `curl` ekkor a következő címeket állítja elő:

```text
https://httpbingo.org/anything/1
https://httpbingo.org/anything/2
...
https://httpbingo.org/anything/15
```

A fájlok külön könyvtárba is menthetők:

```bash
curl "https://httpbingo.org/anything/[1-15]" --create-dirs -o "chapters/Chapter_#1.txt"
```

Így például:

```text
chapters/Chapter_1.txt
chapters/Chapter_2.txt
...
chapters/Chapter_15.txt
```

fájlok jönnek létre.

> A `{...}` lista megadott értékek közül hoz létre több URL-t, míg a `[...]` egy tartomány értékein halad végig.


## Több kérés

Egyetlen `curl` parancsban **több URL is megadható**. A `curl` ezeket alapértelmezés szerint egymás után dolgozza fel.

```bash id="sjbjzp"
curl https://www.gnu.org/licenses/gpl-3.0.txt -O https://www.apache.org/licenses/LICENSE-2.0.txt -O
```

A parancs két külön fájlt tölt le:

```text id="bk120e"
gpl-3.0.txt
LICENSE-2.0.txt
```

---

Több URL-re ugyanazt a műveletet is végrehajthatjuk:

```bash id="iyom45"
curl --head https://dbpedia.org/resource/Hungary https://dbpedia.org/resource/Budapest
```

Mindkét erőforráshoz HEAD kérés tartozik, ezért mindkettő válaszfejlécei megjelennek.

---

Ugyanazt a fejlécet több kéréshez is használhatjuk:

```bash id="n7devy"
curl -H Accept:application/json https://dbpedia.org/resource/Hungary https://dbpedia.org/resource/Budapest -v
```

Mindkét kérésben szerepel:

```text id="edtehq"
Accept: application/json
```

---

Ha azt szeretnénk, hogy az egyes URL-ekhez **különböző beállítások** tartozzanak, használható a `--next` kapcsoló:

```bash id="m54969"
curl -H Accept:application/json https://dbpedia.org/resource/Hungary --next -H Accept:application/rdf+xml https://dbpedia.org/resource/Budapest -v
```

Az első kérés:

```text id="i3s85c"
Accept: application/json
```

fejlécet kap, míg a `--next` után kezdődő második kérés:

```text id="x0zdja"
Accept: application/rdf+xml
```

fejlécet használ.

A `--next` tehát lehetővé teszi, hogy **egy parancson belül különböző beállításokkal hajtsunk végre több kérést**.

---

## Megszakított átvitel folytatása

Nagyobb fájlok letöltése közben előfordulhat, hogy az átvitel megszakad. Ha a szerver támogatja, a `curl` képes a letöltést **onnan folytatni, ahol korábban abbamaradt**.

Indítsuk el a letöltést:

```bash id="e0ltjj"
curl https://download.bbbike.org/osm/bbbike/Budapest/Budapest.osm.gz -O
```

A letöltést a:

```text id="9sp6de"
CTRL + C
```

billentyűkombinációval megszakíthatjuk.

A részben letöltött fájl megmarad.

A folytatáshoz:

```bash id="4tz173"
curl https://download.bbbike.org/osm/bbbike/Budapest/Budapest.osm.gz -O -C -
```

A:

```text id="dprg8t"
-C -
```

vagy hosszabb nevén:

```text id="ra240b"
--continue-at -
```

arra utasítja a `curl`-t, hogy automatikusan állapítsa meg, meddig jutott a korábbi letöltés, és lehetőség szerint **onnan folytassa az átvitelt**.

---

## Tartományra vonatkozó kérések

Nem mindig szükséges egy teljes erőforrást letölteni. A `-r`, vagy `--range` kapcsolóval megadhatjuk, hogy **csak egy bizonyos bájttartományt kérünk**.

### Az első 100 bájt

```bash id="a8mgdf"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r 0-99
```

A:

```text id="opk3nw"
0-99
```

a 0. bájttól a 99. bájtig terjedő tartományt jelenti, vagyis összesen 100 bájtot.

Részletes módban:

```bash id="snk60f"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r 0-99 -v
```

a `-v` segítségével a tartományra vonatkozó HTTP-kérés is megfigyelhető.

---

### Az utolsó 100 bájt

```bash id="qcrb1b"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r -100
```

A:

```text id="5t7qhg"
-100
```

az erőforrás **utolsó 100 bájtját** jelenti.

Részletes módban:

```bash id="5l73we"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r -100 -v
```

---

### Az első és az utolsó 100 bájt

```bash id="pv5jw6"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r 0-99,-100
```

Több tartomány vesszővel választható el:

```text id="70bp15"
0-99,-100
```

Ez az első és az utolsó 100 bájtot kéri.

```bash id="0kv4ow"
curl https://www.gnu.org/licenses/gpl-3.0.txt -r 0-99,-100 -v
```

A szervernek támogatnia kell a tartományra vonatkozó kéréseket. Több tartomány esetén a válasz több különálló részt is tartalmazhat.

---

## Feltételes kérések

Feltételes kérésnél a kliens jelezheti a szervernek, hogy **csak akkor szeretné újra letölteni az erőforrást, ha az egy adott időpont óta megváltozott**.

Elsőként letöltjük a fájlt:

```bash id="mzsa4a"
curl https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv -O --http1.1 -v
```

A:

```text id="7s49eq"
--http1.1
```

arra utasítja a `curl`-t, hogy HTTP/1.1-et használjon.

---

Ezután:

```bash id="780dd3"
curl https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv -O --http1.1 -z all_hour.csv -v
```

A:

```text id="d9spnn"
-z all_hour.csv
```

vagy:

```text id="q9691z"
--time-cond all_hour.csv
```

azt jelenti, hogy a `curl` a már meglévő `all_hour.csv` fájl módosítási idejét használja feltételként.

A szervertől lényegében azt kérdezzük:

> Változott az erőforrás azóta, hogy ezt a fájlt letöltöttük?

Ha nem változott, nincs szükség a teljes tartalom ismételt letöltésére.

---

```bash id="qh5rox"
sleep 60; curl https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv -O --http1.1 -z all_hour.csv -v
```

A:

```text id="dqufgp"
sleep 60
```

60 másodperc várakozást jelent, majd a kérés újra lefut.

Így megfigyelhető, hogy a szerver szerint változott-e időközben az erőforrás.

> A `sleep` Unix/Linux parancs. PowerShellben más paranccsal végezhető el ugyanez a várakozás.

---

# Űrlapadatok küldése

Eddig főként olyan kéréseket láttunk, amelyekkel adatot kértünk le. A HTTP segítségével azonban **adatokat is küldhetünk a szervernek**.

## Bevezetés

A példákhoz a [httpbin.org](https://httpbin.org/) szolgáltatást használjuk, amely visszajelzi a hozzá érkező HTTP-kérés fontosabb adatait.

### GET metódus

```bash id="euu6w6"
curl --get http://httpbin.org/get -d string=bazinga -d number=42 -v
```

A `-d`, vagy `--data` segítségével adatokat adunk meg:

```text id="3kokzg"
string=bazinga
number=42
```

A `--get` hatására ezek **nem a kérés törzsébe kerülnek**, hanem az URL lekérdezési részéhez adódnak.

A ténylegesen kért URL ezért lényegében:

```text id="277coj"
http://httpbin.org/get?string=bazinga&number=42
```

---

Ha az érték olyan karaktereket tartalmaz, amelyeknek különleges jelentésük lehet egy URL-ben, használható a:

```text id="e5rq85"
--data-urlencode
```

kapcsoló:

```bash id="wff1vi"
curl --get http://httpbin.org/get --data-urlencode "string=Hello, World!" -d number=42 -v
```

A `--data-urlencode` megfelelően **URL-kódolja** a megadott adatot.

---
### POST – adatok küldése

POST kérésnél adatokat küldhetünk a szervernek. Ez sokféle célra használható, például új adatok létrehozására, műveletek kezdeményezésére vagy űrlapadatok továbbítására.

Ebben a példában két egyszerű űrlapmező elküldésével szemléltetjük a működését:

```text
string = bazinga
number = 42
```

A `curl` ezeket az adatokat elküldi a `httpbin.org/post` tesztvégpontnak, amely a válaszban visszajelzi, hogy mit kapott.

#### `application/x-www-form-urlencoded`

```bash
curl http://httpbin.org/post -d string=bazinga -d number=42 -v
```

Ha `-d`, vagy `--data` kapcsolót használunk `--get` nélkül, a `curl` HTTP esetén alapértelmezés szerint POST kérést küld.

A két mező:

```text
string=bazinga
number=42
```

`application/x-www-form-urlencoded` formában kerül elküldésre.

Ez az egyszerű űrlapadatok továbbításának egyik gyakori formája.

Részletesebb nyomkövetéshez:

```bash
curl http://httpbin.org/post -d string=bazinga -d number=42 --trace-ascii -
```

A `--trace-ascii -` a küldött és fogadott adatok részletes nyomkövetését a terminálra írja.

---

#### `multipart/form-data`

Ugyanezeket az adatokat más formában is elküldhetjük:

```bash
curl http://httpbin.org/post -F string=bazinga -F number=42 -v
```

A `-F`, vagy `--form` kapcsoló `multipart/form-data` formában küldi el az adatokat.

Ez a forma különösen hasznos például akkor, amikor a küldött adatok között fájl is szerepel.

Részletes nyomkövetéssel:

```bash
curl http://httpbin.org/post -F string=bazinga -F number=42 --trace-ascii -
```

A két példa ugyanazokat az adatokat küldi el, csak **eltérő formátumban**.
## Példa (1): GET

Egy keresőűrlap adatai gyakran GET-kéréssel kerülnek elküldésre.

```bash id="gm0d4o"
curl https://blackwells.co.uk/bookshop/search?keyword=sherlock+holmes\&pubDateFrom=2022\&pubDateTo=2023 -o search.html -v
```

Ebben az esetben a keresési feltételek közvetlenül az URL-ben szerepelnek:

```text id="v7h2g9"
keyword=sherlock+holmes
pubDateFrom=2022
pubDateTo=2023
```

---

Ugyanez az URL a `curl` segítségével külön adatokból is felépíthető:

```bash id="3z0vfy"
curl --get https://blackwells.co.uk/bookshop/search -d keyword=sherlock+holmes -d pubDateFrom=2022 -d pubDateTo=2023 -o search.html -v
```

A `--get` miatt a `-d` kapcsolókkal megadott adatok az URL lekérdezési részébe kerülnek.

---

Biztonságosabb kódolást kérhetünk:

```bash id="q5hv2c"
curl --get https://blackwells.co.uk/bookshop/search --data-urlencode keyword="sherlock holmes" -d pubDateFrom=2022 -d pubDateTo=2023 -o search.html -v
```

A:

```text id="0vfo8i"
--data-urlencode
```

gondoskodik arról, hogy például a szóközt is megfelelően kezelje a `curl`.

---

## Példa (2): POST

```bash id="eu5t0s"
curl https://www.base64encode.org/ --http1.1 -d input=Hello,\ World! -d charset=UTF-8 -d separator=lf -o output.html --trace-ascii trace.txt -s
```

Itt több adatot küldünk POST kéréssel:

```text id="ulje4p"
input=Hello, World!
charset=UTF-8
separator=lf
```

A:

```text id="zniazo"
-o output.html
```

a szerver válaszát az `output.html` fájlba menti.

A:

```text id="8nahsy"
--trace-ascii trace.txt
```

pedig a kommunikáció részletes nyomkövetését külön:

```text id="k5jsje"
trace.txt
```

fájlba írja.

Így külön vizsgálható a szerver válasza és maga a HTTP-kommunikáció.

---

## Példa (3): GET

```bash id="vkapav"
curl --get https://validator.nu/ --data-urlencode "doc=https://www.w3.org/" -o output.html -v
```

A `validator.nu` szolgáltatásnak a `doc` nevű paraméterben adjuk meg az ellenőrizni kívánt oldal URL-jét.

A:

```text id="j6hl5r"
--data-urlencode
```

gondoskodik arról, hogy maga az URL megfelelően legyen kódolva a kérés részeként.

A válasz az:

```text id="bcdvz9"
output.html
```

fájlba kerül.

---

## Példa (4): POST

Először letöltünk egy fájlt:

```bash id="rv3wpm"
curl https://www.w3.org/ -o index.html -s
```

Az eredmény az:

```text id="9fes5s"
index.html
```

fájlba kerül.

Ezután ezt a fájlt elküldjük egy másik szolgáltatásnak:

```bash id="orsid1"
curl https://validator.nu/ -F file=@index.html -o output.html --trace-ascii trace.txt -s
```

A:

```text id="g57k7q"
-F file=@index.html
```

azt jelenti, hogy a `file` nevű űrlapmezőben **az `index.html` fájl tartalmát töltjük fel**.

Az `@` jelzi a `curl` számára, hogy nem az `index.html` szöveget akarjuk elküldeni, hanem az ilyen nevű helyi fájlt.

A szerver válasza:

```text id="ci9i4g"
output.html
```

fájlba kerül, míg a HTTP-kommunikáció részletes nyomkövetése:

```text id="1nmgyk"
trace.txt
```

fájlba kerül.

## Web API-k használata

A `curl` segítségével webes API-kat is közvetlenül használhatunk. Ilyenkor a megfelelő URL megadásával kérést küldünk a szolgáltatásnak, majd a választ közvetlenül a terminálon vagy fájlban kapjuk meg.

### Példa (1): wttr.in

A [wttr.in](https://wttr.in/) egy terminálból is használható időjárási szolgáltatás. A kért helyet és a megjelenítés módját az URL-ben adhatjuk meg.

```bash
curl http://wttr.in
```

Ha nem adunk meg helyet, a szolgáltatás a kérés forrása alapján próbálja meghatározni a helyzetünket.

```bash
curl http://wttr.in/:help
```

Megjeleníti a szolgáltatás saját súgóját.

Egy adott város időjárása az URL-ben adható meg:

```bash
curl http://wttr.in/London
curl http://wttr.in/New+York
```

A `+` jel segítségével szóközt tartalmazó helynevet is megadhatunk.

Nem csak városokra kereshetünk:

```bash
curl http://wttr.in/~Tower+Bridge
curl http://wttr.in/~Mount+Everest
```

A `~` segítségével egy konkrét földrajzi helyre vagy nevezetességre kérdezhetünk rá.

---

A válasz nyelvét HTTP-fejléccel is jelezhetjük:

```bash
curl http://wttr.in/ -H Accept-Language:en
curl http://wttr.in/ -H Accept-Language:de
```

Az `Accept-Language` fejléc azt jelzi, hogy milyen nyelvű választ részesítünk előnyben.

A nyelv az URL paramétereként is megadható:

```bash
curl http://wttr.in?lang=hu
curl http://wttr.in?lang=en
curl http://wttr.in?lang=de
```

vagy külön aldomain használatával:

```bash
curl http://hu.wttr.in
curl http://de.wttr.in
```

A wttr.in mindhárom módszert támogatja.

---

A `format` paraméterrel a válasz megjelenési módja is változtatható:

```bash
curl http://wttr.in/?format=1
curl http://wttr.in/?format=2
curl http://wttr.in/?format=3
curl http://wttr.in/?format=4
```

A különböző értékek különböző mennyiségű és elrendezésű időjárási információt jelenítenek meg.

```bash
curl http://wttr.in/?format=j1
```

A `j1` géppel könnyebben feldolgozható JSON-formátumú választ kér.

Részletesebb nézet:

```bash
curl http://wttr.in/Budapest?format=v2
curl http://v2.wttr.in/Budapest
```

A két forma ugyanazt a részletesebb `v2` nézetet kéri.

```bash
curl http://wttr.in/Moon
```

A szolgáltatás speciális lekérdezéseket, például holdfázisok megjelenítését is támogatja.

---

### Példa (2): Nu Html Checker

A [validator.nu](https://validator.nu/) egy HTML-dokumentumok ellenőrzésére használható szolgáltatás. API-ként is használható, vagyis a `curl` segítségével közvetlenül megadhatjuk, melyik dokumentumot szeretnénk ellenőriztetni.

```bash
curl --get https://validator.nu/ --data-urlencode doc=https://whatwg.org/ -d out=json
```

Itt:

* `doc` – az ellenőrizendő dokumentum URL-je;
* `out=json` – a választ JSON-formátumban kérjük.

```bash
curl --get https://validator.nu/ --data-urlencode doc=https://whatwg.org/ -d out=xml
```

Ugyanez, de XML-formátumú választ kérünk.

A `validator.nu` jelenleg több kimeneti formátumot is támogat, köztük JSON-t és XML-t.

```bash
curl --get https://validator.w3.org/nu/ --data-urlencode doc=https://www.w3.org/ -d out=xml
```

Itt a W3C által üzemeltetett Nu Html Checker példányát használjuk.

```bash
curl --get https://validator.w3.org/nu/ --data-urlencode doc=https://www.w3.org/ -d out=xml -d level=error
```

A:

```text
level=error
```

paraméterrel csak a hibák megjelenítését kérjük, a figyelmeztetéseket nem.

---

Nem csak URL-t adhatunk át az ellenőrzőnek, hanem egy már letöltött dokumentum tartalmát is:

```bash
curl https://whatwg.org/ -o whatwg.html -s
```

Először letöltjük az oldalt.

Ezután:

```bash
curl https://validator.nu/?out=xml --data-binary @whatwg.html -H "Content-type: text/html; charset=utf-8" -v
```

A:

```text
--data-binary @whatwg.html
```

a fájl tartalmát küldi el a szervernek.

A:

```text
Content-type: text/html; charset=utf-8
```

fejléc pedig közli a szerverrel, hogy az elküldött adat HTML-dokumentum.

---

### Példa (3): fájlmegosztás

Először létrehozunk egy egyszerű szövegfájlt:

```bash
echo "Hello, World!" > hello.txt
```

Ezután feltöltjük:

```bash
curl -F "file=@hello.txt" https://temp.sh/upload
```

A:

```text
-F "file=@hello.txt"
```

azt jelenti, hogy a `file` nevű űrlapmezőben a helyi `hello.txt` fájlt küldjük el.

A temp.sh a feltöltés után egy URL-t ad vissza, amelyen a fájl ideiglenesen elérhető. A szolgáltatás jelenleg három nap után törli a feltöltött fájlokat.

---

## Sütik

A **sütik (cookies)** kis adatok, amelyeket a szerver küldhet a kliensnek, a kliens pedig későbbi kérések során visszaküldhet a szervernek.

A `curl` képes sütik tárolására és későbbi felhasználására is.

```bash
rm -f cookies.txt
```

Töröljük a korábbi `cookies.txt` fájlt, ha létezik.

```bash
curl https://www.youtube.com/ -c cookies.txt -o /dev/null -v
```

A:

```text
-c cookies.txt
```

vagy:

```text
--cookie-jar cookies.txt
```

a szervertől kapott sütiket a `cookies.txt` fájlba menti.

A:

```text
-o /dev/null
```

az oldal tartalmát nem menti el, mert ebben a példában csak a sütik érdekelnek.

A tárolt sütik megtekinthetők:

```bash
cat cookies.txt
```

Ezután egy új kérésben visszaküldhetjük őket:

```bash
curl https://www.youtube.com/watch?v=pTBjHjRhx_Y -b cookies.txt -o /dev/null -v
```

A:

```text
-b cookies.txt
```

vagy:

```text
--cookie cookies.txt
```

beolvassa a fájlban tárolt sütiket, és az adott kéréshez megfelelő sütiket elküldi a szervernek.


---

## Hitelesítés

Bizonyos API-k nem használhatók szabadon. A szervernek előbb meg kell győződnie arról, hogy **ki küldi a kérést, illetve jogosult-e az adott műveletre**.

### Példa (1): API-kulcs

A Rebrickable API használatához API-kulcs szükséges.

```bash
curl https://rebrickable.com/api/v3/lego/sets/60386-1/ -H "Authorization: key <your-api-key>" -v
```

Az:

```text
Authorization: key <your-api-key>
```

HTTP-fejlécben küldjük el az API-kulcsot.

Az API ez alapján azonosítja a kérés küldőjét, illetve ellenőrizheti, hogy használhatja-e az adott szolgáltatást.

A további példák ugyanezzel a kulccsal más adatokat kérnek ugyanahhoz a LEGO-készlethez:

```bash
curl https://rebrickable.com/api/v3/lego/sets/60386-1/minifigs/ -H "Authorization: key <your-api-key>" -v
```

a minifigurákat,

```bash
curl https://rebrickable.com/api/v3/lego/sets/60386-1/parts/ -H "Authorization: key <your-api-key>" -v
```

pedig az alkatrészeket kéri le.

> Az API-kulcsot jelszóhoz hasonlóan védeni kell, és nem szabad nyilvánosan megosztani.

---

### Példa (2): Basic Authentication

```bash
curl https://api.github.com/user -v
```

Hitelesítés nélkül a GitHub `/user` végpontja nem tudja megállapítani, melyik felhasználó adatait kérjük, ezért hitelesítés szükséges.

A következő régi példa:

```bash
curl https://api.github.com/user -v -u <username>
```

a `-u`, vagy `--user` kapcsoló használatát szemlélteti. A `curl` ilyenkor felhasználónevet és jelszót kérhet a HTTP Basic Authentication használatához.

> **Fontos:** a GitHub REST API ma már nem támogatja a felhasználónév + GitHub-jelszó alapú hitelesítést. Felhasználói API-kérésekhez access tokent kell használni. A GitHub jelenleg elsősorban fine-grained personal access token használatát javasolja.

A korszerű GitHub API-hívás például `Authorization` fejlécben küldött tokennel történik:

```bash
curl https://api.github.com/user -H "Authorization: Bearer <token>"
```

A tokent a jelszóhoz hasonlóan titokban kell tartani.

---

## Móka és szórakozás

A `curl` nemcsak klasszikus API-khoz használható. Vannak olyan szolgáltatások is, amelyeket kifejezetten terminálból történő megjelenítésre készítettek.

### VT100 animáció

```bash
curl -s http://artscene.textfiles.com/vt100/globe.vt | pv -L4K -q
```

A `curl` letölti a terminálvezérlő karaktereket tartalmazó animációt.

A:

```text
|
```

a `curl` kimenetét átadja a következő programnak.

A `pv` itt korlátozza az adat továbbításának sebességét, így az animáció nem egyszerre jelenik meg.

---

### ASCII animáció

```bash
curl http://ascii.live/forrest
curl ascii.live/list
curl ascii.live/rick
curl ascii.live/donut
```

Ezek a szolgáltatások olyan szöveges tartalmat küldenek vissza, amely közvetlenül a terminálban animációként jelenhet meg.

---

## Böngésző megszemélyesítése

Egyes webhelyek eltérően kezelik a valódi böngészőkből és az automatizált HTTP-kliensekből érkező kéréseket.

Egy webhely például elutasíthatja a `curl` kérését:

```bash
curl --head https://www.nasdaq.com/
```

és például:

```text
403 Forbidden
```

választ adhat.

A `403 Forbidden` azt jelzi, hogy a szerver megértette a kérést, de megtagadja annak teljesítését.

Fontos, hogy egy egyszerű:

```bash
--user-agent
```

csere nem feltétlenül elegendő ahhoz, hogy a `curl` valódi böngészőnek tűnjön. A szerver a kapcsolat számos más tulajdonságát is megvizsgálhatja.

A `curl-impersonate` a curl speciálisan módosított változata, amelynek célja, hogy a hálózati kommunikáció több tulajdonságában is ismert böngészőket utánozzon.

Például:

```bash
curl_chrome116 --head https://www.nasdaq.com/
```

egy Chrome böngésző kommunikációját próbálja utánozni.

Ez azonban **nem garantálja**, hogy a szerver böngészőként fogja elfogadni a kérést. A webhelyek botfelismerési módszerei folyamatosan változnak, ezért az ilyen példák eredménye idővel változhat.

A Cloudflare Browser Integrity Check például nem szabványos vagy hiányzó User-Agent esetén is kihívást vagy tiltást alkalmazhat, és ez a funkció jelenleg alapértelmezés szerint engedélyezett.

> A böngésző megszemélyesítése itt elsősorban annak szemléltetésére szolgál, hogy a szerver nemcsak az URL alapján dönthet arról, hogyan kezel egy kérést.
