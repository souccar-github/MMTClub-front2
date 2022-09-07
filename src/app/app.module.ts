import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { ThemeModule } from '@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SettingModule } from './setting/setting.module';
import { SecurityModule } from './security/security.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    AppRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    SettingModule,
    SecurityModule,
    
  ],
  providers: [
    
  ],
  entryComponents: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
