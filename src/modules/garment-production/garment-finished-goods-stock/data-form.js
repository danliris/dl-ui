import { bindable } from 'aurelia-framework';

export class DataForm {
  @bindable title;
  @bindable readOnly;


  constructor() {
    this.formOptions = {
      cancelText: 'Kembali',
      saveText: 'Simpan'
    };
  }

  controlOptions = {
    label: {
      align: 'right',
      length: 4
    },
    control: {
      length: 5
    }
  };

  items = {
    columns: [
      'Colour',
      'Size',
      'Stock Quantity',
      'Action'
    ]
  };

  bind(context) {
    this.context = context;
    this.data = this.context.data || {};
    this.error = this.context.error || {};

    this.data.Items = Array.isArray(this.data.Items)
      ? this.data.Items
      : [];
    this.data.Items.forEach(item => {
      if (!Array.isArray(item.Details)) {
        const currentQuantity =
          item.Quantity != null
            ? parseFloat(item.Quantity) || 0
            : parseFloat(item.StockQuantity) || 0;

        const originalQuantity =
          item.OriginalQuantity != null
            ? parseFloat(item.OriginalQuantity) || 0
            : parseFloat(item.StockQuantity) || currentQuantity;

        item.Details = [{
          Id: item.Id || null,
          SourceId: item.SourceId || item.Id || null,
          FinishedGoodStockNo: item.FinishedGoodStockNo,
          Colour: item.Colour || '',
          Quantity: currentQuantity,
          Box: item.Box || '',
          Rack: item.Rack || '',
          StockQuantity: originalQuantity,
          IsSplitChild: !!item.IsSplitChild
        }];
      }
      item.IsShowing = !!item.IsShowing;
    });

    this.cancelCallback = this.context.cancelCallback;
    this.saveCallback = this.context.saveCallback;

    this.isItems = this.data.Items.length > 0;

    this.itemOptions = {
      datas: this.data,
      readOnly: !!this.readOnly,
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      isEdit: this.context.isEdit || this.data.isEdit
    };
  }

  // get totalSplitQuantity() {
  //   if (!this.data || !Array.isArray(this.data.Items)) {
  //     return 0;
  //   }

  //   return this.data.Items.reduce((grandTotal, item) => {
  //     const detailTotal = Array.isArray(item.Details)
  //       ? item.Details.reduce((subTotal, detail) => {
  //           return subTotal + (parseFloat(detail.Quantity) || 0);
  //         }, 0)
  //       : 0;

  //     return grandTotal + detailTotal;
  //   }, 0);
  // }
}
