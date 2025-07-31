import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  FileText, 
  AlertCircle,
  Receipt,
  Car,
  User,
  CreditCard,
  Smartphone
} from 'lucide-react';

const TransferConfirmation = ({ 
  applicationData, 
  paymentResult, 
  onDownloadReceipt, 
  onStartNewTransfer 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [estimatedCompletion, setEstimatedCompletion] = useState('');

  useEffect(() => {
    // Calculate estimated completion date (7-14 business days)
    const today = new Date();
    const businessDays = 10; // Average 10 business days
    const estimatedDate = new Date();
    
    let daysAdded = 0;
    let currentDate = new Date(today);
    
    while (daysAdded < businessDays) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    setEstimatedCompletion(currentDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  const formatCurrency = (amount) => {
    return `LKR ${amount.toLocaleString()}`;
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank':
        return <FileText className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bank':
        return 'Bank Transfer';
      case 'mobile':
        return 'Mobile Payment';
      default:
        return 'Online Payment';
    }
  };

  const generateApplicationId = () => {
    return `VT${Date.now().toString().slice(-8)}`;
  };

  const nextSteps = [
    {
      step: 1,
      title: 'Document Verification',
      description: 'Our team will review and verify all submitted documents',
      timeframe: '1-2 business days',
      status: 'pending'
    },
    {
      step: 2,
      title: 'Vehicle Inspection',
      description: 'Physical inspection of the vehicle (if required)',
      timeframe: '3-5 business days',
      status: 'waiting'
    },
    {
      step: 3,
      title: 'Transfer Processing',
      description: 'Official transfer of ownership in DMT records',
      timeframe: '2-3 business days',
      status: 'waiting'
    },
    {
      step: 4,
      title: 'New Registration',
      description: 'Issue new registration documents to new owner',
      timeframe: '2-3 business days',
      status: 'waiting'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 text-lg">
            Your vehicle transfer application has been received and payment processed.
          </p>
        </div>

        {/* Application Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Application Summary</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Submitted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Receipt className="h-4 w-4 mr-2" />
                Application Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Application ID:</dt>
                  <dd className="font-medium text-gray-900">{generateApplicationId()}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Submitted:</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600">Estimated Completion:</dt>
                  <dd className="font-medium text-green-600">{estimatedCompletion}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Vehicle Information
              </h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Registration No:</dt>
                  <dd className="font-medium text-gray-900">{applicationData.vehicleRegNo}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Vehicle:</dt>
                  <dd className="font-medium text-gray-900">
                    {applicationData.vehicleYear} {applicationData.vehicleMake} {applicationData.vehicleModel}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600">Transfer Type:</dt>
                  <dd className="font-medium text-gray-900 capitalize">{applicationData.transferType}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Current Owner</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{applicationData.currentOwnerName}</p>
                  <p>NIC: {applicationData.currentOwnerNIC}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">New Owner</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{applicationData.newOwnerName}</p>
                  <p>NIC: {applicationData.newOwnerNIC}</p>
                  <p>{applicationData.newOwnerEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Confirmation</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium text-green-800">Payment Successful</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Transaction ID:</dt>
                  <dd className="font-medium text-gray-900">{paymentResult.transactionId}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Amount Paid:</dt>
                  <dd className="font-medium text-gray-900">{formatCurrency(paymentResult.amount)}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Payment Method:</dt>
                  <dd className="font-medium text-gray-900 flex items-center">
                    {getPaymentMethodIcon(paymentResult.method)}
                    <span className="ml-2">{getPaymentMethodName(paymentResult.method)}</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600">Payment Date:</dt>
                  <dd className="font-medium text-gray-900">
                    {paymentResult.timestamp.toLocaleDateString('en-GB')}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600">Payment Time:</dt>
                  <dd className="font-medium text-gray-900">
                    {paymentResult.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === 'pending' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.timeframe}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 mb-2">Important Information</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Keep your application ID safe for future reference</li>
                <li>• You will receive email updates at each stage of processing</li>
                <li>• Original documents may be required for verification</li>
                <li>• Processing times may vary based on workload and verification requirements</li>
                <li>• Contact our support team if you have any questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onDownloadReceipt}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Print Confirmation
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Vehicle Transfer Application',
                  text: `Application ID: ${generateApplicationId()}`,
                  url: window.location.href
                });
              }
            }}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>

        {/* Navigation Options */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need to transfer another vehicle or want to track this application?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onStartNewTransfer}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start New Transfer
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help? Contact our support team at{' '}
            <a href="mailto:support@transferease.gov.lk" className="text-blue-600 hover:text-blue-800">
              support@transferease.gov.lk
            </a>{' '}
            or call{' '}
            <a href="tel:+94112345678" className="text-blue-600 hover:text-blue-800">
              +94 11 234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmation;
