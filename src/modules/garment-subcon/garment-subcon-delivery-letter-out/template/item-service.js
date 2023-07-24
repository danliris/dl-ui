import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, CoreService, PurchasingService } from "../service";

const SubconCuttingLoader = require("../../../../loader/garment-service-subcon-cutting-loader");
const SubconSewingLoader = require("../../../../loader/garment-service-subcon-sewing-loader");
const SubconFabricLoader = require("../../../../loader/garment-service-subcon-fabric-loader");
const SubconShrinkageLoader = require("../../../../loader/garment-service-subcon-shrinkage-loader");
const SubconExpenditureGoodLoader = require("../../../../loader/garment-service-subcon-expenditure-good-loader");
const UENLoader = require("../../../../loader/garment-unit-expenditure-note-loader");

@inject(Service, CoreService, PurchasingService)
export class Item {
  @bindable selectedSubconSewing;
  @bindable selectedSubconCutting;
  @bindable selectedSubconShrinkage;
  @bindable selectedSubconFabric;
  @bindable selectedSubconExpenditure;
  @bindable selectedRO;
  @bindable selectedUENAcc;

  constructor(service, coreService, purchasingService) {
    this.service = service;
    this.coreService = coreService;
    this.purchasingService = purchasingService;
  }

  detailColumns = [
    "Warna",
    "Design Warna",
    "Unit",
    "Jumlah",
    "Satuan",
    "Keterangan",
  ];

