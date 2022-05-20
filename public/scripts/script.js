
// function checkfunction() {
//     var check1 = document.getElementById("check1");
//     var check2 = document.getElementById("check2");
//     var check3 = document.getElementById("check3");
//     var check4 = document.getElementById("check4");
//     var start = document.getElementById("start");
//     var main = document.getElementById("main");
//     var dessert = document.getElementById("dessert");
//     var drinks = document.getElementById("drinks");
//     if (check1.checked == true) {
//         start.style.display = "flex";
//     } else if (check1.checked == false) {
//         start.style.display = "none";

//     }

//     if (check2.checked == true) {
//         main.style.display = "flex";

//     } else if (check2.checked == false) {
//         main.style.display = "none";

//     }

//     if (check3.checked == true) {
//         dessert.style.display = "flex";

//     } else if (check3.checked == false) {
//         dessert.style.display = "none";

//     }

//     if (check4.checked == true) {
//         drinks.style.display = "flex";

//     } else if (check4.checked == false) {
//         drinks.style.display = "none";

//     }


// }
window.onload = () => {

    var loginForm = document.querySelector('.cart-con');

    document.querySelector('#cart-btn').onclick = () => {
        loginForm.classList.toggle('active');
    }
    document.querySelector('#close-cart-btn').onclick = () => {
        loginForm.classList.remove('active');
    }






    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }

    function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', (event) => addToCartClicked(event))
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }

    function purchaseClicked() {
        alert('Thank you for your purchase')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement;
        // console.log(shopItem);

        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        addItemToCart(title, price, imageSrc)
        updateCartTotal()
    }

    function addItemToCart(title, price, imageSrc) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart' + title)
                return
            }
        }
        var cartRowContents = `
        <form action="/menu/add" method="post">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <input name="ordered_item" class="cart-item-title" type="text" value="${title}" readonly>
            
        </div>
        <input name="price" class="cart-price cart-column" readonly type="text" value="${price}">
        <div class="cart-quantity cart-column">
            <input name="quantity" class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>
        </div>`

        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            console.log(priceElement)
            var price = parseFloat(priceElement.value.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }

        console.log(total)

        parseInt(total = Math.round(total * 100) / 100)
        console.log(total)
        document.getElementsByClassName('cart-total-price')[0].value = '$' + total
    }
}