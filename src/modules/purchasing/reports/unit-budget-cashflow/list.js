import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { CurrencyService } from "./currency-service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

var CategoryLoader = require("../../../../loader/category-loader");
var DivisionLoader = require("../../../../loader/division-loader");
var UnitLoader = require("../../../../loader/unit-loader");
var AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");

@inject(Router, Service, CurrencyService)
export class List {
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  constructor(router, service, currencyService) {
    this.service = service;
    this.router = router;
    this.currencyService = currencyService;
    this.isEmpty = true;
  }

  bind() {
    this.data = {};
  }

  async search() {
    // this.isSearch = true;
    // this.documentTable.refresh();
    this.collectionOptions = {
      readOnly: true,
    };
    // console.log(this.ItemsCollection);

    let unitId = 0;
    if (this.unit && this.unit.Id) {
      unitId = this.unit.Id;
      this.data.UnitId = this.unit.Id;
    }

    let dueDate = this.dueDate
      ? moment(this.dueDate).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD");

    this.data.DueDate = dueDate;

    let bestCasePromises = this.enums.map((enumItem, index) => {
      return this.service
        .getBestCase({
          layoutOrder: index + 1,
          unitId: unitId,
          dueDate: dueDate,
        })
        .then((bestCases) => {
          return bestCases;
        });
    });

    let worstCaseResult = await this.service
      .getWorstCase({ unitId: unitId, dueDate: dueDate })
      .then((worstCases) => {
        return worstCases;
      });

    // let worstCaseResult = await Promise.all(worstCasePromises)
    //     .then((promiseResult) => promiseResult)

    await Promise.all(bestCasePromises).then((bestCasePromiseResult) => {
      let bestCaseResult = bestCasePromiseResult;

      let bestCases = bestCaseResult.map((response) => {
        if (!response.data || response.data.length <= 0) {
          response.data = [{}];
        }

        return response.data;
      });
      bestCases = [].concat.apply([], bestCases);

      let currencyPromises = [];
      for (let bestCase of bestCases) {
        if (bestCase.CurrencyId && bestCase.CurrencyId > 0) {
          currencyPromises.push(
            this.currencyService.getById(bestCase.CurrencyId)
          );
        }
      }

      return Promise.all(currencyPromises).then((currencyPromiseResult) => {
        let worstCases = [];
        let currencies = currencyPromiseResult;
        if (worstCaseResult) worstCases = worstCaseResult.data;

        // ini data yang akan di submit
        this.data.Items = [];
        for (let bestCase of bestCases) {
          let worstCase = worstCases.find(
            (wc) =>
              wc.LayoutOrder == bestCase.LayoutOrder &&
              wc.CurrencyId == bestCase.CurrencyId
          );
          let currency = currencies.find(
            (c) => c && c.Id == bestCase.CurrencyId
          );

          if (worstCase) {
            this.data.Items.push({
              CurrencyId: bestCase.CurrencyId,
              Currency: currency,
              BestCaseCurrencyNominal: bestCase.CurrencyNominal,
              BestCaseNominal: bestCase.Nominal,
              CurrencyNominal: worstCase.CurrencyNominal,
              Nominal: worstCase.Nominal,
              LayoutOrder: bestCase.LayoutOrder,
              LayoutName: bestCase.LayoutName,
              IsHasBestCase: true,
            });
          } else {
            if (bestCase.LayoutOrder > 0) {
              this.data.Items.push({
                CurrencyId: bestCase.CurrencyId,
                Currency: currency,
                BestCaseCurrencyNominal: bestCase.CurrencyNominal,
                BestCaseNominal: bestCase.Nominal,
                CurrencyNominal: 0,
                Nominal: 0,
                LayoutOrder: bestCase.LayoutOrder,
                LayoutName: bestCase.LayoutName,
                IsHasBestCase: true,
              });
            } else {
              this.data.Items.push({
                CurrencyId: bestCase.CurrencyId,
                Currency: currency,
                BestCaseCurrencyNominal: bestCase.CurrencyNominal,
                BestCaseNominal: bestCase.Nominal,
                CurrencyNominal: 0,
                Nominal: 0,
                LayoutOrder: bestCase.LayoutOrder,
                LayoutName: bestCase.LayoutName,
                IsHasBestCase: false,
              });
            }
          }
        }
      });
    });

    this.isEmpty = this.data.Items.length !== 0 ? false : true;

    console.log("data.Items", this.data.Items);

    const revenue = this.data.Items.filter((item) => item.LayoutOrder <= 6);
    const revenueFromOtherOperating = this.data.Items.filter(
      (item) => item.LayoutOrder >= 7 && item.LayoutOrder <= 8
    );
    // const costOfGoodSold = this.data.Items.filter(
    //   (item) => item.LayoutOrder >= 7 && item.LayoutOrder <= 8
    // );

    console.log("revenue", revenue);
    console.log("revenueFromOtherOperating", revenueFromOtherOperating);
  }

  collection = {
    columns: [
      "Mata Uang",
      "Nominal Valas (Best Case)",
      "Nominal IDR (Best Case)",
      "Actual IDR (Best Case)",
      "Nominal Valas (Worst Case)",
      "Nominal IDR (Worst Case)",
      "Actual IDR (Worst Case)",
    ],
  };

