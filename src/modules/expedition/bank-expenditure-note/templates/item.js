const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

export class Item {

    constructor() {
        this.queryUPO = { position: 1 };

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        this.data.TotalPaidIDR = 0;
        if (context.context.options) {
            this.IDR = context.context.options.IDR;
            this.rate = context.context.options.rate;
            this.sameCurrency = context.context.options.SameCurrency;
            if (this.IDR) {
                this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
                this.data.CurrencyIDR = "IDR";
            }

            let listURNNo = [];
            for (let item of this.data.Items) {
                if (item.URNNo != null)
                    listURNNo.push(item.URNNo);
            }

            this.listURNNo = listURNNo.length != 0 ? listURNNo.join('\n') : listURNNo;
        }

        console.log(context);
    }

    // activate(context) {
    //     this.data = context.data
    //     this.isShowing = false;
    //     this.data.TotalPaidIDR = 0;
    //     if (context.context.options) {
    //         this.IDR = context.context.options.IDR;
    //         this.rate = context.context.options.rate;
    //         this.sameCurrency = context.context.options.SameCurrency;
    //         if (this.IDR) {
    //             this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
    //             this.data.CurrencyIDR = "IDR";
    //         }
    //     }

    //     console.log(context);
    // }

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