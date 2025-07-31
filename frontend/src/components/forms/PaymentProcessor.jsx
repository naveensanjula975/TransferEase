import { useState } from 'react';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Lock,
  Clock,
  Receipt
} from 'lucide-react';

const PaymentProcessor = ({ 
  amount, 
  paymentMethod, 
  onPaymentMethodChange, 
  onPaymentComplete, 
  isProcessing 
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: ''
  });
  
  const [mobileDetails, setMobileDetails] = useState({
    mobileNumber: '',
    provider: 'dialog'
  });

  const [isSecureMode, setIsSecureMode] = useState(false);
  const [paymentStep, setPaymentStep] = useState('method'); // method, details, processing, complete

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePaymentDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return cardDetails.cardNumber.replace(/\s/g, '').length >= 16 &&
               cardDetails.expiryDate.length === 5 &&
               cardDetails.cvv.length >= 3 &&
               cardDetails.cardholderName.trim().length > 0;
      case 'bank':
        return bankDetails.bankName &&
               bankDetails.accountNumber.length >= 10 &&
               bankDetails.accountHolder.trim().length > 0;
      case 'mobile':
        return mobileDetails.mobileNumber.length >= 10 &&
               mobileDetails.provider;
      default:
        return false;
    }
  };

  const processPayment = async () => {
    if (!validatePaymentDetails()) {
      alert('Please fill in all required payment details');
      return;
    }

    setPaymentStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStep('complete');
        onPaymentComplete({
          success: true,
          transactionId: `TXN${Date.now()}`,
          amount,
          method: paymentMethod,
          timestamp: new Date()
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setPaymentStep('details');
      alert('Payment failed. Please try again.');
    }
  };

  const renderPaymentMethod = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
          <p className="text-sm text-gray-600 mb-6">
            Choose your preferred payment method to complete the transfer fee payment.
          </p>
        </div>

        <div className="space-y-3">
          {/* Credit/Debit Card */}
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            paymentMethod === 'card' 
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="sr-only"
            />
            <CreditCard className="h-6 w-6 text-blue-600 mr-4" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Credit/Debit Card</div>
              <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
            </div>
            <div className="text-sm text-green-600 font-medium">Instant</div>
          </label>

          {/* Bank Transfer */}
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            paymentMethod === 'bank' 
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="sr-only"
            />
            <Building2 className="h-6 w-6 text-green-600 mr-4" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Bank Transfer</div>
              <div className="text-sm text-gray-600">Direct bank account transfer</div>
            </div>
            <div className="text-sm text-orange-600 font-medium">1-2 Days</div>
          </label>

          {/* Mobile Payment */}
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            paymentMethod === 'mobile' 
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              value="mobile"
              checked={paymentMethod === 'mobile'}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="sr-only"
            />
            <Smartphone className="h-6 w-6 text-purple-600 mr-4" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Mobile Payment</div>
              <div className="text-sm text-gray-600">Dialog eZ Cash, Mobitel mCash</div>
            </div>
            <div className="text-sm text-green-600 font-medium">Instant</div>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setPaymentStep('details')}
            disabled={!paymentMethod}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderPaymentDetails = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
          <button
            onClick={() => setPaymentStep('method')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Change Method
          </button>
        </div>

        {/* Amount Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-gray-900">
              LKR {amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Card Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Secure</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                placeholder="John Silva"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Form */}
        {paymentMethod === 'bank' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-5 w-5 text-green-600" />
              <span className="font-medium">Bank Transfer</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name *
              </label>
              <select
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Bank</option>
                <option value="commercial">Commercial Bank</option>
                <option value="peoples">People's Bank</option>
                <option value="hnb">Hatton National Bank</option>
                <option value="sampath">Sampath Bank</option>
                <option value="dfcc">DFCC Bank</option>
                <option value="ndb">National Development Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                placeholder="123456789012"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name *
              </label>
              <input
                type="text"
                value={bankDetails.accountHolder}
                onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                placeholder="John Silva"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-orange-800 font-medium text-sm">Processing Time</p>
                  <p className="text-orange-700 text-sm">
                    Bank transfers may take 1-2 business days to process
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Payment Form */}
        {paymentMethod === 'mobile' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Mobile Payment</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Provider *
              </label>
              <select
                value={mobileDetails.provider}
                onChange={(e) => setMobileDetails({ ...mobileDetails, provider: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dialog">Dialog eZ Cash</option>
                <option value="mobitel">Mobitel mCash</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={mobileDetails.mobileNumber}
                onChange={(e) => setMobileDetails({ ...mobileDetails, mobileNumber: e.target.value })}
                placeholder="+94 77 123 4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-blue-800 font-medium text-sm">Secure Payment</p>
              <p className="text-blue-700 text-sm">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setPaymentStep('method')}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={processPayment}
            disabled={!validatePaymentDetails()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Pay LKR {amount.toLocaleString()}
          </button>
        </div>
      </div>
    );
  };

  const renderProcessing = () => {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-gray-600 mb-4">
          Please wait while we process your payment. Do not close this window.
        </p>
        <div className="text-sm text-gray-500">
          This may take a few moments...
        </div>
      </div>
    );
  };

  const renderComplete = () => {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. You will receive a confirmation email shortly.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Receipt className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Transaction ID</span>
          </div>
          <p className="text-lg font-mono text-gray-900">TXN{Date.now()}</p>
        </div>
      </div>
    );
  };

  if (paymentStep === 'processing') {
    return renderProcessing();
  }

  if (paymentStep === 'complete') {
    return renderComplete();
  }

  if (paymentStep === 'details') {
    return renderPaymentDetails();
  }

  return renderPaymentMethod();
};

export default PaymentProcessor;
