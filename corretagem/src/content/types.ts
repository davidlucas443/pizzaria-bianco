export interface Image { src: string; alt: string }
export interface Brand { name: string; subtitle: string; logo: Image | null }
export interface ContactConfig { whatsapp: string; phone: string; instagram: string; address: string; hours: string; message: string }
export interface Navigation { label: string; id: string; section?: string }
export interface Heading { eyebrow: string; title: string; text: string }
export interface TextItem { title: string; text: string }
export interface UI { skip: string; openMenu: string; closeMenu: string; close: string; backTop: string; primary: string; secondary: string; map: string; phone: string; instagram: string; unavailableTitle: string; unavailableText: string; addressEmpty: string; contactEmpty: string; hoursLabel: string; addressLabel: string }
