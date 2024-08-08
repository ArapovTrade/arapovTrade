import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-four',
  templateUrl: './home-uk-blog-fourty-four.component.html',
  styleUrl: './home-uk-blog-fourty-four.component.scss',
})
export class HomeUkBlogFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основи трейдингу для початківців - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основи трейдингу для початківців: що таке трейдинг?',
    });
  }
}
