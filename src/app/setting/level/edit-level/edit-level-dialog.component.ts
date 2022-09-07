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
import { NbDialogRef } from "@nebular/theme";
import {
  GiftServiceProxy,
  LevelServiceProxy,
  UpdateLevelDto,
  UpdateGiftDto,
} from "@shared/service-proxies/service-proxies";
import {
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";

@Component({
  templateUrl: "edit-level-dialog.component.html",
  styleUrls: ["edit-level-dialog.component.scss"],
})
export class EditLevelDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  color = '';
  id: number;
  level: UpdateLevelDto = new UpdateLevelDto();
  majors: UpdateGiftDto[] = [];
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  //Level
  @ViewChild("levelGrid") public grid: GridComponent;
  public pageSizes: number[] = [5, 10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public universityFields: Object = { text: "name", value: "id" };

  constructor(
    injector: Injector,
    public _levelService: LevelServiceProxy,
    public _majorService: GiftServiceProxy,
    public dialogRef: NbDialogRef<EditLevelDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialLevel();
    this.pageSettings = {
      pageSize: 5,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      mode: "Normal",
    };
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel", "Search"];
  }


  initialLevel(){
    this._levelService
    .getForEdit(this.id)
    .subscribe((result: UpdateLevelDto) => {
      this.level = result;
      this.color = result.color;
    });
  }


  save(): void {
    this.saving = true;
    this.level.color = this.color;
    this._levelService
        .update(this.level)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        )
        .subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.dialogRef.close();
            this.onSave.emit();
        });
}
}
