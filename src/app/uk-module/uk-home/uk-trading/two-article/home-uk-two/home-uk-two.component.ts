import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-two',
  templateUrl: './home-uk-two.component.html',
  styleUrl: './home-uk-two.component.scss',
})
export class HomeUkTwoComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основи ринку. Короткий словник термінів трейдера',
    });
  }
}
