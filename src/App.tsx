import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, Book, Mail, HelpCircle, UserPlus, LogIn, Store, ChevronLeft,
  Coffee, Palette, UtensilsCrossed, Leaf, BookOpen, Landmark, Mountain, Music,
  ShoppingBag, Flower2, Utensils, Disc3, Camera, Guitar, Pizza, IceCream, MapPin,
  Zap, Crown, Backpack, Trophy, Sprout, ScanLine, Share2, Check, Pencil, Sparkles,
  QrCode, Waves, TreePine, Compass, Calendar, GripVertical, Lock
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

type Screen = 'ONBOARDING' | 'USER_LOGIN' | 'USER_REGISTER' | 'USER_ONBOARDING_PREFS' | 'USER_HOME' | 'USER_SEARCH' | 'USER_REVIEWS' | 'USER_PROFILE' | 'USER_WALLET' | 'USER_PLUS' | 'USER_PLUS_MANAGE' | 'USER_PAYMENT' | 'COMMERCE_LOGIN' | 'COMMERCE_DASHBOARD' | 'COMMERCE_CREATE_EXPERIENCE' | 'REGISTER_CHOICE' | 'LOGIN_CHOICE' | 'FAQ' | 'ABOUT' | 'CONTACT' | 'AFFILIATE';

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
  { id: 103, name: 'Flash Burger',       category: 'Evento Flash', location: 'Burger Fest',  description: 'Compra el combo "Explorador" para validar',                              pts: '3x Puntos (3 Sellos)', isFlash: true, date: 'Hoy, 12:00 - 15:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 104, name: 'Cena de Temporada',  category: 'Evento Flash', location: 'Restaurante Gaia', description: 'Menu degustacion exclusivo con maridaje de vinos nacionales',           pts: 'Reserva Prioritaria + 2 Sellos', isFlash: true, isPremium: true, date: 'Viernes 18, 20:00 - 23:00', color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  { id: 105, name: 'Rooftop Sessions',   category: 'Evento Flash', location: 'Hotel Sheraton',   description: 'Noche de jazz en el rooftop con barra libre de cocteles de autor',    pts: 'Experiencia VIP + 3 Sellos',    isFlash: true, isPremium: true, date: 'Sabado 19, 21:00 - 1:00',    color: "bg-indigo-50 text-indigo-800 border-indigo-200" }
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
  104: UtensilsCrossed, 105: Music,
};

function PoiIcon({ id, size = 24, strokeWidth = 1.5, className = '' }: {
  id: number; size?: number; strokeWidth?: number; className?: string;
}) {
  const Icon = POI_ICON_MAP[id] ?? MapPin;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}

const POI_IMAGE_MAP: Record<number, string> = {
  1:  'https://loremflickr.com/800/450/coffee,cafe?lock=1',
  2:  'https://loremflickr.com/800/450/art,museum?lock=2',
  3:  'https://loremflickr.com/800/450/burger,grill?lock=3',
  4:  'https://loremflickr.com/800/450/botanical,garden?lock=4',
  5:  'https://loremflickr.com/800/450/library,books?lock=5',
  6:  'https://loremflickr.com/800/450/icecream,dessert?lock=6',
  7:  'https://loremflickr.com/800/450/theater,stage?lock=7',
  8:  'https://loremflickr.com/800/450/viewpoint,landscape?lock=8',
  9:  'https://loremflickr.com/800/450/jazz,music?lock=9',
  10: 'https://loremflickr.com/800/450/pizza,restaurant?lock=10',
  11: 'https://loremflickr.com/800/450/vintage,fashion?lock=11',
  12: 'https://loremflickr.com/800/450/japanese,garden?lock=12',
  13: 'https://loremflickr.com/800/450/sushi,japanese?lock=13',
  14: 'https://loremflickr.com/800/450/vinyl,records?lock=14',
  15: 'https://loremflickr.com/800/450/market,food?lock=15',
  16: 'https://loremflickr.com/800/450/cathedral,church?lock=16',
  17: 'https://loremflickr.com/800/450/park,urban?lock=17',
  18: 'https://loremflickr.com/800/450/volcano,forest?lock=18',
  19: 'https://loremflickr.com/800/450/lake,crater?lock=19',
  20: 'https://loremflickr.com/800/450/colonial,architecture?lock=20',
  21: 'https://loremflickr.com/800/450/tortilla,latin?lock=21',
  22: 'https://loremflickr.com/800/450/artisan,market?lock=22',
  23: 'https://loremflickr.com/800/450/coffee,specialty?lock=23',
  24: 'https://loremflickr.com/800/450/gallery,contemporary?lock=24',
  25: 'https://loremflickr.com/800/450/flowers,colorful?lock=25',
  26: 'https://loremflickr.com/800/450/surf,beach?lock=26',
  27: 'https://loremflickr.com/800/450/ruins,pyramid?lock=27',
  28: 'https://loremflickr.com/800/450/volcano,hiking?lock=28',
  29: 'https://loremflickr.com/800/450/nightlife,cocktail?lock=29',
  30: 'https://loremflickr.com/800/450/rocks,panoramic?lock=30',
  31: 'https://loremflickr.com/800/450/barista,coffee?lock=31',
  32: 'https://loremflickr.com/800/450/whisky,bar?lock=32',
  33: 'https://loremflickr.com/800/450/lagoon,birds?lock=33',
  34: 'https://loremflickr.com/800/450/urban,art?lock=34',
  35: 'https://loremflickr.com/800/450/street,food?lock=35',
  36: 'https://loremflickr.com/800/450/tropical,beach?lock=36',
  37: 'https://loremflickr.com/800/450/weaving,artisan?lock=37',
  38: 'https://loremflickr.com/800/450/museum,archaeology?lock=38',
  39: 'https://loremflickr.com/800/450/hilltop,restaurant?lock=39',
  40: 'https://loremflickr.com/800/450/seafood,mariscos?lock=40',
  101:'https://loremflickr.com/800/450/concert,acoustic?lock=101',
  102:'https://loremflickr.com/800/450/museum,night?lock=102',
  103:'https://loremflickr.com/800/450/burger,festival?lock=103',
  104:'https://loremflickr.com/800/450/gourmet,restaurant?lock=104',
  105:'https://loremflickr.com/800/450/rooftop,jazz?lock=105',
};
const getPoiImage = (id: number) => POI_IMAGE_MAP[id] ?? `https://loremflickr.com/800/450/travel?lock=${id}`;

const VISIT_DAYS = [
  { label: 'Hoy — mié 20 may',   icon: '📅', text: 'Hoy' },
  { label: 'Mañana — jue 21 may', icon: '📅', text: 'Mañana' },
  { label: 'Sáb 23 de mayo',      icon: '📅', text: 'Sáb 23 may' },
  { label: 'Lun 25 de mayo',      icon: '📅', text: 'Lun 25 may' },
];
const VISIT_TIMES = [
  { label: 'Mañana  08:00 – 12:00', text: '08:00 – 12:00' },
  { label: 'Tarde   12:00 – 17:00', text: '12:00 – 17:00' },
  { label: 'Noche   17:00 – 22:00', text: '17:00 – 22:00' },
];

const getFlashStamps = (pts?: string): number => {
  if (!pts) return 1;
  if (pts.includes('3 Sellos')) return 3;
  if (pts.includes('2 Sellos')) return 2;
  return 1;
};

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

const LEVELS = [
  { n: 1,  name: 'Turista Novato',       xp: 0,    next: 200,   benefits: ['Sello de bienvenida SalePlan', 'Acceso completo al app'],                                    icon: Sprout,   grad: 'bg-gray-200 text-gray-700',       locked: false, done: true  },
  { n: 2,  name: 'Mochilero Pro',         xp: 850,  next: 1000,  benefits: ['10% dcto. en Museo de Arte', 'Café gratis c/ compra $5+ en Café Central', 'Insignia Explorer'],  icon: Crown,    grad: 'from-[#253884] to-blue-600',      locked: false, done: false, isCurrent: true },
  { n: 3,  name: 'Explorador Maestro',    xp: 0,    next: 1500,  benefits: ['Acceso VIP a Flash Events', '15% dcto. en Burger Fest', 'Prioridad en nuevos retos'],         icon: Trophy,   grad: 'from-amber-400 to-yellow-600',    locked: true  },
  { n: 4,  name: 'Cazador de Sellos',     xp: 0,    next: 2000,  benefits: ['3x puntos en Flash', '20% dcto. en tiendas aliadas', 'Badge animado en perfil'],              icon: Backpack, grad: 'from-emerald-500 to-teal-600',   locked: true  },
  { n: 5,  name: 'Viajero Local',         xp: 0,    next: 2800,  benefits: ['1 mes gratis SalePlan+', '15% dcto. en Café 1840', '5% cashback en todos los aliados'],         icon: Compass,  grad: 'from-sky-500 to-blue-700',        locked: true  },
  { n: 6,  name: 'Embajador Urbano',      xp: 0,    next: 3800,  benefits: ['Preventa exclusiva Flash Events', 'Perfil destacado en buscador', '25% dcto. Zona Rosa'],     icon: Sparkles, grad: 'from-violet-500 to-purple-700',   locked: true  },
  { n: 7,  name: 'Coleccionista Élite',   xp: 0,    next: 5000,  benefits: ['Skip filas en eventos aliados', 'Notificaciones 24h antes de Flash', 'Pack sorpresa mensual'], icon: Trophy,   grad: 'from-rose-500 to-pink-700',       locked: true  },
  { n: 8,  name: 'Guardián del Barrio',   xp: 0,    next: 6500,  benefits: ['2 meses gratis SalePlan+', 'Reseñas con badge Verificado', '30% dcto. en restaurantes aliados'],   icon: Crown,    grad: 'from-indigo-500 to-blue-900',     locked: true  },
  { n: 9,  name: 'Leyenda Capitalina',    xp: 0,    next: 8500,  benefits: ['Invitaciones a eventos presenciales SalePlan', 'Pack bienvenida físico ($50 valor)', '35% dcto. en aliados'], icon: Sparkles, grad: 'from-[#253884] to-indigo-900',    locked: true  },
  { n: 10, name: 'Crónica Salvadoreña',   xp: 0,    next: 11000, benefits: ['3 meses gratis SalePlan+', 'Tarjeta digital SalePlan verificada', 'Entrada gratis Noche de Museos'], icon: Trophy,   grad: 'from-amber-600 to-yellow-800',    locked: true  },
  { n: 11, name: 'Explorador Nacional',   xp: 0,    next: 14000, benefits: ['Acceso anticipado a nuevas zonas', '20% dcto. paquetes turísticos aliados', 'Badge exclusivo en perfil'], icon: Mountain, grad: 'from-emerald-600 to-green-900',   locked: true  },
  { n: 12, name: 'Pionero del Pasaporte', xp: 0,    next: 17500, benefits: ['Pasaporte físico coleccionable edición limitada', 'Número de serie grabado', '40% dcto. en aliados top'],   icon: Backpack, grad: 'from-teal-500 to-cyan-800',       locked: true  },
  { n: 13, name: 'Maestro Viajero',       xp: 0,    next: 22000, benefits: ['3 meses gratis SalePlan+', 'Badge animado premium en perfil', 'Noche gratis en hotel aliado'],       icon: Compass,  grad: 'from-sky-600 to-blue-900',        locked: true  },
  { n: 14, name: 'Héroe Urbano',          xp: 0,    next: 27500, benefits: ['Acceso anticipado a experiencias Plus curadas', 'Pack de stickers digitales exclusivo', '45% dcto. en aliados'], icon: Crown,    grad: 'from-violet-600 to-purple-900',   locked: true  },
  { n: 15, name: 'Ciudadano de Oro',      xp: 0,    next: 34000, benefits: ['6 meses gratis SalePlan+', '1 sello gratis cada mes', '10% cashback global en aliados'], icon: Trophy,   grad: 'from-yellow-500 to-amber-700',    locked: true  },
  { n: 16, name: 'Embajador Nacional',    xp: 0,    next: 42000, benefits: ['Invitación a eventos exclusivos SalePlan', 'Kit físico SalePlan (camiseta + stickers)', '55% dcto. en experiencias aliadas'], icon: Sparkles, grad: 'from-rose-600 to-red-900',        locked: true  },
  { n: 17, name: 'Gran Explorador',       xp: 0,    next: 52000, benefits: ['1 año gratis SalePlan+', '4x puntos en Flash permanente', 'Curación de ruta personalizada semanal'],       icon: Mountain, grad: 'from-[#253884] to-purple-900',    locked: true  },
  { n: 18, name: 'Cronista del País',     xp: 0,    next: 65000, benefits: ['Tarjeta NFC SalePlan exclusiva', 'Pack sorpresa bimestral a domicilio', '60% dcto. en aliados premium'],       icon: Backpack, grad: 'from-emerald-700 to-teal-900',    locked: true  },
  { n: 19, name: 'Guía Certificado',      xp: 0,    next: 80000, benefits: ['Placa verificada en tu perfil SalePlan', 'Atención prioritaria soporte 24/7', 'Entrada VIP permanente en eventos aliados'],  icon: Compass,  grad: 'from-sky-700 to-indigo-900',      locked: true  },
  { n: 20, name: 'Leyenda SalePlan',      xp: 0,    next: 100000,benefits: ['SalePlan+ de por vida GRATIS', 'Nombre en Tabla de Honor permanente', 'Experiencias VIP curadas mensualmente'],     icon: Trophy,   grad: 'from-amber-700 to-yellow-900',    locked: true  },
  { n: 21, name: 'Patriarca Explorador',  xp: 0,    next: 130000,benefits: ['Pasaporte de edición especial físico firmado', 'Pack premium sorpresa mensual a domicilio', 'Todos los descuentos al máximo nivel'], icon: Crown,    grad: 'from-violet-700 to-purple-900',   locked: true  },
  { n: 22, name: 'Dios de la Ciudad',     xp: 0,    next: 999999,benefits: ['SalePlan+ vitalicio + todos los beneficios desbloqueados', 'Experiencia VIP curada personalizada cada mes', 'Reconocimiento permanente en pantalla de inicio del app'], icon: Sparkles, grad: 'from-rose-700 to-pink-900',       locked: true  },
];

