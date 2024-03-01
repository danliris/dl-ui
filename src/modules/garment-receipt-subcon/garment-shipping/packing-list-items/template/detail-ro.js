import { inject, bindable, computedFrom } from "aurelia-framework";
import {
  Service,
  SalesService,
  GarmentProductionService,
  CoreService,
} from "../service";
var CostCalculationLoader = require("../../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../../loader/uom-loader");
var UnitLoader = require("../../../../../loader/unit-loader");
var SampleRequestLoader = require("../../../../../loader/garment-sample-request-loader");

@inject(Service, SalesService, GarmentProductionService, CoreService)
export class Item {
  @bindable selectedPackingOut;
  @bindable uom;

  constructor(service, salesService, garmentProductionService, coreService) {
    this.service = service;
    this.salesService = salesService;
    this.garmentProductionService = garmentProductionService;
    this.coreService = coreService;
  }

  detailsColumns = [
    { header: "Index" },
    { header: "Carton 1" },
    { header: "Carton 2" },
    { header: "Style" },
    // { header: "Colour" },
    { header: "Jml Carton" },
    { header: "Qty" },
    { header: "Total Qty" },
    { header: "GW" },
    { header: "NW" },
    { header: "NNW" },
    { header: "" },
  ];

  PackingOutView = (no) => {
    return `${no.PackingOutNo}`;
  };

