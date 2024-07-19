import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty',
  templateUrl: './home-uk-twenty.component.html',
  styleUrl: './home-uk-twenty.component.scss',
})
export class HomeUkTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фундаментальний аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фундаментальний аналіз ринку. Трейдинг',
    });
  }
}
