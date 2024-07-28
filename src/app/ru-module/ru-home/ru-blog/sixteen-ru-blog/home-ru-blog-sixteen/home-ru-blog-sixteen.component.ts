import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-sixteen',
  templateUrl: './home-ru-blog-sixteen.component.html',
  styleUrl: './home-ru-blog-sixteen.component.scss',
})
export class HomeRuBlogSixteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Трендовые каналы - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Трейдинг для начинающих от А до Я | Трендовые каналы',
    });
  }
}
