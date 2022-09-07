import { Component, Inject, Injector, OnInit, Optional, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { FilterSettingsModel, GridComponent, GroupSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, UrlAdaptor ,Query  } from '@syncfusion/ej2-data';
import { finalize } from 'rxjs/operators';
import { CreateCategoryDialogComponent } from './create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './edit-category/edit-category-dialog.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends AppComponentBase implements OnInit {
  // Grid
  @ViewChild('categoryGrid') public grid: GridComponent;
  public categories: DataManager;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [6, 20, 100];
  public groupOptions: GroupSettingsModel;
  public filterOption: FilterSettingsModel = { type: 'Menu' };
  private baseUrl: string;
  

  constructor(injector: Injector,
    private _modalService: NbDialogService,
    private _categoryAppService: CategoryServiceProxy,
    private _router: Router,
    private _route: ActivatedRoute,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.pageSettings = {pageSize: 6, pageCount: 10, pageSizes: this.pageSizes};
    this.categories = new DataManager({
      url: this.baseUrl + '/api/services/app/Category/Get',
      adaptor: new UrlAdaptor()
  });
  
  }
  showCreateDialog() {
    this._modalService.open(
      CreateCategoryDialogComponent
    ).onClose.subscribe((e:any) => {
      this.refresh();
    });
  }
  showEditDialog(id) {
    this._modalService.open(
      EditCategoryDialogComponent,
      {
        context: {
          id: id,
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
          this._categoryAppService
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

  showNews(data){
    this._router.navigate(["/app/setting/category-news"], {
      queryParams: {
        categoryId: data.id,
        categoryName: data.name,
      },
    });

  }
}
