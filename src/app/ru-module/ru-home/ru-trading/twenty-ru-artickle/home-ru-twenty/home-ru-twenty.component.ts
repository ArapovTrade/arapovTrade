import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty',
  templateUrl: './home-ru-twenty.component.html',
  styleUrl: './home-ru-twenty.component.scss',
})
export class HomeRuTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальный анализ рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фундаментальный анализ рынка. Трейдинг',
    });
  }
}
