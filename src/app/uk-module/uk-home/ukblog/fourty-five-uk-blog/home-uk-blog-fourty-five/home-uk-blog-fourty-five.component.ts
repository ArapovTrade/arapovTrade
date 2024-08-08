import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-five',
  templateUrl: './home-uk-blog-fourty-five.component.html',
  styleUrl: './home-uk-blog-fourty-five.component.scss',
})
export class HomeUkBlogFourtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Як застосовувати ковзні середні у Трейдингу? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як застосовувати ковзні середні у Трейдингу?',
    });
  }
}
