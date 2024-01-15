'use client';
import {ReactNode} from 'react';
import MainLayout from "@/app/components/layouts/main_layout";

export default function WalletsPageLayout({
  children,
}: {
    children: ReactNode;
}) {
    return (
        <main>
            <MainLayout>
                {children}
            </MainLayout>
        </main>
    );
}
