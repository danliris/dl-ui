
var ProductLoader = require('../../../../../loader/product-azure-loader');

export class CartItem {
    activate(context) {
        this.context = context;
        this.Input = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    get productLoader() {
        return ProductLoader;
    }

    productView = (product) => {
        return `${product.Code} - ${product.Name}`
    }
}