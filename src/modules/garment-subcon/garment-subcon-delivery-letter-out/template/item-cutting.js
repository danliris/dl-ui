import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, CoreService, PurchasingService } from "../service";

const SubconCuttingOutLoader = require("../../../../loader/garment-subcon-cutting-out-loader");
const ROLoader = require("../../../../loader/garment-subcon-cutting-out-ro-loader");
const UENLoader = require("../../../../loader/garment-unit-expenditure-note-loader");

@inject(Service, CoreService, PurchasingService)
export class Item {
  @bindable selectedCuttingOut;
  @bindable selectedRO;
  @bindable selectedUENAcc;

  constructor(service, coreService, purchasingService) {
    this.service = service;
    this.coreService = coreService;
    this.purchasingService = purchasingService;
  }

  detailColumns = [
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

    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.itemOptions = context.context.options;
    this.ContractNo = this.itemOptions.ContractNo;
    this.HeaderId = this.itemOptions.HeaderId;
    if (this.data) {
      this.selectedCuttingOut = {
        CutOutNo: this.data.SubconNo,
        Id: this.data.SubconId,
      };
      this.selectedRO = {
        RONo: this.data.RONo,
      };
      if (this.data.SubconId) {
        var subcon = await this.service.readSubconCuttingOutById(
          this.data.SubconId
        );

        this.data.DetailsCutting = subcon.Items;
      }
      if (this.data.Details) {
        if (this.data.Details.length > 0)
          this.selectedUENAcc = {
            UENNo: this.data.Details[0].UENNo,
            Id: this.data.Details[0].Id,
          };
      }
      //   if (this.data.Id) {
      //     if (this.data.Details.length > 0) {
      //       //get Data Uen By ID
      //       var uen = await this.purchasingService.getUENById(
      //         this.data.Details[0].UENId
      //       );

      //       this.selectedUENAcc = {
      //         UENNo: uen.UENNo,
      //         Id: uen.Id,
      //         UnitDOId: uen.UnitDOId,
      //         Items: uen.Items,
      //       };
      //       if (this.isEdit) {
      //         this.selectedUENAccChanged(this.selectedUENAcc);
      //       }
      //     } else {
      //       this.selectedUENAcc = {
      //         UENNo: "",
      //         Id: 0,
      //       };
      //     }
      //   }

      this.isShowing = false;
    }
  }

  itemsColumns = ["Kode Barang", "Keterangan Barang", "Jumlah Keluar", ""];

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`;
  };

  @computedFrom("data.RONo")
  get subconCuttingOutFilter() {
    var filter = {
      RONo: this.data.RONo,
    };
    for (var item of this.context.context.items) {
      filter[`CutOutNo == "${item.data.SubconNo}"`] = false;
    }
    if (this.context.context.options.DLType != "RE PROSES") {
      filter["IsUsed"] = false;
    }
    return filter;
  }

  get subconCuttingOutLoader() {
    return SubconCuttingOutLoader;
  }

  get roLoader() {
    return ROLoader;
  }

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

  selectedROChanged(newValue) {
    if (newValue) {
      this.data.RONo = newValue.RONo;
    } else {
      this.data.RONo = "";
      this.data.SubconId = null;
      this.data.SubconNo = "";
      this.selectedCuttingOut = null;
      this.data.DetailsCutting.splice(0);
    }
  }
  async selectedCuttingOutChanged(newValue) {
    if (this.data.DetailsCutting.length > 0) {
      this.data.DetailsCutting.splice(0);
    }
    if (newValue) {
      this.data.SubconId = newValue.Id;
      this.data.SubconNo = newValue.CutOutNo;

      var subcon = await this.service.readSubconCuttingOutById(
        this.data.SubconId
      );

      this.data.POSerialNumber = subcon.POSerialNumber;
      this.data.DetailsCutting = subcon.Items;
      this.data.Quantity = 0;
      for (var detail of this.data.DetailsCutting) {
        this.data.Quantity += detail.TotalCuttingOut;
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
            console.log("");
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
