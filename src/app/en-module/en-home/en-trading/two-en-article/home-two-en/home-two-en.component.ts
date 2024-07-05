import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-two-en',
  templateUrl: './home-two-en.component.html',
  styleUrl: './home-two-en.component.scss',
})
export class HomeTwoEnComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Market Fundamentals. A brief dictionary of trader terms',
    });
  }
}
