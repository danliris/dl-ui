import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    // data = [];
    // keyword = '';
    
    today = new Date();
    // info = { page: 1, keyword: '' };

    isPrint = false;
    
    context = ["Rincian", "Cetak PDF", "Cetak Nota Retur"]

    columns = [
        { field: "uPCNo", title: "No. Koreksi" },
        { field: "correctionDate", title: "Tgl. Koreksi"},
        { field: "uPONo", title: "No. Surat Perintah Bayar"},
        { field: "supplier.name", title: "Supplier"},
        { field: "invoiceCorrectionNo", title: "No. Invoice Koreksi"},
        { field: "dueDate", title: "Tgl. Jatuh Tempo", formatter: function(value, data, index){
            return moment(value).format("D MMM YYYY");
          }
        }
      ];

    loader = (info) => {
      var order = {};
      if (info.sort)
         order[info.sort] = info.order;
        console.log(info);
        // data.supplier.name=data.name;
         var arg = {
         page: parseInt(info.offset / info.limit, 10) + 1,
         size: info.limit,
         keyword: info.search,
        //  select:["uPCNo", "correctionDate", "uPONo", "supplier.name", "invoiceCorrectionNo", "dueDate"],
         order: order
        }
    
        return this.service.search(arg)
          .then(result => {
            for (var data of result.data) {
                data.uPCNo = data.uPCNo || data.uPCNo || 0;
                data.uPONo = data.uPONo;
                // data.supplier.name = data.supplier.name;
            }
            return {
              total: result.info.total,
              data: result.data
            }
          });
      }

    constructor(router, service) {
        this.service = service;
        this.router = router;
        // console.log(this.router);
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak Pdf":
                this.service.getPdfById(data._id);
                break;
            case "Cetak Nota Retur":
                this.service.getPdfReturById(data._id);
                break;
        }
    }

    // async activate() {
    //     this.info.keyword = '';
    //     var result = await this.service.search(this.info);
    //     // console.log(result);
    //     this.data = result.data;
    //     console.log(this.data);
    //     this.info = result.info;
    // }

    // loadPage() {
    //     var keyword = this.info.keyword;
    //     console.log(this.info);
    //     this.service.search(this.info)
    //         .then(result => {
    //             this.data = result.data;
    //             this.info = result.info;
    //             this.info.keyword = info.search;
    //         })
    // }

    // changePage(e) {
    //     var page = e.detail;
    //     this.info.page = page;
    //     this.loadPage();
    // }

    // back() {
    //     this.router.navigateToRoute('list');
    // }

    // view(data) {
    //     this.router.navigateToRoute('view', { id: data._id });
    // }

    create() {
        this.router.navigateToRoute('create');
    }

    // getPDF(data) {
    //     this.service.getPdfById(data._id);
    // }

    // getPDFRetur(data) {
    //     this.service.getPdfReturById(data._id);
    // }
}