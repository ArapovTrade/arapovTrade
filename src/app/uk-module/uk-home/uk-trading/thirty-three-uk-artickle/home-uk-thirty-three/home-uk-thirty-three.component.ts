import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-three',
  templateUrl: './home-uk-thirty-three.component.html',
  styleUrl: './home-uk-thirty-three.component.scss',
})
export class HomeUkThirtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Реквоти - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Реквоти у трейдингу',
    });
  }
}
