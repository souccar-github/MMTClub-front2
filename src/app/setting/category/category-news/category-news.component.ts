import { Component, Inject, Injector, OnInit, Optional, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, CategoryNewsServiceProxy } from '@shared/service-proxies/service-proxies';
import { FilterSettingsModel, GridComponent, GroupSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, UrlAdaptor ,Query  } from '@syncfusion/ej2-data';
import { finalize } from 'rxjs/operators';
import { CreateCategoryNewsDialogComponent } from './create-category-news/create-category-news-dialog.component';
import { EditCategoryNewsDialogComponent } from './edit-category-news/edit-category-news-dialog.component';


@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss'],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryNewsComponent extends AppComponentBase implements OnInit {
  // Grid
  @ViewChild('categoryNewsGrid') public grid: GridComponent;
  public news: DataManager;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [6, 20, 100];
  public groupOptions: GroupSettingsModel;
  public filterOption: FilterSettingsModel = { type: 'Menu' };
  private baseUrl: string;
  categoryId: string;
  categoryName: string;
  public param: Query;

  constructor(injector: Injector,
    private _modalService: NbDialogService,
    private _categoryNewsAppService: CategoryNewsServiceProxy,
    private _router: Router,
    private _route: ActivatedRoute,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {

      this._route.queryParams.subscribe((params:any)=>{
        debugger;
        this.categoryId = params.categoryId;
        this.categoryName = params.categoryName;
        this.param = new Query().addParams("id", this.categoryId);
      });
  

    this.pageSettings = {pageSize: 6, pageCount: 10, pageSizes: this.pageSizes};
    this.news = new DataManager({
      url: this.baseUrl + '/api/services/app/CategoryNews/Get',
      adaptor: new UrlAdaptor()
  });
  
  }
  showCreateDialog() {
    this._modalService.open(
      CreateCategoryNewsDialogComponent,{
        context: {
          categoryId: Number(this.categoryId)
        },
      }
    ).onClose.subscribe((e:any) => {
      this.refresh();
    });
  }
  showEditDialog(id) {
    this._modalService.open(
      EditCategoryNewsDialogComponent,
      {
        context: {
          id: id
        },
      }
    ).onClose.subscribe((e:any) => {
      this.refresh();
    });
  }
  
  delete(data): void {
    abp.message.confirm(
      this.l('DoYouWantToRemoveTheCategory', data.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryNewsAppService
            .delete(data.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
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
  getFullPath(initialPath){
    return this.baseUrl.concat(initialPath);
  }

  getImagePath(path){
    return this.baseUrl + "/" + path;
  }
}
