import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourteen',
  templateUrl: './home-ru-fourteen.component.html',
  styleUrl: './home-ru-fourteen.component.scss',
})
export class HomeRuFourteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Риск кредитного плеча на FOREX - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое кредитное плечо в трейдинге? Основные риски',
    });
  }
}
