import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-four',
  templateUrl: './home-uk-thirty-four.component.html',
  styleUrl: './home-uk-thirty-four.component.scss',
})
export class HomeUkThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стоп-лімітний ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Лімітний ордер, що це і як використовувати?',
    });
  }
}
