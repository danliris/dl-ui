import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;



    }
    shiftOptions = [
        { text: "", value: 0 },
        { text: "I", value: 1 },
        { text: "II", value: 2 },
        { text: "III", value: 3 } 
    ];
    jenisMesinOptions = [
        { text: "", value: 0 },
        { text: "CRANK", value: 1 },
        { text: "TAPPET", value: 2 },
        { text: "DOBBY", value: 3 }, 
        { text: "PICANOL", value: 4 }, 
        { text: "TOYOTA", value: 1 },
        { text: "TSUDAKOMA ZAX", value: 2 },
        { text: "JAQUARD", value: 3 } 
       
    ];
    namaBlokOptions = [
        { text: "", value: 0 },
        { text: "TIMUR", value: 1 },
        { text: "BARAT", value: 2 }
    ];
    namaMtcOptions = [
      { text: "", value: 0 },
      { text: "SURAJI", value: 1 },
      { text: "BAYU", value: 2 },
      { text: "DAVID", value: 3 } 
  ];

    info={size:100, page:1}
    searching() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            jenisMesin : this.info.jenisMesin ? this.info.jenisMesin.text: "",
            namaBlok : this.info.namaBlok ? this.info.namaBlok.text: "",
            namaMtc : this.info.namaMtc ? this.info.namaMtc.text: "",
            operatornya : this.info.operatornya ? this.info.operatornya: "",
            sp : this.info.sp ? this.info.sp: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD"),
            page : this.info.page,
            size : this.info.size
        }
        this.service.getReportData(info)
            .then(result => {
                var idx=(this.info.page-1) *100;
                console.log(result.data)
                this.AmountCMPX = 0;
                this.AmountFrm=0;
                this.AmountProduksiMeter = 0;
                this.Amount100Produksi=0;
                this.AmountEFF = 0;
                this.AmountEFFmc2=0;
                this.AmountFill = 0;
                this.AmountWarp=0;
                this.AmountRPM = 0;
         

                for(var d of result.data){
                    idx++;
                    d.index=idx;
                    //ini di bulatkan ke atas
                    d.TotRPM = Math.round(d.TotRPM);


                    d.periode=moment(d.periode).format("YYYY-MM-DD");
                   // d.TotProduction=d.TotProduction.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    //hitung grand total
                    this.AmountCMPX += d.TotProductionCMPX;  
                    this.AmountFrm += d.TotMCNo;  
                    this.AmountProduksiMeter += d.TotProduction;  
                    this.Amount100Produksi += d.TotProduction100;  
                    this.AmountEFF += d.TotPercentEff;  
                    this.AmountEFFmc2 += d.TotMC2Eff;  
                    this.AmountFill += d.TotF;  
                    this.AmountWarp += d.TotW;  
                    this.AmountRPM += d.TotRPM;  
                    

                    
                
                }
                this.data= result.data;
                 //tmbh ini
                 this.info.total=result.info.total;
                //utk total
                 this.AmountCMPX = this.AmountCMPX.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountFrm = this.AmountFrm.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountProduksiMeter = this.AmountProduksiMeter.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.Amount100Produksi = this.Amount100Produksi.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountEFF = this.AmountEFF.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountEFFmc2 = this.AmountEFFmc2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountFill = this.AmountFill.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountWarp = this.AmountWarp.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 this.AmountRPM = this.AmountRPM.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                 
            });
    }
    
    ExportToExcel() {
        var info = {
            shift : this.info.shift ? this.info.shift.text: "",
            jenisMesin : this.info.jenisMesin ? this.info.jenisMesin.text: "",
            namaBlok : this.info.namaBlok ? this.info.namaBlok.text: "",
            namaMtc : this.info.namaMtc ? this.info.namaMtc.text: "",
            operatornya : this.info.operatornya ? this.info.operatornya: "",
            sp : this.info.sp ? this.info.sp: "",
            fromDate : this.fromDate ? moment(this.fromDate).format("YYYY-MM-DD") : moment('0001-01-01').format("YYYY-MM-DD"),
            toDate : this.toDate ? moment(this.toDate).format("YYYY-MM-DD") :  moment(Date.now()).format("YYYY-MM-DD")
            
        }
        this.service.generateExcel(info);
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }


    reset() {
        this.fromDate = null;
        this.toDate = null;
        this.info.shift = null;
        this.info.jenisMesin = null;
        this.info.namaBlok = null;
        this.info.namaMtc= null;
        this.info.operatornya= null;
        this.info.sp= null;

        this.info.page=1;
    }
}