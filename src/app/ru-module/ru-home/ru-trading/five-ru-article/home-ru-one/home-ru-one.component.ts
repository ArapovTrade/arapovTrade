import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-one',
  templateUrl: './home-ru-one.component.html',
  styleUrl: './home-ru-one.component.scss',
})
export class HomeRuOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Деривативы и их виды - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое фьючерсы. Деривативы и их виды',
    });
  }
}
