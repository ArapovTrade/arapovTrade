import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-one',
  templateUrl: './home-ru-thirty-one.component.html',
  styleUrl: './home-ru-thirty-one.component.scss',
})
export class HomeRuThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Рыночный ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Рыночные ордера что это и как использовать?',
    });
  }
}
