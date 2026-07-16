"use client";

import { LocaleProvider } from "./components/hero/LocaleProvider";
import PhoneJourney from "./components/story/PhoneJourney";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <LocaleProvider>
      <PhoneJourney />
      <SiteFooter />
    </LocaleProvider>
  );
}
