import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");
const US = "US$. ";
const RP = "Rp. ";

@inject(Router, Service, Dialog)
export class View {
  title = "Detail Cost Calculation Export Garment";
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

  costCalculationGarment_MaterialsInfo = {
    columns: [
      { header: "Kategori", value: "Category" },
      { header: "Kode Barang", value: "Product.code" },
      { header: "Komposisi", value: "Product.composition" },
      { header: "Konstruksi", value: "Product.construction" },
      { header: "Yarn", value: "Product.yarn" },
      { header: "Width", value: "Product.width" },
      { header: "Deskripsi", value: "Description" },
      { header: "Kuantitas", value: "Quantity" },
      { header: "Harga Per Satuan (USD)", value: "PricePerUnit" },
      { header: "Total (USD)", value: "Total" }
    ]
  };

  priceInfo = {
    columns: [
      { header: "FOB Price", value: "FOB_Price" },
      { header: "CMT Price", value: "CMT_Price" },
      { header: "CNF Price", value: "CNF_Price" },
      { header: "CIF Price", value: "CIF_Price" }
    ]
  };

  constructor(router, service, dialog) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
  }

  get isDollar() {
    return this.data.Rate.Id !== 0;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    this.data.FabricAllowance = numeral(this.data.FabricAllowance).format();
    this.data.AccessoriesAllowance = numeral(
      this.data.AccessoriesAllowance
    ).format();
    let total = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        total += Number(item.Total);
      });
    }
    total += this.data.ProductionCost;
    this.data.Total = total;
    this.data.AfterOTL1 = this.data.Total + this.data.OTL1.CalculatedValue;
    this.data.AfterOTL2 = this.data.AfterOTL1 + this.data.OTL2.CalculatedValue;
    this.data.AfterRisk = (100 + this.data.Risk) * this.data.AfterOTL2 / 100;
    this.data.AfterFreightCost = this.data.AfterRisk + this.data.FreightCost;
    this.data.ConfirmPriceWithRate =
      this.data.ConfirmPrice * this.data.Rate.Value;
    let CM_Price = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        CM_Price += Number(item.CM_Price);
      });
    }
    let FOB_Price = this.data.ConfirmPrice + CM_Price;
    this.data.ConfirmPrice = this.isDollar
      ? US + numeral(this.data.ConfirmPrice).format()
      : RP + numeral(this.data.ConfirmPrice).format();
    this.data.FOB_Price = this.isDollar
      ? US + numeral(FOB_Price).format()
      : RP + numeral(FOB_Price).format();
    this.data.CMT_Price =
      CM_Price > 0 ? this.data.ConfirmPrice : numeral(0).format();
    this.data.CNF_Price = this.isDollar
      ? US + numeral(0).format()
      : RP + numeral(0).format();
    this.data.CIF_Price = this.isDollar
      ? US + numeral(0).format()
      : RP + numeral(0).format();
    this.data.priceInfo = [
      {
        FOB_Price: this.data.FOB_Price,
        CMT_Price: this.data.CMT_Price,
        CNF_Price: this.data.CNF_Price,
        CIF_Price: this.data.CIF_Price
      }
    ];
    this.data.Freight = this.isDollar
      ? US + numeral(this.data.Freight).format()
      : RP + numeral(this.data.Freight).format();
    this.data.Insurance = this.isDollar
      ? US + numeral(this.data.Insurance).format()
      : RP + numeral(this.data.Insurance).format();
    this.data.SMV_Cutting = numeral(this.data.SMV_Cutting).format();
    this.data.SMV_Sewing = numeral(this.data.SMV_Sewing).format();
    this.data.SMV_Finishing = numeral(this.data.SMV_Finishing).format();
    this.data.SMV_Total = numeral(this.data.SMV_Total).format();

    this.data.LeadTime = `${this.data.LeadTime} hari`
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

  cancelCallback(event) {
    this.list();
  }

  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.Id });
  }

  deleteCallback(event) {
    this.service
      .delete(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.dialog.alert(e, "Hapus Cost Calculation");
      });
  }
}
