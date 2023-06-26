import { inject, bindable, computedFrom } from "aurelia-framework";
import { concat, forEach } from "../../../../routes/general";
import { Service } from "../service";
var TrackLoader = require("../../../../loader/track-loader");



@inject(Service)
export class Item {

    constructor(service) {
        this.service = service;
    }

    
    activate(context) {
        this.context = context;
        this.data = context.data;
        console.log("dataitem", this.data);
        
        this.error = context.error;

        this.options = context.context.options;

        this.isShowing = true;

        this.packagingQtyRemains = this.data.packagingQtyRemains;
        this.data.balance = this.data.packagingQtyRemains * this.data.packagingLength;
        this.productPackingCode = this.data.productPackingCode;
        //this.data.packagingQtySplit = newValue;

        

        // this.TotalPrice = this.data.TotalPrice;
        //this.selectedDL = this.data.DLNo;
        // this.datas = context.context.options.datas;
        // console.log("context",context.context.options);
        // if(this.options.isCreate){
        //     this.data.CIF = this.datas.CIF;
        //     this.filter = {
        //         ContractNo:this.datas.ContractNo
        //     }
        // }else if(this.options.isEdit){
        //     this.filter ={
        //     ContractNo:this.options.selectedContract
        //     } 
        // } 



    }

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }

    trackView = (track) => {
        console.log(track);
        if(track.Type === undefined){
    
          if(track.box === null){
            return `${track.type} - ${track.name}` ; 
          } else{
            return `${track.type} - ${track.name} - ${track.box}` ; 
          }
          
        }else{
          if(track.Box === null){
            return `${track.Type} - ${track.Name}`;
          }else{
            return `${track.Type} - ${track.Name} - ${track.Box}`;
          }
          
        }
        
      }

      get trackLoader(){
        return TrackLoader;
      }
      @bindable packagingQtyRemains
      packagingQtyRemainsChanged(newValue, olderValue) {
        // if (this.dataForm.context.isCreate) {
            console.log(this.data);
        if (newValue != olderValue) {
            this.data.balance = newValue * this.data.packagingLength ;
            // this.data.packagingQTY = this.inputPackagingQTY;
            this.data.packagingQtySplit = newValue;
            this.data.packingQtyDiff  = olderValue - newValue;
             
           
           
        }
    }

}
