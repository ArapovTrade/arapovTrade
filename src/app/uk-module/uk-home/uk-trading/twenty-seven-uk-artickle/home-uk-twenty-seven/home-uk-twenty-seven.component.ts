import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-seven',
  templateUrl: './home-uk-twenty-seven.component.html',
  styleUrl: './home-uk-twenty-seven.component.scss',
})
export class HomeUkTwentySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Технічний аналіз ринку. Основні види графіків - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні види відображення графіків у трейдингу',
    });
  }
}
