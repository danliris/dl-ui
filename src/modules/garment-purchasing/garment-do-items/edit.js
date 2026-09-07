import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;
    hasView = false;
    isEdit = true;
    hasCreate = false;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    async activate(params) {
        var id = params.id;
        let decoded = Base64Helper.decode(id);
        id = decoded;
        this.data = await this.service.getById(id);
        this.data.isEdit = true;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    validate() {
        let isValid = true;

        this.error = {
            Items: []
        };

        if (!this.data.Items || this.data.Items.length === 0) {
            return true;
        }

        this.data.Items.forEach((item, index) => {
            let itemError = {};

            const lot = item.Lot ? item.Lot.trim() : "";
            const area = item.Area ? item.Area.trim().toUpperCase() : "";
            const qty = parseFloat(item.Quantity);
            const rack = item.Rack ? item.Rack.trim() : "";
            const level = item.Level ? item.Level.trim() : "";
            const box = item.Box ? item.Box.trim() : "";

            if (isNaN(qty) || qty <= 0) {
                    itemError.Quantity = "Quantity harus lebih dari 0";
                    isValid = false;
                }

            if (!item.HandlingUnit || !item.HandlingUnit.trim()) {
                    itemError.HandlingUnit = "Handling Unit harus diisi";
                    isValid = false;
                }

            if (!item.Colour || !item.Colour.trim()) {
                    itemError.Colour = "Warna harus diisi";
                    isValid = false;
                }


            if (area === "GREEN ZONE") {

                if (isNaN(qty) || qty <= 0) {
                    itemError.Quantity = "Quantity harus lebih dari 0";
                    isValid = false;
                }

                if (!item.Rack || !item.Rack.trim()) {
                    itemError.Rack = "Rack harus diisi";
                    isValid = false;
                }

                if (!item.Level || !item.Level.trim()) {
                    itemError.Level = "Level harus diisi";
                    isValid = false;
                }

                if (!item.Box || !item.Box.trim()) {
                    itemError.Box = "Box harus diisi";
                    isValid = false;
                }

                if (!item.Lot || !item.Lot.trim()) {
                    itemError.Lot = "Lot harus diisi";
                    isValid = false;
                }
            }

            if (area === "BLUE ZONE" && rack) {
                itemError.Rack = "Rack tidak boleh diisi jika Area BLUE ZONE";
                itemError.Area = "BLUE ZONE tidak boleh memiliki Rack, Level, dan Box";
                isValid = false;
            } else if (area === "BLUE ZONE" && level) {
                itemError.Area = "BLUE ZONE tidak boleh memiliki Rack, Level, dan Box";
                itemError.Level = "Level tidak boleh diisi jika Area BLUE ZONE";
                isValid = false;
            } else if (area === "BLUE ZONE" && box) {
                itemError.Area = "BLUE ZONE tidak boleh memiliki Rack, Level, dan Box";
                itemError.Box = "Box tidak boleh diisi jika Area BLUE ZONE";
                isValid = false;
            }

            this.error.Items[index] = itemError;
        });

        return isValid;
    }

    save(event) {
        if (!this.validate()) {
        return;
    }
        var itemQtySUm = 0;



        this.data.Items.forEach(x => {
            itemQtySUm += x.Quantity;

        });

        if (parseFloat(this.data.RemainingQuantity) != parseFloat(itemQtySUm).toFixed(2)) {
            alert("Jumlah Quantity Item harus sama dengan Quantity Sebelumnya")
        } else {
            this.service.update(this.data).then(result => {
                alert("Data berhasil diubah");
                this.router.navigateToRoute('list');
            }).catch(e => {
                this.error = e;
            })
        }
    }
}