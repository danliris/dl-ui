export class Item {
    activate(context) {
        this.context = context;
        this.data = context.data || {};
        this.error = context.error || {};
        this.options = context.options || {};
        this.readOnly = !!this.options.readOnly;

        this.data.Rows = Array.isArray(this.data.Rows)
            ? this.data.Rows
            : [];

        this.detailOptions = Object.assign({}, this.options, {
            readOnly: this.readOnly
        });

        this.isShowing = !!this.data.IsShowing;
        this.showPartialColumns = this.data.Rows.some(row => row && row.ShowPartialColumns);
        this.detailOptions = Object.assign({}, this.options, {
            readOnly: this.readOnly,
            showPartialColumns: this.showPartialColumns
        });

        this.detailsColumns = this.showPartialColumns
            ? [
                'SIZE',
                'QTY PL',
                'SUDAH KELUAR',
                'SISA PL',
                'QTY STOCK',
                'QTY AMBIL',
                'WARNA',
                'KODE GUDANG',
                'AREA',
                'KODE LINE',
                'KODE PALLET'
            ]
            : [
                'SIZE',
                'QTY PL',
                'QTY STOCK',
                'QTY AMBIL',
                'WARNA',
                'KODE GUDANG',
                'AREA',
                'KODE LINE',
                'KODE PALLET'
            ];
    }

    toggle() {
        this.isShowing = !this.isShowing;
        this.data.IsShowing = this.isShowing;
    }
}
