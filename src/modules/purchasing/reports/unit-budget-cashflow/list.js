import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { CurrencyService } from "./currency-service";
import UnitLoader from "../../../../loader/unit-loader";
import moment from "moment";
import { Dialog } from "../../../../components/dialog/dialog";
import { AddItemDialog } from "./templates/add-item-dialog";
import { UpdateItemDialog } from "./templates/update-item-dialog";

@inject(Router, Service, CurrencyService, Dialog)
export class List {
  constructor(router, service, currencyService, dialog) {
    this.router = router;
    this.service = service;
    this.currencyService = currencyService;
    this.dialog = dialog;
    this.dialogData = {};
    this.error = {};
    this.unit = "";
    this.date = null;
    this.items = [];
    this.isEmpty = true;
    // this.rowspan = {};
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  async search() {
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
        this.data.UnitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
      this.data.DueDate = date;

      let arg = {
        unitId,
        date,
      };

      this.items = await this.service.search(arg).then((result) => result.data);
      this.isEmpty = this.items.length !== 0 ? false : true;

      // const getLength = (groupId, items) =>
      //   items.filter((item) => item.groupId === groupId).length;

      // this.rowspan.oaci = getLength(1, this.items);
      // this.rowspan.oaco = getLength(2, this.items);
      // this.rowspan.oadiff = getLength(3, this.items);
      // this.rowspan.iaci = getLength(4, this.items);
      // this.rowspan.iaco = getLength(5, this.items);
      // this.rowspan.iadiff = getLength(6, this.items);
      // this.rowspan.faci = getLength(7, this.items);
      // this.rowspan.faco = getLength(8, this.items);
      // this.rowspan.fadiff = getLength(9, this.items);

      // const {
      //   oaci,
      //   oaco,
      //   oadiff,
      //   iaci,
      //   iaco,
      //   iadiff,
      //   faci,
      //   faco,
      //   fadiff,
      // } = this.rowspan;

      // this.rowspan.oa = oaci + oaco + oadiff;
      // this.rowspan.ia = iaci + iaco + iadiff;
      // this.rowspan.fa = faci + faco + fadiff;

      // console.log("this.items", this.items);
    }
  }

  reset() {
    this.unit = "";
    this.date = null;
  }

  addItem(item) {
    this.dialogData.Info = item;
    this.dialogData.Unit = this.unit;
    this.dialogData.Date = this.date;

    this.dialog.show(AddItemDialog, this.dialogData).then((response) => {
      // console.log("response", response);
      this.search();
    });
  }

  updateItem(item) {
    this.dialogData.Info = item;
    this.dialogData.Unit = this.unit;
    this.dialogData.Date = this.date;

    this.dialog.show(UpdateItemDialog, this.dialogData).then((response) => {
      // console.log("response", response);
      this.search();
    });
  }

  // save() {
  //   const tempDataItems = this.data.Items;
  //   const newDataItems = this.data.Items.filter(
  //     (item) => typeof item !== "string" && item.LayoutOrder !== 0
  //   );
  //   this.data.Items = newDataItems;
  //   this.service
  //     .upsertWorstCase(this.data)
  //     .then(() => {
  //       this.isEdit = false;
  //       this.collectionOptions = {
  //         readOnly: true,
  //       };

  //       setTimeout(() => {
  //         this.ItemsCollection.bind();
  //       }, 50);

  //       this.data.Items = tempDataItems;
  //       alert("Data berhasil disimpan.");
  //     })
  //     .catch((e) => {
  //       this.data.Items = tempDataItems;
  //       alert("Terjadi kesalahan.");
  //     });
  // }

  // edit() {
  //   this.isEdit = true;
  //   this.collectionOptions = {
  //     readOnly: false,
  //   };

  //   setTimeout(() => {
  //     this.ItemsCollection.bind();
  //   }, 50);
  // }

  // printXls() {
  //   if (this.unit === "" || this.date === null) {
  //     this.error.unit = "Unit harus diisi";
  //     this.error.date = "Periode harus diisi";
  //   } else {
  //     this.error.unit = "";
  //     this.error.date = "";

  //     let unitId = 0;
  //     if (this.unit && this.unit.Id) {
  //       unitId = this.unit.Id;
  //     }

  //     let date = this.date
  //       ? moment(this.date).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getXls({ unitId, date });
  //   }
  // }

  // printPdf() {
  //   if (this.unit === "" || this.date === null) {
  //     this.error.unit = "Unit harus diisi";
  //     this.error.date = "Periode harus diisi";
  //   } else {
  //     this.error.unit = "";
  //     this.error.date = "";

  //     let unitId = 0;
  //     if (this.unit && this.unit.Id) {
  //       unitId = this.unit.Id;
  //     }

  //     let date = this.date
  //       ? moment(this.date).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getPdf({ unitId, date });
  //   }
  // }

  bind() {
    this.data = {};
  }

  get unitLoader() {
    return UnitLoader;
  }
}
