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
    const webhookData = await req.json()
    console.log('Cashfree Webhook received:', webhookData)

    // Initialize Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data } = webhookData
    const paymentStatus = data.payment.payment_status
    const orderId = data.order.order_id
    const paymentId = data.payment.cf_payment_id

    // Find pre-registration by payment session ID or order ID
    const { data: preReg, error: preRegError } = await supabase
      .from('pre_registrations')
      .select('*')
      .eq('payment_session_id', data.payment.payment_session_id)
      .single()

    if (preRegError || !preReg) {
      console.error('Pre-registration not found:', preRegError)
      return new Response('Pre-registration not found', { status: 404 })
    }

    if (paymentStatus === 'SUCCESS') {
      // Payment successful - move to registrations table
      const { error: regError } = await supabase
        .from('registrations')
        .insert({
          pre_registration_id: preReg.id,
          name: preReg.name,
          date_of_birth: preReg.date_of_birth,
          age: preReg.age,
          gender: preReg.gender,
          address: preReg.address,
          mobile: preReg.mobile,
          alternate_mobile: preReg.alternate_mobile,
          email: preReg.email,
          school_college: preReg.school_college,
          teacher_name: preReg.teacher_name,
          dance_type: preReg.dance_type,
          age_group: preReg.age_group,
          theme: preReg.theme,
          category: preReg.category,
          participant1_name: preReg.participant1_name,
          participant2_name: preReg.participant2_name,
          group_members: preReg.group_members,
          video_url: preReg.video_url,
          amount: preReg.amount,
          payment_id: paymentId,
          payment_status: 'paid',
          audition_status: 'under_review'
        })

      if (regError) {
        console.error('Error creating registration:', regError)
        throw regError
      }

      // Update pre-registration status
      await supabase
        .from('pre_registrations')
        .update({ status: 'paid' })
        .eq('id', preReg.id)

      // Send confirmation email (you can implement this later)
      console.log('Payment successful for:', preReg.email)

    } else {
      // Payment failed
      await supabase
        .from('pre_registrations')
        .update({ status: 'failed' })
        .eq('id', preReg.id)

      console.log('Payment failed for:', preReg.email)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})