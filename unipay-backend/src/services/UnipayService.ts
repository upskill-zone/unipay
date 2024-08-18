import { PaymentProvider } from '../providers/PaymentProvider';

export class UnipayService {
  private providers: Map<string, PaymentProvider> = new Map();

  registerProvider(provider: PaymentProvider) {
    console.log('registerProvider')
    this.providers.set(provider.name, provider);
  }

  // async createCheckoutSession(providerName: string, params: { price: number; currency: string }) {
  //   const provider = this.providers.get(providerName);
  //   if (provider) {
  //     return await provider.createCheckoutSession(params);
  //   } else {
  //     throw new Error(`Provider ${providerName} not found`);
  //   }
  // }

  // async createCheckoutSession(params: { price: number; currency: string }) {
  //   const sessionId = `session-${Date.now()}`; // Simulated session ID
  //   const providers = Array.from(this.providers.keys());

  //   // Return the session ID, available providers, amount, and currency
  //   return { sessionId, availableProviders: providers, price: params.price, currency: params.currency };
  // }

  async createCheckoutSession(params: { price: number; currency: string }) {
    const sessions = [];
    for (const provider of Array.from(this.providers.keys())) {
      if (provider) {
        const _provider = this.providers.get(provider);
        console.log(_provider);
        if(_provider) {
          const session = await _provider.createCheckoutSession(params);
          sessions.push(session);
        }
      }
    }
    return sessions;
  }

  async initiatePayment(providerName: string, sessionId: string) {
    const provider = this.providers.get(providerName);
    if (provider) {
      return await provider.initiatePayment(sessionId);
    } else {
      throw new Error(`Provider ${providerName} not found`);
    }
  }

  async capturePayment(providerName: string, sessionId: string) {
    const provider = this.providers.get(providerName);
    if (provider) {
      return await provider.capturePayment(sessionId);
    } else {
      throw new Error(`Provider ${providerName} not found`);
    }
  }
}
