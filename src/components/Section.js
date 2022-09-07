export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach(items => {
      this._renderer(items);
    });
  }
  addItem(data) {
    this._container.prepend(data);
  }
}
