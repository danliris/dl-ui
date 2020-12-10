import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { CoreService } from "./core-service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

let CategoryLoader = require("../../../../loader/category-loader");
let DivisionLoader = require("../../../../loader/division-loader");
let UnitLoader = require("../../../../loader/unit-loader");
let AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");

@inject(Router, Service, CoreService)
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

  constructor(router, service, coreService) {
    this.service = service;
    this.router = router;
    this.coreService = coreService;
    this.isEmpty = true;
  }

  bind() {
    this.data = {};
  }

  isShown = false;
  async search() {
    this.isShown = false;
    // this.isSearch = true;
    // this.documentTable.refresh();
    this.collectionOptions = {
      readOnly: true,
    };
    console.log(this.ItemsCollection);

    let divisionId = 0;
    if (this.division && this.division.Id) {
      divisionId = this.division.Id;
    }

    let dueDate = this.dueDate
      ? moment(this.dueDate).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD");

    let divisionPromises = this.enums.map((enumItem, index) => {
      return this.service
        .getDivision({
          layoutOrder: index + 1,
          divisionId: divisionId,
          dueDate: dueDate,
        })
        .then((divisions) => {
          return divisions;
        });
    });

    // let worstCaseResult = await Promise.all(worstCasePromises)
    //     .then((promiseResult) => promiseResult)

    await Promise.all(divisionPromises).then((divisionPromiseResult) => {
      let divisionResult = divisionPromiseResult;

      let unitIds = [];
      let layoutOrderData = [];
      let currencyIds = [];
      let data = [];

      for (let response of divisionResult) {
        for (let unitId of response.data.UnitIds) {
          let existingUnitId = unitIds.find(id => id == unitId);
          if (!existingUnitId && unitId > 0) {
            unitIds.push(unitId);
          }
        }

        for (let item of response.data.Items) {
          let existingLayoutOrderData = layoutOrderData.find(datum => datum.LayoutOrder == item.LayoutOrder && datum.CurrencyId == item.CurrencyId);
          if (!existingLayoutOrderData) {
            layoutOrderData.push({ LayoutOrder: item.LayoutOrder, CurrencyId: item.CurrencyId });
          }

          let existingCurrencyId = currencyIds.find(id => item.CurrencyId == id);
          if (!existingCurrencyId && item.CurrencyId > 0) {
            currencyIds.push(item.CurrencyId);
          }

          data.push(item);
        }

      }

      let unitPromises = unitIds.map((id) => this.coreService.getUnitById(id));
      let currencyPromises = currencyIds.map((id) => this.coreService.getCurrencyById(id));

      return Promise.all([Promise.all(unitPromises), Promise.all(currencyPromises)])
        .then((promiseResult) => {
          let units = promiseResult[0];
          let currencies = promiseResult[1];

          let columns = ["Mata Uang"];

          for (let unit of units) {
            columns.push(`Nominal Valas ${unit.Name}`);
            columns.push(`Nominal IDR ${unit.Name}`);
            columns.push(`Nominal Actual ${unit.Name}`);
          }

          let rows = [];
          for (let datum of layoutOrderData) {
            let currency = currencies.find(f => f.Id == datum.CurrencyId);

            let row = Object.create({});
            if (currency) {
              row.CurrencyCode = currency.Code;
            } else {
              row.CurrencyCode = "";
            }
            for (let unit of units) {

              let filteredDatum = data.find(f => f.LayoutOrder == datum.LayoutOrder && f.CurrencyId == datum.CurrencyId && f.UnitId == unit.Id);

              if (filteredDatum) {
                row[`${unit.Code}CurrencyNominal`] = filteredDatum.CurrencyNominal;
                row[`${unit.Code}Nominal`] = filteredDatum.Nominal;
                row[`${unit.Code}ActualNominal`] = filteredDatum.ActualNominal;
              } else {
                row[`${unit.Code}CurrencyNominal`] = 0;
                row[`${unit.Code}Nominal`] = 0;
                row[`${unit.Code}ActualNominal`] = 0;
              }
            }

            rows.push(row);
          }

          this.columns = columns;
          this.rows = rows;
        })

    });

    this.isShown = true;

    setTimeout(() => {
      this.ItemsCollection.bind();

    }, 50);
  }

  columns = [];
  rows = [];

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

  // edit() {
  //   this.collectionOptions = {
  //     readOnly: false,
  //   };
  //   this.ItemsCollection.bind();
  // }

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
    "EmployeeExpenses", // Missing before
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
    "CashInLoanWithdrawal", // Missing before
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

  reset() {
    this.division = null;
    this.dueDate = null;
    this.isShown = false;
  }
}
