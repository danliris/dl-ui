import { inject } from 'aurelia-framework';

@inject(Element)
export class UnitExpenditureNoteItemHeader {

  constructor(element) {
    this.element = element;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.items = context.items;
    this.options = context.options;
    this.readOnly = this.options.readOnly;
  }

  dispatchAdd(e) {
    let event;
    var eventName = "add";
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, {
        detail: e,
        bubbles: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, {
        detail: e
      });
    }
    this.element = this.element || null;
    if (this.element && this.element.dispatchEvent) this.element.dispatchEvent(event);
    else window.dispatchEvent(event);
  }
}