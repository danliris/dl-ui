export class Item {
  constructor() {}

  activate(context) {
    this.data = context.data;
    if (context.context.options) {
      this.readOnly = context.context.options.readOnly;
    }

    // console.log(context);
  }
}
