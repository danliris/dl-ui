import { inject } from "aurelia-framework";
import { Service } from "./service";
import { CurrencyService } from "./currency-service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

var UnitLoader = require("../../../../loader/unit-loader");
var AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");

@inject(Router, Service, CurrencyService)
export class List {
  constructor(router, service, currencyService) {
    this.service = service;
    this.router = router;
    this.currencyService = currencyService;
    this.error = {};
    this.unit = "";
    this.dueDate = null;
    this.isEmpty = true;
    this.isEdit = false;
    this.collectionOptions = {
      readOnly: true,
    };
    this.rowSpan = {};
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

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

  bind() {
    this.data = {};
  }

  async search() {
    this.collectionOptions = {
      readOnly: true,
    };
    // console.log(this.ItemsCollection);

    if (this.unit === "" || this.dueDate === null) {
      this.error.unit = "Unit harus diisi";
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.dueDate = "";

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

      await Promise.all(bestCasePromises).then((bestCasePromiseResult) => {
        let bestCaseResult = bestCasePromiseResult;

        let bestCases = bestCaseResult.map((response) => {
          if (!response.data || response.data.length <= 0) {
            response.data = [{}];
          }

          return response.data;
        });

        bestCases = [].concat.apply([], bestCases);

        // console.log(bestCases);

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
                BestCaseActualNominal: bestCase.ActualNominal,
                CurrencyNominal: worstCase.CurrencyNominal,
                Nominal: worstCase.Nominal,
                ActualNominal: worstCase.ActualNominal,
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
                  BestCaseActualNominal: bestCase.ActualNominal,
                  CurrencyNominal: 0,
                  Nominal: 0,
                  ActualNominal: 0,
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
                  BestCaseActualNominal: bestCase.ActualNominal,
                  CurrencyNominal: 0,
                  Nominal: 0,
                  ActualNominal: 0,
                  LayoutOrder: bestCase.LayoutOrder,
                  LayoutName: bestCase.LayoutName,
                  IsHasBestCase: false,
                });
              }
            }
          }
        });
      });

      const getItem = (min, max) => (item) =>
        item.LayoutOrder >= min && item.LayoutOrder <= max;

      // OPERATING ACTIVITIES
      const revenue = this.data.Items.filter(getItem(1, 6));
      const otherRevenue = this.data.Items.filter(getItem(7, 8));
      const cogSold = this.data.Items.filter(getItem(9, 28));
      const sellingExpenses = this.data.Items.filter(getItem(29, 41));
      const gaExpenses = this.data.Items.filter(getItem(42, 43));
      const generalExpenses = this.data.Items.filter(getItem(44, 65));
      const telpExpenses = this.data.Items.filter(getItem(66, 66));
      const otherExpenses = this.data.Items.filter(getItem(67, 67));

      // INVESTING ACTIVITIES
      const depoInAndOthers = this.data.Items.filter(getItem(68, 69));
      const assetTetap = this.data.Items.filter(getItem(70, 75));
      const depoOut = this.data.Items.filter(getItem(76, 76));

      // FINANCING ACTIVITIES
      const loanWithdrawal = this.data.Items.filter(getItem(77, 77));
      const othersCI = this.data.Items.filter(getItem(78, 81));
      const loanInstallment = this.data.Items.filter(getItem(82, 83));
      const bankExpenses = this.data.Items.filter(getItem(84, 84));
      const othersCO = this.data.Items.filter(getItem(85, 87));

      const joined = [
        "Revenue",
        ...revenue,
        "Revenue from other operating",
        ...otherRevenue,
        "Total",
        "Cost of Good Sold",
        ...cogSold,
        "Marketing Expenses",
        "Biaya Penjualan",
        ...sellingExpenses,
        "General & Administrative Expenses",
        ...gaExpenses,
        "Biaya umum dan administrasi",
        ...generalExpenses,
        ...telpExpenses,
        "Other Operating Expenses",
        ...otherExpenses,
        "Total",
        "Surplus/Deficit-Cash from Operating Activities",
        "Free space",
        ...depoInAndOthers,
        "Total",
        "Pembayaran pembelian asset tetap :",
        ...assetTetap,
        ...depoOut,
        "Total",
        "Surplus/Deficit-Cash from Investing Activities",
        "Free space",
        ...loanWithdrawal,
        "Others :",
        ...othersCI,
        "Total",
        "Loan Installment and Interest expense",
        ...loanInstallment,
        "Bank Expenses",
        ...bankExpenses,
        "Others :",
        ...othersCO,
        "Total",
        "Surplus/Deficit-Cash from Financing Activities",
        "BEGINNING BALANCE",
        "CASH SURPLUS/DEFICIT",
        "ENDING BALANCE",
        "Kenyataan",
        "Selisih",
        "Rate $",
        "TOTAL SURPLUS (DEFISIT) EQUIVALENT",
      ];

      // const modifiedJoined = [];
      // joined.map((item) => {
      //   const bestCaseActualNominal =
      //     item && item.Currency && item.Currency.Code !== "IDR"
      //       ? item.BestCaseCurrencyNominal * item.Currency.Rate
      //       : item.BestCaseNominal;

      //   const modifiedItem =
      //     typeof item === "string"
      //       ? item
      //       : {
      //           ...item,
      //           BestCaseActualNominal: bestCaseActualNominal,
      //         };

      //   modifiedJoined.push(modifiedItem);
      // });

      // console.log("Revenue", revenue);
      // console.log("Revenue from other operating", otherRevenue);
      // console.log("Cost of Good Sold", cogSold);
      // console.log("Biaya Penjualan", sellingExpenses);
      // console.log("General & Administrative Expenses", gaExpenses);
      // console.log("Biaya umum dan administrasi", generalExpenses);
      // console.log("Telephone, Fax & Internet", telpExpenses);
      // console.log("Other Operating Expenses", otherExpenses);
      // console.log("Deposito & Lain-lain", depoInAndOthers);
      // console.log("Pembayaran pembelian asset tetap", assetTetap);
      // console.log("Cash Out Deposito", depoOut);
      // console.log("Loan Withdrawal", loanWithdrawal);
      // console.log("Others Cash In", othersCI);
      // console.log("Loan Installment and Interest expense", loanInstallment);
      // console.log("Bank Expenses", bankExpenses);
      // console.log("Others Cash Out", othersCO);

      this.isEmpty = this.data.Items.length !== 0 ? false : true;
      // this.data.Items = modifiedJoined;
      this.data.Items = joined;

      // console.log(joined);

      const itemsNoString = this.data.Items.filter(
        (item) => typeof item !== "string"
      );

      const rowSpan = itemsNoString
        .map((item) => {
          return {
            count: 1,
            layoutOrder: item.LayoutOrder,
          };
        })
        .reduce((a, b) => {
          a[b.layoutOrder] = (a[b.layoutOrder] || 0) + b.count;
          return a;
        }, {});

      this.rowSpan = rowSpan;

      const rowSpanArr = Object.values(rowSpan);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      const oaciRowSpan = rowSpanArr.slice(0, 8).reduce(reducer, 3);
      const oacoRowSpan = rowSpanArr.slice(8, 67).reduce(reducer, 8);
      const iaciRowSpan = rowSpanArr.slice(67, 69).reduce(reducer, 2);
      const iacoRowSpan = rowSpanArr.slice(69, 76).reduce(reducer, 3);
      const faciRowSpan = rowSpanArr.slice(76, 81).reduce(reducer, 3);
      const facoRowSpan = rowSpanArr.slice(81, 87).reduce(reducer, 5);

      this.calRowSpan = {
        oaciRowSpan,
        oacoRowSpan,
        iaciRowSpan,
        iacoRowSpan,
        faciRowSpan,
        facoRowSpan,
        oaRowSpan: oaciRowSpan + oacoRowSpan,
        iaRowSpan: iaciRowSpan + iacoRowSpan,
        faRowSpan: faciRowSpan + facoRowSpan,
      };

      // console.log("this.data.Items", this.data.Items);
      // console.log(this.calRowSpan);
      // console.log("this.rowSpan", this.rowSpan);
    }
  }

  reset() {
    this.unit = "";
    this.dueDate = null;
  }

  save() {
    const tempDataItems = this.data.Items;
    const newDataItems = this.data.Items.filter(
      (item) => typeof item !== "string"
    );
    this.data.Items = newDataItems;
    this.service
      .upsertWorstCase(this.data)
      .then(() => {
        this.isEdit = false;
        this.collectionOptions = {
          readOnly: true,
        };

        setTimeout(() => {
          this.ItemsCollection.bind();
        }, 50);

        this.data.Items = tempDataItems;
        alert("Data berhasil disimpan!");
      })
      .catch((e) => {
        this.data.Items = tempDataItems;
        alert("Terjadi kesalahan.");
      });
  }

  edit() {
    this.isEdit = true;
    this.collectionOptions = {
      readOnly: false,
    };

    setTimeout(() => {
      this.ItemsCollection.bind();
    }, 50);
  }

  get unitLoader() {
    return UnitLoader;
  }
}
