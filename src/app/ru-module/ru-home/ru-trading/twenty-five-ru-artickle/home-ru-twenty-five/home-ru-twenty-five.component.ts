import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-five',
  templateUrl: './home-ru-twenty-five.component.html',
  styleUrl: './home-ru-twenty-five.component.scss',
})
export class HomeRuTwentyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основные показатели экономического роста - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные показатели экономического роста',
    });
  }
}
