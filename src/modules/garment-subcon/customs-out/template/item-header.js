export class ItemHeader {

  activate(context) {
    this.context = context;
    this.data = context.items;
    this.error = context.error;
    this.options = this.context.options;
    var count = 0;
    if (this.data.length > 0) {
      for (var item of this.data) {
        if (item.data.IsSave == true) {
          count = count + 1;
        }
      }
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  changeCheckedAll() {
    this.data
      .forEach(item => {
        item.data.IsSave = (this.options.checkedAll === true);
      });
  }
}