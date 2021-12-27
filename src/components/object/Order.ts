export interface SaleInvoiceClient {

    SaleInvoiceID: string;
    Code: string;
    QRCode:string;
    SaleInvoiceStatus: number;
    VoucherDate: string;
    AccountingDate: string;
    DeliveryDate: string;
    CustomerID: string;
    CustomerCode: string;
    CustomerName: string;
    CustomerAddress: string;
    CustomerPhone: string;
    ShipAddress: string;
    ShipperName: string;
    Amount: number;
    TaxAmount: number;
    TotalAmount: number;
    DepositAmount: number;
    PaymentMethodID:number;
    Notes?: string;
    StockID: string;
    OrderCode: string;
    OrderName: string;
    OrderPhone: string;
    TotalQuantity: number;
    AddressID:string;
    Latitue:number;
    Longitue:number;
    Status?:boolean
    Checked?:boolean;
    EmployeeName?: string;
}

export interface SaleInvoiceDetailClient {
    SaleInvoiceDetailID: string;
    SaleInvoiceID: string;
    ProductID: string;
    Barcode: string;
    ProductCode: string;
    ProductName: string;
    UnitName: string;
    Price: number;
    Quantity: number;
    Amount: number;
    DiscountAmount: number;
    TaxAmount: number;
    TotalAmount: number;
    SortOrder: number;
    QuantityOrg: number;
    DiscountPercent:number;
    Notes?: string;
    TaxPercent:number;

}

export interface AccountBankingTypeList {
    AccountBankingTypeID: string;
    BankingTypeID: number;
    SiteID: number; 
    TypeName: string;
    IsActive: string;
    SortOrder: number;
    Notes: string;

}

export interface PaymentInfo {
    PaymentMethodID : string ;
    AccountBankingTypeID: string;
    Amount : string;
    Notes : string;

}
export interface VoucherSubmit {
    VoucherSubmitID: string;
    CreateBy: string;
    TotalVoucher:number;
    TotalAmount: number;
    TotalVoucherPay:number;
    TotalPayAmount: number;
    PayCashAmount:number;
    PayBankAmount:number;
    Status:number
}
export interface VoucherSubmitDetail {
    DetailID:string;
    VoucherSubmitID: string;
    VoucherID:string;
    VoucherCode:string;
    VoucherType:number;
    SortOrder:number;
}
export interface VoucherSubmitClient {
    VoucherSubmitID: string;
    SiteID: number;
    StoreID: string;
    VoucherType: number;
    CreatedDate: string;
    CreateBy: string;
    ApprovedBy?: string;
    ApprovedDate?: string;
    TotalVoucher:number;
    TotalAmount: number;
    TotalVoucherPay:number;
    TotalPayAmount: number;
    PayCashAmount:number;
    PayBankAmount:number;
    Status:number
    Notes?:string;
    ShipperName: string;
    ApprovedName?:string;
}
export interface VoucherSubmitDetailClient {
    VoucherSubmitID: string;
    VoucherID: string;
    VoucherCode: string;
    VoucherType: number;
    SortOrder: number;
    AccountingDate: string;
    CustomerCode: string;
    CustomerName: string;
    OrderCode: string;
    OrderDate: string;
    TotalAmount: number;
    DepositAmount: number;
    DepositNotes: string;
}