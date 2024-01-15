import styles from './styles.module.css'
import {usePathname} from "next/navigation";
import {convertPathToArr} from "@/app/components/stepper/util";
import Image from "next/image";
import {stepperIcon} from "@/app/components/stepper/constants";
import {RightOutlined} from "@ant-design/icons";
export default function Stepper(){
    const pathname = usePathname();
    const steps = convertPathToArr(pathname);
    return (
        <div className={styles.container}>
            <div className={styles.steppers}>
                {
                    steps.map((path, index) => {
                        return (
                            <div
                                style={{
                                opacity: index !== steps.length - 1 ? 0.5: 1
                            }} className={styles.stepper} key={path}>
                                <Image className={styles.stepperIcon} src={stepperIcon[path]} alt={path} />
                                <p className={styles.stepperLabel}>{path}</p>
                                {
                                    index !== steps.length - 1
                                    ? <RightOutlined className={styles.chevron} />
                                    : <div />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
