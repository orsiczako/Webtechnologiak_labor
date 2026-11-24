/*
 * Megkeressük a HTML-dokumentumban a container azonosítójú elemet.
 * Ez lesz az a flexkonténer, amelybe az új négyzeteket helyezzük,
 * és amelynek a CSS-tulajdonságait később módosítani fogjuk.
 */
const container = document.getElementById('container');


/* Ez majd akkor hívódik ha az add item gombra nyomunk*/
function addItem() {

    // Létrehozunk egy új div elemet, amely egyelőre még nincs az oldalon.
    const item = document.createElement('div');

    // Az új div megkapja az item CSS-osztályt,
    // így érvényesülnek rá a .item szelektorhoz tartozó CSS-szabályok.
    item.className = 'item';

    /*
     * A négyzetbe egy sorszámot írunk.
     *
     * container.children.length:
     * Megadja, hogy a konténernek jelenleg hány gyermekeleme van.
     * Ha például már három négyzetünk van, az értéke 3.
     * Ehhez hozzáadunk 1-et, így az új négyzetben 4 jelenik meg.
     * A textContent az elem szöveges tartalmát állítja be.
     */
    item.textContent = container.children.length + 1;

    /*
     * Az appendChild() hozzáadja az új div elemet
     * a konténer gyermekeihez, méghozzá az utolsó helyre.
     *
     * Ettől válik az új négyzet ténylegesen láthatóvá az oldalon.
     */
    container.appendChild(item);
}


/*
 * A Reset gomb megnyomásakor fut le.
 *
 * Eltávolítja az összes létrehozott négyzetet,
 * törli a JavaScriptből beállított Flexbox-tulajdonságokat,
 * és visszaállítja a legördülő listákat az eredeti állapotukba.
 */
function reset() {

    /*
     * A firstChild a konténer első gyermekcsomópontját adja vissza.
     *
     * Amíg van ilyen gyermek, a ciklus újra lefut.
     *
     * A removeChild() eltávolítja a megadott gyermeket,
     * így a ciklus egymás után az összes négyzetet törli.
     *
     * Amikor a konténer kiürült, a firstChild értéke null lesz,
     * ezért a ciklus leáll.
     */
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    /*
     * A konténer JavaScriptből beállított inline CSS-értékeit töröljük.
     *
     * A null érték hozzárendelése itt eltávolítja
     * az adott inline CSS-deklarációt.
     *
     * Így ismét a CSS-stíluslapban megadott,
     * vagy az alapértelmezett értékek fognak érvényesülni.
     */
    container.style.alignItems = null;
    container.style.flexDirection = null;
    container.style.justifyContent = null;
    container.style.flexWrap = null;

    /*
     * A négy legördülő listában visszaállítjuk
     * a kiválasztott értéket az üres karakterláncra ("").
     *
     * Mivel a HTML-ben az (unset) opciónál value="" szerepel,
     * ezzel mindegyik listában újra az (unset) lesz kiválasztva.
     *
     * Fontos, hogy ez a felületen látható választást állítja vissza,
     * míg a fenti style beállítások a konténer CSS-ét módosítják.
     */
    document.getElementById('flex-direction-select').value = "";
    document.getElementById('justify-content-select').value = "";
    document.getElementById('align-items-select').value = "";
    document.getElementById('flex-wrap-select').value = "";
}


/*
 * Ez a függvény akkor fut le, amikor a felhasználó
 * megváltoztatja a flex-direction legördülő lista értékét.
 *
 * A függvény egy event paramétert kap.
 * Ez egy eseményobjektum, amely információkat tartalmaz
 * az eseményről és az érintett HTML-eleméről.
 *
 * Ebben az esetben az esemény típusa change,
 * vagyis a kiválasztott érték megváltozása.
 */
function changeFlexDirection(event) {

    /*
     * Az event.currentTarget azt a HTML-elemet jelöli,
     * amelyhez az eseménykezelőt hozzárendeltük.
     * Itt ez a flex-direction legördülő lista.
     *
     * A .value a jelenleg kiválasztott opció értékét adja vissza.
     *
     * Például ha a column lehetőséget választottuk,
     * akkor a value változó értéke "column" lesz.
     */
    const value = event.currentTarget.value;
    /*
     * A kiválasztott értéket beállítjuk a konténer
     * flex-direction CSS-tulajdonságaként.
     */
    container.style.flexDirection = value;
}

function changeJustifyContent(event) {

    /*
     * Lekérjük annak a legördülő listának az aktuális értékét,
     * amelyhez az eseménykezelőt rendeltük.
     *
     * Például: "center", "flex-end" vagy "space-between".
     */
    const value = event.currentTarget.value;
    /*
     * A konténer justify-content tulajdonságát módosítjuk.
     *
     * Ez a négyzetek elhelyezkedését szabályozza
     * a főtengely mentén.
     *
     * Például "center" esetén a négyzetek csoportja
     * a főtengely mentén középre kerül.
     */
    container.style.justifyContent = value;
}

function changeAlignItems(event) {

    const value = event.currentTarget.value;
    container.style.alignItems = value;
}



function changeFlexWrap(event) {

    const value = event.currentTarget.value;
    container.style.flexWrap = value;
}


/*
 * Az addEventListener() segítségével megadjuk,
 * hogy egy HTML-elemen bekövetkező esemény
 * melyik JavaScript-függvényt indítsa el.
 *
 * Első paraméter: az esemény típusa (például click vagy change).
 * Második paraméter: a meghívandó függvény neve.
 *
 * A függvény neve után nem írunk (),
 * mert nem azonnal akarjuk végrehajtani,
 * hanem eseménykezelőként adjuk át.
 */
// Ha az Add Item gombra kattintunk, lefut az addItem() függvény.
document.getElementById('add-item-btn').addEventListener('click', addItem);
// Ha a Reset gombra kattintunk, lefut a reset() függvény.
document.getElementById('reset-btn').addEventListener('click', reset);
/*
 * A change esemény akkor következik be, amikor
 * a felhasználó megváltoztatja a legördülő lista kiválasztott értékét.
 *
 * Az eseménykezelő függvény automatikusan megkapja
 * az eseményobjektumot, ezért nem kell nekünk külön
 * átadnunk az event paramétert.
 */

// A flex-direction lista változásakor meghívjuk a changeFlexDirection() függvényt.
document.getElementById('flex-direction-select').addEventListener('change', changeFlexDirection);
// A justify-content lista változásakor meghívjuk a changeJustifyContent() függvényt.
document.getElementById('justify-content-select').addEventListener('change', changeJustifyContent);
// Az align-items lista változásakor meghívjuk a changeAlignItems() függvényt.
document.getElementById('align-items-select').addEventListener('change', changeAlignItems);
// A flex-wrap lista változásakor meghívjuk a changeFlexWrap() függvényt.
document.getElementById('flex-wrap-select').addEventListener('change', changeFlexWrap);