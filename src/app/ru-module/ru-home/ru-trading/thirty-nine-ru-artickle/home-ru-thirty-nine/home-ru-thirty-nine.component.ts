import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-nine',
  templateUrl: './home-ru-thirty-nine.component.html',
  styleUrl: './home-ru-thirty-nine.component.scss',
})
export class HomeRuThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Соотношение прибыли и убытка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как считать мани менеджмент для сделки в трейдинге?',
    });
  }
}
