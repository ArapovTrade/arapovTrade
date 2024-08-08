import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fourty-six',
  templateUrl: './home-ru-blog-fourty-six.component.html',
  styleUrl: './home-ru-blog-fourty-six.component.scss',
})
export class HomeRuBlogFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Обучение Трейдингу Бесплатно - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Обучение Трейдингу Бесплатно | Обучение Трейдингу с Нуля',
    });
  }
}
