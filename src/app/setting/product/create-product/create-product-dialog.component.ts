import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateProductDto,
  ProductServiceProxy,
  CategoryServiceProxy,
  CategoryForDropdownDto,
  FileUploadDto,
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
const MAX_SIZE: number = 1048576;

@Component({
  templateUrl: "create-product-dialog.component.html",
  styleUrls: ["create-product-dialog.component.scss"],
  providers: [ProductServiceProxy],
})
export class CreateProductDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  product: CreateProductDto = new CreateProductDto();
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  public pageSizes: number[] = [5,10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  categories: CategoryForDropdownDto[] = [];
  public categoryFields: Object = { text: "fullName", value: "id" };
  
  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    private _categoryAppService: CategoryServiceProxy,
    public dialogRef: NbDialogRef<CreateProductDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialCategories();

    this.pageSettings = {
      pageSize: 5,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };
    this.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: "Normal" };
    this.toolbar = ["Add", "Edit","Delete", "Update", "Cancel","Search"];

    this.imageSrc1 = this.emptySrc;
    this.imageSrc2 = this.emptySrc;
    this.imageSrc3 = this.emptySrc;

  }

  initialCategories(){
    this._categoryAppService.getAllForDropdown()
    .subscribe((result)=>{
        this.categories = result;
    });
}

  save(): void {
    this.saving = true;
    this._productService
      .create(this.product)
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
  imageSrc1: any;
  imageSrc2: any;
  imageSrc3: any;
  emptySrc = 'assets/img/upload.png';
  @ViewChild("firstImage") firstImage: ElementRef;
  @ViewChild("secondImage") secondImage: ElementRef;
  @ViewChild("thirdImage") thirdImage: ElementRef;

  showUploadFirstImageDialog(args) {
    this.firstImage.nativeElement.click();
  }

  showUploadSecondImageDialog(args) {
    this.secondImage.nativeElement.click();
  }

  showUploadThirdImageDialog(args) {
    this.thirdImage.nativeElement.click();
  }

  onChangeFirstImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      if (file.size < MAX_SIZE) {
        const reader = new FileReader();
        reader.onload = e => {
            this.imageSrc1 = reader.result;

            let dto = new FileUploadDto();
            dto.fileName = file.name;
            dto.fileSize = file.size;
            dto.fileType = file.type;
            dto.fileAsBase64 = reader.result.toString();
            this.product.firstImage = dto;
        }

        reader.readAsDataURL(file);
    }else{
        this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
    }
    }
  }

  onChangeSecondImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      if (file.size < MAX_SIZE) {
        const reader = new FileReader();
        reader.onload = e => {
            this.imageSrc2 = reader.result;

            let dto = new FileUploadDto();
            dto.fileName = file.name;
            dto.fileSize = file.size;
            dto.fileType = file.type;
            dto.fileAsBase64 = reader.result.toString();
            this.product.secondImage = dto;
        }

        reader.readAsDataURL(file);
    }else{
        this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
    }
    }
  }

  onChangeThirdImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      if (file.size < MAX_SIZE) {
        const reader = new FileReader();
        reader.onload = e => {
            this.imageSrc3 = reader.result;

            let dto = new FileUploadDto();
            dto.fileName = file.name;
            dto.fileSize = file.size;
            dto.fileType = file.type;
            dto.fileAsBase64 = reader.result.toString();
            this.product.thirdImage = dto;
        }

        reader.readAsDataURL(file);
    }else{
        this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
    }
    }
  }

  deleteFirstImage(args) {
    this.imageSrc1 = this.emptySrc;
    this.product.firstImage = undefined;
  }

  deleteSecondImage(args) {
    this.imageSrc2 = this.emptySrc;
    this.product.secondImage = undefined;
  }

  deleteThirdImage(args) {
    this.imageSrc3 = this.emptySrc;
    this.product.thirdImage = undefined;
  }

}
