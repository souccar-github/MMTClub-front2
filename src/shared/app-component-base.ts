import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import {
    LocalizationService,
    PermissionCheckerService,
    FeatureCheckerService,
    NotifyService,
    SettingService,
    MessageService,
    AbpMultiTenancyService
} from 'abp-ng2-module';
import { L10n, setCulture ,loadCldr } from '@syncfusion/ej2-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { AppSessionService } from '@shared/session/app-session.service';

setCulture('en');
L10n.load(LocalizationHelper.getArabicResources());

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    localizationHelper : LocalizationHelper;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    elementRef: ElementRef;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.elementRef = injector.get(ElementRef);
        loadCldr(
            require("cldr-data/main/en/numbers.json"),
            require("cldr-data/main/en/ca-gregorian.json"),
            require("cldr-data/supplemental/numberingSystems.json"),
            require("cldr-data/main/en/timeZoneNames.json"),
            require('cldr-data/supplemental/weekdata.json') 
        );
    }

    l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, this.localizationSourceName);
        
        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    getBalance(value){
        if(value != undefined)
        {
            var realNumber = Math.abs(value);
            if(value < 0){
                return this.numberWithCommas(realNumber) + '/' + this.l('ForHim');
            }else if(value > 0){
                return this.numberWithCommas(realNumber) + '/' + this.l('OnHim');
            }
        }
        return '';
    }

    getCommission(value){
        return (value != undefined && value > 0) ? this.numberWithCommas(value) : '';
    }

    numberWithCommas(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
