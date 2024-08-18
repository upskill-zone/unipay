import { Router } from 'express';
import { capturePayment, createCheckoutSession, initiatePayment } from '../controllers/paymentController';

const router = Router();

router.post('/checkout', createCheckoutSession);
router.post('/initiate', initiatePayment);
router.post('/capture', capturePayment);

export default router;
