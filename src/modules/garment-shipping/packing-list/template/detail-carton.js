import { inject, bindable, computedFrom } from 'aurelia-framework'


export class Detail {
    @bindable selectedRO;
    constructor() {
        
    }
    sizesColumns = [
        { header: "Size" },
        { header: "Quantity" },
    ];
    

    toggle() {
        if (!this.isShowing)
          this.isShowing = true;
        else
          this.isShowing = !this.isShowing;
      }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };

        this.isShowing = true;
        
        if(this.data.sizes){
            if(this.data.sizes.length>0){
                this.isShowing = true;
            }
        }
    }


    get addSizes() {
        return (event) => {
            this.data.sizes.push({});
        };
    }

    get removeSizes() {
        return (event) => {
            this.error = null;
     };
    }

    get totalQuantity(){
        if(this.data.cartonQuantity && this.data.quantityPCS){
            this.data.totalQuantity=this.data.cartonQuantity*this.data.quantityPCS;
            return this.data.totalQuantity;
        }
        else
            return 0;
    }

    get cartonQuantity(){
        this.data.cartonQuantity=0;
        if(this.data.carton1 && this.data.carton2){
            this.data.cartonQuantity = this.data.carton2-this.data.carton1+1;
        }
        return this.data.cartonQuantity;
    }

    get totalQtySize(){
        var qtytot=0;
        if(this.data.sizes){
            for(var size of this.data.sizes){
                if(size.quantity){
                    qtytot+=size.quantity;
                }
            }
        }
        return qtytot;
    }
}