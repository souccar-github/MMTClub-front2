import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  Optional,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  CategoryForDropdownDto,
  CategoryServiceProxy,
  FileUploadDto,
  UpdateCategoryDto,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
const MAX_SIZE: number = 1048576;

@Component({
  templateUrl: "edit-category-dialog.component.html",
  styleUrls: ["edit-category-dialog.component.scss"],
})
export class EditCategoryDialogComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;
  category: UpdateCategoryDto = new UpdateCategoryDto();
  categoriesForDropdown: CategoryForDropdownDto[] = [];
  public parentFields: Object = { text: "fullName", value: "id" };
  private baseUrl: string;
  imageSrc: any;
  emptySrc = 'assets/img/upload.png';
  @Output() onSave = new EventEmitter<any>();
  id: number;
  constructor(
    injector: Injector,
    public _categoryService: CategoryServiceProxy,
    public dialogRef: NbDialogRef<EditCategoryDialogComponent>,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.initialParentCategories();
  }

  initialParentCategories() {
    this._categoryService.getAllForDropdown()
      .subscribe((result) => {
        this.categoriesForDropdown = result;
        this.initialCategory();
      });
  }

  initialCategory() {
    this._categoryService
      .getForEdit(this.id)
      .subscribe((result) => {
        this.category = result;
        if (result.image != undefined) {
          this.imageSrc = this.baseUrl + "/" +result.image.filePath;
        } else {
          this.imageSrc = this.emptySrc;
        }
      });
  }


  save(): void {
    this.saving = true;
    this._categoryService
      .update(
        this.category
      )
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

  //=============
  @ViewChild("imageCategory") imageCategory: ElementRef;

  showUploadImageDialog(args) {
    this.imageCategory.nativeElement.click();
  }

  onChangeImage(event){
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        
        if (file.size < MAX_SIZE) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imageSrc = reader.result;

                let dto = new FileUploadDto();
                dto.fileName = file.name;
                dto.fileSize = file.size;
                dto.fileType = file.type;
                dto.fileAsBase64 = reader.result.toString();
                this.category.image = dto;
            }
    
            reader.readAsDataURL(file);
        }else{
            this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
        }
        
    }
}

  deleteImage(args) {
    this.imageSrc = this.emptySrc;
    this.category.image = undefined;
  }

}
