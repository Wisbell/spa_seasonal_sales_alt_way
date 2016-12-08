'use strict'

// Store the products/department information globally, so it can be accessed
var productsList;
var departments;


function loadProducts(event) {
    console.log("loadProducts function called!")

    productsList = JSON.parse(event.target.responseText);
}


function loadDepartments(event) {
    console.log("loadDepartments function called!")

    departments = JSON.parse(event.target.responseText);

    displayMain();
}


function addSeasonOptions(){
    document.getElementById('seasonDiscounts').innerHTML = `<option>No Discount</option>
                                                            <option>Autumn</option>
                                                            <option>Winter</option>
                                                            <option>Spring</option>`
}


function displayProducts() {
    console.log("displayProducts function called")
    /*Product
        product name
    Price
        price here
    Department
        department here*/

    var productsDiv = document.querySelector('#products')

    for (var i = 0; i < productsList.products.length ; i++) {

        productsDiv.insertAdjacentHTML('beforeend', `<div class="product ${getSeasonDiscountClass(productsList.products[i].category_id)}">
                                                        <h2>Product</h2>
                                                        <p>${productsList.products[i].name}</p>
                                                        <h2>Price</h2>
                                                        <p class="price">${productsList.products[i].price}</p>
                                                        <h2>Department</h2>
                                                        <p>${getDepartmentName(productsList.products[i].category_id)}</p>
                                                    </div>`)
    }
}


function getSeasonDiscountClass (currentProductNumber) {
    if (currentProductNumber === departments.categories[0].id) {
        return departments.categories[0].season_discount
    }
    else if (currentProductNumber === departments.categories[1].id) {
        return departments.categories[1].season_discount
    }
    else if (currentProductNumber === departments.categories[2].id) {
        return departments.categories[2].season_discount
    }
}


function getDepartmentName(currentProductNumber){

    // check category id in products to the id of category in departments

    //console.log(departments.categories, "department")
    if (currentProductNumber === departments.categories[0].id) {
        return departments.categories[0].name
    }
    else if (currentProductNumber === departments.categories[1].id) {
        return departments.categories[1].name
    }
    else if (currentProductNumber === departments.categories[2].id) {
        return departments.categories[2].name
    }
    else {
        return "None"
    }

}


// reset prices when select option is changed
function resetPrices () {
    document.getElementById('products').innerHTML = '';
    displayProducts();
}


// Add all display functions in to a main function to display all at once
function displayMain(){

    addSeasonOptions()
    displayProducts()
}


// Apply discounts when select option is changed
function seasonDiscounts(event){
    console.log("seasonDiscounts function called")

    //console.log("event", event)

    var discountSelected = document.getElementById("seasonDiscounts").value;  // .selectedIndex?

    console.log(discountSelected);

    // This function will prevent applying multiply discounts if the option is switched multiply times
    resetPrices();

    if (discountSelected === "Winter") {

        var winterItems = document.querySelectorAll(".Winter")

        for(var i = 0; i < winterItems.length; i++){
            var discount = (((winterItems[i].querySelector('.price').innerText * 100) * .1)/100);
            winterItems[i].querySelector('.price').innerText = (winterItems[i].querySelector('.price').innerText - discount).toFixed(2);
        }
    } else if (discountSelected === "Autumn") {
         var autumnItems = document.querySelectorAll(".Autumn")

        for(var i = 0; i < autumnItems.length; i++){
            var discount = (((autumnItems[i].querySelector('.price').innerText * 100) * .3)/100);
            autumnItems[i].querySelector('.price').innerText = (autumnItems[i].querySelector('.price').innerText - discount).toFixed(2);
        }
    } else if (discountSelected === "Spring") {
         var springItems = document.querySelectorAll(".Spring")

        for(var i = 0; i < springItems.length; i++){
            var discount = (((springItems[i].querySelector('.price').innerText * 100) * .15)/100);
            springItems[i].querySelector('.price').innerText = (springItems[i].querySelector('.price').innerText - discount).toFixed(2);
        }
    } else {
        console.log("return prices to normal")

        resetPrices();
    }
}


// Event listener for select dropdown
document.getElementById("seasonDiscounts").addEventListener('change', seasonDiscounts);





// XMLHTTP requests - get the json files

var requestProducts = new XMLHttpRequest();

requestProducts.addEventListener("load", loadProducts);
requestProducts.open("GET", "products.json");
requestProducts.send();

var requestDepartments = new XMLHttpRequest();

requestDepartments.addEventListener("load", loadDepartments);
requestDepartments.open("GET", "categories.json");
requestDepartments.send();
