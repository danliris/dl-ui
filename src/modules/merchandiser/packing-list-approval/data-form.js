import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service,SalesService } from "./service";

@inject(Service,SalesService)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;

    constructor(service,salesService) {
        this.service = service;
        this.salesService = salesService;
    }

    formOptions = {
        cancelText: "Back"
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
        // if (tab != 2) {
        //     this.context.saveCallback=null;
        //     this.context.cancelCallback=null;
        //     this.context.deleteCallback=null;
        //     this.context.editCallback=null;
        // }
        // else{
        //     this.context.saveCallback=this.save;
        //     this.context.cancelCallback=this.cancel;
        //     this.context.deleteCallback=this.delete;
        //     this.context.editCallback=this.edit;
        // }
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Agent" },
        { header: "Buyer Brand" },
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price FOB" },
        { header: "Price CMT" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
    ]

    viewItemsColumns = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Agent" },
        { header: "Buyer Brand" },
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    measureColumns = [
        { header: "No", value: "MeasurementIndex" },
        { header: "Length" },
        { header: "Width" },
        { header: "Height" },
        { header: "Qty Cartons" },
        { header: "CBM" },
    ]

    PackingTypeOptions = ["EXPORT", "RE EXPORT"];
    InvoiceTypeOptions = ["DL", "SM"];
    ShipmentModeOptions = ["Air", "Sea", "Courier", "Sea-Air"];

    get say() {
        var number = this.data.totalCartons;

        const first = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
        const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
        const mad = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
            let tempNumber = number % (100 * Math.pow(1000, i));
            if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
                if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                    word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
                } else {
                    word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
                }
            }

            tempNumber = number % (Math.pow(1000, i + 1));
            if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
                word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hundred ' + word;
        }
        return word.toUpperCase();
    }

    shippingStaffView = (data) => {
        return `${data.Name || data.name}`
    }

   async bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.delete = this.context.deleteCallback;
        this.edit = this.context.editCallback;
        this.Items = this.data.items;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }

        this.data.items = this.Items;
        for(var item of this.data.items){
            var selectField = ["Id"];
            var ccgResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: item.roNo }), select : selectField });
            
            if(ccgResult.data.length>0){
                var ccg= await this.salesService.getCostCalculationById(ccgResult.data[0].Id);
                var isFabricCM=false;
                
                for(var material of ccg.CostCalculationGarment_Materials){
                    if(material.isFabricCM){
                        isFabricCM=true;break;
                    }
                }
                var fob=0;
                for(var material of ccg.CostCalculationGarment_Materials){
                    if(material.isFabricCM){
                        fob+=parseFloat((material.CM_Price*1.05/ccg.Rate.Value).toFixed(2));
                    }
                }
                if(isFabricCM){
                    item.priceCMT=parseFloat(ccg.ConfirmPrice.toFixed(2));
                    item.priceFOB=parseFloat((ccg.ConfirmPrice+fob).toFixed(2));
                }
                else{
                    item.priceCMT=0;
                    item.priceFOB=parseFloat(ccg.ConfirmPrice.toFixed(2));
                }
            }
        }

        this.data.sayUnit = this.data.sayUnit || "CARTON";

        this.shippingMarkImageSrc = this.data.shippingMarkImageFile || this.noImage;
        this.sideMarkImageSrc = this.data.sideMarkImageFile || this.noImage;
        this.remarkImageSrc = this.data.remarkImageFile || this.noImage;
    }

    get totalCBM() {
        var total = 0;
        if (this.data.measurements) {
            for (var m of this.data.measurements) {
                if (m.length && m.width && m.height && m.cartonsQuantity) {
                    total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
                }
            }
        }
        return total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    }

    get totalCartons() {
      let result = 0;
      if (this.data.items) {
        for (var item of this.data.items) {
          if (item.details) {
            const newDetails = item.details.map(d => {
              return {
                carton1: d.carton1,
                carton2: d.carton2,
                cartonQuantity: d.cartonQuantity,
                index: d.index
              };
            }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);

            for (var detail of newDetails) {
              const cartonExist = false;
              const indexItem = this.data.items.indexOf(item);
              if (indexItem > 0) {
                for (let i = 0; i < indexItem; i++) {
                  const item =  this.data.items[i];
                  for (const prevDetail of item.details) {
                    if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                      cartonExist = true;
                      break;
                    }
                  }
                }
              }
              if (!cartonExist) {
                result += detail.cartonQuantity;
              }
            }
          }
        }
        this.data.totalCartons = result;
        return this.data.totalCartons;
      }
    }

    get totalQuantities() {
        let quantities = [];
        let result = [];
        let units = [];
        if (this.data.items) {
            var no = 1;
            for (var item of this.data.items) {
                let unit = "";
                if(item.uom) {
                    unit = item.uom.unit || item.uom.Unit;
                }
                // if (item.quantity && quantities.findIndex(c => c.roNo == item.roNo && c.unit == unit) < 0) {
                    quantities.push({ no: no, roNo: item.roNo, unit: unit, quantityTotal: item.quantity });
                    if(units.findIndex(u => u.unit == unit) < 0) {
                        units.push({ unit: unit });
                    // }
                }
                no++;
                
            }
        }
        for (var u of units) {
            let countableQuantities = 0;
            for (var q of quantities) {
                if (q.unit == u.unit) {
                    countableQuantities += q.quantityTotal;
                }
            }
            result.push(countableQuantities + " " + u.unit);
        }
        return result.join(" / ");
    }
}
