import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-five',
  templateUrl: './home-en-fourty-five.component.html',
  styleUrl: './home-en-fourty-five.component.scss',
})
export class HomeEnFourtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Types of Timeframes - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The main types of timeframes in trading.',
    });
  }
}
