export default class App {
  constructor(root, pages) {
    this.pages = pages;
    this.root = root;
  }

  clearPage() {
    this.root.innerHTML = '';
  }

  loadPage(pageName) {
    this.clearPage();
    this.root.append(this.pages[pageName]);
  }
}
