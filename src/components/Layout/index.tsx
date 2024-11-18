import { Outlet } from "react-router-dom";
import styles from './index.module.scss'

export const Layout = () => {
	return (
		<div className={`${styles.Layout} pt-xl`}><Outlet /></div>
	)
};