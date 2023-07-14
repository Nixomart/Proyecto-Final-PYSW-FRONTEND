import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit{

  mensaje: string = "";
  mensaje2!:string;
  mensaje3!:string;
  token:string = "EAAvYwTVoNm8BADE1nZCdrJFdUvFm90IL34QwdoKIjZAWsUoxODUZCIqH5ysHZC1Wn8nplEz9KInst7BWZB4tQ5FQMtCtr6RnxqScCGTZAEy5NxERyewjhq6NGjG9RfwpgXUigCZCW6lzMUb5TOx8IxjqZAU02mxbBhLwZB2ZBGkmyF0zqLHIyLEqPtcMwhZCgaQ7ehJT3IlRk4tYCdSwlM9sWAp";
  urlImg!:string;
  link!:string;
  constructor(private fb: FacebookService) {
    this.iniciarFb();
  }

  selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


  ngOnInit(): void {
  }
  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/109163278909415/feed', apiMethod,{
    "message": this.mensaje,
    "access_token": this.token
  });
  }

  postFbImage(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/109163278909415/photos', apiMethod,{
      "url": this.urlImg,
      "caption": this.mensaje2,
      "access_token": this.token
    });
  }

  // postFbImageLink(){
  //   var apiMethod: ApiMethod = "post";
  //   this.fb.api('/109163278909415/feed', apiMethod,{
  //     "message": this.mensaje3,
  //     "picture": this.urlImg,
  //     "link": this.link,
  //     "access_token": this.token
  //   });
  // }


  iniciarFb(){
    let initParams: InitParams = {
      appId: '1757474011058319',
      autoLogAppEvents : true,
      xfbml : true,
      version : 'v7.0'
    };
    this.fb.init(initParams);
  }

  loginWithFacebook(): void {

    this.fb.login()
    .then((response: LoginResponse) =>
    {
    console.log(response);

    })
    .catch((error: any) => console.error(error));
    }
}
