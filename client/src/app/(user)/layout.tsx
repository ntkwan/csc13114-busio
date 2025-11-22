import { Header, Footer } from '@/components/common';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function Home({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen main-content space-y-4 xl:space-y-12 px-8 xl:px-0">
                {children}
            </main>
            <Footer />
        </>
    );
}
