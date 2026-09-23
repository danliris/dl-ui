import { Router } from "aurelia-router";
import {
  inject,
  bindable,
  BindingEngine,
  observable,
  computedFrom,
} from "aurelia-framework";
import { Service } from "./service";
import { ServiceEffeciency } from "./service-efficiency";
import { RateService } from "./service-rate";
import { ServiceCore } from "./service-core";
import moment from "moment";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");
const rateNumberFormat = "0,0.000";
var PreSalesContractLoader = require("../../../loader/garment-pre-sales-contracts-loader");
var BookingOrderLoader = require("../../../loader/garment-booking-order-by-no-for-ccg-loader");
var GarmentMarketingLoader = require("../../../loader/garment-marketings-loader");
var SizeRangeLoader = require("../../../loader/size-range-loader");
var ComodityLoader = require("../../../loader/garment-comodities-loader");
var UOMLoader = require("../../../loader/uom-loader");
var UnitLoader = require("../../../loader/garment-units-gmt-loader");

@inject(
  Router,
  BindingEngine,
  ServiceEffeciency,
  RateService,
  Element,
  ServiceCore,
  Service
)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable OLCheck;
  @bindable OTL1Check;
  @bindable OTL2Check;
  @bindable OTL3Check;
  @bindable Quantity;
  @bindable data = {};
  @bindable error = {};
  @bindable SelectedRounding;
  @bindable isCopy = false;
  @bindable isSample = false;
  @bindable previewData = [];
  @bindable headers = [];
  @bindable viewDataTable = false;
  @bindable dataMaterialUpload = [];
  @bindable dataMaterial = [];
  @bindable errorUpload;
  @bindable hasSCNO;
  @bindable hasQuantity;
  @bindable selectedCCType;

  leadTimeList = ["", "25 hari", "40 hari"];
  subconTypes = [
    "SUBCON SEWING",
    "SUBCON CUTTING SEWING",
    "SUBCON CUTTING SEWING FINISHING",
  ];

  defaultRate = { Id: 0, Value: 0, CalculatedValue: 0 };
  length0 = {
    label: {
      align: "left",
    },
  };
  length4 = {
    label: {
      align: "left",
      length: 4,
    },
  };
  length6 = {
    label: {
      align: "left",
      length: 6,
    },
  };
  length8 = {
    label: {
      align: "left",
      length: 8,
    },
  };

  costCalculationGarment_MaterialsInfoUploads = {
    columns: [
      { header: "No." },
      { header: "PR Master" },
      { header: "CMT", value: "isFabricCM" },
      { header: "No. PO" },
      { header: "Kategori", value: "Category" },
      { header: "Kode Barang", value: "ProductCode" },
      { header: "Komposisi", value: "Composition" },
      { header: "Konstruksi", value: "Construction" },
      { header: "Yarn", value: "Yarn" },
      { header: "Width", value: "Width" },
      { header: "Deskripsi", value: "Description" },
      { header: "Detail Barang", value: "ProductRemark" },
      { header: "Kuantitas", value: "Quantity" },
      { header: "Satuan", value: "SatuanQuantity" },
      { header: "Price", value: "Price" },
      { header: "Satuan", value: "SatuanPrice" },
      { header: "Konversi", value: "Conversion" },
      { header: "Total", value: "Total" },
      { header: "Allowance (%)", value: "Allowance" },
      { header: "Ongkir (%)", value: "ShippingFeePortion" },
      { header: "Jumlah Ongkir", value: "TotalShippingFee" },
      { header: "Kuantitas Budget", value: "BudgetQuantity" },
    ],
    options: {},
  };
  radio = {
    Dollar: "Dollar",
    Rupiah: "Rupiah",
  };

   preSalesContractFilter = {
    IsPosted: true,
    'SCType == "JOB ORDER" || SCType == "SUBCON" || SCType == "TERIMA SUBCON" || SCType == "SUBCON KELUAR"': true,
  };

  constructor(
    router,
    bindingEngine,
    serviceEffeciency,
    rateService,
    element,
    serviceCore,
    service,
  ) {
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.efficiencyService = serviceEffeciency;
    this.rateService = rateService;
    this.element = element;
    this.selectedRate = "USD";
    this.serviceCore = serviceCore;
    this.service = service;
  }

  async bind(context) {
    this.context = context;
    this.selectedBookingOrderViewModel = this.context.selectedBookingOrderViewModel;
    this.data = this.context.data;
    this.error = this.context.error;
    this.create = this.context.create;
    this.selectedSubconType = this.data.SubconType ? this.data.SubconType : "";
    this.quantity = this.data.Quantity ? this.data.Quantity : 1;
    this.data.Risk = this.data.Risk ? this.data.Risk : 5;
    this.imageSrc = this.data.ImageFile =
      this.isEdit || this.isCopy ? this.data.ImageFile || "#" : "#";
    this.selectedLeadTime = this.data.LeadTime
      ? `${this.data.LeadTime} hari`
      : "";
    this.selectedUnit = this.data.Unit && this.data.Unit.Id ? this.data.Unit : null;
    this.data.OTL1 = this.data.OTL1
      ? this.data.OTL1
      : Object.assign({}, this.defaultRate);
    this.data.OTL2 = this.data.OTL2
      ? this.data.OTL2
      : Object.assign({}, this.defaultRate);
    this.data.ConfirmPrice = this.data.ConfirmPrice;
    if (!this.create) {
      this.selectedBookingOrder = {
        BookingOrderId: this.data.BookingOrderId,
        BookingOrderItemId: this.data.BookingOrderItemId,
        BookingOrderNo: this.data.BookingOrderNo,
        ConfirmDate: this.data.ConfirmDate,
        ConfirmQuantity: this.data.BOQuantity,
        ComodityName: this.data.Comodity.Name,
      };
      this.selectedGarmentMarketing = {
        Name: this.data.MarketingName,
        ResponsibleName: this.data.ResponsibleName,
      };

      this.selectedComodity = {
        Id: this.data.Comodity.Id,
        Code: this.data.Comodity.Code,
        Name: this.data.Comodity.Name,
      };
    } else {
      this.selectedBookingOrder = null;
      this.selectedGarmentMarketing = null;
      this.selectedComodity = null;
    }

    let promises = [];

    let wage;
    if (this.data.Wage) {
      wage = new Promise((resolve, reject) => {
        resolve(this.data.Wage);
      });
      this.data.Wage.Value = this.data.Wage.Value.toLocaleString("en-EN", {
        minimumFractionDigits: 2,
      });
    } else {
      this.data.Wage = this.defaultRate;
      wage = this.rateService
        .search({ filter: '{Name:"OL"}' })
        .then((results) => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(
            numeral(result.Value).format(rateNumberFormat)
          ).value();
          return result;
        });
      this.data.Wage.Value = this.data.Wage.Value.toLocaleString("en-EN", {
        minimumFractionDigits: 2,
      });
    }
    promises.push(wage);

    let THR;
    if (this.data.THR) {
      THR = new Promise((resolve, reject) => {
        resolve(this.data.THR);
      });
    } else {
      this.data.THR = this.defaultRate;
      THR = this.rateService
        .search({ filter: '{Name:"THR"}' })
        .then((results) => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(
            numeral(result.Value).format(rateNumberFormat)
          ).value();
          return result;
        });
    }
    promises.push(THR);

    let rate;
    if (this.data.Rate) {
      rate = new Promise((resolve, reject) => {
        resolve(this.data.Rate);
      });
    } else {
      this.data.Rate = this.defaultRate;
      rate = this.rateService
        .search({ filter: '{Name:"USD"}' })
        .then((results) => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(
            numeral(result.Value).format(rateNumberFormat)
          ).value();
          return result;
        });
    }
    promises.push(rate);

    let all = await Promise.all(promises);
    this.data.Wage = all[0];
    this.data.Wage.Value = this.data.Wage.Value.toLocaleString("en-EN", {
      minimumFractionDigits: 2,
    });
    this.data.THR = all[1];
    this.data.Rate = all[2];
    if (!this.selectedUnit) {
      const units = await UnitLoader('GMT', {});
      if (units && units.length > 0) {
        this.selectedUnit = units[0];
      }
    }
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.QuantityOrder = this.data.Quantity;
        item.Rate = this.data.Rate;
        item.SMV_Cutting = this.data.SMV_Cutting;
        item.SMV_Sewing = this.data.SMV_Sewing;
        item.SMV_Finishing = this.data.SMV_Finishing;
        item.THR = this.data.THR;
        item.Wage = this.data.Wage;
        item.SMV_Total = this.data.SMV_Total;
        item.Efficiency = this.data.Efficiency;
        item.CCType = this.data.CCType;
        item.SubconType = this.data.SubconType;
      });
    }

    this.isSample = this.data.IsSample;
    this.costCalculationGarment_MaterialsInfoUploads.options.CCId = this.data.Id;
    this.costCalculationGarment_MaterialsInfoUploads.options.BuyerCode = this.data.BuyerBrand ? this.data.BuyerBrand.Code : "";
    this.costCalculationGarment_MaterialsInfoUploads.options.IsEditMaterial = this.isEdit;
    this.costCalculationGarment_MaterialsInfoUploads.options.IsCopyCC =  this.isCopy;
    this.costCalculationGarment_MaterialsInfoUploads.options.CCId = this.data.Id;
    this.costCalculationGarment_MaterialsInfoUploads.options.SCId = this.data.PreSCId;
    this.costCalculationGarment_MaterialsInfoUploads.options.OTLRate = this.data.OTLRate;
  }

  selectedSampleChanged(value){
    if(this.data.IsSample){
      this.isSample = true;
    }else{
      this.isSample = false;
    }
  }
  get preSalesContractLoader() {
    return PreSalesContractLoader;
  }

  get garmentMarketingLoader() {
    return GarmentMarketingLoader;
  }

  @bindable selectedGarmentMarketing;
  async selectedGarmentMarketingChanged(newValue, oldValue) {
    if (newValue) {
      this.data.MarketingName = newValue.Name;
      this.data.ResponsibleName = newValue.ResponsibleName;
    } else {
      this.selectedBookingOrder = null;
      this.selectedGarmentMarketing = null;
    }
  }

  @bindable selectedComodity;
  async selectedComodityChanged(newVal, oldValue) {
    this.data.Comodity = newVal;
    if (newVal) {
      this.data.ComodityID = newVal.Id;
      this.data.ComodityCode = newVal.Code;
      this.data.Commodity = newVal.Name;
    } else {
      this.selectedComodity = null;
      this.selectedBookingOrder = null;
    }
  }

  garmentMarketingView = (garmentmarketing) => {
    return `${garmentmarketing.Name} - ${garmentmarketing.ResponsibleName}`;
  };

  get bookingOrderLoader() {
    return BookingOrderLoader;
  }

  bookingOrderView = (bookingorder) => {
    return `${bookingorder.BookingOrderNo} | ${bookingorder.ComodityName} | ${
      bookingorder.Remark
    } | ${bookingorder.ConfirmQuantity} | ${moment(
      bookingorder.ConfirmDate
    ).format("DD MMM YYYY")}`;
  };

  get filter() {
    var filter = {};
    filter = {
      BuyerCode: this.data.BuyerBrandCode,
      SectionCode: this.data.Section,
      ComodityCode: this.data.ComodityCode,
    };
    return filter;
  }

  get sizeRangeLoader() {
    return SizeRangeLoader;
  }

  get comodityLoader() {
    return ComodityLoader;
  }
  comodityView = (comodity) => {
    return `${comodity.Code} - ${comodity.Name}`;
  };

  get comodityQuery() {
    var result = { _CreatedBy: "dev217" };
    return result;
  }

  get uomLoader() {
    return UOMLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  };

  get unitDisplay() {
    return this.selectedUnit && this.selectedUnit.Code
      ? `${this.selectedUnit.Code} - ${this.selectedUnit.Name}`
      : '';
  }

  uomView = (uom) => {
    return uom ? `${uom.Unit}` : "";
  };

  get dataSection() {
    return this.data.Section || this.data.SectionName
      ? `${this.data.Section} - ${this.data.SectionName}`
      : "-";
  }

  get dataBuyer() {
    return this.data.Buyer ? this.data.Buyer.Name : "-";
  }

  get dataBuyerBrand() {
    return this.data.BuyerBrand ? this.data.BuyerBrand.Name : "-";
  }

