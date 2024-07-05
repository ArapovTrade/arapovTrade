import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-ten',
  templateUrl: './home-ru-ten.component.html',
  styleUrl: './home-ru-ten.component.scss',
})
export class HomeRuTenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Биржевая сделка. Понятия, виды и типы',
    });
  }
}
