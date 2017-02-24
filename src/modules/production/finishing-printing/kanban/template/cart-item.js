export class CartItem {
  activate(context) {
    this.cart = context.data;
    this.error = context.error;
    this.options = context.options;
  } 

  controlOptions = {
    control: {
      length: 12
    }
  };
}