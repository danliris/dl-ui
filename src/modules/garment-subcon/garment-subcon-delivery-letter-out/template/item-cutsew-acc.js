import { computedFrom, bindable, inject } from "aurelia-framework";
// const UENLoader = require("../../../../loader/garment-unit-expenditure-note-loader");
import { Service, PurchasingService } from "../service";

@inject(Service, PurchasingService)
export class Item {
  @bindable selectedUEN;

  async activate(context) {
    this.context = context;

    this.data = context.data;
    this.error = context.error;
    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.itemOptions = context.context.options;
    this.itemOptions.isCutSew = true;
    this.isShowing = false;

    if (this.data.UENNo) {
      this.selectedUEN = {
        UENNo: this.data.UENNo,
      };
    }

    if (this.data.Details) {
      if (this.data.Details.length > 0) {
        this.isShowing = true;
      }
    }
  }

  constructor(service, purchasingService) {
    this.service = service;
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

  get uenLoader() {
    return async (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify(this.UENFilter),
      };
      let uenNo = [];

      //Add selected UENNo to filter
      this.context.context.items.map((x) => {
        uenNo.push(x.data.UENNo);
      });

      return this.purchasingService.getUENByNo(info).then((result) => {
        let data = result.data.filter((x) => !uenNo.includes(x.UENNo));
        return data;
      });
    };
  }

  uenView = (uen) => {
    return `${uen.UENNo}`;
  };

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  // @computedFrom("data.DLType && data.OrderType")
  get UENFilter() {
    var UENFilter = {};
    var UENFilter = {};
    if (this.data.DLType == "PROSES" && this.data.OrderType == "JOB ORDER") {
      UENFilter = {
        IsPreparing: false,
        ExpenditureType: "SUBCON",
        // StorageName: "GUDANG ACCESSORIES",
        'StorageName == "GUDANG ACCESSORIES" || StorageName == "GUDANG INTERLINING"':
          "true",
      };
    } else if (
      this.data.DLType == "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        IsPreparing: false,
        ExpenditureType: "SUBCON",
        // StorageName: "GUDANG ACCESSORIES",
        'StorageName == "GUDANG ACCESSORIES" || StorageName == "GUDANG INTERLINING"':
          "true",
        UnitRequestCode: "SMP1",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "JOB ORDER"
    ) {
      UENFilter = {
        ExpenditureType: "SUBCON",
        // StorageName: "GUDANG ACCESSORIES",
        'StorageName == "GUDANG ACCESSORIES" || StorageName == "GUDANG INTERLINING"':
          "true",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        ExpenditureType: "SUBCON",
        // StorageName: "GUDANG ACCESSORIES",
        'StorageName == "GUDANG ACCESSORIES" || StorageName == "GUDANG INTERLINING"':
          "true",
        UnitRequestCode: "SMP1",
      };
    }

    return UENFilter;
  }

  async selectedUENChanged(newValue) {
    if (newValue && (this.isCreate || this.isEdit)) {
      if (this.data.Details.length > 0) {
        this.data.Details.splice(0);
      }

      this.data.UENNo = newValue.UENNo;
      this.data.UENId = newValue.Id;

      this.purchasingService
        .getUnitDeliveryOrderById(newValue.UnitDOId)
        .then((deliveryOrder) => {
          this.service
            .searchComplete({
              filter: JSON.stringify({ ContractNo: this.data.ContractNo }),
            })
            .then((contract) => {
              var usedQty = 0;
              if (contract.data.length > 0) {
                for (var subcon of contract.data) {
                  if (subcon.Id != this.data.Id) {
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
                    // if (this.isEdit) {
                    //
                    // }
                    if (qty) {
                      item.Quantity = qty.Quantity;
                      item.Id = qty.Id;
                    }
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
                      Id: uenItem.UomId,
                      Unit: uenItem.UomUnit,
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
                  item.Quantity = uenItem.Quantity;
                  item.UENNo = newValue.UENNo;
                  item.UENId = newValue.Id;
                  this.data.Details.push(item);
                }
              }
            });
        });
    } else {
      this.context.selectedUENViewModel.editorValue = "";
      this.data.Details.splice(0);
    }
  }
}
