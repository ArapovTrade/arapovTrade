import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home-uk-blog-thirty-one',
  templateUrl: './home-uk-blog-thirty-one.component.html',
  styleUrl: './home-uk-blog-thirty-one.component.scss',
})
export class HomeUkBlogThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Рівні Підтримки та Опору - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Рівні Підтримки та Опору ! Як визначити ! Навчання трейдингу',
    });
  }
}
