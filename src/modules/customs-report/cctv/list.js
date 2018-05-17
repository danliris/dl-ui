import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    
      tv1() {
    window.open("http://cctv.danliris.com:8001");  
  }
      tv2() {
    window.open("http://cctv.danliris.com:8002");

    }
      tv3() {
    window.open("http://cctv.danliris.com:8006");  
  }
      tv4() {
    window.open("http://cctv.danliris.com:8007");
    }
   
}