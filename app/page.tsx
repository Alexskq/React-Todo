import Image from "next/image";
import { Todos } from "./components/Todos";

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <Todos />
    </div>
  );
}
