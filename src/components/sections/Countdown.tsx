import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CountdownClient } from "./CountdownClient";
import { siteConfig } from "@/data/content";

export function Countdown() {
  return (
    <SectionWrapper id="countdown" className="bg-royal">
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">
          Counting down to {siteConfig.recipientName}&apos;s day
        </h2>
        <CountdownClient targetISO={siteConfig.birthdayDateISO} />
      </div>
    </SectionWrapper>
  );
}
