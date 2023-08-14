import "./Header.css";

function App() {
  return (
    <header>
      <div className="nav">
        <ul className="nav-list">
          <li>
            <a className="<%= path === '/' ? 'active' : '' %>" href="/">
              Main
            </a>
          </li>
          <li>
            <a
              className="<%= path === '/services' ? 'active' : '' %>"
              href="/services"
            >
              Services
            </a>
          </li>
          <li>
            <a
              className="<%= path === '/products' ? 'active' : '' %>"
              href="/products"
            >
              Products
            </a>
          </li>
          <li>
            <a className="<%= path === '/posts' ? 'active' : '' %>" href="/posts">
              Posts
            </a>
          </li>
        </ul>
        <ul className="nav-list">
          <li>
            <a className="<%= path === '/login' ? 'active' : '' %>" href="/login">
              Login
            </a>
          </li>
          <li>
            <a className="<%= path === '/signup' ? 'active' : '' %>" href="/signup">
              SignUp
            </a>
          </li>
          <li className="main-header__item">
            <form action="/logout" method="post">
              <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
              <button type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default App;
