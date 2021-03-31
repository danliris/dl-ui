export class ItemFooter {
  activate(context) {
    this.context = context;
    console.log(context);
  }

  get getTotal() {
    var total = 0
    if (this.context.items) {
      this.context.items.map(item => {
        if (item.data.items.CurrencyRate && item.data.items.debitNominal) {
          total = (item.data.items.debitNominal * item.data.items.CurrencyRate) + total;
        }
      });
    }
    return total;
  }
}
