
import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var bcnoLoader = require('../../../loader/traceable-in-bc-loader');
var roloader = require('../../../loader/traceable-in-ro-loader');
var itemloader = require('../../../loader/traceable-in-item-loader');

@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    @bindable type
    Types = ["RO Job","Kode Barang", "No BC Masuk", "Tanggal BC Masuk"];
    bind(context) {
        console.log(context);
        this.context = context;

    }

    attached() {
    }

    activate() {
    }

    // filterQuery={
    //     "filter":"BCNo"
    // }
    get filterQuery(){
        if(this.type === "No BC Masuk"){
            var jenis = {"filter":"BCNo"}
        }else if(this.type === "RO Job"){
            var jenis = {"filter":"ROJob"}
        }else if(this.type === "Kode Barang"){
            var jenis = {"filter":"ItemCode"}
        }// }else{
        //     var jenis = {"filter":"ComodityName"} 
        // }

        return jenis;
    }
    // search(){
    //     this.info.page = 1;
    //     this.info.total = 0;
    //     this.searching();
    // }
    typeChanged(newvalue){
        if (newvalue) {
            if (newvalue === "RO Job") {
                this.tipe = "ROJob";
                this.BCNo = null;
                this.itemcode = null;
                this.comodity = null;
            }
            else if (newvalue === "No BC Masuk") { 
                this.tipe = "BCNo"; 
                //this.BCNo = null;
                this.rojob = null;
                this.itemcode = null;
                this.comodity = null;
            }
            else if (newvalue === "Kode Barang") {
                this.tipe = "ItemCode"; 
                this.BCNo = null;
                this.rojob = null;
                //this.itemcode = null;
                this.comodity = null;
            } 
            else{
                this.tipe = "BCDate";
                this.BCNo = null;
                this.rojob = null;
                this.itemcode = null;
                this.comodity = null;
        }
        }
    }
    
    
    searching() {
        let args = {
            // page: this.info.page,
            // size: this.info.size,
            bcno : this.BCNo ? this.BCNo.BCNo : this.rojob? this.rojob.ROJob : this.itemcode? this.itemcode.ItemCode : "",
            type : this.tipe ? this.tipe : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                    var rowDoc=[]
                    //console.log(result);
                    
                    var index=0;  
                    for(var _data of result.data){
                        var bc = _data.BCType.toString();
                        var doc = _data.BCNo.toString();
                        var date = _data.BCDate.toString();
                        var bon = _data.BonNo.toString();
                        var po = _data.PO.toString();
                        var buk = _data.BUK.toString();
                        var QtyBuk = _data.QtyBUK.toString();
                        var ic = _data.ItemCode.toString();
                        var iname = _data.ItemName.toString();
                        var receipt = _data.ReceiptQty.toString();
                        var satreceipt = _data.SatuanReceipt.toString();
                        var ROJob = _data.ROJob.toString();
                        var proQty = _data.ProduksiQty.toString();
                        var BjQty = _data.BJQty.toString();
                        var invo = _data.Invoice.toString();
                        var PEB = _data.PEB.toString();
                        var PEBDate = _data.PEBDate.toString();
                        var EksporQty = _data.EksporQty.toString();
                        var SampleQty = _data.SampleQty.toString();
                        var Sisa = _data.Sisa.toString();

                        _data.PEBDate = moment(_data.PEBDate).format("DD MMM YYYY") == "01 Jan 1970" || moment(_data.PEBDate).format("DD MMM YYYY") == "01 Jan 1900" ? "-" : moment(_data.PEBDate).format("DD MMM YYYY")
                        if (!rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt]) {
                            rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt] = 1;
                        }
                        else{
                          rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt]++;
                        }
                        if (!rowDoc[bc + doc + date + bon]){
                            rowDoc[bc + doc + date + bon] = 1
                        }
                        else{
                            rowDoc[bc + doc + date + bon]++
                        }

                        if (!rowDoc[bc + doc + date]) {
 
                            rowDoc[bc + doc + date] = 1
                        }
                        else {
                            rowDoc[bc + doc + date]++
                        }
                        if (!rowDoc[doc + bc + bon + po + ic + iname ]) {
                            rowDoc[doc + bc + bon + po + ic + iname ] = 1
                        }else{
                            rowDoc[doc + bc + bon + po + ic + iname ]++
                        }
                        if (!rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk]) {
                            rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk] = 1
                        } else {
                            rowDoc[doc + bc + bon + po + ic + iname + receipt + satreceipt + ROJob + buk]++
                        }
                      // if (!rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa]){
                      //       rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa] = 1
                      //   }else{
                      //       rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa]++
                      //   }
                      //   if (!rowDoc[bon + po + ic + iname + satreceipt]) {
                      //       rowDoc[bon + po + ic + iname + satreceipt] = 1
                      //   } else {
                      //       rowDoc[bon + po + ic + iname + satreceipt]++
                      //   }

                   
                    }
                    //console.log(rowDoc)
                    for(var b of result.data){
                        //console.log(b.BCType + b.BCNo);
                        let bcno = result.data.find(o => o.BCType + o.BCNo + o.BonNo + o.PO + o.ItemCode + o.ItemName == b.BCType + b.BCNo + b.BonNo + b.PO + b.ItemCode + b.ItemName)
                        //let bcno = result.data.find(o=> o.BCType + o.BCNo + o.PEB + o.ROJob + o.Invoice + o.BonNo + o.PO== b.BCType + b.BCNo + b.PEB +b.ROJob +b.Invoice+b.BonNo+b.PO)
                        //console.log(bcno)
                        if(bcno){
                            //console.log(rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.ProduksiQty.toString() + b.BJQty.toString() + b.Invoice.toString() + b.PEB.toString() + b.PEBDate.toString() + b.EksporQty.toString() + b.SampleQty.toString()]);
                            bcno.docspan = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString()]
                            //bcno.docspan = rowDoc[b.PEB + b.Invoice + b.ROJob + b.BCNo + b.BonNo +b.BCType+b.PO ]        
                        }
                        //console.log(bcno.docspan);
                        let bctipe = result.data.find(o => o.BCNo + o.BCType + o.BonNo + o.PO + o.ItemCode + o.ItemName + o.ReceiptQty + o.SatuanReceipt == b.BCNo + b.BCType + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt);
                        if(bctipe){
                            bctipe.rowspan = rowDoc[b.BCNo + b.BCType + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt];
                        }
                        let bcno2 = result.data.find(o => o.BCType + o.BCNo + o.BCDate == b.BCType + b.BCNo + b.BCDate);
                        if (bcno2) {
                            //console.log(rowDoc[b.BCNo + b.BCType + b.BonNo])
                            bcno2.bcnospan = rowDoc[b.BCType + b.BCNo + b.BCDate];
                        }
                        let ro = result.data.find(o => o.BCType + o.BCNo + o.BCDate + o.BonNo == b.BCType + b.BCNo + b.BCDate + b.BonNo)
                        if(ro){
                            ro.rospan = rowDoc[b.BCType + b.BCNo + b.BCDate + b.BonNo];
                        }
                      //   let bcdoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo== b.BCNo + b.BCType + b.BonNo)
                      //   if (bcdoc) {
                      //       bcdoc.bcdocspan = rowDoc[b.BCNo + b.BCType + b.BonNo];
                      //   }
                      let po = result.data.find(o => o.BCType + o.BCNo + o.BonNo + o.PO + o.ItemCode + o.ItemName + o.ReceiptQty + o.SatuanReceipt + o.ROJob + o.BUK == b.BCType + b.BCNo + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt + b.ROJob + b.BUK)
                        if(po){
                            po.docspanpo = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.BUK.toString()]
                        }
                      //   let ekspor = result.data.find(o=>o.Invoice + o.EksporQty + o.BJQty + o.ProduksiQty + o.PO == b.Invoice + b.EksporQty + b.BJQty + b.ProduksiQty + b.PO)
                      //   if(ekspor){
                      //       ekspor.docsekspor = rowDoc[b.Invoice + b.EksporQty + b.BJQty + b.ProduksiQty + b.PO]
                      //   }
                      //   let bukspan = result.data.find(o => o.BonNo + o.PO + o.ItemCode + o.ItemName + o.SatuanReceipt == b.BonNo + b.PO + b.ItemCode + b.ItemName + b.SatuanReceipt)
                      //  // console.log(bukspan)
                      //   if(bukspan){
                      //       //console.log(b.BUK + b.QtyBUK + b.PO)
                      //     bukspan.docspanpo2 = rowDoc[b.BonNo + b.PO + b.ItemCode + b.ItemName + b.SatuanReceipt]
                      //       //b.docspanbuk = rowDoc[b.BUK + b.QtyBUK + b.PO]
                      //   }

                    }
                
                    console.log(result.data);
                    //this.info.total= result.info.total;
                     this.data = result.data;
                     
                     console.log(this.data);

                 
                 
                })
        }
    
    
        ExportToExcel() {
            this.error ={};
            if(Object.getOwnPropertyNames(this.error).length === 0){
                let args = {
                    bcno : this.BCNo ? this.BCNo.BCNo : this.rojob? this.rojob.ROJob : this.itemcode? this.itemcode.ItemCode : "",
                    type : this.tipe ? this.tipe : "",
                    dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                    dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                };
                
                this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error:",""));
                });
            }
        }

    get bcnoLoader(){
        return bcnoLoader;
    }

    get rojobLoader(){
        return roloader;
    }

    get itemcodeLoader(){
        return itemloader;
    }


    reset() {
        this.BCNo = null;
        this.rojob = null;
        this.itemcode = null;
        this.comodity = null;
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}



