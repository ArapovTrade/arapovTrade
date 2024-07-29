import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-seventeen',
  templateUrl: './home-ru-blog-seventeen.component.html',
  styleUrl: './home-ru-blog-seventeen.component.scss',
})
export class HomeRuBlogSeventeenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Топ мифов о Трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Топ мифов о Трейдинге и ошибки начинающих',
    });
  }
}
