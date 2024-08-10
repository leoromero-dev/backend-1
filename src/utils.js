import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import handlebars from 'express-handlebars';
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
        equal: function (a, b) { return a === b; },
        greaterThan: function (a, b) { return a > b; },
        lessThan: function (a, b) { return a < b; },
        add: function (a, b) { return a + b; },
        subtract: function (a, b) { return a - b; },
        range: function (start, end) {
            const range = [];
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            return range;
        }
    }
});