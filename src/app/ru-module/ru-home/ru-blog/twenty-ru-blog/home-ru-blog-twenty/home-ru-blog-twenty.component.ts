import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty',
  templateUrl: './home-ru-blog-twenty.component.html',
  styleUrl: './home-ru-blog-twenty.component.scss',
})
export class HomeRuBlogTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Лучшее время для трейдинга - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Когда лучшее время для трейдинга ?',
    });
  }
}
