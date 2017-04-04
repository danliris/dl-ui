import { bindable, inject, containerless, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import { Dialog } from '../../../../../au-components/dialog/dialog';
import { FabricScoreEditor } from './dialogs/fabric-score-editor';

@containerless()
@inject(Service, Dialog)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    @bindable selectedKanban = {};

    constructor(service, dialog) {
        this.service = service;
        this.dialog = dialog;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.data.scores = this.data.scores || [];
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        var kanbanId = "58c8f8287b915900364dd2b0";//this.data.kanbanId;
        this.selectedKanban = await this.service.getKanbanById(kanbanId);
        console.log(this.selectedKanban);
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() !== '';
    }

    fabricScoreColumns = ["pcsNo", "length"];
    fabricScoreTable;
    
    __fabricScoreCreateCallback() {
        this.__fabricScoreShowEditorDialog();
    }

    __fabricScoreShowEditorDialog(data) {
        console.log(this)
        this.dialog.show(FabricScoreEditor, data)
            .then(response => {
                if (!response.wasCancelled) {
                    this.data.scores.push(new FabricScore());
                    this.fabricScoreTable.refresh();
                }
            });
    }
    __fabricScoreRowClickCallback(event) {
        var data = event.detail;
        this.activeBacklog = data;
    }

    fabricScoreLoader = (info) => {
        var count = this.data.scores.count
        var data = this.data.scores;
        return {
            total: count,
            data: data
        };
    };

    selectedKanbanChanged(newValue, oldValue) {
        this.data.kanbanId = this.selectedKanban._id;
    }

    get kanbanLoader() {
        return (keyword) => {
            var info = { keyword: keyword, select: ["cart"] };
            return this.service.searchKanban(info)
                .then(result => {
                    return result.data;
                });
        }
    }
}


class FabricScore {
    constructor() {
        this.type = '';
        this.pcsNo = 'PCSNO';
        this.grade = '';
        this.length = 10;
        this.width = 0;

        this.avalLength = 0;
        this.sampleLength = 0;

        this.problems = [].concat(generalProblemSet);
    }
}



class FabricProblem {
    constructor(group, code, name, score) {
        this.code = code || "";
        this.group = group || "";
        this.name = name || "";
        this.score = score || {
            A: 0,
            B: 0,
            C: 0,
            D: 0
        };
    }
}

var generalProblemSet = [
    new FabricProblem("BENANG", "B001", "Slubs"),
    new FabricProblem("BENANG", "B002", "Neps"),
    new FabricProblem("BENANG", "B003", "Kontaminasi Fiber"),
    new FabricProblem("WEAVING", "W001", "Pakan Renggang"),
    new FabricProblem("WEAVING", "W002", "Pakan Rapat"),
    new FabricProblem("WEAVING", "W003", "Pakan Double"),
    new FabricProblem("WEAVING", "W004", "Pakan Tebal Tipis"),
    new FabricProblem("WEAVING", "W005", "Lusi Tebal Tipis"),
    new FabricProblem("WEAVING", "W006", "Lusi Putus"),
    new FabricProblem("WEAVING", "W007", "Lusi Double"),
    new FabricProblem("WEAVING", "W008", "Madal Sumbi"),
    new FabricProblem("WEAVING", "W009", "Salah Anyam / UP"),
    new FabricProblem("WEAVING", "W010", "Reed Mark"),
    new FabricProblem("WEAVING", "W011", "Temple Mark"),
    new FabricProblem("WEAVING", "W012", "Snarl"),
    new FabricProblem("PRODUKSI", "P001", "Sobek Tepi"),
    new FabricProblem("PRODUKSI", "P002", "Kusut Mati"),
    new FabricProblem("PRODUKSI", "P003", "Kusut / Krismak"),
    new FabricProblem("PRODUKSI", "P004", "Belang Kondensat"),
    new FabricProblem("PRODUKSI", "P005", "Belang Absorbsi"),
    new FabricProblem("PRODUKSI", "P006", "Flek Minyak / Dyest"),
    new FabricProblem("PRODUKSI", "P007", "Flek Oil Jarum"),
    new FabricProblem("PRODUKSI", "P008", "Bintik Htm, Mrh, Biru"),
    new FabricProblem("PRODUKSI", "P009", "Tepi Melipat"),
    new FabricProblem("PRODUKSI", "P010", "Lebar Tak Sama"),
    new FabricProblem("PRODUKSI", "P011", "Lubang / Pin Hole"),
    new FabricProblem("PRODUKSI", "P012", "Bowing"),
    new FabricProblem("PRODUKSI", "P013", "Skewing"),
];

var printingProblemSet = [
    new FabricProblem("PRODUKSI", "P201", "Meleset"),
    new FabricProblem("PRODUKSI", "P202", "Flek"),
    new FabricProblem("PRODUKSI", "P203", "Print Kosong / Bundas"),
    new FabricProblem("PRODUKSI", "P204", "Nyetrip")
];

var finishingProblemSet = [
    new FabricProblem("PRODUKSI", "P101", "Kotor Tanah / Debu"),
    new FabricProblem("PRODUKSI", "P102", "Kotor Hitam"),
    new FabricProblem("PRODUKSI", "P103", "Belang Kusut")
];