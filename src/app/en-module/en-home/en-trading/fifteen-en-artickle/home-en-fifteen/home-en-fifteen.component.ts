import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fifteen',
  templateUrl: './home-en-fifteen.component.html',
  styleUrl: './home-en-fifteen.component.scss',
})
export class HomeEnFifteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Major central banks - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Major Forex Central Banks',
    });
  }
}
