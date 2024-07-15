import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-eighteen',
  templateUrl: './home-uk-eighteen.component.html',
  styleUrl: './home-uk-eighteen.component.scss',
})
export class HomeUkEighteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Психологічні ризики FOREX - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Психологія трейдингу',
    });
  }
}
