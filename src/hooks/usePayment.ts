import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PaymentStatus, PaymentMethod } from '../lib/types';

interface PaymentRequest {
  amount: number;
  currency?: string;
  method: PaymentMethod;
  enrollmentId?: string;
  studentId: string;
  formationTitle: string;
  phoneNumber?: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  status: PaymentStatus;
}

export function usePayment() {
  const [processing, setProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<PaymentResult | null>(null);

  const initiatePayment = async (request: PaymentRequest): Promise<PaymentResult> => {
    setProcessing(true);

    try {
      // 1. Create a payment record in Supabase
      const { data: payment, error: dbError } = await supabase
        .from('payments')
        .insert({
          enrollment_id: request.enrollmentId || null,
          student_id: request.studentId,
          amount: request.amount,
          currency: request.currency || 'XAF',
          method: request.method,
          status: 'pending' as PaymentStatus,
          provider_name: 'sandbox', // Will be replaced by actual provider
          metadata: {
            formation_title: request.formationTitle,
            phone_number: request.phoneNumber,
          },
        })
        .select()
        .single();

      if (dbError) {
        const result: PaymentResult = {
          success: false,
          error: dbError.message,
          status: 'failed',
        };
        setLastResult(result);
        return result;
      }

      // 2. TODO: Call actual payment provider API here
      // For now, simulate a sandbox payment
      // When the real API is provided, replace this section with:
      // const providerResult = await paymentProvider.charge({ ... });

      console.log('🏦 Sandbox payment initiated:', {
        paymentId: payment.id,
        amount: request.amount,
        method: request.method,
      });

      // Simulate sandbox success (in production, status comes from webhook/callback)
      const result: PaymentResult = {
        success: true,
        transactionId: payment.id,
        status: 'pending', // Will be 'success' after provider confirms
      };
      setLastResult(result);
      return result;
    } catch (err: unknown) {
      const result: PaymentResult = {
        success: false,
        error: err instanceof Error ? err.message : 'Erreur de paiement',
        status: 'failed',
      };
      setLastResult(result);
      return result;
    } finally {
      setProcessing(false);
    }
  };

  const verifyPayment = async (paymentId: string): Promise<PaymentResult> => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error || !data) {
      return { success: false, error: 'Paiement introuvable', status: 'failed' };
    }

    return {
      success: data.status === 'success',
      transactionId: data.id,
      status: data.status as PaymentStatus,
    };
  };

  return {
    initiatePayment,
    verifyPayment,
    processing,
    lastResult,
  };
}
