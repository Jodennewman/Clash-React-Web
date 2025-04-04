import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import LaunchUI from "../../logos/launch-ui";
export default function Navbar() {
  return (
    <header className="w-full px-4">
      <div className="mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="#" className="flex items-center gap-2 text-xl font-bold">
              <LaunchUI />
              Launch UI
            </a>
          </NavbarLeft>
          <NavbarRight>
            <Button variant="default" className="vs-btn-primary-gradient text-white">Get Started</Button>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
