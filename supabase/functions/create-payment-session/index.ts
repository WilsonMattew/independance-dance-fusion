import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { registrationData } = await req.json()

    // Cashfree Test Credentials
    const CASHFREE_APP_ID = 'TEST102945255a3251885e6d8967542552549201'
    const CASHFREE_SECRET_KEY = 'cfsk_ma_test_5b8eba0b037494c9b819f384e0532627_2d2693a2'
    const CASHFREE_BASE_URL = 'https://sandbox.cashfree.com/pg'

    // Create order ID
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Calculate amount (₹500 for registration)
    const amount = 500

    // Create Cashfree order
    const orderData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: registrationData.name,
        customer_email: registrationData.email,
        customer_phone: registrationData.mobile
      },
      order_meta: {
        return_url: `${req.headers.get('origin')}/payment-success`,
        notify_url: `${req.headers.get('origin')}/supabase/functions/v1/cashfree-webhook`
      }
    }

    const cashfreeResponse = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY
      },
      body: JSON.stringify(orderData)
    })

    if (!cashfreeResponse.ok) {
      throw new Error('Failed to create Cashfree order')
    }

    const cashfreeData = await cashfreeResponse.json()

    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store pre-registration data
    const { data: preReg, error: preRegError } = await supabase
      .from('pre_registrations')
      .insert({
        ...registrationData,
        payment_session_id: cashfreeData.payment_session_id,
        amount: amount,
        status: 'pending'
      })
      .select()
      .single()

    if (preRegError) {
      throw preRegError
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_session_id: cashfreeData.payment_session_id,
        order_id: orderId,
        pre_registration_id: preReg.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})