import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-fourty-one',
  templateUrl: './home-ru-fourty-one.component.html',
  styleUrl: './home-ru-fourty-one.component.scss',
})
export class HomeRuFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торговый план трейдера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое торговый план трейдера?',
    });
  }
}
