export interface PaymentProvider {
    name: string;
    // register(apiKey: string): void;
    createCheckoutSession(params: { price: number; currency: string }): Promise<any>;
    initiatePayment(sessionId: string): Promise<any>;
    capturePayment(sessionId: string): Promise<any>;
}
  