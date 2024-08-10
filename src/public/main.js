document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');

            fetch(`/api/carts/66b3aa40659a6d2ef63dd8fb/product/${productId}`, {
                method: 'POST'
            })
                .then(response => response.json())
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.delete-from-cart');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');

            fetch(`/api/carts/66b3aa40659a6d2ef63dd8fb/product/${productId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => {
                    location.reload();
                });
        });
    });
});