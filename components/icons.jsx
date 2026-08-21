export const TelegramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.7 3.3 2.9 10.5c-.9.35-.9 1.6.05 1.9l4.3 1.35 1.65 5.1c.25.75 1.2.9 1.65.25l2.3-3.2 4.35 3.2c.6.45 1.45.1 1.6-.6l2.9-13.9c.15-.75-.6-1.35-1.3-1.05zM9.6 14l-.2 3.05-1-3.1 7.5-5.5L9.6 14z" />
  </svg>
);

export const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const MailIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export const MapPinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const TargetIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PinOffIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <path d="M5.4 5.4A8 8 0 0 0 4 10c0 6 8 12 8 12s2.2-1.65 4.2-4" />
    <path d="M18.6 13.6A16 16 0 0 0 20 10a8 8 0 0 0-11.2-7.3" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

export const RefreshIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <path d="M21 12a9 9 0 0 1-15.5 6.2" />
    <path d="M3 12a9 9 0 0 1 15.5-6.2" />
    <path d="M18.5 2.5v3.3h-3.3" />
    <path d="M5.5 21.5v-3.3h3.3" />
  </svg>
);

export const BellIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9Z" />
    <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    <path d="M2.6 6.3A6 6 0 0 1 4.5 3" />
    <path d="M21.4 6.3A6 6 0 0 0 19.5 3" />
  </svg>
);

export const LayersIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} style={{ display: "block" }} aria-hidden="true">
    <path d="M12 2.5 21 7l-9 4.5L3 7l9-4.5Z" />
    <path d="M3 12l9 4.5L21 12" />
    <path d="M3 17l9 4.5L21 17" />
  </svg>
);

export const ChevronIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const SendIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#FFFFFF" style={{ transform: "scaleX(-1)", marginLeft: 1 }} aria-hidden="true">
    <path d="M3.4 20.6 21 12 3.4 3.4 3.4 10.2 15 12 3.4 13.8z" />
  </svg>
);

export const ICONS = {
  pin: MapPinIcon,
  target: TargetIcon,
  pinOff: PinOffIcon,
  refresh: RefreshIcon,
  bell: BellIcon,
  layers: LayersIcon
};
