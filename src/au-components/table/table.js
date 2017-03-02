import { inject, bindable, customElement, children, child } from "aurelia-framework";
import { BindingEngine } from 'aurelia-binding';
@customElement("au-table")
@inject(BindingEngine)
export class Table {
  @bindable items;

  @children("table tbody tr") t;

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }
  tChanged(a, b) {
    console.log(a);
  }

  bind() {
    // console.log("au-table:bind");
    // console.log(this.items);
    this.subscribeCollectionObserver();
  }

  itemsChanged(newValue, oldValue) {
    console.log("itemsChanged");
    this.subscribeCollectionObserver();
  }

  subscribeCollectionObserver() {
    let subscription = this.bindingEngine.collectionObserver(this.items)
      .subscribe(splices => {
        this.buildContextMenu();
      });
  }

  buildContextMenu() {
    let tbody = this.table.getElementsByTagName("tbody")[0];
    if (tbody && tbody.hasChildNodes()) {
      let trs = tbody.children;
      for (var tr of trs) {
        var tds = tr.children;
        if (tds.length > 0) {
          let lastTd = tds[tds.length - 1];
          var menu = document.createElement("div");
          menu.innerHTML = "menu";
          lastTd.appendChild(menu)
          console.log(lastTd);
        }
      }
    }
  }
  attached() {
    console.log(this.t);
  }
  tr() {
    console.log(this.t);
  }
}

