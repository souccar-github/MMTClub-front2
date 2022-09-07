import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SizeComponent } from './size/size.component';
import { CreateSizeDialogComponent } from './size/create-size/create-size-dialog.component';
import { EditSizeDialogComponent } from './size/edit-size/edit-size-dialog.component';
import { CategoryComponent } from './category/category.component';
import { CreateCategoryDialogComponent } from './category/create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './category/edit-category/edit-category-dialog.component';
import { ProductComponent } from './product/product.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
import { LevelComponent } from './level/level.component';
import { CreateLevelDialogComponent } from './level/create-level/create-level-dialog.component';
import { EditLevelDialogComponent } from './level/edit-level/edit-level-dialog.component';
import { GiftComponent } from './gift/gift.component';
import { GiftRequestComponent } from './gift-request/gift-request.component';
import { CreateGiftDialogComponent } from './gift/create-gift/create-gift-dialog.component';
import { EditGiftDialogComponent } from './gift/edit-gift/edit-gift-dialog.component';

//import endTage
import {
    NbActionsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule
} from '@nebular/theme';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    EditService,
    FilterService,
    ForeignKeyService,
    GridModule,
    GroupService,
    PageService,
    SortService,
    ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ColorPickerModule, NumericTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CategoryNewsServiceProxy, CategoryServiceProxy, ComplaintServiceProxy, GeneralSettingServiceProxy, GiftServiceProxy, LevelServiceProxy, ProductServiceProxy, QrCodeRequestServiceProxy, QrCodeServiceProxy, SizeServiceProxy,UserGiftServiceProxy } from '@shared/service-proxies/service-proxies';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { CategoryNewsComponent } from './category/category-news/category-news.component';
import { CreateCategoryNewsDialogComponent } from './category/category-news/create-category-news/create-category-news-dialog.component';
import { EditCategoryNewsDialogComponent } from './category/category-news/edit-category-news/edit-category-news-dialog.component';
import { CreateQrCodeDialogComponent } from './qr-code/create-qr-code/create-qr-code-dialog.component';
import { EditQrCodeDialogComponent } from './qr-code/edit-qr-code/edit-qr-code-dialog.component';
import { PrintQrCodeComponent } from './qr-code/print-qr-code/print-qr-code.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import {NgxPrintModule} from 'ngx-print';
import { ChangeGiftRequestStatusDialogComponent } from './gift-request/change-status/change-gift-request-status-dialog.component';
import { ComplaintComponent } from './complaints/complaint.component';


const NB_MODULES = [
    NbActionsModule,
    NbIconModule,
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbCheckboxModule
];
const SYNCFUSION_MODULES = [
    GridModule,
    ToolbarModule,
    UploaderModule,
    NumericTextBoxModule,
    DropDownListModule,
    SwitchModule,
    ButtonModule,
    ColorPickerModule
];

const SYNCFUSION_SERVICES = [
    PageService,
    SortService,
    FilterService,
    GroupService,
    ToolbarService,
    ForeignKeyService,
    EditService
];

@NgModule({
    declarations: [
        SettingComponent,
        SizeComponent,
        CreateSizeDialogComponent,
        EditSizeDialogComponent,

        CategoryComponent,
        CreateCategoryDialogComponent,
        EditCategoryDialogComponent,

        LevelComponent,
        CreateLevelDialogComponent,
        EditLevelDialogComponent,

        GiftComponent,
        CreateGiftDialogComponent,
        EditGiftDialogComponent,

        ProductComponent,
        CreateProductDialogComponent,
        EditProductDialogComponent,
        QrCodeComponent,
        CategoryNewsComponent,
        CreateCategoryNewsDialogComponent,
        EditCategoryNewsDialogComponent,
        CreateQrCodeDialogComponent,
        EditQrCodeDialogComponent,
        GeneralSettingComponent,
        PrintQrCodeComponent,
        GiftRequestComponent,
        ChangeGiftRequestStatusDialogComponent,
        ComplaintComponent
        //declare endTage
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        ThemeModule,
        SettingRoutingModule,
        ...SYNCFUSION_MODULES,
        ...NB_MODULES,
        NgxPrintModule
    ],
    providers: [
        ...SYNCFUSION_SERVICES,
		ProductServiceProxy,
		CategoryServiceProxy,
		CategoryNewsServiceProxy,
        SizeServiceProxy,
        LevelServiceProxy,
        GiftServiceProxy,
        QrCodeRequestServiceProxy,
        GeneralSettingServiceProxy,
        QrCodeServiceProxy,
        UserGiftServiceProxy,
        ComplaintServiceProxy 
    ],
    entryComponents: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingModule { }
