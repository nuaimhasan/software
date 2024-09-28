import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-3 border-b">
      <div className="container">
        <nav className="flex justify-between items-center">
          <div>
            <a href="/" className="text-2xl font-bold">
              MERN-X
            </a>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="bg-black text-white px-4 py-1.5 rounded"
                  to="https://mernx.com/"
                  target="_blank"
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
