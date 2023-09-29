import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";
import { PurchasingService } from "../purchasing-service";
import { item } from "../../../garment-shipping/payment-disposition-recap/template/item";

@inject(Service, PurchasingService)
export class ItemManual {
  @bindable selectedNI;

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.readOnly = context.options.readOnly;
    this.items = context.context.items;

    if (this.data.InternalNote.DocumentNo) {
      this.selectedNI = {
        INNo: this.data.InternalNote.DocumentNo,
      };
    }

    this.isShowing = false;

    if (!this.readOnly) {
      this.collection = {
        columns: [
          "",
          "No. Invoice",
          "Tanggal Invoice",
          "Nama Barang",
          "Kategori",
          "Total",
        ],
      };
    } else {
      this.collection = {
        columns: [
          "No. Invoice",
          "Tanggal Invoice",
          "Nama Barang",
          "Kategori",
          "Total",
        ],
      };
    }
  }

  NIView = (ni) => {
    return `${ni.INNo}`;
  };

  get NILoader() {
    return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({
          SupplierId: this.data.supplierId,
          CurrencyCode: this.data.currencyCode,
        }),
      };
      return this.purchasingService.GetNi(info).then((result) => {
        var NIList = [];
        for (var a of result.data) {
          if (NIList.length == 0) {
            var selectedNI = this.items.find(
              (x) => x.data.InternalNote.DocumentNo == a.INNo
            );
            if (!selectedNI) {
              NIList.push(a);
            }
          } else {
            var dup = NIList.find((d) => d.INNo == a.INNo);
            if (!dup) {
              var selectedNI = this.items.find(
                (x) => x.data.InternalNote.DocumentNo == a.INNo
              );
              if (!selectedNI) {
                NIList.push(a);
              }
            }
          }
        }
        return NIList;
      });
    };
  }

  toggle() {
    this.isShowing = !this.isShowing;
  }

  async selectedNIChanged(newValue) {
    if (newValue) {
      this.data.InternalNote.DocumentNo = newValue.INNo;

      Promise.resolve(
        this.purchasingService.dppVATBankExpenditureNotes({
          niId: newValue.Id,
        })
      ).then((result) => {
        if (result.length > 0) {
          this.data.InternalNote = result[0].InternalNote;
          this.data.Select = true;
        }
      });
    } else {
      this.context.selectedNIViewModel.editorValue = "";
      this.data.InternalNote.DocumentNo = "";
    }
  }

  get outstanding() {
    var result = 0;

    if (
      this.data.InternalNote.Items &&
      this.data.InternalNote.Items.length > 0
    ) {
      for (let item of this.data.InternalNote.Items) {
        if (item.SelectInvoice) result += item.Invoice.Amount;
      }
    }

    this.data.OutstandingAmount = this.data.InternalNote.TotalAmount - result;

    return result;
  }
}
