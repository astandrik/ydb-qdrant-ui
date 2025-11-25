import "./LangSwitcher.scss";

const LangSwitcher = () => {
  return (
    <div className="lang-switcher">
      <a className="lang-switcher__link" href="/ru/">Русский</a>
      {" | "}
      <a className="lang-switcher__link" href="/en/">English</a>
    </div>
  );
};

export default LangSwitcher;


