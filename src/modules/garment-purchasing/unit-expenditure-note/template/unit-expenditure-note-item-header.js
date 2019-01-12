export class UnitDeliveryOrderItemHeader {

  activate(context) {
    this.context = context;
    this.data = context.data;
    // this.error = context.error;
    this.saveAll=false;
    this.options = context.options;
    var count = 0;
    this.readOnly = (this.options.readOnly === 'true')
    this.isUseIncomeTax = this.options.isUseIncomeTax || false;
    for(var item of this.context.items){
      if(item.data.isSave==true){
        count++;
      }
    }
    if(count>0){
      this.saveAll=true;
    }
  }
  

  saveAllChanged(e) {
    for(var a of this.context.items){
      if(this.saveAll)
        a.data.IsSave=true;
      else
        a.data.IsSave=false;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}