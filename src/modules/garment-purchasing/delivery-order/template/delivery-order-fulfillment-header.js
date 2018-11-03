export class DeliveryOrderItemHeader {

  activate(context) {
    this.context = context;
    this.saveAll=false;
    this.data = context.items;
    this.error = context.error;
    this.options = this.context.options;
    this.useVat = this.options.useVat || false;
    for(var data of this.data){
      if(data.data.isSave)
        this.saveAll=true;
    }
  }

  saveAllChanged(e) {
    for(var a of this.context.items){
      if(this.saveAll)
        a.data.isSave=true;
      else
        a.data.isSave=false;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}