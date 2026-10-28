/*
 * Minden meghíváskor megvizsgálja, hogy az elemek jelenleg láthatók-e,
 * majd ennek megfelelően elrejti vagy megjeleníti őket.
 */
function toggleStageDirections() {
    /* Üzenetet ír a böngésző fejlesztői konzoljára. */
    console.log('Button is clicked');
    /*
     * Kiválasztja az összes stagedir osztályú elemet,
     * majd a forEach() segítségével egyenként feldolgozza őket.
     */
    document.querySelectorAll('.stagedir').forEach(stagedir => {
        /*
         * A getComputedStyle() lekéri az elem ténylegesen érvényesülő
         * CSS-tulajdonságait (beleértve a stíluslapból származókat is).
            Ha a display nem none, vagyis megjelenik, akkor isShown értéke true lesz, különben false.
         */
        const isShown = getComputedStyle(stagedir).display !== 'none';
        /* Ha az elem jelenleg meg van jelenítve, elrejtjük. */
        if (isShown) {
            /* A display: none eltünteti az elemet az oldal elrendezéséből. */
            stagedir.style.display = 'none';
        } else {
            /*
             * Ha az elem rejtett, újra megjelenítjük.
            Fogjuk a stagedir elemet, majd annak a sílusát, és a display tulajdonsáságt
             * A tagName visszaadja az elem HTML-címkéjének nevét.
             * HTML-dokumentumban például: DIV, SPAN, P.
             * A ?: egy feltételes operátor:
             * feltétel ? érték_ha_igaz : érték_ha_hamis
             *
             * Ha az elem DIV, akkor display: block lesz.
             * Egyébként display: inline értéket kap.
             *
             * Erre azért van szükség, mert a színpadi utasítások
             * div és span elemekben is előfordulhatnak:
             * a div blokkszintű, a span pedig inline megjelenítésű.
             */
            stagedir.style.display = stagedir.tagName === 'DIV' ? 'block' : 'inline';
        }
    });
}

/*
 * Megkeresi a toggle-stagedir-button azonosítójú HTML-elemet,
 * majd egy kattintási eseménykezelőt rendel hozzá.
 *
 * Ha a felhasználó rákattint a gombra,
 * meghívódik a toggleStageDirections() függvény.
 *
 * Itt nem írunk zárójeleket a függvény neve után,
 * mert a függvényt átadjuk eseménykezelőként,
 * nem pedig azonnal végrehajtjuk.
 */
document.getElementById('toggle-stagedir-button')
    .addEventListener('click', toggleStageDirections);