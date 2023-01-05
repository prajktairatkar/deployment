import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SrcollService {
  constructor() {}
  scrollToElementById(id: any) {
    const element = this.__getElementById(id);
    this.scrollToElement(element);
  }

  private __getElementById(id: any): HTMLElement {
    console.log('element id : ', id);
    // const element = <HTMLElement>document.querySelector(`#${id}`);
    const element = document.getElementById(id)!;
    return element;
  }

  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
