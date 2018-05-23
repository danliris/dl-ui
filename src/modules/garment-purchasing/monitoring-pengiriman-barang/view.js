import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

async activate(params) {
        var id = params.id;
        var supplier = params.supplier;

        var dateFrom = params.dateFrom;
        var dateTo = params.dateTo;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.supplier = supplier;
 
        var dataReport = [];
        var uri = "";
        
        if (this.supplier == undefined  )
            uri = this.service.getDetail(supplier,dateFrom,dateTo);
        else
            uri = this.service.getDetail(supplier,dateFrom,dateTo);


        uri.then(data => {
            
             
             for (var isi of data) {

            var ket='';
         
                if(isi.selisih > 5 ){
                         ket='NOT OK';
                     }else{
                         ket='OK';
                     }
        
           
                 var item = {
                        keterangan: ket,
                        refNo: isi.refNo ? isi.refNo : "-",
                        selisih: isi.selisih ? isi.selisih : "-",
                        roNo: isi.roNo ? isi.roNo : "-",
                        supplier: isi.supplier ? isi.supplier : "-",
                        poeDate: isi.poeDate ? isi.poeDate : "-",
                        poeNo: isi.poeNo ? isi.poeNo : "-",
                        artikel: isi.artikel ? isi.artikel : "-",
                        productname: isi.productname ? isi.productname : "-",
                        productcode: isi.productcode ? isi.productcode : "-",
                        productdescription: isi.productdescription ? isi.productdescription : "-",
                        category: isi.category ? isi.category : "-",
                        remark: isi.remark ? isi.remark : "-",
                        tglll: isi.tglll ? isi.tglll : "-",
                        tglpr: isi.tglpr ? isi.tglpr : "-",
                        tglpo: isi.tglpo ? isi.tglpo : "-",
                        kategori: isi.kategori ? isi.kategori : "-",
                        _createdBy: isi._createdBy ? isi._createdBy : "-",
                        purchaseRequestshipmentDate: isi.purchaseRequestshipmentDate ? isi.purchaseRequestshipmentDate : "-", 
                        
            }
              dataReport.push(item);
             }
          
          
          this.dataReport = dataReport;
        })
    }


   ExportToExcel() {

this.service.generateExcel2(this.supplier ? this.supplier : "",this.dateFrom ? this.dateFrom : "", this.dateTo ?this.dateTo : "")
    }

    list(dateFrom, dateTo, kategori) {
        this.router.navigateToRoute('list', { dateFrom: this.dateFrom, dateTo: this.dateTo, kategori: this.kategori});
    }

}
