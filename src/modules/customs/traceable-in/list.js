
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
            }
            else if (newvalue === "No BC Masuk") { 
                this.tipe = "BCNo"; 
            }
            else if (newvalue === "Kode Barang") {
                this.tipe = "ItemCode"; 
            } 
            else{
            this.tipe = "BCDate";
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
                    console.log(result);
                    var datas=[];
                    var index=0;  
                    for(var _data of result.data){
                        var bc = _data.BCType.toString();
                        var doc = _data.BCNo.toString();
                        var bon = _data.BonNo.toString();
                        var po = _data.PO.toString();
                        var ic = _data.ItemCode.toString();
                        var iname = _data.ItemName.toString();
                        _data.PEBDate = _data.PEBDate == ""?'-': moment(_data.PEBDate).format("D MMM YYYY")
                        if(!this.rowCount[bc]){
                            this.rowCount[bc]=1;
                        }
                        else{
                            this.rowCount[bc]++;
                        }
     
                        if(!rowDoc[doc+bc+bon]){
                            //index++;
                            //_data.count=index;
                            rowDoc[doc+bc+bon]=1;
                        }
                        else{
                            rowDoc[doc+bc+bon]++;
                        }
                        _data.Sisa = _data.QtyReceipt - _data.QtyExpend
                    //_data.priceTotal=_data.priceTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    //console.log(this.rowCount);
                    //console.log(rowDoc);
                    //console.log(_data);
                    datas.push(_data);
                    }
                    for(var b of result.data){
                        let bcno=result.data.find(o=> o.BCType + o.BCNo + o.BonNo ==b.BCType + b.BCNo +b.BonNo);
                        if(bcno){
                            bcno.docspan=rowDoc[b.BCNo+b.BCType+b.BonNo];
                        }
                        let bctipe=result.data.find(o=> o.BCType ==b.BCType);
                        if(bctipe){
                            bctipe.rowspan=this.rowCount[b.BCType];
                        }
                        
                    }
                
                     //this.info.total= result.info.total;
                     this.data = datas;
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



