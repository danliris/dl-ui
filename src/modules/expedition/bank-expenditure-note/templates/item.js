const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

export class Item {

    constructor() {
        this.queryUPO = { position: 1 };

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }
}
