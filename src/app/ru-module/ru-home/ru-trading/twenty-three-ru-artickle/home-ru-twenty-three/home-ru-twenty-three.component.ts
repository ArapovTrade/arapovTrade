import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-three',
  templateUrl: './home-ru-twenty-three.component.html',
  styleUrl: './home-ru-twenty-three.component.scss',
})
export class HomeRuTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Мировые фондовые индексы - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фондовый рынок , основные индексы',
    });
  }
}
