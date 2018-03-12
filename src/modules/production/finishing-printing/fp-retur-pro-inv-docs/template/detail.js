export class detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.contextOptions = context.context.options;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productLoader() {
        return this.options.productLoader ? this.options.productLoader : [];
    }

}