import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';

var FinishingPrintingSalesContractLoader = require('../../../loader/finishing-printing-sales-contract-d365-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');
var OrderTypeLoader = require('../../../loader/order-type-loader');
var ProcessTypeLoader = require('../../../loader/process-type-loader');
var DesignMotiveLoader = require('../../../loader/design-motive-loader');
var MaterialConstructionLoader = require('../../../loader/material-construction-loader');
var MaterialLoader = require("../../../loader/product-loader");
var FinishTypeLoader = require('../../../loader/finish-type-loader');
var StandardTests = require('../../../loader/standard-tests-loader');
var AccountLoader = require('../../../loader/account-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable SalesContract;
  @bindable OrderType;
  @bindable Material;
  @bindable account;
  @bindable nameCheck;
  @bindable POTypes;
  @bindable UOmUnit;
  @bindable Price;
  @bindable material;


  POTypes = [' ', 'SALES', 'UNIT']

  lampHeader = [{ header: "Standar Lampu" }];

  materialQuery = {
    "Tags": "MATERIAL"
  }

  RUNOptions = ['Tanpa RUN', '1 RUN', '2 RUN', '3 RUN', '4 RUN'];
  rq = false;

  UOMOptions = ["MTR", "PCS"];
   controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }


  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
    this.material = "";
    this.filterAccount = {
      "roles": {
        "$elemMatch": {
          "permissions": {
            "$elemMatch": {
              "unit.name": "PENJUALAN FINISHING & PRINTING"
            }
          }
        }
      }
    };

    this.filterMaterial = {
      "tags": "material"
    }
  }

  async bind() {
    // this.data = this.data || {};
    if (this.data.Uom ) {
      this.UOmUnit = this.data.Uom.Unit;

      // this.data.Details.map(x => 
      //   {
      //     x.Uom = {}
      //     x.Uom.Unit = ["MTR", "PCS"]
      //   }
      // );
    }
    else {
      this.data.Uom = {};
      this.data.Uom.Unit = "MTR";
      // this.data.Uom.Unit = ["MTR", "PCS"];
      // //this.UOMOptions = ["MTR", "PCS"];
      // //this.data.Uom.Unit = this.UOMOptions[0];
    }
    if (this.data && this.data.Id) {
      this.OrderType = this.data.OrderType;

    if (this.data.ImagePath) {
      this.imageSrc = "https://danlirisstoragedev.blob.core.windows.net" + this.data.ImagePath;
    }

      this.SalesContract = {
        SalesContractNo: this.data.SalesContractNo,
        Buyer: this.data.Buyer
      };

      this.account = {
        username: this.data.Account.UserName,
        profile: {
          firstname: this.data.Account.FirstName,
          lastname: this.data.Account.LastName,
        }
      }
      this.data.Details = this.data.Details || [];
      this.data.LampStandards = this.data.LampStandards || [];
      this.data.BeforeQuantity = this.data.OrderQuantity;

      this.Price = Number(this.data.Price);

      if (this.data.POType == "SALES") {
        this.nameCheck = true;
      } else {
        this.nameCheck = false;
      }

      if (this.data.FinishingPrintingSalesContract && this.data.FinishingPrintingSalesContract.Id && (this.data.FinishingPrintingSalesContract.Id != 0)) {
        this.SalesContract = await this.service.getSCbyId(this.data.FinishingPrintingSalesContract.Id);
      }

    }
  }


  priceChanged(newValue, OldValue) {
    this.data.Price = this.Price;
  }

  get fpSalesContractLoader() {
    return FinishingPrintingSalesContractLoader;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return ((this.data ? this.data.Id : "") || '').toString() != '';
  }

  @computedFrom("data.ProcessType")
  get isPrinting() {
    this.printing = false;
    if (this.data.ProcessType && this.data.ProcessType.Unit) {
      if (this.data.ProcessType.Unit.trim().toLowerCase() == "printing") {
        this.printing = true;
      }
    }
    return this.printing;
  }

  @computedFrom("data.OrderType")
  get isYarnDyed() {
    this.yarndyed = false;
    if (this.data.OrderType) {
      if (this.data.OrderType.Name.trim().toLowerCase() == "yarn dyed") {
        this.yarndyed = true;
      }
    }
    return this.yarndyed;
  }

  // @computedFrom("data.ProcessType")
  // get isPrintingOnly() {
  //   this.printingOnly = false;
  //   if (this.data.ProcessType && this.data.ProcessType.Unit) {
  //     if (this.data.ProcessType.Unit.toLowerCase() == "printing") {
  //       this.printingOnly = true;
  //     }
  //   }
  //   return this.printingOnly;
  // }

  @computedFrom("data.OrderType")
  get isPrintingOnly() {
    this.printingOnly = false;
    if (this.data.OrderType) {
      if (this.data.OrderType.Name.trim().toLowerCase() == "printing") {
        this.printingOnly = true;
      }
    }
    return this.printingOnly;
  }

  RUNChanged(e) {
    var selectedRUN = e.srcElement.value;

    if (selectedRUN === "Tanpa RUN") {
      this.run = false;
      this.data.RunWidth = []; // Reset array agar form kosong
    } else {
      this.run = true;

      let runCount = parseInt(selectedRUN, 10); // Ambil angka RUN dari teks (ex: "2 RUN" -> 2)
      if (!isNaN(runCount)) {
        let newRunWidth = [];
        for (let i = 0; i < runCount; i++) {
          newRunWidth.push({ Value: 0 });
        }
        this.data.RunWidth = [...newRunWidth]; // Spread agar binding terdeteksi
      }
    }

  }

  @computedFrom("data.RunWidth.length")
  get isRUN() {
    return this.data.RunWidth.length > 0; // Langsung return hasil, tanpa mengubah this.run
  }

  // RUNChanged(e) {
  //   var selectedRUN = e.srcElement.value;
  //   if (selectedRUN) {
  //     this.data.RunWidth = [];
  //     if (selectedRUN == "Tanpa RUN") {
  //       this.run = false;
  //       this.data.RunWidth.length = 0;
  //     }
  //     if (selectedRUN == "1 RUN") {

  //       this.run = true;
  //       this.data.RunWidth[0] = { Value: 0 };
  //       if (this.data.RunWidth.length == 0) {
  //         this.data.RunWidth[0] = { Value: 0 };
  //       }

  //     }
  //     if (selectedRUN == "2 RUN") {
  //       this.run = true;
  //       this.data.RunWidth.length = 0;
  //       if (this.data.RunWidth.length == 0) {
  //         this.data.RunWidth.push({ Value: 0 }, { Value: 0 });
  //       }
  //     }
  //     if (selectedRUN == "3 RUN") {
  //       this.run = true;
  //       this.data.RunWidth.length = 0;
  //       if (this.data.RunWidth.length == 0) {
  //         this.data.RunWidth.push({ Value: 0 }, { Value: 0 }, { Value: 0 });
  //       }
  //     }
  //     if (selectedRUN == "4 RUN") {
  //       this.run = true;
  //       this.data.RunWidth.length = 0;
  //       if (this.data.RunWidth.length == 0) {
  //         this.data.RunWidth.push({ Value: 0 }, { Value: 0 }, { Value: 0 }, { Value: 0 });
  //       }
  //     }

  //   }
  // }

  // @computedFrom("data")
  // get isRUN() {
  //   this.run = false;
  //   if (this.data.RunWidth) {
  //     if (this.data.RunWidth.length > 0)
  //       this.run = true;
  //   }
  //   console.log(this.run);
  //   console.log(this.data.RunWidth);
  //   return this.run;
  // }

  UOmChanged(e) {
    this.data.Uom.Unit = e.srcElement.value;
    for (var i of this.data.Details) {
      i.Uom.Unit = e.srcElement.value;
    }
  }

  async SalesContractChanged(newVal, oldVal) {

    if (newVal) {
      // if (this.data && this.data.Details && this.data.Details.length > 0) {
      //   var count = this.data.Details.length;

      //   for (var a = count; a >= 0; a--) {
      //     this.data.Details.splice((a - 1), 1);
      //   }
      // }

      this.data.FinishingPrintingSalesContract = newVal;
      this.data.Buyer = this.data.FinishingPrintingSalesContract.Buyer;

      if (newVal.SalesContractNo != null && !newVal.SalesContractNo.includes("SO")) {
        this.data.ProductTextile = this.data.FinishingPrintingSalesContract.ProductTextile;
        this.OrderType = this.data.FinishingPrintingSalesContract.OrderType;
        this.data.Material = this.data.FinishingPrintingSalesContract.Material;
        this.Material = this.data.Material;
        this.material = "";
        this.data.Currency = {};
        this.data.Price = 0;
        this.data.YarnMaterial = this.data.FinishingPrintingSalesContract.YarnMaterial;
        this.data.DesignMotive = this.data.FinishingPrintingSalesContract.DesignMotive;
        if (this.data.Uom) {
          this.data.Uom.Unit = this.data.Uom.Unit;
          //this.data.Uom.Unit = this.data.Uom.Unit || "MTR";
        }
        else {
          this.data.Uom = {};
          //this.UOMOptions = ["MTR", "PCS"];
          this.data.Uom.Unit = "MTR";
          // this.data.Uom.Unit = ["MTR","PCS"];
          //this.data.Uom.Unit = this.UOMOptions[0];
        }
        this.data.FinishWidth = this.SalesContract.MaterialWidth;
        this.data.BeforeQuantity = 0;
        if (this.data.FinishingPrintingSalesContract.RemainingQuantity != undefined) {
          // this.data.RemainingQuantity = this.data.SalesContract.RemainingQuantity ? this.data.SalesContract.RemainingQuantity:0;
          this.rq = true;
        }
        else {
          // this.data.RemainingQuantity = undefined;
          this.rq = false;
        }
      } else {
        if (!this.data.Id) {
          this.data.ProductTextile = {};
          this.data.OrderType = null;
          this.data.Material = {};
          this.Material = {};
          this.data.YarnMaterial = {};
          this.data.DesignMotive = {};
          //this.data.Uom = {};
          this.data.FinishWidth = "";

          if (this.data.Uom) {
            this.data.Uom.Unit = this.data.Uom.Unit;
            //this.data.Uom.Unit = this.data.Uom.Unit || "MTR";
          }
          else {
            this.data.Uom = {};
            //this.UOMOptions = ["MTR", "PCS"];
            this.data.Uom.Unit = "MTR";
            // this.data.Uom.Unit = ["MTR","PCS"];
            //this.data.Uom.Unit = this.UOMOptions[0];
          }
          //split value from description
          var splitValue = this.data.FinishingPrintingSalesContract.Description.split(";;;");
          this.material = splitValue[0] || "";

          // get data currency from core base on D365 currency Code
          if (splitValue[1] != "" || splitValue[1] != undefined) {
            await CurrencyLoader("", { Code: splitValue[1] }).then((res) => {
              if (res && res.length > 0) {
                this.data.Currency = res[0];
              }
            });
          }
          // get data price from description
          this.data.Price = parseFloat(splitValue[2]) || 0;
        }
      }
    }
    else {
      this.data = {};
      // this.data = null;
    }
  }

  getBuyerText = (text) => {
    var data = text.Code ? `${text.Code} - ${text.Name}` : "";
    return data
  }

  getProductTextileText = (text) => {
    var data = text.Code ? `${text.Code} - ${text.Name}` : "";
    return data
  }

  OrderTypeChanged(newValue) {
    if (newValue) {
      this.data.OrderType = newValue;
      var Unit = newValue.Name == "YARN DYED" ? "DYEING" : newValue.Name;

      if (Unit) {
        this.filterOrder = {
          "Unit": Unit
        };
      }
      if (newValue.Unit) {
        if (newValue.Unit.toLowerCase() == "printing") {
          this.printingOnly = true;
        }
        else {
          this.printingOnly = false;
        }
        if (newValue.Unit.toLowerCase() == "printing") {
          this.printing = true;
        }
        else {
          this.printing = false;
        }

      }
      if (this.OrderType.Name) {
        if (this.OrderType.Name.toLowerCase() == "yarn dyed") {
          this.yarndyed = true;
        }
        else {
          this.yarndyed = false;
        }
      }

      //remove process type if data is create mode
      if (!this.data.Id) {
        this.data.ProcessType = {};
        this.data.Details = [];
      }
    }
    else {
      var Unit = this.data.OrderType.Name == "YARN DYED" ? "DYEING" : newValue.Name;

      //remove process type if data is create mode
      if (!this.data.Id) {
        this.data.ProcessType = {};
        this.data.Details = [];
      }
      if (this.data.OrderType && Unit) {
        this.filterOrder = {
          "Unit": Unit
        };
      }
      if (this.data != null) {
        if (this.data.OrderType) {
          if ((this.data.OrderType.Unit && this.data.OrderType.Unit.toLowerCase() == "printing") || this.data.OrderType.Name.toLowerCase() == "yarn dyed") {
            this.printing = true;
          }
          else {
            this.printing = false;
          }
          if (this.data.OrderType.Unit && this.data.OrderType.Unit.toLowerCase() == "printing") {
            this.printingOnly = true;
          }
          else {
            this.printingOnly = false;
          }
        }
      }
    }
  }

  POTypeChanged(e) {
    var selectedPOType = e.srcElement.value;
    if (selectedPOType == "SALES") {
      this.nameCheck = true;
    }
    else {
      this.nameCheck = false;
      this.data.Buyer = {
        Id: 567,
        Code: "DL01",
        Name: "PT. DAN LIRIS",
        Type: "Internal",
      };
    }
  }

  accountChanged(e) {
    var selectedAccount = this.account;
    if (selectedAccount) {

      this.data.Account = {
        // Id: 1, //test auth
        Username: selectedAccount.username,
        FirstName: selectedAccount.profile.firstname,
        LastName: selectedAccount.profile.lastname,
        Gender: selectedAccount.profile.gender,
        // Roles: [],
      };

      // for (var item of selectedAccount.roles) {
      //   var role = {
      //     Name: item.name,
      //     Code: item.code,
      //     Description: item.description
      //   }
      //   this.data.Account.Roles.push(role);
      // }
    }
  }
  // NEW CODE

  get addLamp() {
    return (event) => {
      var LampStandards = {
        LampStandardId: 0,
        Name: "",
        Code: "",
        Description: "",
      };
      this.data.LampStandards.push(LampStandards);
    };
  }

  // get detailHeader() {
  //   // if (!this.isPrinting && !this.isYarndyed) {
  //     return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }];
  //   // }
  //   // else {
  //   //   return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jumlah" }, { header: "Satuan" }];
  //   // }
  // }

  detailHeader = [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }];

  get removeLamp() {
    return (event) => console.log(event);
  }

  get addDetailnonPrinting() {
    return (event) => {
      var newDetail = {
        Uom: this.data.Uom,
        // uomId: this.data.uom._id,
        ColorRequest: '',
        ColorTemplate: '',
        Quantity: 0,
        // Printing: this.isPrinting
      };
      this.data.Details.push(newDetail);
    };
  }

  // get addDetailPrintingYarnDyed() {
  //   return (event) => {
  //     var newDetail = {
  //       Uom: this.data.Uom,
  //       // uomId: this.data.uom._id,
  //       ColorRequest: '',
  //       ColorTemplate: '',
  //       Quantity: 0,
  //       Printing: this.isPrinting
  //     };
  //     this.data.Details.push(newDetail);
  //   };
  // }

  get designMotiveLoader() {
    return DesignMotiveLoader;
  }

  get orderTypeLoader() {
    return OrderTypeLoader;
  }

  get processTypeLoader() {
    return ProcessTypeLoader;
  }

  get yarnmaterialLoader() {
    return YarnMaterialLoader;
  }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get materialLoader() {
    return MaterialLoader;
  }

  get finishTypeLoader() {
    return FinishTypeLoader;
  }

  get standardTests() {
    return StandardTests;
  }

  get accountLoader() {
    return AccountLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  text = (data) => {
    return `${data.profile.firstname} - ${data.profile.lastname}`
  }

  @bindable imageUpload;
  @bindable imageSrc;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById("imageInput");
    let reader = new FileReader();
    reader.onload = (event) => {
      let base64Image = event.target.result;
      this.imageSrc = this.data.ImageFile = base64Image;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}
