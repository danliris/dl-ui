import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service, GarmentService} from './service';
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, GarmentService)
export class View {
    constructor(router, service, garmentService) {
        this.router = router;
        this.service = service;
        this.garmentService = garmentService;
    }

    async activate(params) {
        const decoded = Base64Helper.decode(params.id);
        var id = decoded;
        this.data = await this.garmentService.getById(id);
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
      this.list();
    }

    // editCallback(event) {
    //     const encoded = Base64Helper.encode(this.data.Id);
    //     this.router.navigateToRoute('edit', { id: encoded });
    // }
   
    deleteCallback(event) {
        this.garmentService.delete({id: this.data.Id})
            .then(result => {
                this.list();
            });
    }  
}