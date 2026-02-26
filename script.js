$(document).ready(function() {
    const $shoppingList = $('#shoppingList');
    const $productInput = $('#productInput');
    const $filterInput = $('#filterInput');

    initializeList();

    // dodawanie produktów
    // dodawanie po kliknięciu przycisku
    $('#addBtn').click(function(e) {
        console.log('Kliknięto dodaj');
        addProduct();
    });

    // dodawanie produktu po naciśnięciu enteru w inpucie
    $productInput.keydown(function(e) {
        console.log('Keydown event:', e.keyCode, e.key);
        if (e.keyCode === 13 || e.key === 'Enter') { // Enter
            console.log('Enter naciśnięty');
            addProduct();
            return false;
        }
    });

    function addProduct() {
        let productName = $productInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        // tworzenie elementu z listą animacji
        let $newItem = $('<li></li>')
            .addClass('list-group-item')
            .text(productName)
            .hide()
            .appendTo($shoppingList);

        // dodawanie animacji
        $newItem.fadeIn(300);

        // usunięcie inputa
        $productInput.val('').focus();

        // dodawanie eventu do nowego elementu
        attachItemEvents($newItem);
        
        reinitDragDrop();
    }

    // usuwanie produktów

    // usuwanie ostatniego produktu
    $('#removeLastBtn').click(function() {
        let $lastItem = $shoppingList.find('li:last');
        if ($lastItem.length) {
            $lastItem.fadeOut(300, function() {
                $(this).remove();
                reinitDragDrop();
            });
        }
    });

    // usunięcie całej listy
    $('#clearBtn').click(function() {
        if (confirm('Czy na pewno chcesz usunąć wszystkie elementy?')) {
            $shoppingList.fadeOut(400, function() {
                $shoppingList.empty().fadeIn(300);
                reinitDragDrop();
            });
        }
    });

        // manipulacja strukturą

    // dodawanie na początku
    $('#prependBtn').click(function() {
        let productName = $productInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        let $newItem = $('<li></li>')
            .addClass('list-group-item')
            .text(productName)
            .hide()
            .prependTo($shoppingList);

        $newItem.fadeIn(300);
        $productInput.val('').focus();
        attachItemEvents($newItem);
        reinitDragDrop();
    });

    // dodawanie na końcu
    $('#appendBtn').click(function() {
        let productName = $productInput.val().trim();
        
        if (productName === '') {
            alert('Proszę wpisać nazwę produktu!');
            return;
        }

        let $newItem = $('<li></li>')
            .addClass('list-group-item')
            .text(productName)
            .hide()
            .appendTo($shoppingList);

        $newItem.fadeIn(300);
        $productInput.val('').focus();
        attachItemEvents($newItem);
        reinitDragDrop();
    });

    // przywracanie listy
    $('#restoreBtn').click(function() {
        if (confirm('Czy chcesz przywrócić listę do stanu domyślnego?')) {
            $shoppingList.fadeOut(400, function() {
                $(this).html(`
                    <li class="list-group-item">Mleko</li>
                    <li class="list-group-item">Chleb</li>
                    <li class="list-group-item">Masło</li>
                    <li class="list-group-item">Jajka</li>
                    <li class="list-group-item">Ser</li>
                `);
                
                // dodawanie eventu listenery do wszystkich elementów
                $shoppingList.find('li').each(function() {
                    attachItemEvents($(this));
                });
                
                $shoppingList.fadeIn(300);
                reinitDragDrop();
            });
        }
    });

    // edycja dynamiczna

    function attachItemEvents($item) {
        $item.off('click').on('click', function(e) {
            // nie edytuj ponownie jesli kliknieto input
            if ($(e.target).is('input')) return;

            editItem($(this));
        });
    }

    function editItem($item) {
        // pokazywanie efektu wizualnego
        $item.fadeOut(300, function() {
            let currentText = $(this).text();
            
            // zamienienie elementu na input
            let $input = $('<input>').addClass('edit-input').val(currentText);
            $(this).text('');
            $(this).append($input);

            // animacja fade-in
            $(this).fadeIn(300, function() {
                $input.focus().select();

                // zapisywanie zmian po kliknieciu enter
                $input.keydown(function(e) {
                    if (e.which === 13 || e.key === 'Enter') { 
                        saveEdit($item);
                        return false;
                    }
                });
                // zapisywanie zmian bez klikania enter
                $(document).on('click.edititem', function(e) {
                    if (!$(e.target).is($input)) {
                        saveEdit($item);
                        $(document).off('click.edititem');
                    }
                });
            });
        });
    }

    function saveEdit($item) {
        let $input = $item.find('input.edit-input');
        let newText = $input.val().trim();

        if (newText === '') {
            newText = $input.data('oldText') || 'Bez nazwy';
        }

        $item.fadeOut(300, function() {
            // usuwanie inputu i wstawianie nowego tekstu
            $(this).html(newText);
            $(this).fadeIn(300);
        });

        $(document).off('click.edititem');
    }

    // dodawanie atrybutów i klas

    // dodawanie klasy active po kliknięciu
    $(document).on('click', '.list-group-item', function(e) {
        if (!$(e.target).is('input')) {
            $(this).toggleClass('active');
        }
    });

    // kolorowanie co drugiego elementu
    $('#colorBtn').click(function() {
        $shoppingList.find('li').each(function(index) {
            if (index % 2 === 0) { // parzyste indeksy 
                $(this).toggleClass('even-colored');
            }
        });
    });

    // zaawansowane operacje

    // sortowanie alfabetyczne
    $('#sortBtn').click(function() {
        let $items = $shoppingList.find('li').get(); // pobieranie danych z listy
        
        // sortowanie elementów alfabetycznie
        $items.sort(function(a, b) {
            let aText = $(a).text().toLowerCase();
            let bText = $(b).text().toLowerCase();
            
            if (aText < bText) return -1;
            if (aText > bText) return 1;
            return 0;
        });

        // wstawianie posortowanych elementów z animacją
        $shoppingList.fadeOut(400, function() {
            $shoppingList.empty();
            
            $(this).find(function() {
                // dodawanie posortowanych elementów
            }).each(function() {
                $(this).appendTo($shoppingList);
            });

            // prawidłowe wstawianie
            $.each($items, function(_, item) {
                $shoppingList.append(item);
            });

            $shoppingList.fadeIn(300);
            reinitDragDrop();
        });
    });

    // filtrowanie

    $('#filterBtn').click(function() {
        performFilter();
    });

    $('#filterInput').keydown(function(e) {
        if (e.which === 13 || e.key === 'Enter') { 
            performFilter();
            return false;
        }
    });

    $('#clearFilterBtn').click(function() {
        $filterInput.val('');
        $shoppingList.find('li').show();
        $filterInput.focus();
    });

    function performFilter() {
        let filterText = $filterInput.val().toLowerCase().trim();

        if (filterText === '') {
            $shoppingList.find('li').show();
            return;
        }

        $shoppingList.find('li').each(function() {
            let itemText = $(this).text().toLowerCase();
            
            if (itemText.includes(filterText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // przesuwanie elementów myszką (drag & drop)

    function initDragDrop() {
        $shoppingList.sortable({
            items: 'li',
            placeholder: 'ui-sortable-placeholder',
            opacity: 0.7,
            cursor: 'move',
            start: function(event, ui) {
                ui.item.addClass('ui-sortable-active');
            },
            stop: function(event, ui) {
                ui.item.removeClass('ui-sortable-active');
            }
        });
    }

    function reinitDragDrop() {
        $shoppingList.sortable('destroy');
        initDragDrop();
    }

    // obsługa myszką
    
    // funkcja dla kliknięcia
    $shoppingList.find('li').each(function() {
        attachItemEvents($(this));
    });
});
