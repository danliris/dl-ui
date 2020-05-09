
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

                        _data.PEBDate = moment(_data.PEBDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(_data.PEBDate).format("DD MMM YYYY")
                        if(!rowDoc[invo + EksporQty + BjQty + proQty + po]){
                            rowDoc[invo + EksporQty + BjQty + proQty + po]=1;
                        }
                        else{
                          rowDoc[invo + EksporQty + BjQty + proQty + po]++;
                        }
                        if (!rowDoc[PEB+invo+ROJob+doc+bon+bc+po]){
                            rowDoc[PEB + invo + ROJob + doc + bon + bc + po]=1
                        }
                        else{
                            rowDoc[PEB + invo + ROJob + doc + bon + bc + po]++
                        }

                        if (!rowDoc[PEB + invo]) {
 
                            rowDoc[PEB + invo] = 1
                        }
                        else {
                            rowDoc[PEB + invo]++
                        }
                        if (!rowDoc[ROJob + invo + po]){
                            rowDoc[ROJob + invo + po] = 1
                        }else{
                            rowDoc[ROJob + invo + po]++
                        }
                        if (!rowDoc[doc + bc + bon]) {
                            rowDoc[doc + bc + bon] = 1
                        } else {
                            rowDoc[doc + bc + bon]++
                        }
                      if (!rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa]){
                            rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa] = 1
                        }else{
                            rowDoc[po + ic + iname + satreceipt + buk + QtyBuk + bon + Sisa]++
                        }
                        if (!rowDoc[bon + po + ic + iname + satreceipt]) {
                            rowDoc[bon + po + ic + iname + satreceipt] = 1
                        } else {
                            rowDoc[bon + po + ic + iname + satreceipt]++
                        }

                   
                    }
                    //console.log(rowDoc)
                    for(var b of result.data){
                        //console.log(b.BCType + b.BCNo);
                        //let bcno = result.data.find(o => o.BCType + o.BCNo + o.BonNo + o.PO + o.ItemCode + o.ItemName + o.ReceiptQty + o.SatuanReceipt + o.ROJob + o.ProduksiQty + o.BJQty + o.Invoice + o.PEB + o.PEBDate + o.EksporQty + o.SampleQty == b.BCType + b.BCNo + b.BonNo + b.PO + b.ItemCode + b.ItemName + b.ReceiptQty + b.SatuanReceipt + b.ROJob + b.ProduksiQty + b.BJQty + b.Invoice + b.PEB + b.PEBDate + b.EksporQty + b.SampleQty);
                        let bcno = result.data.find(o=> o.BCType + o.BCNo + o.PEB + o.ROJob + o.Invoice + o.BonNo + o.PO== b.BCType + b.BCNo + b.PEB +b.ROJob +b.Invoice+b.BonNo+b.PO)
                        //console.log(bcno)
                        if(bcno){
                            //console.log(rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.ProduksiQty.toString() + b.BJQty.toString() + b.Invoice.toString() + b.PEB.toString() + b.PEBDate.toString() + b.EksporQty.toString() + b.SampleQty.toString()]);
                            //bcno.docspan = rowDoc[b.BCNo.toString() + b.BCType.toString() + b.BonNo.toString() + b.PO.toString() + b.ItemCode.toString() + b.ItemName.toString() + b.ReceiptQty.toString() + b.SatuanReceipt.toString() + b.ROJob.toString() + b.ProduksiQty.toString() + b.BJQty.toString() + b.Invoice.toString() + b.PEB.toString() + b.PEBDate.toString() + b.EksporQty.toString() + b.SampleQty.toString()];
                            bcno.docspan = rowDoc[b.PEB + b.Invoice + b.ROJob + b.BCNo + b.BonNo +b.BCType+b.PO ]        
                        }
                        //console.log(bcno.docspan);
                        let bctipe=result.data.find(o=> o.BCType ==b.BCType);
                        if(bctipe){
                            bctipe.rowspan=this.rowCount[b.BCType];
                        }
                        let bcno2 = result.data.find(o => o.PEB + o.Invoice == b.PEB + b.Invoice);
                        if (bcno2) {
                            //console.log(rowDoc[b.BCNo + b.BCType + b.BonNo])
                            bcno2.bcnospan = rowDoc[b.PEB + b.Invoice];
                        }
                        let ro = result.data.find(o => o.ROJob + o.Invoice + o.PO == b.ROJob + b.Invoice + b.PO)
                        if(ro){
                            ro.rospan = rowDoc[b.ROJob + b.Invoice + b.PO];
                        }
                        let bcdoc = result.data.find(o => o.BCNo + o.BCType +o.BonNo== b.BCNo + b.BCType + b.BonNo)
                        if (bcdoc) {
                            bcdoc.bcdocspan = rowDoc[b.BCNo + b.BCType + b.BonNo];
                        }
                      let po = result.data.find(o => o.PO + o.ItemCode + o.ItemName + o.SatuanReceipt + o.QtyBUK + o.BUK + o.BonNo + o.Sisa == b.PO + b.ItemCode + b.ItemName + b.SatuanReceipt + b.QtyBUK + b.BUK + b.BonNo + b.Sisa)
                        if(po){
                            po.docspanpo = rowDoc[b.PO + b.ItemCode + b.ItemName  + b.SatuanReceipt + b.BUK +b.QtyBUK + b.BonNo + b.Sisa]
                        }
                        let ekspor = result.data.find(o=>o.Invoice + o.EksporQty + o.BJQty + o.ProduksiQty + o.PO == b.Invoice + b.EksporQty + b.BJQty + b.ProduksiQty + b.PO)
                        if(ekspor){
                            ekspor.docsekspor = rowDoc[b.Invoice + b.EksporQty + b.BJQty + b.ProduksiQty + b.PO]
                        }
                        let bukspan = result.data.find(o => o.BonNo + o.PO + o.ItemCode + o.ItemName + o.SatuanReceipt == b.BonNo + b.PO + b.ItemCode + b.ItemName + b.SatuanReceipt)
                       // console.log(bukspan)
                        if(bukspan){
                            //console.log(b.BUK + b.QtyBUK + b.PO)
                          bukspan.docspanpo2 = rowDoc[b.BonNo + b.PO + b.ItemCode + b.ItemName + b.SatuanReceipt]
                            //b.docspanbuk = rowDoc[b.BUK + b.QtyBUK + b.PO]
                        }

                    }
                
                    //console.log(result.data);
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



