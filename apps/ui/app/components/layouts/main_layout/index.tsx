
import styles from './styles.module.css';
import {FC, ReactNode, useEffect, useState} from "react";
import logo from '@/public/svg/logo.svg'
import Image from "next/image";
import {IMenuItem, menuItems} from "@/app/components/layouts/main_layout/constants";
import {usePathname, useRouter} from "next/navigation";
import Navbar from "../../navbar";
import {me} from "@/libs/api/auth";

interface Props {
    children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            const res = await me();
            if (res.status === 401) {
                router.replace('auth')
                return;
            }
            const data = await res.json();
            localStorage.setItem('user_id', data.sub)
        })();
    }, [pathname, router]);

    return (
        <section className={styles.container}>
            <div className={styles.sideBarContainer}>
                <div>
                    <div className={styles.logoContainer}>
                        <Image className={styles.logo} src={logo} alt='we-wire-logo' />
                    </div>
                    {menuItems.map(menuItem => <MenuItem
                        key={menuItem.route}
                        menuItem={menuItem}
                    />
                    )}
                </div>
            </div>
            <div className={styles.mainContainer}>
                <Navbar />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </section>
    );
};

const MenuItem = ({menuItem}:{menuItem: IMenuItem}) => {
    const pathname = usePathname();

    return (
        <div
            style={{
                background: pathname === menuItem.route
                    ? 'var(--primary-extra-light)'
                    : ''
            }}
            className={styles.menuItem}
            key={menuItem.route}
        >
            <Image src={menuItem.icon} alt={menuItem.label}/>
            <p className={styles.menuItemLabel}>{menuItem.label}</p>
        </div>
    )
}
export default MainLayout;
