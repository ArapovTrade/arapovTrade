import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-eight',
  templateUrl: './home-uk-blog-eight.component.html',
  styleUrl: './home-uk-blog-eight.component.scss',
})
export class HomeUkBlogEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Імбаланс у трейдингу- Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Імбаланс у трейдингу що це і як використовувати?',
    });
  }
}
