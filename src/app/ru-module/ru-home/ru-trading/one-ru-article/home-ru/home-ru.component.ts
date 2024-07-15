import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru',
  templateUrl: './home-ru.component.html',
  styleUrl: './home-ru.component.scss',
})
export class HomeRuComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Советы начинающим трейдерам - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: '10 советов начинающим трейдерам от Игоря Арапова ',
    });
  }
}
