import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-three',
  templateUrl: './home-uk-twenty-three.component.html',
  styleUrl: './home-uk-twenty-three.component.scss',
})
export class HomeUkTwentyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Світові фондові індекси - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Фондовий ринок, основні індекси',
    });
  }
}
