import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class View {

  searchButton = false;
  dataExist = true;
  editable = true;
  @bindable Month;
  @bindable Year;

  yearFormat = "YYYY";
  years = [];

  constructor(router, service) {
    console.log("masuk view.js");
    this.router = router;
    this.service = service;
    this.data = {};
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    console.log(this.data);
    this.dataThrow = [];

    //console.log(this.data);
    //utk paging
    var idx=(this.info.page-1) *100;

    for (var _data of this.data) {
      //utk paging
      idx++;
      _data.index=idx;

          //berat teoritis
         if (_data.teoritis != null){
          _data.teoritis =_data.teoritis.replaceAll(",",".")
          if (_data.teoritis > -999999 ){
            //console.log(_data.teoritis)
            //_data.teoritis = 1;
            _data.teoritis =(_data.teoritis * 1).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
          else if (_data.teoritis >= 0){
            _data.teoritis =(_data.teoritis * 1).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            //  _data.teoritis =2;
            }
          else if (_data.teoritis =  "#VALUE!"){
              //console.log(_data.teoritis)
                _data.teoritis ="#VALUE!";
              }

        }
        else
        {
              _data.teoritis = ""
        }



          //eficiency
        //  _data.efficiency =((_data.efficiency.replaceAll(",",".")) * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

          //SPU
          // if (_data.spu != null){
          //   _data.spu =_data.spu.replaceAll(",",".")
          //   if (_data.spu > -999999 ){
          //     //console.log(_data.spu)
          //     _data.spu =(_data.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          //     }
          //     else if (_data.spu >= 0){
          //     //console.log(_data.spu)
          //       _data.spu =(_data.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          //     }

          // }
          // else
          // {
          //       _data.spu = ""
          // }


          //draft
          // if (_data.draft != null){
          //   _data.draft =_data.draft.replaceAll(",",".")
          //   if (_data.draft > -999999 ){
          //    // console.log(_data.draft)
          //     _data.draft =(_data.draft * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          //     }
          //     else if (_data.draft >= 0){
          //     //console.log(_data.draft)
          //       _data.draft =(_data.draft * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          //     }

          // }
          // else
          // {
          //       _data.draft = ""
          // }


    this.dataThrow.push(_data);
   }



    this.error = this.context.error;





  }

  //tmbh ini utk paging
  info={size:100, page:1}
  //---------
  async activate(params) {
    console.log(params);//params ini berisi data dari list.js (data rekap sblm klik detail)
    var info = {
       month: params.month,
       yearPeriode: params.yearPeriode,
       //tmbh ini utk paging
       page : this.info.page,
       size : this.info.size
       //-------------
    };
    this.Month = params.month;
    this.Year = params.yearPeriode;
    //tmbh ini utk paging
    //this.page = params.page;
    //this.size = params.size;
    //-------
    //console.log(params)
    var result= await  this.service.getFilter(info);
    this.data = result.data;

    //tmbh ini utk paging
    this.info.total=result.info.total;

    //perulangan saat klik halaman page melakukan aksi ini,
    //kosongkan data dulu "this.dataThrow = [];"
    //lalu diulang dgn data di "page" aktif saat d klik
    this.dataThrow = [];
    var idx=(this.info.page-1) *100;

    for (var _data of this.data) {
      //utk paging
      idx++;
      _data.index=idx;

          //berat teoritis
        if (_data.teoritis != null){
          _data.teoritis =_data.teoritis.replaceAll(",",".")
          if (_data.teoritis > -999999 ){
            //console.log(_data.teoritis)
            //_data.teoritis = 1;
            _data.teoritis =(_data.teoritis * 1).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
          else if (_data.teoritis >= 0){
            _data.teoritis =(_data.teoritis * 1).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            //  _data.teoritis =2;
            }
          else if (_data.teoritis =  "#VALUE!"){
              //console.log(_data.teoritis)
                _data.teoritis ="#VALUE!";
              }

        }
        else
        {
              _data.teoritis = ""
        }



          //eficiency
        //_data.efficiency =((_data.efficiency.replaceAll(",",".")) * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        _data.efficiency =((_data.efficiency.replaceAll(",",".")) * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


         //efficiency
      // if (_data.efficiency != null){
      //     //_data.efficiency =_data.efficiency.replaceAll(",",".")
      //     if (_data.efficiency > -999999 ){
      //  //   console.log(d.efficiency)
      //  _data.efficiency =(_data.efficiency * 100);
      //     }
      //     else if (_data.efficiency >= 0){
      //    // console.log(d.efficiency)
      //    _data.efficiency =(_data.efficiency * 100);
      //     }

      // }
      // else
      // {
              
      //   _data.efficiency = "";
      // }

      
          //SPU
          if (_data.spu != null){
            _data.spu =_data.spu.replaceAll(",",".")
            if (_data.spu > -999999 ){
              //console.log(_data.spu)
              _data.spu =(_data.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              }
              else if (_data.spu >= 0){
              //console.log(_data.spu)
                _data.spu =(_data.spu * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              }

          }
          else
          {
                _data.spu = ""
          }


          //draft
          if (_data.draft != null){
            _data.draft =_data.draft.replaceAll(",",".")
            if (_data.draft > -999999 ){
             // console.log(_data.draft)
              _data.draft =(_data.draft * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              }
              else if (_data.draft >= 0){
              //console.log(_data.draft)
                _data.draft =(_data.draft * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              }

          }
          else
          {
                _data.draft = ""
          }


    this.dataThrow.push(_data);
   }
    //coba

  //------------
    //console.log(this.data);

  }


  //tmbh ini utk paging
  changePage(e) {
  var page = e.detail;
  //console.log(e);
  this.info.page = page;
  this.info.month= this.Month;
  //console.log(e);
  //console.log(this.Month);
  this.info.yearPeriode= this.Year;
  this.activate(this.info);

      // this.context.data = result.data;
      //ini default nya aktif
  //  this.bind(this.context);

  //this.dataThrow = [];


  }
  //------------

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }



  exportToExcel() {

    return this.service.getReportXls(this.Month, this.Year).then(result => {

      return {
        data: result,
        total: length
      };
    })
  }
}
