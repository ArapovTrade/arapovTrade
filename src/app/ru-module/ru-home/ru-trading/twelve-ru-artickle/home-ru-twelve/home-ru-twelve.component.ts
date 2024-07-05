import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twelve',
  templateUrl: './home-ru-twelve.component.html',
  styleUrl: './home-ru-twelve.component.scss',
})
export class HomeRuTwelveComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как заработать на рынке Форекс?',
    });
  }
}
