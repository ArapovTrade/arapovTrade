import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty-three',
  templateUrl: './home-ru-fourty-three.component.html',
  styleUrl: './home-ru-fourty-three.component.scss',
})
export class HomeRuFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как выбрать таймфрейм для торговли на бирже - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как выбрать рабочий таймфрейм для работы на бирже?',
    });
  }
}
