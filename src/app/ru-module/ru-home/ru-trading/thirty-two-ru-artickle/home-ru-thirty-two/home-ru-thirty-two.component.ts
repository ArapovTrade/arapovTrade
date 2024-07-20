import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-two',
  templateUrl: './home-ru-thirty-two.component.html',
  styleUrl: './home-ru-thirty-two.component.scss',
})
export class HomeRuThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стоп-ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Стоп ордера что это и как использовать?',
    });
  }
}
