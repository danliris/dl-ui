export class ItemView {

    constructor() {
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        if (context.context.options) {
            this.IDR = context.context.options.IDR;
            this.rate = context.context.options.rate;
            this.sameCurrency = context.context.options.SameCurrency;
            if (this.IDR) {
                this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
                this.data.CurrencyIDR = "IDR";
            }
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }
}
