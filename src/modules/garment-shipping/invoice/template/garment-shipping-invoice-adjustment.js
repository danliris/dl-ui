export class GarmentShippingInvoiceAdjustments {
 
  controlOptions = {
    control: {
        length: 12
    }
};

constructor(dialog, service, serviceCore) {
    this.dialog = dialog;
    this.service = service;
 
}

    activate(context) {
      this.context = context;
      this.saveAll=false;
      this.data = context.data;
      this.error = context.error;
      this.options = this.context.context.options;
      this.readOnly = this.options.isView;
    }
  }