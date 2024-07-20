import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-four',
  templateUrl: './home-en-fourty-four.component.html',
  styleUrl: './home-en-fourty-four.component.scss',
})
export class HomeEnFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'What Timeframe is Best for a Beginner to Trade On - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What time period is best for a novice trader to trade?',
    });
  }
}
