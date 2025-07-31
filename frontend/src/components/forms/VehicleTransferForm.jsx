import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car,
  User,
  FileText,
  Upload,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Save,
  X,
  Plus,
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import VehicleLookup from './VehicleLookup';
import DocumentUploader from './DocumentUploader';
import PaymentProcessor from './PaymentProcessor';
import TransferConfirmation from './TransferConfirmation';

const VehicleTransferForm = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [useVehicleLookup, setUseVehicleLookup] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const [isApplicationComplete, setIsApplicationComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    // Vehicle Information
    vehicleRegNo: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    chassisNo: '',
    engineNo: '',
    vehicleColor: '',
    
    // Current Owner Information (pre-filled from user data)
    currentOwnerName: user?.name || '',
    currentOwnerNIC: user?.nic || '',
    currentOwnerEmail: user?.email || '',
    currentOwnerPhone: user?.phone || '',
    currentOwnerAddress: user?.address || '',
    
    // New Owner Information
    newOwnerName: '',
    newOwnerNIC: '',
    newOwnerEmail: '',
    newOwnerPhone: '',
    newOwnerAddress: '',
    newOwnerDistrict: '',
    newOwnerProvince: '',
    
    // Transfer Details
    transferType: 'sale', // sale, gift, inheritance
    transferReason: '',
    salePrice: '',
    agreementDate: '',
    
    // Documents
    documents: {
      vehicleRegistration: null,
      currentOwnerNIC: null,
      newOwnerNIC: null,
      saleAgreement: null,
      insurance: null,
      taxClearance: null,
      inspection: null
    },
    
    // Payment
    paymentMethod: 'card',
    acceptTerms: false,
    agreeToProcess: false
  });

  const steps = [
    { id: 1, name: 'Vehicle Lookup', icon: Search },
    { id: 2, name: 'Vehicle Details', icon: Car },
    { id: 3, name: 'Owner Information', icon: User },
    { id: 4, name: 'Transfer Details', icon: FileText },
    { id: 5, name: 'Documents', icon: Upload },
    { id: 6, name: 'Payment', icon: CreditCard }
  ];

  const requiredDocuments = [
    { key: 'vehicleRegistration', label: 'Vehicle Registration Certificate', required: true },
    { key: 'currentOwnerNIC', label: 'Current Owner NIC Copy', required: true },
    { key: 'newOwnerNIC', label: 'New Owner NIC Copy', required: true },
    { key: 'saleAgreement', label: 'Sale Agreement', required: formData.transferType === 'sale' },
    { key: 'insurance', label: 'Valid Insurance Certificate', required: true },
    { key: 'taxClearance', label: 'Tax Clearance Certificate', required: false },
    { key: 'inspection', label: 'Vehicle Inspection Report', required: false }
  ];

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern',
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    if (vehicle) {
      setFormData(prev => ({
        ...prev,
        vehicleRegNo: vehicle.regNo,
        vehicleMake: vehicle.make,
        vehicleModel: vehicle.model,
        vehicleYear: vehicle.year,
        chassisNo: vehicle.chassisNo,
        engineNo: vehicle.engineNo,
        vehicleColor: vehicle.color,
        currentOwnerName: vehicle.owner.name,
        currentOwnerNIC: vehicle.owner.nic,
        currentOwnerAddress: vehicle.owner.address
      }));
      setUseVehicleLookup(false);
    } else {
      // Manual entry mode
      setUseVehicleLookup(false);
    }
  };

  const handleDocumentUpload = (documentKey, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentKey]: file
      }
    }));
    showNotification(`${requiredDocuments.find(d => d.key === documentKey)?.label} uploaded successfully`, 'success');
  };

  const handleDocumentRemove = (documentKey) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentKey]: null
      }
    }));
    showNotification('Document removed', 'info');
  };

  const handlePaymentComplete = (result) => {
    setPaymentResult(result);
    if (result.success) {
      setIsApplicationComplete(true);
      showNotification('Payment successful! Application completed.', 'success');
    }
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    showNotification('Receipt downloaded successfully', 'success');
  };

  const handleStartNewTransfer = () => {
    // Reset form for new transfer
    setCurrentStep(1);
    setSelectedVehicle(null);
    setUseVehicleLookup(true);
    setPaymentResult(null);
    setIsApplicationComplete(false);
    setFormData({
      vehicleRegNo: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      chassisNo: '',
      engineNo: '',
      vehicleColor: '',
      currentOwnerName: user?.name || '',
      currentOwnerNIC: user?.nic || '',
      currentOwnerEmail: user?.email || '',
      currentOwnerPhone: user?.phone || '',
      currentOwnerAddress: user?.address || '',
      newOwnerName: '',
      newOwnerNIC: '',
      newOwnerEmail: '',
      newOwnerPhone: '',
      newOwnerAddress: '',
      newOwnerDistrict: '',
      newOwnerProvince: '',
      transferType: 'sale',
      transferReason: '',
      salePrice: '',
      agreementDate: '',
      documents: {
        vehicleRegistration: null,
        currentOwnerNIC: null,
        newOwnerNIC: null,
        saleAgreement: null,
        insurance: null,
        taxClearance: null,
        inspection: null
      },
      paymentMethod: 'card',
      acceptTerms: false,
      agreeToProcess: false
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        // Vehicle lookup step - always allow proceed
        return true;
      case 2:
        return formData.vehicleRegNo && formData.vehicleMake && formData.vehicleModel && 
               formData.vehicleYear && formData.chassisNo && formData.engineNo;
      case 3:
        return formData.newOwnerName && formData.newOwnerNIC && formData.newOwnerEmail && 
               formData.newOwnerPhone && formData.newOwnerAddress;
      case 4:
        return formData.transferType && formData.transferReason && 
               (formData.transferType !== 'sale' || formData.salePrice);
      case 5:
        const requiredDocs = requiredDocuments.filter(doc => doc.required);
        return requiredDocs.every(doc => formData.documents[doc.key]);
      case 6:
        return formData.acceptTerms && formData.agreeToProcess;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    } else {
      showNotification('Please fill in all required fields', 'error');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      showNotification('Please accept terms and conditions', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      showNotification('Transfer application submitted successfully!', 'success');
      navigate('/transfers');
    } catch (error) {
      showNotification('Failed to submit transfer application', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFees = () => {
    const baseFee = 8500;
    const expeditedFee = formData.expedited ? 2500 : 0;
    return baseFee + expeditedFee;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VehicleLookup
            onVehicleSelect={handleVehicleSelect}
            selectedVehicle={selectedVehicle}
          />
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Vehicle Information</h3>
            
            {selectedVehicle && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-800 font-medium">
                    Vehicle details populated from lookup: {selectedVehicle.regNo}
                  </span>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleRegNo}
                  onChange={(e) => handleInputChange('vehicleRegNo', e.target.value.toUpperCase())}
                  placeholder="e.g., ABC-1234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly={!!selectedVehicle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Make *
                </label>
                <select
                  value={formData.vehicleMake}
                  onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!selectedVehicle}
                >
                  <option value="">Select Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Mazda">Mazda</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Audi">Audi</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  placeholder="e.g., Aqua, Civic, March"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly={!!selectedVehicle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Manufacture *
                </label>
                <select
                  value={formData.vehicleYear}
                  onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!selectedVehicle}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chassis Number *
                </label>
                <input
                  type="text"
                  value={formData.chassisNo}
                  onChange={(e) => handleInputChange('chassisNo', e.target.value.toUpperCase())}
                  placeholder="17-character chassis number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly={!!selectedVehicle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Number *
                </label>
                <input
                  type="text"
                  value={formData.engineNo}
                  onChange={(e) => handleInputChange('engineNo', e.target.value.toUpperCase())}
                  placeholder="Engine number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly={!!selectedVehicle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Color
                </label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                  placeholder="e.g., White, Black, Silver"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly={!!selectedVehicle}
                />
              </div>
            </div>
            
            {selectedVehicle && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setSelectedVehicle(null);
                    setCurrentStep(1);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Search for a different vehicle
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Owner Information</h3>
            
            {/* Current Owner (Read-only) */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-3">Current Owner Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.currentOwnerName}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number</label>
                  <input
                    type="text"
                    value={formData.currentOwnerNIC}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* New Owner */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">New Owner Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.newOwnerName}
                    onChange={(e) => handleInputChange('newOwnerName', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    value={formData.newOwnerNIC}
                    onChange={(e) => handleInputChange('newOwnerNIC', e.target.value)}
                    placeholder="e.g., 952341234V or 199523412345"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.newOwnerEmail}
                    onChange={(e) => handleInputChange('newOwnerEmail', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.newOwnerPhone}
                    onChange={(e) => handleInputChange('newOwnerPhone', e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={formData.newOwnerAddress}
                    onChange={(e) => handleInputChange('newOwnerAddress', e.target.value)}
                    placeholder="Enter full address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={formData.newOwnerDistrict}
                    onChange={(e) => handleInputChange('newOwnerDistrict', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select
                    value={formData.newOwnerProvince}
                    onChange={(e) => handleInputChange('newOwnerProvince', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Transfer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Type *
                </label>
                <select
                  value={formData.transferType}
                  onChange={(e) => handleInputChange('transferType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sale">Sale</option>
                  <option value="gift">Gift</option>
                  <option value="inheritance">Inheritance</option>
                </select>
              </div>
              {formData.transferType === 'sale' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price (LKR) *
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    placeholder="Enter sale price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Date
                </label>
                <input
                  type="date"
                  value={formData.agreementDate}
                  onChange={(e) => handleInputChange('agreementDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Reason *
                </label>
                <textarea
                  value={formData.transferReason}
                  onChange={(e) => handleInputChange('transferReason', e.target.value)}
                  placeholder="Briefly explain the reason for transfer"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <DocumentUploader
            documents={formData.documents}
            onDocumentUpload={handleDocumentUpload}
            onDocumentRemove={handleDocumentRemove}
            requiredDocuments={requiredDocuments}
          />
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Review & Payment</h3>
            
            {/* Application Summary */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="ml-2 font-medium">{formData.vehicleRegNo} - {formData.vehicleMake} {formData.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-gray-600">Transfer Type:</span>
                  <span className="ml-2 font-medium capitalize">{formData.transferType}</span>
                </div>
                <div>
                  <span className="text-gray-600">From:</span>
                  <span className="ml-2 font-medium">{formData.currentOwnerName}</span>
                </div>
                <div>
                  <span className="text-gray-600">To:</span>
                  <span className="ml-2 font-medium">{formData.newOwnerName}</span>
                </div>
                {formData.transferType === 'sale' && (
                  <div>
                    <span className="text-gray-600">Sale Price:</span>
                    <span className="ml-2 font-medium">LKR {Number(formData.salePrice).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  I accept the Terms and Conditions and Privacy Policy
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToProcess"
                  checked={formData.agreeToProcess}
                  onChange={(e) => handleInputChange('agreeToProcess', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToProcess" className="text-sm text-gray-700">
                  I agree to process this application and understand that all information provided is accurate and complete
                </label>
              </div>
            </div>

            {/* Payment Processor */}
            <PaymentProcessor
              amount={calculateFees()}
              paymentMethod={formData.paymentMethod}
              onPaymentMethodChange={(method) => handleInputChange('paymentMethod', method)}
              onPaymentComplete={handlePaymentComplete}
              isProcessing={isLoading}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Show confirmation page if application is complete
  if (isApplicationComplete && paymentResult) {
    return (
      <TransferConfirmation
        applicationData={formData}
        paymentResult={paymentResult}
        onDownloadReceipt={handleDownloadReceipt}
        onStartNewTransfer={handleStartNewTransfer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Transfer Application</h1>
          <p className="mt-2 text-gray-600">
            Complete the form below to transfer vehicle ownership
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < 6 && (
              <button
                onClick={() => showNotification('Draft saved successfully', 'success')}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
            )}
            
            {currentStep < 6 && !paymentResult ? (
              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTransferForm;
