import {
  Inject,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const DEFAULT_LANG_PROVIDER_NAME = 'DEFAULT_LANG';

const FEATURE_TRANSLATE_PROVIDER_NAME = 'FEATURE_NAME_TRANSLATE';

export class HttpLoaderFeatureLoader implements TranslateLoader {
  constructor(
    private httpClient: HttpClient,
    private featureName: string,
    private platform: object
  ) {}

  getTranslation(lang: string): Observable<any> {
    const urlTranslation: string = !this.featureName
      ? `./assets/i18n/${lang}.json`
      : `./assets/i18n/${this.featureName}/${lang}.json`;

    return this.httpClient.get(urlTranslation).pipe(
      map((response) => {
        if (this.featureName) {
          const featureNameResolved: string = this.featureName.replace('/\-/gi','_').toUpperCase();
          return { [featureNameResolved]: response };
        } else {
          return { ...response };
        }
      })
    );
  }
}

export function HttpLoaderFactory(
  http: HttpClient,
  featureName: string,
  platform: object
): HttpLoaderFeatureLoader {
  return new HttpLoaderFeatureLoader(http, featureName, platform);
}

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule],
})
export class I18nModule {

  constructor(
    private translateService: TranslateService,
    @Inject(FEATURE_TRANSLATE_PROVIDER_NAME)
    private featureName: string,
    @Inject(DEFAULT_LANG_PROVIDER_NAME)
    private defaultLang: string
  ) {
    if (this.featureName) {
      const currentLang = this.translateService.currentLang;
      this.translateService.currentLang = '';
      this.translateService.use(currentLang);
    } else if (this.defaultLang) {
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
  }

  static forRoot(lang: string): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        {
          provide: FEATURE_TRANSLATE_PROVIDER_NAME,
          useValue: null,
        },
        {
          provide: DEFAULT_LANG_PROVIDER_NAME,
          useValue: lang,
        },
        ...TranslateModule.forRoot({
          extend: true,
          isolate: false,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient, FEATURE_TRANSLATE_PROVIDER_NAME, PLATFORM_ID],
          },
        }).providers,
      ],
    };
  }

  static forFeature(featureName: string): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        {
          provide: FEATURE_TRANSLATE_PROVIDER_NAME,
          useValue: featureName,
        },
        ...TranslateModule.forChild({
          extend: true,
          isolate: false,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient, FEATURE_TRANSLATE_PROVIDER_NAME, PLATFORM_ID],
          },
        }).providers,
      ],
    };
  }
}
