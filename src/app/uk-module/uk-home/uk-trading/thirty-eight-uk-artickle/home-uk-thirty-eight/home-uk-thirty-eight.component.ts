import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-eight',
  templateUrl: './home-uk-thirty-eight.component.html',
  styleUrl: './home-uk-thirty-eight.component.scss',
})
export class HomeUkThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Специфіка управління капіталом у трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Управління капіталом у трейдингу',
    });
  }
}
