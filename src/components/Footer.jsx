export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* LEFT */}
        <div className="footer-left">
          <h4>Video App</h4>
          <p>Built with React ⚛️</p>
        </div>

        {/* CENTER - NAV (Mobile friendly) */}
        <div className="footer-nav">
          <a href="#home">Home</a>
          <a href="#trending">Trending</a>
          <a href="#favorites">Favorites</a>
          <a href="#history">History</a>
        </div>

        {/* RIGHT - SOCIAL */}
        <div className="footer-social">
          <a
            href="https://github.com/vikusquad12"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/vivek-pandey-482639329?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} Video App • All rights reserved
      </p>
    </footer>
  );
}