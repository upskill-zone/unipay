// src/mocks/MockStripe.ts
interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
    client_secret: string;
  }
  
  interface CheckoutSession {
    id: string;
    payment_intent: string;
    payment_intent_client_secret: string;
    url: string;
    amount: number;
    currency: string;
    pgw: string;
  }
  
  export class MockStripe {
    private paymentIntents: Record<string, PaymentIntent> = {};
    private checkoutSessions: Record<string, CheckoutSession> = {};
  
    constructor(private apiKey: string) {}
  
    // Simulate creating a checkout session
    async checkoutSessionsCreate(params: {
      payment_method_types: string[];
      pgw: string,
      line_items: { price_data: { currency: string; product_data: { name: string }; unit_amount: number }; quantity: number }[];
      mode: 'payment';
      success_url: string;
      cancel_url: string;
    }): Promise<CheckoutSession> {
      const paymentIntentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
      const sessionId = `cs_${Math.random().toString(36).substring(2, 15)}`;
      
      const paymentIntent: PaymentIntent = {
        id: paymentIntentId,
        amount: params.line_items[0].price_data.unit_amount,
        currency: params.line_items[0].price_data.currency,
        status: 'requires_payment_method',
        client_secret: `secret_${paymentIntentId}`,
      };
  
      this.paymentIntents[paymentIntentId] = paymentIntent;
  
      const session: CheckoutSession = {
        id: sessionId,
        payment_intent: paymentIntentId,
        payment_intent_client_secret: paymentIntent.client_secret,
        url: `https://mock-checkout.com/session/${sessionId}`,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        pgw: params.pgw
      };
  
      this.checkoutSessions[sessionId] = session;
      
      return session;
    }
  
    // Simulate retrieving a checkout session
    async checkoutSessionsRetrieve(sessionId: string): Promise<CheckoutSession> {
      const session = this.checkoutSessions[sessionId];
      if (!session) throw new Error('Session not found');
      return session;
    }
  
    // Simulate capturing a payment intent
    async paymentIntentsCapture(paymentIntentId: string): Promise<PaymentIntent> {
      const paymentIntent = this.paymentIntents[paymentIntentId];
      if (!paymentIntent) throw new Error('Payment Intent not found');
  
      paymentIntent.status = 'succeeded';
      return paymentIntent;
    }
  }
  