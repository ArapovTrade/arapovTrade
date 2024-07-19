import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-five',
  templateUrl: './home-uk-twenty-five.component.html',
  styleUrl: './home-uk-twenty-five.component.scss',
})
export class HomeUkTwentyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основні показники економічного зростання - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні показники економічного зростання',
    });
  }
}
