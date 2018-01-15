import  {  inject,  bindable,  BindingEngine,  observable,  computedFrom  }  from  'aurelia-framework'
import  {  Service  }  from  './service';
var  moment  =  require('moment');
var  momentToMillis  =  require('../../../../utils/moment-to-millis')
var  MachineLoader  =  require('../../../../loader/machines-loader');
var  ProductionOrderLoader  =  require('../../../../loader/production-order-loader');

@inject(BindingEngine,  Service,  Element)
export  class  DataForm  {
    @bindable  title;
    @bindable  readOnly  =  false;
    @bindable  data  =  {};
    @bindable  error  =  {};

    machineCodeFilter  =  '';
    @bindable  productionOrderDetails  =  [];

    @bindable  localStartDate;
    @bindable  localEndDate;

    auInputOptions  =  {
        label:  {
            length:  4,
            align:  "right"
        },
        control:  {
            length:  5
        }
    };

    divisionFilter  =  {  "unit.division.name":  "FINISHING & PRINTING"  };

    constructor(bindingEngine,  service,  element) {
        this.bindingEngine  =  bindingEngine;
        this.service  =  service;
        this.element  =  element;
    }

    bind(context) {
        this.context  =  context;
        this.data  =  this.context.data;
        this.error  =  this.context.error;

        this.localStartDate  =  new  Date(Date.parse(this.data.dateStart));
        this.localEndDate  =  new  Date(Date.parse(this.data.dateEnd));

        this.data.timeInMomentStart  =  this.data.timeInMillisStart  !=  undefined  ?  moment(this.data.timeInMillisStart)  :  this._adjustMoment();
        this.data.timeInMomentEnd  =  this.data.timeInMillisEnd  !=  undefined  &&  this.data.timeInMillisEnd  !=  null  ?  moment(this.data.timeInMillisEnd)  :  this._adjustMoment();

        if  (this.data.productionOrder  &&  this.data.productionOrder.details  &&  this.data.productionOrder.details.length  >  0) {
            this.productionOrderDetails  =  this.data.productionOrder.details;
            this._mapProductionOrderDetail();
        }
    }

    localStartDateChanged(newValue) {
        this.data.dateStart  =  this.localStartDate;
    }

    localEndDateChanged(newValue) {
        this.data.dateEnd  =  this.localEndDate;
    }

    machineChanged(newValue) {
        delete  this.data.machineEvent;

        var  selectedMachine  =  newValue;
        // this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
        this.data.machineId  =  this.data.machine._id;
        // this.machineCodeFilter = selectedMachine.code;
        this.machineCodeFilter  =  this.data.machine.code;
    }

    timeStartChanged(E) {
        var  tempTimeStart  =  e.detail;
        if  (tempTimeStart) {
            tempTimeStart  =  this._adjustMoment(tempTimeStart);
            this.data.timeInMillisStart  =  momentToMillis(tempTimeStart);
        }
        else  {
            delete  this.data.timeInMillisStart;
        }
    }

    timeEndChanged(E) {
        var  tempTimeEnd  =  e.detail;
        if  (tempTimeEnd) {
            tempTimeEnd  =  this._adjustMoment(tempTimeEnd);
            this.data.timeInMillisEnd  =  momentToMillis(tempTimeEnd);
        }
        else  {
            delete  this.data.timeInMillisEnd;
        }
    }

    async productionOrderChanged(newValue) {
        this.productionOrderDetails  =  [];

        var  productionOrder  =  newValue;
        if  (productionOrder) {
            this.productionOrderDetails  =  await  this.service.getProductionOrderDetails(productionOrder.orderNo);

            this.data.productionOrderId  =  this.data.productionOrder._id;
            if  (this.hasProductionOrderDetails) {
                this._mapProductionOrderDetail();
                this.data.selectedProductionOrderDetail  =  {};
                this.data.selectedProductionOrderDetail  =  this.productionOrderDetails[0];
            }
        }
        else  {
            delete  this.data.selectedProductionOrderDetail;
        }
    }

    get  hasProductionOrderDetails() {
        return  this.productionOrderDetails.length  >  0;
    }

    get  hasMachine() {
        // return this.data && this.data.machineId && this.data.machineId !== '';
        return  this.data  &&  this.data.machineId  &&  this.data.machineId  !==  '';
    }

    _mapProductionOrderDetail() {
        this.productionOrderDetails.map(detail  =>  {
            detail.toString  =  function  () {
                return  `${this.colorRequest}`;
            }
            return  detail;
        });
    }

    _adjustMoment(timeInMoment) {
        if  (timeInMoment) {
            timeInMoment.set('year',  1970);
            timeInMoment.set('month',  0);
            timeInMoment.set('date',  1);
        }
        return  timeInMoment;
    }

    get  machineLoader() {
        return  MachineLoader;
    }

    get  productionOrderLoader() {
        return  ProductionOrderLoader;
    }

}