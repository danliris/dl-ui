import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        this.type = parentInstruction.config.settings.type;

        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPRNo = {
                PRNo: this.data.PRNo,
            };

            if (this.data.Items) {
                switch (this.type) {
                    case "md":
                        this.data.Items = this.data.Items.filter(i => i.IsOpenPO && !i.IsApprovedOpenPOMD);
                        break;
                    case "purchasing":
                        this.data.Items = this.data.Items.filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && !i.IsApprovedOpenPOPurchasing);
                        break;
                }
    
                if (this.data.Items.length < 1) {
                    this.editCallback = null;
                }
            } else {
                this.editCallback = null;
            }
        }
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    saveCallback(event) {
        if (confirm("Approve Open PO Master?")) {
            let ids = [];

            const jsonPatch = [];
            switch (this.type) {
                case "md":
                    jsonPatch.push({ op: "replace", path: `/IsApprovedOpenPOMD`, value: true });
                    ids = (this.data.Items || []).filter(i => i.IsOpenPO && !i.IsApprovedOpenPOMD).map(i => i.Id);
                    break;
                case "purchasing":
                    jsonPatch.push({ op: "replace", path: `/IsApprovedOpenPOPurchasing`, value: true });
                    ids = (this.data.Items || []).filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && !i.IsApprovedOpenPOPurchasing).map(i => i.Id);
                    break;
            }

            this.service.patch({ id: JSON.stringify(ids) }, jsonPatch)
                .then(result => {
                    alert("Berhasil Approve Open PO Master");
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        return;
    }
}