@bindable selectedPreSalesContract;
  async selectedPreSalesContractChanged(newValue, oldValue) {
    if (newValue) {
      this.data.PreSCId = newValue.Id;
      this.data.PreSCNo = newValue.SCNo;
      this.data.Section = newValue.SectionCode;
      this.data.CCType = newValue.SCType;
      const section = await this.serviceCore.getSection(newValue.SectionId);
      this.data.SectionName = section.Name;
      this.data.ApprovalCC = section.ApprovalCC;
      this.data.ApprovalRO = section.ApprovalRO;
      this.data.ApprovalKadiv = section.ApprovalKadiv;

      this.data.Buyer = {
        Id: newValue.BuyerAgentId,
        Code: newValue.BuyerAgentCode,
        Name: newValue.BuyerAgentName,
      };

      this.data.BuyerCode = this.data.Buyer.Code;
      this.data.BuyerBrand = {
        Id: newValue.BuyerBrandId,
        Code: newValue.BuyerBrandCode,
        Name: newValue.BuyerBrandName,
      };

      this.data.BuyerBrandCode = this.data.BuyerBrand.Code;
    } else {
      this.data.PreSCId = 0;
      this.data.PreSCNo = null;
      this.data.Section = null;
      this.data.SectionName = null;
      this.data.ApprovalCC = null;
      this.data.ApprovalRO = null;
      this.data.ApprovalKadiv = null;
      this.data.Buyer = null;
      this.data.BuyerBrand = null;
      this.selectedBookingOrder = null;
      this.data.CCType = null;
    }

    if (oldValue !== newValue && !this.isCopy) {
      this.data.CostCalculationGarment_Materials = [];
    }
    if(this.create || this.isCopy) {
      if(this.selectedBookingOrderViewModel) {
        this.selectedBookingOrderViewModel.editorValue = "";
        this.selectedBookingOrderViewModel._suggestions = {};
        this.selectedBookingOrder = null;
      }
      this.data.BookingOrderId = 0;
      this.data.BookingOrderItemId = 0;
      this.data.BookingOrderNo = null;
      this.data.BOQuantity = 0;
      this.data.ConfirmDate = null;
    }

    if (
      this.data.PreSCNoSource &&
      this.data.PreSCNo !== this.data.PreSCNoSource
    ) {
      const materialsFromPRMaster =
        this.data.CostCalculationGarment_Materials.filter(
          (m) => m.PRMasterItemId > 0
        );
      for (const materialFromPRmaster of materialsFromPRMaster) {
        materialFromPRmaster.IsPRMaster = null;
        materialFromPRmaster.PRMasterId = 0;
        materialFromPRmaster.PRMasterItemId = 0;
        materialFromPRmaster.POMaster = null;
      }
    }
    this.costCalculationGarment_MaterialsInfoUploads.options.BuyerCode = this.data.BuyerBrand ? this.data.BuyerBrand.Code : "";
    this.costCalculationGarment_MaterialsInfoUploads.options.SCId = this.data.PreSCId;
  }

  @bindable selectedBookingOrder;
  async selectedBookingOrderChanged(newValue, oldValue) {
    if (newValue) {
      this.data.BookingOrderId = newValue.BookingOrderId;
      this.data.BookingOrderItemId = newValue.BookingOrderItemId;
      this.data.BookingOrderNo = newValue.BookingOrderNo;
      this.data.BOQuantity = newValue.ConfirmQuantity;
      this.data.ConfirmDate = newValue.ConfirmDate;
    } else {
      this.data.BookingOrderId = 0;
      this.data.BookingOrderItemId = 0;
      this.data.BookingOrderNo = null;
      this.data.BOQuantity = 0;
      this.data.ConfirmDate = null;
    }
  }

  @bindable selectedLeadTime = "";
  selectedLeadTimeChanged(newVal) {
    if (newVal === "25 hari") {
      this.data.LeadTime = 25;
    } else if (newVal === "40 hari") {
      this.data.LeadTime = 40;
    } else this.data.LeadTime = 0;
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

  @bindable selectedRate;

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }
  @computedFrom("error.CostCalculationGarment_MaterialTable")
  get hasError() {
    return (
      (this.error.CostCalculationGarment_MaterialTable
        ? this.error.CostCalculationGarment_MaterialTable.length
        : 0) > 0
    );
  }

  get lineLoader() {
    return lineLoader;
  }

  @bindable quantity;
  async quantityChanged(newValue) {
    this.data.Quantity = newValue;
    this.data.Efficiency = await this.efficiencyService.getEffByQty(
      this.data.Quantity
    );
    this.data.Efficiency.Value = this.data.Efficiency.Value.toLocaleString(
      "en-EN",
      { minimumFractionDigits: 2 }
    );
    let index = this.data.Efficiency.Value
      ? 100 /
        this.data.Efficiency.Value.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
        })
      : 0;
    this.data.Index = numeral(numeral(index).format())
      .value()
      .toLocaleString("en-EN", { minimumFractionDigits: 2 });
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.QuantityOrder = this.data.Quantity;
        item.Efficiency = this.data.Efficiency;
      });
      this.context.itemsCollection.bind();
    }
  }

  @bindable selectedSubconType;
  selectedSubconTypeChanged(newValue) {
    this.data.SubconType = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.SubconType = this.data.SubconType;
      });
      this.context.itemsCollection.bind();
    }
  }

  @bindable selectedUnit;
  @bindable yearRate;
  async selectedUnitChanged(newVal) {
    this.data.Unit = newVal;
    this.data.UnitId = newVal.Id;
    this.data.UnitCode = newVal.Code;
    this.data.BuyerName = newVal.Name;
    if (newVal) {
      this.yearRate = new Date().getFullYear();
      let promises = [];
      const [allExpense] = await Promise.all([
        this.serviceCore.searchRateCC({
          keyword: this.yearRate.toString()
        })
      ]);
      const rates = allExpense.data || [];
      this.data.OTLRate = rates.find(item => item.Code.toUpperCase().includes("OTL"+this.yearRate)) ? rates.find(item => item.Code.toUpperCase().includes("OTL"+this.yearRate)).Rate : 0;
      this.costCalculationGarment_MaterialsInfoUploads.options.OTLRate = this.data.OTLRate;
      this.data.NonOperatingExpense = rates.find(item => item.Code.toUpperCase().includes("BDU"+this.yearRate)) ? rates.find(item => item.Code.toUpperCase().includes("BDU"+this.yearRate)).Rate : 0;
      this.data.GeneralAdminExpense = rates.find(item => item.Code.toUpperCase().includes("BUA"+this.yearRate)) ? rates.find(item => item.Code.toUpperCase().includes("BUA"+this.yearRate)).Rate : 0;
      this.data.SellingExpense = rates.find(item => item.Code.toUpperCase().includes("BP"+this.yearRate)) ? rates.find(item => item.Code.toUpperCase().includes("BP"+this.yearRate)).Rate : 0;

      this.data.UnitCode = newVal.Code;
      this.data.UnitId = newVal.Id;
      this.data.UnitName = newVal.Name;
    }
  }

  get SMV_Cutting() {
      let materials = this.data.CostCalculationGarment_Materials || [];
      let smvCutting = materials
      .filter(m =>
        (((m.Category || {}).name || (m.Category || {}).Name || "").toString().trim().toUpperCase()) === "PROCESS CUTTING"
      )
      .reduce((sum, current) => sum + Number(current.Quantity || 0), 0);

    this.data.SMV_Cutting = numeral(smvCutting).value();

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.SMV_Cutting = this.data.SMV_Cutting;
      });
      // this.context.itemsCollection.bind();
    }
    return numeral(smvCutting).format();
  }

  get SMV_Sewing() {
      let materials = this.data.CostCalculationGarment_Materials || [];
      let smvSewing = materials
      .filter(m =>
        (((m.Category || {}).name || (m.Category || {}).Name || "").toString().trim().toUpperCase()) === "PROCESS SEWING"
      )
      .reduce((sum, current) => sum + Number(current.Quantity || 0), 0);
    this.data.SMV_Sewing = numeral(smvSewing).value();
    
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.SMV_Sewing = this.data.SMV_Sewing;
      });
      // this.context.itemsCollection.bind();
    }
    return numeral(smvSewing).format();
  }

  get SMV_Finishing() {
      let materials = this.data.CostCalculationGarment_Materials || [];
      let smvFinishing = materials
      .filter(m =>
        (((m.Category || {}).name || (m.Category || {}).Name || "").toString().trim().toUpperCase()) === "PROCESS FINISHING"
      )
      .reduce((sum, current) => sum + Number(current.Quantity || 0), 0);
    this.data.SMV_Finishing = numeral(smvFinishing).value();

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.SMV_Finishing = this.data.SMV_Finishing;
      });
      // this.context.itemsCollection.bind();
    }
    
    return numeral(smvFinishing).format();
  }

  @computedFrom("data.SMV_Cutting", "data.SMV_Sewing", "data.SMV_Finishing")
  get SMV_Total() {
    let SMV_Total =
      this.data.SMV_Cutting + this.data.SMV_Sewing + this.data.SMV_Finishing;
    SMV_Total = numeral(SMV_Total).format();
    this.data.SMV_Total = numeral(SMV_Total).value();

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        item.SMV_Total = this.data.SMV_Total;
      });
    }
    return SMV_Total;
  }

  @computedFrom(
    "data.CommissionPortion",
    "data.ConfirmPrice",
    "data.Freight",
    "data.Insurance",
    "data.Rate"
  )
  get commissionRate() {
    let CommissionRate =
      (this.data.CommissionPortion / 100) *
      (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) *
      this.data.Rate.Value;
    CommissionRate = numeral(CommissionRate).format();
    this.data.CommissionRate = numeral(CommissionRate).value();
    return CommissionRate;
  }

  @computedFrom("data.OTL", "data.SMV_Total", "data.SubconType")
  get calculatedRateOTL() {
    let calculatedRateOTL = 0;
    if (this.data.CCType == "SUBCON KELUAR") {
      switch (this.data.SubconType) {
        case "SUBCON SEWING":
          calculatedRateOTL = this.data.SMV_Total
            ? this.data.OTLRate *
              (this.data.SMV_Cutting + this.data.SMV_Finishing)
            : 0;
          break;
        case "SUBCON CUTTING SEWING":
          calculatedRateOTL = this.data.SMV_Total
            ? this.data.OTLRate * this.data.SMV_Finishing
            : 0;
          break;
      }
    } else {
      calculatedRateOTL = this.data.SMV_Total
        ? this.data.OTLRate * this.data.SMV_Total
        : 0;
    }

    calculatedRateOTL = numeral(calculatedRateOTL).format();
    this.data.OTLCalculatedRate = numeral(calculatedRateOTL).value();
    return calculatedRateOTL;
  }

  @computedFrom(
    "data.ConfirmPrice",
    "data.Insurance",
    "data.Freight",
    "data.Rate",
    "data.CommissionRate"
  )
  get NETFOB() {
    let NETFOB =
      (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) *
        this.data.Rate.Value -
      this.data.CommissionRate;
    NETFOB = numeral(NETFOB).format();
    this.data.NETFOB = numeral(NETFOB).value();
    return NETFOB;
  }

  get freightCost() {
    let freightCost = 0;
      if (this.data.CostCalculationGarment_Materials) {
        this.data.CostCalculationGarment_Materials.forEach((item) => {
          freightCost += item.TotalShippingFee;
        });
      }
    
    freightCost = numeral(freightCost).format();
    this.data.FreightCost = numeral(freightCost).value();

    return freightCost;
  }

  @computedFrom(
    "data.NETFOB",
    "data.OTLCalculatedRate",
    "data.OTL1.CalculatedValue",
    "data.OTL2.CalculatedValue",
    "data.Risk",
    "data.FreightCost"
  )
  get NETFOBP() {
    let allMaterialCost = 0;

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach((item) => {
        allMaterialCost += item.Total;
      });
    }
    
    let otlValue = this.data.OTLCalculatedRate > 0 ? this.data.OTLCalculatedRate : (this.data.OTL1.CalculatedValue + this.data.OTL2.CalculatedValue);
    let subTotal =
      allMaterialCost !== 0
        ? ((allMaterialCost + otlValue) 
          * (100 + this.data.Risk)) /
            100 +
          this.data.FreightCost
        : 0;
    let NETFOBP =
      this.data.NETFOB && subTotal !== 0
        ? ((this.data.NETFOB - subTotal) / subTotal) * 100
        : 0;
    NETFOBP = numeral(NETFOBP).format();
    this.data.NETFOBP = numeral(NETFOBP).value();
    return NETFOBP;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  download(id) {
    this.service.downloadTemplateMaterialCC(id);
  }

  downloadErrorExcel(errors) {
    const errorData = errors.map((msg, index) => ({
        No: index + 1,
        Error: msg
    }));
    const worksheet = XLSX.utils.json_to_sheet(errorData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Error Upload");
    XLSX.writeFile(workbook, "Error_Upload.xlsx");
  }

  async handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (jsonData.length === 0) {
            alert("File kosong atau tidak memiliki data.");
            return;
        }
        // Expected header sesuai template
        const expectedHeaders = [
            "PR MASTER",//tidak wajib
            "CMT",//tidak wajib
            "Kode Barang",
            "Keterangan",
            "Detil Barang",
            "Usage per pcs",
            "Satuan Barang",
            "Rincian qty",//tidak wajib
            "Harga",
            "Satuan beli",
            "Konversi",
            "Allowance %",
            "Ongkir %",
            "Remark RO"
        ];

        let actualHeaders = Object.keys(jsonData[0]);
        for (let header of expectedHeaders) {
            if (!actualHeaders.includes(header)) {
                alert(`Template tidak sesuai.`);
                return;
            }
        }

        const cleanData = jsonData.map(row => {
            const cleanedRow = {};
            expectedHeaders.forEach(header => {
                cleanedRow[header] = row.hasOwnProperty(header) ? row[header] : "";
            });
            return cleanedRow;
        });

        jsonData.length = 0;
        jsonData.push(
          ...cleanData.filter(row =>
            Object.values(row).some(val =>
              val !== null &&
              val !== undefined &&
              !(typeof val === "string" && val.trim() === "")
            )
          )
        );

       const mandatoryColumns = [
            "Kode Barang",
            "Keterangan",
            "Usage per pcs",
            "Satuan Barang",
            "Harga",
            "Satuan beli",
            "Konversi",
            "Remark RO"
        ];
        const processKodeBarang = ["PRCSEW", "PRCFIN", "PRCCUT", "PR-PS0000001", "PR-PF0000001", "PR-PC0000001", "PR-P00000001"];
        const skipIfProcess = ["Satuan Barang", "Harga", "Satuan beli", "Konversi", "Remark RO"];
        // Validasi kolom wajib tidak boleh kosong
        const errors = [];
        jsonData.forEach((row, rowIndex) => {
            const kodeBarang = (row["Kode Barang"] || "").toString().trim().toUpperCase();
            const isProcess = processKodeBarang.includes(kodeBarang);
            mandatoryColumns.forEach(col => {
                if (isProcess && skipIfProcess.includes(col)) return;

                const val = row[col];

                // Cek wajib terisi, tapi 0 harus dianggap valid
                const isEmpty =
                    val === null ||
                    val === undefined ||
                    (typeof val === "string" && val.trim() === "");

                if (isEmpty) {
                    errors.push(`Kolom "${col}" pada baris ${rowIndex + 2} tidak boleh kosong`);
                }
            });

        // Validasi Allowance untuk Process
        const allowanceValue = row["Allowance %"];

        const hasAllowance =
            allowanceValue !== null &&
            allowanceValue !== undefined &&
            allowanceValue !== "" &&
            !isNaN(Number(allowanceValue)) &&
            Number(allowanceValue) !== 0;

        if (isProcess && hasAllowance) {
            errors.push(
                `Baris ${rowIndex + 2}: Allowance % tidak boleh diisi untuk kode barang process (${kodeBarang})`
            );
        }

        // Validasi CMT
        const cmtValue = (row["CMT"] || "").toString().trim().toLowerCase();

        const isCMT =
            row["CMT"] === true ||
            ["1", "true", "ya", "yes", "iya", "benar", "cmt"].includes(cmtValue);

        if (
            isCMT &&
            !kodeBarang.toUpperCase().startsWith("CI-") &&
            !kodeBarang.toUpperCase().startsWith("CL-")
        ) {
            errors.push(
                `Baris ${rowIndex + 2}: Jika barang CMT maka gunakan kode barang CMT`
            );
        }
      });
        if (errors.length > 0) {
            if (confirm("Terdapat data kosong, download file error?")) {
                this.downloadErrorExcel(errors);
            }
           
            return;
        }
      this.previewData = jsonData;
      this.headers = actualHeaders;
      await this.pushDataExcel(this.previewData);
    };

    document.getElementById("fileCsv").value = null;
    reader.readAsArrayBuffer(file);
    
  }
