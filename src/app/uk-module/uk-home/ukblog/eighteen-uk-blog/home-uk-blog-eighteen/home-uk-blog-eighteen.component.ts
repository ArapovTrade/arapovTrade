import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-eighteen',
  templateUrl: './home-uk-blog-eighteen.component.html',
  styleUrl: './home-uk-blog-eighteen.component.scss',
})
export class HomeUkBlogEighteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Об`ємний аналіз ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Грааль трейдингу - Об`ємний аналіз ринку',
    });
  }
}