const CURATED_ITINERARIES = [
  { id: 1, title: 'Sabores de la Capital', emoji: '🍽️', description: 'Desde el mejor café de especialidad hasta pupusas artesanales — recorrido culinario.', stops: [1, 3, 6, 10, 21, 23], color: 'from-orange-400 to-red-500', expert: { name: 'Chef María Martínez', role: 'Chef · Crítica Gastronómica', avatar: AVATARS[1] }, reward: 420, month: 'Mayo 2026' },
  { id: 2, title: 'Arte & Cultura',         emoji: '🎨', description: 'Museos, galerías contemporáneas y teatro. Circuito cultural completo.', stops: [2, 7, 14, 16, 24], color: 'from-purple-500 to-indigo-600', expert: { name: 'Andrés Villalba', role: 'Curador · Museo Nacional', avatar: AVATARS[0] }, reward: 380, month: 'Mayo 2026' },
  { id: 3, title: 'Naturaleza & Aire Libre',emoji: '🌿', description: 'Parques, jardines y miradores para reconectar con la naturaleza pura.', stops: [4, 8, 12, 17, 18, 19], color: 'from-green-500 to-teal-600', expert: { name: 'Valeria Ortiz', role: 'Guía Ecológica · Bióloga', avatar: AVATARS[2] }, reward: 450, month: 'Mayo 2026' },
  { id: 4, title: 'Ruta Histórica',         emoji: '🏛️', description: 'Catedral, mercados coloniales y centros culturales del corazón de El Salvador.', stops: [5, 15, 16, 20, 22, 25], color: 'from-amber-500 to-yellow-600', expert: { name: 'Prof. Jorge Salinas', role: 'Historiador · UTEC', avatar: AVATARS[3] }, reward: 400, month: 'Mayo 2026' },
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
  const [justAddedPOI, setJustAddedPOI] = useState<number | null>(null);
  const [poiSchedules, setPoiSchedules] = useState<Record<number, { day: string; time: string }>>({});
  const [carryOverStamps, setCarryOverStamps] = useState(0);
  const [showPassportComplete, setShowPassportComplete] = useState(false);
  const [passportPoints, setPassportPoints] = useState(0);
  const [passportNumber, setPassportNumber] = useState(1);
  const [requireScheduleFor, setRequireScheduleFor] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const levelsScrollRef = useRef<HTMLDivElement>(null);
  const deckScrollRef = useRef<HTMLDivElement>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [profileName, setProfileName] = useState('Explorador');
  const [profileEmail, setProfileEmail] = useState('explorador@aventura.com');
  const [profilePhone, setProfilePhone] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [removeConfirmId, setRemoveConfirmId] = useState<number | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [hasSalePlanPlus, setHasSalePlanPlus] = useState(false);
  const [showPlusAnimation, setShowPlusAnimation] = useState(false);
  const [stampModalSuccess, setStampModalSuccess] = useState(false);
  const [activePassportIdx, setActivePassportIdx] = useState(0);
  const [deckW] = useState(() => typeof window !== 'undefined' ? Math.round(window.innerWidth * 0.68) : 265);
  const [premiumEventPreviewId, setPremiumEventPreviewId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [searchSort, setSearchSort] = useState<'default' | 'pts'>('default');
  const logoTapRef = useRef(0);
  const logoTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  React.useEffect(() => {
    if (currentScreen === 'USER_PROFILE' && levelsScrollRef.current) {
      const currentCard = levelsScrollRef.current.querySelector('[data-level="2"]');
      currentCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentScreen]);

  React.useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => { window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); };
  }, []);

  const haptic = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) (navigator as any).vibrate(pattern);
  };

  const showToast = (msg: string, duration = 2500) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), duration);
  };

  const handleLogoTripleTap = () => {
    logoTapRef.current += 1;
    if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    if (logoTapRef.current >= 3) {
      logoTapRef.current = 0;
      localStorage.removeItem('pwa_guide_hidden');
      setPwaPermanentlyHidden(false);
      setPwaStep(0);
      setShowPwaGuide(true);
      showToast('Guia de instalacion restablecida');
    } else {
      logoTapTimerRef.current = setTimeout(() => { logoTapRef.current = 0; }, 1500);
    }
  };

  const navigateTo = (screen: Screen, poiId: number | null = null) => {
    if (screen !== currentScreen || poiId !== selectedPOI) {
      setPrevScreen(currentScreen);
      if (poiId !== null) {
        setRecentlyViewed(prev => [poiId, ...prev.filter(id => id !== poiId)].slice(0, 5));
      }
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
            <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-1 leading-tight text-center">Instala la App</h3>
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
        <div className="relative">
          <img src={ICONS.NAV_PASSPORT} className={`w-6 h-6 transition-opacity duration-200 ${active === 'wallet' ? '' : 'opacity-40'}`} alt="Pasaporte" />
          {carryOverStamps > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-yellow-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
              {carryOverStamps}
            </span>
          ) : stampedPOIs.length > 0 ? (
            <span className="absolute -top-1.5 -right-1.5 bg-[#253884] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
              {stampedPOIs.length}
            </span>
          ) : null}
        </div>
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
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoTripleTap}>
          <img src={ICONS.LOGO} alt="SalePlan" className="h-8" />
          <span className="font-heading text-2xl text-[#253884] tracking-tighter pt-1">SalePlan</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('REGISTER_CHOICE')} className="text-[10px] font-bold px-3 py-2 text-[#253884] uppercase whitespace-nowrap active:opacity-70 transition-opacity">
            Registro
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
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
                    { label: 'Iniciar Sesión',        screen: 'LOGIN_CHOICE',    icon: <LogIn size={20} strokeWidth={1.5} />,      color: 'bg-blue-50 text-[#253884]' },
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

      {/* Hero */}
      <div className="w-full pb-24 px-6 pt-10 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#e6eaf8] rounded-full scale-110 opacity-50" />
          <div className="absolute inset-0 bg-[#e6eaf8] rounded-full" />
          <img src={ICONS.NAV_PASSPORT} className="w-20 h-20 relative z-10" alt="Passport" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 w-full"
        >
          <h1 className="text-5xl leading-[1.1] font-heading text-[#253884] tracking-tight mb-4">
            Tu Pasaporte<br />A La Ciudad
          </h1>
          <p className="font-medium text-gray-500 mb-8 text-sm text-balance mx-auto max-w-[280px]">
            Explora lugares únicos, colecciona sellos digitales y gana recompensas exclusivas mientras descubres los mejores rincones de la ciudad.
          </p>

          <div className="space-y-3 w-full max-w-sm mx-auto">
            <button onClick={() => navigateTo('REGISTER_CHOICE')} className="w-full py-5 bg-[#253884] text-white font-bold uppercase text-lg rounded-2xl shadow-xl active:scale-[0.97] transition-transform">
              Comenzar Ahora
            </button>
            <p className="text-xs text-gray-400 px-2 text-center">Únete a cientos de exploradores y comercios locales.</p>
          </div>
        </motion.div>

        <h2 className="text-2xl font-heading text-[#191308] mb-6 w-full tracking-tight">¿Cómo Funciona?</h2>

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

        {/* SalePlan+ section */}
        <div className="w-full mb-12">
          <h2 className="text-2xl font-heading text-[#191308] mb-2 tracking-tight">SalePlan<span className="text-indigo-500">+</span></h2>
          <p className="text-xs text-gray-500 font-medium mb-6">La experiencia completa de exploración de la ciudad.</p>
          <div className="bg-gradient-to-br from-[#253884] to-indigo-700 rounded-3xl p-6 relative overflow-hidden shadow-xl text-left mb-4">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 font-black text-[9px] uppercase px-3 py-1 rounded-full mb-4 tracking-wider">
                <Sparkles size={10} strokeWidth={2.5} /> Premium
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <p className="text-white font-heading text-4xl tracking-tight">$3.99</p>
                <p className="text-blue-200 font-bold text-sm">/mes</p>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { icon: '🎫', text: 'Hasta 10 paradas por Pasaporte' },
                  { icon: '⚡', text: '2× XP — sube de nivel más rápido' },
                  { icon: '🗺️', text: '4 Itinerarios de expertos cada mes' },
                  { icon: '🌟', text: 'Flash Events exclusivos con 2× recompensas' },
                  { icon: '🏅', text: 'Badge Plus visible en tu perfil' },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-3">
                    <span className="text-lg shrink-0">{f.icon}</span>
                    <p className="text-white/90 text-sm font-medium">{f.text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigateTo('REGISTER_CHOICE')}
                className="w-full py-4 bg-white text-[#253884] font-bold rounded-2xl text-sm active:scale-[0.97] transition-transform shadow-lg"
              >
                Comenzar — Registro Gratis
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium text-center">Sin compromiso · Cancela cuando quieras</p>
        </div>
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
          <h1 className="text-4xl font-heading text-center mb-10 text-[#253884] tracking-tight">Bienvenido</h1>
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

        <h1 className="text-4xl font-heading mb-6 text-center text-[#253884] tracking-tight">Crear Perfil</h1>

        <div className="bg-white p-8 rounded-3xl subtle-shadow w-full card-shadow">
          <div className="space-y-4">
            <input type="text" placeholder="Nombre o Apodo" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
            <input type="email" placeholder="Correo Electrónico" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
            <div className="flex gap-2">
              <div className="bg-gray-50 border-2 border-transparent rounded-xl px-4 flex items-center text-gray-500 font-bold text-sm shrink-0">+503</div>
              <input type="tel" placeholder="Teléfono (opcional)" className="flex-1 px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
            </div>
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
    const suggestedPOIs = POIS.filter(poi => !savedPOIs.includes(poi.id) && !poi.isFlash).slice(0, 3);

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          <div className="bg-[#253884] px-6 pt-12 pb-10 rounded-b-[2.5rem] relative z-20 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wider">Hola,</p>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-4xl font-heading text-white tracking-tight">{profileName}</h2>
                  {hasSalePlanPlus && (
                    <span className="bg-yellow-400 text-yellow-900 text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider">
                      <Sparkles size={7} strokeWidth={2} /> Plus
                    </span>
                  )}
                  <span className="bg-white/25 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Nv.2</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 max-w-[120px] bg-white/20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-200">850 XP · Nv.2</span>
                </div>
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
            {/* Flash events — pinned to top of home feed */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-heading text-[#253884] tracking-tight flex items-center gap-2">
                  Flash de Hoy <Zap size={15} strokeWidth={2.5} className="text-yellow-500" />
                </h3>
                <button onClick={() => navigateTo('USER_SEARCH')} className="text-[10px] font-bold text-[#253884] uppercase tracking-widest opacity-60 active:opacity-100">Ver todos</button>
              </div>
              <div className="space-y-2.5">
                {FLASH_EVENTS.map((event, idx) => {
                  const hoursLeft = [6, 3, 11][idx % 3];
                  const isUrgent = hoursLeft <= 4;
                  const isLocked = event.isPremium && !hasSalePlanPlus;
                  return (
                    <div
                      key={event.id}
                      onClick={() => isLocked ? setPremiumEventPreviewId(event.id) : navigateTo('USER_SEARCH', event.id)}
                      className={`bg-white rounded-2xl p-3.5 border-2 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform subtle-shadow ${isLocked ? 'border-indigo-200' : 'border-yellow-200'}`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${isLocked ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                        {isLocked ? <Lock size={20} strokeWidth={1.5} /> : <PoiIcon id={event.id} size={20} strokeWidth={1.5} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="font-bold text-[#253884] text-sm leading-tight truncate">{event.name}</h4>
                          {isLocked && <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider shrink-0"><Sparkles size={7} strokeWidth={2} /> Plus</span>}
                          {!isLocked && event.date.toLowerCase().includes('hoy') && <span className="bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">HOY</span>}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{event.date}</p>
                        {isLocked ? (
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-wider mt-0.5">Exclusivo SalePlan+</p>
                        ) : (
                          <p className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${isUrgent ? 'text-red-500' : 'text-yellow-600'}`}>
                            {isUrgent ? '🔥 ' : '⏰ '}Termina en {hoursLeft}h
                          </p>
                        )}
                      </div>

                      <div className={`font-black text-[9px] uppercase px-2 py-1 rounded-lg whitespace-nowrap shrink-0 ${isLocked ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-400 text-yellow-900'}`}>
                        {event.pts}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {recentlyViewed.length > 0 && (
              <div className="w-full">
                <h3 className="text-base font-heading text-[#253884] tracking-tight mb-3 flex items-center gap-2">
                  Vistos Recientemente <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{recentlyViewed.length}</span>
                </h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {recentlyViewed.map(id => {
                    const p = POIS.find(x => x.id === id);
                    if (!p) return null;
                    return (
                      <button key={id} onClick={() => navigateTo('USER_SEARCH', id)} className="flex-none flex flex-col items-center gap-1.5 active:scale-[0.96] transition-transform">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-gray-100 relative">
                          <img src={getPoiImage(id)} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 max-w-[56px] text-center leading-tight line-clamp-2">{p.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {savedPOIs.length > 0 && (
              <button onClick={() => navigateTo('USER_WALLET')} className="w-full bg-[#253884]/10 border border-[#253884]/20 rounded-2xl p-4 flex items-center justify-between active:scale-[0.97] transition-transform">
                <div className="flex items-center gap-3">
                  <img src={ICONS.NAV_PASSPORT} className="w-5 h-5 opacity-80" alt="" />
                  <div>
                    <p className="text-[#253884] font-bold text-sm">{savedPOIs.length} paradas en tu ruta</p>
                    <p className="text-[10px] text-[#253884]/60 font-semibold">{stampedPOIs.length} sellos obtenidos</p>
                  </div>
                </div>
                <ArrowRight size={16} strokeWidth={2} className="text-[#253884]/50" />
              </button>
            )}

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
                    <div className="h-40 relative overflow-hidden bg-gray-100">
                      <img src={getPoiImage(poi.id)} alt={poi.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 font-bold text-xs flex items-center text-[#253884] subtle-shadow">
                        <img src={ICONS.STAR_FILLED} className="w-3 h-3 mr-1 invert" alt="" /> 4.8
                      </div>
                      <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white ${poi.color.split(' ')[1]}`}>
                        <PoiIcon id={poi.id} size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-2xl font-heading mb-1 text-[#253884] tracking-tight">{poi.name}</h4>
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
    const totalSlots = hasSalePlanPlus ? 10 : 6;
    const COLS = 3;
    const poiW = (p: typeof myRoute[0]) => p.isFlash ? Math.min(COLS, getFlashStamps(p.pts)) : 1;
    const occupiedCells = myRoute.reduce((sum, poi) => sum + poiW(poi), 0);
    const emptyCells = Math.max(0, totalSlots - occupiedCells);

    const totalCards = hasSalePlanPlus ? 1 + CURATED_ITINERARIES.length : 2;

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          {/* Gradient header */}
          <div className="bg-[#e6eaf8] pt-12 pb-6 rounded-b-[2.5rem] shadow-sm">
            <h2 className="text-3xl font-heading text-[#253884] tracking-tight text-center">Mi Pasaporte</h2>

          </div>

          {/* Card deck — Framer Motion drag swipe with peek */}
          <div className="overflow-hidden w-full mt-4 px-4">
          <motion.div
            className="flex gap-3"
            drag="x"
            dragElastic={0.07}
            dragConstraints={{ left: -(totalCards - 1) * (deckW + 12), right: 0 }}
            animate={{ x: -activePassportIdx * (deckW + 12) }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
            onDragEnd={(_, info) => {
              const v = info.velocity.x;
              if ((info.offset.x < -40 || v < -400) && activePassportIdx < totalCards - 1) {
                setActivePassportIdx(p => p + 1);
              } else if ((info.offset.x > 40 || v > 400) && activePassportIdx > 0) {
                setActivePassportIdx(p => p - 1);
              }
            }}
          >
            {/* ── Card 0: Personal passport ── */}
            <div className="flex-none pb-2" style={{ minWidth: deckW }}>
              <div className="bg-white rounded-3xl p-5 subtle-shadow card-shadow relative">
                {/* Header with name + badges */}
                <div className="flex items-center gap-3 mb-5 pt-1">
                  <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden shrink-0">
                    <img src={selectedAvatar} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <p className="text-lg font-heading text-[#253884] leading-tight">{profileName}</p>
                      {hasSalePlanPlus && (
                        <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider shrink-0">
                          <Sparkles size={7} strokeWidth={2} /> Plus
                        </span>
                      )}
                      <span className="bg-[#e6eaf8] text-[#253884] text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">Nv.2</span>
                    </div>
                    <p className="font-medium text-xs text-gray-500">{myRoute.length} Paradas · {stampedPOIs.length} Selladas</p>
                  </div>
                </div>

                {/* Passport grid */}
                {(() => {
                  type GridCell = { kind: 'poi'; poi: typeof myRoute[0] } | { kind: 'empty'; idx: number };
                  const cells: GridCell[] = [
                    ...myRoute.map(poi => ({ kind: 'poi' as const, poi })),
                    ...Array.from({ length: emptyCells }, (_, i) => ({ kind: 'empty' as const, idx: i })),
                  ];
                  const rows: GridCell[][] = [];
                  let row: GridCell[] = [], rowW = 0;
                  for (const cell of cells) {
                    const w = cell.kind === 'poi' ? poiW(cell.poi) : 1;
                    if (rowW + w > COLS) {
                      while (rowW < COLS) { row.push({ kind: 'empty', idx: -rowW }); rowW++; }
                      rows.push(row); row = []; rowW = 0;
                    }
                    row.push(cell); rowW += w;
                    if (rowW === COLS) { rows.push(row); row = []; rowW = 0; }
                  }
                  if (row.length) {
                    while (rowW < COLS) { row.push({ kind: 'empty', idx: -rowW }); rowW++; }
                    rows.push(row);
                  }
                  const PassportCell = ({ poi, pw }: { poi: typeof myRoute[0]; pw: number }) => {
                    const isStamped = stampedPOIs.includes(poi.id);
                    const isJustStamped = justStampedId === poi.id;
                    return (
                      <div
                        onClick={() => { if (!isStamped) { setStampModalSuccess(false); setQrModalPOIId(poi.id); } else navigateTo('USER_SEARCH', poi.id); }}
                        style={{ flex: pw, aspectRatio: `${pw}/1` }}
                        className={`${poi.color} rounded-2xl flex flex-col items-center justify-center p-2 relative overflow-hidden border border-blue-200 cursor-pointer active:scale-[0.97] transition-transform shadow-sm ${isJustStamped ? 'animate-stamp-ring' : ''}`}
                      >
                        {poi.isFlash && (
                          <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md z-10 flex items-center gap-0.5">
                            <Zap size={8} strokeWidth={2.5} /> Flash
                          </span>
                        )}
                        {isStamped ? (
                          <div className={`absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md z-10 border border-blue-100 ${isJustStamped ? 'animate-stamp-in' : ''}`}>
                            <img src={ICONS.LOGO} alt="Stamped" className="w-4 h-4" />
                          </div>
                        ) : (
                          <button
                            onClick={e => { e.stopPropagation(); setSavedPOIs(prev => prev.filter(id => id !== poi.id)); }}
                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/20 text-white rounded-full flex items-center justify-center z-10"
                          >
                            <X size={10} strokeWidth={3} />
                          </button>
                        )}
                        <div className={`${isStamped ? '' : 'opacity-40'} transition-opacity duration-200 flex flex-col items-center`}>
                          <PoiIcon id={poi.id} size={pw > 1 ? 32 : 28} strokeWidth={1.5} />
                          <p className="text-[8px] font-bold text-[#253884] uppercase mt-1.5 text-center leading-tight line-clamp-2 w-full px-1">{poi.name}</p>
                        </div>
                      </div>
                    );
                  };
                  return (
                    <div className="flex flex-col gap-3">
                      {rows.map((r, ri) => {
                        const poiCells = r.filter(c => c.kind === 'poi');
                        const isLoneFlash = poiCells.length === 1 && poiCells[0].kind === 'poi' && poiCells[0].poi.isFlash;
                        if (isLoneFlash) {
                          const cell = poiCells[0];
                          if (cell.kind !== 'poi') return null;
                          const pw = poiW(cell.poi);
                          const pct = pw === COLS ? '100%' : pw === 2 ? 'calc(66.67% - 6px)' : 'calc(33.33% - 8px)';
                          return (
                            <div key={ri} className="flex justify-center">
                              <div style={{ width: pct }}>
                                <PassportCell poi={cell.poi} pw={pw} />
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={ri} className="flex gap-3">
                            {r.map((cell, ci) => {
                              if (cell.kind === 'empty') {
                                return cell.idx < 0 ? (
                                  <div key={`ph-${ri}-${ci}`} style={{ flex: 1, aspectRatio: '1/1' }} className="opacity-0 pointer-events-none" />
                                ) : (
                                  <button
                                    key={`e-${ri}-${ci}`}
                                    onClick={() => navigateTo('USER_SEARCH')}
                                    style={{ flex: 1, aspectRatio: '1/1' }}
                                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center active:scale-[0.97] transition-transform group"
                                  >
                                    <span className="text-gray-300 font-black text-2xl group-active:text-[#253884]">+</span>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Agregar</p>
                                  </button>
                                );
                              }
                              return <PassportCell key={cell.poi.id} poi={cell.poi} pw={poiW(cell.poi)} />;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {!hasSalePlanPlus && (
                  <button
                    onClick={() => navigateTo('USER_PLUS')}
                    className="mt-5 w-full bg-gradient-to-r from-[#253884] to-indigo-500 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.97] transition-transform shadow-md"
                  >
                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <Sparkles size={18} strokeWidth={1.5} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-heading text-sm tracking-tight leading-tight">SalePlan<span className="text-yellow-300">+</span></p>
                      <p className="text-blue-200 text-[9px] font-semibold">10 paradas · 2x XP · Itinerarios expertos</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow-300 font-black text-sm">$3.99</p>
                      <p className="text-blue-200 text-[9px] font-bold">/mes</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* ── Cards 1-4: Itinerary passports or Plus promo ── */}
            {hasSalePlanPlus ? CURATED_ITINERARIES.map(it => {
              const itStops = POIS.filter(p => it.stops.includes(p.id));
              return (
                <div key={it.id} className="flex-none pb-2" style={{ minWidth: deckW }}>
                  <div className={`bg-gradient-to-br ${it.color} rounded-3xl p-4 relative overflow-hidden shadow-xl flex flex-col`} >
                    {/* Month badge */}
                    <div className="absolute top-4 right-4 bg-white/20 border border-white/30 px-2.5 py-1 rounded-full">
                      <p className="text-white text-[9px] font-black uppercase tracking-wider">{it.month}</p>
                    </div>
                    {/* Expert */}
                    <div className="flex items-center gap-3 mb-3 pr-24">
                      <img src={it.expert.avatar} className="w-11 h-11 rounded-full border-2 border-white/60 shrink-0 shadow-md" alt={it.expert.name} />
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm leading-tight truncate">{it.expert.name}</p>
                        <p className="text-white/70 text-[10px] font-bold truncate">{it.expert.role}</p>
                      </div>
                    </div>
                    {/* Title & description */}
                    <div className="mb-3">
                      <h3 className="text-white font-heading text-2xl tracking-tight leading-tight">{it.title}</h3>
                      <p className="text-white/80 text-xs font-medium mt-1 leading-relaxed">{it.description}</p>
                    </div>
                    {/* Reward bar */}
                    <div className="bg-white/20 border border-white/20 rounded-xl px-3 py-2 mb-4 flex items-center justify-between">
                      <span className="text-white/80 text-xs font-bold">Completar itinerario</span>
                      <span className="text-yellow-300 font-black text-base">+{it.reward} pts</span>
                    </div>
                    {/* Stop grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
                      {itStops.slice(0, 6).map(poi => (
                        <div key={poi.id} className="bg-white/20 border border-white/10 rounded-xl p-2 text-center">
                          <PoiIcon id={poi.id} size={18} strokeWidth={1.5} className="text-white mx-auto mb-1" />
                          <p className="text-white text-[10px] font-bold line-clamp-2 leading-tight">{poi.name}</p>
                        </div>
                      ))}
                    </div>
                    {/* CTA */}
                    <button
                      onClick={() => {
                        const toAdd = it.stops.filter(id => !savedPOIs.includes(id)).slice(0, Math.max(0, totalSlots - savedPOIs.length));
                        if (toAdd.length > 0) { setSavedPOIs(prev => [...prev, ...toAdd]); haptic([10, 20, 10]); }
                        setActivePassportIdx(0);
                      }}
                      className="w-full py-3.5 bg-white text-[#253884] rounded-2xl font-bold text-sm active:scale-[0.97] transition-transform shadow-md mt-2"
                    >
                      Usar este Itinerario →
                    </button>
                  </div>
                </div>
              );
            }) : (
              /* Non-Plus: teaser card */
              <div className="flex-none pb-2" style={{ minWidth: deckW }}>
                <div className="bg-gradient-to-br from-[#253884] to-indigo-700 rounded-3xl p-6 relative overflow-hidden shadow-lg flex flex-col items-center justify-center text-center" style={{ minHeight: 320 }}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="absolute rounded-full bg-white" style={{ width: 4 + (i % 3) * 8, height: 4 + (i % 3) * 8, top: `${(i * 23) % 100}%`, left: `${(i * 37) % 100}%`, opacity: 0.3 }} />
                    ))}
                  </div>
                  <Sparkles size={44} className="text-yellow-300 mb-4 relative z-10" />
                  <h3 className="text-white font-heading text-2xl tracking-tight mb-2 relative z-10">4 Itinerarios<br />de Expertos</h3>
                  <p className="text-blue-200 text-sm font-medium mb-2 leading-relaxed relative z-10 max-w-[240px] mx-auto">Nuevos cada mes. Curados por expertos en gastronomía, cultura, naturaleza e historia.</p>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 relative z-10">Mayo 2026</p>
                  <button
                    onClick={() => navigateTo('USER_PLUS')}
                    className="relative z-10 w-full py-3.5 bg-yellow-400 text-yellow-900 rounded-2xl font-black text-sm active:scale-[0.97] transition-transform shadow-lg"
                  >
                    Desbloquear · SalePlan+ $3.99/mes
                  </button>
                </div>
              </div>
            )}
          </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 py-3">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePassportIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === activePassportIdx ? 'w-6 h-2 bg-[#253884]' : 'w-2 h-2 bg-gray-300'}`}
              />
            ))}
          </div>

          {/* Ruta de Hoy — only shown for Card 0 */}
          {activePassportIdx === 0 && (
            <div className="px-5 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">
                  Ruta de Hoy
                  {myRoute.length > 0 && <span className="ml-2 text-blue-300 font-bold">{myRoute.length} parada{myRoute.length !== 1 ? 's' : ''}</span>}
                </h3>
                {myRoute.length > 0 && (
                  <button
                    onClick={() => {
                      const routeText = myRoute.map(p => `• ${p.name}${poiSchedules[p.id] ? ` (${poiSchedules[p.id].day} ${poiSchedules[p.id].time})` : ''}`).join('\n');
                      if (navigator.share) {
                        navigator.share({ title: 'Mi Ruta SalePlan', text: `Mi ruta de hoy:\n${routeText}`, url: window.location.origin });
                      } else {
                        navigator.clipboard?.writeText(routeText).then(() => alert('Ruta copiada al portapapeles'));
                      }
                    }}
                    className="flex items-center gap-1.5 text-[10px] font-black text-[#253884] uppercase tracking-wider bg-[#253884]/10 px-3 py-1.5 rounded-full active:scale-[0.97] transition-transform"
                  >
                    <Share2 size={11} strokeWidth={2.5} /> Compartir
                  </button>
                )}
              </div>
              {myRoute.length === 0 && (
                <div className="py-10 text-center">
                  <img src={ICONS.NAV_MAP} className="w-10 h-10 mx-auto opacity-20 mb-3" alt="" />
                  <p className="text-gray-400 font-bold text-sm">Aún no tienes paradas</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">Explora y agrega lugares a tu ruta</p>
                  <button onClick={() => navigateTo('USER_SEARCH')} className="mt-4 bg-[#253884] text-white px-6 py-2.5 rounded-xl font-bold text-sm active:scale-[0.97] transition-transform">Explorar Lugares</button>
                </div>
              )}
              {(() => {
                const DAY_RANK: Record<string, number> = { 'Hoy': 0, 'Mañana': 1, 'Sáb 23 may': 2, 'Lun 25 may': 3 };
                const TIME_RANK: Record<string, number> = { '08:00 – 12:00': 0, '12:00 – 17:00': 1, '17:00 – 22:00': 2 };
                const sortedRoute = [...myRoute].sort((a, b) => {
                  const sa = poiSchedules[a.id], sb = poiSchedules[b.id];
                  if (!sa && !sb) return 0;
                  if (!sa) return 1;
                  if (!sb) return -1;
                  const dayDiff = (DAY_RANK[sa.day] ?? 99) - (DAY_RANK[sb.day] ?? 99);
                  if (dayDiff !== 0) return dayDiff;
                  return (TIME_RANK[sa.time] ?? 99) - (TIME_RANK[sb.time] ?? 99);
                });
                return (
                  <div className="space-y-3">
                    {sortedRoute.map((poi, idx) => {
                      const isStamped = stampedPOIs.includes(poi.id);
                      const hasSchedule = !!poiSchedules[poi.id];
                      const isDragging = dragIndex === idx;
                      const isDragOver = dragOverIndex === idx;
                      return (
                        <div
                          key={poi.id}
                          draggable={!hasSchedule}
                          onDragStart={() => !hasSchedule && setDragIndex(idx)}
                          onDragOver={e => { e.preventDefault(); setDragOverIndex(idx); }}
                          onDrop={() => {
                            if (dragIndex === null || dragIndex === idx) { setDragIndex(null); setDragOverIndex(null); return; }
                            setSavedPOIs(prev => {
                              const sorted = [...prev];
                              const [moved] = sorted.splice(dragIndex, 1);
                              sorted.splice(idx, 0, moved);
                              return sorted;
                            });
                            setDragIndex(null); setDragOverIndex(null);
                          }}
                          onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                          onClick={() => navigateTo('USER_SEARCH', poi.id)}
                          className={`flex items-center gap-3 bg-white rounded-2xl p-3 cursor-pointer active:scale-[0.98] transition-[transform,border-color,opacity] subtle-shadow border-2 ${isStamped ? 'border-[#253884]/20 bg-[#e6eaf8]/50' : isDragOver ? 'border-[#253884]' : 'border-transparent'} ${isDragging ? 'opacity-50 scale-[0.97]' : ''}`}
                        >
                          {!hasSchedule && (
                            <div className="text-gray-300 shrink-0 cursor-grab active:cursor-grabbing">
                              <GripVertical size={16} strokeWidth={2} />
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${poi.color}`}>
                            <PoiIcon id={poi.id} size={18} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#253884] text-sm leading-tight truncate">{poi.name}</p>
                            {hasSchedule ? (
                              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-0.5">
                                {poiSchedules[poi.id].day} · {poiSchedules[poi.id].time}
                              </p>
                            ) : (
                              <p className="text-[10px] font-medium text-gray-400 mt-0.5">{poi.location}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isStamped && (
                              <div className="w-6 h-6 bg-[#253884] rounded-full flex items-center justify-center shadow">
                                <img src={ICONS.LOGO} className="w-3.5 h-3.5 brightness-0 invert" alt="" />
                              </div>
                            )}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                if (!isStamped) { setStampModalSuccess(false); setQrModalPOIId(poi.id); }
                              }}
                              disabled={isStamped}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${isStamped ? 'border-[#253884]/20 bg-[#e6eaf8] cursor-default' : 'border-gray-200 bg-gray-50 active:scale-[0.97]'}`}
                            >
                              {isStamped ? <Check size={13} strokeWidth={2.5} className="text-[#253884]" /> : <QrCode size={13} strokeWidth={1.5} className="text-gray-500" />}
                            </button>
                            {!isStamped && (
                              <button
                                onClick={e => { e.stopPropagation(); setSavedPOIs(prev => prev.filter(id => id !== poi.id)); haptic([10, 20, 10]); }}
                                className="w-8 h-8 rounded-xl flex items-center justify-center border border-red-100 bg-red-50 active:scale-[0.97] transition-transform"
                              >
                                <X size={13} strokeWidth={2.5} className="text-red-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

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
                  <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative flex flex-col items-center pointer-events-auto overflow-hidden">
                    <button onClick={() => { setQrModalPOIId(null); setStampModalSuccess(false); }} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform z-10">
                      <X size={14} strokeWidth={2.5} />
                    </button>

                    <AnimatePresence mode="wait">
                      {stampModalSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                          className="w-full flex flex-col items-center pt-2"
                        >
                          <motion.div
                            initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="w-20 h-20 bg-[#253884] rounded-full flex items-center justify-center mb-4 shadow-lg"
                          >
                            <img src={ICONS.LOGO} className="w-12 h-12 brightness-0 invert" alt="Sello" />
                          </motion.div>
                          <p className="text-xs font-black text-yellow-500 uppercase tracking-[0.2em] mb-1">¡Sellado!</p>
                          <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-1 text-center">
                            {POIS.find(p => p.id === qrModalPOIId)?.name}
                          </h3>
                          <p className="text-gray-400 font-medium text-sm text-center mb-6">Tu sello ha sido registrado exitosamente.</p>
                          <button
                            onClick={() => { setQrModalPOIId(null); setStampModalSuccess(false); navigateTo('USER_REVIEWS'); }}
                            className="w-full bg-[#253884] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.97] transition-transform mb-3"
                          >
                            <img src={ICONS.STAR_FILLED} className="w-5 h-5 invert" alt="" /> Dejar Reseña
                          </button>
                          <button
                            onClick={() => { setQrModalPOIId(null); setStampModalSuccess(false); }}
                            className="w-full bg-gray-50 border border-gray-100 text-gray-500 py-3 rounded-xl font-bold text-sm active:scale-[0.97] transition-transform"
                          >
                            Cerrar
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="scan"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="w-full flex flex-col items-center"
                        >
                          <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-2 text-center mt-2">Confirmar Parada</h3>
                          <p className="text-center text-gray-500 text-sm font-medium mb-6">Muestra este código al comercio para escanear y recibir tu sello y beneficios.</p>

                          <div className="bg-white p-4 rounded-3xl border-4 border-[#253884] subtle-shadow mb-6">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=sp-stamp-${qrModalPOIId}`} alt="QR de Pasaporte" className="w-48 h-48 mix-blend-multiply" />
                          </div>

                          <button
                            onClick={() => {
                              const id = qrModalPOIId!;
                              const poi = POIS.find(p => p.id === id)!;
                              const poiStamps = poi.isFlash ? getFlashStamps(poi.pts) : 1;
                              const pts = (poi.isFlash ? poiStamps * 15 : 10) * (hasSalePlanPlus ? 2 : 1);

                              const currentRoute = POIS.filter(p => savedPOIs.includes(p.id));
                              const currentSlots = hasSalePlanPlus ? 10 : 6;
                              const qrPoiW = (p: typeof currentRoute[0]) => p.isFlash ? Math.min(3, getFlashStamps(p.pts)) : 1;
                              const occupiedCells = currentRoute.reduce((sum, p) => sum + qrPoiW(p), 0);
                              const stampedCells = currentRoute.reduce((sum, p) => stampedPOIs.includes(p.id) ? sum + qrPoiW(p) : sum, 0);
                              const remainingUnstamped = occupiedCells - stampedCells;
                              const overflow = Math.max(0, poiStamps - remainingUnstamped);

                              const newStamped = [...stampedPOIs, id];
                              const allStamped = currentRoute.every(p => newStamped.includes(p.id));
                              const isFull = occupiedCells >= currentSlots;

                              setStampedPOIs(newStamped);
                              setJustStampedId(id);
                              setStampModalSuccess(true);
                              setPassportPoints(prev => prev + pts + (allStamped && isFull ? 50 : 0));
                              showToast(`+${pts} pts ganados${allStamped && isFull ? ' · Pasaporte completo!' : ''}`);
                              if (overflow > 0) setCarryOverStamps(prev => prev + overflow);
                              haptic([15, 30, 15, 60]);
                              setTimeout(() => setJustStampedId(null), 1200);
                              if (allStamped && isFull) setTimeout(() => { setQrModalPOIId(null); setStampModalSuccess(false); setShowPassportComplete(true); }, 1200);
                            }}
                            className="w-full bg-[#253884] text-white py-4 rounded-xl font-bold uppercase tracking-wide subtle-shadow active:scale-[0.97] transition-transform"
                          >
                            [Demo] Simular Escaneo
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Passport Completion Overlay */}
          <AnimatePresence>
            {showPassportComplete && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/75 z-[100] backdrop-blur-sm"
                  onClick={() => {}}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 32 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 16 }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
                  className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center relative overflow-hidden pointer-events-auto">
                    {/* Confetti particles */}
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], y: [-20, -80 - (i % 4) * 20], x: [(i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 10)], scale: [0, 1, 0] }}
                        transition={{ duration: 1.0 + i * 0.04, delay: 0.2 + i * 0.05, ease: 'easeOut', repeat: Infinity, repeatDelay: 2 }}
                        className="absolute top-1/3 left-1/2 w-2 h-2 rounded-sm pointer-events-none"
                        style={{ background: ['#FFD700', '#FFA500', '#253884', '#60A5FA', '#F87171', '#34D399'][i % 6] }}
                      />
                    ))}

                    {/* Stamp */}
                    <motion.div
                      initial={{ scale: 2.4, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
                      className="w-24 h-24 bg-[#253884] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    >
                      <img src={ICONS.LOGO} className="w-14 h-14 brightness-0 invert" alt="Sello" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <p className="text-xs font-black text-yellow-500 uppercase tracking-[0.2em] mb-2">¡Felicidades!</p>
                      <h2 className="text-3xl font-heading text-[#253884] mb-1 tracking-tight">Pasaporte #{passportNumber}</h2>
                      <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">Completado</p>

                      <div className="bg-[#e6eaf8] rounded-2xl p-4 mb-3">
                        <p className="text-4xl font-heading text-[#253884] tracking-tight">+{passportPoints}</p>
                        <p className="text-[10px] font-black text-[#253884] opacity-60 uppercase tracking-[0.15em] mt-0.5">Puntos Ganados</p>
                      </div>

                      {carryOverStamps > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.55 }}
                          className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 mb-4 flex items-center gap-3"
                        >
                          <Zap size={18} className="text-yellow-600 shrink-0" strokeWidth={2.5} />
                          <p className="text-xs font-bold text-yellow-800 text-left leading-snug">
                            +{carryOverStamps} sello{carryOverStamps > 1 ? 's' : ''} guardado{carryOverStamps > 1 ? 's' : ''} para tu siguiente pasaporte
                          </p>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      onClick={() => {
                        setShowPassportComplete(false);
                        setSavedPOIs([]);
                        setStampedPOIs([]);
                        setPassportNumber(prev => prev + 1);
                        setPassportPoints(0);
                        setCarryOverStamps(0);
                      }}
                      className="w-full bg-[#253884] text-white py-4 rounded-2xl font-bold text-base active:scale-[0.97] transition-transform shadow-lg mt-1"
                    >
                      Abrir Pasaporte #{passportNumber + 1} →
                    </motion.button>
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
        <div className="flex items-center justify-between w-full mb-8">
          <h2 className="text-4xl font-heading text-[#253884] tracking-tight">Mi Perfil</h2>
          <button onClick={() => setEditingProfile(v => !v)} className={`px-4 py-2 rounded-xl font-bold text-sm active:scale-[0.97] transition-[background-color,color] ${editingProfile ? 'bg-[#253884] text-white' : 'bg-white text-[#253884] subtle-shadow'}`}>
            {editingProfile ? 'Guardar' : <span className="flex items-center gap-1.5"><Pencil size={13} strokeWidth={2} /> Editar</span>}
          </button>
        </div>

        <div className="relative mb-6 z-10 w-32 h-32">
          <div className="w-full h-full rounded-full bg-white overflow-hidden subtle-shadow border-4 border-white">
            <img src={selectedAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button onClick={() => setShowAvatarPicker(true)} className="absolute bottom-0 right-0 bg-[#253884] text-white w-10 h-10 rounded-full flex items-center justify-center subtle-shadow active:scale-[0.97] transition-transform">
            <Pencil size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-2 mb-6">
          {hasSalePlanPlus && (
            <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-sm">
              <Sparkles size={9} strokeWidth={2} /> Plus
            </span>
          )}
          <span className="bg-[#e6eaf8] text-[#253884] text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Nivel 2</span>
        </div>

        {/* Avatar picker overlay */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/50 flex items-end justify-center"
              onClick={() => setShowAvatarPicker(false)}
            >
              <motion.div
                initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }}
                transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
                className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-safe"
                onClick={e => e.stopPropagation()}
              >
                <p className="font-heading text-2xl text-[#253884] mb-1 text-center">Elige tu Avatar</p>
                <p className="text-sm text-gray-400 font-medium text-center mb-6">Selecciona el que más te represente</p>
                <div className="flex justify-center gap-5 mb-6">
                  {AVATARS.map((avatar, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedAvatar(avatar); setShowAvatarPicker(false); haptic(15); }}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-[border-color,transform] active:scale-[0.95] ${selectedAvatar === avatar ? 'border-[#253884] scale-105 shadow-lg' : 'border-transparent opacity-60'}`}
                    >
                      <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowAvatarPicker(false)} className="w-full py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold active:scale-[0.97] transition-transform">Cancelar</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full space-y-4 mb-4">
          <h3 className="text-xl font-heading text-[#253884] tracking-tight px-2">Progreso de Niveles</h3>
          <div ref={levelsScrollRef} className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
            {LEVELS.map(lvl => {
              const LvlIcon = lvl.icon;
              const isCurrent = !!lvl.isCurrent;
              const isDone = !!lvl.done;
              return (
                <div
                  key={lvl.n}
                  data-level={lvl.n}
                  className={`snap-center shrink-0 w-[80%] rounded-3xl p-5 subtle-shadow relative overflow-hidden ${
                    isCurrent ? `bg-gradient-to-br ${lvl.grad} text-white ring-4 ring-blue-300` :
                    isDone    ? 'bg-gray-200 text-gray-600 grayscale' :
                                `bg-gradient-to-br ${lvl.grad} text-white opacity-60`
                  }`}
                >
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <LvlIcon size={80} strokeWidth={1} />
                  </div>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isCurrent ? 'text-blue-200' : isDone ? '' : 'text-white/60'}`}>
                    Nivel {lvl.n}{isCurrent ? ' (Actual)' : isDone ? ' · Completado' : ' · Bloqueado'}
                  </p>
                  <p className="text-2xl font-heading tracking-tight mb-1">{lvl.name}</p>
                  {isCurrent && (
                    <>
                      <p className="text-xs text-blue-100 mb-3 font-medium">{lvl.xp} XP / {lvl.next} XP</p>
                      <div className="w-full bg-black/20 rounded-full h-1.5 mb-3">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: `${Math.min(100, (lvl.xp / lvl.next) * 100)}%` }} />
                      </div>
                    </>
                  )}
                  {!isCurrent && !isDone && <p className="text-xs text-white/60 mb-3 font-medium">Requiere {lvl.next.toLocaleString()} XP</p>}
                  <div className={`p-3 rounded-xl border ${isCurrent ? 'bg-white/20 border-white/20' : isDone ? 'bg-white/30 border-white/10' : 'bg-black/10 border-white/10'}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5">Beneficios:</p>
                    <ul className="text-xs space-y-0.5 font-medium">
                      {lvl.benefits.map(b => <li key={b}>• {b}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
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
            {editingProfile ? (
              <input
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full text-xl font-heading text-[#253884] border-2 border-[#253884]/30 focus:border-[#253884] rounded-xl px-3 py-2 outline-none transition-[border-color] bg-gray-50"
              />
            ) : (
              <p className="text-2xl font-heading text-[#253884]">{profileName}</p>
            )}
          </div>
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Correo Electrónico</label>
            {editingProfile ? (
              <input
                type="email"
                value={profileEmail}
                onChange={e => setProfileEmail(e.target.value)}
                className="w-full text-base font-semibold text-gray-700 border-2 border-[#253884]/30 focus:border-[#253884] rounded-xl px-3 py-2 outline-none transition-[border-color] bg-gray-50"
              />
            ) : (
              <p className="text-base font-semibold text-gray-700">{profileEmail}</p>
            )}
          </div>
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Teléfono</label>
            {editingProfile ? (
              <div className="flex gap-2">
                <span className="bg-gray-50 border-2 border-[#253884]/30 rounded-xl px-3 py-2 text-sm text-gray-500 font-bold shrink-0">+503</span>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  placeholder="xxxx-xxxx"
                  className="flex-1 text-base font-semibold text-gray-700 border-2 border-[#253884]/30 focus:border-[#253884] rounded-xl px-3 py-2 outline-none transition-[border-color] bg-gray-50"
                />
              </div>
            ) : (
              <p className="text-base font-semibold text-gray-700">{profilePhone ? `+503 ${profilePhone}` : <span className="text-gray-400 font-medium text-sm">Sin número registrado</span>}</p>
            )}
          </div>
          <div className="pt-2 grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-black text-[#253884]">12</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Reseñas</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-black text-[#253884]">{stampedPOIs.length}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Sellos</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-black text-[#253884]">{savedPOIs.length}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">En Ruta</p>
            </div>
          </div>
          <div className="pt-4 space-y-3">
            <button
              onClick={() => navigateTo(hasSalePlanPlus ? 'USER_PLUS_MANAGE' : 'USER_PLUS')}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform ${hasSalePlanPlus ? 'bg-gradient-to-r from-[#253884] to-indigo-600 text-white shadow-md' : 'bg-[#e6eaf8] text-[#253884] border border-[#253884]/20'}`}
            >
              <Sparkles size={16} strokeWidth={2} />
              {hasSalePlanPlus ? 'SalePlan+ Activo — Gestionar' : 'Hazte SalePlan+ — $3.99/mes'}
            </button>
            <button onClick={() => navigateTo('ONBOARDING')} className="w-full py-4 bg-gray-50 text-red-600 rounded-xl font-bold text-sm tracking-wide border border-transparent active:scale-[0.97] transition-transform">
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
                  <h4 className="text-2xl font-heading text-[#253884] tracking-tight">Café El Molino {i}</h4>
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
            <div className="flex items-center gap-3 mb-6">
              <img src={ICONS.LOGO} alt="SalePlan" className="h-14 filter brightness-0 invert" />
              <span className="font-heading text-4xl text-white tracking-tight pt-1">SalePlan</span>
            </div>
            <h1 className="text-3xl font-heading text-white tracking-tight">Portal Negocio</h1>
            <p className="font-bold text-blue-300 text-xs uppercase mt-2 tracking-[0.15em]">Para negocios aliados</p>
          </div>

          <div className="space-y-5 bg-white p-8 rounded-3xl subtle-shadow text-[#253884]">
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">ID Comercio</label>
              <input type="text" className="w-full bg-gray-50 border-2 border-transparent px-4 py-4 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-[border-color,background-color]" placeholder="COM-0001" />
            </div>
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Código de Seguridad</label>
              <input type="password" className="w-full bg-gray-50 border-2 border-transparent px-4 py-4 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-[border-color,background-color]" placeholder="••••••" />
            </div>
            <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="w-full py-4 mt-2 bg-[#253884] text-white font-bold text-lg uppercase tracking-wide rounded-xl subtle-shadow active:scale-[0.97] transition-transform">
              Acceder
            </button>
            <p className="text-center text-gray-400 text-xs font-medium pt-2">
              ¿Aún no eres aliado?{' '}
              <button onClick={() => navigateTo('AFFILIATE')} className="text-[#253884] font-bold hover:underline">Contáctanos</button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderCommerceDashboard = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 flex flex-col w-full h-full pb-10">
        {/* Header card */}
        <div className="bg-gradient-to-br from-[#253884] to-blue-800 p-6 pt-12 relative z-20 shadow-md">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                <Store size={24} strokeWidth={1.5} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading text-white tracking-tight">Café Central</h2>
                <p className="font-bold text-[10px] uppercase text-blue-300 mt-0.5 tracking-[0.15em]">Dashboard Activo</p>
              </div>
            </div>
            <button onClick={() => navigateTo('ONBOARDING')} className="px-4 py-2 border border-white/20 bg-white/10 rounded-xl font-bold text-xs text-white active:scale-[0.97] transition-transform uppercase tracking-wide">
              Salir
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 relative z-10 mb-4">
            <div className="bg-white/10 border border-white/10 text-white p-3 rounded-2xl backdrop-blur text-center">
              <p className="font-black text-2xl">142</p>
              <p className="font-bold text-[9px] uppercase tracking-wider text-blue-300 mt-0.5">Escaneos Hoy</p>
            </div>
            <div className="bg-white/10 border border-white/10 text-white p-3 rounded-2xl backdrop-blur text-center">
              <p className="font-black text-2xl">18</p>
              <p className="font-bold text-[9px] uppercase tracking-wider text-blue-300 mt-0.5">Nuevos</p>
            </div>
            <div className="bg-white/10 border border-white/10 text-white p-3 rounded-2xl backdrop-blur text-center">
              <div className="flex items-center justify-center gap-1">
                <p className="font-black text-2xl">4.8</p>
                <img src={ICONS.STAR_FILLED} className="w-4 h-4 opacity-80" alt="" />
              </div>
              <p className="font-bold text-[9px] uppercase tracking-wider text-blue-300 mt-0.5">Rating</p>
            </div>
          </div>

          {/* Impacto */}
          <div className="relative z-10 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[10px] uppercase text-blue-300 tracking-wider">Impacto Estimado</p>
              <p className="font-black text-lg text-white">S/. 3,240 este mes</p>
            </div>
            {/* Mini sparkline */}
            <div className="flex items-end gap-0.5 h-8">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="w-2 bg-white/50 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs — underline style inside white content area */}
        <div className="bg-white border-b border-gray-100 px-6 flex gap-0 relative z-10 shadow-sm">
          {(['ESCANEO', 'CRM', 'CONFIG'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setCommerceTab(tab)}
              className={`py-4 px-4 font-bold text-xs uppercase tracking-wider transition-[border-color,color] duration-200 border-b-2 active:scale-[0.97] ${commerceTab === tab ? 'border-[#253884] text-[#253884]' : 'border-transparent text-gray-400'}`}
            >
              {tab === 'ESCANEO' ? 'Retos' : tab === 'CRM' ? 'Clientes' : 'Negocio'}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6 space-y-6 relative z-10 w-full">
          {commerceTab === 'ESCANEO' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-5">
              <button onClick={() => alert('Abriendo cámara para Escanear Pasaporte QR...')} className="w-full py-5 bg-[#253884] text-white rounded-2xl card-shadow font-bold text-lg uppercase tracking-wide active:scale-[0.97] transition-transform flex items-center justify-center gap-3">
                <ScanLine size={24} strokeWidth={2} /> <span>Escanear QR de Pasaporte</span>
              </button>

              <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] pt-2">Retos Activos</h3>
              <div className="bg-white p-5 rounded-3xl subtle-shadow flex gap-4 cursor-pointer border border-gray-100 active:scale-[0.98] transition-transform">
                <div className="w-16 h-16 bg-[#e6eaf8] rounded-2xl flex items-center justify-center shrink-0">
                  <QrCode size={28} strokeWidth={1.5} className="text-[#253884]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-heading text-[#253884] tracking-tight leading-tight">Degustación de Verano</h4>
                  <p className="font-bold text-[10px] uppercase text-green-700 bg-green-50 inline-block px-2 py-1 rounded-md mt-2 tracking-wider">Activa hasta 12/Agt</p>
                  <div className="mt-3">
                    <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="text-[10px] bg-gray-50 text-[#253884] px-4 py-2 rounded-lg font-bold uppercase tracking-wide active:scale-[0.97] transition-transform border border-gray-100">Editar Reto</button>
                  </div>
                </div>
              </div>

              <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="w-full py-8 border-2 border-dashed border-[#253884]/20 bg-white rounded-3xl text-center active:scale-[0.97] transition-transform">
                <span className="text-3xl font-black text-[#253884] mb-2 block opacity-40">+</span>
                <span className="font-bold text-sm uppercase text-[#253884] tracking-wider opacity-70">Nuevo Reto</span>
              </button>
            </motion.div>
          )}

          {commerceTab === 'CRM' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-5">
              <div className="relative">
                <input type="text" placeholder="Buscar contacto..." className="w-full px-5 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl outline-none placeholder:text-gray-400 focus:border-[#253884] transition-[border-color] font-medium subtle-shadow" />
                <img src={ICONS.SEARCH} className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" alt="" />
              </div>

              <div className="bg-[#253884] rounded-3xl card-shadow p-5 text-white overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} strokeWidth={1.5} />
                  <h4 className="font-heading text-lg tracking-tight">Predicciones SalePlan AI</h4>
                </div>
                <p className="text-xs text-blue-200 mb-4 bg-black/10 p-3 rounded-xl border border-white/10 font-medium">Alta probabilidad de visita hoy según rutas activas.</p>
                <div className="space-y-3">
                  {[{ name: 'Valentina Cruz', avatar: AVATARS[0], prob: '94%' }, { name: 'Ricardo Morales', avatar: AVATARS[3], prob: '87%' }].map(user => (
                    <div key={user.name} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shrink-0">
                        <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white leading-tight truncate">{user.name}</p>
                        <p className="text-[9px] text-blue-200 font-bold uppercase truncate mt-0.5">{user.prob} probabilidad</p>
                      </div>
                      <button className="bg-white text-[#253884] text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-[0.97] transition-transform shrink-0">Invitar</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl subtle-shadow p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-[#253884]">Directorio Activo</h4>
                  <button onClick={() => alert('Descargando lista de contactos en CSV...')} className="text-[9px] bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 uppercase tracking-widest active:scale-[0.97] transition-transform">
                    Exportar CSV
                  </button>
                </div>
                <div className="space-y-4">
                  {CRM_CONTACTS.map(contact => (
                    <div key={contact.name} className="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-xl active:scale-[0.98] transition-transform">
                      <div className={`w-11 h-11 rounded-full border-2 overflow-hidden shrink-0 flex items-center justify-center font-black text-lg ${contact.badge === 'Frecuente' ? 'border-[#253884]' : contact.badge === 'Nuevo' ? 'border-green-400' : 'border-gray-100'} ${!contact.avatar ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}`}>
                        {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" alt="User" /> : contact.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#253884] leading-tight truncate">{contact.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase truncate tracking-wide">{contact.time}</p>
                      </div>
                      {contact.badge && (
                        <div className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase flex items-center gap-1 shadow-sm border ${contact.badge === 'Frecuente' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                          <Sparkles size={9} strokeWidth={2} /> {contact.badge}
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
              <div className="bg-white rounded-3xl p-6 subtle-shadow card-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-4">Perfil del Negocio</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-1">Nombre Comercial</p>
                    <p className="text-xl font-heading text-[#253884] tracking-tight">Café Central</p>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-1">Administrador</p>
                    <p className="text-xl font-heading text-[#253884] tracking-tight">Juan Pérez</p>
                  </div>
                  <div>
                    <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-1">ID Comercio</p>
                    <p className="font-bold text-[#253884] font-mono">COM-0001</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-3">Plan Actual</h3>
                <div className="bg-gradient-to-br from-[#253884] to-blue-700 rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-heading text-xl tracking-tight">Plan Pro</p>
                    <span className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">Activo</span>
                  </div>
                  <p className="text-blue-200 text-xs font-medium">Retos ilimitados · CRM · Predicciones AI</p>
                </div>
              </div>

              <button onClick={() => navigateTo('ONBOARDING')} className="w-full bg-white text-red-600 font-bold rounded-2xl py-4 subtle-shadow border border-red-100 active:scale-[0.97] transition-transform uppercase tracking-wide">
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
            <div className="h-64 relative w-full rounded-b-[2.5rem] overflow-hidden shadow-sm bg-gray-100">
              <img
                src={getPoiImage(poi.id)}
                alt={poi.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <button onClick={() => window.history.back()} className="absolute top-6 left-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-[0.97] transition-transform z-10">
                <ChevronLeft size={20} strokeWidth={2} className="text-[#253884]" />
              </button>
              <div className={`absolute bottom-5 right-5 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white ${poi.color.split(' ')[1]}`}>
                <PoiIcon id={poi.id} size={22} strokeWidth={1.5} />
              </div>
            </div>

            <div className="px-6 py-8">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-4xl font-heading text-[#253884] pr-4">{poi.name}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded-lg">{poi.category}</span>
                <span className="text-sm font-semibold text-gray-400">·</span>
                <span className="text-sm font-semibold text-gray-500">{poi.location}</span>
                <span className="text-sm font-semibold text-gray-400">·</span>
                <span className="px-2.5 py-1 bg-blue-50 text-xs font-bold text-[#253884] rounded-lg">~{[20, 30, 45, 60, 90][poi.id % 5]} min</span>
                {savedPOIs.includes(poi.id) && <span className="px-2.5 py-1 bg-green-50 text-xs font-bold text-green-700 rounded-lg flex items-center gap-1"><Check size={10} strokeWidth={3} /> En tu ruta</span>}
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-10">{poi.description}</p>

              <div className="space-y-4">
                {/* Date/time planner — available for all events */}
                <div className={`p-4 rounded-2xl border transition-[border-color,background-color] ${requireScheduleFor === poi.id ? 'bg-red-50 border-red-400 animate-pulse' : poi.isFlash ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                  <p className={`font-bold mb-3 flex items-center gap-1.5 text-sm ${requireScheduleFor === poi.id ? 'text-red-700' : poi.isFlash ? 'text-yellow-800' : 'text-[#253884]'}`}>
                    <Calendar size={14} strokeWidth={2} />
                    {poi.isFlash ? 'Planear Asistencia' : 'Planear mi Visita'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={poiSchedules[poi.id]?.day ?? VISIT_DAYS[0].text}
                      onChange={e => setPoiSchedules(prev => ({ ...prev, [poi.id]: { day: e.target.value, time: prev[poi.id]?.time ?? VISIT_TIMES[0].text } }))}
                      className={`border-2 rounded-xl px-3 py-2 text-xs font-bold outline-none ${poi.isFlash ? 'bg-white border-yellow-200 text-yellow-900' : 'bg-white border-gray-200 text-[#253884]'}`}
                    >
                      {VISIT_DAYS.map(d => <option key={d.text} value={d.text}>{d.label}</option>)}
                    </select>
                    <select
                      value={poiSchedules[poi.id]?.time ?? VISIT_TIMES[0].text}
                      onChange={e => setPoiSchedules(prev => ({ ...prev, [poi.id]: { day: prev[poi.id]?.day ?? VISIT_DAYS[0].text, time: e.target.value } }))}
                      className={`border-2 rounded-xl px-3 py-2 text-xs font-bold outline-none ${poi.isFlash ? 'bg-white border-yellow-200 text-yellow-900' : 'bg-white border-gray-200 text-[#253884]'}`}
                    >
                      {VISIT_TIMES.map(t => <option key={t.text} value={t.text}>{t.label}</option>)}
                    </select>
                  </div>
                  {requireScheduleFor === poi.id && (
                    <p className="text-xs font-bold text-red-500 mt-2 animate-pulse">
                      Selecciona un horario antes de agregar
                    </p>
                  )}
                </div>

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

              {/* Similar places */}
              {(() => {
                const similar = POIS.filter(p => !p.isFlash && p.id !== poi.id && p.category === poi.category).slice(0, 3);
                if (similar.length === 0) return null;
                return (
                  <div className="mt-8">
                    <h4 className="text-base font-heading text-[#253884] tracking-tight mb-3">Lugares Similares</h4>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                      {similar.map(s => (
                        <button key={s.id} onClick={() => { setRecentlyViewed(prev => [s.id, ...prev.filter(id => id !== s.id)].slice(0, 5)); setSelectedPOI(s.id); }} className="flex-none w-32 bg-gray-50 rounded-2xl overflow-hidden active:scale-[0.96] transition-transform text-left">
                          <div className="h-20 relative bg-gray-100">
                            <img src={getPoiImage(s.id)} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="p-2.5">
                            <p className="font-bold text-[#253884] text-xs leading-tight line-clamp-2">{s.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.location}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="fixed bottom-0 w-full max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe flex gap-3">
              <button
                onClick={() => {
                  if (!isSaved) {
                    if (!poiSchedules[poi.id]) {
                      setRequireScheduleFor(poi.id);
                      setTimeout(() => setRequireScheduleFor(null), 1500);
                      return;
                    }
                    setSavedPOIs(prev => [...prev, poi.id]);
                    setJustAddedPOI(poi.id);
                    haptic(15);
                    setTimeout(() => setJustAddedPOI(null), 3000);
                  } else {
                    setSavedPOIs(prev => prev.filter(id => id !== poi.id));
                  }
                }}
                className={`flex-1 py-4 font-bold text-lg rounded-2xl shadow-sm transition-[background-color,color] active:scale-[0.97] ${isSaved ? 'bg-gray-100 text-gray-500' : 'bg-[#253884] text-white'}`}
              >
                {isSaved ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} strokeWidth={2.5} /> En Mi Ruta
                  </span>
                ) : 'Agregar a Ruta'}
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
    const filteredPOIs = regularPOIs
      .filter(p => {
        const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.location.toLowerCase().includes(query);
        const matchesCat = !selectedCategory || p.category === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesQuery && matchesCat;
      })
      .sort((a, b) => searchSort === 'pts' ? (b.id % 5) * 5 - (a.id % 5) * 5 : 0);

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          {/* Compact header — keeps flash events above fold */}
          <div className="bg-[#253884] px-6 pt-10 pb-5 shadow-sm relative z-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="text-2xl font-heading text-white tracking-tight">
                {selectedCategory ? selectedCategory : 'Explorar'}
              </h2>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{filteredPOIs.length} lugares</span>
            </div>
            <div className="relative z-10">
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
                placeholder="Buscar lugares, categorías..."
                className="w-full px-5 py-3.5 pr-10 bg-white/10 border-2 border-white/20 text-white rounded-2xl outline-none placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40 transition-[background-color,border-color] font-medium text-sm"
              />
              {searchQuery ? (
                <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white">
                  <X size={16} strokeWidth={2} />
                </button>
              ) : (
                <img src={ICONS.SEARCH} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 invert opacity-70" alt="" />
              )}
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
                  {FLASH_EVENTS.map(event => {
                    const isLocked = event.isPremium && !hasSalePlanPlus;
                    return (
                      <div
                        key={event.id}
                        onClick={() => isLocked ? setPremiumEventPreviewId(event.id) : setSelectedPOI(event.id)}
                        className={`bg-white rounded-2xl p-4 border-2 cursor-pointer active:scale-[0.97] transition-transform subtle-shadow flex flex-col gap-2 ${isLocked ? 'border-indigo-200' : 'border-yellow-200'}`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${isLocked ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                            {isLocked ? <Lock size={18} strokeWidth={1.5} /> : <PoiIcon id={event.id} size={18} strokeWidth={1.5} />}
                          </div>
                          {isLocked ? (
                            <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white font-black text-[8px] uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                              <Sparkles size={7} strokeWidth={2} /> Plus
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 font-black text-[9px] uppercase px-1.5 py-1 rounded-lg text-right leading-tight shrink-0 max-w-[52%]">{event.pts}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-[#253884] text-sm leading-snug">{event.name}</h4>
                        <p className="font-bold text-[9px] text-gray-400 uppercase tracking-wider">{event.location}</p>
                        {isLocked ? (
                          <p className="font-bold text-[9px] text-indigo-500">Desbloquear con Plus</p>
                        ) : (
                          <p className="font-bold text-[9px] text-yellow-700">{event.date}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap shadow-sm active:scale-[0.97] transition-[background-color,color] ${!selectedCategory ? 'bg-[#253884] text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
              >Todos</button>
              {ALL_CATEGORIES.map(cat => {
                const CatIcon = CAT_ICON_MAP[cat.id] ?? MapPin;
                const isActive = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(isActive ? null : cat.name); setSearchQuery(''); }}
                    className={`px-3 py-1.5 rounded-full font-bold text-xs whitespace-nowrap shadow-sm border flex items-center gap-1 active:scale-[0.97] transition-[background-color,color,border-color] ${isActive ? 'bg-[#253884] text-white border-[#253884]' : 'bg-white text-gray-600 border-gray-100'}`}
                  >
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
                  const isStamped = stampedPOIs.includes(poi.id);
                  const visitMins = [20, 30, 45, 60, 90][poi.id % 5];
                  return (
                    <motion.div
                      key={poi.id}
                      variants={itemVariants}
                      onClick={() => { setRecentlyViewed(prev => [poi.id, ...prev.filter(id => id !== poi.id)].slice(0, 5)); setSelectedPOI(poi.id); }}
                      className="bg-white rounded-2xl p-3.5 subtle-shadow relative flex flex-col items-center text-center cursor-pointer active:scale-[0.97] transition-transform"
                    >
                      {isStamped && (
                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-[#253884]/5 pointer-events-none z-10 flex items-center justify-center">
                          <span className="text-[10px] font-black text-[#253884] bg-white/90 px-2 py-0.5 rounded-full border border-[#253884]/20">✓ Sellado</span>
                        </div>
                      )}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (!isSaved) {
                            setRecentlyViewed(prev => [poi.id, ...prev.filter(id => id !== poi.id)].slice(0, 5));
                            setSelectedPOI(poi.id);
                          } else {
                            setRemoveConfirmId(poi.id);
                          }
                        }}
                        className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm z-20 transition-[background-color,color] ${isSaved ? 'bg-[#253884] text-white' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {isSaved ? <Check size={12} strokeWidth={2.5} /> : '+'}
                      </button>
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 relative bg-gray-100">
                        <img
                          src={getPoiImage(poi.id)}
                          alt={poi.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1.5 left-1.5 bg-black/50 text-white rounded-full px-1.5 py-0.5 text-[8px] font-bold">
                          ~{visitMins}m
                        </div>
                        <div className={`absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-white/80 ${poi.color.split(' ')[1]}`}>
                          <PoiIcon id={poi.id} size={13} strokeWidth={1.8} />
                        </div>
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
        <AnimatePresence>
          {removeConfirmId !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-black/40 flex items-end justify-center"
              onClick={() => setRemoveConfirmId(null)}
            >
              <motion.div
                initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
                transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
                className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-safe"
                onClick={e => e.stopPropagation()}
              >
                <p className="font-heading text-2xl text-[#253884] mb-1">¿Eliminar parada?</p>
                <p className="text-sm text-gray-500 font-medium mb-6">{POIS.find(p => p.id === removeConfirmId)?.name} será removido de tu ruta.</p>
                <div className="flex gap-3">
                  <button onClick={() => setRemoveConfirmId(null)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold active:scale-[0.97] transition-transform">Cancelar</button>
                  <button onClick={() => { setSavedPOIs(prev => prev.filter(id => id !== removeConfirmId)); setRemoveConfirmId(null); haptic([10, 30, 10]); }} className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold active:scale-[0.97] transition-transform">Eliminar</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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

  const renderUserPlus = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#253884] via-indigo-700 to-purple-800 px-6 pt-14 pb-14 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white" style={{ width: 4 + (i % 5) * 6, height: 4 + (i % 5) * 6, top: `${(i * 17) % 100}%`, left: `${(i * 23) % 100}%`, opacity: 0.3 + (i % 4) * 0.2 }} />
            ))}
          </div>
          <button onClick={() => navigateTo(prevScreen === 'USER_PLUS' || prevScreen === 'USER_PAYMENT' ? 'USER_HOME' : prevScreen)} className="absolute top-6 left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
            <ChevronLeft size={20} strokeWidth={2} className="text-white" />
          </button>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 font-black text-xs uppercase px-4 py-1.5 rounded-full mb-4 tracking-wider">
              <Sparkles size={12} strokeWidth={2.5} /> Desbloquea lo mejor
            </div>
            <h1 className="text-5xl font-heading text-white tracking-tight mb-1">SalePlan<span className="text-yellow-300">+</span></h1>
            <p className="text-blue-200 font-medium text-base mb-6">Explora más, gana más, vive más.</p>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 inline-block">
              <p className="text-4xl font-heading text-white">$3.99<span className="text-lg text-blue-200 font-semibold">/mes</span></p>
              <p className="text-blue-200 text-xs font-medium mt-1">Cancela cuando quieras · Sin compromiso</p>
            </div>
          </div>
        </div>

        <div className="px-6 pt-8 space-y-4">
          {/* Feature cards */}
          {[
            { icon: '🎫', title: 'Hasta 10 paradas por Pasaporte', desc: 'El doble de aventura. Planea rutas épicas con más comercios aliados.', color: 'bg-blue-50 border-blue-100' },
            { icon: '⚡', title: '2× XP en cada parada', desc: 'Sube de nivel el doble de rápido y desbloquea beneficios exclusivos antes.', color: 'bg-yellow-50 border-yellow-100' },
            { icon: '🗺️', title: 'Itinerarios de Expertos', desc: 'Accede a rutas curadas por expertos en turismo con temáticas únicas.', color: 'bg-purple-50 border-purple-100' },
            { icon: '🌟', title: 'Eventos Premium exclusivos', desc: 'Flash Events con recompensas dobles solo disponibles para miembros Plus.', color: 'bg-amber-50 border-amber-100' },
            { icon: '🏅', title: 'Badge Plus en tu perfil', desc: 'Distingue tu perfil con el ícono exclusivo de miembro SalePlan+.', color: 'bg-indigo-50 border-indigo-100' },
          ].map(f => (
            <div key={f.title} className={`flex items-start gap-4 p-4 rounded-2xl border ${f.color}`}>
              <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
              <div>
                <p className="font-bold text-[#253884] text-sm mb-0.5">{f.title}</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}

          {/* Curated Itineraries preview */}
          <div className="pt-2">
            <h3 className="text-xl font-heading text-[#253884] tracking-tight mb-3">Itinerarios Incluidos</h3>
            <div className="space-y-3">
              {CURATED_ITINERARIES.map(it => (
                <div key={it.id} className={`bg-gradient-to-r ${it.color} rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden`}>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-6xl opacity-20">{it.emoji}</div>
                  <span className="text-3xl shrink-0">{it.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-white text-base tracking-tight">{it.title}</p>
                    <p className="text-white/70 text-xs font-medium mt-0.5 line-clamp-1">{it.description}</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mt-1">{it.stops.length} paradas incluidas</p>
                  </div>
                  <Lock size={16} className="text-white/50 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe CTA */}
          <div className="pt-4 pb-4">
            <button
              onClick={() => { navigateTo('USER_PAYMENT'); haptic([10, 20]); }}
              className="w-full py-5 bg-gradient-to-r from-[#253884] to-indigo-600 text-white font-heading text-xl rounded-2xl shadow-lg active:scale-[0.97] transition-transform relative overflow-hidden"
            >
              <span className="relative z-10">Comenzar SalePlan+ — $3.99/mes</span>
            </button>
            <p className="text-center text-gray-400 text-xs font-medium mt-3">Sin compromiso · Cancela en cualquier momento</p>
          </div>
        </div>
      </div>

      {/* Purchase animation overlay */}
      <AnimatePresence>
        {showPlusAnimation && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#253884] z-[200]" />
            <motion.div className="fixed inset-0 z-[201] flex flex-col items-center justify-center p-8 text-center">
              {/* Passport expanding animation */}
              <motion.div
                initial={{ width: 180, height: 120 }}
                animate={{ width: 300, height: 200 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white rounded-3xl shadow-2xl mb-8 flex flex-col items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-black text-[9px] uppercase px-2 py-1 rounded-full"
                >
                  Plus
                </motion.div>
                <img src={ICONS.LOGO} className="w-12 h-12 mb-2" alt="SalePlan" />
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                  className="grid grid-cols-5 gap-1 px-4"
                >
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.0 + i * 0.07, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="w-7 h-7 bg-[#e6eaf8] border border-[#253884]/20 rounded-lg"
                    />
                  ))}
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
                <p className="text-yellow-300 font-black text-xs uppercase tracking-[0.2em] mb-2">¡Bienvenido!</p>
                <h2 className="text-white font-heading text-4xl tracking-tight mb-2">SalePlan<span className="text-yellow-300">+</span> Activo</h2>
                <p className="text-blue-200 font-medium text-sm">Tu pasaporte ahora tiene 10 espacios.<br />Gana 2× XP en cada visita.</p>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
                onClick={() => { setShowPlusAnimation(false); navigateTo('USER_WALLET'); }}
                className="mt-8 w-full max-w-xs py-4 bg-white text-[#253884] font-bold rounded-2xl text-base active:scale-[0.97] transition-transform shadow-xl"
              >
                Ver mi Pasaporte →
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );

  const renderUserPlusManage = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 p-6 pt-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigateTo('USER_PROFILE')} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center subtle-shadow active:scale-[0.97] transition-transform">
            <ChevronLeft size={20} strokeWidth={2} className="text-[#253884]" />
          </button>
          <h2 className="text-3xl font-heading text-[#253884] tracking-tight">Mi SalePlan<span className="text-indigo-500">+</span></h2>
        </div>

        {/* Active plan card */}
        <div className="bg-gradient-to-br from-[#253884] to-indigo-700 rounded-3xl p-6 mb-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 font-black text-[9px] uppercase px-3 py-1 rounded-full tracking-wider">Activo</div>
          <Sparkles size={40} strokeWidth={1} className="text-white/20 absolute bottom-4 right-4" />
          <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Tu plan actual</p>
          <h3 className="text-white font-heading text-3xl tracking-tight mb-3">SalePlan<span className="text-yellow-300">+</span></h3>
          <p className="text-blue-200 text-sm font-medium mb-4">Renovación: 20 de junio, 2026</p>
          <div className="flex items-baseline gap-1">
            <p className="text-white font-heading text-2xl">$3.99</p>
            <p className="text-blue-200 font-medium text-sm">/mes</p>
          </div>
        </div>

        {/* Benefits active */}
        <div className="bg-white rounded-3xl p-5 subtle-shadow mb-4">
          <h4 className="font-black text-[#253884] text-xs uppercase tracking-[0.15em] mb-4">Beneficios Activos</h4>
          <div className="space-y-3">
            {[
              { icon: '🎫', label: '10 paradas por Pasaporte', sub: 'El doble que el plan gratuito' },
              { icon: '⚡', label: '2× XP en cada parada', sub: 'Sube de nivel más rápido' },
              { icon: '🗺️', label: 'Itinerarios de Expertos', sub: `${CURATED_ITINERARIES.length} rutas curadas disponibles` },
              { icon: '🌟', label: 'Eventos Premium exclusivos', sub: 'Flash Events con 2× recompensas' },
              { icon: '🏅', label: 'Badge Plus en tu perfil', sub: 'Visible para todos' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="text-xl shrink-0">{b.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-[#253884] text-sm">{b.label}</p>
                  <p className="text-gray-400 text-xs font-medium">{b.sub}</p>
                </div>
                <Check size={14} strokeWidth={2.5} className="text-green-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Curated itineraries */}
        <div className="bg-white rounded-3xl p-5 subtle-shadow mb-4">
          <h4 className="font-black text-[#253884] text-xs uppercase tracking-[0.15em] mb-4">Itinerarios de Expertos</h4>
          <div className="space-y-3">
            {CURATED_ITINERARIES.map(it => (
              <button
                key={it.id}
                onClick={() => {
                  const maxSlots = hasSalePlanPlus ? 10 : 6;
                const toAdd = it.stops.filter(id => !savedPOIs.includes(id)).slice(0, maxSlots - savedPOIs.length);
                  if (toAdd.length === 0) return;
                  setSavedPOIs(prev => [...prev, ...toAdd]);
                  haptic([10, 20, 10]);
                  navigateTo('USER_WALLET');
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${it.color} active:scale-[0.97] transition-transform`}
              >
                <span className="text-2xl shrink-0">{it.emoji}</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-white text-sm tracking-tight">{it.title}</p>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{it.stops.length} paradas</p>
                </div>
                <ArrowRight size={16} className="text-white/70 shrink-0" strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <button
          onClick={() => { setHasSalePlanPlus(false); navigateTo('USER_PROFILE'); }}
          className="w-full py-4 bg-white text-red-500 rounded-2xl font-bold text-sm border border-red-100 active:scale-[0.97] transition-transform subtle-shadow"
        >
          Cancelar Suscripción
        </button>
      </div>
      <BottomNav active="profile" />
    </Layout>
  );

  const renderUserPayment = () => {
    const methods = [
      { id: 'apple',  label: 'Apple Pay',                 icon: '🍎', sub: 'Touch ID / Face ID',       bg: 'bg-black',       text: 'text-white', border: '' },
      { id: 'google', label: 'Google Pay',                icon: 'G',  sub: 'Cuenta Google',             bg: 'bg-white',       text: 'text-gray-900', border: 'border-2 border-gray-200' },
      { id: 'paypal', label: 'PayPal',                    icon: 'P',  sub: 'Redirige a PayPal',         bg: 'bg-[#003087]',   text: 'text-white', border: '' },
      { id: 'card',   label: 'Tarjeta credito / debito',  icon: 'C',  sub: 'Visa · Mastercard · AMEX',  bg: 'bg-gray-50',     text: 'text-gray-900', border: 'border-2 border-gray-200' },
      { id: 'link',   label: 'Enlace de pago',            icon: 'L',  sub: 'Paga desde cualquier lugar', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-2 border-emerald-200' },
    ];
    const CARD_BRAND_ICONS: Record<string, string> = { 'apple': 'Apple Pay', 'google': 'Google Pay', 'paypal': 'PayPal', 'card': 'Tarjeta', 'link': 'Enlace' };
    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          <div className="relative bg-gradient-to-br from-[#253884] to-indigo-700 px-6 pt-14 pb-10 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(12)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 4+(i%4)*8, height: 4+(i%4)*8, top: `${(i*19)%100}%`, left: `${(i*31)%100}%`, opacity: 0.3 }} />)}
            </div>
            <button onClick={() => navigateTo('USER_PLUS')} className="absolute top-6 left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
              <ChevronLeft size={20} strokeWidth={2} className="text-white" />
            </button>
            <div className="relative z-10 text-center">
              <p className="text-blue-200 text-xs font-black uppercase tracking-[0.15em] mb-2">Paso final</p>
              <h1 className="text-3xl font-heading text-white tracking-tight mb-1">Metodo de pago</h1>
              <p className="text-blue-200 text-sm font-medium">SalePlan<span className="text-yellow-300">+</span> &mdash; $3.99/mes</p>
            </div>
          </div>

          <div className="px-6 pt-6 space-y-3">
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Selecciona como pagar</p>
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => { setPaymentMethod(m.id); haptic(10); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.97] ${paymentMethod === m.id ? 'ring-2 ring-[#253884] shadow-md' : ''} ${m.bg} ${m.text} ${m.border}`}
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  {m.id === 'apple' && <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.54 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>}
                  {m.id === 'google' && <span className="font-black text-xl" style={{fontFamily:'sans-serif',background:'linear-gradient(to bottom,#4285F4,#34A853,#FBBC05,#EA4335)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>G</span>}
                  {m.id === 'paypal' && <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="#009cde" d="M20.07 7.24A4.37 4.37 0 0 0 16 4.5H9.25a.75.75 0 0 0-.74.63L6.1 18.37a.45.45 0 0 0 .44.52h3.15l.79-5.02-.02.15a.75.75 0 0 1 .74-.63h1.54c3.03 0 5.4-1.23 6.09-4.79.02-.1.04-.2.05-.3a3.2 3.2 0 0 0-.81-1.06z"/><path fill="#012169" d="M9.93 8.05a.65.65 0 0 1 .64-.55h4.07a8.4 8.4 0 0 1 1.32.1 5.56 5.56 0 0 1 .77.2 4.15 4.15 0 0 1 1.34.74 4.14 4.14 0 0 0-4.07-4.04H7.25a.75.75 0 0 0-.74.63L4.1 18.87a.45.45 0 0 0 .44.52h3.37l.84-5.34 1.18-6z"/></svg>}
                  {m.id === 'card' && <svg viewBox="0 0 24 24" className="w-7 h-7 fill-gray-600"><rect x="2" y="5" width="20" height="14" rx="2"/><path fill="white" d="M2 9h20v3H2z"/></svg>}
                  {m.id === 'link' && <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-emerald-600 fill-none" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">{m.label}</p>
                  <p className="text-[10px] font-semibold opacity-60">{m.sub}</p>
                </div>
                {paymentMethod === m.id && <Check size={18} strokeWidth={2.5} className="text-[#253884] shrink-0" />}
              </button>
            ))}

            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl p-5 space-y-3 subtle-shadow border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-[#253884] uppercase tracking-[0.12em]">Datos de la tarjeta</p>
                  <div className="flex gap-1.5">
                    {['Visa','MC','AMEX'].map(b => <span key={b} className="text-[8px] font-black text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">{b}</span>)}
                  </div>
                </div>
                <input value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim())} placeholder="1234 5678 9012 3456" maxLength={19} inputMode="numeric" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold outline-none focus:border-[#253884] transition-colors placeholder:text-gray-300 tracking-widest" />
                <input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="NOMBRE EN LA TARJETA" className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold outline-none focus:border-[#253884] transition-colors placeholder:text-gray-300 uppercase tracking-wide" />
                <div className="flex gap-3">
                  <input value={cardExpiry} onChange={e => { let v=e.target.value.replace(/\D/g,''); if(v.length>=3) v=v.slice(0,2)+'/'+v.slice(2,4); setCardExpiry(v); }} placeholder="MM/AA" maxLength={5} inputMode="numeric" className="flex-1 px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold outline-none focus:border-[#253884] transition-colors placeholder:text-gray-300" />
                  <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="CVV" maxLength={4} inputMode="numeric" type="password" className="w-24 px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold outline-none focus:border-[#253884] transition-colors placeholder:text-gray-300" />
                </div>
              </div>
            )}

            <div className="pt-4 pb-6">
              <button
                onClick={() => {
                  if (!paymentMethod) return;
                  setHasSalePlanPlus(true);
                  setShowPlusAnimation(true);
                  haptic([20, 40, 20, 80]);
                  setPaymentMethod(null); setCardNumber(''); setCardName(''); setCardExpiry(''); setCardCvv('');
                }}
                className={`w-full py-5 rounded-2xl font-heading text-xl shadow-lg transition-all ${paymentMethod ? 'bg-gradient-to-r from-[#253884] to-indigo-600 text-white active:scale-[0.97]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {paymentMethod ? 'Confirmar y Suscribirme' : 'Selecciona un metodo'}
              </button>
              <p className="text-center text-gray-400 text-xs font-medium mt-3">Sin compromiso &middot; Cancela en cualquier momento</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showPlusAnimation && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#253884] z-[200]" />
              <motion.div className="fixed inset-0 z-[201] flex flex-col items-center justify-center p-8 text-center">
                <motion.div initial={{ width: 180, height: 120 }} animate={{ width: 300, height: 200 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.23,1,0.32,1] }} className="bg-white rounded-3xl shadow-2xl mb-8 flex flex-col items-center justify-center relative overflow-hidden">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-black text-[9px] uppercase px-2 py-1 rounded-full">Plus</motion.div>
                  <img src={ICONS.LOGO} className="w-12 h-12 mb-2" alt="SalePlan" />
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="grid grid-cols-5 gap-1 px-4">
                    {[...Array(10)].map((_, i) => <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.0+i*0.07, duration: 0.25, ease: [0.23,1,0.32,1] }} className="w-7 h-7 bg-[#e6eaf8] border border-[#253884]/20 rounded-lg" />)}
                  </motion.div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
                  <p className="text-yellow-300 font-black text-xs uppercase tracking-[0.2em] mb-2">Bienvenido!</p>
                  <h2 className="text-white font-heading text-4xl tracking-tight mb-2">SalePlan<span className="text-yellow-300">+</span> Activo</h2>
                  <p className="text-blue-200 font-medium text-sm">Tu pasaporte ahora tiene 10 espacios.<br />Gana 2x XP en cada visita.</p>
                </motion.div>
                <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }} onClick={() => { setShowPlusAnimation(false); navigateTo('USER_WALLET'); }} className="mt-8 w-full max-w-xs py-4 bg-white text-[#253884] font-bold rounded-2xl text-base active:scale-[0.97] transition-transform shadow-xl">
                  Ver mi Pasaporte →
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Layout>
    );
  };

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
      case 'USER_PLUS':                  return renderUserPlus();
      case 'USER_PLUS_MANAGE':           return renderUserPlusManage();
      case 'USER_PAYMENT':               return renderUserPayment();
      case 'COMMERCE_LOGIN':             return renderCommerceLogin();
      case 'COMMERCE_DASHBOARD':         return renderCommerceDashboard();
      case 'COMMERCE_CREATE_EXPERIENCE': return renderCommerceCreateExperience();
      default:                           return renderOnboarding();
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-gray-200">
      <AnimatePresence>
        {!isOnline && (
          <motion.div initial={{ y: -48 }} animate={{ y: 0 }} exit={{ y: -48 }} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }} className="fixed top-0 left-0 right-0 z-[999] bg-red-500 text-white text-center text-xs font-black py-3 uppercase tracking-wider">
            Sin conexion a internet
          </motion.div>
        )}
      </AnimatePresence>
      {renderCurrentScreen()}
      <PwaGuideModal />
      <AnimatePresence>
        {justAddedPOI !== null && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 left-0 right-0 flex justify-center z-[200] pointer-events-none"
          >
            <button
              onClick={() => { setJustAddedPOI(null); navigateTo('USER_WALLET'); }}
              className="pointer-events-auto bg-[#253884] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl active:scale-[0.97] transition-transform"
            >
              <img src={ICONS.NAV_PASSPORT} className="w-4 h-4 invert" alt="" />
              Ver mi Pasaporte
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-28 left-4 right-4 z-[300] flex justify-center pointer-events-none"
          >
            <div className="bg-[#253884] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-2xl text-center">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {premiumEventPreviewId !== null && (() => {
          const ev = POIS.find(p => p.id === premiumEventPreviewId);
          if (!ev) return null;
          return (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPremiumEventPreviewId(null)} className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm" />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.1, bottom: 0.4 }}
                onDragEnd={(_, info) => { if (info.offset.y > 80) setPremiumEventPreviewId(null); }}
                className="fixed bottom-0 left-0 right-0 z-[251] bg-white rounded-t-[2rem] shadow-2xl"
              >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-4" />
                <div className="px-6 pb-10 overflow-y-auto max-h-[85vh] no-scrollbar">
                  <img src={getPoiImage(premiumEventPreviewId)} alt={ev.name} className="w-full h-44 object-cover rounded-2xl mb-4" />
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shrink-0">
                      <Sparkles size={9} strokeWidth={2} /> SalePlan+ Exclusivo
                    </span>
                    <span className="text-gray-400 text-xs font-bold">{ev.date}</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-gray-400 text-xs font-bold">{ev.location}</span>
                  </div>
                  <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-1">{ev.name}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">{ev.description}</p>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-indigo-400 text-[10px] font-black uppercase tracking-wider">Recompensa exclusiva</p>
                      <p className="text-indigo-900 font-black text-base mt-0.5">{ev.pts}</p>
                    </div>
                    <Lock size={24} strokeWidth={1.5} className="text-indigo-300" />
                  </div>
                  <button
                    onClick={() => { setPremiumEventPreviewId(null); navigateTo('USER_PLUS'); }}
                    className="w-full py-4 bg-gradient-to-r from-[#253884] to-indigo-600 text-white font-heading text-lg rounded-2xl shadow-lg active:scale-[0.97] transition-transform flex items-center justify-center gap-2 mb-3"
                  >
                    <Sparkles size={16} strokeWidth={2} />
                    Desbloquear con SalePlan+
                  </button>
                  <button onClick={() => setPremiumEventPreviewId(null)} className="w-full py-3 text-gray-400 font-bold text-sm active:opacity-70 transition-opacity">
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
   </div>
  );
}
