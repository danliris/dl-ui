import { inject, bindable, computedFrom } from 'aurelia-framework'
import { CoreService } from '../service';

const SizeLoader = require('../../../../loader/size-loader');

@inject(CoreService)
export class Detail {
    @bindable selectedSize;

    get sizeLoader() {
        return SizeLoader;
    }

    constructor(coreService) {
        this.coreService = coreService;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        if(this.data.Size){
            this.selectedSize = this.data.Size;
        }
        if(!this.data.Uom){
            this.data.Uom = {
                Unit : 'PCS'
            };
        }
    }

    async selectedSizeChanged(newValue) {
        if (newValue) {
            this.data.Size = newValue;
            let uomResult = await this.coreService.getUom({ size: 1,keyword: 'PCS', filter: JSON.stringify({ Unit: 'PCS' }) });
            this.data.Uom = uomResult.data[0];
        } else {
            this.data.Uom = [];
        }
    }
}