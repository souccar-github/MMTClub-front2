import {
  Component,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  UserGiftServiceProxy,
} from "@shared/service-proxies/service-proxies";
import {
  FilterSettingsModel,
  GridComponent,
  GroupSettingsModel,
  PageSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import {
  DataManager,
  UrlAdaptor,
  Query
} from "@syncfusion/ej2-data";
import { finalize } from "rxjs/operators";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { LocalizationHelper } from "@shared/localization/localization-helper";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangeGiftRequestStatusDialogComponent } from "./change-status/change-gift-request-status-dialog.component";

setCulture("ar-SY");
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: "app-giftRequest",
  templateUrl: "./gift-request.component.html",
  styleUrls: ["./gift-request.component.scss"],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftRequestComponent extends AppComponentBase implements OnInit {
  // Grid
  @ViewChild("giftRequestGrid") public grid: GridComponent;
  public giftRequests: DataManager;
  public param: Query;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [6, 20, 100];
  public groupOptions: GroupSettingsModel;
  public filterOption: FilterSettingsModel = { type: "Menu" };
  private baseUrl: string;
  localizationHelper: LocalizationHelper;
  public levelId: string;
  public levelName: string = "";

  constructor(
    injector: Injector,
    private _modalService: NbDialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private __userGiftAppService: UserGiftServiceProxy,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.pageSettings = {
      pageSize: 6,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };

    this.giftRequests = new DataManager({
      url: this.baseUrl + "/api/services/app/UserGift/Get",
      adaptor: new UrlAdaptor(),
    });
    this.param = new Query().addParams("id", this.levelId);
  }
  
  showChangeStatusDialog(data) {
    this._modalService
      .open(ChangeGiftRequestStatusDialogComponent, {
        context: {
          id: data.id
        },
      })
      .onClose.subscribe((e: any) => {
        this.refresh();
      });
  }

  // delete(data): void {
  //   abp.message.confirm(
  //     this.l("DoYouWantToRemoveTheGiftRequest", data.name),
  //     undefined,
  //     (result: boolean) => {
  //       if (result) {
  //         this._giftRequestAppService
  //           .delete(data.id)
  //           .pipe(
  //             finalize(() => {
  //               abp.notify.success(this.l("SuccessfullyDeleted"));
  //               this.refresh();
  //             })
  //           )
  //           .subscribe(() => {});
  //       }
  //     }
  //   );
  // }

  

  refresh() {
    this.grid.refresh();
  }
  clearFilters() {
    this.grid.clearFiltering();
  }
  clearSorts() {
    this.grid.clearSorting();
  }

  navigateToLevel() {
    this._router.navigateByUrl("/app/setting/level");
  }
}
