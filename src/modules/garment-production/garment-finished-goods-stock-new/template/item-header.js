export class ItemHeader {
  activate(context) {
    this.context = context;
    this.columns = context.columns || this.columns || [];
    this.options = context.options || {};
    this.readOnly = !!this.options.readOnly;
  }
}
