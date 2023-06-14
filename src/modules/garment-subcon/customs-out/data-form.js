import { bindable, inject, computedFrom } from "aurelia-framework";
import { data } from "jquery";
import { Service } from "./service";

var moment = require("moment");

const ContractLoader = require("../../../loader/garment-subcon-contract-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView = false;
  @bindable title;
  @bindable data = {};
  // @bindable error = {};
  @bindable selectedCustomsType;
  @bindable selectedSubconType;
  @bindable itemOptions = {};
  @bindable selectedContract;
  @bindable selectedSubconCategory;
  @bindable dataSC = {};
  @bindable Items = [];

  customsOutTypeOptions = ["2.6.1", "2.7.Out"];
  subconTypeOptions = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
  subconCategoryGarmentOptions = ["SUBCON CUTTING SEWING", "SUBCON SEWING"];
  subconCategoryBBOptions = [
    "SUBCON BB SHRINKAGE/PANEL",
    "SUBCON BB FABRIC WASH/PRINT",
  ];
  subconCategoryServiceOptions = [
    "SUBCON JASA GARMENT WASH",
    "SUBCON JASA KOMPONEN",
  ];

  @computedFrom("data.SubconCategory")
  get contractFilter() {
    // var current = new Date();
    // var maxDate = moment(current).format("YYYY-MM-DD");

    var filter = {
      //SubconCategory: this.data.SubconCategory,
      IsUsed: true,
    };

    // var filter ={};
    // if (this.data.SubconCategory == ''){

    //      filter = {
    //         //SubconCategory: this.data.SubconCategory == '' ? null : this.data.SubconCategory,
    //         IsUsed: true
    //     };
    // }else{

    // }

    filter[
      `DueDate >= ${JSON.stringify(
        moment(new Date()).subtract(17, "h").format("YYYY-MM-DD")
      )} `
    ] = true;
    return filter;
  }

  contractView = (contract) => {
    return `${contract.ContractNo}`;
  };

  get contractLoader() {
    return ContractLoader;
  }

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 2,
    },
    control: {
      length: 5,
    },
  };

  itemsInfo = {
    columns: [
      "No SJ Keluar",
      "Jumlah(PCS)",
      "Jumlah Kemasan",
      "Satuan Kemasan",
    ],
  };

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.Items = this.context.Items;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true,
      SCId: this.data.SubconContractId,
    };

    if (this.data && this.data.Id) {
      this.selectedSubconType = this.data.SubconType;
      var dataSubconContract = await this.service.getSubconContractByID(
        this.data.SubconContractId
      );
      this.selectedContract = dataSubconContract;
      this.selectedSubconCategory = this.data.SubconCategory;
      this.dataSC = dataSubconContract;
      this.data.RemainingQuantity = 0;
      this.data.Quantity = 0;

      var dls = await this.service.searchDeliveryLetterOut({
        filter: JSON.stringify({
          ContractNo: this.data.SubconContractNo,
          IsUsed: true,
        }),
      });

      for (var dl of dls.data) {
        var existDL = this.Items.find((x) => x.SubconDLOutNo === dl.DLNo);

        if (existDL) {
          var item = {};
          item.SubconDLOutNo = dl.DLNo;
          item.SubconDLOutId = dl.Id;
          item.Quantity = 0;
          item.QtyPacking = 0;
          item.UomPacking = "";
          for (var a of dl.Items) {
            item.Quantity += a.Quantity;
            item.QtyPacking += a.QtyPacking;
            item.UomPacking = a.UomSatuanUnit;
            item.IsSave = true;
            this.data.RemainingQuantity += a.Quantity;
            this.data.Quantity += a.Quantity;
          }
          this.data.Items.push(item);
        }
      }

      // const dataCustomsOut = await this.service.searchComplete({ filter: JSON.stringify({ SubconContractId: dataSubconContract.Id }) });
      // const dataJumlahCustomsOut = dataCustomsOut.data.map(x => {
      //     return x.Items.reduce((acc, cur) => acc += cur.Quantity, 0);
      // });

      // const dataJumlah = dataJumlahCustomsOut.reduce((acc, cur) => acc += cur, 0);
      // this.data.RemainingQuantity -= dataJumlah;
    }
  }

  selectedSubconTypeChanged(newValue) {
    this.data.SubconType = newValue;
  }

  async selectedContractChanged(newValue) {
    if (newValue && !this.data.Id) {
      this.data.SubconContractId = newValue.Id;
      this.data.SubconContractNo = newValue.ContractNo;
      this.data.BuyerStaff = newValue.CreatedBy;
      this.data.Supplier = newValue.Supplier;
      this.selectedSubconType = newValue.ContractType;
      this.selectedSubconCategory = newValue.SubconCategory;
      this.itemOptions.SCId = this.data.SubconContractId;
      this.data.RemainingQuantity = 0;
      this.data.Quantity = 0;

      Promise.resolve(
        this.service.searchDeliveryLetterOut({
          filter: JSON.stringify({ ContractNo: this.data.SubconContractNo }),
        })
      ).then((result) => {
        for (var dl of result.data) {
          var item = {};
          item.SubconDLOutNo = dl.DLNo;
          item.SubconDLOutId = dl.Id;
          item.Quantity = 0;
          item.QtyPacking = 0;
          item.UomPacking = "";
          for (var a of dl.Items) {
            item.Quantity += a.Quantity;
            item.QtyPacking += a.QtyPacking;
            item.UomPacking = a.UomSatuanUnit;

            this.data.RemainingQuantity += a.Quantity;
            if (dl.IsUsed == false) {
              this.data.Quantity += a.Quantity;
            }
          }
          if (dl.IsUsed == false) {
            this.data.Items.push(item);
          }
        }
      });
      const dataCustomsOut = await this.service.searchComplete({
        filter: JSON.stringify({ SubconContractId: newValue.Id }),
      });
      const dataJumlahCustomsOut = dataCustomsOut.data.map((x) => {
        return x.Items.reduce((acc, cur) => (acc += cur.Quantity), 0);
      });
      const dataJumlah = dataJumlahCustomsOut.reduce(
        (acc, cur) => (acc += cur),
        0
      );
      this.data.RemainingQuantity -= dataJumlah;
      this.dataSC = newValue;
      if (newValue.Id != this.data.SubconContractId) {
        this.data.Items.splice(0);
      }
    }
  }

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        if (item.IsSave) {
          qty += item.Quantity;
        }
      }
    }
    this.data.TotalQty = qty;
    return qty;
  }

  selectedSubconCategoryChanged(newValue, oldValue) {
    if (!this.data.Id) {
      if (this.data.Items) {
        this.data.Items.splice(0);
      }
    }
    this.data.SubconCategory = newValue;
  }
}
