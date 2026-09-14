import { inject, bindable, computedFrom } from "aurelia-framework";
import { concat, forEach } from "../../../../routes/general";
var UomLoader = require('../../../../loader/uom-loader');
import { Service } from "../service";
import moment from "moment";



@inject(Service)
export class Item {
    @bindable selectedDL;
    @bindable dataUom;

    constructor(service) {
        this.service = service;
    }

    rackOptions = [];
    levelOptions = [];
    boxOptions = [];
    //areaOptions = ['-','A1','A2','A3','A4','A5','B.ZONE'];
    areaOptions = ['BLUE ZONE', 'RED ZONE', 'GREEN ZONE'];

    static storageLocationLimits = {
        'GUDANG BAHAN BAKU': { rack: 42, level: 13, box: 10 },
        'GUDANG ACCESSORIES': { rack: 28, level: 6, box: 6 },
        'GUDANG EMBALASE': { rack: 22, level: 3, box: 10 }
    };

    static defaultLocationLimits = { rack: 42, level: 13, box: 10 };

    generateLocationOptions(prefix, max) {
        const options = [''];
        for (let i = 1; i <= max; i++) {
            options.push(prefix + i.toString().padStart(2, '0'));
        }
        return options;
    }

    setLocationOptions(storageName) {
        const key = storageName ? storageName.trim().toUpperCase() : '';
        const limits = Item.storageLocationLimits[key] || Item.defaultLocationLimits;

        this.rackOptions = this.generateLocationOptions('R', limits.rack);
        this.levelOptions = this.generateLocationOptions('L', limits.level);
        this.boxOptions = this.generateLocationOptions('B', limits.box);
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        
        this.error = context.error;

        this.options = context.context.options;
        this.isUsedInUnitDO = this.options.isUsedInUnitDO === true;

        this.setLocationOptions(this.options.datas && this.options.datas.StorageName);

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

        
       const isFabric =
        this.data.ProductName &&
        this.data.ProductName.trim().toUpperCase() === "FABRIC";

        if (this.data.HandlingUnit) {

            this.dataUom = {
                Id: this.data.HandlingUnitId,
                Unit: this.data.HandlingUnit
            };

        }
        else if (isFabric) {
            this.setFabricHandlingUnit();
        }
        else {

            this.dataUom = null;

        }
    }

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }

    dataUomChanged(newValue) {
    if (newValue) {
        this.data.HandlingUnit = newValue.Unit;
        this.data.HandlingUnitId = newValue.Id;

        if (this.error) {
            this.error.HandlingUnit = null;
        }
    } else {
        this.data.HandlingUnit = null;
        this.data.HandlingUnitId = null;
    }
}

    
     get uomLoader() {
        return UomLoader;
      }


    setFabricHandlingUnit() {
    UomLoader("ROLL", {})
            .then(results => {
                const roll = results.filter(x => x.Unit === "ROLL")[0];

                if (roll) {
                    this.dataUom = {
                        Id: roll.Id,
                        Unit: roll.Unit
                    };
                    this.data.HandlingUnit = roll.Unit;
                    this.data.HandlingUnitId = roll.Id;
                }
            });

    if (this.error) {
        this.error.HandlingUnit = null;
    }
}

    rackChanged() {
        if (this.data.Rack && this.data.Rack.trim()) {
            this.data.Area = "GREEN ZONE";

            if (this.error) {
                this.error.Area = "BLUE ZONE";
            }
        }
    }

    levelChanged() {
        if (this.data.Level && this.data.Level.trim()) {
            this.data.Area = "GREEN ZONE";

            if (this.error) {
                this.error.Area = "BLUE ZONE";
            }
        }
    }

    boxChanged() {
        if (this.data.Box && this.data.Box.trim()) {
            this.data.Area = "GREEN ZONE";

            if (this.error) {
                this.error.Area = "BLUE ZONE";
            }
        }
    }


}
