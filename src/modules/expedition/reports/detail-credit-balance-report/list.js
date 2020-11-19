import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

var CategoryLoader = require("../../../../loader/category-loader");
var AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");
var DivisionLoader = require("../../../../loader/division-loader");

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

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

  columns = [
    { field: "ReceiptDate", title: "Tanggal SPB" },
    { field: "UPONo", title: "No SPB" },
    { field: "URNNo", title: "No BP" },
    { field: "InvoiceNo", title: "No Invoice" },
    { field: "SupplierName", title: "Supplier" },
    { field: "CategoryName", title: "Kategori" },
    { field: "AccountingUnitName", title: "Unit" },
    { field: "...", title: "Jatuh Tempo" },
    { field: "CurrencyCode", title: "Currency" },
    { field: "TotalSaldo", title: "Saldo" },
  ];

  titles = ["Lokal", "Lokal Valas", "Impor"];

  activeTitle = "Lokal";

  changeTitle(title) {
    this.isSearch = false;

    if (title !== this.activeTitle) {
      this.activeTitle = title;
    }

    this.documentTable.refresh();
  }

  bind() {}

  changeTable(title) {}

  search() {
    this.isSearch = true;
    this.documentTable.refresh();
  }

  reset() {
    this.category = null;
    this.accountingUnit = null;
    this.division = null;
    this.dateTo = null;
    this.isSearch = false;
    this.documentTable.refresh();
  }

  get categoryLoader() {
    return CategoryLoader;
  }

  get accountingUnitLoader() {
    return AccountingUnitLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  loader = (info) => {
    let order = {};

    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
    };

    // console.log(this.activeRole);
    // console.log(arg);

    if (this.isSearch) {
      switch (this.activeTitle) {
        case "Lokal":
          return this.service.searchLocal(arg).then((result) => {
            // console.log(result);
            return {
              //   total: result.TotalData,
              data: result.Reports,
            };
          });
        case "Lokal Valas":
          return this.service.searchLocalForeignCurrency(arg).then((result) => {
            // console.log(result);
            return {
              //   total: result.TotalData,
              data: result.Reports,
            };
          });
        case "Impor":
          return this.service.searchImport(arg).then((result) => {
            // console.log(result);
            return {
              //   total: result.TotalData,
              data: result.Reports,
            };
          });
        // default:
        //   return {
        //     // total: 0,
        //     data: [],
        //   };
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

  xls() {
    let order = {};

    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
    };

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.generateExcelLocal(arg).then((result) => {
          //   console.log(result);
          return {
            //   total: result.TotalData,
            data: result.Reports,
          };
        });
      case "Lokal Valas":
        return this.service
          .generateExcelLocalForeignCurrency(arg)
          .then((result) => {
            //   console.log(result);
            return {
              //   total: result.TotalData,
              data: result.Reports,
            };
          });
      case "Impor":
        return this.service.generateExcelImport(arg).then((result) => {
          //   console.log(result);
          return {
            //   total: result.TotalData,
            data: result.Reports,
          };
        });
      //   default:
      //     return {
      //       //   total: 0,
      //       data: [],
      //     };
    }
    return {
      //   total: 0,
      data: [],
    };
  }

  pdf() {
    let order = {};

    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
    };

    switch (this.activeTitle) {
      case "Lokal":
        return this.service.printPdfLocal(arg).then((result) => {
          //   console.log(result);
          return {
            //   total: result.TotalData,
            data: result.Reports,
          };
        });
      case "Lokal Valas":
        return this.service.printPdfLocalForeignCurrency(arg).then((result) => {
          //   console.log(result);
          return {
            //   total: result.TotalData,
            data: result.Reports,
          };
        });
      case "Impor":
        return this.service.printPdfImport(arg).then((result) => {
          //   console.log(result);
          return {
            //   total: result.TotalData,
            data: result.Reports,
          };
        });
      //   default:
      //     return {
      //       //   total: 0,
      //       data: [],
      //     };
    }
    return {
      //   total: 0,
      data: [],
    };
  }

  /*
  searching() {
    if (false) {
      alert("");
    } else {
      var filter = {
        categoryId: this.category ? this.category._id : 0,
        accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
        divisionId: this.division ? this.division.Id : 0,
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };
      this.service.search(filter).then((result) => {
        this.data = result;
      });
    }
  }
*/
  /*
  ExportToExcel() {
    if (false) {
      alert("");
    } else {
      var filter = {
        no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
        // category: this.category ? this.category.code : "",
        // unit: this.unit ? this.unit.Code : "",
        accountingCategoryId: this.accountingCategory
          ? this.accountingCategory.Id
          : 0,
        accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };
      this.service.generateExcel(filter).catch((e) => {
        alert(e.replace(e, "Error: ", ""));
      });
    }
  }
  */
  /*
  printPdf() {
    if (false) {
      alert("");
    } else {
      var filter = {
        no: this.unitReceiptNote ? this.unitReceiptNote.no : "",
        // category: this.category ? this.category.code : "",
        // unit: this.unit ? this.unit.Code : "",
        accountingCategoryId: this.accountingCategory
          ? this.accountingCategory.Id
          : 0,
        accountingUnitId: this.accountingUnit ? this.accountingUnit.Id : 0,
        dateFrom: this.dateFrom
          ? moment(this.dateFrom).format("YYYY-MM-DD")
          : "",
        dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
      };
      this.service.printPdf(filter).catch((e) => {
        alert(e.replace(e, "Error: ", ""));
      });
    }
  }
*/
}
