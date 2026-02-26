Różnice między metodami jQuery:

różnica między append() a prepend()

append() - dodawanie na końcu


JAVASCRIPT:


dodawanie elementu na koniec listy:

$('#shoppingList').append('<li>Nowy element</li>');


przykład:

Przed: [Mleko, Chleb, Masło]
Po:    [Mleko, Chleb, Masło, Nowy element]


prepend() - dodawanie na początku

dodawanie elementu na poczatek listy:

$('#shoppingList').prepend('<li>Nowy element</li>');


przykład:
Przed: [Mleko, Chleb, Masło]
Po:    [Nowy element, Mleko, Chleb, Masło]


podsumowanie: 

Metoda append() — Wrzuca element na sam koniec listy. 

Metoda prepend() — Wpycha element na samą górę, przed wszystkie inne. 


Różnica między remove() a empty()


remove() — Usuwanie elementu
Metoda ta służy do całkowitego wyrzucenia elementu z drzewa DOM.

JAVASCRIPT:

$('#shoppingList li:last').remove();

Efekt: Usuwa wybrany element oraz wszystkie jego elementy potomne.

Wynik: Element fizycznie znika z kodu strony, a liczba elementów na liście się zmniejsza.

Przykład:
Przed: <ul><li>Mleko</li><li>Chleb</li><li>Masło</li></ul>
Po: <ul><li>Mleko</li><li>Chleb</li></ul>

empty() — Usuwanie zawartości
Metoda ta czyści wnętrze elementu, ale sam tag pozostaje na stronie.

$('#shoppingList').empty();
Efekt: usuwa tekst znajdujący się wewnątrz.

Wynik: Sam kontener (np. lista <ul>) pozostaje w kodzie jako pusty znacznik.

Przykład:
Przed: <ul><li>Mleko</li><li>Chleb</li><li>Masło</li></ul>
Po: <ul></ul>


Różnica między text() a html()


text() — Tekst bezpieczny

Służy do pracy z czystą treścią. Wszystko, co przekażesz, zostanie potraktowane jako zwykły napis.

JAVASCRIPT:

$('li').text('Mleko & <strong>Chleb</strong>');
Działanie: Automatycznie zamienia znaki specjalne na tekst, co blokuje interpretację tagów przez przeglądarkę.

Bezpieczeństwo: Jest to najbezpieczniejsza metoda przy wyświetlaniu danych pochodzących od użytkowników.

Wynik w DOM: <li>Mleko &amp; &lt;strong&gt;Chleb&lt;/strong&gt;</li>

html() — Kod HTML
Służy do wstawiania fragmentów kodu, które przeglądarka ma wyrenderować (np. pogrubienie, linki).

JAVASCRIPT:

$('li').html('Mleko & <strong>Chleb</strong>');
Działanie: Interpretuje przekazane tagi jako prawdziwy kod HTML.

Zagrożenie: Może być niebezpieczne, jeśli wstawiana treść nie jest zaufana, ponieważ pozwala na wykonanie złośliwych skryptów.

Wynik w DOM: <li>Mleko & <strong>Chleb</strong></li>

Szybkie zestawienie
Dodawanie
.append() — Wrzuca element na sam koniec listy.

.prepend() — Wpycha element na samą górę, przed wszystkie inne.

Usuwanie
.remove() — Usuwa element całkowicie (znikają tagi i środek).

.empty() — Czyści tylko to, co jest w środku (tagi zostają puste).

Zawartość
.text() — Wyświetla wszystko dosłownie (bezpieczne dla danych użytkownika).

.html() — Interpretuje tagi HTML (do stosowania przy zaufanych szablonach).
