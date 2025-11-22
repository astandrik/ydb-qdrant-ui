import { Link, Text } from "@gravity-ui/uikit";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Text as="span" variant="caption" className={styles.badgeText}>
        Created with{" "}
        <Link
          href="https://github.com/gravity-ui/uikit"
          target="_blank"
          rel="noopener"
          className={styles.badgeLink}
        >
          gravity-ui/uikit
        </Link>
      </Text>
    </footer>
  );
};

export default Footer;
