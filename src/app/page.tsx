import Image from "next/image";

import { Code, Paragraph } from "../components/typography";
import Link from "next/link";
import { Button } from "@/components/primitives/button";

export default function Home() {
  return (
    <main className="container mx-auto flex items-center justify-center">
      <Button><Link href="/booking">To Booking</Link></Button>
    </main>
  );
}
