import search from '@/public/svg/search.svg'
import Image from "next/image";
import styles from './styles.module.css'

export default function SearchInput() {
    return (
        <div className={styles.container}>
            <Image className={styles.image} height={20} width={20} src={search} alt="search-icon"/>
            <input
                placeholder="Search by transaction ID"
                className={styles.input} type="text"/>
        </div>
    )
}
