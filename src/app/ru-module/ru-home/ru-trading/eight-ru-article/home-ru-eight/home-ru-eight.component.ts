import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-eight',
  templateUrl: './home-ru-eight.component.html',
  styleUrl: './home-ru-eight.component.scss',
})
export class HomeRuEightComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Валюты и их котировки. Основные определения.',
    });
  }
}
