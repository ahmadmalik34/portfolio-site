import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Floating WhatsApp button — circular, light-grey, with the brand-green
 * glyph so it stands out against the dark page. Fixed bottom-right.
 */
export function WhatsAppFab() {
  return (
    <a
      href={siteConfig.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-8 right-4 z-40 sm:bottom-10 sm:right-6"
    >
      <span className="relative grid size-12 place-items-center rounded-full bg-[#e9e9e3] text-[#1db954] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#25d366] group-hover:text-white sm:size-14">
        <WhatsAppIcon size={24} />
        {/* online dot */}
        <span
          className="animate-blink absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-paper bg-accent"
          aria-hidden="true"
        />
      </span>
      <span className="sr-only">WhatsApp: +92 303 5082823</span>
    </a>
  );
}
