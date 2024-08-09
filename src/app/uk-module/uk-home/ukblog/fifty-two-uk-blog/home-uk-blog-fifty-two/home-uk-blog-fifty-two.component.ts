import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-two',
  templateUrl: './home-uk-blog-fifty-two.component.html',
  styleUrl: './home-uk-blog-fifty-two.component.scss',
})
export class HomeUkBlogFiftyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Анатомія трендів на ринку - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Анатомія трендів на ринку | Об`ємний аналіз ринку',
    });
  }
}
