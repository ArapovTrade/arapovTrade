import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-seven',
  templateUrl: './home-uk-seven.component.html',
  styleUrl: './home-uk-seven.component.scss',
})
export class HomeUkSevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ринок Forex  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Що таке ринок Форекс? Навіщо потрібен?',
    });
  }
}
