import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
import PurchasingDocumentExpeditionService from '../shared/purchasing-document-expedition-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER, ACCOUNTING } from '../shared/permission-constants';
const UnitPaymentOrderLoader = require('../../../loader/unit-payment-order-loader');
const SupplierLoader = require('../../../loader/supplier-loader');
const DivisionLoader = require('../../../loader/division-loader');

@inject(Router, Service, PurchasingDocumentExpeditionService, PermissionHelper)
export class Create {
  columns2 = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: 'SendToVerificationDate', title: 'Tanggal Verifikasi', formatter: function (value, data, index) {
        return value ? moment(value).format('DD MMM YYYY') : "-";
      },
    },
    { field: 'VBRealizationNo', title: 'No Realisasi VB' },
    {
      field: 'VBRealizationDate', title: 'Tanggal Realisasi VB', formatter: function (value, data, index) {
        return moment(value).format('DD MMM YYYY');
      },
    },
    { field: 'VBType', title: 'Tipe VB' },
    { field: 'VBRequestName', title: 'Pemohon VB' },
    { field: 'UnitName', title: 'Bagian/Unit' },
    {
      field: 'TotalPaid', title: 'Amount', formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      },
    }
  ];

  columns = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: 'SendToVerificationDate', title: 'Tanggal Verifikasi', formatter: function (value, data, index) {
        return value ? moment(value).format('DD MMM YYYY') : "-";
      },
    },
    { field: 'VBRealizationNo', title: 'No Realisasi VB' },
    {
      field: 'VBRealizationDate', title: 'Tanggal Realisasi VB', formatter: function (value, data, index) {
        return moment(value).format('DD MMM YYYY');
      },
    },
    { field: 'VBType', title: 'Tipe VB' },
    { field: 'VBRequestName', title: 'Pemohon VB' },
    { field: 'UnitName', title: 'Bagian/Unit' },
    {
      field: 'TotalPaid', title: 'Amount', formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      },
    }
  ];

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(router, service, purchasingDocumentExpeditionService, permissionHelper) {
    this.router = router;
    this.service = service;
    this.purchasingDocumentExpeditionService = purchasingDocumentExpeditionService;

    this.selectUPO = ['no'];
    this.selectSupplier = ['code', 'name'];
    this.selectDivision = ['code', 'name'];
    this.documentData = [];
    this.selectedItems = [];

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();
  }

  initPermission() {
    this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {
      if (this.permissions.hasOwnProperty(this.roles[i].code)) {
        this.roles[i].hasPermission = true;
        this.accessCount++;
        this.activeRole = this.roles[i];
      }
    }
  }

  changeRole(role) {

    console.log(role);
    if (role.key !== this.activeRole.key) {
      this.activeRole = role;
      // this.selectedItems.splice(0, this.selectedItems.length);
      // this.documentData.splice(0, this.documentData.length);
      this.documentTable.refresh();
    }
  }

  changeTable(role) {
    this.code = role.key === "CASHIER" ? true : false;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  loader = (info) => {
    let order = {};

    if (info.sort)
      order[info.sort] = info.order;
    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order, // VERIFICATION_DIVISION,
      position: this.activeRole.positionAutocomplete
    };

    console.log(this.activeRole)

    return this.service.search(arg)
      .then(result => {
        console.log(result);
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  saveCallback(event) {
    /*
        let data = {
            ReceiptDate: this.receiptDate,
            Role: this.activeRole.key,
            PurchasingDocumentExpedition: [],
        };
    */

    // let data = {
    //   Role: this.activeRole.key,
    //   PurchasingDocumentExpedition: [],
    // };

    // for (let s of this.selectedItems) {
    //   data.PurchasingDocumentExpedition.push({
    //     Id: s.Id,
    //     UnitPaymentOrderNo: s.UnitPaymentOrderNo,
    //   });
    // }

    // this.service.create(data)
    //   .then(result => {
    //     alert("Data berhasil dibuat");
    //     this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
    //   })
    //   .catch(e => {
    //     this.error = e;
    //   });

    console.log(this.selectedItems);

    if (this.selectedItems && this.selectedItems.length > 0) {

      let data = this.selectedItems.map((datum) => {
        return datum.VBRealizationId;
      });

      if (this.activeRole.positionAutocomplete == 2) {
        console.log("to verification")
        this.service.acceptForVerification({ VBRealizationIds: data })
          .then(result => {
            alert("Data berhasil dibuat");
            this.documentTable.refresh();
          })
          .catch(e => {
            this.error = e;
          });
      } else if (this.activeRole.positionAutocomplete == 4) {
        console.log("to cashier")
        this.service.acceptForCashier({ VBRealizationIds: data })
          .then(result => {
            alert("Data berhasil dibuat");
            this.documentTable.refresh();
          })
          .catch(e => {
            this.error = e;
          });
      }
    } else {
      alert("harap pilih data");
    }
  }

  get unitPaymentOrderLoader() {
    return UnitPaymentOrderLoader;
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}
