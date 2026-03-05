import { Component, signal, OnInit } from '@angular/core';
import { Button } from "./shared/components/button/button";
import { CopiedCard } from "./shared/components/copied-card/copied-card";

declare global {
  interface Window {
    api: any;
  }
}

@Component({
  selector: 'app-root',
  imports: [Button, CopiedCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('clipboard-app');

  protected clipboardTextArray = signal<string[]>([]);

  public ngOnInit(): void {
    if (window.api) {
      window.api.onClipboardUpdate((text: string) => {
        if (text && text.trim() !== '') {
          if (this.clipboardTextArray().filter(item => item === text).length > 0) {
            this.clipboardTextArray.update(arr => {
              const filtered = arr.filter(item => item !== text);
              return [text, ...filtered];
            });
          } else {
            if (this.clipboardTextArray().length >= 20) {
              this.clipboardTextArray.update(arr => arr.slice(0, 19));
            }
            this.clipboardTextArray.update(arr => [text, ...arr]);
          }
        }
      });
    }
  }

  protected removeAllItems(): void {
    this.clipboardTextArray.set([]);
  }

  protected removeItem(text: string): void {
    this.clipboardTextArray.update(arr => arr.filter(item => item !== text));
  }
}
