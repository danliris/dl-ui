import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/production/finishing-printing/quality-control/defect/dialogs/fabric-grade-test-editor.html")
export class FabricGradeTestEditor {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }
    pcsNo;
    activate(data) {
        this.data = data;
        this.pcsNo = this.data && this.data.pcsNo ? this.data.pcsNo : "";
        this.pcsLength = this.data && this.data.length ? this.data.length : 0;
        this.pcsWidth = this.data && this.data.width ? this.data.width : 0;
    }

    saveCallback() {
        var action = Promise.resolve(this.pcsNo);

        action
            .then(result => {
                this.dialogController.ok({
                    pcsNo: this.pcsNo,
                    pcsLength: this.pcsLength,
                    pcsWidth: this.pcsWidth
                });
            })
            .catch(error => {
                this.error = error;
            });
    }
}