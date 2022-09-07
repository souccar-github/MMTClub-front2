import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Inject,
  Optional,
  ElementRef,
  } from "@angular/core";
  import { finalize } from "rxjs/operators";
  import { AppComponentBase } from "@shared/app-component-base";
  import {
      CategoryServiceProxy,
      API_BASE_URL,
      FileUploadDto,
      CategoryNewsServiceProxy,
      CreateCategoryNewsDto,
  } from "@shared/service-proxies/service-proxies";
  import { NbDialogRef } from "@nebular/theme";
  import {} from "@shared/service-proxies/service-proxies";
  import { RemovingEventArgs, UploaderComponent } from "@syncfusion/ej2-angular-inputs";
  import { read } from "fs";
  const MAX_SIZE: number = 1048576;
  
  @Component({
      templateUrl: "create-category-news-dialog.component.html",
      styleUrls: ["create-category-news-dialog.component.scss"],
      providers: [CategoryServiceProxy],
  })
  export class CreateCategoryNewsDialogComponent
      extends AppComponentBase
      implements OnInit
  {
      saving = false;
      categoryId: number;
      news: CreateCategoryNewsDto = new CreateCategoryNewsDto();
      private baseUrl: string;
      imageSrc: any;
      emptySrc = 'assets/img/upload.png';
      @Output() onSave = new EventEmitter<any>();
  
      constructor(
      injector: Injector,
      public _categoryNewsService: CategoryNewsServiceProxy,
      public dialogRef: NbDialogRef<CreateCategoryNewsDialogComponent>,
      @Optional() @Inject(API_BASE_URL) baseUrl?: string
      ) {
      super(injector);
      this.baseUrl = baseUrl;
      }
  
      ngOnInit(): void {
          this.imageSrc = this.emptySrc;
      }
  
      save(): void {
        this.news.categoryId = this.categoryId
          this.saving = true;
          this._categoryNewsService
          .create(
              this.news
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
      @ViewChild("imageCategoryNews") imageCategoryNews : ElementRef;
      
      showUploadImageDialog(args){
          this.imageCategoryNews.nativeElement.click(); 
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
                      this.news.image = dto;
                  }
          
                  reader.readAsDataURL(file);
              }else{
                  this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
              }
              
          }
      }
  
      deleteImage(args){
          this.imageSrc = this.emptySrc;
          this.news.image = undefined;
      }
      
  }
  