class buttonsData {
    static defaultSort= 'span.active_option:has-text("Name (A to Z)")' 
    static productSort= '[data-test=product_sort_container]'
    static addedToCart= 'span.shopping_cart_badge'
    static shoppingCart= 'a.shopping_cart_link'
    static addToCart = 'button.btn.btn_primary.btn_small.btn_inventory:nth-of-type'
    static removeFromCart= 'button.btn.btn_secondary.btn_small.btn_inventory:has-text("Remove")'
}
export {buttonsData}

class loginData {
    static homeURL= 'https://www.saucedemo.com/'
    static loginData= 'standard_user'
    static loginButton= '#login-button'  
    static pageURL= 'inventory.html'
    static passwordField= '#password'
    static passwordData= 'secret_sauce'
    static usernameField= '#user-name'
}
export {loginData}

class productsData {
    static productContainer= '#inventory_container.inventory_container'
}
export {productsData}

class hamburgerMenu {
    static allItems= '#inventory_sidebar_link'
    static aboutOpen= 'a#about_sidebar_link.bm-item.menu-item'
    static logOut= '#logout_sidebar_link' 
    static menuButton= '#react-burger-menu-btn'
    static menuOpen=  '#menu_button_container div.bm-menu-wrap'
    static menuExit= '#react-burger-cross-btn'
    static restet= '#reset_sidebar_link'
}
export {hamburgerMenu}

class cartData {
    static continueShpButton= '#continue-shopping'
    static checkoutButton= '#checkout'
    static placeholderFirstName= '#first-name'
    static placeholderLastName= '#last-name'
    static placeholderZipCpde= '#postal-code'
    static cancelButton= '#cancel'
    static continueButton= '#continue'
    static nameData= 'TestName'
    static surnameData= 'TestSurname'
    static zipData= '71-472'
    static productQuantity= 'cart_quantity:has-text("1")'
    static productPrice= 'inventory_item_price'
    static totalPrice= 'summary_subtotal_label'
    static finishButton= '#finish'
    static backHomeBtn= '#back-to-products'
}
export {cartData}


