import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-four',
  templateUrl: './home-uk-four.component.html',
  styleUrl: './home-uk-four.component.scss',
})
export class HomeUkFourComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Біржовий та позабіржовий ринок. Що це і в чому відмінність?',
    });
  }
}
