import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty-two',
  templateUrl: './home-ru-fourty-two.component.html',
  styleUrl: './home-ru-fourty-two.component.scss',
})
export class HomeRuFourtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основные таймфреймы в трейдинге - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое таймфрейм в трейдинге?',
    });
  }
}
