import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p> &copy; Copyright {new Date().getFullYear()} by WorldWise inc.</p>
      </footer>
    </div>
  );
}

export default SideBar;
