import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-one',
  templateUrl: './home-uk-blog-one.component.html',
  styleUrl: './home-uk-blog-one.component.scss',
})
export class HomeUkBlogOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фази ринку у трейдингу  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фази ринку в трейдингу, які вони бувають?',
    });
  }
}
