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

export class ObjectKeysValueConverter {
  toView(obj) {
    // Create a temporary array to populate with object keys
    let temp = [];

    // A basic for..in loop to get object properties
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop) && prop.toLowerCase() !== "layoutorder") {
        temp.push(obj[prop]);
      }
    }

    return temp;
  }
}
