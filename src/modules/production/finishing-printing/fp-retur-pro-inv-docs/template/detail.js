export class detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.contextOptions = context.context.options;
    }

    gradeList=["A","B","C","BS"];
    return=["Ya","Tidak"];

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productLoader() {
        return this.options.productLoader;
    }

}