import fs from 'node:fs';

class CartManager {
  constructor (path) {
    this.path = path;
    this.cartList = [];
  }

  async createCart() {
    await this.getCartList();

    this.cartList.push({
      id: this.cartList.length + 1,
      products: []
    });

    await fs.promises.writeFile(this.path, JSON.stringify({ data: [...this.cartList] }))
  }

  async getCartList() {
    const list = await fs.promises.readFile(this.path, 'utf-8')
    this.cartList = [...JSON.parse(list).data];
    return [...this.cartList]
  }

  async getCartById(id) {
    await this.getCartList();
    return this.cartList.find(cart => cart.id === id);
  }

  async addProductToCart(productId, cartId) {
    const updatedCart = this.cartList.map(cart => {
      if (cart.id !== +cartId) return cart;

      const productIndex = cart.products.findIndex(product => product.id === productId);

      if (productIndex === -1) {
        cart.products.push({ id: productId, quantity: 1 })
        return cart;
      }

      cart.products[productIndex] = { ...cart.products[productIndex], quantity: cart.products[productIndex].quantity + 1 }
      return cart;
    })

    await fs.promises.writeFile(this.path, JSON.stringify({ data: [...updatedCart] }))
  }
}

export default CartManager;