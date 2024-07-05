import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-seven',
  templateUrl: './home-ru-seven.component.html',
  styleUrl: './home-ru-seven.component.scss',
})
export class HomeRuSevenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое рынок Форекс? Зачем нужен?',
    });
  }
}
