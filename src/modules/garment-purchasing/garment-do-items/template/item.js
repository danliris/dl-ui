import { inject, bindable, computedFrom } from "aurelia-framework";
import { concat, forEach } from "../../../../routes/general";
import { Service } from "../service";



@inject(Service)
export class Item {
    @bindable selectedDL;

    constructor(service) {
        this.service = service;
    }

    rackOptions =['-','R1','R2','R3','R4','R5','R6','R7','R8','R9','R10','R13','R14','R15','R16','R17','R18','R19','R31','R32','R33','R34','R35','R36','R37','R38','R39','R40','R41','R42'];
    levelOptions =['-','L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12','L13','L14','L15','L16','L17','L18','L19'];
    boxOptions = ['-','B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11','B12','B13','B14','B15','B16','B17','B18','B19','B20','B21','B22','B23','B24','B25','B26','B27','B28','B29','B30','B31','B32','B33','B34','B35','B36','B37','B38','B39','B40','B41','B42','B43','B44','B45','B46','B47','B48','B49','B50','B51','B52'];
    areaOptions = ['-','A1','A2','A3','A4','A5','B.ZONE'];
    activate(context) {
        this.context = context;
        this.data = context.data;
        console.log("dataitem", this.data);
        
        this.error = context.error;

        this.options = context.context.options;

        this.isShowing = true;

        // this.TotalPrice = this.data.TotalPrice;
        this.selectedDL = this.data.DLNo;
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


}
