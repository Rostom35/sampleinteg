import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    SampleDevOpsSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        SampleDevOpsSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        SampleDevOpsSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class SampleDevOpsSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
