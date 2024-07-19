import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-nine',
  templateUrl: './home-uk-twenty-nine.component.html',
  styleUrl: './home-uk-twenty-nine.component.scss',
})
export class HomeUkTwentyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle("Об'ємний аналіз ринку - Arapov.trade");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: "Об'ємний аналіз ринку.  Трейдинг",
    });
  }
}
