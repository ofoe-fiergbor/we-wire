import wallet from '@/public/svg/wallet.svg'
import conversions from '@/public/svg/conversions.svg'
import balances from '@/public/svg/balances.svg'
import {StaticImageData} from "next/image";

export const stepperIcon: Record<string, StaticImageData> = {
    'wallets': wallet,
    'conversions': conversions,
    'balances': balances,
}
