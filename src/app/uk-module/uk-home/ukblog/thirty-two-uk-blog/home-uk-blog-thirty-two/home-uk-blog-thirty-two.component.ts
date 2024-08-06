import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-thirty-two',
  templateUrl: './home-uk-blog-thirty-two.component.html',
  styleUrl: './home-uk-blog-thirty-two.component.scss',
})
export class HomeUkBlogThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Чи варто купувати навчання трейдингу? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Чи варто купувати навчання трейдингу?',
    });
  }
}
