import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-twelve',
  templateUrl: './home-en-twelve.component.html',
  styleUrl: './home-en-twelve.component.scss',
})
export class HomeEnTwelveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('How to make money on Forex - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to make money on the Forex market?',
    });
  }
}
