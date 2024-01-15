import styles from './styles.module.css'
import Header from "@/app/components/balances/header";
import TabView from "@/app/components/tabview";

export default function Wallets(){

    return (
        <section className={styles.container}>
            <Header />
            <TabView />
        </section>
    )
}
