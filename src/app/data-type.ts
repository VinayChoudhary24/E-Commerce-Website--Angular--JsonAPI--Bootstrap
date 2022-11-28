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

// Seller Sign In Response
export interface SellerSignInResponseData {
  email: string;
  id: number;
  name: string;
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
  // Add to Basket Property
  quantity: undefined | number;
  productId: undefined | number;
}

// *************************

// This is for the User SignUp
export interface UserSignUpRequestData {
  name: string; 
  email: string; 
  password: string;
}

// This is for the User Sign-In --UserService
export interface UserSignInRequestData {
  email: string;
  password: string;
}

// User Sign In Response

// This is for the Seller Sign-In --SellerService
export interface UserSignInResponseData {
  email: string;
  id: number;
  name: string;
  password: string;
}

// This is for the cartData
export interface cart {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDetails: string;
  productImage: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}