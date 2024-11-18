import { coin } from '@/assets'
import styles from './index.module.scss'

export const Cash = ({ value }: { value: number }) => {
	return (
		<div className={styles.coin}  >
			<img src={coin} alt="Coin" className='mr-xs' />
			<p className='typo-subTitle'>{value}</p>
		</div>
	)
}