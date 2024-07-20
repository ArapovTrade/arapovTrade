import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-four',
  templateUrl: './home-ru-thirty-four.component.html',
  styleUrl: './home-ru-thirty-four.component.scss',
})
export class HomeRuThirtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стоп-лимитный ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Лиммитный ордер что это и как использовать?',
    });
  }
}
