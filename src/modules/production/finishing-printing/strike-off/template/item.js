import { inject, bindable, computedFrom } from 'aurelia-framework'
var ColorReceiptLoader = require('../../../../../loader/color-receipt-loader');

export class CartItem {
    @bindable DyeStuffCollections;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.Type = this.contextOptions.Type;
        this.Cloth = this.contextOptions.Cloth;
        this.readOnly = this.options.readOnly;


        if (this.data.Id && this.data.ChemicalItems) {
            this.showChemical = true;
        }

    }

    chemicalOptions = {};
    controlOptions = {
        control: {
            length: 12
        }
    };
    dyeStuffColumns = ["Dye Stuff", "G/KG"];
    chemicalColumns = ["Chemical", "G/KG"];
    get colorReceiptLoader() {
        return ColorReceiptLoader;
    }

    addItemCallback = (e) => {
        this.data.DyeStuffItems = this.data.DyeStuffItems || [];
        this.data.DyeStuffItems.push({})
    };

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    get totalDyeStuff() {
        if (this.data.DyeStuffItems) {
            return this.data.DyeStuffItems.reduce((a, b) => +a + +b.Quantity, 0);
        } else {
            return 0;
        }
    }

    get totalChemical() {
        if (this.data.ChemicalItems) {
            return this.data.ChemicalItems.reduce((a, b) => +a + +b.Quantity, 0);
        } else {
            return 0;
        }
    }

    showChemical = false;

    @computedFrom("totalChemical")
    get viscositasNumber() {
        if (!this.data.Id || !this.readOnly) {
            if (this.data.ChemicalItems && this.data.ChemicalItems.length > 0) {
                console.log(this.data.ChemicalItems[this.data.ChemicalItems.length - 1]);
                return this.data.ChemicalItems[this.data.ChemicalItems.length - 1].Quantity;
            }
        }

    }

    @computedFrom("totalDyeStuff")
    get totalDetail() {
        if (!this.data.Id || !this.readOnly) {
            if (this.data.DyeStuffItems && this.data.DyeStuffItems.length > 0) {
                var vNum = this.viscositasNumber;
                this.data.ChemicalItems = [];
                this.sumItem = this.data.DyeStuffItems.reduce((a, b) => +a + +b.Quantity, 0);
                if (this.sumItem > 0) {
                    this.showChemical = true;
                    if (this.Type === "PRINTING REAKTIF") {
                        if (this.Cloth === "Cotton") {
                            if (0 <= this.sumItem && this.sumItem <= 5) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 100
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 20
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 800
                                });

                            } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 100
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 20
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 750
                                });

                            } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 700
                                });

                            } else {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 650
                                });

                            }
                        } else {
                            if (0 <= this.sumItem && this.sumItem <= 5) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 25
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 800
                                });

                            } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 25
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 750
                                });

                            } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 200
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 700
                                });

                            } else {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 250
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });

                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 650
                                });

                            }
                        }
                    } else if (this.Type === "PRINTING REAKTIF RESIST") {
                        if (0 <= this.sumItem && this.sumItem <= 5) {
                            this.data.ChemicalItems.push({
                                Name: "Urea",
                                Quantity: 100
                            });

                            this.data.ChemicalItems.push({
                                Name: "Soda Kue",
                                Quantity: 20
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Reaktif",
                                Quantity: 800
                            });

                            this.data.ChemicalItems.push({
                                Name: "Resist",
                                Quantity: 8
                            });

                        } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                            this.data.ChemicalItems.push({
                                Name: "Urea",
                                Quantity: 100
                            });

                            this.data.ChemicalItems.push({
                                Name: "Soda Kue",
                                Quantity: 20
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Reaktif",
                                Quantity: 750
                            });

                            this.data.ChemicalItems.push({
                                Name: "Resist",
                                Quantity: 8
                            });

                        } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                            this.data.ChemicalItems.push({
                                Name: "Urea",
                                Quantity: 150
                            });

                            this.data.ChemicalItems.push({
                                Name: "Soda Kue",
                                Quantity: 30
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Reaktif",
                                Quantity: 700
                            });

                            this.data.ChemicalItems.push({
                                Name: "Resist",
                                Quantity: 8
                            });

                        } else {
                            this.data.ChemicalItems.push({
                                Name: "Urea",
                                Quantity: 150
                            });

                            this.data.ChemicalItems.push({
                                Name: "Soda Kue",
                                Quantity: 30
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Reaktif",
                                Quantity: 650
                            });

                            this.data.ChemicalItems.push({
                                Name: "Resist",
                                Quantity: 8
                            });

                        }
                    } else {
                        if (0 <= this.sumItem && this.sumItem <= 5) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 100
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixer",
                                Quantity: 10
                            });

                            this.data.ChemicalItems.push({
                                Name: "Printogen",
                                Quantity: 15
                            });

                            this.data.ChemicalItems.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Pigment",
                                Quantity: 800
                            });

                        } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 100
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixer",
                                Quantity: 10
                            });

                            this.data.ChemicalItems.push({
                                Name: "Printogen",
                                Quantity: 15
                            });

                            this.data.ChemicalItems.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Pigment",
                                Quantity: 800
                            });

                        } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 150
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixer",
                                Quantity: 10
                            });

                            this.data.ChemicalItems.push({
                                Name: "Printogen",
                                Quantity: 15
                            });

                            this.data.ChemicalItems.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Pigment",
                                Quantity: 700
                            });

                        } else {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 200
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixer",
                                Quantity: 10
                            });

                            this.data.ChemicalItems.push({
                                Name: "Printogen",
                                Quantity: 15
                            });

                            this.data.ChemicalItems.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickener Pigment",
                                Quantity: 700
                            });

                        }
                    }
                    var sumQtyItem = this.data.ChemicalItems.reduce((a, b) => +a + +b.Quantity, 0);
                    var waterQty = 1000 - sumQtyItem - this.sumItem;

                    this.data.ChemicalItems.push({
                        Name: "Air",
                        Quantity: waterQty,
                    });

                    this.data.ChemicalItems.push({
                        Name: "Vicositas",
                        Quantity: vNum,
                        Vicositas: true
                    });
                } else {
                    this.showChemical = false;
                    this.data.ChemicalItems = [];
                }
            } else {
                this.showChemical = false;
                this.data.ChemicalItems = [];
            }
        }

    }

}