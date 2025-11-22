import { Metadata } from 'next';
import { fontsVariables } from './fonts';
// import { StoreProvider } from "@/shared/providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'BusIO',
    description: 'BusIO - Bus Ticket Booking Application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${fontsVariables.join(' ')} antialiased`} suppressHydrationWarning>
                {/* <AuthProvider> */}
                {/* <StoreProvider> */}
                {children}
                {/* </StoreProvider> */}
                {/* </AuthProvider> */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    aria-label="Notification"
                    toastStyle={{
                        color: 'white',
                    }}
                />
            </body>
        </html>
    );
}
