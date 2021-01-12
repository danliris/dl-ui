import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }
  isEdit = true;
  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);

    if (this.data) {
      this.selectedRO = {
        RONo: this.data.RONo
      };
      this.selectedUnit = this.data.Unit;
      this.data.BuyerView = this.data.Buyer.Code + ' - ' + this.data.Buyer.Name;

      let ssSewingItems = [];
        let ssSewing = await this.service.searchComplete({ size: 100, filter: JSON.stringify({ RONo: this.data.RONo }) });
        console.log(ssSewing)
        if (ssSewing.data.length > 0) {
          for (var ssS of ssSewing.data) {
            for (var ssSItem of ssS.Items) {
              var item = {};
              item.sewingInItemId = ssSItem.SewingInItemId;
              item.qty = ssSItem.Quantity;
              if (ssSewingItems[ssSItem.SewingInItemId]) {
                ssSewingItems[ssSItem.SewingInItemId].qty += ssSItem.Quantity;
              }
              else {
                ssSewingItems[ssSItem.SewingInItemId] = item;
              }
            }
          }
        }

      for (var a of this.data.Items) {
        var SewingIn = await this.service.GetSewingInById(a.SewingInId);
        var sewIn = SewingIn.Items.find(x => x.Id == a.SewingInItemId);
        if (sewIn) {
          var qtyOut = 0;
          if(ssSewingItems[sewIn.Id]){
            qtyOut+=ssSewingItems[sewIn.Id].qty;
          }
          a.SewingInDate = SewingIn.SewingInDate;
          a.SewingInQuantity = sewIn.RemainingQuantity - qtyOut;
          if (this.data.IsDifferentSize) {
            a.Quantity += sewIn.RemainingQuantity;
          }
        }
      }
    }
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  cancelCallback(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  saveCallback(event) {

    if (this.data && this.data.IsDifferentSize) {
      if (this.data.Items) {
        for (var item of this.data.Items) {
          if (item.IsSave) {
            item.TotalQuantity = 0;
            if (this.data.SewingInDate == null || this.data.SewingInDate < item.SewingInDate)
              this.data.SewingInDate = item.SewingInDate;
            item.RemainingQuantity = item.TotalQuantity;
          }
        }
      }
    }
    else if (this.data && !this.data.IsDifferentSize) {
      if (this.data.Items) {
        for (var item of this.data.Items) {
          if (item.IsSave) {
            if (this.data.SewingInDate == null || this.data.SewingInDate < item.SewingInDate)
              this.data.SewingInDate = item.SewingInDate;
            item.RemainingQuantity = item.Quantity;
          }
        }
      }
    }
    console.log(this.data)
    this.service.update(this.data)
      .then(result => {
        this.cancelCallback();
      })
      .catch(e => {
        this.error = e;
      })
  }
}
