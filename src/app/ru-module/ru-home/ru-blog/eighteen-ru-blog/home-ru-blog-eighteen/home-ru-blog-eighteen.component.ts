import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-eighteen',
  templateUrl: './home-ru-blog-eighteen.component.html',
  styleUrl: './home-ru-blog-eighteen.component.scss',
})
export class HomeRuBlogEighteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Объемный анализ рынка - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Грааль трейдинга - Объемный анализ рынка',
    });
  }
}
