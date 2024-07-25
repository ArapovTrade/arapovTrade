import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-five',
  templateUrl: './home-ru-blog-five.component.html',
  styleUrl: './home-ru-blog-five.component.scss',
})
export class HomeRuBlogFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ценообразование и Ликвидность - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ценообразование и Ликвидность | Что это и как использовать?',
    });
  }
}
