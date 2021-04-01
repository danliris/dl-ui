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
    const Items = [];

    this.data.Items.map(item => {
      if (!item.GarmentDeliveryOrderNo) {
        isValid = false;
      } 
      item.MemoIdrAmount = item.MemoAmount * item.PurchasingRate;
      Items.push(item);
    });
    
    return { isValid, Items }
  }

  saveCallback(event) {  
    let valid = this.isValid();
    const isValid = valid.isValid;
    const Items = valid.Items;
    if (isValid) {
      if (Items.length > 0) {
        const constructedData = {
          MemoId: this.data.MemoId,
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
        console.log(constructedData);
        this.service.update(constructedData)
          .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
          })
          .catch((e) => {
            console.log(e);
              this.error = e;
          })
      } else {
        alert('Item tidak boleh kosong!')
      }
    } else {
      alert('Surat jalan tidak boleh kosong')
    }
  }
}
