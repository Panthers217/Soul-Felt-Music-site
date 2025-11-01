import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useUserLogin } from '../hooks/useUserLogin';
import { auth } from '../firebase';

// Initialize Stripe (you'll need to add your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

// Checkout Form Component
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUserLogin();
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: user?.email || '',
    name: user?.displayName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Validate customer info
    if (!customerInfo.email || !customerInfo.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setProcessing(true);

    try {
      // Get Firebase auth token if user is logged in
      const token = user ? await auth.currentUser?.getIdToken() : null;
      
      // Create payment intent on your backend
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          amount: Math.round(finalTotal * 100), // Convert to cents
          cart: cart,
          customerInfo: customerInfo,
          userEmail: user?.email // Send user email for database lookup
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: customerInfo.country,
            },
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful! Thank you for your purchase.');
        clearCart();
        navigate('/order-confirmation', { state: { paymentIntent } });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-card-bg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-text-primary font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="John Doe"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-card-bg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Billing Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="123 Main St"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">State</label>
              <input
                type="text"
                name="state"
                value={customerInfo.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="NY"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={customerInfo.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="10001"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Country</label>
              <select
                name="country"
                value={customerInfo.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-card-bg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Payment Details</h2>
        <div className="bg-background p-4 rounded-lg border border-primary">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#fffced',
                  '::placeholder': {
                    color: '#fffced80',
                  },
                },
                invalid: {
                  color: '#ff6b6b',
                },
              },
            }}
          />
        </div>
        <p className="text-text-secondary text-sm mt-3 flex items-center gap-2">
          <span className="i-lucide-shield-check"></span>
          Your payment information is secure and encrypted
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-card-bg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Order Summary</h2>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-text-primary">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-text-primary">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-primary pt-3 flex justify-between text-accent font-bold text-xl">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full py-4 bg-primary hover:bg-secondary text-accent rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="i-lucide-loader-2 animate-spin"></span>
              Processing...
            </span>
          ) : (
            `Pay $${finalTotal.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}

// Main Checkout Component
function Checkout() {
  const { cart, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-card-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="i-lucide-shopping-cart text-4xl text-primary"></span>
          </div>
          <h2 className="text-3xl font-bold text-accent mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-6">Add some items to get started</p>
          <button
            onClick={() => navigate('/store')}
            className="px-6 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Checkout</h1>
          <p className="text-text-secondary">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-card-bg rounded-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-accent mb-4">Your Cart ({cart.length})</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 pb-4 border-b border-background">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-text-primary font-semibold line-clamp-2">{item.title}</h3>
                      <p className="text-text-secondary text-sm">{item.type}</p>
                      <p className="text-primary font-bold mt-1">{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                      title="Remove from cart"
                    >
                      <span className="i-lucide-trash-2 text-xl"></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Form - Right Side */}
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
