import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-twenty-four',
  templateUrl: './home-ru-blog-twenty-four.component.html',
  styleUrl: './home-ru-blog-twenty-four.component.scss',
})
export class HomeRuBlogTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Фигура "Флаг" в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фигура "Флаг" в трейдинге как применять?',
    });
  }
}
