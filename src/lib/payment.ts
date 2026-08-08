/* ------------------------------------------------------------------ */
/*  Payment Service — Abstract layer for payment providers             */
/* ------------------------------------------------------------------ */

import type { PaymentMethod, PaymentStatus } from './types';

export interface PaymentSession {
  transactionId: string;
  checkoutUrl?: string;  // If provider needs redirect
  status: PaymentStatus;
}

export interface PaymentVerification {
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  paidAt?: string;
}

export interface PaymentProviderConfig {
  name: string;
  apiKey: string;
  secretKey?: string;
  webhookSecret?: string;
  sandboxMode: boolean;
}

/**
 * Abstract payment provider interface.
 * Implement this for each provider (CinetPay, NotchPay, Flutterwave, etc.)
 */
export interface PaymentProvider {
  readonly name: string;
  
  initializePayment(params: {
    amount: number;
    currency: string;
    method: PaymentMethod;
    customerPhone?: string;
    customerEmail?: string;
    description: string;
    metadata?: Record<string, unknown>;
  }): Promise<PaymentSession>;

  verifyPayment(transactionId: string): Promise<PaymentVerification>;
}

/* ------------------------------------------------------------------ */
/*  Sandbox Provider (for development and testing)                     */
/* ------------------------------------------------------------------ */

export class SandboxPaymentProvider implements PaymentProvider {
  readonly name = 'sandbox';

  async initializePayment(params: {
    amount: number;
    currency: string;
    method: PaymentMethod;
    description: string;
  }): Promise<PaymentSession> {
    // Simulate a pending payment
    console.log('🧪 [Sandbox] Payment initiated:', params);
    
    return {
      transactionId: `sandbox_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      status: 'pending',
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentVerification> {
    console.log('🧪 [Sandbox] Payment verified:', transactionId);
    
    return {
      transactionId,
      status: 'success',
      amount: 0,
      currency: 'XAF',
      paidAt: new Date().toISOString(),
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Provider Registry                                                  */
/* ------------------------------------------------------------------ */

let currentProvider: PaymentProvider = new SandboxPaymentProvider();

export function setPaymentProvider(provider: PaymentProvider) {
  currentProvider = provider;
}

export function getPaymentProvider(): PaymentProvider {
  return currentProvider;
}

/**
 * Format a price in XAF with proper formatting
 */
export function formatPrice(amount: number, currency = 'XAF'): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
