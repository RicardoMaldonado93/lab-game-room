import { Directive, HostListener, Input } from '@angular/core';

@Directive({ selector: '[allowedRegExp]' })
export class AllowedRegExpDirective {
  @Input() allowedRegExp!: string;

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    // case: selected text (by mouse) - replace it
    let s = event.target.selectionStart;
    let e = event.target.selectionEnd;
    let k = event.target.value + event.key;

    if (s != e) {
      k = event.target.value;
      k = k.slice(0, s) + event.key + k.slice(e, k.length);
    }

    // case: special characters (ignore)
    if (
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArroDown',
        'Backspace',
        'Tab',
        'Alt',
        'Shift',
        'Control',
        'Enter',
        'Delete',
        'Meta',
      ].includes(event.key)
    )
      return;

    // case: normal situation - chceck regexp
    let re = new RegExp(this.allowedRegExp);

    if (!re.test(k)) event.preventDefault();
  }
}
