import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-nine',
  templateUrl: './home-uk-nine.component.html',
  styleUrl: './home-uk-nine.component.scss',
})
export class HomeUkNineComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Формування курсу валют на ринку Форекс',
    });
  }
}
