import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/production/finishing-printing/quality-control/defect/dialogs/fabric-score-editor.html")
export class FabricScoreEditor {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }
    pcsNo;
    activate(data) {
        this.data = data;
        this.pcsNo = this.data && this.data.pcsNo ? this.data.pcsNo : "";
    } 

    saveCallback() {
        var action = Promise.resolve(this.pcsNo);

        action
            .then(result => {
                this.dialogController.ok(this.pcsNo);
            }) 
            .catch(error => {
                this.error = error;
            });
    }
}