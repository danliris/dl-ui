export class ItemFooter {
  activate(context) {
    this.context = context;
    this.data = this.context.data;
  }  

  get getValueReqReal() {

    var res = this.context.options.Status_ReqReal;

    return res;
  }

  get getAmountVB() {
    var res = this.context.options.Amount_Request;

    return res;
  }

  get getAmountVAT() {
    var res = this.context.options.Amount_Vat;

    return res;
  }
}
