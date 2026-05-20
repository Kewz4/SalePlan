import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, Book, Mail, HelpCircle, UserPlus, LogIn, Store, ChevronLeft,
  Coffee, Palette, UtensilsCrossed, Leaf, BookOpen, Landmark, Mountain, Music,
  ShoppingBag, Flower2, Utensils, Disc3, Camera, Guitar, Pizza, IceCream, MapPin,
  Zap, Crown, Backpack, Trophy, Sprout, ScanLine, Share2, Check, Pencil, Sparkles,
  QrCode, Waves, TreePine, Compass
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import YetiLogin from './components/YetiLogin';

const ICONS = {
  SEARCH: "https://25nlk7g645.ucarecd.net/845e00f3-61c7-46ef-863a-ccfb4b286294/Glass.svg",
  STAR_HOLLOW: "https://25nlk7g645.ucarecd.net/e2f7872b-d674-40fd-9aa1-36531202d003/StarHollow.svg",
  STAR_FILLED: "https://25nlk7g645.ucarecd.net/bfc1c03b-b67b-4def-a458-038f6f95f5b6/StarFilled.svg",
  NAV_PASSPORT: "https://25nlk7g645.ucarecd.net/00e01b07-ef8c-46cb-870a-05c2cdd06c8b/Passport.svg",
  NAV_MAP: "https://25nlk7g645.ucarecd.net/cc2e4358-6cee-4814-9f3a-1a482301c154/Location.svg",
  LOGO: "https://25nlk7g645.ucarecd.net/5cbf1317-69a7-405a-8473-5379b0fbe8da/SalePlanLogo.svg"
};

const AVATARS = [
  "https://25nlk7g645.ucarecd.net/c8c8a16f-5352-49e4-b712-630aa9258b9e/TriangleCharacter.png",
  "https://25nlk7g645.ucarecd.net/2d90877e-68f1-45bd-ba61-73b10d5fba6a/RhombCharacter.png",
  "https://25nlk7g645.ucarecd.net/b8e9b963-37d2-4266-b1d3-2f52b306f8dd/StarCharacter.png",
  "https://25nlk7g645.ucarecd.net/fa4658c8-38f5-446e-91dc-6f9100b109d8/SquareCharacter.png"
];

type Screen = 'ONBOARDING' | 'USER_LOGIN' | 'USER_REGISTER' | 'USER_ONBOARDING_PREFS' | 'USER_HOME' | 'USER_SEARCH' | 'USER_REVIEWS' | 'USER_PROFILE' | 'USER_WALLET' | 'COMMERCE_LOGIN' | 'COMMERCE_DASHBOARD' | 'COMMERCE_CREATE_EXPERIENCE' | 'REGISTER_CHOICE' | 'LOGIN_CHOICE' | 'FAQ' | 'ABOUT' | 'CONTACT' | 'AFFILIATE';

const ALL_CATEGORIES = [
  { id: 'gastro', name: 'Gastronomía' },
  { id: 'cultura', name: 'Cultura' },
  { id: 'naturaleza', name: 'Naturaleza' },
  { id: 'comercio', name: 'Tiendas Locales' },
  { id: 'arte', name: 'Arte' },
  { id: 'nocturna', name: 'Vida Nocturna' },
  { id: 'cafe', name: 'Café & Postres' },
  { id: 'turismo', name: 'Turismo' }
];

const CAT_ICON_MAP: Record<string, LucideIcon> = {
  gastro: UtensilsCrossed,
  cultura: Landmark,
  naturaleza: Leaf,
  comercio: ShoppingBag,
  arte: Palette,
  nocturna: Music,
  cafe: Coffee,
  turismo: Camera,
};

