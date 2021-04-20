import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    let id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  isValid() {
    let isValid = true;
    const errorList = [];
    const Items = [];

    this.data.Items.map(item => {
      let itemError = {};
      
      if (!item.BillsNo) {
        itemError.BillsNo = 'No. BP Besar tidak boleh kosong';
        isValid = false;
      } 

      if (!item.PaymentBills) {
        itemError.PaymentBills = 'No. BP Kecil tidak boleh kosong';
        isValid = false;
      } 

      if (!item.MemoAmount) {
        itemError.MemoAmount = 'Jumlah tidak boleh kosong';
        isValid = false;
      }

      if (!item.PaymentRate) {
        itemError.PaymentRate = 'Rate Bayar tidak boleh kosong';
        isValid = false;
      }

      if (!item.RemarksDetail) {
        itemError.RemarksDetail = 'Keterangan tidak boleh kosong';
        isValid = false;
      }
      item.MemoIdrAmount = item.MemoAmount * item.PurchasingRate;
      Items.push(item);
      errorList.push(itemError);
    });
    
    return { isValid, Items, errorList }
  }

  saveCallback(event) {  
    let valid = this.isValid();
    this.error = { Items: valid.errorList };
    const isValid = valid.isValid;
    const Items = valid.Items;
    if (isValid) {
      if (Items.length > 0) {
        const constructedData = {
          Id: this.data.Id,
          MemoId: this.data.MemoId,
          MemoNo: this.data.MemoNo,
          MemoDate: this.data.MemoDate,
          AccountingBookId: this.data.AccountingBookId,
          AccountingBookType: this.data.AccountingBookType,
          GarmentCurrenciesId: this.data.GarmentCurrenciesId,
          GarmentCurrenciesCode: this.data.GarmentCurrenciesCode,
          GarmentCurrenciesRate: this.data.GarmentCurrenciesRate,
          IsPosted: this.data.IsPosted,
          Remarks: this.data.Remarks,
          Items: Items
        };
        
        this.service.update(constructedData)
          .then((result) => {
              alert("Data berhasil diupdate");
              this.router.navigateToRoute('list', {}, { replace: true, trigger: true });
          })
          .catch((e) => {
            this.error = e;
          })
      } else {
        alert('Item tidak boleh kosong!')
      }
    }
  }
}
