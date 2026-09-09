import { bindable, inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";
import { UnpostDialog } from "./template/dialog/unpost";
import numeral from "numeral";
import { Base64Helper } from '../../../utils/base-64-coded-helper';
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

  CM_Price = 0;
  costCalculationGarment_MaterialsInfo = {
    columns: [
      { header: "No.", value: "MaterialIndex" },
      { header: "CMT", value: "isFabricCM" },
      { header: "Kategori", value: "Category" },
      { header: "Kode Barang", value: "Product.code" },
      { header: "Komposisi", value: "Product.composition" },
      { header: "Konstruksi", value: "Product.const" },
      { header: "Yarn", value: "Product.yarn" },
      { header: "Width", value: "Product.width" },
      { header: "Deskripsi", value: "Description" },
      { header: "Detail Barang", value: "ProductRemark" },
      { header: "Kuantitas", value: "Quantity" },
      { header: "Rincian Quantity", value: "QuantityBreakdown" },
      { header: "Allowance (%)", value: "Allowance" },
      { header: "Harga Per Satuan (Rp)", value: "PricePerUnit" },
      { header: "Total (Rp)", value: "Total" }
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
  @bindable TotalCOGM;
  @bindable GrossProfit;
  @bindable GrossProfitPercentage;
  @bindable NonOperatingExpenses;
  @bindable NonOperatingExpensesPercentage;
  @bindable GeneralAdminExpenses;
  @bindable GeneralAdminExpensesPercentage;
  @bindable SellingExpense;
  @bindable SellingExpensePercentage;
  @bindable TotalBOM;
  @bindable Risk;
  @bindable RiskPercentage;
  @bindable BeaAngkut;
  @bindable BeaAngkutValue;
  @bindable SubTotal;
  @bindable ConfirmPrice;
  @bindable Komisi;
  @bindable KomisiPercentage;
  @bindable NetProfit;
  @bindable NetProfitPercentage;

  @bindable FreightValue;
  @bindable InsuranceValue;
  @bindable ConfirmPriceValue;
  @bindable SMVCutValue;
  @bindable SMVSewValue;
  @bindable SMVFinValue;
  @bindable SMVTotalValue;

  @bindable Ongkir;


  async activate(params, routeConfig, navigationInstruction) {
    const instruction = navigationInstruction.getAllInstructions()[0];
    const parentInstruction = instruction.parentInstruction;
    const byUser = parentInstruction.config.settings.byUser;

    var id = params.id;
    let decoded = Base64Helper.decode(id);
    id = decoded;
    this.data = await this.service.getById(id);
    if(this.data.ApprovalMD.IsApproved || this.data.SCGarmentId)
    {
      this.editCallback=null;
      this.deleteCallback=null;
    }
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

    this.data.Total = total;
    var _confirmPrice= this.data.ConfirmPrice;
    var _insurance=this.data.Insurance;
    
    this.data.ConfirmPriceWithRate =
      this.data.ConfirmPrice * this.data.Rate.Value;
      this.data.ConfirmPriceWithRate=this.data.ConfirmPriceWithRate.toLocaleString('en-EN', { minimumFractionDigits: 2});
    let CM_Price = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        CM_Price += Number(item.CM_Price);
      });
    }
    
    this.CM_Price = ((CM_Price  * 1.05) / this.data.Rate.Value) + _confirmPrice;
    this.CM_Price = US + this.CM_Price.toLocaleString('en-EN', { minimumFractionDigits: 2});

    let FOB_Price = this.data.ConfirmPrice;
    let CNF_Price=_confirmPrice;
    let CIF_Price=_confirmPrice;
    if(this.data.Freight==0)
      {
        CNF_Price=0;
      }
      if(this.data.Insurance ==0)
      {
        CIF_Price=0;
      }
    if(CM_Price >0)
    {
      FOB_Price=0;
    }
    this.ConfirmPriceValue = this.isDollar
      ? US + this.data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 2})//numeral(this.data.ConfirmPrice).format()
      : RP + this.data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 2});
    this.data.FOB_Price = this.isDollar
      ? US + numeral(FOB_Price).format()
      : RP + numeral(FOB_Price).format();
    this.data.CMT_Price =
      CM_Price > 0 ? this.ConfirmPriceValue : numeral(0).format();
    this.data.CNF_Price = this.isDollar
      ? US + numeral(( CNF_Price +this.data.Freight)).format()
      : RP + numeral(0).format();
    this.data.CIF_Price = this.isDollar
      ? US + numeral(CIF_Price +_insurance).format()
      : RP + numeral(0).format();
    this.data.priceInfo = [
      {
        FOB_Price: this.data.FOB_Price,
        CMT_Price: this.data.CMT_Price,
        CNF_Price: this.data.CNF_Price,
        CIF_Price: this.data.CIF_Price
      }
    ];
   
    this.FreightValue = this.isDollar
      ? US + numeral(this.data.Freight).format()
      : RP + numeral(this.data.Freight).format();
    this.InsuranceValue = this.isDollar
      ? US + numeral(this.data.Insurance).format()
      : RP + numeral(this.data.Insurance).format();
    this.SMVCutValue = numeral(this.data.SMV_Cutting).format();
    this.SMVSewValue = numeral(this.data.SMV_Sewing).format();
    this.SMVFinValue = numeral(this.data.SMV_Finishing).format();
    this.SMVTotalValue = numeral(this.data.SMV_Total).format();

    this.data.LeadTime = `${this.data.LeadTime} hari`
    

    this.data.BookingOrderId =this.data.BookingOrderId;
    this.data.BookingOrderItemId = this.data.BookingOrderItemId;
    this.data.BookingOrderNo =this.data.BookingOrderNo;
    this.data.ConfirmDate = this.data.ConfirmDate;
    this.data.BOQuantity = this.data.BOQuantity;

    this.data.MarketingName =this.data.MarketingName;
    this.data.ResponsibleName = this.data.ResponsibleName;


    this.hasUnpost = this.data.IsPosted && !(this.data.ApprovalIE.IsApproved && this.data.ApprovalMD.IsApproved && this.data.ApprovalPPIC.IsApproved && this.data.ApprovalPurchasing.IsApproved);
    if (this.data.IsPosted) {
      this.editCallback = null;
      this.deleteCallback = null;
    }

    if (!byUser) {
      this.editCallback = null;
      this.deleteCallback = null;
      this.hasUnpost = false; 
    }

    if (this.data.CostCalculationGarment_Materials) {
      for (let material of this.data.CostCalculationGarment_Materials) {
        if (material.TotalShippingFee) {
          this.Ongkir += material.TotalShippingFee;
        }
      }
    }

    this.ConfirmPrice = this.data.ConfirmPrice * this.data.Rate.Value;

    this.TotalCOGM = this.data.Total + this.Ongkir;
    this.GrossProfit = this.ConfirmPrice - this.TotalCOGM;
    this.GrossProfitPercentage = (this.GrossProfit / this.ConfirmPrice) * 100;

    this.NonOperatingExpenses = this.data.NonOperatingExpense * this.data.SMV_Total;
    this.NonOperatingExpensesPercentage = (this.NonOperatingExpenses / this.ConfirmPrice) * 100;

    this.GeneralAdminExpenses = this.data.GeneralAdminExpense * this.data.SMV_Total;
    this.GeneralAdminExpensesPercentage = (this.GeneralAdminExpenses / this.ConfirmPrice) * 100;

    this.SellingExpense = this.data.SellingExpense * this.data.SMV_Total;
    this.SellingExpensePercentage = (this.SellingExpense / this.ConfirmPrice) * 100;

    this.TotalBOM = this.TotalCOGM + this.NonOperatingExpenses + this.GeneralAdminExpenses + this.SellingExpense;

    this.Risk = this.TotalBOM + (this.TotalBOM * this.data.Risk / 100);
    this.RiskPercentage = this.data.Risk;

    // this.BeaAngkut = this.data.FreightCost + this.Risk;
    // this.BeaAngkutValue = this.data.FreightCost;

    //this.SubTotal = this.BeaAngkut;
    

    this.Komisi = this.ConfirmPrice * this.data.CommissionPortion / 100;
    this.KomisiPercentage = this.data.CommissionPortion;

    this.NetProfit = (this.ConfirmPrice - this.Komisi) - this.Risk;
    this.NetProfitPercentage = (this.NetProfit / this.ConfirmPrice) * 100;
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

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  download(id) {
    this.service.downloadTemplateMaterialCC(id);
  }

  editCallback(event) {
    const encoded = Base64Helper.encode(this.data.Id);
    this.router.navigateToRoute("edit", { id: encoded });
  }

  deleteCallback(event) {
    if(confirm("Delete data?")) {
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

  unpostCallback() {
    this.dialog.show(UnpostDialog, {})
      .then(response => {
        if (!response.wasCancelled) {
          this.service.unpostCC({ Id: this.data.Id, reason: JSON.stringify(response.output) })
            .then(result => {
              this.list();
            })
            .catch(error => {
              if (typeof error === 'string') {
                alert(`Unpost dibatalkan : ${error}`);
              } else {
                alert(`Error : ${error.message}`);
              }
            });
        }
      });
  }
}
