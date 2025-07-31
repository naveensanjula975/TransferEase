// Mock service for booking operations
class MockBookingService {
    constructor() {
        this.bookings = this.getInitialBookings();
    }

    getInitialBookings() {
        return [
            {
                id: 'BK-001',
                serviceType: 'transfer',
                title: 'Vehicle Transfer - Toyota Aqua',
                description: 'Transfer of ownership for Toyota Aqua (ABC-1234)',
                vehicleDetails: {
                    registrationNo: 'ABC-1234',
                    make: 'Toyota',
                    model: 'Aqua',
                    year: 2018,
                    chassisNo: 'JN1CV6EK7EM123456'
                },
                currentOwner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                },
                newOwner: {
                    name: 'Jane Smith',
                    nic: '851234567V',
                    contact: '+94 76 987 6543',
                    email: 'jane.smith@email.com'
                },
                appointmentDate: '2024-08-15T10:00:00Z',
                location: 'DMT Office - Colombo 07',
                status: 'confirmed',
                priority: 'normal',
                estimatedCost: 15000,
                paidAmount: 5000,
                remainingAmount: 10000,
                createdDate: '2024-07-25T09:15:00Z',
                lastUpdated: '2024-07-26T14:30:00Z',
                documents: [
                    { id: 'doc1', name: 'Vehicle Registration', status: 'verified', uploadDate: '2024-07-25T09:20:00Z' },
                    { id: 'doc2', name: 'Insurance Policy', status: 'verified', uploadDate: '2024-07-25T09:25:00Z' },
                    { id: 'doc3', name: 'NIC Copies', status: 'pending', uploadDate: '2024-07-25T09:30:00Z' }
                ],
                notes: 'All documents ready. Awaiting appointment confirmation.',
                officerAssigned: 'Officer K. Perera',
                referenceNumber: 'TRF-2024-001',
                paymentHistory: [
                    { date: '2024-07-25T10:00:00Z', amount: 5000, method: 'card', reference: 'PAY-001' }
                ]
            },
            {
                id: 'BK-002',
                serviceType: 'registration',
                title: 'New Vehicle Registration - Honda Vezel',
                description: 'First-time registration for imported Honda Vezel',
                vehicleDetails: {
                    registrationNo: 'Pending',
                    make: 'Honda',
                    model: 'Vezel',
                    year: 2020,
                    chassisNo: 'JHMRU6H39FS123456'
                },
                currentOwner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                },
                appointmentDate: '2024-08-20T14:00:00Z',
                location: 'DMT Office - Kandy',
                status: 'pending',
                priority: 'high',
                estimatedCost: 75000,
                paidAmount: 0,
                remainingAmount: 75000,
                createdDate: '2024-07-28T11:20:00Z',
                lastUpdated: '2024-07-30T16:45:00Z',
                documents: [
                    { id: 'doc4', name: 'Import Permit', status: 'verified', uploadDate: '2024-07-28T11:25:00Z' },
                    { id: 'doc5', name: 'Invoice', status: 'verified', uploadDate: '2024-07-28T11:30:00Z' },
                    { id: 'doc6', name: 'Insurance Policy', status: 'pending', uploadDate: '2024-07-28T11:35:00Z' }
                ],
                notes: 'Waiting for insurance policy verification.',
                officerAssigned: null,
                referenceNumber: 'REG-2024-002',
                paymentHistory: []
            },
            {
                id: 'BK-003',
                serviceType: 'inspection',
                title: 'Annual Vehicle Inspection - BMW X3',
                description: 'Annual safety and emission inspection',
                vehicleDetails: {
                    registrationNo: 'BMW-2019',
                    make: 'BMW',
                    model: 'X3',
                    year: 2019,
                    chassisNo: 'WBAXG9C50KD123456'
                },
                currentOwner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                },
                appointmentDate: '2024-08-10T09:30:00Z',
                location: 'Vehicle Testing Station - Gampaha',
                status: 'completed',
                priority: 'normal',
                estimatedCost: 3500,
                paidAmount: 3500,
                remainingAmount: 0,
                createdDate: '2024-07-20T13:45:00Z',
                lastUpdated: '2024-08-10T12:00:00Z',
                documents: [
                    { id: 'doc7', name: 'Vehicle Registration', status: 'verified', uploadDate: '2024-07-20T13:50:00Z' },
                    { id: 'doc8', name: 'Previous Inspection Report', status: 'verified', uploadDate: '2024-07-20T13:55:00Z' }
                ],
                notes: 'Inspection passed successfully. Certificate issued.',
                officerAssigned: 'Inspector M. Silva',
                referenceNumber: 'INS-2024-003',
                completedDate: '2024-08-10T11:45:00Z',
                paymentHistory: [
                    { date: '2024-07-20T14:00:00Z', amount: 3500, method: 'cash', reference: 'PAY-003' }
                ]
            },
            {
                id: 'BK-004',
                serviceType: 'license_renewal',
                title: 'Driving License Renewal',
                description: 'Renewal of driving license Class B1',
                appointmentDate: '2024-08-25T11:00:00Z',
                location: 'DMT Office - Galle',
                status: 'in_progress',
                priority: 'normal',
                estimatedCost: 2500,
                paidAmount: 2500,
                remainingAmount: 0,
                createdDate: '2024-07-22T10:30:00Z',
                lastUpdated: '2024-08-01T09:15:00Z',
                currentOwner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                },
                documents: [
                    { id: 'doc9', name: 'Current License', status: 'verified', uploadDate: '2024-07-22T10:35:00Z' },
                    { id: 'doc10', name: 'Medical Certificate', status: 'verified', uploadDate: '2024-07-22T10:40:00Z' },
                    { id: 'doc11', name: 'NIC Copy', status: 'verified', uploadDate: '2024-07-22T10:45:00Z' }
                ],
                notes: 'Medical examination completed. Processing new license.',
                officerAssigned: 'Officer R. Fernando',
                referenceNumber: 'LIC-2024-004',
                paymentHistory: [
                    { date: '2024-07-22T11:00:00Z', amount: 2500, method: 'card', reference: 'PAY-004' }
                ]
            },
            {
                id: 'BK-005',
                serviceType: 'transfer',
                title: 'Vehicle Transfer - Suzuki Alto',
                description: 'Transfer of ownership for Suzuki Alto (KL-5678)',
                vehicleDetails: {
                    registrationNo: 'KL-5678',
                    make: 'Suzuki',
                    model: 'Alto',
                    year: 2016,
                    chassisNo: 'MA3EW16SX60123456'
                },
                currentOwner: {
                    name: 'John Doe',
                    nic: '952341234V',
                    contact: '+94 77 123 4567',
                    email: 'john.doe@email.com'
                },
                newOwner: {
                    name: 'Mike Johnson',
                    nic: '751234567V',
                    contact: '+94 75 555 1234',
                    email: 'mike.johnson@email.com'
                },
                appointmentDate: '2024-07-30T15:00:00Z',
                location: 'DMT Office - Matara',
                status: 'cancelled',
                priority: 'normal',
                estimatedCost: 12000,
                paidAmount: 0,
                remainingAmount: 12000,
                createdDate: '2024-07-18T14:20:00Z',
                lastUpdated: '2024-07-29T10:00:00Z',
                documents: [
                    { id: 'doc12', name: 'Vehicle Registration', status: 'pending', uploadDate: '2024-07-18T14:25:00Z' }
                ],
                notes: 'Cancelled due to buyer withdrawal.',
                officerAssigned: null,
                referenceNumber: 'TRF-2024-005',
                cancelledDate: '2024-07-29T10:00:00Z',
                cancelReason: 'Buyer withdrew from purchase',
                paymentHistory: []
            }
        ];
    }

    // Simulate network delay
    delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get all bookings for current user
    async getUserBookings(userId = 'user-1') {
        await this.delay();
        // In real app, filter by userId
        return {
            success: true,
            data: this.bookings,
            total: this.bookings.length
        };
    }

    // Get booking by ID
    async getBookingById(bookingId) {
        await this.delay();
        const booking = this.bookings.find(b => b.id === bookingId);

        if (!booking) {
            return {
                success: false,
                error: 'Booking not found'
            };
        }

        return {
            success: true,
            data: booking
        };
    }

    // Create new booking
    async createBooking(bookingData) {
        await this.delay(1000);

        const newBooking = {
            id: `BK-${String(this.bookings.length + 1).padStart(3, '0')}`,
            ...bookingData,
            status: 'pending',
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            referenceNumber: this.generateReferenceNumber(bookingData.serviceType),
            documents: [],
            paymentHistory: [],
            paidAmount: 0,
            remainingAmount: bookingData.estimatedCost || 0
        };

        this.bookings.unshift(newBooking);

        return {
            success: true,
            data: newBooking,
            message: 'Booking created successfully'
        };
    }

    // Update booking status
    async updateBookingStatus(bookingId, newStatus, notes = '') {
        await this.delay();

        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) {
            return {
                success: false,
                error: 'Booking not found'
            };
        }

        this.bookings[bookingIndex] = {
            ...this.bookings[bookingIndex],
            status: newStatus,
            lastUpdated: new Date().toISOString(),
            notes: notes || this.bookings[bookingIndex].notes
        };

        if (newStatus === 'cancelled') {
            this.bookings[bookingIndex].cancelledDate = new Date().toISOString();
        }

        if (newStatus === 'completed') {
            this.bookings[bookingIndex].completedDate = new Date().toISOString();
        }

        return {
            success: true,
            data: this.bookings[bookingIndex],
            message: `Booking status updated to ${newStatus}`
        };
    }

    // Cancel booking
    async cancelBooking(bookingId, reason = '') {
        await this.delay();

        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) {
            return {
                success: false,
                error: 'Booking not found'
            };
        }

        if (!['pending', 'confirmed'].includes(this.bookings[bookingIndex].status)) {
            return {
                success: false,
                error: 'Booking cannot be cancelled in current status'
            };
        }

        this.bookings[bookingIndex] = {
            ...this.bookings[bookingIndex],
            status: 'cancelled',
            lastUpdated: new Date().toISOString(),
            cancelledDate: new Date().toISOString(),
            cancelReason: reason
        };

        return {
            success: true,
            data: this.bookings[bookingIndex],
            message: 'Booking cancelled successfully'
        };
    }

    // Reschedule booking
    async rescheduleBooking(bookingId, newDate, newLocation = null) {
        await this.delay();

        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) {
            return {
                success: false,
                error: 'Booking not found'
            };
        }

        if (!['pending', 'confirmed'].includes(this.bookings[bookingIndex].status)) {
            return {
                success: false,
                error: 'Booking cannot be rescheduled in current status'
            };
        }

        const updates = {
            appointmentDate: newDate,
            lastUpdated: new Date().toISOString()
        };

        if (newLocation) {
            updates.location = newLocation;
        }

        this.bookings[bookingIndex] = {
            ...this.bookings[bookingIndex],
            ...updates
        };

        return {
            success: true,
            data: this.bookings[bookingIndex],
            message: 'Booking rescheduled successfully'
        };
    }

    // Add payment
    async addPayment(bookingId, paymentData) {
        await this.delay();

        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) {
            return {
                success: false,
                error: 'Booking not found'
            };
        }

        const payment = {
            id: `PAY-${Date.now()}`,
            date: new Date().toISOString(),
            ...paymentData,
            reference: `PAY-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
        };

        this.bookings[bookingIndex].paymentHistory.push(payment);
        this.bookings[bookingIndex].paidAmount += paymentData.amount;
        this.bookings[bookingIndex].remainingAmount = Math.max(0,
            this.bookings[bookingIndex].estimatedCost - this.bookings[bookingIndex].paidAmount
        );
        this.bookings[bookingIndex].lastUpdated = new Date().toISOString();

        return {
            success: true,
            data: {
                booking: this.bookings[bookingIndex],
                payment: payment
            },
            message: 'Payment added successfully'
        };
    }

    // Get booking statistics
    async getBookingStats(userId = 'user-1') {
        await this.delay(300);

        const userBookings = this.bookings; // In real app, filter by userId

        const stats = {
            total: userBookings.length,
            pending: userBookings.filter(b => b.status === 'pending').length,
            confirmed: userBookings.filter(b => b.status === 'confirmed').length,
            inProgress: userBookings.filter(b => b.status === 'in_progress').length,
            completed: userBookings.filter(b => b.status === 'completed').length,
            cancelled: userBookings.filter(b => b.status === 'cancelled').length,
            totalPaid: userBookings.reduce((sum, b) => sum + b.paidAmount, 0),
            totalOutstanding: userBookings.reduce((sum, b) => sum + b.remainingAmount, 0)
        };

        // Calculate trends (mock data)
        stats.trends = {
            bookingsThisMonth: Math.floor(stats.total * 0.3),
            completionRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
            avgProcessingTime: '5.2 days'
        };

        return {
            success: true,
            data: stats
        };
    }

    // Search bookings
    async searchBookings(query, filters = {}) {
        await this.delay();

        let results = [...this.bookings];

        // Text search
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(booking =>
                booking.title.toLowerCase().includes(searchTerm) ||
                booking.description.toLowerCase().includes(searchTerm) ||
                booking.referenceNumber.toLowerCase().includes(searchTerm) ||
                booking.vehicleDetails?.registrationNo?.toLowerCase().includes(searchTerm) ||
                booking.vehicleDetails?.make?.toLowerCase().includes(searchTerm) ||
                booking.vehicleDetails?.model?.toLowerCase().includes(searchTerm)
            );
        }

        // Status filter
        if (filters.status && filters.status !== 'all') {
            results = results.filter(booking => booking.status === filters.status);
        }

        // Service type filter
        if (filters.serviceType && filters.serviceType !== 'all') {
            results = results.filter(booking => booking.serviceType === filters.serviceType);
        }

        // Date range filter
        if (filters.dateFrom) {
            results = results.filter(booking =>
                new Date(booking.appointmentDate) >= new Date(filters.dateFrom)
            );
        }

        if (filters.dateTo) {
            results = results.filter(booking =>
                new Date(booking.appointmentDate) <= new Date(filters.dateTo)
            );
        }

        // Priority filter
        if (filters.priority && filters.priority !== 'all') {
            results = results.filter(booking => booking.priority === filters.priority);
        }

        return {
            success: true,
            data: results,
            total: results.length,
            query,
            filters
        };
    }

    // Generate reference number
    generateReferenceNumber(serviceType) {
        const prefixes = {
            transfer: 'TRF',
            registration: 'REG',
            inspection: 'INS',
            license_renewal: 'LIC',
            document_verification: 'DOC'
        };

        const prefix = prefixes[serviceType] || 'BKG';
        const year = new Date().getFullYear();
        const sequence = String(this.bookings.length + 1).padStart(3, '0');

        return `${prefix}-${year}-${sequence}`;
    }

    // Get available appointment slots
    async getAvailableSlots(date, location) {
        await this.delay();

        // Mock available slots
        const slots = [
            { time: '09:00', available: true },
            { time: '09:30', available: true },
            { time: '10:00', available: false },
            { time: '10:30', available: true },
            { time: '11:00', available: true },
            { time: '11:30', available: false },
            { time: '14:00', available: true },
            { time: '14:30', available: true },
            { time: '15:00', available: true },
            { time: '15:30', available: false },
            { time: '16:00', available: true }
        ];

        return {
            success: true,
            data: slots.filter(slot => slot.available),
            date,
            location
        };
    }

    // Get service locations
    async getServiceLocations() {
        await this.delay(200);

        const locations = [
            {
                id: 'col-07',
                name: 'DMT Office - Colombo 07',
                address: '123 Galle Road, Colombo 07',
                services: ['transfer', 'registration', 'license_renewal'],
                workingHours: '9:00 AM - 4:00 PM',
                contact: '+94 11 234 5678'
            },
            {
                id: 'kandy',
                name: 'DMT Office - Kandy',
                address: '456 Peradeniya Road, Kandy',
                services: ['transfer', 'registration', 'license_renewal'],
                workingHours: '9:00 AM - 4:00 PM',
                contact: '+94 81 123 4567'
            },
            {
                id: 'gampaha',
                name: 'Vehicle Testing Station - Gampaha',
                address: '789 Colombo Road, Gampaha',
                services: ['inspection'],
                workingHours: '8:00 AM - 5:00 PM',
                contact: '+94 33 987 6543'
            },
            {
                id: 'galle',
                name: 'DMT Office - Galle',
                address: '321 Wakwella Road, Galle',
                services: ['transfer', 'registration', 'license_renewal'],
                workingHours: '9:00 AM - 4:00 PM',
                contact: '+94 91 456 7890'
            },
            {
                id: 'matara',
                name: 'DMT Office - Matara',
                address: '654 Tangalle Road, Matara',
                services: ['transfer', 'registration'],
                workingHours: '9:00 AM - 4:00 PM',
                contact: '+94 41 654 3210'
            }
        ];

        return {
            success: true,
            data: locations
        };
    }
}

// Create singleton instance
const mockBookingService = new MockBookingService();

export default mockBookingService;
