import {ReactNode} from "react";
import styles from './styles.module.css';

interface Props {
    children: ReactNode
}
export default function AuthLayout({ children }: Props) {
    return (
        <section className={styles.container}>
            <div className={styles.left}></div>
            <div className={styles.right}>
                { children }
            </div>
        </section>
    );
}
