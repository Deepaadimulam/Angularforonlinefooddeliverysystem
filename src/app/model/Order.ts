export interface Order {
    

    orderID: number;
   
    customerID: number;
   
    restaurantID: number;
   
    status: string;
   
    totalAmount: number;
    
    menuItems: { name: string; quantity: number; price: number }[];
   }