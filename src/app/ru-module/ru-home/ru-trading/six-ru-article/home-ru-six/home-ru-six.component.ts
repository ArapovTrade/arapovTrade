import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-six',
  templateUrl: './home-ru-six.component.html',
  styleUrl: './home-ru-six.component.scss',
})
export class HomeRuSixComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основные участники биржи. Классификация и функционал',
    });
  }
}
