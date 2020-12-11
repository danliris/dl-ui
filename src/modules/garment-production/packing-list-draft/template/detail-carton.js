import { inject, bindable, computedFrom } from 'aurelia-framework'


export class Detail {
    @bindable selectedRO;
    @bindable length;
    @bindable width;
    @bindable height;
    @bindable grossWeight;
    @bindable netWeight;
    @bindable netNetWeight;

    constructor() {

    }
    sizesColumns = [
        { header: "Size" },
        { header: "Quantity" },
    ];


    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
        };

        this.isShowing = false;
        if (this.error && this.error.Sizes && this.error.Sizes.length > 0) {
            this.isShowing = true;
        }

        this.length = this.data.length;
        this.width = this.data.width;
        this.height = this.data.height;

        this.grossWeight = this.data.grossWeight;
        this.netWeight = this.data.netWeight;
        this.netNetWeight = this.data.netNetWeight;
    }

    get totalQuantity() {
        if (this.data.cartonQuantity && this.data.quantityPCS) {
            this.data.totalQuantity = this.data.cartonQuantity * this.data.quantityPCS;
            return this.data.totalQuantity;
        }
        else
            return 0;
    }

    @computedFrom('data.carton1', 'data.carton2')
    get cartonQuantity() {
        this.data.cartonQuantity = 0;
        if (this.data.carton1 && this.data.carton2) {
            this.data.cartonQuantity = this.data.carton2 - this.data.carton1 + 1;
        }
        this.updateMeasurements();
        return this.data.cartonQuantity;
    }

    get totalQtySize() {
        var qtytot = 0;
        if (this.data.sizes) {
            for (var size of this.data.sizes) {
                if (size.quantity) {
                    qtytot += size.quantity;
                }
            }
        }
        return qtytot;
    }

    get cmb() {
        if (this.data.length && this.data.width && this.data.height && this.data.cartonQuantity)
            return (this.data.length * this.data.width * this.data.height * this.data.cartonQuantity / 1000000).toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        else
            return "0";
    }

    lengthChanged(newValue) {
        this.data.length = newValue;
        this.updateMeasurements();
    }

    widthChanged(newValue) {
        this.data.width = newValue;
        this.updateMeasurements();
    }

    heightChanged(newValue) {
        this.data.height = newValue;
        this.updateMeasurements();
    }

    updateMeasurements() {
        let measurementCartons = [];
        for (const item of this.context.context.options.header.items) {
            for (const detail of (item.details || [])) {
                let measurement = measurementCartons.find(m => m.length == detail.length && m.width == detail.width && m.height == detail.height && m.carton1 == detail.carton1 && m.carton2 == detail.carton2);
                if (!measurement) {
                    measurementCartons.push({
                        carton1: detail.carton1,
                        carton2: detail.carton2,
                        length: detail.length,
                        width: detail.width,
                        height: detail.height,
                        cartonsQuantity: detail.cartonQuantity
                    });
                }
            }
        }

        let measurements = [];
        for (const measurementCarton of measurementCartons) {
            let measurement = measurements.find(m => m.length == measurementCarton.length && m.width == measurementCarton.width && m.height == measurementCarton.height);
            if (measurement) {
                measurement.cartonsQuantity += measurementCarton.cartonsQuantity;
            } else {
                measurements.push(Object.assign({}, measurementCarton));
            }
        }

        this.context.context.options.header.measurements = this.context.context.options.header.measurements || [];
        this.context.context.options.header.measurements.splice(0);

        for (const mt of measurements) {
            let measurement = (this.context.context.options.header.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height);
            if (measurement) {
                measurement.cartonsQuantity = mt.cartonsQuantity;
                this.context.context.options.header.measurements.push(measurement);
            } else {
                this.context.context.options.header.measurements.push(mt);
            }
        }

        this.context.context.options.header.measurements.forEach((m, i) => m.MeasurementIndex = i);
    }

    grossWeightChanged(newValue) {
      this.data.grossWeight = newValue;
      this.updateGrossWeight();
    }
  
    updateGrossWeight() {
      this.context.context.options.header.grossWeight = 0;
      for (const item of this.context.context.options.header.items) {
        for (const detail of item.details) {
          this.context.context.options.header.grossWeight += detail.grossWeight;
        }
      }
    }
  
    netWeightChanged(newValue) {
      this.data.netWeight = newValue;
      this.updateNetWeight();
    }
  
    updateNetWeight() {
      this.context.context.options.header.netWeight = 0;
      for (const item of this.context.context.options.header.items) {
        for (const detail of item.details) {
          this.context.context.options.header.netWeight += detail.netWeight;
        }
      }
    }
  
    netNetWeightChanged(newValue) {
      this.data.netNetWeight = newValue;
      this.updateNetNetWeight();
    }
  
    updateNetNetWeight() {
      this.context.context.options.header.netNetWeight = 0;
      for (const item of this.context.context.options.header.items) {
        for (const detail of item.details) {
          this.context.context.options.header.netNetWeight += detail.netNetWeight;
        }
      }
    }
}
