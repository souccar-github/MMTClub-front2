import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { SettingComponent } from "./setting.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { QrCodeComponent } from "./qr-code/qr-code.component";
import { CategoryNewsComponent } from "./category/category-news/category-news.component";
import { LevelComponent } from "./level/level.component";
import { GiftComponent } from "./gift/gift.component";
import { GeneralSettingComponent } from "./general-setting/general-setting.component";
import { PrintQrCodeComponent } from "./qr-code/print-qr-code/print-qr-code.component";
import { GiftRequestComponent } from "./gift-request/gift-request.component";
import { ComplaintComponent } from "./complaints/complaint.component";
//import endTage

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
        {
            path: "qr-code",
            component: QrCodeComponent,
            data: { permission: "Pages.QrCodeRequests" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "print-qr-code",
            component: PrintQrCodeComponent,
            //data: { permission: "Pages.PrintQrCodes" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "complaint",
            component: ComplaintComponent,
            //data: { permission: "Pages.PrintQrCodes" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "category",
            component: CategoryComponent,
            data: { permission: "Pages.Categories" },
            canActivate: [AppRouteGuard],
        },

        {
            path: "category-news",
            component: CategoryNewsComponent,
            data: { permission: "Pages.CategoryNews" },
            canActivate: [AppRouteGuard],
        },

        {
            path: "product",
            component: ProductComponent,
            data: { permission: "Pages.Products" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "level",
            component: LevelComponent,
            data: { permission: "Pages.Levels" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "gift",
            component: GiftComponent,
            //data: { permission: "Pages.Gifts" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "gift-request",
            component: GiftRequestComponent,
            //data: { permission: "Pages.Gifts" },
            canActivate: [AppRouteGuard],
        },
        {
            path: "general-setting",
            component: GeneralSettingComponent,
            //data: { permission: "Pages.Gifts" },
            canActivate: [AppRouteGuard],
        },
        //route endTage
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingRoutingModule {}
