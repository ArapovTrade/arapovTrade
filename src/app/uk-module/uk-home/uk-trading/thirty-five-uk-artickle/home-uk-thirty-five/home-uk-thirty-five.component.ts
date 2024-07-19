import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-five',
  templateUrl: './home-uk-thirty-five.component.html',
  styleUrl: './home-uk-thirty-five.component.scss',
})
export class HomeUkThirtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торгова система - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Торгова система трейдера, навіщо потрібна?',
    });
  }
}
