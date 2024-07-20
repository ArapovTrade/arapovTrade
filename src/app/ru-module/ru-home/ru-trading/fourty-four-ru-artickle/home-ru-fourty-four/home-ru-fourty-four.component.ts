import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty-four',
  templateUrl: './home-ru-fourty-four.component.html',
  styleUrl: './home-ru-fourty-four.component.scss',
})
export class HomeRuFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'На каком таймфрейме лучше торговать новичку - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'На каком временном периоде лучше торговать начинающему трейдеру?',
    });
  }
}
