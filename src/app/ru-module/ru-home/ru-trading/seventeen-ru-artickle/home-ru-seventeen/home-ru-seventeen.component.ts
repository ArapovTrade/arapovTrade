import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-seventeen',
  templateUrl: './home-ru-seventeen.component.html',
  styleUrl: './home-ru-seventeen.component.scss',
})
export class HomeRuSeventeenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Нерыночные риски Форекс - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Какие бывают риски в трейдинге?',
    });
  }
}
