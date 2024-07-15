import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirteen',
  templateUrl: './home-uk-thirteen.component.html',
  styleUrl: './home-uk-thirteen.component.scss',
})
export class HomeUkThirteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Ризик зміни курсу на ринку Форекс  - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ризик зміни валютного курсу на ринку',
    });
  }
}
