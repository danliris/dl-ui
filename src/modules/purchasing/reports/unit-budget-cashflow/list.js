import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

var CategoryLoader = require('../../../../loader/category-loader');
var DivisionLoader = require('../../../../loader/division-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var AccountingUnitLoader = require('../../../../loader/accounting-unit-loader');

@inject(Router, Service)
export class List {
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    tableOptions = {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    bind() {
        this.data = {}
    }

    async search() {
        // this.isSearch = true;
        // this.documentTable.refresh();
        console.log("search");

        let unitId = 0;
        if (this.unit && this.unit.Id) {
            unitId = this.unit.Id;
        }

        let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD");

        var promises = this.enums.map((enumItem, index) => {
            return this.service.getBestCase({ layoutOrder: index + 1, unitId: unitId, dueDate: dueDate })
                .then((bestCases) => {
                    console.log(bestCases);
                })
        });

        await Promise.all(promises)
            .then((promiseResult) => {

            });
    }

    reset() {
        console.log("reset");
        this.division = null;
        this.category = null;
        this.accountingUnit = null;
        this.unit = null;
        this.dueDate = null;
        this.isSearch = false;
        this.documentTable.refresh();
    }

    exportExcel() {
        console.log("excel")
        let categoryId = 0;
        if (this.category && this.category._id)
            categoryId = this.category._id;

        let divisionId = 0;
        if (this.division && this.division.Id)
            divisionId = this.division.Id;

        let accountingUnitId = 0;
        if (this.accountingUnit && this.accountingUnit.Id)
            accountingUnitId = this.accountingUnit.Id;

        let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

        let arg = {
            categoryId, divisionId, accountingUnitId, dueDate
        };
        console.log("pdf");

        switch (this.activeTitle) {
            case "Lokal":
                return this.service.generateExcelLocal(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
                    });
            case "Lokal Valas":
                return this.service.generateExcelLocalForeignCurrency(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
                    });
            case "Import":
                return this.service.generateExcelImport(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
                    });
        }
    }

    printPdf() {
        let categoryId = 0;
        if (this.category && this.category._id)
            categoryId = this.category._id;

        let divisionId = 0;
        if (this.division && this.division.Id)
            divisionId = this.division.Id;

        let accountingUnitId = 0;
        if (this.accountingUnit && this.accountingUnit.Id)
            accountingUnitId = this.accountingUnit.Id;

        let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

        let arg = {
            categoryId, divisionId, accountingUnitId, dueDate
        };
        console.log("pdf");

        switch (this.activeTitle) {
            case "Lokal":
                return this.service.printPdfLocal(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
                    });
            case "Lokal Valas":
                return this.service.printPdfLocalForeignCurrency(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
                    });
            case "Import":
                return this.service.printPdfImport(arg)
                    .then(result => {
                        console.log(result);
                        return {
                            total: result.TotalData,
                            data: result.Data
                        }
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
        if (this.category && this.category._id)
            categoryId = this.category._id;

        let divisionId = 0;
        if (this.division && this.division.Id)
            divisionId = this.division.Id;

        let accountingUnitId = 0;
        if (this.accountingUnit && this.accountingUnit.Id)
            accountingUnitId = this.accountingUnit.Id;

        let dueDate = this.dueDate ? moment(this.dueDate).format("YYYY-MM-DD") : "";

        let arg = {
            categoryId, divisionId, accountingUnitId, dueDate
        };

        console.log(this.activeRole)
        console.log(arg);

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
                    return this.service.searchLocal(arg)
                        .then(result => {
                            console.log(result);
                            return {
                                total: result.TotalData,
                                data: result.Data
                            }
                        });
                case "Lokal Valas":
                    return this.service.searchLocalForeignCurrency(arg)
                        .then(result => {
                            console.log(result);
                            return {
                                total: result.TotalData,
                                data: result.Data
                            }
                        });
                case "Import":
                    return this.service.searchImport(arg)
                        .then(result => {
                            console.log(result);
                            return {
                                total: result.TotalData,
                                data: result.Data
                            }
                        });
            }
            return {
                total: 0,
                data: []
            }
        } else {
            return {
                total: 0,
                data: []
            }
        }
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
        "CashOutOthers"
    ]

}