import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twelve',
  templateUrl: './home-en-twelve.component.html',
  styleUrl: './home-en-twelve.component.scss',
})
export class HomeEnTwelveComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to make money on the Forex market?',
    });
  }
}
