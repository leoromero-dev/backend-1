import fs from 'node:fs';

class ProductManager {
  constructor (path) {
    this.path = path;
    this.productList = [];
  }

  async getProductList() {
    const list = await fs.promises.readFile(this.path, 'utf-8')
    this.productList = [...JSON.parse(list).data];
    return [...this.productList]
  }

  async getProductById(id) {
    await this.getProductList();
    return this.productList.find(product => product.id === id);
  }

  async updateProduct(product) {
    await this.getProductList();
    const newProductList = this.productList.map(item => {
      if (item.id === product.id) {
        return {
          ...item,
          ...product,
          id: product.id,
        }
      }
      return item;
    })

    await fs.promises.writeFile(this.path, JSON.stringify({ data: newProductList }))
  }

  async addProduct(product) {
    this.productList = await this.getProductList();
    const ids = this.productList.flatMap(product => product.id);
    const largestNumber = ids.length ? Math.max(...ids) : 0;
    
    const newProduct = {
      ...product,
      id: largestNumber + 1,
    }
    this.productList.push(newProduct);
    
    await fs.promises.writeFile(this.path, JSON.stringify({ data: this.productList }))
  }

  async deleteProductById(id) {
    this.productList = await this.getProductList();
    const newProductList = this.productList.filter(product => product.id !== id);

    await fs.promises.writeFile(this.path, JSON.stringify({ data: newProductList }))
  }
}

export default ProductManager;