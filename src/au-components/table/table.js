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
<<<<<<< HEAD
  tChanged(a, b) {
    console.log(a);
=======
  @computedFrom("context")
  get __context() {
    if (this.context && this.context.constructor === Array) {
      return this.context;
    }
    else
      return null;
  }

  @computedFrom("__context")
  get __hasContext() {
    var result = this.__context && this.__context.reduce((prev, curr, index) => {
      return prev || this.__contextShow(index, curr)
    }, false)
    return result;
  }

  __contextShow(contextIndex, contextName) {
    if (this.__contextRowData) {
      var arg = { index: contextIndex, context: contextName, data: this.__contextRowData };
      return this.contextShow(arg);
    }
    else
      return true;
  }


  attached() {
    this.contextShow = this.contextShow ? this.contextShow : () => true;
    this.__init();
>>>>>>> refs/remotes/danliris/dev
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
