import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-blog-fourty-seven',
  templateUrl: './home-uk-blog-fourty-seven.component.html',
  styleUrl: './home-uk-blog-fourty-seven.component.scss',
})
export class HomeUkBlogFourtySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Фундаментальний аналіз ринку: принципи та методи оцінки активів'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з фундаментального аналізу фінансових ринків. Вивчіть макроекономічні показники, оцінку компаній та прогнозування трендів для інвестицій.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fundamentalanalysis.webp',
    });
    this.gerRandom();
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Швидкий старт', link: 'https://arapov.education/ua/course-ua/' },
    {
      title: 'Вступ до трейдингу',
      link: 'https://arapov.education/ua/reg-workshop-ua/',
    },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
    {
      title: 'Копiтрейдинг',
      link: 'https://arapovcopytrade.com/ua/invest-ua/',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

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
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsUkr.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/fundamentalanalysis',
          },
          headline:
            'Фундаментальний аналіз ринку: принципи та методи оцінки активів',
          description:
            'Повний посібник з фундаментального аналізу фінансових ринків. Вивчіть макроекономічні показники, оцінку компаній та прогнозування трендів для інвестицій.',
          image:
            'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2025-11-15T00:00:00+02:00',
          inLanguage: 'uk',
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/uk#person',
            name: 'Игорь Арапов',
            url: 'https://arapov.trade/uk',
            sameAs: [
              'https://www.youtube.com/@ArapovTrade',
              'https://www.mql5.com/ru/signals/2246716',
            ],
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Фундаментальный анализ рынка | Почему не работает для трейдеров',
            description:
              'Почему фундаментальный анализ рынка не работает для розничных трейдеров? Разбираем метод Вайкоффа и объясняем, как крупные игроки торгуют против новостей, используя инсайдерскую информацию и объёмный анализ.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/6o21L5mLTrA/maxresdefault.jpg',
              'https://img.youtube.com/vi/6o21L5mLTrA/hqdefault.jpg',
            ],
            uploadDate: '2025-11-15T00:00:00+02:00',
            duration: 'PT8M25S',
            contentUrl: 'https://www.youtube.com/watch?v=6o21L5mLTrA',
            embedUrl: 'https://www.youtube.com/embed/6o21L5mLTrA',
            inLanguage: 'ru',
            keywords:
              'фундаментальный анализ, метод Вайкоффа, крупные игроки, инсайдерская информация, трейдинг',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Почему мы не используем фундаментальный анализ в трейдинге',
                startOffset: 0,
                endOffset: 59,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=0',
              },
              {
                '@type': 'Clip',
                name: 'Цитата Ричарда Вайкоффа о крупных операторах рынка',
                startOffset: 59,
                endOffset: 161,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=59',
              },
              {
                '@type': 'Clip',
                name: 'Проницательность крупного капитала и инсайдерская информация',
                startOffset: 161,
                endOffset: 210,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=161',
              },
              {
                '@type': 'Clip',
                name: 'Крупные деньги торгуют будущую стоимость, а не текущую цену',
                startOffset: 210,
                endOffset: 505,
                url: 'https://www.youtube.com/watch?v=6o21L5mLTrA&t=210',
              },
            ],
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/uk#person',
      name: 'Игорь Арапов',
      url: 'https://arapov.trade/uk',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade',
      ],
      jobTitle: 'Профессиональный трейдер',
      description:
        'Активно торгую на финансовых рынках с 2013 года. Автор бесплатного курса по трейдингу.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке фундаментальний аналіз?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальний аналіз — це метод оцінки активів на основі вивчення економічних, фінансових та галузевих факторів. Його мета — визначити справедливу вартість активу та виявити недооцінені або переоцінені інструменти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які показники використовуються у фундаментальному аналізі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні показники включають: макроекономічні (ВВП, інфляція, процентні ставки), корпоративні (виручка, прибуток, P/E, P/B) та галузеві (динаміка попиту, конкурентне середовище, регуляторні зміни).',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим фундаментальний аналіз відрізняється від технічного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальний аналіз вивчає економічні фактори та справедливу вартість активу для довгострокових інвестицій. Технічний аналіз фокусується на графіках, патернах та обсягах для короткострокової торгівлі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для яких ринків застосовний фундаментальний аналіз?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальний аналіз застосовується на фондовому ринку, валютному ринку, сировинному ринку та криптовалютному ринку. Методи адаптуються під специфіку кожного ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які помилки допускають при фундаментальному аналізі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типові помилки: сліпа довіра фінансовим звітам, ігнорування макроекономічних факторів, відсутність диверсифікації, недооцінка впливу ринкових настроїв на короткострокову динаміку.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Як проводити фундаментальний аналіз',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть макроекономіку',
          text: 'Проаналізуйте ключові показники: ВВП, інфляцію, процентні ставки центробанків, рівень безробіття.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть галузь',
          text: 'Вивчіть динаміку попиту та пропозиції в галузі, конкурентне середовище, регуляторні зміни та технологічні тренди.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проаналізуйте компанію',
          text: 'Вивчіть фінансову звітність: виручку, чистий прибуток, боргове навантаження. Розрахуйте ключові коефіцієнти P/E, P/B, ROE.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Визначте справедливу вартість',
          text: 'Порівняйте ринкову ціну активу з розрахунковою справедливою вартістю. Недооцінені активи представляють інвестиційні можливості.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Врахуйте ризики',
          text: 'Оцініть геополітичні, валютні та галузеві ризики. Диверсифікуйте портфель для зниження потенційних втрат.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Терміни фундаментального аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки активів на основі економічних, фінансових та галузевих факторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Справедлива вартість',
          description:
            'Розрахункова внутрішня вартість активу на основі фундаментальних показників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/E',
          description:
            'Коефіцієнт ціна/прибуток, що показує скільки інвестори платять за одиницю прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'P/B',
          description:
            'Коефіцієнт ціна/балансова вартість, що порівнює ринкову та бухгалтерську вартість',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовий внутрішній продукт, що вимірює загальний обсяг виробництва економіки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інфляція',
          description:
            'Зростання загального рівня цін, що знижує купівельну спроможність валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентна ставка',
          description:
            'Ставка центрального банку, що впливає на вартість запозичень в економіці',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивідендна дохідність',
          description: 'Відношення річних дивідендів до ринкової ціни акції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ROE',
          description:
            'Рентабельність власного капіталу, що вимірює ефективність використання капіталу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Боргове навантаження',
          description:
            'Співвідношення позикових коштів до власного капіталу компанії',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
