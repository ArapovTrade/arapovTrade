import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-three',
  templateUrl: './home-en-fourty-three.component.html',
  styleUrl: './home-en-fourty-three.component.scss',
})
export class HomeEnFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'How to Choose a Timeframe for Trading on the Stock Exchange - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'How to choose a working timeframe for trading on the stock exchange?',
    });
  }
}