  detailColumnsServiceComponent = [
    "Kode Barang",
    "Nama Barang",
    "Keterangan Barang",
    "Design/Color",
    "Jumlah",
    "Satuan",
    "Tipe Fabric",
    "Jumlah Keluar",
    "Satuan Keluar",
  ];

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.itemOptions = context.context.options;
    this.isCreate = this.itemOptions.isCreate;
    this.isEdit = this.itemOptions.isEdit;
    this.isSubconCutting = this.itemOptions.isSubconCutting;
    this.isSubconSewing = this.itemOptions.isSubconSewing;
    this.isSubconExpenditure = this.itemOptions.isSubconExpenditure;
    this.subconCategory = this.itemOptions.subconCategory;
    this.ContractNo = this.itemOptions.ContractNo;
    this.HeaderId = this.itemOptions.HeaderId;
    if (this.data.Details) {
      if (this.data.Details.length > 0) {
        this.isShowing = true;
      }
    }
    if (this.data) {
      if (this.isSubconCutting) {
        this.selectedSubconCutting = {
          SubconNo: this.data.SubconNo,
          Id: this.data.SubconId,
        };

        if (this.data.Id) {
          var subcon = await this.service.readServiceSubconCuttingById(
            this.data.SubconId
          );
          this.data.date = subcon.SubconDate;
          this.data.unit = subcon.Unit.Code;
          this.data.subconType = subcon.SubconType;
        }
      }
      if (this.data.Details) {
        if (this.data.Details.length > 0)
          this.selectedUENAcc = {
            UENNo: this.data.Details[0].UENNo,
            Id: this.data.Details[0].Id,
          };
      }
      // else if(this.subconCategory=="SUBCON JASA GARMENT WASH"){
      //     this.selectedSubconSewing={
      //         ServiceSubconSewingNo: this.data.SubconNo,
      //         Id:this.data.SubconId
      //     };
      //     if(this.data.Id){
      //         var subcon = await this.service.readServiceSubconSewingById(this.data.SubconId);
      //         this.data.date=subcon.ServiceSubconSewingDate;
      //     }
      // }
      else if (this.isSubconSewing) {
        this.selectedSubconSewing = {
          ServiceSubconSewingNo: this.data.SubconNo,
          Id: this.data.SubconId,
        };
        if (this.data.Id) {
          var subcon = await this.service.readServiceSubconSewingById(
            this.data.SubconId
          );
          this.data.date = subcon.ServiceSubconSewingDate;
          this.data.Details = subcon.Items;
          for (var item of subcon.Items) {
            this.data.RONo = item.RONo;
            this.data.Article = item.Article;
            this.data.Comodity =
              item.Comodity.Code + " - " + item.Comodity.Name;
            this.data.Buyer = item.Buyer.Code + " - " + item.Buyer.Name;
            this.data.Details = item.Details;
          }
        }
      } else if (this.subconCategory == "SUBCON BB SHRINKAGE/PANEL") {
        this.selectedSubconShrinkage = {
          ServiceSubconShrinkagePanelNo: this.data.SubconNo,
          Id: this.data.SubconId,
        };
        if (this.data.Id) {
          var subcon = await this.service.readServiceSubconShrinkageById(
            this.data.SubconId
          );
          this.data.date = subcon.ServiceSubconShrinkagePanelDate;
        }
      } else if (this.subconCategory == "SUBCON BB FABRIC WASH/PRINT") {
        this.selectedSubconFabric = {
          ServiceSubconFabricWashNo: this.data.SubconNo,
          Id: this.data.SubconId,
        };
        if (this.data.Id) {
          var subcon = await this.service.readServiceSubconFabricById(
            this.data.SubconId
          );
          this.data.date = subcon.ServiceSubconFabricWashDate;
        }
      } else if (this.isSubconExpenditure) {
        this.selectedSubconExpenditure = {
          ServiceSubconExpenditureGoodNo: this.data.SubconNo,
          Id: this.data.SubconId,
        };
        if (this.data.Id) {
          var subcon = await this.service.readServiceSubconExpenditureGoodById(
            this.data.SubconId
          );
          this.data.date = subcon.ServiceSubconExpenditureGoodDate;
        }
      }
    }
    // this.isShowing = false;
    // console.log(context);
  }

  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`;
  };

  get uenLoader() {
    return UENLoader;
  }

  get UENFilterAcc() {
    var UENFilter = {};
    if (this.data.DLType == "PROSES") {
      UENFilter = {
        IsPreparing: false,
        ExpenditureType: "SUBCON",
        StorageName: "GUDANG ACCESSORIES",
      };
    } else {
      UENFilter = {
        ExpenditureType: "SUBCON",
        StorageName: "GUDANG ACCESSORIES",
      };
    }

    return UENFilter;
  }

  uenView = (uen) => {
    return `${uen.UENNo}`;
  };

  get filter() {
    var filter = {
      IsUsed: false,
    };
    for (var item of this.context.context.items) {
      if (this.isSubconCutting) {
        filter[`SubconNo == "${item.data.SubconNo}"`] = false;
      } else if (this.isSubconSewing) {
        filter[`ServiceSubconSewingNo == "${item.data.SubconNo}"`] = false;
        // filter[`ServiceSubconSewingNo == "${item.data.SubconNo}"`]=false;
      } else if (this.subconCategory == "SUBCON BB SHRINKAGE/PANEL") {
        filter[
          `ServiceSubconShrinkagePanelNo == "${item.data.SubconNo}"`
        ] = false;
      } else if (this.subconCategory == "SUBCON BB FABRIC WASH/PRINT") {
        filter[`ServiceSubconFabricWashNo == "${item.data.SubconNo}"`] = false;
      } else if (this.isSubconExpenditure) {
        filter[
          `ServiceSubconExpenditureGoodNo == "${item.data.SubconNo}"`
        ] = false;
      }
    }
    return filter;
  }

  get subconCuttingLoader() {
    return SubconCuttingLoader;
  }

  get subconSewingLoader() {
    return SubconSewingLoader;
  }

  get subconExpenditureGoodLoader() {
    return SubconExpenditureGoodLoader;
  }

  get subconFabricLoader() {
    return SubconFabricLoader;
  }

  get subconShrinkageLoader() {
    return SubconShrinkageLoader;
  }

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  selectedROChanged(newValue) {
    if (newValue) {
      this.data.RONo = newValue.RONo;
    } else {
      this.data.RONo = "";
      this.data.SubconId = null;
      this.data.SubconNo = "";
      this.selectedSubconSewing = null;
      this.data.Details.splice(0);
    }
  }

  async selectedSubconExpenditureChanged(newValue) {
    this.data.date = null;
    this.data.SubconId = null;
    this.data.SubconNo = "";
    this.data.QtyPacking = 0;
    this.data.UomSatuanUnit = "";
    this.data.NettWeight = 0;
    this.data.GrossWeight = 0;
    this.data.Quantity = 0;
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.ServiceSubconExpenditureGoodNo;
      this.data.date = newValue.ServiceSubconExpenditureGoodDate;
      this.data.NettWeight = newValue.NettWeight;
      this.data.GrossWeight = newValue.GrossWeight;
      this.data.QtyPacking = newValue.QtyPacking;
      this.data.Quantity = newValue.TotalQuantity;
      this.data.UomSatuanUnit = newValue.UomUnit;
    }
  }

  async selectedSubconSewingChanged(newValue) {
    this.data.date = null;
    this.data.unit = "";
    this.data.SubconId = null;
    this.data.SubconNo = "";
    this.data.Quantity = 0;
    this.data.Article = "";
    this.data.RONo = "";
    this.data.Buyer = "";
    this.data.Comodity = "";
    this.data.QtyPacking = 0;
    this.data.UomSatuanUnit = "";

    if (this.data.Details.length > 0) {
      this.data.Details.splice(0);
    }
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.ServiceSubconSewingNo;
      var subcon = await this.service.readServiceSubconSewingById(
        this.data.SubconId
      );
      this.data.date = subcon.ServiceSubconSewingDate;
      //this.data.unit=subcon.Unit.Code;
      this.data.Details = subcon.Items;
      for (var item of subcon.Items) {
        this.data.Article = item.Article;
        this.data.RONo = item.RONo;
        this.data.Buyer = item.Buyer.Name;
        this.data.Comodity = item.Comodity.Code + " - " + item.Comodity.Name;
        this.data.Details = item.Details;
        for (var detail of item.Details) {
          this.data.Quantity += detail.Quantity;
        }
      }
      this.data.QtyPacking = subcon.QtyPacking;
      this.data.UomSatuanUnit = subcon.UomUnit;
    }
  }
  async selectedSubconCuttingChanged(newValue) {
    this.data.date = null;
    this.data.unit = "";
    this.data.SubconId = null;
    this.data.SubconNo = "";
    this.data.Quantity = 0;
    this.data.QtyPacking = 0;
    this.data.UomSatuanUnit = "";
    this.selectedUENAcc = "";
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.SubconNo;

      var subcon = await this.service.readServiceSubconCuttingById(
        this.data.SubconId
      );
      this.data.date = subcon.SubconDate;
      this.data.unit = subcon.Unit.Code;
      this.data.subconType = subcon.SubconType;
      this.data.QtyPacking = subcon.QtyPacking;
      this.data.UomSatuanUnit = subcon.Uom.Unit;
      for (var item of subcon.Items) {
        for (var detail of item.Details) {
          this.data.Quantity += detail.Quantity;
        }
      }
      this.data.Details.splice(0);
    }
  }

  async selectedSubconShrinkageChanged(newValue) {
    this.data.date = null;
    this.data.unit = "";
    this.data.SubconId = null;
    this.data.SubconNo = "";
    this.data.Quantity = 0;
    this.data.QtyPacking = 0;
    this.data.UomSatuanUnit = "";
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.ServiceSubconShrinkagePanelNo;
      var subcon = await this.service.readServiceSubconShrinkageById(
        this.data.SubconId
      );
      this.data.date = subcon.ServiceSubconShrinkagePanelDate;
      this.data.QtyPacking = subcon.QtyPacking;
      this.data.UomSatuanUnit = subcon.UomUnit;
      //this.data.unit=subcon.Unit.Code;
      for (var item of subcon.Items) {
        for (var detail of item.Details) {
          this.data.Quantity += detail.Quantity;
        }
      }
    }
  }
  async selectedSubconFabricChanged(newValue) {
    this.data.date = null;
    this.data.unit = "";
    this.data.SubconId = null;
    this.data.SubconNo = "";
    this.data.Quantity = 0;
    this.data.QtyPacking = 0;
    this.data.UomSatuanUnit = "";
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.ServiceSubconFabricWashNo;
      var subcon = await this.service.readServiceSubconFabricById(
        this.data.SubconId
      );
      this.data.date = subcon.ServiceSubconFabricWashDate;
      this.data.QtyPacking = subcon.QtyPacking;
      this.data.UomSatuanUnit = subcon.UomUnit;
      //this.data.unit=subcon.Unit.Code;
      for (var item of subcon.Items) {
        for (var detail of item.Details) {
          this.data.Quantity += detail.Quantity;
        }
      }
    }
  }

  async selectedUENAccChanged(newValue) {
    if (newValue && (this.isCreate || this.isEdit)) {
      if (this.data.Details.length > 0) {
        this.data.Details.splice(0);
      }
      this.GetUEN(newValue, this.data.Details, newValue.UENNo, newValue.Id);
    } else {
      this.selectedUENAcc = null;
      this.data.Details.splice(0);
    }
  }

  async GetUEN(newValue, dataArr, uenNo, uenId) {
    this.purchasingService
      .getUnitDeliveryOrderById(newValue.UnitDOId)
      .then((deliveryOrder) => {
        this.service
          .searchComplete({
            filter: JSON.stringify({ ContractNo: this.ContractNo }),
          })
          .then((contract) => {
            var usedQty = 0;
            if (contract.data.length > 0) {
              for (var subcon of contract.data) {
                if (subcon.Id != this.HeaderId) {
                  for (var subconItem of subcon.Items) {
                    usedQty += subconItem.Quantity;
                  }
                } else {
                  this.data.savedItems = subcon.Items;
                }
              }
            }
            this.data.QtyUsed = usedQty;
            if (deliveryOrder) {
              for (var uenItem of newValue.Items) {
                var item = {};
                item.UENItemId = uenItem._id || uenItem.Id;
                if (this.data.savedItems) {
                  var qty = this.data.savedItems.find(
                    (a) => a.UENItemId == uenItem.Id
                  );
                  if (this.isEdit) {
                    item.Id = qty.Id;
                  }
                  if (qty) item.Quantity = qty.Quantity;
                }
                //item.UENItemId=uenItem.Id;
                item.Product = {
                  Name: uenItem.ProductName,
                  Code: uenItem.ProductCode,
                  Id: uenItem.ProductId,
                };
                item.Uom = {
                  Id: uenItem.UomId,
                  Unit: uenItem.UomUnit,
                };

                if (uenItem.ProductName == "FABRIC") {
                  item.UomOut = {
                    Id: 43,
                    Unit: "PCS",
                  };
                } else {
                  item.UomOut = {
                    Id: uenItem.UomId,
                    Unit: uenItem.UomUnit,
                  };
                }

                item.ProductRemark = uenItem.ProductRemark;
                var doItem = deliveryOrder.Items.find(
                  (a) => a._id == uenItem.UnitDOItemId
                );

                if (doItem) {
                  item.DesignColor = doItem.DesignColor;
                }
                item.FabricType = uenItem.FabricType;
                item.ContractQuantity = uenItem.Quantity;
                item.UENNo = uenNo;
                item.UENId = uenId;
                dataArr.push(item);
              }
            }
          });
      });
  }
}
