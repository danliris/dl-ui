import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class CreatePodl {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }
    
    // async activate(params) {
        
    //     this.data.items = await new Promise((resolve, reject) => {
    //         var tasks = [];
    //         for (var id of params.items) {
    //             tasks.push(this.service.getById(id));
    //         }
            
    //         Promise.all(tasks)
    //             .then(results => {
    //                 console.log(results);
    //                 resolve(results);
    //             })
    //     })
    // }

    back() {
        this.router.navigateToRoute('list-podl');
    }

    save() {
        console.log(JSON.stringify(this.data));
        this.service.createGroup(this.data)
            .then(result => {
                this.back();
            })
            .catch(e => {
                console.log(e);
                this.error = e;
            })
    }
}
