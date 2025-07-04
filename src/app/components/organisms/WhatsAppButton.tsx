import SVGGlow from "../molecules/SVGGlow";

export default function WhatsAppButton() {
  const phoneNumber = "5538999460104";
  const message =
    "Hi! I’m looking for help with a project and came across your site. Can we talk?";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-1 sm:bottom-6 right-1 sm:right-6 z-50 text-white p-2 rounded-full shadow-lg transition-all"
      aria-label="Contact me on WhatsApp"
    >
      <SVGGlow
        label="WhatsApp button"
        src={`/footer/whatsapp.svg`}
        color="green"
        className="whatsapp-animated bg-transparent hover:border-transparent border-none w-16 h-16"
        enableGrayScale={false}
        imgSize={48}
      />
    </a>
  );
}