  get packingOutLoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          IsReceived: false,
        }),
      };

      return this.garmentProductionService
        .searchPackingOutByNo(info)
        .then((result) => {
          var noList = [];
          for (var a of result.data) {
            var dup = noList.find((d) => d.PackingOutNo == a.PackingOutNo);
            if (!dup) {
              var selected = this.items.find(
                (x) => x.data.packingOutNo == a.PackingOutNo
              );

              if (!selected) {
                noList.push(a);
              }
            }
          }

          return noList;
        });
    };
  }

  get uomLoader() {
    return UomLoader;
  }

  uomView = (uom) => {
    return `${uom.Unit || uom.unit}`;
  };

  get unitLoader() {
    return UnitLoader;
  }

  get unitFilter() {
    return {
      '(Code == "C2A" || Code == "C2B" || Code == "C2C" || Code == "C1A" || Code == "C1B")': true,
    };
  }

  unitView = (unit) => {
    return `${unit.Code || unit.code}`;
  };

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.items = context.context.items;
    this.readOnly = this.options.readOnly;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;

    this.itemOptions = {
      error: this.error,
      isCreate: this.isCreate,
      readOnly: this.readOnly,
      isEdit: this.isEdit,
      header: context.context.options.header,
      item: this.data,
    };
    if (this.data.packingOutNo) {
      this.selectedPackingOut = {
        PackingOutNo: this.data.packingOutNo,
      };
      this.uom = this.data.uom;
    }

    this.isShowing = false;
    if (this.error && this.error.Details && this.error.Details.length > 0) {
      this.isShowing = true;
    }
  }

  selectedPackingOutChanged(newValue) {
    if (newValue) {
      this.data.packingOutNo = newValue.PackingOutNo;
      this.data.totalQuantityPackingOut = newValue.TotalQuantity;

      console.log(this.data.IdNo);

      this.salesService.getCostCalculationByRO(newValue.RONo).then((result) => {
        this.salesService
          .getSalesContractById(result.SCGarmentId)
          .then((sc) => {
            // this.salesService
            //   .getPreSalesContractById(result.PreSCId)
            // this.service
            // .searchLocalSalesNoteById(this.data.IdNo)
            // .then((psc) => {
            this.data.roNo = result.RO_Number;
            this.data.article = result.Article;
            this.data.marketingName = result.MarketingName;
            this.data.buyerAgent = result.Buyer;
            this.data.buyerBrand = result.BuyerBrand;
            this.data.sectionName = result.SectionName;
            // this.data.section = {
            //   id: psc.SectionId,
            //   code: result.Section,
            // };
            this.data.comodityDescription = (result.Comodity || {}).Name;
            this.data.unit = result.Unit;
            this.data.uom = result.UOM;
            this.uom = result.UOM;
            this.data.valas = "IDR";
            this.data.quantity = result.Quantity;
            this.data.scNo = sc.SalesContractNo;
            //this.data.amount=sc.Amount;
            let avgPrice = 0;
            if (sc) {
              avgPrice = sc.Amount / sc.Quantity;
            }
            // else {
            //   avgPrice = psc.price;
            // }
            this.data.price = avgPrice;
            this.data.priceRO = avgPrice;
            this.data.comodity = result.Comodity;
            this.data.amount =
              this.data.totalQuantityPackingOut * this.data.priceRO;
            //sc.Amount;

            this.context.context.options.header.section = this.data.section;
          });
      });
      // });
    }
  }

  sumSubTotal(opt) {
    let result = 0;
    const newDetails = this.data.details
      .map((d) => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight,
          index: d.index,
        };
      })
      .filter(
        (value, i, self) =>
          self.findIndex(
            (f) =>
              value.carton1 == f.carton1 &&
              value.carton2 == f.carton2 &&
              value.index == f.index
          ) === i
      );
    for (const detail of newDetails) {
      const cartonExist = false;
      const indexItem = this.context.context.options.header.items.indexOf(
        this.data
      );
      if (indexItem > 0) {
        for (let i = 0; i < indexItem; i++) {
          const item = this.context.context.options.header.items[i];
          for (const prevDetail of item.details) {
            if (
              detail.carton1 == prevDetail.carton1 &&
              detail.carton2 == prevDetail.carton2 &&
              detail.index == prevDetail.index
            ) {
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

  get subGrossWeight() {
    return this.sumSubTotal(0);
    //return (this.data.details || []).reduce((acc, cur) => acc += (cur.grossWeight * cur.cartonQuantity), 0);
  }

  get subNetWeight() {
    return this.sumSubTotal(1);
    // return (this.data.details || []).reduce((acc, cur) => acc += cur.netWeight, 0);
  }

  get subNetNetWeight() {
    return this.sumSubTotal(2);
    //  return (this.data.details || []).reduce((acc, cur) => acc += cur.netNetWeight, 0);
  }

  get addDetails() {
    return (event) => {
      const i = this.context.context.items.indexOf(this.context);
      let lastIndex;

      let lastDetail;
      if (this.data.details.length > 0) {
        lastDetail = this.data.details[this.data.details.length - 1];
        lastIndex = this.data.details[this.data.details.length - 1].index;
      } else if (i > 0) {
        const lastItem = this.context.context.items[i - 1];
        lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
      }

      this.data.details.push({
        carton1: lastDetail ? lastDetail.carton2 + 1 : 0,
        index: lastIndex ? lastIndex : 1,
        style: lastDetail ? lastDetail.style : "",
        // colour: lastDetail ? lastDetail.colour : "",
        sizes: [],
        packingOutNo: this.data.packingOutNo,
      });
    };
  }

  get removeDetails() {
    return (event) => {
      this.error = null;
      this.updateTotalSummary();
      this.updateMeasurements();
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
      const newDetails = this.data.details
        .map((d) => {
          return {
            carton1: d.carton1,
            carton2: d.carton2,
            cartonQuantity: d.cartonQuantity,
            grossWeight: d.grossWeight,
            netWeight: d.netWeight,
            netNetWeight: d.netNetWeight,
            index: d.index,
          };
        })
        .filter(
          (value, i, self) =>
            self.findIndex(
              (f) =>
                value.carton1 == f.carton1 &&
                value.carton2 == f.carton2 &&
                value.index == f.index
            ) === i
        );
      for (var detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.context.context.options.header.items.indexOf(
          this.data
        );
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.context.context.options.header.items[i];
            for (const prevDetail of item.details) {
              if (
                detail.carton1 == prevDetail.carton1 &&
                detail.carton2 == prevDetail.carton2 &&
                detail.index == prevDetail.index
              ) {
                cartonExist = true;
                break;
              }
            }
          }
        }
        if (!cartonExist) {
          qty += detail.cartonQuantity;
        }
      }
    }
    return qty;
  }

  get amount() {
    this.data.amount = 0;
    if (this.data.totalQuantityPackingOut && this.data.priceRO) {
      this.data.amount = this.data.totalQuantityPackingOut * this.data.priceRO;
    }
    return this.data.amount;
  }

  updateTotalSummary() {
    this.context.context.options.header.grossWeight = 0;
    this.context.context.options.header.nettWeight = 0;
    this.context.context.options.header.netNetWeight = 0;

    this.data.subGrossWeight = this.sumSubTotal(0);
    this.data.subNetWeight = this.sumSubTotal(1);
    this.data.subNetNetWeight = this.sumSubTotal(2);

    for (const item of this.context.context.options.header.items) {
      this.context.context.options.header.grossWeight +=
        item.subGrossWeight || 0;
      this.context.context.options.header.nettWeight += item.subNetWeight || 0;
      this.context.context.options.header.netNetWeight +=
        item.subNetNetWeight || 0;
    }
  }

  // indexChanged(newValue) {
  //   this.data.details[this.data.details.length - 1].index = newValue;
  // }

  uomChanged(newValue) {
    if (newValue) {
      this.data.uom = newValue;
      this.uom = newValue;
    }
  }
}
