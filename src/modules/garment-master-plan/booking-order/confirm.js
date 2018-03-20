import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Confirm {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  bind() {
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data._id });
  }

  save(event) {
    var conf = [];
    this.data.type = 'confirm';
    var warn = '';
    if (this.data.items) {
      if (this.data.items.length > 0) {
        var warning = [];
        var warning_confirm = [];
        var total_item = 0;
        for (var item of this.data.items) {
          var today = new Date();
          item._createdDate = item._createdDate ? new Date(item._createdDate) : '';
          if (item._createdDate != '' && item._createdDate.getFullYear() > 1900) {
            today = new Date(item._createdDate);
          }
          var a = new Date(item.deliveryDate);
          var b = today;
          a.setHours(0, 0, 0, 0);
          b.setHours(0, 0, 0, 0);
          var diff = a.getTime() - b.getTime();
          var timeDiff = Math.abs(a.getTime() - b.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          total_item = total_item + item.quantity;

          if (diff >= 0) {
            if (diffDays >= 0 && diffDays <= 45) {
              if (item.masterPlanComodity)
                warning.push('Comodity ' + item.masterPlanComodity.name + ' (Jumlah Confirm = ' + item.quantity + ') kurang ' + diffDays + ' hari dari Tanggal Pengiriman\n');
            }
          }
          else {
            warning = [];
            break;
          }
          if (new Date(item.deliveryDate) < new Date(this.data.bookingDate)) {
            warning = [];
            break;
          }
          else if (new Date(item.deliveryDate) > new Date(this.data.deliveryDate)) {
            warning = [];
            break;
          }

        }
        var total = total_item - this.data.orderQuantity;
        if (total > 0)
          warning_confirm.push('Total jumlah confirm lebih dari jumlah booking order\n');


        if (warning.length > 0 && warning_confirm.length <= 0) {
          if (confirm('Tanggal Confirm <= 45 hari \n' + warning.toString().replace(/,/g, "") + 'Tetap Confirm?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else if (warning.length > 0 && warning_confirm.length > 0) {
          if (confirm('Tanggal Confirm <= 45 hari \n' + warning.toString().replace(/,/g, "") + warning_confirm.toString() + 'Tetap Confirm?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else if (warning_confirm.length > 0) {
          if (confirm(warning_confirm.toString() + 'Tetap Confirm?')) {
            this.service.update(this.data)
              .then(result => {
                alert("Data Confirmed");
                this.cancel();
              }).catch(e => {
                this.error = e;
              });
          }
        }
        else {
          this.service.update(this.data).then(result => {
            this.cancel();
          }).catch(e => {
            this.error = e;
          })
        }
      }
      else {
        this.service.update(this.data).then(result => {
          this.cancel();
        }).catch(e => {
          this.error = e;
        })
      }
    }
    else {
      this.service.update(this.data).then(result => {
        this.cancel();
      }).catch(e => {
        this.error = e;
      })
    }

  }

}
