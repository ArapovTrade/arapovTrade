import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-six',
  templateUrl: './home-uk-blog-fourty-six.component.html',
  styleUrl: './home-uk-blog-fourty-six.component.scss',
})
export class HomeUkBlogFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Навчання Трейдингу Безкоштовно - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Навчання Трейдингу Безкоштовно | Навчання Трейдінгу з Нуля',
    });
  }
}
