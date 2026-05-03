// Application Logic for PXL Handshake POC

const { createApp, ref, reactive, computed, onMounted, onUnmounted, watch } = Vue;

// --- Crypto Service (Security & GDPR) ---
// In a real app, the secret key would be securely delivered to authorized company devices.
// For the POC, we use a hardcoded key.
const SECRET_KEY = "PXL_HANDSHAKE_SECURE_KEY_2026";

const CryptoService = {
    encrypt(data) {
        try {
            const jsonStr = JSON.stringify(data);
            return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
        } catch (e) {
            console.error("Encryption failed:", e);
            return null;
        }
    },
    decrypt(ciphertext) {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
            const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedStr);
        } catch (e) {
            console.error("Decryption failed:", e);
            return null;
        }
    }
};

// --- Storage Service (Robustness / Offline-First) ---
// Configures localforage to use IndexedDB
localforage.config({
    name: 'PXL_Handshake_DB',
    storeName: 'scans_queue'
});

const App = createApp({
    setup() {
        // Global State
        const currentView = ref('home'); // 'home', 'student', 'company'
        const isOnline = ref(navigator.onLine);
        
        // --- Network Monitoring ---
        const updateOnlineStatus = () => {
            isOnline.value = navigator.onLine;
            if (isOnline.value && currentView.value === 'company') {
                // Auto-sync when coming back online
                forceSync();
            }
        };

        onMounted(() => {
            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });

        onUnmounted(() => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            stopScanner();
            stopQRInterval();
        });

        // --- Student View State ---
        const student = reactive({
            hasConsent: false,
            consentGiven: false,
            studentId: '12345678', // Mock student ID
            name: 'Joep Vermeij',
            timeRemaining: 30,
            isRefreshing: false
        });

        let qrCodeInstance = null;
        let qrInterval = null;
        let timerInterval = null;

        const grantConsent = () => {
            if (student.consentGiven) {
                student.hasConsent = true;
                setTimeout(generateDynamicQR, 100); // Wait for DOM to render QR div
            }
        };

        // Generate Dynamic QR Code (Fraud Prevention)
        const generateDynamicQR = () => {
            const qrContainer = document.getElementById('qrcode');
            if (!qrContainer) return;

            student.isRefreshing = true;
            qrContainer.innerHTML = ''; // Clear previous

            // The data includes a timestamp to prevent replay attacks (screenshots)
            const payload = {
                id: student.studentId,
                name: student.name,
                timestamp: Date.now(),
                // In a real app, this would be cryptographically signed by the backend
                signature: CryptoJS.SHA256(`${student.studentId}-${Date.now()}-${SECRET_KEY}`).toString()
            };

            const qrDataStr = JSON.stringify(payload);

            qrCodeInstance = new QRCode(qrContainer, {
                text: qrDataStr,
                width: 256,
                height: 256,
                colorDark: "#0F172A",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            student.isRefreshing = false;
            student.timeRemaining = 30;

            startQRInterval();
        };

        const startQRInterval = () => {
            stopQRInterval();
            timerInterval = setInterval(() => {
                student.timeRemaining--;
                if (student.timeRemaining <= 0) {
                    generateDynamicQR(); // Refresh the code
                }
            }, 1000);
        };

        const stopQRInterval = () => {
            if (timerInterval) clearInterval(timerInterval);
        };

        // --- Company View State ---
        const company = reactive({
            scans: [],
            lastScanStatus: null, // { type: 'success' | 'error', message: '' }
            isSyncing: false
        });

        let html5QrcodeScanner = null;

        const pendingScansCount = computed(() => {
            return company.scans.filter(s => !s.synced).length;
        });

        const loadScansFromIndexedDB = async () => {
            try {
                const keys = await localforage.keys();
                const loadedScans = [];
                for (let key of keys) {
                    const encryptedData = await localforage.getItem(key);
                    const decryptedData = CryptoService.decrypt(encryptedData);
                    if (decryptedData) {
                        loadedScans.push(decryptedData);
                    }
                }
                // Sort newest first
                company.scans = loadedScans.sort((a, b) => b.scanTime - a.scanTime);
            } catch (err) {
                console.error("Error loading from IndexedDB:", err);
            }
        };

        const startScanner = () => {
            if (html5QrcodeScanner) return; // Already running

            html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: {width: 250, height: 250} },
                /* verbose= */ false
            );

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
        };

        const stopScanner = () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch(e => console.error(e));
                html5QrcodeScanner = null;
            }
        };

        // Process Scan
        const onScanSuccess = async (decodedText, decodedResult) => {
            try {
                // Safely attempt to pause if a camera is active
                if (html5QrcodeScanner && html5QrcodeScanner.getState && html5QrcodeScanner.getState() === 2) {
                    html5QrcodeScanner.pause(true);
                }
            } catch(e) {
                console.log("Could not pause scanner (likely file scan):", e);
            }

            try {
                const payload = JSON.parse(decodedText);
                
                // Fraud Protection: Check if QR is too old (e.g., > 35 seconds to allow network latency)
                const ageInSeconds = (Date.now() - payload.timestamp) / 1000;
                
                if (ageInSeconds > 35) {
                    company.lastScanStatus = { type: 'error', message: `Scan rejected. QR code expired (${Math.round(ageInSeconds)}s old). Fraud detected.` };
                } else {
                    // Check signature validity
                    const expectedSignature = CryptoJS.SHA256(`${payload.id}-${payload.timestamp}-${SECRET_KEY}`).toString();
                    if (payload.signature !== expectedSignature) {
                        company.lastScanStatus = { type: 'error', message: 'Scan rejected. Invalid signature.' };
                    } else {
                        // Check for duplicates
                        const isDuplicate = company.scans.some(s => s.studentId === payload.id);
                        if (isDuplicate) {
                            company.lastScanStatus = { type: 'error', message: 'Student already scanned.' };
                        } else {
                            // Create Scan Record
                            const scanRecord = {
                                id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                                studentId: payload.id,
                                studentName: payload.name,
                                timestamp: payload.timestamp,
                                scanTime: Date.now(),
                                synced: false
                            };

                            // Encrypt for secure local storage (GDPR requirement)
                            const encryptedRecord = CryptoService.encrypt(scanRecord);
                            await localforage.setItem(scanRecord.id, encryptedRecord);
                            
                            // Update UI state
                            company.scans.unshift(scanRecord);
                            company.lastScanStatus = { type: 'success', message: `Successfully captured: ${payload.name}` };
                            
                            // If online, attempt immediate sync
                            if (isOnline.value) {
                                forceSync();
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Scan processing error:", err);
                company.lastScanStatus = { type: 'error', message: 'Invalid QR code format or not a PXL QR.' };
            }

            // Safely attempt to resume scanner after brief delay
            setTimeout(() => {
                try {
                    if (html5QrcodeScanner && html5QrcodeScanner.getState && html5QrcodeScanner.getState() === 2) {
                        html5QrcodeScanner.resume();
                    }
                } catch(e) {}
            }, 2000);
        };

        const onScanFailure = (error) => {
            // Ignore ongoing scan failures
        };

        const forceSync = async () => {
            if (!isOnline.value || pendingScansCount.value === 0 || company.isSyncing) return;
            
            company.isSyncing = true;
            
            // Mocking a network request to the backend
            setTimeout(async () => {
                const pending = company.scans.filter(s => !s.synced);
                
                for (let scan of pending) {
                    // Update the local record to mark as synced
                    scan.synced = true;
                    const encryptedRecord = CryptoService.encrypt(scan);
                    await localforage.setItem(scan.id, encryptedRecord);
                }
                
                company.isSyncing = false;
                console.log(`Synced ${pending.length} records securely to the backend.`);
            }, 1500); // 1.5s simulated network delay
        };

        // Utility
        const formatTime = (ts) => {
            return new Date(ts).toLocaleTimeString();
        };

        // View Routing Logic
        watch(currentView, async (newVal, oldVal) => {
            if (oldVal === 'company') stopScanner();
            if (oldVal === 'student') stopQRInterval();

            if (newVal === 'student' && student.hasConsent) {
                setTimeout(generateDynamicQR, 100);
            }

            if (newVal === 'company') {
                await loadScansFromIndexedDB();
                setTimeout(startScanner, 100);
            }
        });

        return {
            currentView,
            isOnline,
            student,
            company,
            grantConsent,
            formatTime,
            pendingScansCount,
            forceSync
        };
    }
});

App.mount('#app');
