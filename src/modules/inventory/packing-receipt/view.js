import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.packingReadOnly = true;
        this.packing = this.data;
        this.packing.code = this.data.packingCode;
        this.data.packing = this.data;
        console.log(this.data)

        if (this.data.items.length > 0) {
            var delivered;
            for (var item of this.data.items) {
                var properties = Object.getOwnPropertyNames(item);
                delivered = properties.find((property) => property.toString().toLowerCase() === "isdelivered");

                if (delivered) {
                    if (item.isDelivered || this.data.isVoid) {
                        this.isVoid = false;
                        break;
                    } else {
                        this.isVoid = true;
                    }
                } else {
                    this.isVoid = false;
                    break;
                }
            }
        }
    }

    update() {
        delete this.data.packing;
        this.data.isVoid = true;
        // remove total jumlah object
        this.data.items = this.data.items.slice(0, -1);
        this.service.update(this.data)
            .then((result) => {
                this.router.navigateToRoute('list');
            })
            .catch((e) => {
                this.error = e;
            })
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }


    attached() {

        var total = {
            product: "Total Jumlah",
            quantity: 0,
            availableQuantity: 0,
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

        this.data.items.push(total);
    }
}