import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-nine',
  templateUrl: './home-uk-blog-fourty-nine.component.html',
  styleUrl: './home-uk-blog-fourty-nine.component.scss',
})
export class HomeUkBlogFourtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як обрати торгову платформу для трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як обрати торгову платформу для трейдингу',
    });
  }
}
