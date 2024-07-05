import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-en-home',
  templateUrl: './en-home.component.html',
  styleUrl: './en-home.component.scss',
})
export class EnHomeComponent {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      "Trading courses Author's online trading training | Igor Arapov"
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Author's ⏩ trading courses from Igor Arapov. ⭐ Training in trading from scratch from ArapovTrade.",
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'trading courses, trading, exchange, finance, stocks, currencies, trading training, courses, free trading training',
    });
  }
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
