
//Locators
export class hamburgerMenu {
    static allItems= '#inventory_sidebar_link'
    static aboutOpen= 'a#about_sidebar_link.bm-item.menu-item'
    static logOut= '#logout_sidebar_link' 
    static menuButton= '#react-burger-menu-btn'
    static menuOpen=  '#menu_button_container div.bm-menu-wrap'
    static menuExit= '#react-burger-cross-btn'
    static restet= '#reset_sidebar_link'
}

export class buttonsData {
    static defaultSort= 'span.active_option:has-text("Name (A to Z)")' 
    static productSort= '[data-test=product_sort_container]'
    static addedToCart= 'span.shopping_cart_badge'
    static shoppingCart= 'a.shopping_cart_link'
    static addToCart = 'button.btn.btn_primary.btn_small.btn_inventory:nth-of-type'
}

export class productsData {
    static productContainer= '#inventory_container.inventory_container'
}

//Actions

