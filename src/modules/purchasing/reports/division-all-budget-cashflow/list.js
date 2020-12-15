import { inject } from "aurelia-framework";
import { Service } from "./service";
import { CoreService } from "./core-service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service, CoreService)
export class List {
  constructor(router, service, coreService) {
    this.service = service;
    this.router = router;
    this.coreService = coreService;
    this.error = {};
    this.division = "";
    this.dueDate = null;
    this.isEmpty = true;
    this.collectionOptions = {
      readOnly: true,
    };
    this.rowSpan = {};
    this.total = {
      oaci: [],
      oaco: [],
      oadiff: [],
      iaci: [],
      iaco: [],
      iadiff: [],
      faci: [],
      faco: [],
      fadiff: [],
    };
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  columns = [];
  rows = [];

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

    if (this.dueDate === null) {
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.dueDate = "";

      let divisionId = 0;
      if (this.division && this.division.Id) {
        divisionId = this.division.Id;
        this.data.DivisionId = this.division.Id;
      }

      let dueDate = this.dueDate
        ? moment(this.dueDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.data.DueDate = dueDate;

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

      // let totalOACI = await this.service
      //   .getOACI({ dueDate })
      //   .then((result) => result);

      // let totalOACO = await this.service
      //   .getOACO({ dueDate })
      //   .then((result) => result);

      // let totalOADiff = await this.service
      //   .getOADiff({ dueDate })
      //   .then((result) => result);

      // let totalIACI = await this.service
      //   .getIACI({ dueDate })
      //   .then((result) => result);

      // let totalIACO = await this.service
      //   .getIACO({ dueDate })
      //   .then((result) => result);

      // let totalIADiff = await this.service
      //   .getIADiff({ dueDate })
      //   .then((result) => result);

      // let totalFACI = await this.service
      //   .getFACI({ dueDate })
      //   .then((result) => result);

      // let totalFACO = await this.service
      //   .getFACO({ dueDate })
      //   .then((result) => result);

      // let totalFADiff = await this.service
      //   .getFADiff({ dueDate })
      //   .then((result) => result);

      await Promise.all(divisionPromises).then((divisionPromiseResult) => {
        let divisionResult = divisionPromiseResult;

        let unitIds = [];
        let layoutOrderData = [];
        let currencyIds = [];
        let data = [];

        for (let response of divisionResult) {
          for (let unitId of response.data.UnitIds) {
            let existingUnitId = unitIds.find((id) => id == unitId);
            if (!existingUnitId && unitId > 0) {
              unitIds.push(unitId);
            }
          }

          for (let item of response.data.Items) {
            let existingLayoutOrderData = layoutOrderData.find(
              (datum) =>
                datum.LayoutOrder == item.LayoutOrder &&
                datum.CurrencyId == item.CurrencyId
            );
            if (!existingLayoutOrderData) {
              layoutOrderData.push({
                LayoutOrder: item.LayoutOrder,
                CurrencyId: item.CurrencyId,
              });
            }

            let existingCurrencyId = currencyIds.find(
              (id) => item.CurrencyId == id
            );
            if (!existingCurrencyId && item.CurrencyId > 0) {
              currencyIds.push(item.CurrencyId);
            }

            data.push(item);
          }
        }

        let unitPromises = unitIds.map((id) =>
          this.coreService.getUnitById(id)
        );
        let currencyPromises = currencyIds.map((id) =>
          this.coreService.getCurrencyById(id)
        );

        return Promise.all([
          Promise.all(unitPromises),
          Promise.all(currencyPromises),
        ]).then((promiseResult) => {
          let units = promiseResult[0];
          let currencies = promiseResult[1];

          let divisions = [];
          if (units.length > 0) {
            for (let unit of units) {
              let existingDivision = divisions.find((division) => division.Id == unit.Division.Id);
              if (!existingDivision && unit.Division && unit.Division.Id > 0) {
                divisions.push(unit.Division)
              }
            }
          }

          let columns = ["MATA UANG"];

          for (let division of divisions) {
            let selectedUnits = units.filter((unit) => unit.Division.Id == division.Id);
            for (let unit of selectedUnits) {
              columns.push(`${unit.Name} VALAS`);
              columns.push(`${unit.Name} IDR`);
              // columns.push(`Nominal Actual ${unit.Name}`);
            }

            columns.push(`DIVISI ${division.Name} VALAS`);
            columns.push(`DIVISI ${division.Name} IDR`);
          }

          // this.total.oaci = totalOACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.oaco = totalOACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.oadiff = totalOADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iaci = totalIACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iaco = totalIACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.iadiff = totalIADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.faci = totalFACI.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.faco = totalFACO.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });
          // this.total.fadiff = totalFADiff.data.map((datum) => {
          //   let currency = currencies.find(
          //     (c) => c && c.Id == datum.CurrencyId
          //   );
          //   datum.Currency = currency;
          //   return datum;
          // });

          let rows = [];
          for (let datum of layoutOrderData) {
            let currency = currencies.find((f) => f.Id == datum.CurrencyId);

            let row = Object.create({});
            row.LayoutOrder = datum.LayoutOrder;

            if (currency) {
              row.CurrencyCode = currency.Code;
            } else {
              row.CurrencyCode = "";
            }

            let actualNominal = 0;
            for (let division of divisions) {
              let selectedUnits = units.filter((unit) => unit.Division.Id == division.Id);
              let currencyNominal = 0;
              let nominal = 0;
              for (let unit of selectedUnits) {
                let filteredDatum = data.find(
                  (f) =>
                    f.LayoutOrder == datum.LayoutOrder &&
                    f.CurrencyId == datum.CurrencyId &&
                    f.UnitId == unit.Id
                );

                if (filteredDatum) {
                  actualNominal += filteredDatum.ActualNominal;

                  row[`${unit.Code}CurrencyNominal`] =
                    filteredDatum.CurrencyNominal;
                  currencyNominal += filteredDatum.CurrencyNominal
                  row[`${unit.Code}Nominal`] = filteredDatum.Nominal;
                  nominal += filteredDatum.Nominal;
                  // row[`${unit.Code}ActualNominal`] = filteredDatum.ActualNominal;
                } else {
                  row[`${unit.Code}CurrencyNominal`] = 0;
                  row[`${unit.Code}Nominal`] = 0;
                  // row[`${unit.Code}ActualNominal`] = 0;
                }
              }
              row[`${division.Code}CurrencyNominal`] = currencyNominal;
              row[`${division.Code}Nominal`] = nominal;
            }

            row.actualNominal = actualNominal;
            rows.push(row);
          }

          this.columns = columns;
          this.rows = rows;
        });
      });

      setTimeout(() => {
        this.ItemsCollection.bind();
      }, 50);

      const getItem = (min, max) => (item) =>
        item.LayoutOrder >= min && item.LayoutOrder <= max;

      // OPERATING ACTIVITIES
      const revenue = this.rows.filter(getItem(1, 6));
      const otherRevenue = this.rows.filter(getItem(7, 8));
      const cogSold = this.rows.filter(getItem(9, 28));
      const sellingExpenses = this.rows.filter(getItem(29, 41));
      const gaExpenses = this.rows.filter(getItem(42, 43));
      const generalExpenses = this.rows.filter(getItem(44, 65));
      const telpExpenses = this.rows.filter(getItem(66, 66));
      const otherExpenses = this.rows.filter(getItem(67, 67));

      // INVESTING ACTIVITIES
      const depoInAndOthers = this.rows.filter(getItem(68, 69));
      const assetTetap = this.rows.filter(getItem(70, 75));
      const depoOut = this.rows.filter(getItem(76, 76));

      // FINANCING ACTIVITIES
      const loanWithdrawal = this.rows.filter(getItem(77, 77));
      const othersCI = this.rows.filter(getItem(78, 81));
      const loanInstallment = this.rows.filter(getItem(82, 83));
      const bankExpenses = this.rows.filter(getItem(84, 84));
      const othersCO = this.rows.filter(getItem(85, 87));

      const joined = [
        "Revenue",
        ...revenue,
        "Revenue from other operating",
        ...otherRevenue,
        ...this.total.oaci,
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
        ...this.total.oaco,
        ...this.total.oadiff,
        "Free space",
        ...depoInAndOthers,
        ...this.total.iaci,
        "Pembayaran pembelian asset tetap :",
        ...assetTetap,
        ...depoOut,
        ...this.total.iaco,
        ...this.total.iadiff,
        "Free space",
        ...loanWithdrawal,
        "Others :",
        ...othersCI,
        ...this.total.faci,
        "Loan Installment and Interest expense",
        ...loanInstallment,
        "Bank Expenses",
        ...bankExpenses,
        "Others :",
        ...othersCO,
        ...this.total.faco,
        ...this.total.fadiff,
        "BEGINNING BALANCE",
        "CASH SURPLUS/DEFICIT",
        "ENDING BALANCE",
        "Kenyataan",
        "Selisih",
        "Rate $",
        "TOTAL SURPLUS (DEFISIT) EQUIVALENT",
      ];

      this.isEmpty = this.rows.length !== 0 ? false : true;
      this.rows = joined;

      // console.log("this.total", this.total);
      // console.log("this.rows", this.rows);

      const itemsNoString = this.rows.filter(
        (item) => typeof item !== "string" && item.LayoutOrder !== 0
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

      const oaciRowSpan =
        rowSpanArr.slice(0, 8).reduce(reducer, 2) + this.total.oaci.length;
      const oacoRowSpan =
        rowSpanArr.slice(8, 67).reduce(reducer, 6) + this.total.oaco.length;
      const iaciRowSpan =
        rowSpanArr.slice(67, 69).reduce(reducer, 1) + this.total.iaci.length;
      const iacoRowSpan =
        rowSpanArr.slice(69, 76).reduce(reducer, 1) + this.total.iaco.length;
      const faciRowSpan =
        rowSpanArr.slice(76, 81).reduce(reducer, 2) + this.total.faci.length;
      const facoRowSpan =
        rowSpanArr.slice(81, 87).reduce(reducer, 3) + this.total.faco.length;

      this.calRowSpan = {
        oaciRowSpan,
        oacoRowSpan,
        iaciRowSpan,
        iacoRowSpan,
        faciRowSpan,
        facoRowSpan,
        oaRowSpan: oaciRowSpan + oacoRowSpan + this.total.oadiff.length,
        iaRowSpan: iaciRowSpan + iacoRowSpan + this.total.iadiff.length,
        faRowSpan: faciRowSpan + facoRowSpan + this.total.fadiff.length,
      };
    }
  }

  reset() {
    this.dueDate = null;
  }
}
