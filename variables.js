class loginData {

static homeURL= 'https://www.saucedemo.com/'
static pageURL= 'inventory.html'
static usernameField= '#user-name'
static passwordField= '#password'
static loginData= 'standard_user'
static passwordData= 'secret_sauce'
static loginButton= '#login-button'
}
export {loginData}

class buttonsData {
    static productSort= '[data-test=product_sort_container]'
    static defaultSort= 'span.active_option:has-text("Name (A to Z)")'
}
export {buttonsData}

class productsData {
    static productContainer= '#inventory_container.inventory_container'
}
export {productsData}