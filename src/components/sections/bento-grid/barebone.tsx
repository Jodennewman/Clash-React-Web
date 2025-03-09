import {
  Tile,
  TileVisual,
  TileTitle,
  TileDescription,
  TileContent,
} from "../../ui/tile";
import { Section } from "../../ui/section";

export default function BentoGrid() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-12">
        <h2 className="text-3xl font-semibold sm:text-5xl">Section title</h2>
        <div className="grid grid-cols-12 gap-4">
          <Tile className="col-span-12">
            <TileContent>
              <TileTitle>Tile title</TileTitle>
              <TileDescription>Tile description</TileDescription>
            </TileContent>
            <TileVisual>{/* illustration */}</TileVisual>
          </Tile>
          {/* …more tiles */}
        </div>
      </div>
    </Section>
  );
}
