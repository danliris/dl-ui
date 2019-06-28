export class Item {
    itemsColumns = [
        "Kode Barang",
        "Keterangan",
        "Jumlah Preparing",
        "Jumlah Preparing Out",
        "Satuan Barang",
        "Jumlah Potong",
        "Satuan Potong",
    ];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.readOnly = this.options.readOnly || this.data.IsDisabled;

        this.FC = context.context.options.FC;
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }
}