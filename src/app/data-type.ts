// This will be the Format of the Data we Send

// This is for the Seller SignUp --SellerService
export interface SellerSignUpRequestData {
  name: string; 
  email: string; 
  password: string;
}

// This is for the Seller Sign-In --SellerService
export interface SellerSignIpRequestData {
  email: string;
  password: string;
}

// This is for SellerAddNewProduct --ProductService
export interface sellerAddNewProductData {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDetails: string;
  productImage: string;
  id: number;
}

// *************************

// This is for the User SignUp
export interface UserSignUpRequestData {
  name: string; 
  email: string; 
  password: string;
}
