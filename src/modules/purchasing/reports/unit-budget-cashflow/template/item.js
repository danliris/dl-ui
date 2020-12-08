export class Item {
  constructor() {}

  activate(context) {
    this.data = context.data;
    this.isObject = typeof context.data === "object" ? true : false;

    if (context.context.options) {
      this.readOnly = context.context.options.readOnly;
    }

    // console.log(context);
  }
}
