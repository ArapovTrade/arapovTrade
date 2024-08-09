import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-nine',
  templateUrl: './home-ru-blog-fifty-nine.component.html',
  styleUrl: './home-ru-blog-fifty-nine.component.scss',
})
export class HomeRuBlogFiftyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как торговать Пробой уровня в трейдинге - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: ' Как торговать Пробой уровня в трейдинге',
    });
  }
}
