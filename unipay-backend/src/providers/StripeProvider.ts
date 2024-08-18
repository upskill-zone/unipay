// src/providers/StripeProvider.ts
import { PaymentProvider } from './PaymentProvider';
import { MockStripe } from '../mocks/MockStripe';

export class StripeProvider implements PaymentProvider {
  public name = 'Stripe';
  private stripe: MockStripe;

  // Register the Stripe provider with the API key
  constructor(apiKey: string) {
    console.log('apiKey'+ apiKey);
    this.stripe = new MockStripe(apiKey);
    console.log('apiKey'+  this.stripe );
  }

  // Create a Checkout Session
  async createCheckoutSession(params: { price: number; currency: string }): Promise<any> {
    try {
      const session = await this.stripe.checkoutSessionsCreate({
        payment_method_types: ['card'],
        pgw: this.name,
        line_items: [
          {
            price_data: {
              currency: params.currency,
              product_data: {
                name: 'Sample Product',
              },
              unit_amount: params.price * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://your-domain.com/success',
        cancel_url: 'https://your-domain.com/cancel',
      });

      return session;
    } catch (error: any) {
      throw new Error(`MockStripe checkout session creation failed: ${error.message}`);
    }
  }

  // Initiate Payment
  async initiatePayment(sessionId: string): Promise<any> {
    try {
      const session = await this.stripe.checkoutSessionsRetrieve(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      const paymentIntentId = session.payment_intent;
      return { clientSecret: session.payment_intent_client_secret, paymentIntentId };
    } catch (error: any) {
      throw new Error(`MockStripe payment initiation failed: ${error.message}`);
    }
  }

  // Capture Payment
  async capturePayment(sessionId: string): Promise<any> {
    try {
      const session = await this.stripe.checkoutSessionsRetrieve(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      const paymentIntentId = session.payment_intent;
      const paymentIntent = await this.stripe.paymentIntentsCapture(paymentIntentId);

      return { status: 'Payment captured successfully', paymentIntent };
    } catch (error: any) {
      throw new Error(`MockStripe payment capture failed: ${error.message}`);
    }
  }
}
