import { inject, useView } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { Service } from "../service";
import moment from "moment";

@inject(DialogController, Service)
@useView("./update-item-dialog.html")
export class UpdateItemDialog {
  constructor(controller, service) {
    this.controller = controller;
    this.service = service;
    this.data = {};
    this.error = {};
    this.collection = {
      columns: ["MATA UANG", "NOMINAL VALAS", "NOMINAL IDR", "ACTUAL IDR"],
      onAdd: () => {
        this.data.Items.push({});
      },
    };
  }

  async activate(data) {
    // console.log("update-item-dialog, activate(data)", data);
    this.data = data;
    this.data.UnitId = data.Unit.Id;
    this.data.DivisionId = data.Unit.Division.Id;
    this.data.CashflowSubCategoryId = data.Info.SubCategoryId;
    this.error = {};

    let date = data.Date
      ? moment(data.Date).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD");
    this.data.Date = date;
    // this.data.Date = data.Date;

    let args = {
      unitId: this.data.UnitId,
      subCategoryId: this.data.CashflowSubCategoryId,
      date,
    };

    this.data.Items = await this.service.getItems(args).then((result) => {
      result.data = result.data.map((item) => {
        item.CurrencyId = item.Currency.Id;
        return item;
      });
      return result.data;
    });
  }

  save() {
    this.service
      .update(this.data)
      .then(() => {
        // alert("Data berhasil dibuat");
        this.controller.ok(this.data);
      })
      .catch((e) => {
        this.error = e;
      });
  }
}
