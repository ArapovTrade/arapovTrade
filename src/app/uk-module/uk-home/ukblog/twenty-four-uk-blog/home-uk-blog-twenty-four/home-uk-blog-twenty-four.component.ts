import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-twenty-four',
  templateUrl: './home-uk-blog-twenty-four.component.html',
  styleUrl: './home-uk-blog-twenty-four.component.scss',
})
export class HomeUkBlogTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фігура "Прапор" у трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фігура "Прапор" у трейдингу як застосовувати?',
    });
  }
}
