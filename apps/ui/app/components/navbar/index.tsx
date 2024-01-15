import Stepper from "@/app/components/stepper";
import styles from './styles.module.css'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {useRouter} from "next/navigation";
import Image from "next/image";
import bell from '@/public/svg/bell.svg'
import account from '@/public/svg/account.svg'


export default function Navbar(){
    const router = useRouter();

    const logout = () => {
        localStorage.clear();
        router.replace('/auth')
    }

    const items: MenuProps['items'] = [
        {
            label: <a onClick={logout}>Logout</a>,
            key: '0',
        },
    ];

    return (
        <nav className={styles.container}>
            <Stepper />
            <div className={styles.right}>
                <div className={styles.bell}>
                    <div className={styles.bellInner}>
                        <Image src={bell} alt={'notifications'} />
                    </div>
                </div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a className={styles.dropdownContainer} onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className={styles.dropdownDisplay}>
                                <div className={styles.dropdownDisplayIconContainer}>
                                    <Image src={account} alt={'account'} />
                                </div>
                                <p className={styles.dropdownDisplayLabel}>Account</p>
                            </div>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </nav>
    );
}
