import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropDown]' // making use of attribute selector using []
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // this toggles (closes) the dropdown upon clicking anywhere on the screen and not just on the dropdown as done above.
 /* @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}*/


}
