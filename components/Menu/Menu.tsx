import Link from "next/link";
import { useAuth } from "@/Authentication/AuthContext";
import { useRouter } from "next/navigation";
function Menu() {
  const { user, logOut }: any = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (user.uid) {
      try {
        await logOut();
        router.push("/login");
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <nav
      className={`navbar navbar-dark navbar-expand-lg bg-dark `}
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
        <div
          className={`collapse navbar-collapse `}
          id="navbarNavDropdown"
          style={{ justifyContent: "space-between" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="statistics">
                Statistics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="tags">
                Tags
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav login">
            <li className="nav-item">
              <Link className="nav-link" href="login" onClick={handleLogout}>
                {user.uid ? "LogOut" : "Login"}
              </Link>
            </li>
            {user.uid ? (
              <></>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" href="signup">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Menu;
