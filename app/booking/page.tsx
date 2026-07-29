import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Walkthrough | PropertyWalk",
  description: "Choose a package and book your property walkthrough video.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingFlow />
    </Suspense>
  );
}
