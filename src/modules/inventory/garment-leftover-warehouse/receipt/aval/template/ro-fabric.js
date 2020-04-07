import { inject, bindable, computedFrom } from 'aurelia-framework'
import { GarmentProductionService } from '../service';

@inject(GarmentProductionService)
export class ro {
    @bindable selectedRO;

    get roLoader() {
        return (keyword) => {
            var info = {
              keyword: keyword,
              filter: JSON.stringify({UnitId: this.data.UnitId, "GarmentAvalProductItem.Any(IsReceived==false)":true})
            };
            return this.garmentProductionService.getAvalProduct(info)
                .then((result) => {
                    var roList=[];
                        for(var a of result.data){
                            if(roList.length==0){
                                roList.push(a);
                            }
                            else{
                                var dup= roList.find(d=>d.RONo==a.RONo);
                                if(!dup){
                                    roList.push(a);
                                }
                            }
                            
                        }
                        return roList;
                    
                });
        }
    }

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    // @computedFrom("data.Quantity", "data.Conversion")
    // get convertedQuantity() {
    //     return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data.Size){
            this.selectedSize = this.data.Size;
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly
        };
        console.log(context)
    }

    async selectedROChanged(newValue) {
        if (newValue) {
            console.log(newValue)
            Promise.resolve(this.garmentProductionService.getAvalProduct({ filter: JSON.stringify({UnitId: this.data.UnitId, "GarmentAvalProductItem.Any(IsReceived==false)":true})}))
            .then(result => {
                for(var avalProduct of result.data){
                    for(var avalProductItem of avalProduct.Items){
                        if(avalProductItem.IsReceived==false){
                            var item={};
                            item.Product=avalProductItem.Product;
                            item.Quantity=avalProductItem.Quantity;
                            item.Uom=avalProductItem.Uom;
                            this.data.FabricItems.push(item);
                        }
                    }
                }
                
            });
        } else {
            this.data.FabricItems.splice(0);
        }
    }
    

    sizeView = (size) => {
        return `${size.Size}`;
    }

    fabricColumns = [
        "Kode Barang" ,
        "Keterangan" ,
        "Jumlah Aval" ,
        "Satuan" ,
    ]
}