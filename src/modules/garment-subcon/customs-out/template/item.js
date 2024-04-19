export class Item {
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;

    this.readOnly = context.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.readOnly = context.context.options.readOnly;
    this.selectedSubconCategory =
      context.context.options.selectedSubconCategory;

    console.log("dataItem", this.selectedSubconCategory);
    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      isEdit: this.isEdit,
      readOnly: this.readOnly,
    };
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  itemsColumns = ["Kode Barang", "Nama Barang", "Jumlah", "Satuan"];

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }
}