async pushDataExcel(value) {
  if (!Array.isArray(value) || value.length === 0) {
    alert("Tidak ada data Excel yang dibaca.");
    document.getElementById("fileCsv").value = "";
    return;
  }

  this.errorUpload = [];
  this.error = {};

  this.data.CostCalculationGarment_Materials = [];
  this.error.CostCalculationGarment_Materials = [];

  const payload = value.map((row, index) => ({
    IsAddPRMaster: row["PR MASTER"] != null && (String(row["PR MASTER"]).trim() === "1" || 
                                                String(row["PR MASTER"]).trim().toLowerCase() === "true" || 
                                                String(row["PR MASTER"]).trim().toLowerCase() == "ya") ||
                                                String(row["PR MASTER"]).trim().toLowerCase() === "yes" ||
                                                String(row["PR MASTER"]).trim().toLowerCase() === "iya" ||
                                                String(row["PR MASTER"]).trim().toLowerCase() === "benar" ||
                                                String(row["PR MASTER"]).trim().toLowerCase() === "prmaster",
    isFabricCM: row["CMT"] != null && (String(row["CMT"]).trim() === "1" ||
                                       String(row["CMT"]).trim().toLowerCase() === "true" ||
                                       String(row["CMT"]).trim().toLowerCase() == "ya") ||
                                       String(row["CMT"]).trim().toLowerCase() === "yes" ||
                                       String(row["CMT"]).trim().toLowerCase() === "iya" ||
                                       String(row["CMT"]).trim().toLowerCase() === "benar" ||
                                       String(row["CMT"]).trim().toLowerCase() === "cmt",
    KodeBarang: (row["Kode Barang"] || "").toString().trim(),
    SatuanBeli: (row["Satuan beli"] || "").toString().trim(),
    SatuanBarang: (row["Satuan Barang"] || "").toString().trim(),
    Description: (row["Keterangan"] || "").toString(),
    ProductRemark: row["Detil Barang"] && row["Detil Barang"].toString().trim() !== "" ? row["Detil Barang"].toString() : "-",
    QuantityBreakdown: !row["Rincian qty"] || parseFloat(row["Rincian qty"]) === 0 ? this.data.Quantity : parseFloat(row["Rincian qty"]),
    Quantity: parseFloat(row["Usage per pcs"]) || 0,
    Price: parseFloat(row["Harga"]) || 0,
    Conversion: parseFloat(row["Konversi"]) || 0,
    ShippingFeePortion: parseFloat(row["Ongkir %"]) || 0,
    Information: (row["Remark RO"] || "").toString(),
    MaterialIndex: index,
    QuantityOrder: this.data.Quantity || 0,
    Allowance: parseFloat(row["Allowance %"]) || 0,
    Rate: this.data.Rate || 0,
    SMV_Cutting: this.data.SMV_Cutting || 0,
    SMV_Sewing: this.data.SMV_Sewing || 0,
    SMV_Finishing: this.data.SMV_Finishing || 0,
    THR: this.data.THR || 0,
    Wage: this.data.Wage || 0,
    SMV_Total: this.data.SMV_Total || 0,
    Efficiency: this.data.Efficiency || 0,
    CCType: this.data.CCType,
    SubconType: this.data.SubconType,
    IsFromUpload: true
  }));
  let resultData = [];

  try {
    resultData = await this.serviceCore.getMaterialFromUpload(payload);
  } catch (error) {
    alert("Gagal mengambil data Product dan UOM. Periksa koneksi Anda.");
    return;
  }

  const materials = Array.isArray(resultData) ? resultData : [];
  const allMaterials = [];

  for (const item of materials) {
    const hasProduct = !!item.Product || item.Product !== null;

    const material = hasProduct
      ? {
          IsAddPRMaster: item.IsAddPRMaster,
          isFabricCM: item.isFabricCM || false,
          Category: item.Category || {},
          Product: item.Product || {},
          Description: item.Description,
          ProductRemark: item.ProductRemark,
          QuantityBreakdown: item.QuantityBreakdown || 0,
          Quantity: item.Quantity || 0,
          UOMQuantity: item.UOMQuantity || null,
          Price: item.Price || 0,
          Conversion: item.Conversion || 0,
          ShippingFeePortion: item.ShippingFeePortion || 0,
          Information: item.Information,
          UOMPrice: item.UOMPrice || null,
          MaterialIndex: item.MaterialIndex || 0,
          QuantityOrder: item.QuantityOrder || 0,
          Allowance: item.Allowance || 0,
          Rate: item.Rate || 0,
          SMV_Cutting: item.SMV_Cutting || 0,
          SMV_Sewing: item.SMV_Sewing || 0,
          SMV_Finishing: item.SMV_Finishing || 0,
          THR: item.THR || 0,
          Wage: item.Wage || 0,
          SMV_Total: item.SMV_Total || 0,
          Efficiency: item.Efficiency || 0,
          CCType: item.CCType,
          SubconType: item.SubconType,
          IsFromUpload: item.IsFromUpload
        }
      : {
          IsAddPRMaster: item.IsAddPRMaster,
          MaterialIndex: item.MaterialIndex,
          Product: { 
            Code: item.KodeBarang || "Tidak ditemukan",
            IsError: true,
            ErrorMessage: `Tidak ditemukan barang dengan kode ${item.KodeBarang}`
          },
          HasError: true,
          IsFromUpload: item.IsFromUpload
        };

    // if (material && material.isFabricCM) {
    //   material.ShippingFeePortion = 0;
    // }
    allMaterials.push(material);
  }

  this.data.CostCalculationGarment_Materials = allMaterials;
  this.data.FabricAllowance = allMaterials
      .filter(x =>
          (((x.Category || {}).name || (x.Category || {}).Name || "").toUpperCase() === "FABRIC")
      )
      .reduce((a, b) => a + Number(b.Allowance || 0), 0);
  this.data.AccessoriesAllowance = allMaterials
      .filter(x =>
          (((x.Category || {}).name || (x.Category || {}).Name || "").toUpperCase() !== "FABRIC")
      )
      .reduce((a, b) => a + Number(b.Allowance || 0), 0);
      this.context.itemsCollection.bind();
}

viewData() {
    this.viewDataTable = !this.viewDataTable;
    if (this.viewDataTable && this.previewData.length === 0) {
        alert("Tidak ada data Excel yang dibaca.");
        this.viewDataTable = false;
    }
}

}
