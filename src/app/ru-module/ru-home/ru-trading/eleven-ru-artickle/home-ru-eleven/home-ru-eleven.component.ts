import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-eleven',
  templateUrl: './home-ru-eleven.component.html',
  styleUrl: './home-ru-eleven.component.scss',
})
export class HomeRuElevenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Что такое СВОП на рынке Форекс?',
    });
  }
}
