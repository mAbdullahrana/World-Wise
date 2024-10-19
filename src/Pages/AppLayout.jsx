
import Map from "../Componets/Map";
import SideBar from "../Componets/SideBar";
import User from "../Componets/User";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
   

    </div>
  );
}

export default AppLayout;
