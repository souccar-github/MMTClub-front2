import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://souccar.com/"
                              target="_blank">Souccar LLC</a></b> 2022.
      Developed By
      <b>
        <a href="#" target="_blank">
        .ISD Dep
        </a>
      </b>
    </span>
    <div class="socials">
      <a href="" target="_blank" class="ion ion-social-github"></a>
      <a href="" target="_blank" class="ion ion-social-facebook"></a>
      <a href="" target="_blank" class="ion ion-social-twitter"></a>
      <a href="" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
