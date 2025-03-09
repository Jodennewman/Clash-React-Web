import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import LaunchUI from "../../logos/launch-ui";

export default function Navbar() {
  return (
    <header className="fade-bottom sticky top-0 z-50 px-4 pb-4 backdrop-blur-lg">
      <div className="mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="#" className="flex items-center gap-2 text-xl font-bold">
              <LaunchUI />
              Launch UI
            </a>
          </NavbarLeft>
          <NavbarRight>
            <a href="#" className="text-sm">
              Sign in
            </a>
            <Button variant="default">Get Started</Button>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
