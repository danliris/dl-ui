import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Service from './service';


@inject(Router, Service)
export class View {
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    formOptions = {
        cancelText: 'Kembali',
        editText: 'Ubah',
        deleteText: 'Hapus'
    };

    constructor(router, service) {
        this.router = router;
        this.service = service;

        this.collection = {
            columns: ['No. SPB', 'Tanggal SPB', 'Tanggal Jatuh Tempo', 'Nomor Invoice', 'Supplier', 'Divisi', 'PPN', 'Total Harga (DPP + PPN)', 'Mata Uang'],
        };
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        this.service.delete(this.data).then(result => {
            this.cancelCallback();
        });
    }
}
