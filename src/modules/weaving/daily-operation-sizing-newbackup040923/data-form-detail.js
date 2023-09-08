import {
    inject,
    bindable,
    computedFrom
  } from "aurelia-framework";
  import moment from "moment";
  import {
    Service
  } from "./service"; 
  import {
    Router
  } from "aurelia-router";
  
  @inject(Service, Router)
  export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable Month;
    @bindable Year;
    @bindable Unit;
  
    yearFormat = "YYYY";
    years = [];
  
    formOptions = {
      cancelText: "Kembali",
      saveText: "Simpan"
    };
  
    //Options untuk No. Estimasi Produksi
    controlOptions = {
      label: {
        length: 3
      },
      control: {
        length: 6
      }
    };
  
      constructor(service, router) {
      this.service = service;
      this.router = router;
  
      
    }
  
    orderProductionsItems;
    
    bind(context) {
      this.context = context;
      this.data = this.context.data;
      console.log(this.data);
      this.dataThrow = [];
     
      //console.log(this.data);


      for (var _data of this.data) {

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
            _data.efficiency =((_data.efficiency.replaceAll(",",".")) * 100).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 
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

    

      this.error = this.context.error;
      
  
      
  
     
    }
  
  }
  