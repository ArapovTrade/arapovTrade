import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-eight',
  templateUrl: './home-uk-eight.component.html',
  styleUrl: './home-uk-eight.component.scss',
})
export class HomeUkEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Валюти та їх котирування  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Валюти та їх котирування. Основні визначення.',
    });
  }
}
