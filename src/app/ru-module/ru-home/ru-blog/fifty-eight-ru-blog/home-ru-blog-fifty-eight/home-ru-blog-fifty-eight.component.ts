import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fifty-eight',
  templateUrl: './home-ru-blog-fifty-eight.component.html',
  styleUrl: './home-ru-blog-fifty-eight.component.scss',
})
export class HomeRuBlogFiftyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Усреднение в трейдинге - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Усреднение в трейдинге что это и как использовать?',
    });
  }
}
