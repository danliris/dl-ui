import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import numeral from 'numeral';

@inject(Router, Service)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);

    if (this.data.accepted) {
      this.hasEdit = false;
      this.hasDelete = false;
    }

  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }

  edit(event) {
    this.router.navigateToRoute('edit', { id: this.data._id });
  }

  delete(event) {

    this.service.delete(this.data)
      .then(result => {
        this.cancel();
      });
  }

  attached() {
    
            var total = {
                grade: "Total Jumlah",
                quantity: 0,
                weightTotalAmount: 0,
                weight: 0,
                lengthTotalAmount: 0,
                length: 0,
            };
    
            for (var item of this.data.items) {
    
                total.quantity += item.quantity;
                total.availableQuantity += item.availableQuantity;
                total.weight += item.weight;
                total.length += item.length;
                total.weightTotalAmount += item.weight * item.quantity;
                total.lengthTotalAmount += item.length * item.quantity;
            }

            total.length = numeral(total.length).format('0,000.00');
      
            this.data.items.push(total);
        }
}
