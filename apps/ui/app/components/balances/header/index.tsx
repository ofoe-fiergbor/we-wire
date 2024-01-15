'use client'
import styles from './styles.module.css'
import Image from "next/image";
import convert from '@/public/svg/convert.svg'
import CreateTransactionDrawer from "@/app/components/drawer";
import {useEffect, useState} from "react";
import {CurrencyType} from "@/libs/constants";
import {Exchange, IWallet} from "@/app/components/tabview/constants";
import {getWallet} from "@/libs/api/wallet/getWallet";
import {getExchangeRate} from "@/libs/api/exchange_rate/getExchangeRate";
import {getFee} from "@/libs/api/transactions/getFee";

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [fromCurr, setFromCurr] = useState<CurrencyType | undefined>()
    const [toCurr, setToCurr] = useState<CurrencyType | undefined>()
    const [fromWallet, setFromWallet] = useState<IWallet>()
    const [exchanges, setExchanges] = useState<Exchange[]>()
    const [amount, setAmount] = useState(0)
    const [transactionFee, setTransactionFee] = useState(0)

    const fetchWallet = async () => {
        if (!fromCurr) return;
        const res = await getWallet(fromCurr)
            .then(res => res.json())
            .catch(error => console.log(error));
        setFromWallet(res);
    }

    const fetchExchangeRate = async () => {
        if (!fromCurr || !toCurr) return;
        if (fromCurr === toCurr) return;
        const data = await getExchangeRate(fromCurr, toCurr)
            .then(res => res.json())
            .catch(error => console.log(error));
        setExchanges(data)
    }

    useEffect(() => {
        fetchWallet()
    }, [fromCurr]);

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurr, toCurr]);

    const onCloseDrawer = () => {
        setIsDrawerOpen(false)
    }

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <h1 className={styles.title}>Wallets</h1>
                    <p className={styles.subTitle}>View your balances and transaction history</p>
                </div>
                <div onClick={openDrawer} className={styles.button}>
                    <Image src={convert} alt={'convert'}/>
                    <p>Convert</p>
                </div>
            </div>
            <CreateTransactionDrawer
                setToCurrencyType={setToCurr}
                toCurrencyType={toCurr}
                selectedWallet={fromWallet}
                fromCurrencyType={fromCurr}
                setFromCurrencyType={setFromCurr}
                open={isDrawerOpen}
                onClose={onCloseDrawer}
                exchanges={exchanges}
                fee={amount * 0.001}
                setAmount={setAmount}
            />
        </>
    )
}
