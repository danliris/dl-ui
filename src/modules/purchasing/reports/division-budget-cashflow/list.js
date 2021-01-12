import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { CoreService } from "./core-service";
import moment from "moment";
let DivisionLoader = require("../../../../loader/division-loader");

@inject(Router, Service, CoreService)
export class List {
  constructor(router, service, coreService) {
    this.router = router;
    this.service = service;
    this.coreService = coreService;
    this.error = {};
    this.division = "";
    this.dueDate = null;
    this.columns = [];
    this.rows = [];
    this.rowspan = {};
    this.isEmpty = true;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  async search() {
    if (this.division === "" || this.dueDate === null) {
      this.error.division = "Divisi harus diisi";
      this.error.dueDate = "Periode harus diisi";
    } else {
      this.error.division = "";
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

      await this.service.search().then((data) => {
        this.columns = data[0].columns;
        this.rows = data[0].rows;
      });

      this.isEmpty = this.rows.length !== 0 ? false : true;

      const getLength = (groupId, rows) =>
        rows.filter((item) => item.groupId === groupId).length;

      this.rowspan.oaci = getLength(1, this.rows);
      this.rowspan.oaco = getLength(2, this.rows);
      this.rowspan.oadiff = getLength(3, this.rows);
      this.rowspan.iaci = getLength(4, this.rows);
      this.rowspan.iaco = getLength(5, this.rows);
      this.rowspan.iadiff = getLength(6, this.rows);
      this.rowspan.faci = getLength(7, this.rows);
      this.rowspan.faco = getLength(8, this.rows);
      this.rowspan.fadiff = getLength(9, this.rows);

      const {
        oaci,
        oaco,
        oadiff,
        iaci,
        iaco,
        iadiff,
        faci,
        faco,
        fadiff,
      } = this.rowspan;

      this.rowspan.oa = oaci + oaco + oadiff;
      this.rowspan.ia = iaci + iaco + iadiff;
      this.rowspan.fa = faci + faco + fadiff;

      console.log("this.columns", this.columns);
      console.log("this.rows", this.rows);
      console.log("this.rowspan", this.rowspan);
    }
  }

  reset() {
    this.division = null;
    this.dueDate = null;
  }

  // printXls() {
  //   if (this.division === "" || this.dueDate === null) {
  //     this.error.division = "Divisi harus diisi";
  //     this.error.dueDate = "Periode harus diisi";
  //   } else {
  //     this.error.division = "";
  //     this.error.dueDate = "";

  //     let divisionId = 0;
  //     if (this.division && this.division.Id) {
  //       divisionId = this.division.Id;
  //     }

  //     let dueDate = this.dueDate
  //       ? moment(this.dueDate).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getXls({ divisionId, dueDate });
  //   }
  // }

  // printPdf() {
  //   if (this.division === "" || this.dueDate === null) {
  //     this.error.division = "Divisi harus diisi";
  //     this.error.dueDate = "Periode harus diisi";
  //   } else {
  //     this.error.division = "";
  //     this.error.dueDate = "";

  //     let divisionId = 0;
  //     if (this.division && this.division.Id) {
  //       divisionId = this.division.Id;
  //     }

  //     let dueDate = this.dueDate
  //       ? moment(this.dueDate).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getPdf({ divisionId, dueDate });
  //   }
  // }

  bind() {
    this.data = {};
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}
