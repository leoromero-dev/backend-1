const socket = io();

function formatPrice(number) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(number);
}
socket.on('original-product-list', (products) => {
    const productsList = document.querySelector('#products-list');
    productsList.innerHTML = ''
    if (products.length > 0) {
        products.forEach(product => {
            const listItem = document.createElement('li');
            const name = document.createElement('h2');
            const price = document.createElement('p');
            name.innerText = product.id + ' - ' + product.title;
            price.innerText = formatPrice(product.price);
            listItem.id = product.id;
            listItem.appendChild(name);
            listItem.appendChild(price);
            productsList.appendChild(listItem);
        })
    } else if (products.length === 0) {
        const emptyState = document.createElement('li');
        emptyState.innerText = 'No hay productos disponibles.';
        emptyState.classList.add('empty-state');
        productsList.appendChild(emptyState);
    }
})

socket.on('product-deleted', (id, isEmpty) => {
    const productsList = document.querySelector('#products-list');
    if (isEmpty) {
        const emptyState = document.createElement('li');
        emptyState.innerText = 'No hay productos disponibles.';
        emptyState.classList.add('empty-state');
        productsList.appendChild(emptyState);
    }
    productsList.removeChild(document.getElementById(id));
})

socket.on('product-added', (productName, productPrice) => {
    const productsList = document.querySelector('#products-list');
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        productsList.removeChild(emptyState);
    }
    const product = document.createElement('li');
    const name = document.createElement('h2');
    const price = document.createElement('p');
    name.innerText = productName;
    price.innerText = formatPrice(productPrice);
    product.appendChild(name);
    product.appendChild(price);
    productsList.appendChild(product);
})