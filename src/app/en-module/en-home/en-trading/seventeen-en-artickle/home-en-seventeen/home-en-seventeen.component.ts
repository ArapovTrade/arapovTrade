import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-seventeen',
  templateUrl: './home-en-seventeen.component.html',
  styleUrl: './home-en-seventeen.component.scss',
})
export class HomeEnSeventeenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What are the risks in trading?',
    });
  }
}
