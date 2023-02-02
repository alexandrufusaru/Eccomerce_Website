if (document.readyState == 'loading') { // daca pagina se incarca
    document.addEventListener('DOMContentLoaded', ready)  // se trece la functie cand a ajut loc incarcarea
}
else {  // daca este deja incarcata
    ready()  // se trece la functie
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('buton_stergere')
    console.log(removeCartItemButtons)

    for (var i = 0; i < removeCartItemButtons.length; i++) { //ia fiecare buton de stergere
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cantitate-produs')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartbuttons = document.getElementsByClassName('buton-cumpara')
    for (var i = 0; i < addToCartbuttons.length; i++) {
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('buton-cumpara-definitiv')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Multumim pentru achizitia ta')
    var cartItems = document.getElementsByClassName('toate_liniile_produse')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
   // updateCartSubotal()
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove()
   // updateCartSubotal()
    updateCartTotal()
}

function quantityChanged() {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
   // updateCartSubotal()
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('nume-produs')[0].innerText
    var price = shopItem.getElementsByClassName('pret-produs-sus')[0].innerText
 //   var quantity = shopItem.getElementsByClassName('cantitate-produs')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('imagine-produs')[0].src

 //   var subtotal = quantity * price;

    console.log(title, price, imageSrc)
    addItemtoCart(title, price, imageSrc)
 //   updateCartSubotal()
    updateCartTotal()
}

// cea mai grea functie
function addItemtoCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('linie_produs')
    //   cartRow.innerText = title
    var cartItems = document.getElementsByClassName('toate-liniile-produse')[0]

    var cartRowContents = ` <td><a class="buton_stergere"><i class="fas fa-times-circle"></i></a></td>
                            <td><img src="${imageSrc}"/></td>
                            <td>${title}</td>
                            <td class="pret-produs">${price}</td>
                            <td><input class="cantitate-produs" type="number" value="1" /></td>
                          `
    cartRow.innerHTML = cartRowContents
    var cartItems = document.getElementsByClassName('toate_liniile_produse')[0]
    cartItems.append(cartRow) // ne pune linia noua la finalul tabelului
    cartRow.getElementsByClassName('buton_stergere')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cantitate-produs')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('toate_liniile_produse')[0] //doar primul element(doar o linie produs)
    var cartRows = cartItemContainer.getElementsByClassName('linie_produs');
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('pret-produs')[0]
        var quantityElement = cartRow.getElementsByClassName('cantitate-produs')[0]
        //console.log(priceElement, quantityElement);
        var price = parseFloat(priceElement.innerText.replace(' lei', '')) // transformam in float textul din element(fara  lei) 
        var quantity = quantityElement.value
        //console.log(price * quantity)
        total = total + (price * quantity)
    }
    document.getElementsByClassName('pret-total-cart')[0].innerText = total + ' lei'
    document.getElementsByClassName('pret-total-cart')[1].innerText = total + ' lei'
}