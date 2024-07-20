import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-two',
  templateUrl: './home-en-fourty-two.component.html',
  styleUrl: './home-en-fourty-two.component.scss',
})
export class HomeEnFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Basic timeframes in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is a timeframe in trading?',
    });
  }
}
