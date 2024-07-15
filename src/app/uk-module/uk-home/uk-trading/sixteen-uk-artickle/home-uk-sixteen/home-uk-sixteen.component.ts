import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-sixteen',
  templateUrl: './home-uk-sixteen.component.html',
  styleUrl: './home-uk-sixteen.component.scss',
})
export class HomeUkSixteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Поведінкові ризики - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Психологія трейдингу. Поведінкові ризики',
    });
  }
}
