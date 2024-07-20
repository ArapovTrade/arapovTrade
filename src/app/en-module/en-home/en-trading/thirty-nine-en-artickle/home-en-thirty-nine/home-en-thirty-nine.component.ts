import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirty-nine',
  templateUrl: './home-en-thirty-nine.component.html',
  styleUrl: './home-en-thirty-nine.component.scss',
})
export class HomeEnThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Profit and Loss Ratio - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'How to calculate money management for a trading transaction?',
    });
  }
}
