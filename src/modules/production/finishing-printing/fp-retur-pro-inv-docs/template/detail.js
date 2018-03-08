export class detail {
    activate(context) {
        this.context = context;
        this.Input = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}