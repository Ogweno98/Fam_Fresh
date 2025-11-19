export default function startInlinePayment({
  amount,
  currency,
  tx_ref,
  customer,
  onSuccess,
  onError
}) {
  if (!window.FlutterwaveCheckout) {
    alert('Flutterwave script not loaded');
    return;
  }

  const publicKey = import.meta.env.VITE_FLW_PUBLIC_KEY;
  if (!publicKey) {
    alert('Flutterwave public key not configured');
    return;
  }

  window.FlutterwaveCheckout({
    public_key: publicKey,
    tx_ref,
    amount,
    currency,
    payment_options: 'card, mobilemoney, ussd',
    customer,
    customizations: {
      title: 'FamFresh Order',
      description: 'Payment for farm produce',
      logo: '/assets/famfresh-logo.svg'
    },
    callback: function (data) {
      if (data.status === 'successful') {
        onSuccess(data);
      } else {
        onError(data);
      }
    },
    onclose: function () {
      console.log('Payment modal closed');
    }
  });
}
