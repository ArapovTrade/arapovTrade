import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-three',
  templateUrl: './home-ru-blog-fourty-three.component.html',
  styleUrl: './home-ru-blog-fourty-three.component.scss',
})
export class HomeRuBlogFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Смарт Мани - стратегия по которой торгуют Банки - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Смарт Мани - стратегия по которой  торгуют Банки! Обучение трейдингу',
    });
  }
}
