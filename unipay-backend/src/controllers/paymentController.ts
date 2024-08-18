import { Request, Response } from 'express';
import { UnipayService } from '../services/UnipayService';
import { StripeProvider } from '../providers/StripeProvider';

const unipay = new UnipayService();

// export const createCheckoutSession = async (req: Request, res: Response) => {
//   const { providerName, price, currency } = req.body;
//   try {
//     const session = await unipay.createCheckoutSession(providerName, { price, currency });
//     res.json(session);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };
const registerProvider = () => {
  unipay.registerProvider(new StripeProvider("API-KEY"));
}


export const createCheckoutSession = async (req: Request, res: Response) => {
    registerProvider();
    const { price, currency } = req.body;
    try {
      const session = await unipay.createCheckoutSession({ price, currency });
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

export const initiatePayment = async (req: Request, res: Response) => {
  const { providerName, sessionId } = req.body;
  try {
    const payment = await unipay.initiatePayment(providerName, sessionId);
    res.json(payment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const capturePayment = async (req: Request, res: Response) => {
  const { providerName, sessionId } = req.body;
  try {
    const capture = await unipay.capturePayment(providerName, sessionId);
    res.json(capture);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
