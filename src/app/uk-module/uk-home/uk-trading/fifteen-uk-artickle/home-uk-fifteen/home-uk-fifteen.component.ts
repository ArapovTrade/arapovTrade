import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fifteen',
  templateUrl: './home-uk-fifteen.component.html',
  styleUrl: './home-uk-fifteen.component.scss',
})
export class HomeUkFifteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні центральні банки ринку Форекс',
    });
  }
}