  save() {
    this.service
      .upsertWorstCase(this.data)
      .then(() => {
        this.collectionOptions = {
          readOnly: true,
        };
        this.ItemsCollection.bind();
        alert("berhasil simpan!");
      })
      .catch((e) => {
        alert("terjadi kesalahan");
      });
  }

  exportExcel() {
    // console.log("excel");
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };
    // console.log("pdf");

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.generateExcelLocal(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Lokal Valas":
        return this.service
          .generateExcelLocalForeignCurrency(arg)
          .then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
      case "Import":
        return this.service.generateExcelImport(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
    }
  }

  printPdf() {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };
    // console.log("pdf");

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.printPdfLocal(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Lokal Valas":
        return this.service.printPdfLocalForeignCurrency(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
      case "Import":
        return this.service.printPdfImport(arg).then((result) => {
          //   console.log(result);
          return {
            total: result.TotalData,
            data: result.Data,
          };
        });
    }
  }

  get categoryLoader() {
    return CategoryLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  // get unitLoader() {
  //     return UnitLoader;
  // }

  get unitLoader() {
    return UnitLoader;
  }

  loader = (info) => {
    let order = {};

    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      divisionId,
      accountingUnitId,
      dueDate,
    };

    // console.log(this.activeRole);
    // console.log(arg);

    // return this.service.search(arg)
    //     .then(result => {
    //         console.log(result);
    //         return {
    //             total: result.info.total,
    //             data: result.data
    //         }
    //     });

    if (this.isSearch) {
      switch (this.activeTitle) {
        case "Lokal":
          return this.service.searchLocal(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
        case "Lokal Valas":
          return this.service.searchLocalForeignCurrency(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
        case "Import":
          return this.service.searchImport(arg).then((result) => {
            // console.log(result);
            return {
              total: result.TotalData,
              data: result.Data,
            };
          });
      }
      return {
        total: 0,
        data: [],
      };
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  };

  edit() {
    this.collectionOptions = {
      readOnly: false,
    };
    this.ItemsCollection.bind();
  }

  enums = [
    "ExportSales",
    "LocalSales",
    "CashSales",
    "InteralDivisionSales",
    "InternalUnitSales",
    "InternalIncomeVATCalculation",
    "OthersSales",
    "ExternalIncomeVATCalculation",
    "ImportedRawMaterial",
    "LocalRawMaterial",
    "AuxiliaryMaterial",
    "SubCount",
    "Embalage",
    "Electricity",
    "Coal",
    "FuelOil",
    "SparePartsMachineMaintenance",
    "DirectLaborCost",
    "HolidayAllowanceLaborCost",
    "ConsultantCost",
    "HealthInsuranceSocialSecurity",
    "SeveranceCost",
    "UtilityCost",
    "ImportCost",
    "InternalDivisionPurchase",
    "InternalUnitPurchase",
    "InternalOutcomeVATCalculation",
    "MarketingSalaryCost",
    "MarketingSalaryExpense",
    "MarketingHealthInsuranceSocialSecurity",
    "MarketingHolidayAllowance",
    "AdvertisementCost",
    "BusinessTripCost",
    "ShippingCost",
    "SalesComission",
    "FreightCost",
    "ClaimCost",
    "DocumentationCost",
    "InsuranceCost",
    "OtherSalesCost",
    "GeneralAdministrativeExternalOutcomeVATCalculation",
    "TaxCost",
    "GeneralAdministrativeSalaryCost",
    "GeneralAdministrativeSalaryExpense",
    "GeneralAdministrativeSocialSecurity",
    "GeneralAdministrativeDirectorsSalary",
    "GeneralAdministrativeBuildingMaintenance",
    "GeneralAdministrativeBusinessTrip",
    "GeneralAdministrativeMailingCost",
    "GeneralAdministrativeStationary",
    "GeneralAdministrativeWaterCost",
    "GeneralAdministrativeElectricityCost",
    "GeneralAdministrativeConsultant",
    "GeneralAdministrativeTraining",
    "GeneralAdministrativeCertification",
    "GeneralAdministrativeDonation",
    "GeneralAdministrativeGuestEntertainment",
    "GeneralAdministrativeVehicleBuildingMachineInsurance",
    "GeneralAdministrativeCorporateHousehold",
    "GeneralAdministrativeSeveranceCost",
    "GeneralAdministrativeHolidayAllowance",
    "GeneralAdministrativeVehicleCost",
    "GeneralAdministrativeSecurityCost",
    "GeneralAdministrativeOthersCost",
    "GeneralAdministrativeCommunicationCost",
    "OthersOperationalCost",
    "CashInDeposit",
    "CashInOthers",
    "MachineryPurchase",
    "VehiclePurchase",
    "InventoryPurchase",
    "ComputerToolsPurchase",
    "ProductionToolsMaterialsPurchase",
    "ProjectPurchase",
    "CashOutDesposit",
    "CashInAffiliates",
    "CashInForexTrading",
    "CashInCompanyReserves",
    "CashInLoanWithdrawalOthers",
    "CashOutInstallments",
    "CashOutBankInterest",
    "CashOutBankAdministrationFee",
    "CashOutAffiliates",
    "CashOutForexTrading",
    "CashOutOthers",
  ];
}
