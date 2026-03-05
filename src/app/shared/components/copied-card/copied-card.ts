import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-copied-card',
  imports: [],
  templateUrl: './copied-card.html',
  styleUrl: './copied-card.css',
})
export class CopiedCard {
  @Input() text: string = '';

  @Output() onRemove = new EventEmitter<string>();

  protected copyText(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.text).then(() => {
        console.log('Text copied to clipboard');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    } else {
      console.warn('Clipboard API not supported');
    }
  }

  protected deleteText(): void {
    this.onRemove.emit(this.text);
  }
}
