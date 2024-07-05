import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirteen',
  templateUrl: './home-uk-thirteen.component.html',
  styleUrl: './home-uk-thirteen.component.scss',
})
export class HomeUkThirteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ризик зміни валютного курсу на ринку',
    });
  }
}
