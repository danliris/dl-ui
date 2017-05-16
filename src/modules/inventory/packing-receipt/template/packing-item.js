import { bindable } from 'aurelia-framework'

export class PackingItem {

  @bindable newQuantity;
  @bindable newNotes;

  activate(context) {
    this.data = context.data;
    // console.log(this.data);
    this.newQuantity = this.data.quantity;
    this.newNotes = this.data.notes;

    // this.items = this.data;
    this.error = context.error;
    console.log(this.error);
    this.options = context.options;
  }

  controlOptions = {
    control: {
      length: 12
    }
  }

  newQuantityChanged() {
    this.data.quantity = this.newQuantity;
    console.log(this.data);
  }

  newNotesChanged() {
    this.data.notes = this.newNotes;
    console.log(this.data);
  }

}