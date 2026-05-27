import { Stage } from "@/design-system";
import { Book } from "@/components/book";
import { LeftPageText } from "@/components/book/LeftPageText";

export default function HomePage() {
  return (
    <Stage>
      {/* LeftPageText must come before Book so it renders behind the 3D scene */}
      <LeftPageText />
      <Book />
    </Stage>
  );
}
