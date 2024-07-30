import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty',
  templateUrl: './home-uk-blog-twenty.component.html',
  styleUrl: './home-uk-blog-twenty.component.scss',
})
export class HomeUkBlogTwentyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('​Найкращий час для тредингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Коли ​​найкращий час для тредингу?',
    });
  }
}
