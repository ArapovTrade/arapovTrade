import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-six',
  templateUrl: './home-ru-blog-fifty-six.component.html',
  styleUrl: './home-ru-blog-fifty-six.component.scss',
})
export class HomeRuBlogFiftySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Книги по трейдингу в чем польза для начинающих ? - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Книги по трейдингу в чем польза для начинающих ?',
    });
  }
}
