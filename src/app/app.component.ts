import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private renderer: Renderer2;

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngOnInit(): void {
    this.titleService.setTitle('Трейдинг');
    this.setCanonicalURL('https://arapov.trade/uk/home');
  }
  setCanonicalURL(url: string) {
    const canURL = url === undefined ? window.location.href : url;
    // this.meta.updateTag({ rel: 'canonical', href: canURL });
    const link: HTMLLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url); // Ошибка возникает здесь, если url может быть undefined
    const head = this.document.getElementsByTagName('head')[0];
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      this.renderer.removeChild(head, existingLink);
    }
    this.renderer.appendChild(head, link);
  }
  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');

    // Замена языка в пути
    if (
      pathSegments[1] === 'uk' ||
      pathSegments[1] === 'en' ||
      pathSegments[1] === 'ru'
    ) {
      pathSegments[1] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    // Построение нового пути
    const newPath = pathSegments.join('/');

    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
    });
  }
}
