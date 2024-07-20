import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-seven',
  templateUrl: './home-ru-twenty-seven.component.html',
  styleUrl: './home-ru-twenty-seven.component.scss',
})
export class HomeRuTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Технический анализ рынка. Основные виды графиков - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные виды отображения графиков в трейдинге',
    });
  }
}
