function Header(props) {
  return (
    <header className="header">
      <a href="#" className="header__logo" target="_self">
        <img src={props.src} alt="Логотип с надписью Место." className="header__logo-img" />
      </a>
    </header>
  );
}

export default Header;