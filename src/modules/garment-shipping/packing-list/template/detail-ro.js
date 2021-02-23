import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");

@inject(SalesService)
export class Item {
    @bindable selectedRO;
    @bindable avG_GW;
    @bindable avG_NW;

    constructor(salesService) {
        this.salesService = salesService;
    }

    get filter() {
        var filter = {
            BuyerCode: this.data.BuyerCodeFilter,
            Section: this.data.SectionFilter,
            "SCGarmentId!=null": true
        };
        return filter;
    }

    detailsColumns = [
        { header: "Carton 1" },
        { header: "Carton 2" },
        { header: "Style" },
        { header: "Colour" },
        { header: "Jml Carton" },
        { header: "Qty" },
        { header: "Total Qty" },
        { header: "GW" },
        { header: "NW" },
        { header: "NNW" },
        { header: "" },
    ];

    get roLoader() {
        return CostCalculationLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
    }

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
            isEdit: this.isEdit,
            header: context.context.options.header,
            item: this.data
        };
        if (this.data.roNo) {
            this.selectedRO = {
                RO_Number: this.data.RONo || this.data.roNo
            };
        }
        this.isShowing = false;
        if (this.data.details) {
            if (this.data.details.length > 0) {
                this.isShowing = true;
            }
        }
        
        console.log(this.context)
    }

    selectedROChanged(newValue) {
        if (newValue) {
            this.salesService.getCostCalculationById(newValue.Id)
                .then(result => {
                    this.salesService.getSalesContractById(result.SCGarmentId)
                        .then(sc => {
                            this.data.roNo = result.RO_Number;
                            this.data.article = result.Article;
                            this.data.buyerBrand = result.BuyerBrand;
                            this.data.unit = result.Unit;
                            this.data.uom = result.UOM;
                            this.data.valas = "USD";
                            this.data.quantity = result.Quantity;
                            this.data.scNo = sc.SalesContractNo;
                            //this.data.amount=sc.Amount;
                            this.data.price = sc.Price;
                            this.data.priceRO = sc.Price;
                            this.data.comodity = result.Comodity;
                            this.data.amount = sc.Amount;
                        })
                });
        }
    }

    get addDetails() {
        return (event) => {
            const i = this.context.context.items.indexOf(this.context);

            let lastDetail;
            if (this.data.details.length > 0) {
                lastDetail = this.data.details[this.data.details.length - 1];
            } else if (i > 0) {
                const lastItem = this.context.context.items[i - 1];
                lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
            }

            this.data.details.push({
                carton1: lastDetail ? lastDetail.carton2 + 1 : 0,
                sizes: []
            });
        };
    }

    get removeDetails() {
        return (event) => {
            this.error = null;
            const gw = this.sumSubTotal(0);
            const nw = this.sumSubTotal(1);
            const nnw = this.sumSubTotal(2);
            this.context.context.options.header.grossWeight = gw;
            this.context.context.options.header.nettWeight = nw;
            this.context.context.options.header.netNetWeight = nnw;
            this.data.subGrossWeight = gw;
            this.data.subNetWeight = nw;
            this.data.subNetNetWeight = nnw;
        };
    }

    get totalQty() {
        let qty = 0;
        if (this.data.details) {
            for (var detail of this.data.details) {
                if (detail.cartonQuantity && detail.quantityPCS) {
                    qty += detail.cartonQuantity * detail.quantityPCS;
                }
            }
        }
        return qty;
    }

    get totalCtn() {
        let qty = 0;
        if (this.data.details) {
            for (var detail of this.data.details) {
                if (detail.cartonQuantity) {
                    qty += detail.cartonQuantity;
                }
            }
        }
        return qty;
    }

    get amount() {
        this.data.amount = 0;
        if (this.data.quantity && this.data.price) {
            this.data.amount = this.data.quantity * this.data.price
        }
        return this.data.amount;
    }

    get subGrossWeight() {
      return this.sumSubTotal(0);
    }

    get subNetWeight() {
      return this.sumSubTotal(1);
    }

    get subNetNetWeight() {
      return this.sumSubTotal(2);
    }

    sumSubTotal(opt) {
      let result = 0;
      const newDetails = this.data.details.map(d => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight
        };
      }).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2) === index);
      for (const detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.context.context.options.header.items.indexOf(this.data);
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.context.context.options.header.items[i];
            for (const prevDetail of item.details) {
              if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2) {
                cartonExist = true;
                break;
              }
            }
          }
        }
        if (!cartonExist) {
          switch (opt) {
            case 0:
              result += detail.grossWeight * detail.cartonQuantity;
              break;
            case 1:
              result += detail.netWeight * detail.cartonQuantity;
              break;
            case 2:
              result += detail.netNetWeight * detail.cartonQuantity;
              break;
          }
        }
      }
      return result;
    }
}
