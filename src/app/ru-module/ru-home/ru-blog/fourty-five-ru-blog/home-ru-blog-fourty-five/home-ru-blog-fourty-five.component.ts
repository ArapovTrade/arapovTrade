import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-five',
  templateUrl: './home-ru-blog-fourty-five.component.html',
  styleUrl: './home-ru-blog-fourty-five.component.scss',
})
export class HomeRuBlogFourtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Как применять скользящие средние в Трейдинге? - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Как применять скользящие средние в Трейдинге?',
    });
  }
}
