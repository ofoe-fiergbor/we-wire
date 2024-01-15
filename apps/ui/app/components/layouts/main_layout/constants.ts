import wallet from '@/public/svg/wallet.svg'
import conversions from '@/public/svg/conversions.svg'
import {StaticImageData} from "next/image";

export type IMenuItem = {
    label: string;
    route: string;
    icon: StaticImageData
}
export const menuItems: IMenuItem[] = [
    {route: '/wallets/balances', label: 'Wallets', icon: wallet},
    {route: '/conversions', label: 'Conversions', icon: conversions},
]
