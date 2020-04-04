import { bindable } from "aurelia-framework";

export class LocalItem {
    @bindable Length;

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.LengthUom = context.context.options.LengthUom;
        console.log(this.LengthUom)

        if (!this.data.Packing) {
            this.data.Packing = 0;
        }
        if (!this.data.Length) {
            this.data.Length = 0;
        }
        if (!this.data.ConvertionValue) {
            this.data.ConvertionValue = 0;
        }

        this.Packing = this.data.Packing;
        this.Length = this.data.Length;
        if (this.LengthUom == "MTR") {
            this.getConvertionValue = this.Length * 1.094;
        }
        else if (this.LengthUom == "YDS") {
            this.getConvertionValue = this.Length * 0.914;
        } 
        else {
            this.getConvertionValue = 0;
        }
        this.data.ConvertionValue = this.getConvertionValue;
    }

    LengthChanged(newValue, oldValue) {
        if (this.LengthUom == "MTR") {
            this.getConvertionValue = this.Length * 1.094;
        }
        else if (this.LengthUom == "YDS") {
            this.getConvertionValue = this.Length * 0.914;
        } 
        else {
            this.getConvertionValue = 0;
        }
        this.data.ConvertionValue = this.getConvertionValue;
        this.data.Length = this.Length;
    }

    LengthUomChanged(newValue, oldValue) {
        if (newValue) {
            this.LengthUom = newValue;
        }
      }
}
