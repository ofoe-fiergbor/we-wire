import {Button, Drawer, InputNumber, Select} from 'antd';
import styles from './styles.module.css'
import {CloseOutlined} from "@ant-design/icons";
import {CurrencyType} from "@/libs/constants";
import exchange from '@/public/svg/exchange.svg'
import Image from "next/image";
import {Exchange, IWallet} from "@/app/components/tabview/constants";

interface Props {
    exchanges?: Exchange[];
    open: boolean;
    fee: number;
    onClose: () => void;
    selectedWallet?: IWallet;
    fromCurrencyType?: CurrencyType;
    setFromCurrencyType: (val: CurrencyType) => void
    toCurrencyType?: CurrencyType;
    setToCurrencyType: (val: CurrencyType) => void
    setAmount: (val: number) => void;
}
export default function CreateTransactionDrawer(
    {
    exchanges,
    fromCurrencyType,
    setFromCurrencyType,
    toCurrencyType,
    setToCurrencyType,
    open,
    onClose,
    selectedWallet,
    setAmount,
    fee,
    }: Props
) {
    const currencies = Object.keys(CurrencyType);
    return (
        <Drawer closable={false} width={440} onClose={onClose} open={open}>
            <div className={styles.header}>
                <h2 className={styles.headerText}>Convert funds</h2>
                <CloseOutlined onClick={onClose}/>
            </div>
            <div className={styles.body}>
                <Pair currencies={currencies} label={'Source wallet'}
                      selected={fromCurrencyType}
                      setAmount={setAmount}
                      onSelect={val => setFromCurrencyType(val as CurrencyType)}/>
                <div className={styles.level1}>
                    <Image src={exchange} alt={'exchange'} />
                </div>
                <Pair currencies={currencies} label={'Destination wallet'}
                      selected={toCurrencyType}
                      setAmount={() => {}}
                      onSelect={val => setToCurrencyType(val as CurrencyType)}/>
            </div>
            {selectedWallet ?
                <div>
                    <p className={styles.balance}>Available
                        balance: {selectedWallet.currency} {selectedWallet.balance}</p>
                    {exchanges ?
                        <div className={styles.summery}>
                            <div>
                                <p className={styles.balance}>Exchange rate:</p>
                                <p className={styles.summeryTex}>
                                    1 {exchanges[0].fromCurrency} = {exchanges[0].rate} {exchanges[0].toCurrency}
                                </p>
                                <p className={styles.summeryTex}>
                                    1 {exchanges[1].fromCurrency} = {exchanges[1].rate} {exchanges[1].toCurrency}
                                </p>
                            </div>
                            <div>
                                <p className={styles.balance}>Transaction fee:</p>
                                <p className={styles.summeryTex}>{selectedWallet.currency} {fee}</p>
                            </div>
                            <div>
                                <p className={styles.balance}>Estimated arrival:</p>
                                <p className={styles.summeryTex}>11/04/2023, 12:50</p>
                            </div>
                        </div>
                        : <div/>
                    }</div>
                    : <div/>}
                    <Button className={styles.submitButton} size={"large"} type="primary">Convert</Button>
                </Drawer>
                );
            }

const Pair = (
    {currencies, label, onSelect, selected, setAmount}:
        {
            currencies: string[],
            label: string;
            onSelect: (val: string) => void,
            selected?: string,
            setAmount: (val: number) => void
        }
) => {
    return (
        <div>
            <p className={styles.label}>{label}</p>
            <div className={styles.pairContainer}>
                <Select
                    defaultValue={selected ?? currencies[0]}
                    className={styles.input}
                    onChange={onSelect}
                    options={currencies.map(curr => ({value: curr, label: curr}))}
                />
                <InputNumber
                    className={styles.input}
                    size="middle"
                    min={1}
                    defaultValue={0}
                    onChange={setAmount}/>
            </div>
        </div>
    )
}
