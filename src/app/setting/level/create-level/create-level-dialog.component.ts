import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateLevelDto,
  LevelServiceProxy,
  GiftServiceProxy,
  CreateGiftDto,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
import {
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
import { initial } from "lodash-es";
import { CloseScrollStrategy } from "@angular/cdk/overlay";

@Component({
  templateUrl: "create-level-dialog.component.html",
  styleUrls: ["create-level-dialog.component.scss"],
  providers: [LevelServiceProxy],
})
export class CreateLevelDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  level: CreateLevelDto = new CreateLevelDto();
  majors: CreateGiftDto[] = [];
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  //Level
  @ViewChild("levelGrid") public grid: GridComponent;
  public pageSizes: number[] = [5,10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public universityFields: Object = { text: "name", value: "id" };
  
  constructor(
    injector: Injector,
    public _levelService: LevelServiceProxy,
    public _majorService: GiftServiceProxy,
    public dialogRef: NbDialogRef<CreateLevelDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
    this.pageSettings = {
      pageSize: 5,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };
    this.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: "Normal" };
    this.toolbar = ["Add", "Edit","Delete", "Update", "Cancel","Search"];
  }

  save(): void {
    this.saving = true;
    this._levelService
      .create(this.level)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.dialogRef.close();
        this.onSave.emit();
      });
  }

  onchangeColor(data){
    this.level.color = data.currentValue.hex;
  }  

}
