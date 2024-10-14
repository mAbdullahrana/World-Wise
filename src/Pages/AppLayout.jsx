
import Map from "../Componets/Map";
import SideBar from "../Componets/SideBar";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
   

    </div>
  );
}

export default AppLayout;
