import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { memo } from 'react';

var moment = require('moment');

@inject(Router, Service)
export class Create {
  constructor(router, service) {
      this.router = router;
      this.service = service;
      this.data = { }
  }

  bind() {
      this.data = { items: [] };
      this.error = {};
      this.cancelCallback = this.cancel;
      this.saveCallback = this.save;
  }

  cancel(event) {
      this.router.navigateToRoute('list');
  }

  determineActivationStrategy() {
      return activationStrategy.replace; //replace the viewmodel with a new instance
      // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
      // or activationStrategy.noChange to explicitly use the default behavior
  }

  save(event) {
    console.log(this.data);
    const memoDetailGarmentPurchasingDetail = []
    this.data.MemoDetailGarmentPurchasingDetail.map(item => {
      memoDetailGarmentPurchasingDetail.push({
        RemarksDetail: item.RemarksDetail,
        GarmentDeliveryOrderId: item.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderId,
        GarmentDeliveryOrderNo: item.MemoDetailGarmentPurchasingDetail.GarmentDeliveryOrderNo,
        PaymentRate: item.PaymentRate,
        PurchasingRate: item.MemoDetailGarmentPurchasingDetail.CurrencyRate,
        MemoAmount: item.MemoAmount,
        MemoIdrAmount: item.MemoAmount * item.MemoDetailGarmentPurchasingDetail.CurrencyRate,
      })
    })
    if (this.data.Memo) {
      if (memoDetailGarmentPurchasingDetail.length > 0) {
        const constructedData = {
          MemoId: this.data.Memo.Id || undefined,
          IsPosted: false,
          Remarks: this.data.remarks,
          MemoDetailGarmentPurchasingDetail: memoDetailGarmentPurchasingDetail
        };
        this.service.create(constructedData)
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
}