export class Item {
  fabricColumns = [
    { header: "Kode Barang" },
    { header: "Nomor BC" },
    { header: "Tanggal BC" },
    { header: "Tipe BC" },
    { header: "Qty" },
    { header: "Satuan" },
  ];

  // constructor(coreService) {
  //     this.coreService = coreService;
  // }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.context.options;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.readOnly = context.context.options.readOnly;

    // this.itemOptions = {
    //     error: this.error,
    //     isCreate: this.isCreate,
    //     // readOnly: this.readOnly,
    //     // isEdit: this.isEdit,
    // };
    // this.isShowing = false;
    // if(this.data.Details){
    //     if(this.data.Details.length>0){
    //         this.isShowing = true;
    //     }
    // }
    // if(this.isCreate == true){
    //     this.itemsColumns = this.itemsColumnsCreate;
    // }
  }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce(
      (acc, curr) => acc && curr.data.IsSave,
      true
    );
  }
}
