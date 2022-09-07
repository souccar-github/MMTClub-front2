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
  GiftServiceProxy,
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
import { CreateGiftDialogComponent } from "./create-gift/create-gift-dialog.component";
import { EditGiftDialogComponent } from "./edit-gift/edit-gift-dialog.component";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { LocalizationHelper } from "@shared/localization/localization-helper";
import { ActivatedRoute, Router } from "@angular/router";

setCulture("ar-SY");
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: "app-gift",
  templateUrl: "./gift.component.html",
  styleUrls: ["./gift.component.scss"],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftComponent extends AppComponentBase implements OnInit {
  // Grid
  @ViewChild("giftGrid") public grid: GridComponent;
  public gifts: DataManager;
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
    private _giftAppService: GiftServiceProxy,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    let routeData = history.state;
    this.levelId = routeData.levelId;
    this.levelName = routeData.levelName;
    
    if(this.levelId == undefined)
    {
      this.navigateToLevel();
    }

    this.pageSettings = {
      pageSize: 6,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };

    this.gifts = new DataManager({
      url: this.baseUrl + "/api/services/app/Gift/Get",
      adaptor: new UrlAdaptor(),
    });
    this.param = new Query().addParams("id", this.levelId);
  }
  showCreateDialog() {
    this._modalService
      .open(CreateGiftDialogComponent, {
        context: {
          levelId: Number(this.levelId),
        },
      })
      .onClose.subscribe((e: any) => {
        console.log("close:: " + e);
        this.refresh();
      });
  }
  showEditDialog(id) {
    this._modalService
      .open(EditGiftDialogComponent, {
        context: {
          id: id,
        },
      })
      .onClose.subscribe((e: any) => {
        console.log("close:: " + e);
        this.refresh();
      });
  }

  delete(data): void {
    abp.message.confirm(
      this.l("DoYouWantToRemoveTheGift", data.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._giftAppService
            .delete(data.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
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

  navigateToLevel() {
    this._router.navigateByUrl("/app/setting/level");
  }
}
