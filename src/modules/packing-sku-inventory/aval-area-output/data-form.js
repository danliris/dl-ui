import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import moment from "moment";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  // @bindable DyeingPrintingItems;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah"
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  itemOptions = {};

  constructor(service) {
    this.service = service;
  }
  DOFormatter = (DoItem) => {
    return `${DoItem.DeliveryOrderSalesNO}`
}
  bind(context) {
    this.context = context;
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.isHasData = false;

    this.data.Area = "GUDANG AVAL";
    if (this.data.id) {
      this.data.Date = this.data.date;
      this.data.Shift = this.data.shift;
      this.data.Group = this.data.group;
      this.data.DestinationArea = this.data.destinationArea;
      if (this.data.avalItems.length > 0) {
        this.data.DyeingPrintingItems = this.data.avalItems;
        this.isHasData = true;
      }
    }
    
    // var errorIndex = 0;

    // this.data.AvalJointValue = 0;
    // this.data.AvalAValue = 0;
    // this.data.AvalBValue = 0;
    // this.data.AvalInducementValue = 0;
    // this.data.AvalDirtyRopeValue = 0;
    // this.data.AvalDirtyRopeValue = 0;
    // this.data.AvalDirtyClothValue = 0;   

    // if (errorIndex == 0) {
    //   this.data.DyeingPrintingMovementIds = [];

    //   this.service.getAllAvailableAval().then((result) => {
    //     if (result.length > 0) {

    //       result.forEach((datum) => {
    //         var DyeingPrintingMovementIds = {};
    //         DyeingPrintingMovementIds.DyeingPrintingMovementId =
    //           datum.avalInputId;
    //         DyeingPrintingMovementIds.AvalItemId = datum.avalItemId;

    //         this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
    //         this.isHasData = true;
    //       });

    //       this.data.DyeingPrintingItems = result;
    //     } else {
    //       this.isHasData = false;
    //     }
    //   });
    // } else {
    //   this.error.Date;
    //   this.error.Shift;
    // }

  }

  shifts = ["PAGI", "SIANG"];

  destinationAreas = ["SHIPPING"];

  groups = ["A", "B"];

  ExportToExcel() {
      this.service.generateExcelReportById(this.data.id);
  }

  Date = null;
  Shift = null;
  Group = null;

  searching() {
    var errorIndex = 0;

    this.data.AvalJointValue = 0;
    this.data.AvalAValue = 0;
    this.data.AvalBValue = 0;
    this.data.AvalInducementValue = 0;
    this.data.AvalDirtyRopeValue = 0;
    this.data.AvalDirtyClothValue = 0;

    if (
      this.data.Date == undefined ||
      this.data.Date == null ||
      this.data.Date == "" ||
      isNaN(this.data.Date)
    ) {
      this.error.Date = "Tanggal Harus Diisi";
      errorIndex++;
    } else {
      this.Date = this.data.Date
        ? moment(this.data.Date).format("DD MMM YYYY HH:mm")
        : null;
      this.error.Date = "";
    }

    

    if (errorIndex == 0) {
      this.data.DyeingPrintingMovementIds = [];

      this.service.getAvailableAval(this.Date, this.Shift, this.Group).then((result) => {
        if (result.length > 0) {

          result.forEach((datum) => {
            var DyeingPrintingMovementIds = {};
            DyeingPrintingMovementIds.DyeingPrintingMovementId =
              datum.avalInputId;
            DyeingPrintingMovementIds.AvalItemId = datum.avalItemId;

            this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
            this.isHasData = true;
          });

          // result.reduce((previousValue, currentValue)=>{
          //   if(previousValue[currentValue.avalType] && previousValue[currentValue.avalCartNo] && previousValue[currentValue.avalUomUnit]){
          //     previousValue[currentValue.avalQuantity] = previousValue[currentValue.avalQuantity] + currentValue.avalQuantity;
          //     previousValue[currentValue.avalQuantityKg] = previousValue[currentValue.avalQuantityKg] + currentValue.avalQuantityKg;
          //   }
          // })

          // result.forEach((dyeingPrintingArea) => {
          //   var DyeingPrintingMovementIds = {};
          //   DyeingPrintingMovementIds.DyeingPrintingAreaMovementId =
          //     dyeingPrintingArea.id;
          //   DyeingPrintingMovementIds.ProductionOrderIds = [];

          //   dyeingPrintingArea.availableAvalItems.forEach(
          //     (availableAvalItem) => {
          //       DyeingPrintingMovementIds.ProductionOrderIds.push(
          //         availableAvalItem.id
          //       );

          //       this.isHasData = true;
          //     }
          //   );

          //   this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
          // });

          this.data.DyeingPrintingItems = result;
        } else {
          this.isHasData = false;
        }
      });
    } else {
      this.error.Date;
      this.error.Shift;
    }
  }

  DOLoader = (e)=>{
    var listDo =[
      {
        "DeliveryOrderSalesID" :52,
        "DeliveryOrderSalesNO": "20US000017"
      }
    ]
    return Promise.resolve(true).then(result=>{
      return listDo;
    });
  }

  reset() {
    this.data.Date = undefined;

    this.Date = null;
    this.Shift = null;

    // this.data.AvalJointValue = 0;
    // this.data.AvalAValue = 0;
    // this.data.AvalBValue = 0;
    // this.data.AvalInducementValue = 0;
    // this.data.AvalDirtyRopeValue = 0;
    // this.data.AvalDirtyClothValue = 0;

    this.isHasData = false;

    this.error.Date = "";
    this.error.Shift = "";
  }

  dyeingPrintingItemsColumns = [
    {
      value: "avalType",
      header: "Nama Barang",
    },
    {
      value: "avalUomUnit",
      header: "Saldo Satuan",
    },
    {
      value: "avalUomUnit",
      header: "Saldo Berat",
    },
    {
      value: "avalQuantity",
      header: "Qty Keluar Satuan",
    },
    {
      value: "avalQuantityKg",
      header: "Qty Keluar Berat",
    },
  ];

  addItems = (e) => {
    this.data.DyeingPrintingItems = this.data.DyeingPrintingItems || [];
    this.data.DyeingPrintingItems.push({});
  };
}
