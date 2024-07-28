import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fiveteen',
  templateUrl: './home-uk-blog-fiveteen.component.html',
  styleUrl: './home-uk-blog-fiveteen.component.scss',
})
export class HomeUkBlogFiveteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      "Вся правда про торгівлю ф'ючерсами - Arapov.trade"
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Вся правда про торгівлю ф'ючерсами",
    });
  }
}
