
export class Item {

    constructor() {
        
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        this.data.Details= this.data.items;
        console.log(context.context.options)
        if(context.context.options){
            this.IDR= context.context.options.IDR;
            this.rate= context.context.options.rate;
            this.sameCurrency= context.context.options.SameCurrency;
            if(this.IDR){
                this.data.payToSupplierIDR=this.data.payToSupplier * this.rate;
                this.data.currencyIDR="IDR";
            }
        }
        
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

}
