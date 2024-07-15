import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-two',
  templateUrl: './home-ru-two.component.html',
  styleUrl: './home-ru-two.component.scss',
})
export class HomeRuTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основы рынка. Словарь терминов - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основы рынка. Краткий словарь терминов трейдера',
    });
  }
}
