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
    console.log(params)
        this.info = params.info;
        console.log(this.info)
        // this.dateFrom = dateFrom;
        // this.dateTo = dateTo;
        // this.supplier = supplier;
        // this.kategori = kategori;
        var dataReport = [];
        var uri = this.service.getDetail(this.info);


        uri.then(data => {
            
            //  console.log(data)
             this.data=data;
            //  for (var isi of data) {

        //     var ket='';
        //     if(isi.category =='FABRIC' || isi.category =='INTERLINING' ){
        //            if(isi.selisih >=30 ){
        //                  ket='OK';
        //              }else{
        //                  ket='NOT OK';
        //              }
        //     }else{
        //         if(isi.selisih >=20 ){
        //                  ket='OK';
        //              }else{
        //                  ket='NOT OK';
        //              }
        //     }
           
        //          var item = {
        //                 keterangan: ket,
        //                 refNo: isi.refNo ? isi.refNo : "-",
        //                 selisih: isi.selisih ? isi.selisih : "-",
        //                 roNo: isi.roNo ? isi.roNo : "-",
        //                 supplier: isi.supplier ? isi.supplier : "-",
        //                 poeDate: isi.poeDate ? isi.poeDate : "-",
        //                 poeNo: isi.poeNo ? isi.poeNo : "-",
        //                 artikel: isi.artikel ? isi.artikel : "-",
        //                 productname: isi.productname ? isi.productname : "-",
        //                 productcode: isi.productcode ? isi.productcode : "-",
        //                 productdescription: isi.productdescription ? isi.productdescription : "-",
        //                 category: isi.category ? isi.category : "-",
        //                 remark: isi.remark ? isi.remark : "-",
        //                 tglll: isi.tglll ? isi.tglll : "-",
        //                 tglpr: isi.tglpr ? isi.tglpr : "-",
        //                 tglpo: isi.tglpo ? isi.tglpo : "-",
        //                 kategori: isi.kategori ? isi.kategori : "-",
        //                 _createdBy: isi._createdBy ? isi._createdBy : "-",
        //                 purchaseRequestshipmentDate: isi.purchaseRequestshipmentDate ? isi.purchaseRequestshipmentDate : "-", 
                        
        //     }
        //       dataReport.push(item);
            //  }
        //   this.dataReport = dataReport;
        })
    }

    ExportToExcel() {
        var info = {
            supplierCode : this.info.supplierCode ? this.info.supplierCode: "",
            dateFrom : this.info.dateFrom ? moment(this.info.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.info.dateTo ? moment(this.info.dateTo).format("YYYY-MM-DD"): "",
            category : this.info.category ? this.info.category: "",
            garmentCategory : this.info.garmentCategory ? this.info.garmentCategory: "",
            productCode : this.info.productCode ? this.info.productCode: ""
        }
        console.log(this.info)
        console.log(info)
        this.service.generateExcel2(info)
      //  this.service.generateExcel(this.unit ? this.unit._id : "", this.category ? this.category._id : "", this.buyer ? this.buyer._id : "", this.purchaseRequest ? this.purchaseRequest.no : "", this.dateFrom, this.dateTo, this.prState.value);
    }

    list(dateFrom, dateTo, kategori) {
        this.router.navigateToRoute('list', { dateFrom: this.dateFrom, dateTo: this.dateTo, kategori: this.kategori});
    }

}
