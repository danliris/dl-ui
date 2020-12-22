import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import { Dialog } from "../../../au-components/dialog/dialog";
import { Service } from "./service";
// import PurchasingDocumentExpeditionService from "../shared/purchasing-document-expedition-service";
import { PermissionHelper } from "../../../utils/permission-helper";
import { VERIFICATION, CASHIER, ACCOUNTING } from "../shared/permission-constants";

@inject(Router, Service, Dialog, PermissionHelper)
export class List {
  context = ["Hapus"];

  fromPurchasingColumns = [
    { field: "selected", checkbox: true, sortable: false },
    { field: "InternalNoteNo", title: "No. Nota Intern" },
    {
      field: "InternalNoteDate", title: "Tanggal Nota Intern", formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "SupplierName", title: "Supplier" },
    {
      field: "Amount", title: "Total Bayar", formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      }, align: "right"
    },
    { field: "CurrencyCode", title: "Mata Uang" }
  ];

  fromVerificationColumns = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: "VerificationAcceptedDate", title: "Tanggal Verifikasi", formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "InternalNoteNo", title: "No. Nota Intern" },
    {
      field: "InternalNoteDate", title: "Tanggal Nota Intern", formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "SupplierName", title: "Supplier" },
    {
      field: "Amount", title: "Total Bayar", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }, align: "right"
    },
    { field: "CurrencyCode", title: "Mata Uang" }
  ];

  constructor(router, service, dialog, permissionHelper) {
    this.service = service;
    this.router = router;
    this.dialog = dialog;

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();

    this.isVerification = this.activeRole.key == "VERIFICATION";
  }

  initPermission() {
    this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
    this.accessCount = 0;
    console.log(this.permissions);

    for (let i = this.roles.length - 1; i >= 0; i--) {
      if (this.permissions.hasOwnProperty(this.roles[i].code)) {
        this.roles[i].hasPermission = true;
        this.accessCount++;
        this.activeRole = this.roles[i];
        // console.log(this.roles[i]);
      }
    }

    if (this.permissions.hasOwnProperty('C9')) {
      this.accessCount = 0;
      this.roles = this.roles.map((role) => {
        role.hasPermission = true;
        this.accessCount++;
        return role;
      });
      this.activeRole = this.roles[0];
    }
  }

  changeRole(role) {
    if (role.key !== this.activeRole.key) {
      this.activeRole = role;
      this.tableList.refresh();
    }
  }
  //   changeTable(role) {
  //     this.code = role.key === "CASHIER" ? true : false;
  //   }
  changeTable(role) {
    this.isVerification = role.key == "VERIFICATION";
    this.tableList.refresh();
  }

  loader = (info) => {
    let order = {};
    console.log(this.activeRole)

    let position = 3;
    if (this.activeRole)
      position = this.activeRole.position;

    if (info.sort) order[info.sort] = info.order;
    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      position: position, // VERIFICATION_DIVISION
    };

    return this.service
      .search(arg)
      .then((result) => {
        return {
          total: result.info.total,
          data: result.data,
        };
      });
  };

  contextClickCallback(event) {
    let arg = event.detail;
    let data = arg.data;

    switch (arg.name) {
      case "Hapus":
        switch (this.activeRole.key) {
          case 'VERIFICATION':
            this.service
              .voidVerification(data.Id)
              .then((result) => {
                this.tableList.refresh();
              })
              .catch((e) => {
                this.error = e;
              });
            break;
          case 'CASHIER':
            this.service
              .voidCashier(data.Id)
              .then((result) => {
                this.tableList.refresh();
              })
              .catch((e) => {
                this.error = e;
              });
            break;
          case 'ACCOUNTING':
            this.service
              .voidAccounting(data.Id)
              .then((result) => {
                this.tableList.refresh();
              })
              .catch((e) => {
                this.error = e;
              });
            break;
          default:
            break;
        }
        break;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
