import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-five',
  templateUrl: './home-en-thirty-five.component.html',
  styleUrl: './home-en-thirty-five.component.scss',
})
export class HomeEnThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trading System - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Trader trading system, why is it needed?',
    });
  }
}
