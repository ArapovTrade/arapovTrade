import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-nine',
  templateUrl: './home-uk-thirty-nine.component.html',
  styleUrl: './home-uk-thirty-nine.component.scss',
})
export class HomeUkThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Співвідношення прибутку та збитку - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як рахувати мані менеджмент для угоди в трейдингу?',
    });
  }
}
