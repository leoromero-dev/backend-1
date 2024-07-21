import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import handlebars from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

function formatPrice(number) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(number);
}

export const hbs = handlebars.create({
    helpers: {
        formatPrice,
    }
});