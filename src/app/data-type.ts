// This will be the Format of the Data we Send

// This is for the Seller SignUp
export interface SellerSignUpRequestData {
  name: string; 
  email: string; 
  password: string;
}

// This is for the Seller Sign-In
export interface SellerSignIpRequestData {
  email: string;
  password: string;
}
