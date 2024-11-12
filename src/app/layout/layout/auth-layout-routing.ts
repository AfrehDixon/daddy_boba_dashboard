import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
// import { OtpComponent } from "./pages/otp/otp.component";



export const AuthLayoutRoutes:Routes=[
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },

  { 
    path: "auth/login", 
    component:LoginComponent 
  },
//    {
//     path:'otp',
//     component:OtpComponent
//   },
  {
    path: 'register',
    component: RegisterComponent
  }
];
