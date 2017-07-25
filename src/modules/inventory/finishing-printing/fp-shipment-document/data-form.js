import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

export class DataForm {
    @bindable readOnly;
    @bindable data;
    @bindable error;

    @bindable title;

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

    }

    get buyerLoader() {
        return(keyword) => {
            var info = {
                keyword: keyword,
                select: this.buyerFields
            };
            return this.service.searchBuyer(info)
            .then((result) => {
                return result.data
            })
        }
    }
    
    buyerFields = ["name", "type", "address", "code"];

    @bindable selectedBuyer;
    selectedBuyerChanged(newVal, oldVal) {
        console.log(this.selectedBuyer);
    }

} 