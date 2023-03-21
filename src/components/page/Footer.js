import styles from "./styles/Footer.module.scss";
import logoGray from "../../assets/logo-gray.png";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";

function Footer() {
  return (
    <>
      <div className={styles.companyBlock}>
        <img className={styles.logo} src={logoGray} alt="Error" />
        <div className={styles.links}>
          <a href="https://vk.com/mountainnsu">
            <IoLogoVk color={"white"} size={"40"} />
          </a>
          <a href="https://www.youtube.com/c/MountainNSUclub">
            <IoLogoYoutube color={"white"} size={"36"} />
          </a>
        </div>
        <p className={styles.copyright}>©NSU mountain network</p>
      </div>
    </>
  );
}

export default Footer;
