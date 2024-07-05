import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-four-en',
  templateUrl: './home-four-en.component.html',
  styleUrl: './home-four-en.component.scss',
})
export class HomeFourEnComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Exchange and over-the-counter market. What is it and what is the difference?',
    });
  }
}
