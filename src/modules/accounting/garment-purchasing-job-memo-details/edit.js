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
    const errorData = [];

    this.data.Items.map(item => {
      let itemError = {};
      if (!item.GarmentCurrenciesId) {
        itemError.GarmentDeliveryOrderNo = 'Surat Jalan tidak boleh kosong';
        isValid = false;
      } 

      if (!item.MemoAmount) {
        itemError.MemoAmount = 'Jumlah tidak boleh kosong';
        isValid = false;
      }

      if (!item.PaymentRate) {
        itemError.PaymentRate = 'Tidak boleh kosong';
        isValid = false;
      }
      Items.push(item);
      errorData.push(itemError);
    });
    this.error = { Items: errorData };
    return { isValid, Items }
  }

  saveCallback(event) {  
    const { isValid, Items } = this.isValid;
    if (isValid) {
      if (this.data.Memo) {
        if (Items.length > 0) {
          const constructedData = {
            MemoId: this.data.MemoId,
            MemoDate: this.data.MemoDate,
            AccountingBookId: this.data.AccountingBookId,
            AccountingBookType: this.data.AccountingBookType,
            GarmentCurrenciesId: this.data.CurrencyId,
            GarmentCurrenciesCode: this.data.CurrencyCode,
            GarmentCurrenciesRate: this.data.CurrencyRate,
            IsPosted: this.data.IsPosted,
            Remarks: this.data.Remarks,
            Items: Items
          };
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
        alert("No Memo tidak boleh kosong!");
      }
    } 
    this.service.update(this.data)
        .then(result => {
            this.router.navigateToRoute('view', { id: this.data.Id });
        })
        .catch(e => {
            this.error = e;
        })
  }
}
