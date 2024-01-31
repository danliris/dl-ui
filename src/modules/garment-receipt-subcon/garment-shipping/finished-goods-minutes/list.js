import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import { resolve } from "bluebird";
var moment = require("moment");

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
      length: 4,
    },
  };

  search() {
    this.searching();
  }
  activate() {}

  searching() {
    var args = {
      invoiceNo: this.invoiceNo ? this.invoiceNo : "",
    };
    this.service.search(args).then((result) => {
      this.data = [];

      this.rowCount = [];
      var rowDoc = [];
      for (var _data of result.data) {
        for (var item of _data.detailRO) {
          // Span
          var inv = _data.invoiceNo.toString();
          var ro = _data.roNo.toString();
          var bc = _data.bcNo.toString();
          var lsn = _data.localSalesNote.toString();
          if (!rowDoc[inv + ro + bc + lsn]) {
            rowDoc[inv + ro + bc + lsn] = 1;
          } else {
            rowDoc[inv + ro + bc + lsn]++;
          }
        }
      }

      for (var _data of result.data) {
        for (var item of _data.detailRO) {
          var res = {};
          let no = result.data.find(
            (o) =>
              o.invoiceNo + o.roNo + o.bcNo + o.localSalesNote ==
              _data.invoiceNo + _data.roNo + _data.bcNo + _data.localSalesNote
          );

          if (no) {
            let exist = this.data.find(
              (o) =>
                o.InvoiceNo + o.RONo + o.BCNo + o.LocalSalesNote ==
                _data.invoiceNo + _data.roNo + _data.bcNo + _data.localSalesNote
            );
            if (!exist) {
              res.nospan =
                rowDoc[
                  _data.invoiceNo.toString() +
                    _data.roNo.toString() +
                    _data.bcNo.toString() +
                    _data.localSalesNote.toString()
                ];
            }
          }

          res.InvoiceNo = _data.invoiceNo;
          res.RONo = _data.roNo;
          res.BCNo = _data.bcNo;
          res.BCType = _data.bcType;
          res.BCDate = _data.bcDate;
          res.SentQty = _data.sentQty.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          res.SentUomUnit = _data.sentUomUnit;
          res.ComodityName = _data.comodityName;
          res.BuyerName = _data.buyerName;
          res.LocalSalesNote = _data.localSalesNote;

          res.ProductName = item.productName;
          res.ProductCode = item.productCode;
          res.UsedQty = item.usedQty.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          res.UsedUomUnit = item.usedUomUnit;
          res.DONo = item.doNo;
          res.SupplierName = item.supplierName;
          res.ReceiptQty = item.receiptQty.toLocaleString("en-EN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          res.ReceiptUomUnit = item.receiptUomUnit;
          res.ReceiptBCNo = item.receiptBCNo;
          res.ReceiptBCType = item.receiptBCType;
          res.ReceiptBCDate = item.receiptBCDate;

          this.data.push(res);
        }
      }
    });
  }

  reset() {
    this.invoiceNo = "";
  }

  ExportToExcel() {
    let args = {
      invoiceNo: this.invoiceNo ? this.invoiceNo : "",
    };

    this.service.generateExcel(args);
  }

  changePage(e) {
    var page = e.detail;
    this.info.page = page;
    this.searching();
  }
}
