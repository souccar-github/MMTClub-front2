import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Inject,
  Optional,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import { NbDialogRef } from "@nebular/theme";
import {
  CategoryDto,
  CategoryServiceProxy,
  UpdateProductDto,
  ProductServiceProxy,
  FileUploadDto,
  API_BASE_URL,
} from "@shared/service-proxies/service-proxies";
import {
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
const MAX_SIZE: number = 1048576;

@Component({
  templateUrl: "edit-product-dialog.component.html",
  styleUrls: ["edit-product-dialog.component.scss"],
})
export class EditProductDialogComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  product: UpdateProductDto = new UpdateProductDto();
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  //ProductSize
  @ViewChild("ProductSizeGrid") public grid: GridComponent;
  public pageSizes: number[] = [5, 10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  categories: CategoryDto[] = [];
  public categoryFields: Object = { text: "name", value: "id" };
  baseUrl: string;

  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    private _categoryAppService: CategoryServiceProxy,
    public dialogRef: NbDialogRef<EditProductDialogComponent>,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.initialCategories();

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

  initialCategories() {
    this._categoryAppService
      .getAll()
      .subscribe((result) => {
        this.categories = result;
        this.initialProduct();
      });
  }

  initialProduct() {
    this._productService
      .getForEdit(this.id)
      .subscribe((result: UpdateProductDto) => {
        this.product = result;
        
        if (result.firstImage != undefined) {
          this.imageSrc1 = this.baseUrl + "/" +result.firstImage.filePath;
        } else {
          this.imageSrc1 = this.emptySrc;
        }

        if (result.secondImage != undefined) {
          this.imageSrc2 = this.baseUrl + "/" +result.secondImage.filePath;
        } else {
          this.imageSrc2 = this.emptySrc;
        }

        if (result.thirdImage != undefined) {
          this.imageSrc3 = this.baseUrl + "/" +result.thirdImage.filePath;
        } else {
          this.imageSrc3 = this.emptySrc;
        }
      });
  }

  save(): void {
    this.saving = true;

    this._productService
      .update(this.product)
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