const POIS = [
  ...[
    { id: 1,  name: "Café Central",       category: "Café & Postres",   location: "Zona Norte",       description: "El mejor café de especialidad de la ciudad con un ambiente acogedor.",                              color: "bg-blue-50 text-blue-800 border-blue-200",     date: "Lun-Vie, 8:00 - 20:00" },
    { id: 2,  name: "Museo de Arte",       category: "Arte",             location: "Centro Histórico", description: "Obras clásicas y modernas. No te pierdas la exhibición de los miércoles.",                         color: "bg-purple-50 text-purple-800 border-purple-200", date: "Mar-Dom, 10:00 - 18:00" },
    { id: 3,  name: "Burger Fest",         category: "Gastronomía",      location: "Zona Sur",         description: "Hamburguesas artesanales de otro planeta con ingredientes locales.",                                color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 23:00" },
    { id: 4,  name: "Parque Botánico",     category: "Naturaleza",       location: "Este",             description: "Un respiro verde en medio de la jungla de asfalto. Ideal para paseos largos.",                     color: "bg-green-50 text-green-800 border-green-200",   date: "Diario, 6:00 - 18:00" },
    { id: 5,  name: "Librería El Tomo",    category: "Comercio",         location: "Centro Histórico", description: "Libros raros, primeras ediciones y un ambiente mágico para leer.",                                 color: "bg-yellow-50 text-yellow-800 border-yellow-200", date: "Lun-Sáb, 9:00 - 19:00" },
    { id: 6,  name: "Heladería Polar",     category: "Café & Postres",   location: "Zona Norte",       description: "Helados artesanales con sabores únicos e inigualables.",                                           color: "bg-pink-50 text-pink-800 border-pink-200",      date: "Diario, 11:00 - 21:00" },
    { id: 7,  name: "Teatro Municipal",    category: "Cultura",          location: "Centro",           description: "Las mejores obras teatrales clásicas y contemporáneas de la ciudad.",                               color: "bg-purple-50 text-purple-800 border-purple-200", date: "Funciones Variables" },
    { id: 8,  name: "Mirador del Valle",   category: "Turismo",          location: "Oeste",            description: "La mejor vista panorámica para ver el atardecer perfecto.",                                        color: "bg-blue-50 text-blue-800 border-blue-200",      date: "Diario, 24h" },
    { id: 9,  name: "Club de Jazz Local",  category: "Vida Nocturna",    location: "Centro",           description: "Música en vivo cada noche con los mejores músicos locales e internacionales.",                     color: "bg-indigo-50 text-indigo-800 border-indigo-200", date: "Jue-Sáb, 20:00 - 2:00" },
    { id: 10, name: "Pizzería Nápoles",    category: "Gastronomía",      location: "Zona Sur",         description: "Auténtica pizza napolitana al horno de leña, como en Italia.",                                     color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 22:00" },
    { id: 11, name: "Boutique Vintage",    category: "Tiendas Locales",  location: "Este",             description: "Ropa vintage y piezas curadas de los años 80 y 90.",                                              color: "bg-orange-50 text-orange-800 border-orange-200", date: "Lun-Sáb, 10:00 - 19:00" },
    { id: 12, name: "Jardín Japonés",      category: "Naturaleza",       location: "Oeste",            description: "Conecta con la naturaleza y encuentra tu zen interior en este hermoso espacio.",                   color: "bg-green-50 text-green-800 border-green-200",   date: "Mar-Dom, 9:00 - 17:00" },
    { id: 13, name: "Barra de Sushi",      category: "Gastronomía",      location: "Zona Norte",       description: "Los mejores cortes y rollos creativos con pescado fresco todos los días.",                         color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 23:00" },
    { id: 14, name: "Tienda de Discos",    category: "Tiendas Locales",  location: "Centro Histórico", description: "Vinilos clásicos, nuevos lanzamientos y joyas escondidas musicales.",                              color: "bg-zinc-50 text-zinc-800 border-zinc-200",      date: "Lun-Sáb, 11:00 - 20:00" },
    { id: 15, name: "Mercado Local",       category: "Turismo",          location: "Sur",              description: "Descubre la comida callejera, frutas exóticas y la vibra del verdadero comercio.",                 color: "bg-orange-50 text-orange-800 border-orange-200", date: "Diario, 7:00 - 16:00" }
  ],
  { id: 16, name: "Catedral Metropolitana", category: "Cultura",         location: "Centro Histórico", description: "La imponente catedral neoclásica que domina el corazón del centro histórico de San Salvador.",                          color: "bg-purple-50 text-purple-800 border-purple-200", date: "Lun-Dom, 6:00 - 18:00" },
  { id: 17, name: "Parque Cuscatlán",      category: "Naturaleza",       location: "San Salvador",     description: "El parque urbano más grande del país, ideal para paseos, ejercicio y cultura al aire libre.",                         color: "bg-green-50 text-green-800 border-green-200",   date: "Diario, 5:00 - 19:00" },
  { id: 18, name: "Cerro Verde",           category: "Turismo",          location: "Santa Ana",        description: "Volcán rodeado de bosque nuboso y vistas impresionantes al Lago Coatepeque.",                                        color: "bg-teal-50 text-teal-800 border-teal-200",      date: "Diario, 8:00 - 17:00" },
  { id: 19, name: "Lago de Coatepeque",    category: "Naturaleza",       location: "Santa Ana",        description: "Lago cráter de aguas azul turquesa perfecto para kayak, natación y amanecer de ensueño.",                            color: "bg-blue-50 text-blue-800 border-blue-200",      date: "Diario, 24h" },
  { id: 20, name: "Suchitoto",             category: "Turismo",          location: "Cuscatlán",        description: "El pueblo colonial más hermoso del país con calles de adoquín y vista al lago Suchitlán.",                            color: "bg-orange-50 text-orange-800 border-orange-200", date: "Diario, 7:00 - 19:00" },
  { id: 21, name: "Pupusería La Familiar", category: "Gastronomía",      location: "Soyapango",        description: "Las mejores pupusas de loroco y chicharrón hechas a mano, un clásico insuperable.",                                  color: "bg-red-50 text-red-800 border-red-200",         date: "Mar-Dom, 7:00 - 21:00" },
  { id: 22, name: "Mercado Ex-Cuartel",    category: "Tiendas Locales",  location: "Centro Histórico", description: "Mercado artesanal con textiles, artesanías y joyería hecha por manos salvadoreñas.",                                  color: "bg-yellow-50 text-yellow-800 border-yellow-200", date: "Lun-Sáb, 8:00 - 18:00" },
  { id: 23, name: "Café 1840",             category: "Café & Postres",   location: "Colonia Escalón",  description: "Cafetería de especialidad con granos de origen salvadoreño y terraza con vista a la ciudad.",                          color: "bg-amber-50 text-amber-800 border-amber-200",   date: "Lun-Dom, 7:00 - 20:00" },
  { id: 24, name: "Galería Cima",          category: "Arte",             location: "San Benito",       description: "Galería de arte contemporáneo que exhibe a los artistas plásticos más importantes del país.",                          color: "bg-purple-50 text-purple-800 border-purple-200", date: "Mar-Sáb, 10:00 - 19:00" },
  { id: 25, name: "Ruta de las Flores",    category: "Turismo",          location: "Sonsonate",        description: "Recorrido por pueblos coloniales rodeados de cafetales y flores de temporada.",                                       color: "bg-pink-50 text-pink-800 border-pink-200",      date: "Diario, 8:00 - 18:00" },
  { id: 26, name: "Playa El Tunco",        category: "Turismo",          location: "La Libertad",      description: "La playa con las mejores olas para surf y el ambiente más vibrante de la costa pacífica.",                            color: "bg-cyan-50 text-cyan-800 border-cyan-200",      date: "Diario, 24h" },
  { id: 27, name: "Ruinas de Tazumal",     category: "Cultura",          location: "Chalchuapa",       description: "Sitio arqueológico maya con pirámides milenarias y el museo más importante del país.",                                color: "bg-stone-50 text-stone-800 border-stone-200",   date: "Mar-Dom, 9:00 - 16:00" },
  { id: 28, name: "Volcán Santa Ana",      category: "Naturaleza",       location: "Santa Ana",        description: "El volcán activo más alto de El Salvador con una laguna cráter de azufre color turquesa.",                            color: "bg-green-50 text-green-800 border-green-200",   date: "Sáb-Dom, 6:00 - 14:00" },
  { id: 29, name: "Zona Rosa",             category: "Vida Nocturna",    location: "San Benito",       description: "El corazón de la vida nocturna y gastronómica premium de San Salvador.",                                              color: "bg-indigo-50 text-indigo-800 border-indigo-200", date: "Diario, 18:00 - 3:00" },
  { id: 30, name: "Puerta del Diablo",     category: "Turismo",          location: "Panchimalco",      description: "Formación rocosa volcánica con vistas panorámicas de 180° sobre el Valle de Las Hamacas.",                            color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 7:00 - 17:00" },
  { id: 31, name: "Coffee Shop 503",       category: "Café & Postres",   location: "Antiguo Cuscatlán", description: "Tercera ola del café salvadoreño con métodos artesanales y baristas campeones.",                                   color: "bg-amber-50 text-amber-800 border-amber-200",   date: "Lun-Sáb, 7:00 - 19:00" },
  { id: 32, name: "Bar Vanguardia",        category: "Vida Nocturna",    location: "Colonia Escalón",  description: "Coctelerías de autor, música en vivo los viernes y la mejor carta de whiskies de la ciudad.",                         color: "bg-indigo-50 text-indigo-800 border-indigo-200", date: "Mié-Dom, 19:00 - 2:00" },
  { id: 33, name: "Laguna El Jocotal",     category: "Naturaleza",       location: "San Miguel",       description: "Reserva de biosfera con más de 100 especies de aves migratorias y canoas para recorrerla.",                           color: "bg-teal-50 text-teal-800 border-teal-200",      date: "Diario, 6:00 - 17:00" },
  { id: 34, name: "Centro Arte Zona Rosa", category: "Arte",             location: "Zona Rosa",        description: "Espacio cultural vivo con exposiciones temporales, talleres y shows de arte urbano.",                                 color: "bg-purple-50 text-purple-800 border-purple-200", date: "Mar-Dom, 10:00 - 20:00" },
  { id: 35, name: "Pupusas Lorena",        category: "Gastronomía",      location: "Santa Tecla",      description: "Cuatro generaciones perfeccionando la receta original de pupusas de frijoles con queso.",                             color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 6:30 - 22:00" },
  { id: 36, name: "Playa El Zonte",        category: "Turismo",          location: "La Libertad",      description: "La playa más tranquila y bohemia de El Salvador, primera comunidad circular en Bitcoin.",                             color: "bg-cyan-50 text-cyan-800 border-cyan-200",      date: "Diario, 24h" },
  { id: 37, name: "Artesanías Nahuizalco", category: "Tiendas Locales",  location: "Sonsonate",        description: "Taller familiar de cestería y muebles de ratán, tradición artesanal pipil de generación en generación.",               color: "bg-yellow-50 text-yellow-800 border-yellow-200", date: "Lun-Sáb, 8:00 - 17:00" },
  { id: 38, name: "Museo de Antropología", category: "Cultura",          location: "San Salvador",     description: "El museo nacional que alberga la historia precolombina y los tesoros arqueológicos del país.",                         color: "bg-stone-50 text-stone-800 border-stone-200",   date: "Mar-Dom, 9:00 - 17:00" },
  { id: 39, name: "Los Planes de Renderos",category: "Gastronomía",      location: "Panchimalco",      description: "Zona de recreación con restaurantes de comida típica y vistas espectaculares de la capital.",                          color: "bg-orange-50 text-orange-800 border-orange-200", date: "Fin de Semana, 8:00 - 18:00" },
  { id: 40, name: "Cocina de Don Beto",    category: "Gastronomía",      location: "San Miguel",       description: "Cocina típica oriental con los mejores mariscos, sopa de pata y chorizos de la región.",                              color: "bg-red-50 text-red-800 border-red-200",         date: "Lun-Dom, 8:00 - 21:00" },
  { id: 101, name: 'Atardecer Acústico', category: 'Evento Flash', location: 'Café Central',  description: 'Sube una selfie etiquetando a @SalePlan.sv y @CafeCentral en historias', pts: '2x Puntos (2 Sellos)', isFlash: true, date: 'Viernes 18, 18:00 - 20:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 102, name: 'Noche de Museos',    category: 'Evento Flash', location: 'Museo de Arte', description: 'Asiste con 2 amigos que tengan la app',                                  pts: 'Entrada VIP Gratis + 1 Sello', isFlash: true, date: 'Sábado 19, 19:00 - 23:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 103, name: 'Flash Burger',       category: 'Evento Flash', location: 'Burger Fest',  description: 'Compra el combo "Explorador" para validar',                              pts: '3x Puntos (3 Sellos)', isFlash: true, date: 'Hoy, 12:00 - 15:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" }
];

const FLASH_EVENTS = POIS.filter(poi => poi.isFlash);

const POI_ICON_MAP: Record<number, LucideIcon> = {
  1: Coffee, 2: Palette, 3: UtensilsCrossed, 4: Leaf, 5: BookOpen,
  6: IceCream, 7: Landmark, 8: Mountain, 9: Music, 10: Pizza,
  11: ShoppingBag, 12: Flower2, 13: Utensils, 14: Disc3, 15: Store,
  16: Landmark, 17: TreePine, 18: Mountain, 19: Waves, 20: Compass,
  21: Utensils, 22: ShoppingBag, 23: Coffee, 24: Palette, 25: Flower2,
  26: Waves, 27: Landmark, 28: Mountain, 29: Music, 30: Compass,
  31: Coffee, 32: Music, 33: Waves, 34: Palette, 35: Utensils,
  36: Waves, 37: ShoppingBag, 38: Landmark, 39: UtensilsCrossed, 40: UtensilsCrossed,
  101: Guitar, 102: Landmark, 103: UtensilsCrossed,
};

function PoiIcon({ id, size = 24, strokeWidth = 1.5, className = '' }: {
  id: number; size?: number; strokeWidth?: number; className?: string;
}) {
  const Icon = POI_ICON_MAP[id] ?? MapPin;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}

const CRM_CONTACTS = [
  { name: 'Valentina Cruz',      avatar: AVATARS[0], time: 'Hace 2 horas',    badge: 'Frecuente', initial: null },
  { name: 'Ricardo Morales',     avatar: AVATARS[3], time: 'Hace 4 horas',    badge: 'Nuevo',     initial: null },
  { name: 'Luis Fernando',       avatar: AVATARS[1], time: 'Ayer, 18:42',     badge: null,        initial: null },
  { name: 'María José Rivas',    avatar: null,        time: 'Ayer, 15:20',     badge: null,        initial: 'M' },
  { name: 'Andrés Portillo',     avatar: AVATARS[2], time: 'Ayer, 12:10',     badge: 'Frecuente', initial: null },
  { name: 'Sofía Hernández',     avatar: null,        time: 'Hace 2 días',     badge: null,        initial: 'S' },
  { name: 'Carlos Ramos',        avatar: AVATARS[0], time: 'Hace 2 días',     badge: null,        initial: null },
  { name: 'Daniela Fuentes',     avatar: AVATARS[2], time: 'Hace 3 días',     badge: 'Frecuente', initial: null },
  { name: 'Pablo García',        avatar: null,        time: 'Hace 3 días',     badge: null,        initial: 'P' },
  { name: 'Ana Lucía Mejía',     avatar: AVATARS[1], time: 'Hace 3 días',     badge: null,        initial: null },
  { name: 'Jorge Alfaro',        avatar: null,        time: 'Hace 4 días',     badge: null,        initial: 'J' },
  { name: 'Laura Castillo',      avatar: AVATARS[3], time: 'Hace 4 días',     badge: 'Nuevo',     initial: null },
  { name: 'Miguel Ángel Torres', avatar: AVATARS[0], time: 'Hace 5 días',     badge: null,        initial: null },
  { name: 'Isabella Ruiz',       avatar: null,        time: 'Hace 5 días',     badge: null,        initial: 'I' },
  { name: 'Rodrigo Velásquez',   avatar: AVATARS[2], time: 'Hace 5 días',     badge: null,        initial: null },
  { name: 'Fernanda López',      avatar: AVATARS[1], time: 'Hace 6 días',     badge: 'Frecuente', initial: null },
  { name: 'Sebastián Chávez',    avatar: null,        time: 'Hace 6 días',     badge: null,        initial: 'S' },
  { name: 'Natalia Martínez',    avatar: AVATARS[3], time: 'Hace 7 días',     badge: null,        initial: null },
  { name: 'Eduardo Flores',      avatar: AVATARS[0], time: 'Hace 7 días',     badge: null,        initial: null },
  { name: 'Carmen Díaz',         avatar: null,        time: 'Hace 8 días',     badge: null,        initial: 'C' },
  { name: 'José Antonio Peña',   avatar: AVATARS[2], time: 'Hace 8 días',     badge: 'Frecuente', initial: null },
  { name: 'Valeria Moreno',      avatar: AVATARS[1], time: 'Hace 9 días',     badge: null,        initial: null },
  { name: 'Diego Ramírez',       avatar: null,        time: 'Hace 9 días',     badge: null,        initial: 'D' },
  { name: 'Claudia Sánchez',     avatar: AVATARS[3], time: 'Hace 10 días',    badge: null,        initial: null },
  { name: 'Arturo González',     avatar: AVATARS[0], time: 'Hace 10 días',    badge: 'Frecuente', initial: null },
];

// Motion stagger variants — Emil: stagger 30-80ms between items
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const } }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ONBOARDING');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [savedPOIs, setSavedPOIs] = useState<number[]>([1, 3]);
  const [selectedPOI, setSelectedPOI] = useState<number | null>(null);
  const [stampedPOIs, setStampedPOIs] = useState<number[]>([]);
  const [qrModalPOIId, setQrModalPOIId] = useState<number | null>(null);
  const [prevScreen, setPrevScreen] = useState<Screen>('ONBOARDING');
  const [showPwaGuide, setShowPwaGuide] = useState(false);
  const [pwaStep, setPwaStep] = useState(0);
  const [pwaPermanentlyHidden, setPwaPermanentlyHidden] = useState(() => {
    return localStorage.getItem('pwa_guide_hidden') === 'true';
  });
  const [commerceTab, setCommerceTab] = useState<'ESCANEO' | 'CRM' | 'CONFIG'>('ESCANEO');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [justStampedId, setJustStampedId] = useState<number | null>(null);

  React.useEffect(() => {
    [...AVATARS, ...Object.values(ICONS)].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toUpperCase();
      if (!hash.startsWith('POI-')) setSelectedPOI(null);

      if (hash.startsWith('POI-')) {
        const id = parseInt(hash.split('-')[1]);
        if (!isNaN(id)) {
          setSelectedPOI(id);
          setCurrentScreen('USER_SEARCH');
          return;
        }
      }

      const validScreens: Screen[] = [
        'ONBOARDING', 'USER_LOGIN', 'USER_REGISTER', 'USER_ONBOARDING_PREFS',
        'USER_HOME', 'USER_SEARCH', 'USER_REVIEWS', 'USER_PROFILE',
        'USER_WALLET', 'COMMERCE_LOGIN', 'COMMERCE_DASHBOARD', 'COMMERCE_CREATE_EXPERIENCE',
        'REGISTER_CHOICE'
      ];
      if (hash && validScreens.includes(hash as Screen)) setCurrentScreen(hash as Screen);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useEffect(() => {
    let hash = currentScreen.toLowerCase();
    if (selectedPOI && currentScreen === 'USER_SEARCH') hash = `poi-${selectedPOI}`;
    if (window.location.hash !== `#/${hash}`) window.location.hash = `#/${hash}`;
  }, [currentScreen, selectedPOI]);

  const navigateTo = (screen: Screen, poiId: number | null = null) => {
    if (screen !== currentScreen || poiId !== selectedPOI) {
      setPrevScreen(currentScreen);
      setSelectedPOI(poiId);
      setCurrentScreen(screen);
    }
  };

  const isStandalone = () => {
    const nav = window.navigator as any;
    return nav.standalone || window.matchMedia('(display-mode: standalone)').matches || window.location.search.includes('mode=standalone');
  };

  const handleLoggedAction = (screen: Screen) => {
    if (!isStandalone()) setShowPwaGuide(true);
    navigateTo(screen);
  };

  // --- Components ---

  const PwaGuideModal = () => {
    const steps = [
      { title: "Paso 1: Compartir", desc: "Toca el botón 'Compartir' en Safari", img: "https://25nlk7g645.ucarecd.net/aafd6bdc-7f3c-4e64-b776-e9517011c6b2/Paso1.jpg", aspect: "aspect-[1179/276]" },
      { title: "Paso 2: Agregar",   desc: "Selecciona 'Agregar a inicio'",        img: "https://25nlk7g645.ucarecd.net/5d76fc0b-7227-4ee8-a617-8d641c3ede52/Paso2.jpg", aspect: "aspect-[1179/1926]" },
      { title: "Paso 3: Confirmar", desc: "Dale a 'Agregar' y ¡listo!",           img: "https://25nlk7g645.ucarecd.net/df5fb43e-d31a-40e9-9036-2a21cd3cf5f8/Paso3.jpg", aspect: "aspect-[1179/1013]" }
    ];

    if (!showPwaGuide || pwaPermanentlyHidden) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col relative max-h-[90vh]"
        >
          <div className="p-8 pb-2">
            <h3 className="text-2xl font-heading text-[#253884] mb-1 leading-tight text-center">Instala la App</h3>
            <p className="text-gray-400 text-[10px] font-medium mb-4 text-center">Mejora tu experiencia agregando SalePlan a tu inicio.</p>
          </div>

          <div className="flex-1 px-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pwaStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col h-full items-center"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <p className="text-[10px] font-black text-[#253884] uppercase tracking-widest">{steps[pwaStep].title}</p>
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === pwaStep ? 'bg-[#253884]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center w-full h-[280px]">
                  <img src={steps[pwaStep].img} className="max-w-full max-h-full object-contain" alt={steps[pwaStep].title} />
                </div>
                <p className="text-gray-500 text-xs font-medium mt-4 text-center leading-relaxed px-2">{steps[pwaStep].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-8 pt-4 space-y-2">
            {pwaStep < steps.length - 1 ? (
              <button onClick={() => setPwaStep(pwaStep + 1)} className="w-full py-4 bg-[#253884] text-white rounded-2xl font-bold uppercase shadow-lg active:scale-[0.97] transition-transform text-sm">
                Siguiente Paso
              </button>
            ) : (
              <button onClick={() => { setShowPwaGuide(false); setPwaStep(0); }} className="w-full py-4 bg-[#253884] text-white rounded-2xl font-bold uppercase shadow-lg active:scale-[0.97] transition-transform text-sm">
                Entendido
              </button>
            )}
            <div className="flex flex-col items-center gap-1 pt-2">
              <button onClick={() => { setShowPwaGuide(false); setPwaStep(0); }} className="text-gray-400 font-bold uppercase text-[9px] tracking-widest py-1">
                Lo haré después
              </button>
              <button
                onClick={() => { localStorage.setItem('pwa_guide_hidden', 'true'); setPwaPermanentlyHidden(true); setShowPwaGuide(false); }}
                className="text-red-400 font-bold uppercase text-[9px] tracking-widest py-1"
              >
                No volver a mostrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const Layout = ({ children, bgClass = 'bg-gray-50' }: { children: React.ReactNode; bgClass?: string }) => (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f3f4f6]">
      <div
        className={`flex-1 w-full max-w-md mx-auto relative flex flex-col shadow-2xl ${bgClass} overflow-x-hidden overflow-y-auto no-scrollbar`}
        style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
      >
        {children}
      </div>
    </div>
  );

  const BottomNav = ({ active }: { active: string }) => (
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-20 px-2 z-40 pb-safe shadow-[0_-4px_20px_rgba(37,56,132,0.05)]">
      <button onClick={() => navigateTo('USER_WALLET')} className="relative flex flex-col items-center justify-center w-14 h-14 active:scale-[0.97] transition-transform">
        <img src={ICONS.NAV_PASSPORT} className={`w-6 h-6 transition-opacity duration-200 ${active === 'wallet' ? '' : 'opacity-40'}`} alt="Pasaporte" />
        {active === 'wallet' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
      </button>
      <button onClick={() => navigateTo('USER_HOME')} className="relative flex flex-col items-center justify-center w-14 h-14 active:scale-[0.97] transition-transform">
        <img src={ICONS.NAV_MAP} className={`w-6 h-6 transition-opacity duration-200 ${active === 'home' ? '' : 'opacity-40'}`} alt="Paradas" />
        {active === 'home' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
      </button>
      <button onClick={() => navigateTo('USER_PROFILE')} className="relative flex flex-col items-center justify-center w-14 h-14 active:scale-[0.97] transition-transform">
        <div className={`w-8 h-8 rounded-full overflow-hidden bg-gray-100 transition-all duration-200 ${active === 'profile' ? 'border-2 border-[#253884]' : 'opacity-60 border border-transparent'}`}>
          <img src={selectedAvatar} alt="Perfil" className="w-full h-full object-cover" />
        </div>
        {active === 'profile' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
      </button>
    </div>
  );

  // --- Screens ---

  const renderStaticPage = (title: string, content: string) => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative max-w-lg mx-auto">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-100 w-12 h-12 rounded-2xl flex justify-center items-center shadow-sm z-20 text-[#253884] active:scale-[0.97] transition-transform">
          <ChevronLeft size={22} strokeWidth={2} />
        </button>

        <div className="mt-12 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl font-heading text-[#253884] tracking-tight">{title}</h1>
            <div className="w-12 h-1 bg-[#253884] mx-auto mt-4 rounded-full opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(37,56,132,0.08)] text-left"
          >
            {content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className={`text-gray-600 leading-relaxed font-medium ${idx !== 0 ? 'mt-6' : ''}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-4">
              <img src={ICONS.LOGO} alt="SalePlan" className="h-4 opacity-30 grayscale" />
              <span className="text-[10px] uppercase font-black text-gray-200 tracking-[0.2em]">v.1.0.4</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );

  const renderOnboarding = () => (
    <Layout bgClass="bg-white">
      <div className="flex justify-between items-center p-6 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={ICONS.LOGO} alt="SalePlan" className="h-8" />
          <span className="font-heading text-2xl text-[#253884] tracking-tighter pt-1">SalePlan</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('LOGIN_CHOICE')} className="text-[10px] font-bold px-3 py-2 text-[#253884] uppercase whitespace-nowrap active:opacity-70 transition-opacity">
            Iniciar Sesión
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-[#253884] active:scale-[0.97] transition-transform">
            <Menu size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-[#253884]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%', borderRadius: '100% 0 0 100%' }}
              animate={{ opacity: 1, x: 0, borderRadius: '0% 0 0 0%' }}
              exit={{ opacity: 0, x: '100%', borderRadius: '100% 0 0 100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-0 left-12 sm:left-24 z-[100] bg-white flex flex-col overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#253884]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="flex justify-between items-center p-8 relative z-10">
                <div className="flex items-center gap-2">
                  <img src={ICONS.LOGO} alt="SalePlan" className="h-6" />
                  <span className="font-heading text-xl text-[#253884] tracking-tighter">MENÚ</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-[#253884] active:scale-[0.97] transition-transform">
                  <X size={22} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 flex flex-col p-8 pt-0 relative z-10 overflow-y-auto no-scrollbar">
                <p className="text-[10px] uppercase font-bold text-gray-300 tracking-[0.2em] mb-8">Navegación</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Registrarme',          screen: 'REGISTER_CHOICE', icon: <UserPlus size={20} strokeWidth={1.5} />,    color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Preguntas Frecuentes', screen: 'FAQ',             icon: <HelpCircle size={20} strokeWidth={1.5} />,  color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Acerca de SalePlan',   screen: 'ABOUT',           icon: <Book size={20} strokeWidth={1.5} />,        color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Contacto',             screen: 'CONTACT',         icon: <Mail size={20} strokeWidth={1.5} />,        color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Afíliate',             screen: 'AFFILIATE',       icon: <Store size={20} strokeWidth={1.5} />,       color: 'bg-blue-50 text-[#253884]' },
                  ].map((item, idx) => (
                    <motion.button
                      key={item.screen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => { setIsMenuOpen(false); navigateTo(item.screen as Screen); }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#253884] hover:shadow-md transition-[border-color,box-shadow] group active:scale-[0.97]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                          {item.icon}
                        </div>
                        <span className="text-base font-bold text-[#253884]">{item.label}</span>
                      </div>
                      <ArrowRight size={16} strokeWidth={2} className="text-gray-300 group-hover:text-[#253884] transition-colors duration-200" />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-12 bg-blue-50 p-6 rounded-3xl border border-blue-100 relative overflow-hidden shadow-sm">
                  <div className="relative z-10">
                    <h4 className="text-xl font-heading mb-1 text-[#253884]">¿Ya tienes cuenta?</h4>
                    <p className="text-xs text-blue-600/60 mb-6 font-medium">Ingresa para continuar explorando la ciudad.</p>
                    <button
                      onClick={() => { setIsMenuOpen(false); navigateTo('LOGIN_CHOICE'); }}
                      className="w-full py-4 bg-[#253884] text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest active:scale-[0.97] transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                      <LogIn size={14} strokeWidth={2} /> Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em]">SalePlan © 2026</p>
                  <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em]">v.1.0.4</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero — left-aligned per DESIGN_VARIANCE 8 */}
      <div className="w-full pb-24 px-6 pt-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <h1 className="text-5xl leading-[1.1] font-heading text-[#253884] tracking-tight mb-4">
            Tu Pasaporte<br />A La Ciudad
          </h1>
          <p className="font-medium text-gray-500 mb-8 text-sm max-w-[300px] text-balance">
            Explora lugares únicos, colecciona sellos digitales y gana recompensas exclusivas mientras descubres los mejores rincones de la ciudad.
          </p>

          <div className="space-y-3 max-w-sm">
            <button onClick={() => navigateTo('REGISTER_CHOICE')} className="w-full py-5 bg-[#253884] text-white font-bold uppercase text-lg rounded-2xl shadow-xl active:scale-[0.97] transition-transform">
              Comenzar Ahora
            </button>
            <p className="text-xs text-gray-400 px-2 text-balance">Únete a cientos de exploradores y comercios locales.</p>
          </div>
        </motion.div>

        <div className="relative w-40 h-40 mb-12 self-end -mr-2">
          <div className="absolute inset-0 bg-[#e6eaf8] rounded-full scale-110 opacity-50" />
          <div className="absolute inset-0 bg-[#e6eaf8] rounded-full" />
          <img src={ICONS.NAV_PASSPORT} className="w-24 h-24 relative z-10 ml-8 mt-8" alt="Passport" />
        </div>

        <h2 className="text-2xl font-heading text-[#191308] mb-6">¿Cómo Funciona?</h2>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-12"
        >
          {[
            { icon: <img src={ICONS.NAV_MAP} className="w-6 h-6" alt="" />, bg: 'bg-[#D5A021]/10', title: 'Descubre Retos', desc: 'Encuentra cafeterías, museos y tiendas locales con misiones especiales esperándote.' },
            { icon: <img src={ICONS.NAV_PASSPORT} className="w-6 h-6" alt="" />, bg: 'bg-[#253884]/10', title: 'Colecciona Sellos', desc: 'Completa la misión, escanea tu QR en el local y obtén tu sello digital al instante.' },
            { icon: <img src={ICONS.STAR_FILLED} className="w-6 h-6" alt="" />, bg: 'bg-[#B3001B]/10', title: 'Gana Recompensas', desc: 'Acumula sellos en tu pasaporte y canjéalos por descuentos, productos gratis y más.' },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#253884] mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );

  const renderUserLogin = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full relative z-10">
          <h1 className="text-4xl font-heading text-center mb-10 text-[#253884]">Bienvenido</h1>
          <YetiLogin onLogin={() => handleLoggedAction('USER_ONBOARDING_PREFS')} />
          <div className="mt-8 text-center text-sm font-semibold">
            <span className="text-gray-400 block mb-1">¿Aún no tienes cuenta?</span>
            <button onClick={() => navigateTo('USER_REGISTER')} className="text-[#253884] font-bold mt-1 hover:underline">Regístrate Aquí</button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderUserRegister = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 pb-24 relative flex flex-col items-center pt-16">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <h1 className="text-4xl font-heading mb-6 text-center text-[#253884]">Crear Perfil</h1>

        <div className="bg-white p-8 rounded-3xl subtle-shadow w-full card-shadow">
          <div className="space-y-4">
            <input type="text" placeholder="Nombre o Apodo" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
            <input type="email" placeholder="Correo Electrónico" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
            <input type="password" placeholder="Contraseña Segura" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />

            <div className="pt-6 border-t border-gray-100">
              <p className="font-bold text-center mb-4 text-sm text-gray-500">¿Qué avatar te representa?</p>
              <div className="flex gap-4 p-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`flex-none w-20 h-20 rounded-full border-4 snap-center transition-[transform,border-color,opacity] duration-200 overflow-hidden ${selectedAvatar === avatar ? 'border-[#253884] scale-110 shadow-lg' : 'border-transparent opacity-60 scale-95 bg-gray-50'}`}
                  >
                    <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleLoggedAction('USER_ONBOARDING_PREFS')} className="w-full py-4 bg-[#253884] text-white font-bold text-lg rounded-xl mt-6 subtle-shadow active:scale-[0.97] transition-transform uppercase">
              Todo Listo
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderUserOnboardingPrefs = () => {
    const toggleCategory = (id: string) => {
      setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    return (
      <Layout bgClass="bg-white">
        <div className="flex-1 pb-24 px-6 pt-12 flex flex-col relative h-full">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-heading text-[#253884] text-center tracking-tight mb-2">¿Qué te interesa?</h2>
            <p className="text-gray-500 text-sm text-center">Elige tus favoritos para personalizar tu ruta</p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {ALL_CATEGORIES.map(cat => {
                const isSelected = selectedCategories.includes(cat.id);
                const CatIcon = CAT_ICON_MAP[cat.id] ?? MapPin;
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`relative overflow-hidden rounded-full px-5 py-3 font-bold transition-[background-color,border-color,transform,box-shadow] border-2 text-sm flex items-center gap-2 active:scale-[0.97] ${isSelected ? 'bg-[#253884] text-white border-[#253884] shadow-lg scale-105' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
                  >
                    <CatIcon size={15} strokeWidth={2} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <button
              onClick={() => navigateTo('USER_HOME')}
              disabled={selectedCategories.length === 0}
              className={`w-full py-4 text-white font-bold uppercase text-lg rounded-2xl transition-[background-color,transform] active:scale-[0.97] ${selectedCategories.length > 0 ? 'bg-[#253884] subtle-shadow' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Continuar a Explorar
            </button>
          </div>
        </div>
      </Layout>
    );
  };

  const renderUserHome = () => {
    const suggestedPOIs = POIS.filter(poi => !savedPOIs.includes(poi.id)).slice(0, 3);

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          <div className="bg-[#253884] px-6 pt-12 pb-10 rounded-b-[2.5rem] relative z-20 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wider">Hola,</p>
                <h2 className="text-4xl font-heading text-white tracking-tight">Explorador</h2>
              </div>
              <button onClick={() => navigateTo('USER_PROFILE')} className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/10 overflow-hidden shadow-sm active:scale-[0.97] transition-transform">
                <img src={selectedAvatar} className="w-full h-full object-cover" alt="Perfil" />
              </button>
            </div>
            <button onClick={() => navigateTo('USER_SEARCH')} className="w-full bg-white shadow-lg rounded-2xl p-4 flex items-center relative z-10 text-left active:scale-[0.98] transition-transform">
              <img src={ICONS.SEARCH} className="w-5 h-5 mr-3 opacity-40" alt="Buscar" />
              <span className="font-medium text-gray-400 w-full text-base">¿A dónde vamos hoy?</span>
            </button>
          </div>

          <div className="flex-1 px-6 pt-8 pb-10 space-y-8 relative z-10 w-full">
            <div className="w-full">
              <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-4">Descubrimientos</h3>
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {suggestedPOIs.map(poi => (
                  <motion.div
                    key={poi.id}
                    variants={itemVariants}
                    onClick={() => navigateTo('USER_SEARCH', poi.id)}
                    className="bg-white rounded-3xl subtle-shadow overflow-hidden cursor-pointer"
                  >
                    <div className={`h-40 ${poi.color.split(' ')[0]} relative flex items-center justify-center`}>
                      <div className={poi.color.split(' ')[1]}>
                        <PoiIcon id={poi.id} size={60} strokeWidth={1} />
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 font-bold text-xs flex items-center text-[#253884] subtle-shadow">
                        <img src={ICONS.STAR_FILLED} className="w-3 h-3 mr-1 invert" alt="" /> 4.8
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-2xl font-heading mb-1 text-[#253884]">{poi.name}</h4>
                      <p className="text-xs text-gray-500 font-medium mb-4 flex items-center gap-1">
                        <img src={ICONS.NAV_MAP} className="w-3 h-3 opacity-50" alt="" />
                        {poi.location}
                      </p>
                      <div className="flex justify-between items-center bg-gray-50 rounded-xl p-2">
                        <span className="text-[#253884] font-bold px-3 py-1 text-xs">{poi.category}</span>
                        <button className="bg-[#253884] text-white px-5 py-2 rounded-lg font-bold text-xs subtle-shadow uppercase active:scale-[0.97] transition-transform">Detalles</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <BottomNav active="home" />
      </Layout>
    );
  };

  const renderUserWallet = () => {
    const myRoute = POIS.filter(poi => savedPOIs.includes(poi.id));
    const totalSlots = 6;

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 p-6 pt-12 flex flex-col items-center relative">
          <div className="absolute inset-0 bg-[#e6eaf8] opacity-50 z-0 h-64 rounded-b-[3rem]" />

          <div className="relative z-10 w-full mb-6 text-center">
            <h2 className="text-3xl font-heading text-[#253884] mb-3 tracking-tight">Mi Pasaporte</h2>
          </div>

          <div className="relative z-10 w-full">
            <div className="bg-white rounded-3xl p-6 subtle-shadow card-shadow relative">
              <div className="flex items-center gap-4 mb-6 pt-2">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                  <img src={selectedAvatar} className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <div>
                  <p className="text-xl font-heading text-[#253884]">Explorador</p>
                  <p className="font-medium text-xs text-gray-500">{myRoute.length} Paradas Planeadas</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: totalSlots }).map((_, index) => {
                  const poi = myRoute[index];
                  if (poi) {
                    const isStamped = stampedPOIs.includes(poi.id);
                    const isJustStamped = justStampedId === poi.id;
                    return (
                      <div
                        key={poi.id}
                        onClick={() => { if (!isStamped) setQrModalPOIId(poi.id); else navigateTo('USER_SEARCH', poi.id); }}
                        className={`aspect-square ${poi.color} rounded-2xl flex flex-col items-center justify-center p-2 relative overflow-hidden border border-blue-200 cursor-pointer active:scale-[0.97] transition-transform shadow-sm ${isJustStamped ? 'animate-stamp-ring' : ''}`}
                      >
                        {isStamped && (
                          <div className={`absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md z-10 border border-blue-100 ${isJustStamped ? 'animate-stamp-in' : ''}`}>
                            <img src={ICONS.LOGO} alt="Stamped" className="w-4 h-4" />
                          </div>
                        )}
                        <div className={`${isStamped ? '' : 'opacity-40'} transition-opacity duration-200`}>
                          <PoiIcon id={poi.id} size={28} strokeWidth={1.5} />
                        </div>
                        <p className="text-[8px] font-bold text-[#253884] uppercase mt-2 text-center leading-tight truncate w-full">{poi.name}</p>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={`empty-${index}`}
                      onClick={() => navigateTo('USER_SEARCH')}
                      className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center active:scale-[0.97] transition-transform group"
                    >
                      <span className="text-gray-300 font-black text-2xl group-hover:text-[#253884] transition-colors duration-200">+</span>
                      <p className="text-[8px] font-bold text-gray-400 group-hover:text-[#253884] uppercase mt-1 transition-colors duration-200">Agregar</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-bold text-[#253884] uppercase tracking-widest opacity-60 mb-4">Ruta de Hoy</h3>
                <div className="space-y-3">
                  {myRoute.map((poi, idx) => {
                    const isStamped = stampedPOIs.includes(poi.id);
                    return (
                      <div
                        key={poi.id}
                        onClick={() => navigateTo('USER_SEARCH', poi.id)}
                        className={`relative rounded-2xl p-3 flex items-center gap-4 cursor-pointer transition-transform border active:scale-[0.98] ${isStamped ? 'bg-green-50 border-green-200 opacity-90' : 'bg-gray-50 border-gray-100'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${poi.color}`}>
                          <PoiIcon id={poi.id} size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#253884] text-sm truncate flex items-center gap-1">
                            {poi.name}
                            {poi.isFlash && (
                              <span className="bg-yellow-100 text-yellow-800 text-[9px] px-1.5 py-0.5 rounded-full ml-1 inline-flex items-center gap-0.5">
                                <Zap size={7} strokeWidth={2.5} /> FLASH
                              </span>
                            )}
                          </h4>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider truncate">{poi.category}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full font-black text-[10px] flex items-center justify-center shrink-0 ${isStamped ? 'bg-green-600 text-white' : 'bg-[#253884] text-white'}`}>
                          {isStamped ? <Check size={12} strokeWidth={3} /> : idx + 1}
                        </div>
                      </div>
                    );
                  })}
                  {myRoute.length < totalSlots && (
                    <button onClick={() => navigateTo('USER_SEARCH')} className="w-full bg-blue-50 border border-blue-100 border-dashed rounded-2xl p-4 text-center text-[#253884] font-bold text-xs active:scale-[0.97] transition-transform">
                      + Añadir otra parada
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* QR Stamp Modal — Emil: animate from scale(0.95), not scale(0) */}
          <AnimatePresence>
            {qrModalPOIId && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-50"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
                >
                  <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative flex flex-col items-center pointer-events-auto">
                    <button onClick={() => setQrModalPOIId(null)} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
                      <X size={14} strokeWidth={2.5} />
                    </button>
                    <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-2 text-center mt-2">Confirmar Parada</h3>
                    <p className="text-center text-gray-500 text-sm font-medium mb-6">Muestra este código al comercio para escanear y recibir tu sello y beneficios.</p>

                    <div className="bg-white p-4 rounded-3xl border-4 border-[#253884] subtle-shadow mb-6">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=sp-stamp-${qrModalPOIId}`} alt="QR de Pasaporte" className="w-48 h-48 mix-blend-multiply" />
                    </div>

                    <button
                      onClick={() => {
                        const id = qrModalPOIId!;
                        setStampedPOIs(prev => [...prev, id]);
                        setJustStampedId(id);
                        setQrModalPOIId(null);
                        setTimeout(() => setJustStampedId(null), 1200);
                      }}
                      className="w-full bg-[#253884] text-white py-4 rounded-xl font-bold uppercase tracking-wide subtle-shadow active:scale-[0.97] transition-transform"
                    >
                      [Demo] Simular Escaneo
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <BottomNav active="wallet" />
        </div>
      </Layout>
    );
  };

  const renderUserProfile = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 p-6 pt-12 flex flex-col items-center">
        <h2 className="text-4xl font-heading text-[#253884] mb-10 tracking-tight">Mi Perfil</h2>

        <div className="relative mb-6 z-10 w-32 h-32">
          <div className="w-full h-full rounded-full bg-white overflow-hidden subtle-shadow border-4 border-white">
            <img src={selectedAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 bg-[#253884] text-white w-10 h-10 rounded-full flex items-center justify-center subtle-shadow active:scale-[0.97] transition-transform">
            <Pencil size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="w-full space-y-4 mb-4">
          <h3 className="text-xl font-heading text-[#253884] tracking-tight px-2">Kardex de Niveles</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
            <div className="snap-center shrink-0 w-[85%] bg-gray-200 rounded-3xl p-5 subtle-shadow text-gray-500 relative overflow-hidden grayscale">
              <div className="absolute -right-4 -bottom-4 opacity-10 text-blue-400">
                <Sprout size={80} strokeWidth={1} />
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1">Nivel 1</p>
              <p className="text-2xl font-heading mb-1 text-gray-700">Turista Novato</p>
              <p className="text-xs mb-4 font-medium">Completado</p>
              <div className="bg-white/50 p-3 rounded-xl border border-white/20">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2">Beneficios:</p>
                <ul className="text-xs space-y-1 font-medium">
                  <li>• Emblema base</li>
                </ul>
              </div>
            </div>

            <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-[#253884] to-blue-600 rounded-3xl p-5 subtle-shadow text-white relative overflow-hidden ring-4 ring-blue-300">
              <div className="absolute -right-4 -bottom-4 opacity-20 text-yellow-300">
                <Crown size={80} strokeWidth={1} />
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-blue-200">Nivel 2 (Actual)</p>
              <p className="text-3xl font-heading mb-1">Mochilero Pro</p>
              <p className="text-xs text-blue-100 mb-4 font-medium">850 XP / 1000 XP</p>
              <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-4 opacity-80">
                Faltan 150 pts para <span className="text-yellow-300">Explorador Maestro</span>
              </p>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2">Beneficios Actuales:</p>
                <ul className="text-xs space-y-1 font-medium">
                  <li>• 10% dcto. en Museos</li>
                  <li>• 2x1 en Café Central</li>
                </ul>
              </div>
            </div>

            <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-amber-400 to-yellow-600 rounded-3xl p-5 subtle-shadow text-white relative overflow-hidden opacity-90">
              <div className="absolute -right-4 -bottom-4 opacity-20 text-white">
                <Trophy size={80} strokeWidth={1} />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-amber-100 uppercase mb-1">Nivel 3</p>
              <p className="text-2xl font-heading mb-1">Explorador Maestro</p>
              <p className="text-xs text-amber-100 mb-4 font-medium">Bloqueado</p>
              <div className="bg-black/10 p-3 rounded-xl border border-white/20">
                <p className="text-[10px] font-bold uppercase text-yellow-100 tracking-wider mb-2">Beneficios a Desbloquear:</p>
                <ul className="text-xs space-y-1 font-medium text-white/90">
                  <li>• Entrada VIP a Eventos Flash</li>
                  <li>• Acceso a retos exclusivos</li>
                </ul>
              </div>
            </div>
          </div>

          <button onClick={() => navigateTo('USER_REVIEWS')} className="w-full bg-white px-5 py-4 rounded-2xl subtle-shadow font-bold text-[#253884] flex items-center justify-between active:scale-[0.97] transition-transform">
            <span className="flex items-center gap-3">
              <img src={ICONS.STAR_FILLED} className="w-5 h-5 opacity-80" alt="" /> Mis Reseñas
            </span>
            <ArrowRight size={16} strokeWidth={2} className="text-gray-300" />
          </button>
        </div>

        <div className="w-full bg-white rounded-3xl p-6 font-bold space-y-4 subtle-shadow">
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Nombre</label>
            <p className="text-2xl font-heading text-[#253884]">Explorador</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Correo Electrónico</label>
            <p className="text-base font-semibold text-gray-700">explorador@aventura.com</p>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-[#253884]">12</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Reseñas</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-[#253884]">2</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Sellos</p>
            </div>
          </div>
          <div className="pt-6">
            <button onClick={() => navigateTo('ONBOARDING')} className="w-full py-4 bg-gray-50 text-red-600 rounded-xl font-bold text-sm tracking-wide border border-transparent hover:border-red-100 active:scale-[0.97] transition-transform">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </Layout>
  );

  const renderUserReviews = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 p-6 pt-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-4xl font-heading text-[#253884] tracking-tight">Mis Reseñas</h2>
          <img src={ICONS.STAR_FILLED} className="w-8 h-8 opacity-80" alt="" />
        </div>

        <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
          {[1, 2, 3].map(i => (
            <motion.div key={i} variants={itemVariants} className="bg-white p-5 rounded-3xl subtle-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-2xl font-heading text-[#253884]">Café El Molino {i}</h4>
                  <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Hace {i} días</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3].map(s => <img key={s} src={ICONS.STAR_FILLED} className="w-4 h-4" alt="" />)}
                {[4, 5].map(s => <img key={s} src={ICONS.STAR_HOLLOW} className="w-4 h-4 opacity-50" alt="" />)}
              </div>
              <p className="text-sm font-medium leading-relaxed text-gray-600">
                El lugar está increíble, el ambiente lo super vale. Totalmente recomendado.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <BottomNav active="reviews" />
    </Layout>
  );

  const renderCommerceLogin = () => (
    <Layout bgClass="bg-[#253884]">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative text-white">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white/10 border border-white/20 w-10 h-10 rounded-full flex justify-center items-center z-20 text-white active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <img src={ICONS.LOGO} alt="SalePlan" className="h-10 filter brightness-0 invert" />
              <span className="font-heading text-3xl text-white tracking-tighter pt-1">SalePlan</span>
            </div>
            <h1 className="text-4xl font-heading text-white tracking-tight">Portal Negocio</h1>
            <p className="font-bold text-blue-200 text-xs uppercase mt-3 tracking-widest">Acceso Exclusivo</p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-3xl subtle-shadow text-[#253884]">
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">ID Comercio</label>
              <input type="text" className="w-full bg-gray-50 border-2 border-transparent px-4 pt-4 pb-3 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-[border-color,background-color]" placeholder="COM-0001" />
            </div>
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Código de Seguridad</label>
              <input type="password" className="w-full bg-gray-50 border-2 border-transparent px-4 pt-4 pb-3 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-[border-color,background-color]" placeholder="••••••" />
            </div>
            <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="w-full py-4 mt-6 bg-[#253884] text-white font-bold text-lg uppercase tracking-wide rounded-xl subtle-shadow active:scale-[0.97] transition-transform">
              Acceder
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderCommerceDashboard = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 flex flex-col w-full h-full pb-10">
        <div className="bg-[#253884] p-6 pb-12 relative z-20 shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-4xl font-heading text-white tracking-tight">Café Central</h2>
              <p className="font-bold text-[10px] uppercase text-blue-200 mt-1 tracking-widest">Dashboard Activo</p>
            </div>
            <button onClick={() => navigateTo('ONBOARDING')} className="px-4 py-2 border border-white/20 bg-white/10 rounded-xl font-bold text-xs text-white active:scale-[0.97] transition-transform uppercase">
              Salir
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/10 border border-white/10 text-white p-5 rounded-2xl backdrop-blur">
              <p className="font-bold text-[10px] uppercase tracking-wider text-blue-200">Escaneos Hoy</p>
              <p className="font-black text-4xl mt-1">142</p>
            </div>
            <div className="bg-white/10 border border-white/10 text-white p-5 rounded-2xl backdrop-blur">
              <p className="font-bold text-[10px] uppercase tracking-wider text-blue-200">Rating Global</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-black text-4xl">4.8</p>
                <img src={ICONS.STAR_FILLED} className="w-5 h-5 -mt-1 opacity-80" alt="" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 relative z-10 p-1 bg-white/10 rounded-xl">
            {(['ESCANEO', 'CRM', 'CONFIG'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setCommerceTab(tab)}
                className={`flex-1 py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors duration-200 active:scale-[0.97] ${commerceTab === tab ? 'bg-white text-[#253884]' : 'text-blue-100'}`}
              >
                {tab === 'ESCANEO' ? 'Retos' : tab === 'CRM' ? 'CRM' : 'Ajustes'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 relative z-10 w-full mt-2">
          {commerceTab === 'ESCANEO' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-6">
              <button onClick={() => alert('Abriendo cámara para Escanear Pasaporte QR...')} className="w-full py-4 bg-[#253884] text-white rounded-2xl shadow-lg font-bold text-lg uppercase tracking-wide active:scale-[0.97] transition-transform flex items-center justify-center gap-3">
                <ScanLine size={22} strokeWidth={2} /> <span>Escanear QR</span>
              </button>

              <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-2 pt-2">Mis Retos Activos</h3>
              <div className="bg-white p-5 rounded-3xl subtle-shadow flex gap-4 cursor-pointer border border-gray-100 active:scale-[0.98] transition-transform">
                <div className="w-16 h-16 bg-[#e6eaf8] rounded-2xl flex items-center justify-center font-black text-[#253884] text-2xl">
                  <QrCode size={28} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-heading text-[#253884] leading-tight">Degustación de Verano</h4>
                  <p className="font-bold text-[10px] uppercase text-green-700 bg-green-50 inline-block px-2 py-1 rounded-md mt-2">Activa hasta 12/Agt</p>
                  <div className="mt-4">
                    <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="text-[10px] bg-gray-50 text-[#253884] px-4 py-2 rounded-lg font-bold uppercase tracking-wide active:scale-[0.97] transition-transform">Editar Reto</button>
                  </div>
                </div>
              </div>

              <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="w-full py-10 border-2 border-dashed border-[#253884]/30 bg-white rounded-3xl text-center active:scale-[0.97] transition-transform">
                <span className="text-3xl font-black text-[#253884] mb-2 block opacity-50">+</span>
                <span className="font-bold text-sm uppercase text-[#253884] tracking-wider">Crear Nuevo Reto</span>
              </button>
            </motion.div>
          )}

          {commerceTab === 'CRM' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-2xl font-heading text-[#253884] tracking-tight pt-2">Contactos & AI</h3>
              </div>

              <div className="relative">
                <input type="text" placeholder="Buscar por nombre, teléfono o ID..." className="w-full px-5 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl outline-none placeholder:text-gray-400 focus:border-[#253884] transition-[border-color] font-medium subtle-shadow" />
                <img src={ICONS.SEARCH} className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" alt="" />
              </div>

              <div className="bg-[#253884] rounded-3xl subtle-shadow p-5 mt-4 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} strokeWidth={1.5} />
                  <h4 className="font-bold text-lg font-heading tracking-wide">Predicciones SalePlan</h4>
                </div>
                <p className="text-xs text-blue-200 mb-4 bg-black/10 p-3 rounded-xl border border-white/10">Identificamos usuarios con alta probabilidad de visitar tu comercio hoy según rutas.</p>

                <div className="space-y-3">
                  {[{ name: 'Valentina Cruz', avatar: AVATARS[0], prob: '94%' }, { name: 'Ricardo Morales', avatar: AVATARS[3], prob: '87%' }].map(user => (
                    <div key={user.name} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shrink-0">
                        <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white leading-tight truncate">{user.name}</p>
                        <p className="text-[9px] text-blue-200 font-bold uppercase truncate mt-1">{user.prob} de Probabilidad</p>
                      </div>
                      <div className="shrink-0">
                        <button className="bg-white text-[#253884] text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-[0.97] transition-transform">Invitar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl subtle-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h4 className="font-bold text-[#253884]">Directorio Activo</h4>
                  <button onClick={() => alert('Descargando lista de contactos en CSV...')} className="text-[9px] bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 uppercase tracking-widest active:scale-[0.97] transition-transform">
                    CSV
                  </button>
                </div>
                <div className="space-y-5">
                  {CRM_CONTACTS.map(contact => (
                    <div key={contact.name} className="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-xl active:scale-[0.98] transition-transform">
                      <div className={`w-12 h-12 rounded-full border-2 overflow-hidden shrink-0 flex items-center justify-center font-black text-xl ${contact.badge === 'Frecuente' ? 'border-[#253884]' : contact.badge === 'Nuevo' ? 'border-green-400' : 'border-gray-100'} ${!contact.avatar ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}`}>
                        {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" alt="User" /> : contact.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#253884] leading-tight truncate">{contact.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase truncate">{contact.time}</p>
                      </div>
                      {contact.badge && (
                        <div className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase flex items-center gap-1 shadow-sm border ${contact.badge === 'Frecuente' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                          <Sparkles size={10} strokeWidth={2} /> {contact.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {commerceTab === 'CONFIG' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-4">
              <div className="bg-white rounded-3xl p-6 subtle-shadow border border-gray-100 mb-6">
                <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-2">Nombre Comercial</p>
                <p className="text-xl font-heading text-[#253884] border-b border-gray-100 pb-4 mb-4">Café Central</p>
                <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-2">Administrador</p>
                <p className="text-xl font-heading text-[#253884]">Juan Pérez</p>
              </div>
              <button className="w-full bg-white text-red-600 font-bold rounded-2xl py-4 subtle-shadow border border-red-100 active:scale-[0.97] transition-transform uppercase tracking-wide">
                Cerrar Sesión Negocio
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );

  const renderCommerceCreateExperience = () => (
    <Layout bgClass="bg-gray-50 p-6 pb-24">
      <div className="flex items-center mb-8 pt-4">
        <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 mr-4 text-gray-500 active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <h2 className="text-3xl font-heading text-[#253884] tracking-tight">Nuevo Reto</h2>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-3xl subtle-shadow">
        <div className="w-full h-40 border-2 border-dashed border-[#253884]/20 bg-[#e6eaf8]/50 flex items-center justify-center cursor-pointer active:scale-[0.98] transition-transform rounded-2xl">
          <span className="font-bold uppercase text-xs bg-white px-5 py-3 rounded-xl text-[#253884] subtle-shadow">Subir Foto o Flyer</span>
        </div>

        <div>
          <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Título del Reto</label>
          <input type="text" className="w-full bg-gray-50 px-4 py-4 focus:bg-white outline-none rounded-xl font-semibold text-sm transition-[background-color,border-color] border-2 border-transparent focus:border-[#253884]" placeholder="Ej: Especial de Café al 2x1" />
        </div>

        <div>
          <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Condiciones</label>
          <textarea className="w-full bg-gray-50 px-4 py-4 focus:bg-white outline-none rounded-xl font-semibold text-sm h-32 resize-none transition-[background-color,border-color] border-2 border-transparent focus:border-[#253884]" placeholder="Instrucciones para validar el sello..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Tipo de Evento</label>
            <select className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-[border-color,background-color] focus:border-[#253884] focus:bg-white text-[#253884]">
              <option>Reto Regular</option>
              <option>Evento Flash (Doble Puntos)</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Válido hasta</label>
            <input type="date" className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-[border-color,background-color] focus:border-[#253884] focus:bg-white" />
          </div>
          <div>
            <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Valor en Sellos</label>
            <input type="number" defaultValue={1} min={1} className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-[border-color,background-color] focus:border-[#253884] focus:bg-white" />
          </div>
        </div>

        <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="w-full py-4 mt-8 bg-[#253884] text-white rounded-xl subtle-shadow font-bold text-lg uppercase tracking-wide active:scale-[0.97] transition-transform">
          Publicar Reto
        </button>
      </div>
    </Layout>
  );

  const renderUserSearch = () => {
    if (selectedPOI !== null) {
      const poi = POIS.find(p => p.id === selectedPOI);
      if (!poi) return null;
      const isSaved = savedPOIs.includes(poi.id);

      return (
        <Layout bgClass="bg-white">
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
            <div className={`h-64 ${poi.color.split(' ')[0]} relative w-full rounded-b-[2.5rem] flex items-center justify-center p-6 shadow-sm`}>
              <button onClick={() => window.history.back()} className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-[0.97] transition-transform">
                <ChevronLeft size={20} strokeWidth={2} className="text-[#253884]" />
              </button>
              <div className={poi.color.split(' ')[1]}>
                <PoiIcon id={poi.id} size={80} strokeWidth={0.9} />
              </div>
            </div>

            <div className="px-6 py-8">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-4xl font-heading text-[#253884] pr-4">{poi.name}</h2>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded-lg">{poi.category}</span>
                <span className="text-sm font-semibold text-gray-400">·</span>
                <span className="text-sm font-semibold text-gray-500">{poi.location}</span>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-10">{poi.description}</p>

              <div className="space-y-4">
                {poi.isFlash && (
                  <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                    <p className="font-bold text-yellow-800 mb-2 flex items-center gap-1.5">
                      <Zap size={14} strokeWidth={2.5} /> Selecciona tu Asistencia
                    </p>
                    <p className="text-xs text-yellow-700 mb-4 font-medium">Este evento tiene horarios definidos o varios días.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <select className="bg-white border-2 border-yellow-200 rounded-xl px-3 py-2 text-xs font-bold text-yellow-900 outline-none">
                        <option>Hoy</option><option>Mañana</option><option>Viernes 18</option>
                      </select>
                      <select className="bg-white border-2 border-yellow-200 rounded-xl px-3 py-2 text-xs font-bold text-yellow-900 outline-none">
                        <option>18:00 hrs</option><option>19:00 hrs</option><option>20:00 hrs</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-yellow-600">
                    <Crown size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-[#253884]">{poi.isFlash ? 'Recompensa Limitada' : 'Recompensa Actual'}</p>
                    <p className="text-xs font-medium text-gray-500">{poi.pts || '1 Sello + 10% Descuento'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 w-full max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe flex gap-3">
              <button
                onClick={() => setSavedPOIs(prev => isSaved ? prev.filter(id => id !== poi.id) : [...prev, poi.id])}
                className={`flex-1 py-4 font-bold text-lg rounded-2xl shadow-sm transition-[background-color,color] active:scale-[0.97] ${isSaved ? 'bg-gray-100 text-gray-500' : 'bg-[#253884] text-white'}`}
              >
                {isSaved ? 'En Mi Ruta' : 'Agregar a Ruta'}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: poi.name, text: `¡Te invito a ir a ${poi.name} en SalePlan!`, url: window.location.href });
                  } else {
                    alert(`Enlace copiado para compartir: ${poi.name}`);
                  }
                }}
                className="w-16 flex items-center justify-center shrink-0 bg-[#e6eaf8] text-[#253884] rounded-2xl active:scale-[0.97] transition-transform"
              >
                <Share2 size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Layout>
      );
    }

    const query = searchQuery.toLowerCase().trim();
    const regularPOIs = POIS.filter(p => !p.isFlash);
    const filteredPOIs = query
      ? regularPOIs.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
        )
      : regularPOIs;

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          {/* Compact header — keeps flash events above fold */}
          <div className="bg-[#253884] px-6 pt-10 pb-5 shadow-sm relative z-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="text-2xl font-heading text-white tracking-tight">Explorar</h2>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{filteredPOIs.length} lugares</span>
            </div>
            <div className="relative z-10">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar lugares, categorías..."
                className="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 text-white rounded-2xl outline-none placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40 transition-[background-color,border-color] font-medium text-sm"
              />
              <img src={ICONS.SEARCH} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 invert opacity-70" alt="" />
            </div>
          </div>

          <div className="px-5 pt-5 pb-2">
            {/* Flash events — visible on first glance, no search filter applied */}
            {!query && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-heading text-[#253884] tracking-tight flex items-center gap-1.5">
                    Eventos Flash <Zap size={14} strokeWidth={2.5} className="text-yellow-500" />
                  </h3>
                  <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-full uppercase tracking-wider">{FLASH_EVENTS.length} activos</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {FLASH_EVENTS.map(event => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedPOI(event.id)}
                      className="bg-white rounded-2xl p-3.5 border-2 border-yellow-200 relative overflow-hidden cursor-pointer active:scale-[0.97] transition-transform subtle-shadow"
                    >
                      <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-black text-[9px] uppercase px-2 py-0.5 rounded-bl-xl z-10 tracking-widest leading-tight">
                        {event.pts}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center border border-yellow-100 mb-2">
                        <PoiIcon id={event.id} size={18} strokeWidth={1.5} />
                      </div>
                      <h4 className="font-bold text-[#253884] text-xs leading-tight mb-1 pr-2">{event.name}</h4>
                      <p className="font-bold text-[9px] text-gray-400 uppercase tracking-wider truncate">{event.location}</p>
                      <p className="font-bold text-[9px] text-yellow-700 mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
              <button className="px-4 py-1.5 bg-[#253884] text-white rounded-full font-bold text-xs whitespace-nowrap shadow-sm active:scale-[0.97] transition-transform">Todos</button>
              {ALL_CATEGORIES.map(cat => {
                const CatIcon = CAT_ICON_MAP[cat.id] ?? MapPin;
                return (
                  <button key={cat.id} className="px-3 py-1.5 bg-white text-gray-600 rounded-full font-bold text-xs whitespace-nowrap shadow-sm border border-gray-100 flex items-center gap-1 active:scale-[0.97] transition-transform">
                    <CatIcon size={11} strokeWidth={2} /> {cat.name}
                  </button>
                );
              })}
            </div>

            {/* POI grid */}
            {filteredPOIs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-gray-400 font-bold text-sm">No se encontraron resultados para</p>
                <p className="text-[#253884] font-heading text-xl mt-1">"{searchQuery}"</p>
              </div>
            ) : (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-3"
              >
                {filteredPOIs.map(poi => {
                  const isSaved = savedPOIs.includes(poi.id);
                  return (
                    <motion.div
                      key={poi.id}
                      variants={itemVariants}
                      onClick={() => setSelectedPOI(poi.id)}
                      className="bg-white rounded-2xl p-3.5 subtle-shadow relative flex flex-col items-center text-center cursor-pointer active:scale-[0.97] transition-transform"
                    >
                      <button
                        onClick={e => { e.stopPropagation(); setSavedPOIs(prev => isSaved ? prev.filter(id => id !== poi.id) : [...prev, poi.id]); }}
                        className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-[background-color,color] ${isSaved ? 'bg-[#253884] text-white' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {isSaved ? <Check size={12} strokeWidth={2.5} /> : '+'}
                      </button>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2.5 border ${poi.color}`}>
                        <PoiIcon id={poi.id} size={26} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-[#253884] text-sm leading-tight mb-0.5">{poi.name}</h3>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{poi.category}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
        <BottomNav active="search" />
      </Layout>
    );
  };

  const renderLoginChoice = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
          <h1 className="text-4xl font-heading text-[#253884] mb-4">Bienvenido de vuelta</h1>
          <p className="text-gray-500 font-medium mb-12">Selecciona cómo deseas ingresar a SalePlan.</p>

          <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
            <motion.button
              variants={itemVariants}
              onClick={() => navigateTo('USER_LOGIN')}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-[border-color] group active:scale-[0.97]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#253884] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Backpack size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-[#253884]">Soy Explorador</h3>
                  <p className="text-xs text-gray-400 font-medium">Continuar mis aventuras</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={() => navigateTo('COMMERCE_LOGIN')}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-[border-color] group active:scale-[0.97]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Store size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-[#253884]">Mi Negocio</h3>
                  <p className="text-xs text-gray-400 font-medium">Gestionar mi establecimiento</p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );

  const renderRegisterChoice = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
          <h1 className="text-4xl font-heading text-[#253884] mb-4">¿Cómo quieres participar?</h1>
          <p className="text-gray-500 font-medium mb-12">Elige tu perfil para comenzar la experiencia SalePlan.</p>

          <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
            <motion.button
              variants={itemVariants}
              onClick={() => navigateTo('USER_REGISTER')}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-[border-color] group active:scale-[0.97]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#253884] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Backpack size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-[#253884]">Como Explorador</h3>
                  <p className="text-xs text-gray-400 font-medium">Busco aventuras y premios</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              variants={itemVariants}
              onClick={() => navigateTo('COMMERCE_LOGIN')}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-[border-color] group active:scale-[0.97]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Store size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-[#253884]">Mi Negocio</h3>
                  <p className="text-xs text-gray-400 font-medium">Quiero atraer nuevos clientes</p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'ONBOARDING':                 return renderOnboarding();
      case 'REGISTER_CHOICE':            return renderRegisterChoice();
      case 'LOGIN_CHOICE':               return renderLoginChoice();
      case 'FAQ':      return renderStaticPage('Preguntas Frecuentes', '1. ¿Qué es el Pasaporte SalePlan?\nEs tu herramienta para descubrir la ciudad y ganar premios.\n\n2. ¿Cómo gano sellos?\nEscaneando el código QR en los comercios aliados al completar un reto.\n\n3. ¿Tienen costo los sellos?\nNo, son gratuitos al realizar consumos o actividades en los locales.');
      case 'ABOUT':    return renderStaticPage('Acerca de', 'SalePlan nació con la misión de reconectar a las personas con su ciudad, fomentando el apoyo al comercio local a través de la gamificación y experiencias únicas.');
      case 'CONTACT':  return renderStaticPage('Contacto', '¿Tienes dudas? Escríbenos a soporte@saleplan.com o llámanos al +503 2233-4455. Estamos para ayudarte de lunes a domingo de 8am a 8pm.');
      case 'AFFILIATE': return renderStaticPage('Afíliate', '¿Tienes un negocio y quieres atraer más clientes? Únete a SalePlan y crea retos increíbles para nuestra comunidad de exploradores. Contáctanos en ventas@saleplan.com');
      case 'USER_LOGIN':                 return renderUserLogin();
      case 'USER_REGISTER':              return renderUserRegister();
      case 'USER_ONBOARDING_PREFS':      return renderUserOnboardingPrefs();
      case 'USER_HOME':                  return renderUserHome();
      case 'USER_SEARCH':                return renderUserSearch();
      case 'USER_WALLET':                return renderUserWallet();
      case 'USER_REVIEWS':               return renderUserReviews();
      case 'USER_PROFILE':               return renderUserProfile();
      case 'COMMERCE_LOGIN':             return renderCommerceLogin();
      case 'COMMERCE_DASHBOARD':         return renderCommerceDashboard();
      case 'COMMERCE_CREATE_EXPERIENCE': return renderCommerceCreateExperience();
      default:                           return renderOnboarding();
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-gray-200">
      {renderCurrentScreen()}
      <PwaGuideModal />
    </div>
  );
}
