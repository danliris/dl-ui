import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, ProductionService } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");
const US = "US$. ";
const RP = "Rp. ";

@inject(Router, Service, Dialog, ProductionService)
export class View {
  title = "Detail Cost Calculation Export Finishing Printing";
  readOnly = true;
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  };
  length6 = {
    label: {
      align: "left",
      length: 6
    }
  };
  length7 = {
    label: {
      align: "left",
      length: 7
    }
  };
  machines = {
    columns: [
      { header: "Proses", value: "Process" },
      { header: "Mesin", value: "Machine" },
      { header: "Biaya Chemical", value: "Chemical" },
      { header: "Biaya Utility", value: "Utility" },
      { header: "Biaya Depresiasi", value: "Depretiation" },
      { header: "Total", value: "Total" },
    ]
  };

  constructor(router, service, dialog, productionService) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
    this.productionService = productionService;
  }

  get isDollar() {
    if (this.data.CurrencyRate) {
      return this.data.CurrencyRate !== 0;
    }
    else {
      return false;
    }

  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.OrderQuantity = this.formatNumber(this.data.OrderQuantity, 2);
    this.isPosted = this.data.IsPosted;
    this.salesText = `${this.data.Sales.profile.firstname} - ${this.data.Sales.profile.lastname}`;
    var totalDetailAll = 0;
    for (var item of this.data.Machines) {
      var itemChemical = 0;
      if (item.Chemicals.length > 0) {
        itemChemical = item.Chemicals.reduce((previousValue, currentValue) => {
          var res = previousValue + (currentValue.Chemical.Price * currentValue.ChemicalQuantity)

          return res;
        }, 0);
        var itemUtility = item.Machine.Electric + item.Machine.Steam + item.Machine.Water + item.Machine.Solar + item.Machine.LPG;
        var totalDetail = itemChemical + itemUtility + item.Depretiation;
        totalDetailAll += totalDetail;
      }
      this.totalMachinesAndGreige = totalDetailAll + this.data.ActualPrice;

    }

    var directLaborDate = new Date(this.data.Date);
    this.directLaborData = await this.productionService.getDirectLaborCost(directLaborDate.getMonth() + 1, directLaborDate.getFullYear());
    if (this.data.TKLQuantity > 0) {
      this.salaryTotal = this.data.TKLQuantity * (this.directLaborData.WageTotal / this.directLaborData.LaborTotal);
    } else {
      this.salaryTotal = 0;
    }
    this.subTotal = this.salaryTotal + this.data.OTL1 + this.data.OTL2 + this.data.FreightCost;
    this.totalConfirmPrice = this.totalMachinesAndGreige + this.subTotal;
    this.finalConfirmPrice = this.totalConfirmPrice + this.data.CargoCost + this.data.InsuranceCost;
  }
  async bind(context) {
    this.context = context;
  }

  printPdf() {
    this.service.getPdfById(this.data.Id);
  }

  printBudget() {
    this.service.getBudgetById(this.data.Id);
  }

  copyCC() {
    this.router.navigateToRoute("copy", { id: this.data.Id });
  }

  list() {
    this.router.navigateToRoute("list");
  }

  // cancelCallback(event) {
  //   this.list();
  // }

  // editCallback(event) {
  //   if (!this.data.IsPosted) {

  //     this.router.navigateToRoute("edit", { id: this.data.Id });
  //   } else {
  //     return false;
  //   }
  // }

  // deleteCallback(event) {

  //   if (!this.data.IsPosted) {
  //     this.service
  //       .delete(this.data)
  //       .then(result => {
  //         this.list();
  //       })
  //       .catch(e => {
  //         this.dialog.alert(e, "Hapus Cost Calculation");
  //       });
  //   } else {
  //     return false;
  //   }

  // }


  edit(data) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  delete() {
    this.service
      .delete(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.dialog.alert(e, "Hapus Cost Calculation");
      });
  }

  formatNumber(input, decimalPlaces){
    return (input).toFixed(decimalPlaces).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  }
}
