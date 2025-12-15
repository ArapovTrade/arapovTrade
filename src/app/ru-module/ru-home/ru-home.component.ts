import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../servises/themeserv.service';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-ru-home',
  templateUrl: './ru-home.component.html',
  styleUrl: './ru-home.component.scss',
})
export class RuHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,

    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: false,
          offset: 100,
        });
      }
    }, 500); // Задержка 0.5s
  }
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;

  registForm: any;

  ngOnInit(): void {
    this.lang.setNumber(2);
    this.removeExistingWebPageSchema();
    this.addPersoneSchema();
    this.addProfilePageSchema();
    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
    this.titleService.setTitle(
      'Обучение трейдингу с нуля бесплатно | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Обучение трейдингу с нуля бесплатно от Игоря Арапова — онлайн-курсы трейдинга, технический и фундаментальный анализ, торговля криптовалютами и валютными парами шаг за шагом.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'обучение трейдингу, курсы трейдинга, трейдинг онлайн, трейдинг с нуля, криптовалюты, валютные пары',
    });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
  }

  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);

    this.refreshAOS();
  }
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
  }

  onSubmit(registForm: FormGroup) {
    if (
      registForm.value.userName &&
      registForm.value.userEmail &&
      registForm.value.userMessage
    ) {
      const templateParams = {
        userName: registForm.value.userName,
        userEmail: registForm.value.userEmail,
        userMessage: registForm.value.userMessage,
      };

      emailjs
        .send(
          'service_qomgf4f',
          'template_jif62uq',
          templateParams,
          'zvCuOnVqiMJMycGQ0'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
            this.registForm.reset(); // Сброс формы после успешной отправки
          },
          (error) => {
            console.error(error.text);
          }
        );
    }
  }
  close() {
    this.registForm.reset();

    this.flag = true;
    this.flagTrue = false;
  }

  //
  scrollToRegistrationRu() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'Person') {
          script.remove();
        }
        if (content['@type'] === 'ProfilePage') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  private addPersoneSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'Person' && json['name'] === 'Игорь Арапов';
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      givenName: 'Игорь',
      familyName: 'Арапов',
      jobTitle: 'Профессиональный трейдер',
      description:
        'Трейдер с 2013 года, автор бесплатного курса обучения трейдингу. Специализация: Smart Money Concepts, метод Вайкоффа, объёмный анализ.',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
      },
      alumniOf: {
        '@type': 'Organization',
        name: 'Chess Federation',
        description: 'Кандидат в мастера спорта по шахматам',
      },
      knowsAbout: [
        'Smart Money Concepts',
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Cryptocurrency Trading',
        'Risk Management',
        'Trading Psychology',
        'Market Structure',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Professional Trader',
          credentialCategory: 'Experience',
          dateCreated: '2013',
        },
      ],
      sameAs: [
        'https://t.me/ArapovTrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://www.facebook.com/igor.arapov.75',
        'https://www.linkedin.com/in/arapovtrade',
        'https://rutube.ru/channel/41668647',
        'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
        'https://www.mql5.com/ru/signals/2246716?source=External',
      ],
      url: 'https://arapov.trade/ru',
      mainEntityOfPage: 'https://arapov.trade/ru',
    });

    this.document.head.appendChild(script);
  }

  private addProfilePageSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]')
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'ProfilePage' &&
          json['name'] === 'Про автора - Арапов Игорь'
        );
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://arapov.trade/ru/#page',
      url: 'https://arapov.trade/ru/',
      name: 'Про автора - Арапов Игорь',
      inLanguage: 'ru-RU',
      mainEntity: {
        '@id': 'https://arapov.trade/ru#person',
      },
      isPartOf: {
        '@id': 'https://arapov.trade/ru/main/#website',
      },
      dateCreated: '2020-01-01',
      dateModified: '2025-12-15',
    });

    this.document.head.appendChild(script);
  }
}
