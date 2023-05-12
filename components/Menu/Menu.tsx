import Link from "next/link";

function Menu() {
  return (
    <nav
      className={`navbar navbar-dark navbar-expand-lg bg-dark`}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand " href="/">
          Time Leverage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-warning "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Statistics
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="tags">
                Tags
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Menu;
