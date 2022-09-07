import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GeneralSettingDto, GeneralSettingServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent extends AppComponentBase implements OnInit {
  saving = false;
  generalSetting: GeneralSettingDto = new GeneralSettingDto();

  constructor(injector: Injector, 
    private _generalSettingService: GeneralSettingServiceProxy
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialSetting();
  }

  initialSetting() {
    this._generalSettingService.getAll()
    .subscribe(result=>{
      if(result.length > 0){
        this.generalSetting = result[0];
      }
    })
  }

  save(): void {
    this.saving = true;

    this._generalSettingService
        .save(this.generalSetting)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        ).subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
        });
}
}
