import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-nine',
  templateUrl: './home-ru-twenty-nine.component.html',
  styleUrl: './home-ru-twenty-nine.component.scss',
})
export class HomeRuTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Объемный анализ рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Объёмный анализ рынка.  Трейдинг ',
    });
  }
}
