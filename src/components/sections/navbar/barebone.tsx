import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 px-4 backdrop-blur-lg">
      <div className="mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="#" className="flex items-center gap-2 text-xl font-bold">
              Logo
            </a>
          </NavbarLeft>
          <NavbarRight>
            <a href="#" className="text-sm">
              Link
            </a>
            <Button variant="default">Button</Button>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
