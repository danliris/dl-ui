import { inject, bindable, computedFrom } from "aurelia-framework";
var UnitLoader = require("../../../loader/garment-units-gmt-loader");
var PreSalesContractLoader = require("../../../loader/garment-pre-sales-contracts-loader");
import { CoreService } from "./service";
const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');
var garmentSectionLoader = require("../../../loader/garment-sections-loader");
@inject(CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isEdit = false;
  @bindable data = {};
  @bindable title;
  @bindable selectedPreSalesContract;
  @bindable costCalculationGarmentFilter = {};
  @bindable selectedRONo;
  

  constructor(coreService) {
    this.coreService = coreService;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  prTypes = ["MOQ","STOCK","OB","SAMPLE", "SUBCON", "TERIMA SUBCON"];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  get filterCostCalculationGarment() {
    if(this.data.PRType == "OB" || this.data.PRType == "MOQ") {
      return { 
        "IsApprovedKadivMD== true":true,
        'CCType== "JOB ORDER"':true,
        "IsPosted== true":true,
      };
    }
    // else if(this.data.PRType == "MOQ") {
    //   return { 
    //     "IsApprovedKadivMD== false":true,
    //     'CCType== "JOB ORDER"':true,
    //     "IsPosted== true":true
    //   };
    // }
    else {
      return {};
    }
  }

  @computedFrom("data.PRType")
  get salesContractFilter() {
    let filter = {
      IsPosted: true,
      // SCType: this.data.PRType == "MASTER" ? "JOB ORDER" : this.data.PRType,
    };

    if (this.data.PRType == "SAMPLE") {
      filter.IsPR = false;
      filter.SCType = "SAMPLE";
    } else if (this.data.PRType == "MOQ" || this.data.PRType == "STOCK" || this.data.PRType == "OB") {
      filter.SCType = "JOB ORDER";
    } else if (this.data.PRType == "SUBCON") {
      let filterSubcon = {
        IsPosted: true,
        'SCType == "SUBCON KELUAR" || SCType == "SUBCON"': true,
      };

      return filterSubcon;
    }

    return filter;
  }


  get costCalculationGarmentLoader() {
      return costCalculationGarmentLoader;
    }
  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isEdit: this.isEdit,
    };

    if (this.readOnly || this.isEdit) {
      this.itemsColumns.splice(0, 0, { header: "No. PO" });
      this.itemColumnViews.splice(0, 0, { header: "No. PO" });
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  get unitLoader() {
    return UnitLoader;
  }

  get garmentSectionLoader() {
    return garmentSectionLoader;
  }

  get preSalesContractLoader() {
    return PreSalesContractLoader;
  }


  itemsColumns = [
    { header: "CMT" },
    { header: "Import" },
    { header: "Kategori" },
    { header: "Kode Barang" },
    { header: "Komposisi" },
    { header: "Konstruksi" },
    { header: "Yarn" },
    { header: "Width" },
    { header: "Keterangan" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Price" },
    { header: "Satuan Harga" },
    { header: "Konversi" },
    { header: "Total" },
  ];

  itemColumnViews = [
    { header: "CMT" },
    { header: "Import" },
    { header: "Kategori" },
    { header: "Kode Barang" },
    { header: "Komposisi" },
    { header: "Konstruksi" },
    { header: "Yarn" },
    { header: "Width" },
    { header: "Keterangan" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Price" },
    { header: "Satuan Harga" },
    { header: "Konversi" },
    { header: "Total" },
  ];

  get buyer() {
    if (this.data.Buyer) {
      return `${this.data.Buyer.Code} - ${this.data.Buyer.Name}`;
    } else {
      return "-";
    }
  }

  changePRType(e) {
    if(this.context.selectedPreSalesContractViewModel) {
      this.context.selectedPreSalesContractViewModel.editorValue = "";
      this.selectedPreSalesContract = null;
    }
    if(this.context.selectedRONoViewModel) {
      this.context.selectedRONoViewModel.editorValue = "";
      this.context.selectedRONoViewModel._suggestions = "";
      this.selectedRONo = null;
    }

    if (e.target.value === "MASTER") {
      this.context.unitViewModel.editorValue = "";
      this.data.Unit = null;
    }
  }

  async selectedPreSalesContractChanged(newValue) {
    if(this.isEdit || this.readOnly) return;

    if (newValue) {
      this.data.SCId = newValue.Id;
      this.data.SCNo = newValue.SCNo;
      this.data.Buyer = {
        Id: newValue.BuyerBrandId,
        Code: newValue.BuyerBrandCode,
        Name: newValue.BuyerBrandName,
      };

      const section = await this.coreService.getGarmentSection(
        newValue.SectionId
      );
      this.data.SectionName = section.Name;
      this.data.ApprovalPR = section.ApprovalCC;
      this.data.ApprovalKadiv = section.ApprovalKadiv;
    } else {
      this.data.SCId = 0;
      this.data.SCNo = null;
      this.data.Buyer = null;
      this.data.SectionName = null;
      this.data.ApprovalPR = null;
      this.data.ApprovalKadiv = null;
    }
  }

  async selectedRONoChanged(newValue) {
    if(this.isEdit || this.readOnly) return;
    if (newValue) {
      this.data.SourceRO = newValue.RO_Number;
      this.data.Article = newValue.Article;
      this.data.Buyer = {
        Id: newValue.BuyerBrand.Id,
        Code: newValue.BuyerBrand.Code,
        Name: newValue.BuyerBrand.Name,
      };
      this.data.SCId = newValue.PreSCId;
      this.data.SCNo = newValue.PreSCNo;

      await this.garmentSectionLoader("", {
          [`Name == "${newValue.SectionName}"`]: true,
          [`Code == "${newValue.Section}"`]: true
      })
      .then((sections) => {
          if (sections && sections.length > 0) {
              const section = sections[0];

              this.data.SectionName = section.Name;
              this.data.ApprovalPR = section.ApprovalCC;
              this.data.ApprovalKadiv = section.ApprovalKadiv;
          } else {
              alert("Seksi tidak ditemukan.");
          }
      })
      .catch((error) => {
          alert("Gagal mengambil Garment Section: " + (error.message || error));

          console.error("Error:", error);
      });
    
    } else {
      this.data.SourceRO = null;
      this.data.Buyer = null;
      this.data.SCId = null;
      this.data.SCNo = null;  
    }
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({
        IsCMT: false,
      });
    };
  }

  get removeItems() {
    return (event) => {
    };
  }
}
