import { useState } from 'react';
import { Car, FileText, CreditCard, CheckCircle, ArrowRight, Play } from 'lucide-react';
import VehicleTransferForm from './VehicleTransferForm';

const VehicleTransferDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState('overview');

  const features = [
    {
      icon: Car,
      title: 'Smart Vehicle Lookup',
      description: 'Search for vehicles by registration number with instant results from the DMT database.',
      highlights: [
        'Real-time vehicle information retrieval',
        'Current owner verification',
        'Vehicle history display',
        'Manual entry fallback option'
      ]
    },
    {
      icon: FileText,
      title: 'Advanced Document Upload',
      description: 'Drag-and-drop document upload with preview, validation, and progress tracking.',
      highlights: [
        'Multiple file format support (PDF, JPG, PNG)',
        'Document preview and zoom functionality',
        'File size and format validation',
        'Upload progress tracking'
      ]
    },
    {
      icon: CreditCard,
      title: 'Integrated Payment System',
      description: 'Complete payment processing with multiple payment methods and instant confirmation.',
      highlights: [
        'Credit/Debit card processing',
        'Bank transfer integration',
        'Mobile payment options',
        'Secure payment validation'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Transfer Confirmation',
      description: 'Comprehensive confirmation with receipt generation and application tracking.',
      highlights: [
        'Detailed application summary',
        'Payment confirmation and receipt',
        'Processing timeline display',
        'Next steps guidance'
      ]
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Vehicle Lookup',
      description: 'Search and select vehicle by registration number',
      time: '1-2 minutes'
    },
    {
      step: 2,
      title: 'Vehicle Details',
      description: 'Verify or enter vehicle specifications',
      time: '2-3 minutes'
    },
    {
      step: 3,
      title: 'Owner Information',
      description: 'Enter new owner contact and address details',
      time: '3-4 minutes'
    },
    {
      step: 4,
      title: 'Transfer Details',
      description: 'Specify transfer type, reason, and agreement terms',
      time: '2-3 minutes'
    },
    {
      step: 5,
      title: 'Document Upload',
      description: 'Upload required documents with validation',
      time: '5-7 minutes'
    },
    {
      step: 6,
      title: 'Payment & Confirmation',
      description: 'Review, pay, and receive confirmation',
      time: '3-5 minutes'
    }
  ];

  if (showDemo) {
    return <VehicleTransferForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Vehicle Transfer Form
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete multi-step vehicle transfer process with smart lookup, document management, and integrated payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDemo(true)}
              className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              <Play className="h-5 w-5 mr-2" />
              Try Live Demo
            </button>
            <button
              onClick={() => setDemoStep('process')}
              className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              View Process Flow
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setDemoStep('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                demoStep === 'overview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Features Overview
            </button>
            <button
              onClick={() => setDemoStep('process')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                demoStep === 'process'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Process Flow
            </button>
            <button
              onClick={() => setDemoStep('features')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                demoStep === 'features'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Technical Features
            </button>
          </div>
        </div>

        {/* Content based on selected tab */}
        {demoStep === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {demoStep === 'process' && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Complete Transfer Process
            </h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.step} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        Estimated time: {step.time}
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-400 ml-4 mt-2" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-800 font-medium">
                    Total estimated completion time: 16-24 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {demoStep === 'features' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enhanced User Experience
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Smart Vehicle Lookup:</span>
                    <p className="text-sm text-gray-600">Instant vehicle data retrieval with owner verification</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Progressive Form Validation:</span>
                    <p className="text-sm text-gray-600">Real-time validation with clear error messaging</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Auto-save Functionality:</span>
                    <p className="text-sm text-gray-600">Save progress automatically to prevent data loss</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Mobile Responsive:</span>
                    <p className="text-sm text-gray-600">Optimized for all devices and screen sizes</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Document Management
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Drag & Drop Upload:</span>
                    <p className="text-sm text-gray-600">Intuitive file upload with progress indicators</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Document Preview:</span>
                    <p className="text-sm text-gray-600">Preview uploaded files with zoom and download options</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Format Validation:</span>
                    <p className="text-sm text-gray-600">Automatic file type and size validation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Requirement Tracking:</span>
                    <p className="text-sm text-gray-600">Visual indicators for required vs optional documents</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Integrated Payment System
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Multiple Payment Methods:</span>
                    <p className="text-sm text-gray-600">Card, bank transfer, and mobile payment options</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Secure Processing:</span>
                    <p className="text-sm text-gray-600">Encrypted payment data with PCI compliance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Real-time Validation:</span>
                    <p className="text-sm text-gray-600">Instant payment verification and confirmation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Receipt Generation:</span>
                    <p className="text-sm text-gray-600">Automatic receipt and confirmation generation</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Confirmation System
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Application Tracking:</span>
                    <p className="text-sm text-gray-600">Unique application ID with status tracking</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Timeline Estimation:</span>
                    <p className="text-sm text-gray-600">Realistic completion timeline with progress updates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Next Steps Guide:</span>
                    <p className="text-sm text-gray-600">Clear guidance on what happens next</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Communication Setup:</span>
                    <p className="text-sm text-gray-600">Email and SMS notifications configuration</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Experience the Complete Transfer Process
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              See how our enhanced vehicle transfer form streamlines the entire process
              from vehicle lookup to payment confirmation.
            </p>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Interactive Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTransferDemo;
