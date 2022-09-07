import { Component, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { DataManager, UrlAdaptor   } from '@syncfusion/ej2-data';
import { finalize } from 'rxjs/operators';
import { API_BASE_URL, QrCodeRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { FilterSettingsModel, GridComponent, GroupSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { NbDialogService } from '@nebular/theme';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateQrCodeDialogComponent } from './create-qr-code/create-qr-code-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent extends AppComponentBase implements OnInit {

  // Grid
  @ViewChild('srCodeRequestGrid') public grid: GridComponent;
  public srCodeRequests: DataManager;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [6, 20, 100];
  public groupOptions: GroupSettingsModel;
  public filterOption: FilterSettingsModel = { type: 'Menu' };
  private baseUrl: string;
  localizationHelper : LocalizationHelper;

  constructor(injector: Injector,
    private _modalService: NbDialogService,
    private _srCodeRequestAppService: QrCodeRequestServiceProxy,
    private _router: Router,
    private _route: ActivatedRoute,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.pageSettings = {pageSize: 6, pageCount: 10, pageSizes: this.pageSizes};
    this.srCodeRequests = new DataManager({
      url: this.baseUrl + '/api/services/app/QrCodeRequest/Get',
      adaptor: new UrlAdaptor()
  });
  }

  showCreateDialog() {
    this._modalService.open(
      CreateQrCodeDialogComponent
    ).onClose.subscribe((e:any) => {
      console.log("close:: "+e);
      this.refresh();
    });
  }

  refresh() {
    this.grid.refresh();
  }
  clearFilters() {
    this.grid.clearFiltering();
  }
  clearSorts() {
    this.grid.clearSorting();
  }

  print(id){
    this._router.navigate(["/app/setting/print-qr-code"], {
      queryParams: {
        id: id
      }
    });
  }

  delete(data){

  }
}
