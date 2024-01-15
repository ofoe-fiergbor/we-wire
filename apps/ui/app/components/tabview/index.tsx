'use client'
import {useEffect, useState} from "react";
import {getMyWallets} from "@/libs/api/wallet";
import {currencies, currencyOrder, flagMapper, ITransaction, IWallet} from "@/app/components/tabview/constants";
import styles from './styles.module.css'
import Image from "next/image";
import {formatMoney, truncateString} from "@/libs/utils";
import refresh from '@/public/svg/refresh.svg'
import SearchInput from "@/app/components/search_input";
import {Button, DatePicker, DatePickerProps, Flex, Space, Spin, Table, TableProps} from "antd";
import {CloudDownloadOutlined} from "@ant-design/icons";
import {getTransactions} from "@/libs/api/transactions";
import {formatTransactionsToTable} from "@/app/components/tabview/util";
import dot from '@/public/svg/dot.svg'


const columns: TableProps['columns'] = [
    {
        title: 'Trx ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <>{truncateString(text)}</>,
    },
    {
        title: 'Trx Type',
        dataIndex: 'transactionType',
        key: 'transactionType',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text) => (
            <div className={styles.statusContainer}>
                <Image src={dot} alt={'dot'} />
                <p className={styles.statusText}>{text}</p>
            </div>
        )
    },
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date'
    },
];

export default function TabView() {
    const [selectedCurrency, setSelectedCurrency] = useState<currencies>('NGN');
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [wallets, setWallets] = useState<Array<IWallet>>()


    const fetchWallets = async () => {
        const res = await getMyWallets()
        const data = (await res.json()) as Array<IWallet>;
        const arrangedData: Array<IWallet> = []
        data.forEach(item => {
            arrangedData[currencyOrder[item.currency]] = item;
        })

        setWallets(arrangedData)
    }

    const fetchTransactions = async () => {
        const found = wallets?.find(wallet => wallet.currency === selectedCurrency)
        if (!found) return;
        const data = await getTransactions(found.id)
            .then(res => res.json())
            .catch(error => console.log(error));
        setTransactions(data.transactions)

    }

    useEffect(() => {
        fetchWallets()
    }, []);


    useEffect(() => {
        fetchTransactions()
    }, [selectedCurrency, wallets]);

    const onDateChange: DatePickerProps['onChange'] = (_: any, dateString: string) => {
        console.log(dateString);
    };

    return (
        <>
            {wallets ?
                <div>
                    <div className={styles.tabContainer}>
                        {wallets.map((wallet, index) => (
                            <div
                                key={index}
                                className={styles.tabHead}
                                style={{ background: wallet.currency === selectedCurrency ? 'var(--white)': ''}}
                                onClick={() => setSelectedCurrency(wallet.currency as currencies)}
                            >
                                <div className={styles.currency}>
                                    <Image src={flagMapper[wallet.currency]} alt={wallet.currency}/>
                                    <p>{wallet.currency}</p>
                                </div>
                                <div className={styles.amountContainer}>
                                    <h1 className={styles.amount}>{formatMoney(wallet.balance)}</h1>
                                    <div className={styles.dateContainer}>
                                        <Image src={refresh} alt={'refresh'}/>
                                        <p className={styles.date}>
                                            {new Date().toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.tabContent}>
                        <h3 className={styles.transactionHistoryText}>Transaction history</h3>
                        <div className={styles.actionBar}>
                            <SearchInput />
                            <div className={styles.rightActionBar}>
                                <DatePicker className={styles.datePicker} onChange={onDateChange} />
                                <Button size='large' icon={<CloudDownloadOutlined />}>
                                    Download
                                </Button>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <Table columns={columns} dataSource={formatTransactionsToTable(transactions)} />
                        </div>
                    </div>
                </div>
                : <Flex align="center" gap="middle">
                    <Spin size="large" />
                </Flex>
            }
        </>

    )
}
