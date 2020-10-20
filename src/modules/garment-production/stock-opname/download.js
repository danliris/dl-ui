import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

const UnitLoader = require('../../../loader/garment-units-loader');
const StorageLoader = require('../../../loader/storage-loader');

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        editText: "Download"
    };

    controlOptions = {
        label: {
            length: 5
        },
        control: {
            length: 7
        }
    };

    get unitLoader() {
        return UnitLoader;
    }

    get storageLoader() {
        return StorageLoader;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    storageView = (storage) => {
        return storage.name;
    }

    bind() {
        this.data = {};
        this.error = {};
    }

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    editCallback() {
        this.service.download({
            date: this.data.date ? this.data.date.toJSON() : null,
            unit: (this.data.unit || {}).Code,
            storage: (this.data.storage || {}).code,
            storageName: (this.data.storage || {}).name,
        }).catch(error => {
            alert(error);
        });
    }
}