import { inject, bindable} from "aurelia-framework";
import { Router } from 'aurelia-router';
import { Service } from "./service";

var TrackLoader = require("../../../loader/track-loader");



@inject(Router, Service)
export class DataForm {
  @bindable data = {};
    @bindable error = {};
    @bindable item;
    @bindable barcode;

    item;
    barcode;
    qtyFg;
    
    indexSource = 0;
    hasFocus = true;
 // @bindable selectedWarehouse;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }


  sumTotalQty;
  sumLength;
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };
  //destinationAreas = ["INSPECTION MATERIAL", "SHIPPING", "PACKING", "TRANSIT"];

  
  types = [ "STOCK OPNAME"];


  

  // bind(context) {
  //   this.context = context;
  //   this.data = this.context.data;
  //   this.data.area = "GUDANG JADI";
  //   this.data.type = "STOCK OPNAME";
  //   this.data.destinationArea = "GUDANG JADI";
  //   this.error = this.context.error;
  //   this.cancelCallback = this.context.cancelCallback;
  //   this.deleteCallback = this.context.deleteCallback;
  //   this.editCallback = this.context.editCallback;
  //   this.saveCallback = this.context.saveCallback;

   
  //   this.detailOptions = {
  //     isEdit: this.isEdit,
  //     readOnly: this.readOnly,
    
  //   };

  //   if (this.readOnly) {
  //     this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "Jenis", "QTY Pack",  "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  //   } else {
  //     this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "Jenis", "QTY Pack",  "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  //   }

  //   if (this.data.type == "STOCK OPNAME") {
  //     if (this.data.warehousesProductionOrders) {
      
  //      this.data.warehousesProductionOrders = this.data.warehousesProductionOrders;
  //     }
  //   } 
    

  //   if (this.ItemsCollection) {
  //     this.ItemsCollection.bind();
  //   }

  // }

  async attached() {
    console.log(this.data.items);
    if (this.data.items != undefined) {
        this.makeTotal(this.data.items);
    } else {
        this.sumTotalQty = 2;
        this.sumLength = 0;
    }
  }

  async barcodeChoose(e) {

    var itemData = e.target.value;

    console.log(itemData);

    if(itemData && itemData.length >= 13) {
        let args = {
          itemData : e.target.value,
        };
        console.log(args);

      var temp = await this.service.getByCode(args);
      console.log(temp);
      
      if(temp != undefined) {
        if(Object.getOwnPropertyNames(temp).length > 0) {
          var temp1 = temp[0];
          temp1.sendquantity = 1;
          console.log(this.data);
          console.log(temp1);
          var data = this.data.items.find((x) => x.productPackingCode === temp1.productPackingCode);
          console.log(data);
          if(!data) {
            this.data.items.push(temp1);
            
          } else {
            data.sendquantity++;
            this.qtyChange(data.productPackingCode, data.sendquantity);

          }
          this.makeTotal(this.data.items);
        }
      }

      this.barcode = "";
    }

  }

    async qtyChange(code, qty, length) {
      var barcode = code;
      var quantity = qty;
      var packingLength = 0;
      //this.price = 0;
      console.log(quantity);
      if (quantity != undefined) {
          // var fgTemp = await this.service.getByCode(code);
          // var fg = fgTemp[0];
          // this.price = fg.domesticSale;
          // var newItem = {};
          console.log(this.data.items);
          var _data = this.data.items.find((item) => item.productPackingCode === barcode);


          if (_data) {
              this.packingLength = parseInt(_data.sendquantity) * this.packingLength
              _data.packingLength = parseFloat(this.packingLength);
          }
      }
      this.makeTotal(this.data.items);
    }

  makeTotal(items) {
      this.sumTotalQty = 0;
      this.sumLength = 0;

      console.log(items);
      if (Object.getOwnPropertyNames(items).length > 0) {
          for (var i = 0; i < items.length; i++) {
              // console.log(items[i].item.domesticCOGS);
              this.sumTotalQty += parseInt(items[i].sendquantity);
              console.log(this.sumTotalQty);
              this.sumLength += (parseInt(items[i].sendquantity) * items[i].packagingLength);
          }
      } 
  }

  removeItem(item) {
    var itemIndex = this.data.items.indexOf(item);

    console.log(this.data);
    this.data.items.splice(itemIndex, 1);
    // if(this.error)
    //   this.error.items.splice(itemIndex, 1);
    this.makeTotal(this.data.items);
  }

  get trackLoader(){
    return TrackLoader;
  }

  trackView = (track) => {
    console.log(track);
    return `${track.Type} - ${track.Name}`
  }

  // @bindable selectedTrack;
  //   selectedTrackChanged(newValue) {
  //       console.log(newValue);
  //       console.log(this.selectedTrack);
  //       if (this.selectedTrack) {
  //           this.data.items = {};
  //           this.data.items.trackId = newValue.Id;
  //           this.data.items.trackType = newValue.Type;
  //           this.data.items.trackName = newValue.Name;

            
  //       }
        // else {
        //     this.data.productionOrder = {};
        // }
    //}

}
