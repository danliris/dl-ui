import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService, CoreService } from "./service";

const ContractLoader = require("../../../loader/garment-subcon-contract-loader");
const UENLoader = require("../../../loader/garment-unit-expenditure-note-loader");

@inject(Service, PurchasingService, CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate;
  @bindable isView;
  @bindable isEdit;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedUEN;
  @bindable selectedUENAcc;
  @bindable itemOptions = {};
  @bindable selectedPO;
  @bindable selectedContract;
  @bindable selectedDLType;
  @bindable selectedOrderType;
  @bindable selectedContractType;
  @bindable selectedServiceType;
  @bindable selectedSubconCategory;

  constructor(service, purchasingService, coreService) {
    this.service = service;
    this.purchasingService = purchasingService;
    this.coreService = coreService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  orderTypes = ["JOB ORDER", "SAMPLE"];
  dlTypes = ["PROSES", "RE PROSES"];
  contractTypes = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
  SubconCategoryTypeOptions = ["SUBCON CUTTING SEWING", "SUBCON SEWING"];
  //serviceTypes=["SUBCON JASA KOMPONEN", "SUBCON JASA GARMENT WASH", "SUBCON JASA SHRINKAGE PANEL","SUBCON JASA FABRIC WASH"];
  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 5,
    },
  };

  itemsInfo = {
    columns: [
      "Kode Barang",
      "Nama Barang",
      "Keterangan Barang",
      "Design/Color",
      "Jumlah",
      "Satuan",
      "Tipe Fabric",
      "Jumlah Keluar",
      "Satuan Keluar",
    ],
    columnsCuttingSewing: [
      "Kode Barang",
      "Nama Barang",
      "Keterangan Barang",
      "Design/Color",
      "Jumlah",
      "Satuan",
      "Tipe Fabric",
    ],
    columnsCutting: ["RO", "No Cutting Out Subcon", "Plan PO", "Jumlah"],
    columnsServiceCutting: [
      "No Subcon Jasa Komponen",
      "Tgl Subcon",
      "Asal Unit",
      "Jenis Subcon",
      "Jumlah",
      "Jumlah Kemasan",
      "Satuan Kemasan",
    ],
    columnBBPanel: [
      "No Subcon BB Shrinkage/Panel",
      "Tgl Subcon",
      //"Asal Unit",
      "Jumlah",
      "Jumlah Kemasan",
      "Satuan Kemasan",
      "Qty Keluar (PCS)",
    ],
    columnBBWash: [
      "No Subcon BB Fabric Wash/Print",
      "Tgl Subcon",
      //"Asal Unit",
      "Jumlah",
      "Jumlah Kemasan",
      "Satuan Kemasan",
    ],
    columnsServiceWash: [
      "No Subcon Jasa Garment Wash",
      "Tgl Subcon",
      "Jumlah",
      "RONo",
      "Article",
      "Buyer",
      "Komoditi",
      "Jumlah Kemasan",
      "Satuan Kemasan",
    ],
    columnsServiceExpenditure: [
      "Packing List Jasa Barang Jadi",
      "Tgl Subcon",
      "Jumlah(PCS)",
      "Jumlah Kemasan",
      "Satuan Kemasan",
    ],
  };

  @computedFrom("data.ContractType && data.SubconCategory")
  get contractFilter() {
    return {
      ContractType: this.data.ContractType,
      SubconCategory: this.data.SubconCategory,
      '(BPJNo!=null && BPJNo!="")': true,
      '(SKEPNo!=null && SKEPNo!="")': true,
    };
  }

  @computedFrom("data.DLType && data.OrderType")
  get UENFilter() {
    var UENFilter = {};
    if (this.data.DLType == "PROSES" && this.data.OrderType == "JOB ORDER") {
      UENFilter = {
        IsPreparing: false,
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG BAHAN BAKU",
      };
    } else if (
      this.data.DLType == "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        IsPreparing: false,
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG BAHAN BAKU",
        UnitRequestCode: "SMP1",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "JOB ORDER"
    ) {
      UENFilter = {
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG BAHAN BAKU",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG BAHAN BAKU",
        UnitRequestCode: "SMP1",
      };
    }

    return UENFilter;
  }

  @computedFrom("data.DLType && data.OrderType")
  get UENFilterAcc() {
    var UENFilter = {};
    if (this.data.DLType == "PROSES" && this.data.OrderType == "JOB ORDER") {
      UENFilter = {
        IsPreparing: false,
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG ACCESSORIES",
      };
    } else if (
      this.data.DLType == "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        IsPreparing: false,
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG ACCESSORIES",
        UnitRequestCode: "SMP1",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "JOB ORDER"
    ) {
      UENFilter = {
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG ACCESSORIES",
      };
    } else if (
      this.data.DLType != "PROSES" &&
      this.data.OrderType == "SAMPLE"
    ) {
      UENFilter = {
        'ExpenditureType == "SUBCON" || ExpenditureType == "TRANSFER SUBCON"': "true",
        StorageName: "GUDANG ACCESSORIES",
        UnitRequestCode: "SMP1",
      };
    }

    return UENFilter;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.isCreate = this.context.isCreate;
    this.isEdit = this.context.isEdit;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      readOnly: this.readOnly,
      checkedAll: this.context.isCreate == true ? false : true,
      isEdit: this.isEdit,
      isSubconCutting:
        this.data.SubconCategory == "SUBCON JASA KOMPONEN" ? true : false,
      isSubconSewing:
        this.data.SubconCategory == "SUBCON JASA GARMENT WASH" ? true : false,
      isSubconExpenditure:
        this.data.SubconCategory == "SUBCON JASA BARANG JADI" ? true : false,
      subconCategory: this.data.SubconCategory,
      orderType: this.data.OrderType,
      ContractNo: this.data.ContractNo,
      HeaderId: this.data.Id,
      DLType: this.data.DLType,
    };

    if (this.data.Id) {
      if (this.data.SubconCategory == "SUBCON CUTTING SEWING") {
        if (this.isCreate || this.isEdit) {
          //Mapping data Item Fabric
          var itemFab = this.data.Items.find((x) => x.Product.Name == "FABRIC");
          if (itemFab) {
            var uen = await this.purchasingService.getUENById(itemFab.UENId);
            this.selectedUEN = {
              UENNo: itemFab.UENNo,
              Id: itemFab.UENId,
              UnitDOId: uen.UnitDOId,
              Items: uen.Items,
            };
          }

          //Mapping data Item Acc
          var itemAcc = this.data.Items.find((x) => x.Product.Name != "FABRIC");
          console.log("itemAcc", itemAcc);
          if (itemAcc) {
            var uen = await this.purchasingService.getUENById(itemAcc.UENId);
            this.selectedUENAcc = {
              UENNo: itemAcc.UENNo,
              Id: itemAcc.UENId,
              UnitDOId: uen.UnitDOId,
              Items: uen.Items,
            };
          } else {
            this.selectedUENAcc = {
              UENNo: "",
            };
          }
        }
        this.selectedPO = {
          PO_SerialNumber: this.data.PONo,
          Id: this.data.EPOItemId,
        };
      } else if (this.isSubconSewing) {
        this.data.SubconId = newValue.Id;
        var subcon = await this.service.readServiceSubconSewingById(
          this.data.SubconId
        );
        this.data.Details = subcon.Items;
      }
    }
  }

  selectedDLTypeChanged(newValue) {
    this.data.DLType = newValue;
    this.selectedUEN = null;
    this.selectedUENAcc = null;
    this.data.UENId = 0;
    this.data.UENNo = "";
    this.data.UENAccId = 0;
    this.data.UENAccNo = "";
    this.selectedContract = null;
    this.data.ContractNo = "";
    this.data.SubconContractId = 0;

    this.itemOptions.DLType = this.data.DLType;
    this.data.ContractQty = 0;
    this.data.UsedQty = 0;
    this.data.QtyUsed = 0;
    this.data.Items.splice(0);
    this.data.ItemsAcc.splice(0);
    this.context.selectedContractViewModel.editorValue = "";
  }

  selectedOrderTypeChanged(newValue) {
    this.data.OrderType = newValue;
    this.selectedUEN = null;
    this.selectedUENAcc = null;
    this.data.UENId = 0;
    this.data.UENNo = "";
    this.data.UENAccId = 0;
    this.data.UENAccNo = "";
    this.selectedContract = null;
    this.data.ContractNo = "";
    this.data.SubconContractId = 0;

    this.itemOptions.orderType = this.data.OrderType;
    this.data.ContractQty = 0;
    this.data.UsedQty = 0;
    this.data.QtyUsed = 0;
    this.data.Items.splice(0);
    this.data.ItemsAcc.splice(0);
    this.context.selectedContractViewModel.editorValue = "";

    if (this.data.OrderType == "JOB ORDER") {
      this.SubconCategoryTypeOptions = [
        "SUBCON CUTTING SEWING",
        "SUBCON SEWING",
      ];
    } else {
      this.SubconCategoryTypeOptions = ["SUBCON CUTTING SEWING"];
    }
  }

  selectedContractTypeChanged(newValue) {
    if (this.data.ContractType != newValue) {
      this.data.ContractType = newValue;
      this.selectedUEN = null;
      this.data.UENId = 0;
      this.data.UENNo = "";
      this.data.UENAccId = 0;
      this.data.UENAccNo = "";
      this.selectedContract = null;
      this.data.ContractNo = "";
      this.data.SubconContractId = 0;
      this.data.ContractQty = 0;
      this.data.UsedQty = 0;
      this.data.QtyUsed = 0;
      this.data.Items.splice(0);
      this.context.selectedContractViewModel.editorValue = "";
      this.data.ServiceType = "";
      this.selectedServiceType = null;
      this.data.SubconCategory = "";
      this.selectedSubconCategory = null;
      if (this.data.ContractType == "SUBCON GARMENT") {
        if (this.data.OrderType == "JOB ORDER") {
          this.SubconCategoryTypeOptions = [
            "SUBCON CUTTING SEWING",
            "SUBCON SEWING",
          ];
        } else {
          this.SubconCategoryTypeOptions = ["SUBCON CUTTING SEWING"];
        }
      } else if (this.data.ContractType == "SUBCON BAHAN BAKU") {
        this.SubconCategoryTypeOptions = [
          "SUBCON BB SHRINKAGE/PANEL",
          "SUBCON BB FABRIC WASH/PRINT",
        ];
      } else if (this.data.ContractType == "SUBCON JASA") {
        this.SubconCategoryTypeOptions = [
          "SUBCON JASA GARMENT WASH",
          "SUBCON JASA KOMPONEN",
          "SUBCON JASA BARANG JADI",
        ];
      }
    }

    this.itemOptions.isSubconCutting =
      this.data.SubconCategory == "SUBCON JASA KOMPONEN" ? true : false;
    this.itemOptions.isSubconSewing =
      this.data.SubconCategory == "SUBCON JASA GARMENT WASH" ? true : false;
    this.itemOptions.isSubconExpenditure =
      this.data.SubconCategory == "SUBCON JASA BARANG JADI" ? true : false;
  }

  // selectedServiceTypeChanged(newValue){
  //     this.data.ServiceType=newValue;
  //     this.selectedUEN=null;
  //     this.data.UENId = 0;
  //     this.data.UENNo = "";
  //     this.data.ContractNo="";
  //     this.data.SubconContractId=0;
  //     this.data.ContractQty=0;
  //     this.data.UsedQty=0;
  //     this.data.QtyUsed=0;
  //     this.data.Items.splice(0);
  //     this.context.selectedContractViewModel.editorValue="";
  //     this.itemOptions.isSubconCutting=this.data.ServiceType=="SUBCON JASA KOMPONEN"?true : false;
  //     this.itemOptions.serviceType=this.data.ServiceType;
  // }

  contractView = (contract) => {
    return `${contract.ContractNo}`;
  };

  uenView = (uen) => {
    return `${uen.UENNo}`;
  };

  get contractLoader() {
    return ContractLoader;
  }

  get uenLoader() {
    return UENLoader;
  }

  async selectedUENChanged(newValue, oldValue) {
    if (newValue && (this.isCreate || this.isEdit)) {
      if (this.data.Items.length > 0) {
        this.data.Items.splice(0);
      }

      this.GetUEN(newValue, this.data.Items, newValue.UENNo, newValue.Id);
    } else {
      this.context.selectedUENViewModel.editorValue = "";
      this.data.Items.splice(0);
    }
  }

  async selectedUENAccChanged(newValue, oldValue) {
    if (newValue && (this.isCreate || this.isEdit)) {
      if (this.data.ItemsAcc.length > 0) {
        this.data.ItemsAcc.splice(0);
      }
      this.GetUEN(newValue, this.data.ItemsAcc, newValue.UENNo, newValue.Id);
    } else {
      this.context.selectedUENAccViewModel.editorValue = "";
      this.data.ItemsAcc.splice(0);
    }
  }

  async GetUEN(newValue, dataArr, uenNo, uenId) {
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
                item.UENNo = uenNo;
                item.UENId = uenId;
                dataArr.push(item);
              }
            }
          });
      });
  }

  async selectedContractChanged(newValue) {
    this.selectedUEN = null;
    this.data.UENId = 0;
    this.data.UENNo = "";
    this.data.ContractQty = 0;
    if (this.data.SubconCategory != "SUBCON SEWING") this.data.Items.splice(0);
    if (newValue) {
      this.data.ContractNo = newValue.ContractNo;
      this.data.SubconContractId = newValue.Id;
      this.data.ContractQty = newValue.Quantity;
    } else {
      this.data.ContractNo = "";
      this.data.SubconContractId = null;
      this.selectedUEN = null;
      this.data.UENId = null;
      this.data.UENNo = "";
      this.data.ContractQty = 0;
      this.context.selectedContractViewModel.editorValue = "";
      if (this.data.SubconCategory != "SUBCON SEWING")
        this.data.Items.splice(0);
    }
  }

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      if (this.data.Items.length > 0) {
        if (this.data.SubconCategory != "SUBCON BB SHRINKAGE/PANEL") {
          for (var item of this.data.Items) {
            qty += item.Quantity;
          }
        } else {
          for (var item of this.data.Items) {
            qty += item.SmallQuantity;
          }
        }
      }
      this.data.TotalQty = qty ? qty : 0;
    }
    return qty;
  }

  get poLoader() {
    return (keyword) => {
      var infoEPO = {
        keyword: keyword,
        filter: JSON.stringify({ ProductName: "PROCESS" }),
      };
      return this.purchasingService.getGarmentEPO(infoEPO).then((epo) => {
        return epo.data;
      });
    };
  }

  POView = (po) => {
    return `${po.PO_SerialNumber}`;
  };

  selectedPOChanged(newValue) {
    if (newValue) {
      this.data.PONo = newValue.PO_SerialNumber;
      this.data.EPOItemId = newValue.Id;
    }
  }

  get addItems() {
    return (event) => {
      if (this.data.Items.length >= 1) {
        alert("Item tidak boleh lebih dari 1");
      } else {
        this.data.Items.push({
          DLType: this.data.DLType,
          OrderType: this.data.OrderType,
        });
      }
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

  selectedSubconCategoryChanged(newValue) {
    if (newValue != this.data.SubconCategory) {
      this.data.SubconCategory = newValue;
      this.selectedContract = null;
      this.data.ContractNo = "";
      this.data.SubconContractId = 0;
      this.data.ContractQty = 0;

      if (this.data.Items) {
        this.data.Items.splice(0);
      }
      this.itemOptions.subconCategory = this.data.SubconCategory;
      this.itemOptions.isSubconCutting =
        this.data.SubconCategory == "SUBCON JASA KOMPONEN" ? true : false;
      this.itemOptions.isSubconSewing =
        this.data.SubconCategory == "SUBCON JASA GARMENT WASH" ? true : false;
      this.itemOptions.isSubconExpenditure =
        this.data.SubconCategory == "SUBCON JASA BARANG JADI" ? true : false;
    }
  }
}
