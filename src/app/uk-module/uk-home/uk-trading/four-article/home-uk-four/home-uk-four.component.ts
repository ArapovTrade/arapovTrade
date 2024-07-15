import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-four',
  templateUrl: './home-uk-four.component.html',
  styleUrl: './home-uk-four.component.scss',
})
export class HomeUkFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Біржовий та позабіржовий ринки - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Біржовий та позабіржовий ринок. Що це і в чому відмінність?',
    });
  }
}
