function Menu() {
  return (
    <nav className={`navbar navbar-expand-lg bg-dark`} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand link-light" href="#">
          Time Leverage
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active link-light"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link link-light" href="#">
                Statistics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link link-light" href="#">
                Tags
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Menu;
