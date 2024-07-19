import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-four',
  templateUrl: './home-uk-twenty-four.component.html',
  styleUrl: './home-uk-twenty-four.component.scss',
})
export class HomeUkTwentyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Економічний стан держави - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Економіка Держави',
    });
  }
}
