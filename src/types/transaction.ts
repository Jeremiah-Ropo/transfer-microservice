export type TransactionDT = {
    narrative:string,
    transactionDate:Date,
    valueDate:Date,
    transactionReference:string,
    currency:Currency,
    fee:number,
    amount:number,
    balAfterTrans:number,
    category:string;
    
};

export type Currency = "NGN" | "USD";