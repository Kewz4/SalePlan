import React, { useState, useRef } from 'react';
import { type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, Book, Mail, HelpCircle, UserPlus, LogIn, Store, ChevronLeft, ChevronRight,
  Coffee, Palette, UtensilsCrossed, Leaf, BookOpen, Landmark, Mountain, Music,
  ShoppingBag, Flower2, Utensils, Disc3, Camera, Guitar, Pizza, IceCream, MapPin,
  Zap, Crown, Backpack, Trophy, Sprout, ScanLine, Share2, Check, Pencil, Sparkles,
  QrCode, Waves, TreePine, Compass, Calendar, GripVertical, Lock, MessageCircle, TrendingUp, Users
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
    { id: 1,  name: "Café Central",       category: "Café & Postres",   location: "Santa Tecla",      description: "El mejor café de especialidad de la ciudad con un ambiente acogedor.",                              color: "bg-blue-50 text-blue-800 border-blue-200",     date: "Lun-Vie, 8:00 - 20:00" },
    { id: 2,  name: "Museo de Arte",       category: "Arte",             location: "Centro Histórico", description: "Obras clásicas y modernas. No te pierdas la exhibición de los miércoles.",                         color: "bg-purple-50 text-purple-800 border-purple-200", date: "Mar-Dom, 10:00 - 18:00" },
    { id: 3,  name: "Burger Fest",         category: "Gastronomía",      location: "Mejicanos",        description: "Hamburguesas artesanales de otro planeta con ingredientes locales.",                                color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 23:00" },
    { id: 4,  name: "Parque Botánico",     category: "Naturaleza",       location: "Apopa",            description: "Un respiro verde en medio de la jungla de asfalto. Ideal para paseos largos.",                     color: "bg-green-50 text-green-800 border-green-200",   date: "Diario, 6:00 - 18:00" },
    { id: 5,  name: "Librería El Tomo",    category: "Comercio",         location: "Centro Histórico", description: "Libros raros, primeras ediciones y un ambiente mágico para leer.",                                 color: "bg-yellow-50 text-yellow-800 border-yellow-200", date: "Lun-Sáb, 9:00 - 19:00" },
    { id: 6,  name: "Heladería Polar",     category: "Café & Postres",   location: "Santa Tecla",      description: "Helados artesanales con sabores únicos e inigualables.",                                           color: "bg-pink-50 text-pink-800 border-pink-200",      date: "Diario, 11:00 - 21:00" },
    { id: 7,  name: "Teatro Municipal",    category: "Cultura",          location: "San Salvador",     description: "Las mejores obras teatrales clásicas y contemporáneas de la ciudad.",                               color: "bg-purple-50 text-purple-800 border-purple-200", date: "Funciones Variables" },
    { id: 8,  name: "Mirador del Valle",   category: "Turismo",          location: "Lourdes",          description: "La mejor vista panorámica para ver el atardecer perfecto.",                                        color: "bg-blue-50 text-blue-800 border-blue-200",      date: "Diario, 24h" },
    { id: 9,  name: "Club de Jazz Local",  category: "Vida Nocturna",    location: "San Salvador",     description: "Música en vivo cada noche con los mejores músicos locales e internacionales.",                     color: "bg-indigo-50 text-indigo-800 border-indigo-200", date: "Jue-Sáb, 20:00 - 2:00" },
    { id: 10, name: "Pizzería Nápoles",    category: "Gastronomía",      location: "Mejicanos",        description: "Auténtica pizza napolitana al horno de leña, como en Italia.",                                     color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 22:00" },
    { id: 11, name: "Boutique Vintage",    category: "Tiendas Locales",  location: "Apopa",            description: "Ropa vintage y piezas curadas de los años 80 y 90.",                                              color: "bg-orange-50 text-orange-800 border-orange-200", date: "Lun-Sáb, 10:00 - 19:00" },
    { id: 12, name: "Jardín Japonés",      category: "Naturaleza",       location: "Lourdes",          description: "Conecta con la naturaleza y encuentra tu zen interior en este hermoso espacio.",                   color: "bg-green-50 text-green-800 border-green-200",   date: "Mar-Dom, 9:00 - 17:00" },
    { id: 13, name: "Barra de Sushi",      category: "Gastronomía",      location: "Santa Tecla",      description: "Los mejores cortes y rollos creativos con pescado fresco todos los días.",                         color: "bg-red-50 text-red-800 border-red-200",         date: "Diario, 12:00 - 23:00" },
    { id: 14, name: "Tienda de Discos",    category: "Tiendas Locales",  location: "Centro Histórico", description: "Vinilos clásicos, nuevos lanzamientos y joyas escondidas musicales.",                              color: "bg-zinc-50 text-zinc-800 border-zinc-200",      date: "Lun-Sáb, 11:00 - 20:00" },
    { id: 15, name: "Mercado Local",       category: "Turismo",          location: "San Salvador",     description: "Descubre la comida callejera, frutas exóticas y la vibra del verdadero comercio.",                 color: "bg-orange-50 text-orange-800 border-orange-200", date: "Diario, 7:00 - 16:00" }
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
  { id: 101, name: 'Atardecer Acústico', category: 'Evento Flash', location: 'Café Central',  description: 'Sube una selfie etiquetando a @SalePlan.sv y @CafeCentral en historias', pts: '2x Puntos (2 Sellos)', isFlash: true, date: 'Vie 18, 6:00–8:00 PM', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 102, name: 'Noche de Museos',    category: 'Evento Flash', location: 'Museo de Arte', description: 'Asiste con 2 amigos que tengan la app',                                  pts: 'Entrada VIP Gratis + 1 Sello', isFlash: true, date: 'Sáb 19, 7:00–11:00 PM', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 103, name: 'Flash Burger',       category: 'Evento Flash', location: 'Burger Fest',  description: 'Compra el combo "Explorador" para validar',                              pts: '3x Puntos (3 Sellos)', isFlash: true, date: 'Hoy, 12:00–3:00 PM', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 104, name: 'Cena de Temporada',  category: 'Evento Flash', location: 'Restaurante Gaia', description: 'Menu degustacion exclusivo con maridaje de vinos nacionales',           pts: 'Reserva Prioritaria + 2 Sellos', isFlash: true, isPremium: true, date: 'Vie 18, 8:00–11:00 PM', color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  { id: 105, name: 'Rooftop Sessions',   category: 'Evento Flash', location: 'Hotel Sheraton',   description: 'Noche de jazz en el rooftop con barra libre de cocteles de autor',    pts: 'Experiencia VIP + 3 Sellos',    isFlash: true, isPremium: true, date: 'Sáb 19, 9:00 PM–1:00 AM',    color: "bg-indigo-50 text-indigo-800 border-indigo-200" }
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

type CrmContact = { name: string; phone: string; email: string; lastVisit: string; badge: 'Frecuente' | 'Nuevo' | 'En riesgo' | null; prob: number; initial: string; avatar: string | null; };

const CRM_CONTACTS: CrmContact[] = (() => {
  const firstNames = ['Valentina','Ricardo','Luis','María José','Andrés','Sofía','Carlos','Daniela','Pablo','Ana Lucía','Jorge','Laura','Miguel','Isabella','Rodrigo','Fernanda','Sebastián','Natalia','Eduardo','Carmen','José','Valeria','Diego','Claudia','Arturo','Paola','Roberto','Gabriela','Héctor','Mónica','Felipe','Alejandra','Javier','Patricia','Antonio','Melissa','David','Cristina','Manuel','Sandra','Oscar','Verónica','Ernesto','Lucía','Raúl','Elena','Sergio','Gloria','Marco','Teresa','Ximena','Adrián','Diana','Andrés','Rebeca','Gerardo','Brenda','Alfredo','Karla','Mauricio','Silvia','Joaquín','Irene','César','Mariana','Alberto','Pilar','Rafael','Lorena','Francisco','Norma','Pedro','Nathaly','Hugo','Camila','Samuel','Viviana','Tomás','Beatriz','Martín','Elisa','Santiago','Rosario','Daniel','Fabiola','Eduardo','Angela','Iván','Isabel','Jorge','Alicia','Emilio','Yessenia','Salvador','Delia','Ramón','Evelyn','Nelson','Leticia','Víctor','Rosa'];
  const lastNames = ['Cruz','Morales','García','Rivas','Portillo','Hernández','Ramos','Fuentes','López','Castillo','Alfaro','Torres','Ruiz','Velásquez','Díaz','Martínez','Chávez','Flores','Peña','Moreno','Ramírez','Sánchez','González','Méndez','Gutiérrez','Jiménez','Reyes','Vásquez','Salazar','Rodríguez','Pacheco','Castro','Vargas','Mejía','Acosta','Serrano','Espinoza','Molina','Aguilar','Peralta','Núñez','Ortega','Medina','Santos','Delgado','Calderón','Vega','Cárdenas','Rojas','Miranda'];
  const timeOptions = ['Hace 1 hora','Hace 2 horas','Hace 3 horas','Hace 4 horas','Hace 5 horas','Hace 6 horas','Hoy, 08:15','Hoy, 09:42','Hoy, 11:30','Hoy, 13:15','Hoy, 14:50','Hoy, 16:22','Ayer, 09:00','Ayer, 11:45','Ayer, 14:30','Ayer, 16:00','Ayer, 18:42','Hace 2 días','Hace 3 días','Hace 4 días','Hace 5 días','Hace 6 días','Hace 7 días','Hace 8 días','Hace 9 días','Hace 10 días','Hace 12 días','Hace 14 días','Hace 3 semanas','Hace 1 mes'];
  const badges: Array<CrmContact['badge']> = ['Frecuente','Nuevo',null,null,'En riesgo',null,'Frecuente',null,null,null];
  const out: CrmContact[] = [];
  for (let i = 0; i < 300; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 7 + 3) % lastNames.length];
    const name = `${fn} ${ln}`;
    const phoneBase = 70000000 + (i * 1337 + 42) % 29999999;
    const phone = `+503 ${String(phoneBase).slice(0,4)}-${String(phoneBase).slice(4,8)}`;
    const fnSlug = fn.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,'.');
    const lnSlug = ln.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,'.');
    const email = `${fnSlug}.${lnSlug}${i > 50 ? (i % 99) : ''}@gmail.com`;
    const lastVisit = timeOptions[i % timeOptions.length];
    const badge = badges[i % badges.length];
    const prob = Math.max(5, Math.min(98, 95 - Math.floor(i * 0.3) + (i % 7 === 0 ? 15 : 0) + (i % 11 === 0 ? -10 : 0)));
    const initial = fn[0];
    const avatar = (i % 5 === 0 || i % 7 === 0) ? AVATARS[i % AVATARS.length] : null;
    out.push({ name, phone, email, lastVisit, badge, prob, initial, avatar });
  }
  return out;
})();

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
  { id: 1, title: 'Sabores de la Capital', emoji: '🍽️', description: 'Desde el mejor café de especialidad hasta pupusas artesanales — recorrido culinario.', stops: [1, 3, 6, 10, 21, 23], color: 'from-orange-400 to-red-500', expert: { name: 'Chef María Martínez', role: 'Chef · Crítica Gastronómica', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, reward: 420, month: 'Mayo 2026',
    stopQuotes: { 1: 'El V60 aquí es de otro nivel. Pide el café de Apaneca — es el mejor grano del país.', 3: 'El pan brioche artesanal lo cambia todo. No salgas sin el combo Explorador.', 6: 'El helado de maracuyá es mi secreto capitalino. Perfecto para el calor de mayo.', 10: 'Horno de leña a 400°C, masa fermentada 72h. La pizza napolitana más auténtica de SV.', 21: 'Cuatro generaciones de loroco y chicharrón. Estas pupusas son historia viva.', 23: 'La terraza es perfecta al atardecer. Pide el single origin de Santa Ana.' } },
  { id: 2, title: 'Arte & Cultura',         emoji: '🎨', description: 'Museos, galerías contemporáneas y teatro. Circuito cultural completo.', stops: [2, 7, 14, 16, 24], color: 'from-purple-500 to-indigo-600', expert: { name: 'Andrés Villalba', role: 'Curador · Museo Nacional', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, reward: 380, month: 'Mayo 2026',
    stopQuotes: { 2: 'La sala contemporánea del piso 2 esconde las piezas más importantes del siglo XX salvadoreño.', 7: 'Los miércoles de función clásica son imperdibles. El teatro tiene una acústica extraordinaria.', 14: 'Aquí encontré el vinilo de Los Yonics que llevaba 10 años buscando. Una joya escondida.', 16: 'La fachada neoclásica es solo el preámbulo. Entra y siente 500 años de historia.', 24: 'Galería Cima representa a los artistas más importantes del país. Cada visita es una revelación.' } },
  { id: 3, title: 'Naturaleza & Aire Libre',emoji: '🌿', description: 'Parques, jardines y miradores para reconectar con la naturaleza pura.', stops: [4, 8, 12, 17, 18, 19], color: 'from-green-500 to-teal-600', expert: { name: 'Valeria Ortiz', role: 'Guía Ecológica · Bióloga', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }, reward: 450, month: 'Mayo 2026',
    stopQuotes: { 4: 'El jardín de orquídeas es un secreto que pocos conocen. Ve a las 7am para ver los colibríes.', 8: 'El atardecer desde este mirador a las 5:30pm es de los mejores momentos que vivirás en SV.', 12: 'El jardín japonés invita a la meditación. Sigue el sendero de bambú hasta el estanque secreto.', 17: 'Parque Cuscatlán alberga más de 80 especies de árboles nativos. Un pulmón verde único.', 18: 'El bosque nuboso a 2000m cambia la perspectiva. Lleva una chaqueta, el fresco es intenso.', 19: 'Las aguas turquesas del lago cráter son de otro planeta. La mejor luz es entre 6 y 8am.' } },
  { id: 4, title: 'Ruta Histórica',         emoji: '🏛️', description: 'Catedral, mercados coloniales y centros culturales del corazón de El Salvador.', stops: [5, 15, 16, 20, 22, 25], color: 'from-amber-500 to-yellow-600', expert: { name: 'Prof. Jorge Salinas', role: 'Historiador · UTEC', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }, reward: 400, month: 'Mayo 2026',
    stopQuotes: { 5: 'Aquí encontrarás primeras ediciones de poetas salvadoreños del siglo XIX. Una joya bibliográfica.', 15: 'El Mercado Central es el corazón económico del país desde 1884. Prueba las riguas de elote.', 16: 'La catedral fue restaurada en 2000 tras el terremoto. El retablo mayor es del siglo XVIII.', 20: 'Suchitoto conserva el trazado colonial original de 1528. Caminar aquí es viajar en el tiempo.', 22: 'El ex-cuartel alberga la mayor concentración de artesanos textiles del país. Apoyo directo.', 25: 'La ruta de las flores florece de noviembre a febrero, pero el café de mayo es insuperable.' } },
];

// iOS-style scroll-wheel picker (3-item window, center selected)
function WheelPicker({ items, value, onChange }: {
  items: { label: string; text: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const ITEM_H = 44;
  const ref = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const idx = items.findIndex(i => i.text === value);
    if (ref.current && idx >= 0) {
      ref.current.scrollTop = idx * ITEM_H;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (!ref.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!ref.current) return;
      const idx = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(idx, items.length - 1));
      if (items[clamped]?.text !== value) onChange(items[clamped].text);
    }, 80);
  };

  return (
    <div className="relative overflow-hidden" style={{ height: ITEM_H * 3 }}>
      <div className="absolute inset-x-0 pointer-events-none z-10" style={{ top: ITEM_H, height: ITEM_H, background: 'rgba(37,56,132,0.08)', borderRadius: 10 }} />
      <div
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto no-scrollbar"
        style={{ height: ITEM_H * 3, scrollSnapType: 'y mandatory', paddingTop: ITEM_H, paddingBottom: ITEM_H }}
      >
        {items.map(item => (
          <div
            key={item.text}
            style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
            className="flex items-center justify-center text-[11px] font-bold text-[#253884] cursor-pointer px-2 text-center leading-tight"
            onClick={() => {
              const idx = items.findIndex(i => i.text === item.text);
              ref.current?.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' });
              onChange(item.text);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 pointer-events-none z-10" style={{ height: ITEM_H, background: 'linear-gradient(to bottom, white 40%, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10" style={{ height: ITEM_H, background: 'linear-gradient(to top, white 40%, transparent)' }} />
    </div>
  );
}

// Motion stagger variants — Emil: stagger 30-80ms between items
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const } }
};

// Layout defined outside App so it never remounts on state changes (prevents image flicker)
const Layout = ({ children, bgClass = 'bg-gray-50' }: { children: React.ReactNode; bgClass?: string }) => (
  <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f3f4f6]">
    <div
      className={`flex-1 w-full max-w-md mx-auto relative flex flex-col shadow-2xl ${bgClass} overflow-x-hidden overflow-y-auto no-scrollbar`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
    >
      {children}
    </div>
  </div>
);

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
  const [commerceTab, setCommerceTab] = useState<'ESCANEO' | 'CRM' | 'ANALYTICS' | 'CONFIG'>('ESCANEO');
  const [crmShowCount, setCrmShowCount] = useState(10);
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [quickAddSearch, setQuickAddSearch] = useState<string>('');
  const [quickAddPoiPick, setQuickAddPoiPick] = useState<number | null>(null);
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
  const [selectedCrmContact, setSelectedCrmContact] = useState<CrmContact | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const levelsScrollRef = useRef<HTMLDivElement>(null);

  const [activeItineraryId, setActiveItineraryId] = useState<number | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [profileName, setProfileName] = useState('Alex Rivera');
  const [profileEmail, setProfileEmail] = useState('explorador@aventura.com');
  const [profilePhone, setProfilePhone] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [removeConfirmId, setRemoveConfirmId] = useState<number | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [hasSalePlanPlus, setHasSalePlanPlus] = useState(false);
  const [showPlusAnimation, setShowPlusAnimation] = useState(false);
  const [stampModalSuccess, setStampModalSuccess] = useState(false);
  const [selectedItineraryId, setSelectedItineraryId] = useState<number | null>(null);
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
  const deckScrollEndRef = useRef<ReturnType<typeof setTimeout> | null>(null); // kept for cleanup safety
  const [showScheduleFor, setShowScheduleFor] = useState<number | null>(null);
  const poiPickerRef = useRef({ day: VISIT_DAYS[0].text, time: VISIT_TIMES[0].text });
  const [itinerarySetupId, setItinerarySetupId] = useState<number | null>(null);
  const itinerarySchedulesRef = useRef<Record<number, { day: string; time: string }>>({});
  const [itineraryStopView, setItineraryStopView] = useState<{ poiId: number; itId: number } | null>(null);
  const [itineraryPreviewId, setItineraryPreviewId] = useState<number | null>(null);
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerStep, setRegisterStep] = useState<'form' | 'otp'>('form');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const imagePreloadRef = useRef<HTMLImageElement[]>([]);

  React.useEffect(() => {
    // Preload all images eagerly so browser caches them before first use
    const toPreload = [...AVATARS, ...Object.values(ICONS), ...Object.values(POI_IMAGE_MAP),
      ...CURATED_ITINERARIES.map(it => it.expert.avatar)];
    toPreload.forEach(src => {
      const img = new Image();
      img.src = src;
      imagePreloadRef.current.push(img); // keep refs alive to prevent GC / cache eviction
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

  // Dynamic PWA status-bar / theme-color
  React.useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    if (itineraryStopView) {
      const it = CURATED_ITINERARIES.find(x => x.id === itineraryStopView.itId);
      // gradient start colors per itinerary
      const starts: Record<number, string> = { 1: '#fb923c', 2: '#a855f7', 3: '#22c55e', 4: '#f59e0b' };
      meta.setAttribute('content', it ? (starts[it.id] ?? '#253884') : '#253884');
    } else if (selectedItineraryId !== null) {
      const starts: Record<number, string> = { 1: '#fb923c', 2: '#a855f7', 3: '#22c55e', 4: '#f59e0b' };
      meta.setAttribute('content', starts[selectedItineraryId] ?? '#253884');
    } else if (['ONBOARDING','USER_HOME','COMMERCE_LOGIN','COMMERCE_DASHBOARD'].includes(currentScreen)) {
      meta.setAttribute('content', '#253884');
    } else if (currentScreen === 'USER_WALLET') {
      meta.setAttribute('content', '#e6eaf8');
    } else {
      meta.setAttribute('content', '#ffffff');
    }
  }, [currentScreen, itineraryStopView, selectedItineraryId]);

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

  // Layout is defined at module level (outside App) to prevent remounting on state changes

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
        <button onClick={() => navigateTo('ONBOARDING')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }} className="absolute left-4 bg-white border border-gray-100 w-12 h-12 rounded-2xl flex justify-center items-center shadow-sm z-20 text-[#253884] active:scale-[0.97] transition-transform">
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
      <div className="flex justify-between items-center px-6 pb-5 bg-white sticky top-0 z-50 shadow-sm" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.25rem)' }}>
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
        <button onClick={() => navigateTo('ONBOARDING')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }} className="absolute left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
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

  const renderUserRegister = () => {
    const handleOtpDigit = (idx: number, val: string) => {
      if (!/^\d*$/.test(val)) return;
      const next = [...otpDigits];
      next[idx] = val.slice(-1);
      setOtpDigits(next);
      setOtpError(false);
      if (val && idx < 5) {
        const nextInput = document.getElementById(`otp-${idx + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    };
    const handleOtpVerify = () => {
      const code = otpDigits.join('');
      if (code.length < 6) { setOtpError(true); return; }
      // Demo: any 6-digit code is valid
      handleLoggedAction('USER_ONBOARDING_PREFS');
      setRegisterStep('form');
      setOtpDigits(['', '', '', '', '', '']);
    };
    return (
      <Layout bgClass="bg-white halftone-bg-light">
        <div className="flex-1 p-6 pb-24 relative flex flex-col items-center" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 4rem)' }}>
          <button
            onClick={() => registerStep === 'otp' ? setRegisterStep('form') : navigateTo('ONBOARDING')}
            style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
            className="absolute left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          <AnimatePresence mode="wait">
            {registerStep === 'form' ? (
              <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="w-full">
                <h1 className="text-4xl font-heading mb-6 text-center text-[#253884] tracking-tight">Crear Perfil</h1>
                <div className="bg-white p-8 rounded-3xl subtle-shadow w-full card-shadow">
                  <div className="space-y-4">
                    <input type="text" placeholder="Nombre o Apodo" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
                    <input type="email" placeholder="Correo Electrónico" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />
                    <div className="flex gap-2">
                      <div className="bg-gray-50 border-2 border-transparent rounded-xl px-4 flex items-center text-gray-500 font-bold text-sm shrink-0">+503</div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="Teléfono*"
                        value={registerPhone}
                        onChange={e => setRegisterPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        className={`flex-1 px-5 py-4 bg-gray-50 border-2 focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400 ${registerPhone === '' && otpError ? 'border-red-400' : 'border-transparent focus:border-[#253884]'}`}
                      />
                    </div>
                    {registerPhone === '' && otpError && <p className="text-red-500 text-xs font-bold -mt-2 px-1">El teléfono es obligatorio para verificar tu cuenta</p>}
                    <input type="password" placeholder="Contraseña Segura" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-[border-color,background-color] placeholder:text-gray-400" />

                    <div className="pt-6 border-t border-gray-100">
                      <p className="font-bold text-center mb-4 text-sm text-gray-500">¿Qué avatar te representa?</p>
                      <div className="flex gap-4 p-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                        {AVATARS.map((avatar, idx) => (
                          <button key={idx} onClick={() => setSelectedAvatar(avatar)}
                            className={`flex-none w-20 h-20 rounded-full border-4 snap-center transition-[transform,border-color,opacity] duration-200 overflow-hidden ${selectedAvatar === avatar ? 'border-[#253884] scale-110 shadow-lg' : 'border-transparent opacity-60 scale-95 bg-gray-50'}`}>
                            <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {[
                        { id: 'terms', label: 'Acepto los', link: 'Términos y Condiciones' },
                        { id: 'privacy', label: 'Acepto la', link: 'Política de Privacidad' },
                      ].map(item => (
                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5 shrink-0">
                            <input type="checkbox" className="peer sr-only" id={item.id} />
                            <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-[#253884] peer-checked:border-[#253884] transition-[background-color,border-color] flex items-center justify-center">
                              <svg viewBox="0 0 12 10" className="w-3 h-3 fill-none stroke-white stroke-2 opacity-0 peer-checked:opacity-100 hidden peer-checked:block"><polyline points="1,5 4,8 11,1"/></svg>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 font-medium leading-snug">
                            {item.label} <button type="button" className="text-[#253884] font-bold underline underline-offset-2">{item.link}</button>
                          </span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => { if (!registerPhone) { setOtpError(true); return; } setOtpError(false); setOtpDigits(['','','','','','']); setRegisterStep('otp'); }}
                      className="w-full py-4 bg-[#253884] text-white font-bold text-lg rounded-xl mt-4 subtle-shadow active:scale-[0.97] transition-transform uppercase"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="w-full">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#e6eaf8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#253884]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <h1 className="text-3xl font-heading text-[#253884] tracking-tight mb-2">Verificar Teléfono</h1>
                  <p className="text-gray-500 font-medium text-sm">Enviamos un código a</p>
                  <p className="text-[#253884] font-bold text-base">+503 {registerPhone}</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">(Demo: cualquier 6 dígitos)</p>
                </div>

                <div className="bg-white p-8 rounded-3xl subtle-shadow card-shadow">
                  <div className="flex justify-center gap-3 mb-6">
                    {otpDigits.map((d, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={e => handleOtpDigit(i, e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Backspace' && !otpDigits[i] && i > 0) {
                            const prev = document.getElementById(`otp-${i - 1}`);
                            (prev as HTMLInputElement)?.focus();
                          }
                        }}
                        className={`w-12 h-14 text-center text-2xl font-black rounded-2xl border-2 outline-none transition-[border-color,background-color] ${d ? 'border-[#253884] bg-[#e6eaf8] text-[#253884]' : otpError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                      />
                    ))}
                  </div>
                  {otpError && <p className="text-red-500 text-xs font-bold text-center mb-4">Ingresa los 6 dígitos del código</p>}
                  <button onClick={handleOtpVerify} className="w-full py-4 bg-[#253884] text-white font-bold text-lg rounded-xl subtle-shadow active:scale-[0.97] transition-transform uppercase">
                    Verificar y Continuar
                  </button>
                  <button onClick={() => setOtpDigits(['','','','','',''])} className="w-full py-3 text-gray-400 font-bold text-sm mt-2 active:opacity-70">
                    Reenviar código
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    );
  };

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
                    className={`relative overflow-hidden rounded-full px-5 py-3 font-bold transition-[background-color,border-color,transform,box-shadow] border-2 text-base flex items-center gap-2 active:scale-[0.97] ${isSelected ? 'bg-[#253884] text-white border-[#253884] shadow-lg scale-105' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
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
          <div className="bg-[#253884] px-6 pb-10 rounded-b-[2.5rem] relative z-20 overflow-hidden shadow-lg" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3rem)' }}>
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
            <button onClick={() => navigateTo('USER_SEARCH')} className="w-full bg-white/15 border border-white/25 backdrop-blur-sm rounded-2xl p-4 flex items-center relative z-10 text-left active:scale-[0.98] transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 shrink-0 fill-none stroke-white opacity-80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span className="font-medium text-blue-100 w-full text-base">¿A dónde vamos hoy?</span>
            </button>
          </div>

          <div className="flex-1 px-6 pt-8 pb-10 space-y-8 relative z-10 w-full">
            {/* Flash events — 3 sections: Hoy / Semana / Premium */}
            {(() => {
              const todayFlash = FLASH_EVENTS.filter(e => !e.isPremium && e.date.toLowerCase().includes('hoy'));
              const weekFlash  = FLASH_EVENTS.filter(e => !e.isPremium && !e.date.toLowerCase().includes('hoy'));
              const premFlash  = FLASH_EVENTS.filter(e => e.isPremium);
              const FlashRow: FC<{ event: typeof FLASH_EVENTS[0]; idx: number }> = ({ event, idx }) => {
                const hoursLeft = [6, 3, 11][idx % 3];
                const isUrgent = hoursLeft <= 4;
                const isLocked = !!event.isPremium && !hasSalePlanPlus;
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
                        <h4 className="font-bold text-[#253884] text-sm leading-tight">{event.name}</h4>
                        {isLocked && <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider shrink-0"><Sparkles size={7} strokeWidth={2} /> Plus</span>}
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{event.date}</p>
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
              };
              return (
                <div className="space-y-5">
                  {todayFlash.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-heading text-[#253884] tracking-tight flex items-center gap-2">
                          Flash de Hoy <Zap size={15} strokeWidth={2.5} className="text-yellow-500" />
                        </h3>
                        <button onClick={() => navigateTo('USER_SEARCH')} className="text-[10px] font-bold text-[#253884] uppercase tracking-widest opacity-60 active:opacity-100">Ver todos</button>
                      </div>
                      <div className="space-y-2.5">{todayFlash.map((e, i) => <FlashRow key={e.id} event={e} idx={i} />)}</div>
                    </div>
                  )}
                  {weekFlash.length > 0 && (
                    <div>
                      <h3 className="text-base font-heading text-[#253884] tracking-tight flex items-center gap-2 mb-3">
                        Flash de la Semana <Calendar size={13} strokeWidth={2.5} className="text-blue-400" />
                      </h3>
                      <div className="space-y-2.5">{weekFlash.map((e, i) => <FlashRow key={e.id} event={e} idx={i} />)}</div>
                    </div>
                  )}
                  {premFlash.length > 0 && (
                    <div>
                      <h3 className="text-base font-heading text-[#253884] tracking-tight flex items-center gap-2 mb-3">
                        Premium <Sparkles size={13} strokeWidth={2.5} className="text-indigo-500" />
                      </h3>
                      <div className="space-y-2.5">{premFlash.map((e, i) => <FlashRow key={e.id} event={e} idx={i} />)}</div>
                    </div>
                  )}
                </div>
              );
            })()}

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

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          {/* Gradient header */}
          <div className="bg-[#e6eaf8] pb-6 rounded-b-[2.5rem] shadow-sm" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3rem)' }}>
            <h2 className="text-3xl font-heading text-[#253884] tracking-tight text-center">Mi Pasaporte</h2>
          </div>

          {/* ── Personal passport card ── */}
          <div className="px-4 mt-4">
              <div className="bg-white rounded-3xl p-5 subtle-shadow card-shadow relative">
                {/* Header: photo centered, name below */}
                <div className="flex flex-col items-center mb-5 pt-1">
                  <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-2 ring-4 ring-[#e6eaf8]">
                    <img src={selectedAvatar} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                  <p className="text-xl font-heading text-[#253884] leading-tight mb-0.5">{profileName || 'Alex Rivera'}</p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mb-1">
                    {hasSalePlanPlus && (
                      <span className="bg-gradient-to-r from-[#253884] to-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 uppercase tracking-wider">
                        <Sparkles size={7} strokeWidth={2} /> Plus
                      </span>
                    )}
                    <span className="bg-[#e6eaf8] text-[#253884] text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">Nv.2</span>
                  </div>
                  <p className="font-medium text-xs text-gray-500">{myRoute.length} Paradas · {stampedPOIs.length} Selladas</p>
                  {activeItineraryId !== null && (() => {
                    const ait = CURATED_ITINERARIES.find(it => it.id === activeItineraryId);
                    return ait ? (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          <MapPin size={7} strokeWidth={2.5} /> {ait.title}
                        </span>
                      </div>
                    ) : null;
                  })()}
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
                  const PassportCell: FC<{ poi: typeof myRoute[0]; pw: number }> = ({ poi, pw }) => {
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
                                    onClick={() => { setShowQuickAdd(true); setQuickAddSearch(''); setQuickAddPoiPick(null); }}
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
                    className="mt-4 w-full border-2 border-dashed border-indigo-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-indigo-500 font-bold text-sm active:scale-[0.97] transition-transform"
                  >
                    <Sparkles size={14} strokeWidth={2} /> ¿Quieres más espacios?
                  </button>
                )}
              </div>
          </div>

          {/* ── Itinerarios de Expertos — horizontal slider ── */}
          <div className="mt-5 mb-1">
            <div className="flex items-center justify-between px-4 mb-3">
              <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">Itinerarios de Expertos</h3>
              <span className="text-[10px] text-gray-400 font-medium">Mayo 2026</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2" style={{ touchAction: 'pan-x', scrollSnapType: 'x mandatory', scrollPaddingLeft: '1rem' }}>
              <div className="flex-none w-4 shrink-0" />
              {CURATED_ITINERARIES.map(it => {
                const isLocked = !hasSalePlanPlus;
                const isActive = activeItineraryId === it.id;
                return (
                  <button
                    key={it.id}
                    style={{ touchAction: 'manipulation', scrollSnapAlign: 'start' }}
                    onClick={() => isLocked ? setItineraryPreviewId(it.id) : setSelectedItineraryId(it.id)}
                    className={`flex-none w-[72%] bg-gradient-to-br ${it.color} rounded-2xl p-4 text-left active:scale-[0.97] transition-transform relative overflow-hidden`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 bg-white/25 border border-white/30 rounded-full px-2 py-0.5">
                        <span className="text-white text-[8px] font-black uppercase tracking-wider">Activo</span>
                      </div>
                    )}
                    {/* Expert row */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40 shrink-0">
                        <img src={it.expert.avatar} alt={it.expert.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-xs leading-tight truncate">{it.expert.name}</p>
                        <p className="text-white/60 text-[9px] font-medium truncate">{it.expert.role}</p>
                      </div>
                      {isLocked && (
                        <span className="ml-auto bg-white/20 border border-white/30 rounded-full px-2 py-0.5 flex items-center gap-0.5 shrink-0">
                          <Lock size={9} className="text-white/80" strokeWidth={2.5} />
                          <span className="text-white/80 text-[9px] font-black">Plus</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-heading text-base tracking-tight leading-tight mb-1">{it.title}</h3>
                    <p className="text-white/70 text-[10px] font-medium leading-snug line-clamp-2 mb-3">{it.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">+{it.reward} pts</span>
                      <span className="text-white/60 text-[9px] font-bold">{it.stops.length} paradas</span>
                    </div>
                  </button>
                );
              })}
              <div className="flex-none w-4 shrink-0" />
            </div>
          </div>

          {/* Ruta de Hoy + Ruta de la Semana */}
          {(() => {
            const TIME_RANK: Record<string, number> = { '08:00 – 12:00': 0, '12:00 – 17:00': 1, '17:00 – 22:00': 2 };
            const todayRoute = myRoute.filter(p => !poiSchedules[p.id] || poiSchedules[p.id].day === 'Hoy').sort((a, b) => {
              const ta = poiSchedules[a.id]?.time, tb = poiSchedules[b.id]?.time;
              return (TIME_RANK[ta ?? ''] ?? 99) - (TIME_RANK[tb ?? ''] ?? 99);
            });
            const weekRoute = myRoute.filter(p => poiSchedules[p.id] && poiSchedules[p.id].day !== 'Hoy').sort((a, b) => {
              const DAY_RANK: Record<string, number> = { 'Mañana': 0, 'Sáb 23 may': 1, 'Lun 25 may': 2 };
              return (DAY_RANK[poiSchedules[a.id]?.day ?? ''] ?? 99) - (DAY_RANK[poiSchedules[b.id]?.day ?? ''] ?? 99);
            });

            const RouteItem: FC<{ poi: typeof myRoute[0] }> = ({ poi }) => {
              const isStamped = stampedPOIs.includes(poi.id);
              const schedule = poiSchedules[poi.id];
              const idx = todayRoute.indexOf(poi);
              const isDragging = dragIndex === idx;
              const isDragOver = dragOverIndex === idx;
              return (
                <div
                  key={poi.id}
                  draggable={!schedule}
                  onDragStart={() => !schedule && setDragIndex(idx)}
                  onDragOver={e => { e.preventDefault(); setDragOverIndex(idx); }}
                  onDrop={() => {
                    if (dragIndex === null || dragIndex === idx) { setDragIndex(null); setDragOverIndex(null); return; }
                    setSavedPOIs(prev => { const s = [...prev]; const [m] = s.splice(dragIndex, 1); s.splice(idx, 0, m); return s; });
                    setDragIndex(null); setDragOverIndex(null);
                  }}
                  onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                  onClick={() => navigateTo('USER_SEARCH', poi.id)}
                  className={`flex items-center gap-3 bg-white rounded-2xl p-3 cursor-pointer active:scale-[0.98] transition-[transform,border-color,opacity] subtle-shadow border-2 ${isStamped ? 'border-[#253884]/20 bg-[#e6eaf8]/50' : isDragOver ? 'border-[#253884]' : 'border-transparent'} ${isDragging ? 'opacity-50 scale-[0.97]' : ''}`}
                >
                  {!schedule && <GripVertical size={16} strokeWidth={2} className="text-gray-300 shrink-0 cursor-grab active:cursor-grabbing" />}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${poi.color}`}>
                    <PoiIcon id={poi.id} size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#253884] text-sm leading-tight truncate">{poi.name}</p>
                    {schedule ? (
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-0.5">{schedule.day} · {schedule.time}</p>
                    ) : (
                      <p className="text-[10px] font-medium text-gray-400 mt-0.5">{poi.location}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isStamped && <div className="w-6 h-6 bg-[#253884] rounded-full flex items-center justify-center shadow"><img src={ICONS.LOGO} className="w-3.5 h-3.5 brightness-0 invert" alt="" /></div>}
                    <button onClick={e => { e.stopPropagation(); if (!isStamped) { setStampModalSuccess(false); setQrModalPOIId(poi.id); } }} disabled={isStamped} className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${isStamped ? 'border-[#253884]/20 bg-[#e6eaf8] cursor-default' : 'border-gray-200 bg-gray-50 active:scale-[0.97]'}`}>
                      {isStamped ? <Check size={13} strokeWidth={2.5} className="text-[#253884]" /> : <QrCode size={13} strokeWidth={1.5} className="text-gray-500" />}
                    </button>
                    {!isStamped && <button onClick={e => { e.stopPropagation(); setSavedPOIs(prev => prev.filter(id => id !== poi.id)); haptic([10, 20, 10]); }} className="w-8 h-8 rounded-xl flex items-center justify-center border border-red-100 bg-red-50 active:scale-[0.97] transition-transform"><X size={13} strokeWidth={2.5} className="text-red-500" /></button>}
                  </div>
                </div>
              );
            };

            return (
              <div className="px-5 pb-6 space-y-6">
                {/* Ruta de Hoy */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">
                      Ruta de Hoy
                      {todayRoute.length > 0 && <span className="ml-2 text-blue-300 font-bold">{todayRoute.length} parada{todayRoute.length !== 1 ? 's' : ''}</span>}
                    </h3>
                    {todayRoute.length > 0 && (
                      <button onClick={() => {
                        const txt = todayRoute.map(p => `• ${p.name}${poiSchedules[p.id] ? ` (${poiSchedules[p.id].time})` : ''}`).join('\n');
                        navigator.share ? navigator.share({ title: 'Mi Ruta de Hoy', text: txt, url: window.location.origin }) : navigator.clipboard?.writeText(txt);
                      }} className="flex items-center gap-1.5 text-[10px] font-black text-[#253884] uppercase tracking-wider bg-[#253884]/10 px-3 py-1.5 rounded-full active:scale-[0.97] transition-transform">
                        <Share2 size={11} strokeWidth={2.5} /> Compartir
                      </button>
                    )}
                  </div>
                  {todayRoute.length === 0 ? (
                    <div className="py-6 flex flex-col items-center">
                      <img src={ICONS.NAV_MAP} className="w-10 h-10 opacity-20 mb-3" alt="" />
                      <p className="text-gray-400 font-bold text-sm">Sin paradas para hoy</p>
                      <p className="text-gray-400 text-xs font-medium mt-1">Explora y agrega lugares a tu ruta</p>
                      <button onClick={() => navigateTo('USER_SEARCH')} className="mt-4 bg-[#253884] text-white px-5 py-2.5 rounded-xl font-bold text-sm active:scale-[0.97] transition-transform">Explorar</button>
                    </div>
                  ) : (
                    <div className="space-y-2">{todayRoute.map(poi => <RouteItem key={poi.id} poi={poi} />)}</div>
                  )}
                </div>

                {/* Ruta de la Semana */}
                {weekRoute.length > 0 && (
                  <div>
                    <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-3">
                      Ruta de la Semana
                      <span className="ml-2 text-blue-300 font-bold">{weekRoute.length} parada{weekRoute.length !== 1 ? 's' : ''}</span>
                    </h3>
                    <div className="space-y-2">{weekRoute.map(poi => <RouteItem key={poi.id} poi={poi} />)}</div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Full-screen itinerary detail — opens from slider card tap */}
          <AnimatePresence>
            {selectedItineraryId !== null && (() => {
              const it = CURATED_ITINERARIES.find(x => x.id === selectedItineraryId);
              if (!it) return null;
              const itStops = POIS.filter(p => it.stops.includes(p.id));
              return (
                <motion.div
                  key={`detail-${selectedItineraryId}`}
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 32, stiffness: 280 }}
                  className="fixed inset-0 z-50 overflow-y-auto bg-gray-50"
                  style={{ overscrollBehavior: 'contain' }}
                >
                  {/* Hero gradient header */}
                  <div className={`bg-gradient-to-b ${it.color} pb-10 px-5 relative overflow-hidden`} style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3rem)' }}>
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="absolute rounded-full bg-white" style={{ width: 40 + (i % 3) * 30, height: 40 + (i % 3) * 30, top: `${(i * 30) % 100}%`, left: `${(i * 45) % 100}%`, opacity: 0.4 }} />
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedItineraryId(null)}
                      className="flex items-center gap-1.5 text-white/80 mb-6 active:opacity-70 relative z-10"
                    >
                      <ChevronLeft size={18} strokeWidth={2.5} />
                      <span className="text-sm font-bold">Mi Pasaporte</span>
                    </button>
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <img src={it.expert.avatar} className="w-16 h-16 rounded-full border-[3px] border-white/60 shadow-xl shrink-0" alt={it.expert.name} />
                      <div>
                        <p className="text-white font-heading text-xl leading-tight">{it.expert.name}</p>
                        <p className="text-white/70 text-xs font-medium">{it.expert.role}</p>
                      </div>
                    </div>
                    <h2 className="text-white font-heading text-3xl tracking-tight mb-2 relative z-10">{it.title}</h2>
                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-5 relative z-10">{it.description}</p>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      <span className="bg-yellow-400 text-yellow-900 font-black text-sm px-3 py-1.5 rounded-full">+{it.reward} pts</span>
                      <span className="bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full">{itStops.length} paradas</span>
                      <span className="bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full">{it.month}</span>
                    </div>
                  </div>

                  {/* Stops list */}
                  <div className="px-4 py-5">
                    <h3 className="text-sm font-heading text-[#253884] tracking-tight mb-3">Paradas del Itinerario</h3>
                    <div className="space-y-2">
                      {itStops.map((poi, idx) => {
                        const isStamped = stampedPOIs.includes(poi.id);
                        return (
                          <button
                            key={poi.id}
                            style={{ touchAction: 'manipulation' }}
                            onClick={() => setItineraryStopView({ poiId: poi.id, itId: it.id })}
                            className="w-full flex items-center gap-3 bg-white rounded-2xl p-3.5 active:scale-[0.98] transition-transform text-left subtle-shadow"
                          >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${it.color} flex items-center justify-center shrink-0 relative`}>
                              <PoiIcon id={poi.id} size={18} strokeWidth={1.5} className="text-white" />
                              {isStamped && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                                  <Check size={8} strokeWidth={3} className="text-green-500" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-[#253884] text-sm">{poi.name}</p>
                              <p className="text-xs text-gray-400 font-medium">{poi.location}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-gray-300 text-[9px] font-bold">#{idx + 1}</span>
                              <ChevronRight size={14} className="text-gray-300" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-4 pb-10">
                    {activeItineraryId === it.id ? (
                      <button
                        onClick={() => { setActiveItineraryId(null); setSelectedItineraryId(null); }}
                        className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-base active:scale-[0.97] transition-transform"
                      >
                        Desactivar Itinerario
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const init: Record<number, { day: string; time: string }> = {};
                          it.stops.forEach((id, i) => { init[id] = { day: VISIT_DAYS[0].text, time: VISIT_TIMES[i % VISIT_TIMES.length].text }; });
                          itinerarySchedulesRef.current = init;
                          setSelectedItineraryId(null);
                          setItinerarySetupId(it.id);
                        }}
                        className={`w-full py-4 bg-gradient-to-r ${it.color} text-white rounded-2xl font-bold text-base active:scale-[0.97] transition-transform shadow-lg`}
                      >
                        Usar este Itinerario →
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Itinerary setup modal — pick time for each stop */}
          <AnimatePresence>
            {itinerarySetupId !== null && (() => {
              const it = CURATED_ITINERARIES.find(x => x.id === itinerarySetupId);
              if (!it) return null;
              const itStops = POIS.filter(p => it.stops.includes(p.id));
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50"
                    onClick={() => setItinerarySetupId(null)}
                  />
                  <motion.div
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white rounded-t-3xl overflow-hidden"
                    style={{ maxHeight: '85dvh' }}
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${it.color} px-5 pt-5 pb-4`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Planifica tu visita</p>
                        <button onClick={() => setItinerarySetupId(null)} className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97]">
                          <X size={13} strokeWidth={2.5} className="text-white" />
                        </button>
                      </div>
                      <h3 className="text-white font-heading text-lg tracking-tight">{it.title}</h3>
                    </div>
                    {/* Stops */}
                    <div className="overflow-y-auto" style={{ maxHeight: 'calc(85dvh - 180px)' }}>
                      {itStops.map((poi, idx) => (
                        <div key={poi.id} className="border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3 px-4 pt-3 pb-1">
                            <div className="w-8 h-8 rounded-full bg-[#e6eaf8] flex items-center justify-center shrink-0">
                              <PoiIcon id={poi.id} size={16} strokeWidth={1.5} className="text-[#253884]" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#253884] text-xs leading-tight">{poi.name}</p>
                              <p className="text-[10px] text-gray-400 font-medium">Parada {idx + 1}</p>
                            </div>
                          </div>
                          <div className="flex mx-4 mb-2 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                            <div className="flex-1 border-r border-gray-100">
                              <WheelPicker
                                items={VISIT_DAYS}
                                value={itinerarySchedulesRef.current[poi.id]?.day ?? VISIT_DAYS[0].text}
                                onChange={v => { itinerarySchedulesRef.current[poi.id] = { day: v, time: itinerarySchedulesRef.current[poi.id]?.time ?? VISIT_TIMES[0].text }; }}
                              />
                            </div>
                            <div className="flex-1">
                              <WheelPicker
                                items={VISIT_TIMES}
                                value={itinerarySchedulesRef.current[poi.id]?.time ?? VISIT_TIMES[0].text}
                                onChange={v => { itinerarySchedulesRef.current[poi.id] = { day: itinerarySchedulesRef.current[poi.id]?.day ?? VISIT_DAYS[0].text, time: v }; }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Confirm */}
                    <div className="px-4 pt-3 pb-safe border-t border-gray-100">
                      <button
                        onClick={() => {
                          const toAdd = it.stops.filter(id => !savedPOIs.includes(id)).slice(0, Math.max(0, totalSlots - savedPOIs.length));
                          if (toAdd.length > 0) setSavedPOIs(prev => [...prev, ...toAdd]);
                          setPoiSchedules(prev => ({ ...prev, ...itinerarySchedulesRef.current }));
                          setActiveItineraryId(it.id);
                          setItinerarySetupId(null);
                          haptic([10, 20, 10]);
                        }}
                        className={`w-full py-3.5 bg-gradient-to-r ${it.color} text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-transform shadow-md mb-2`}
                      >
                        Confirmar Itinerario · {itStops.length} paradas →
                      </button>
                    </div>
                  </motion.div>
                </>
              );
            })()}
          </AnimatePresence>

          {/* Itinerary stop immersive overlay — stable key prevents bg glitch during navigation */}
          <AnimatePresence>
            {itineraryStopView && (() => {
              const it = CURATED_ITINERARIES.find(x => x.id === itineraryStopView.itId);
              const poi = POIS.find(p => p.id === itineraryStopView.poiId);
              if (!it || !poi) return null;
              const stopIdx = it.stops.indexOf(itineraryStopView.poiId);
              const prevId = stopIdx > 0 ? it.stops[stopIdx - 1] : null;
              const nextId = stopIdx < it.stops.length - 1 ? it.stops[stopIdx + 1] : null;
              const quote = (it.stopQuotes as Record<number, string>)[poi.id];
              return (
                <motion.div
                  key="itinerary-stop-view"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className={`fixed inset-0 z-50 bg-gradient-to-b ${it.color} overflow-y-auto`}
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between px-4 pb-3" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}>
                    <button onClick={() => setItineraryStopView(null)} className="flex items-center gap-2 text-white/90 active:opacity-70">
                      <ChevronLeft size={20} strokeWidth={2.5} />
                      <span className="font-bold text-sm">{it.title}</span>
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-white/60 text-xs font-bold">{stopIdx + 1} / {it.stops.length}</span>
                      <img src={ICONS.LOGO} alt="SalePlan" className="h-5 brightness-0 invert opacity-70" />
                    </div>
                  </div>

                  {/* POI image */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`stop-img-${poi.id}`}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="mx-4 rounded-3xl overflow-hidden h-52 relative shadow-xl mb-4">
                        <img src={getPoiImage(poi.id)} alt={poi.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Parada {stopIdx + 1}</p>
                          <h2 className="text-white font-heading text-2xl tracking-tight">{poi.name}</h2>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="mx-4 bg-white/20 border border-white/20 rounded-3xl p-5 mb-4">
                        <p className="text-white font-medium leading-relaxed text-sm mb-4">{poi.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <MapPin size={10} strokeWidth={2} /> {poi.location}
                          </span>
                          <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                            {poi.date}
                          </span>
                        </div>
                      </div>

                      {/* Expert quote */}
                      {quote && (
                        <div className="mx-4 mb-4 flex items-start gap-3">
                          <img src={it.expert.avatar} alt={it.expert.name} className="w-10 h-10 rounded-full border-2 border-white/50 shadow-md shrink-0 object-cover" />
                          <div className="bg-white/15 border border-white/20 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                            <p className="text-white text-[11px] font-semibold leading-relaxed italic">"{quote}"</p>
                            <p className="text-white/60 text-[9px] font-bold mt-1.5 uppercase tracking-wider">{it.expert.name}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Stop navigation */}
                  <div className="flex gap-3 mx-4 mb-4">
                    <button
                      onClick={() => prevId && setItineraryStopView({ poiId: prevId, itId: it.id })}
                      disabled={!prevId}
                      className="flex-1 py-3 bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform disabled:opacity-30"
                    >
                      <ChevronLeft size={16} strokeWidth={2.5} /> Anterior
                    </button>
                    <button
                      onClick={() => nextId && setItineraryStopView({ poiId: nextId, itId: it.id })}
                      disabled={!nextId}
                      className="flex-1 py-3 bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform disabled:opacity-30"
                    >
                      Siguiente <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* CTA */}
                  <div className="mx-4 pb-safe pb-8">
                    <button
                      onClick={() => {
                        const init: Record<number, { day: string; time: string }> = {};
                        it.stops.forEach((id, i) => { init[id] = { day: VISIT_DAYS[0].text, time: VISIT_TIMES[i % VISIT_TIMES.length].text }; });
                        itinerarySchedulesRef.current = init;
                        setItineraryStopView(null);
                        setItinerarySetupId(it.id);
                      }}
                      className="w-full py-4 bg-white text-[#253884] rounded-2xl font-bold text-base active:scale-[0.97] transition-transform shadow-lg"
                    >
                      {it.title} →
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Non-Plus itinerary preview drawer */}
          <AnimatePresence>
            {itineraryPreviewId !== null && (() => {
              const it = CURATED_ITINERARIES.find(x => x.id === itineraryPreviewId);
              if (!it) return null;
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50"
                    onClick={() => setItineraryPreviewId(null)}
                  />
                  <motion.div
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white rounded-t-3xl overflow-hidden pb-safe"
                  >
                    {/* Gradient top with expert photo centered */}
                    <div className={`bg-gradient-to-b ${it.color} pt-8 pb-10 flex flex-col items-center relative`}>
                      <button onClick={() => setItineraryPreviewId(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97]">
                        <X size={14} strokeWidth={2.5} className="text-white" />
                      </button>
                      <img src={it.expert.avatar} alt={it.expert.name} className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover mb-3" />
                      <p className="text-white font-heading text-lg tracking-tight">{it.expert.name}</p>
                      <p className="text-white/70 text-xs font-medium">{it.expert.role}</p>
                    </div>
                    {/* Content lifted over the gradient */}
                    <div className="px-5 -mt-5 relative">
                      <div className="bg-white rounded-3xl p-5 shadow-lg mb-4">
                        <h3 className="text-[#253884] font-heading text-xl tracking-tight mb-1">{it.title}</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-3">{it.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="bg-yellow-100 text-yellow-800 font-black text-[10px] px-2.5 py-1 rounded-full">+{it.reward} pts</span>
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">{it.stops.length} paradas</span>
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">{it.month}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => { setItineraryPreviewId(null); navigateTo('USER_PLUS'); }}
                        className="w-full py-4 bg-gradient-to-r from-[#253884] to-indigo-600 text-white rounded-2xl font-bold text-base active:scale-[0.97] transition-transform shadow-lg mb-2 flex items-center justify-center gap-2"
                      >
                        <Sparkles size={16} strokeWidth={2} /> Hazte SalePlan+
                      </button>
                      <p className="text-center text-gray-400 text-[11px] font-medium pb-4">Desbloquea todos los itinerarios de expertos</p>
                    </div>
                  </motion.div>
                </>
              );
            })()}
          </AnimatePresence>

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

          {/* Quick Add bottom sheet */}
          <AnimatePresence>
            {showQuickAdd && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-50"
                  onClick={() => setShowQuickAdd(false)}
                />
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white rounded-t-3xl overflow-hidden"
                  style={{ maxHeight: '85dvh' }}
                >
                  <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <h3 className="font-heading text-xl text-[#253884] tracking-tight">Agregar Parada</h3>
                    <button onClick={() => { setShowQuickAdd(false); setQuickAddPoiPick(null); }} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-[0.97]">
                      <X size={14} strokeWidth={2.5} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="px-4 pt-3 pb-2 shrink-0">
                    <input
                      type="text"
                      placeholder="Buscar lugar..."
                      value={quickAddSearch}
                      onChange={e => setQuickAddSearch(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-sm font-medium placeholder:text-gray-400 focus:border-[#253884] transition-[border-color]"
                    />
                  </div>
                  <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: 'calc(85dvh - 160px)' }}>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {POIS.filter(p => !p.isFlash && !savedPOIs.includes(p.id) && (quickAddSearch === '' || p.name.toLowerCase().includes(quickAddSearch.toLowerCase()) || p.location.toLowerCase().includes(quickAddSearch.toLowerCase()))).map(poi => (
                        <div key={poi.id} className="bg-white rounded-2xl subtle-shadow overflow-hidden relative active:scale-[0.97] transition-transform border border-gray-100">
                          <div className="h-20 relative bg-gray-100">
                            <img src={getPoiImage(poi.id)} alt={poi.name} className="w-full h-full object-cover" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <div className="p-2.5">
                            <p className="font-bold text-[#253884] text-xs leading-tight line-clamp-1">{poi.name}</p>
                            <p className="text-[9px] text-gray-400 font-medium mt-0.5 truncate">{poi.location}</p>
                          </div>
                          <button
                            onClick={() => { poiPickerRef.current = { day: VISIT_DAYS[0].text, time: VISIT_TIMES[0].text }; setQuickAddPoiPick(poi.id); }}
                            className="absolute top-2 right-2 w-7 h-7 bg-[#253884] rounded-full flex items-center justify-center shadow-md active:scale-[0.95] transition-transform z-10"
                          >
                            <span className="text-white font-black text-base leading-none">+</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

                {/* Schedule picker modal for quick add */}
                <AnimatePresence>
                  {quickAddPoiPick !== null && (() => {
                    const poi = POIS.find(p => p.id === quickAddPoiPick);
                    if (!poi) return null;
                    return (
                      <>
                        <motion.div
                          key="qa-picker-bg"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/40 z-[60]"
                          onClick={() => setQuickAddPoiPick(null)}
                        />
                        <motion.div
                          key="qa-picker"
                          initial={{ opacity: 0, scale: 0.92, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: 20 }}
                          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                          className="fixed inset-x-4 z-[60] bg-white rounded-3xl overflow-hidden shadow-2xl"
                          style={{ top: '50%', transform: 'translateY(-50%)' }}
                        >
                          <div className="bg-[#253884] px-5 py-4">
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">¿Cuándo vas a visitar?</p>
                            <h3 className="text-white font-heading text-lg tracking-tight">{poi.name}</h3>
                          </div>
                          <div className="flex border-b border-gray-100">
                            <div className="flex-1 border-r border-gray-100">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center pt-3 pb-1">Día</p>
                              <WheelPicker items={VISIT_DAYS} value={poiPickerRef.current.day} onChange={v => { poiPickerRef.current.day = v; }} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center pt-3 pb-1">Horario</p>
                              <WheelPicker items={VISIT_TIMES} value={poiPickerRef.current.time} onChange={v => { poiPickerRef.current.time = v; }} />
                            </div>
                          </div>
                          <div className="p-4 flex gap-3">
                            <button onClick={() => setQuickAddPoiPick(null)} className="flex-1 py-3 bg-gray-100 text-gray-500 font-bold text-sm rounded-2xl active:scale-[0.97] transition-transform">Cancelar</button>
                            <button
                              onClick={() => {
                                setSavedPOIs(prev => [...prev, poi.id]);
                                setPoiSchedules(prev => ({ ...prev, [poi.id]: { day: poiPickerRef.current.day, time: poiPickerRef.current.time } }));
                                setQuickAddPoiPick(null);
                                setShowQuickAdd(false);
                                haptic([10, 20, 10]);
                              }}
                              className="flex-1 py-3 bg-[#253884] text-white font-bold text-sm rounded-2xl active:scale-[0.97] transition-transform"
                            >Agregar →</button>
                          </div>
                        </motion.div>
                      </>
                    );
                  })()}
                </AnimatePresence>

          <BottomNav active="wallet" />
        </div>
      </Layout>
    );
  };

  const renderUserProfile = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 px-6 pb-6 flex flex-col items-center" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3rem)' }}>
        <div className="flex items-center justify-between w-full mb-8">
          <h2 className="text-4xl font-heading text-[#253884] tracking-tight">Mi Perfil</h2>
          <button onClick={() => setEditingProfile(true)} className="px-4 py-2 rounded-xl font-bold text-sm active:scale-[0.97] transition-[background-color,color] bg-white text-[#253884] subtle-shadow">
            <span className="flex items-center gap-1.5"><Pencil size={13} strokeWidth={2} /> Editar</span>
          </button>
        </div>

        <div className="relative mb-3 z-10 w-32 h-32">
          <div className="w-full h-full rounded-full bg-white overflow-hidden subtle-shadow border-4 border-white">
            <img src={selectedAvatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button onClick={() => setShowAvatarPicker(true)} className="absolute bottom-0 right-0 bg-[#253884] text-white w-10 h-10 rounded-full flex items-center justify-center subtle-shadow active:scale-[0.97] transition-transform">
            <Pencil size={16} strokeWidth={2} />
          </button>
        </div>
        <p className="text-2xl font-heading text-[#253884] tracking-tight mb-1">{profileName || 'Alex Rivera'}</p>
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
                      {lvl.benefits.map(b => <li key={b} className="flex items-start gap-1.5"><span className="shrink-0 mt-0.5">•</span><span>{b}</span></li>)}
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

        {/* Immersive edit overlay */}
        <AnimatePresence>
          {editingProfile && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[100]"
                onClick={() => setEditingProfile(false)}
              />
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[100] bg-white rounded-t-3xl overflow-hidden"
                style={{ maxHeight: '90dvh' }}
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-[#253884] to-indigo-600 px-6 pt-5 pb-6 relative">
                  <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-heading text-2xl tracking-tight">Editar Perfil</h3>
                    <button onClick={() => setEditingProfile(false)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97]">
                      <X size={14} strokeWidth={2.5} className="text-white" />
                    </button>
                  </div>
                  <p className="text-blue-200 text-xs font-medium mt-1">Tus datos personales en SalePlan</p>
                </div>
                <div className="px-6 pt-5 pb-2 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(90dvh - 120px)' }}>
                  {/* Avatar */}
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#253884]/20 shrink-0">
                      <img src={selectedAvatar} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#253884] text-sm">Foto de perfil</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Elige entre los avatares disponibles</p>
                    </div>
                    <button onClick={() => setShowAvatarPicker(true)} className="px-3 py-2 bg-[#253884] text-white text-xs font-bold rounded-xl active:scale-[0.97] transition-transform">
                      Cambiar
                    </button>
                  </div>
                  {/* Fields */}
                  {[
                    { label: 'Nombre', type: 'text', value: profileName, setter: setProfileName, placeholder: 'Tu nombre completo' },
                    { label: 'Correo Electrónico', type: 'email', value: profileEmail, setter: setProfileEmail, placeholder: 'tu@correo.com' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => f.setter(e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#253884] rounded-2xl outline-none font-semibold text-[#253884] text-sm transition-[border-color]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Teléfono</label>
                    <div className="flex gap-2">
                      <span className="bg-gray-50 border-2 border-gray-200 rounded-2xl px-3 py-3.5 text-sm text-gray-500 font-bold shrink-0">+503</span>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={e => setProfilePhone(e.target.value)}
                        placeholder="xxxx-xxxx"
                        className="flex-1 px-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#253884] rounded-2xl outline-none font-semibold text-[#253884] text-sm transition-[border-color]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => { setEditingProfile(false); haptic([10, 20, 10]); }}
                    className="w-full py-4 bg-[#253884] text-white font-bold text-base rounded-2xl active:scale-[0.97] transition-transform mt-2 mb-6"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="w-full bg-white rounded-3xl p-6 font-bold space-y-4 subtle-shadow">
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Nombre</label>
            <p className="text-2xl font-heading text-[#253884]">{profileName}</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Correo Electrónico</label>
            <p className="text-base font-semibold text-gray-700">{profileEmail}</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Teléfono</label>
            <p className="text-base font-semibold text-gray-700">{profilePhone ? `+503 ${profilePhone}` : <span className="text-gray-400 font-medium text-sm">Sin número registrado</span>}</p>
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
            <motion.div key={i} variants={itemVariants} className={`p-5 rounded-3xl subtle-shadow ${['bg-amber-50', 'bg-blue-50', 'bg-violet-50'][i % 3]}`}>
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
        <button onClick={() => navigateTo('ONBOARDING')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }} className="absolute left-4 bg-white/10 border border-white/20 w-10 h-10 rounded-full flex justify-center items-center z-20 text-white active:scale-[0.97] transition-transform">
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
        <div className="bg-gradient-to-br from-[#253884] via-blue-700 to-indigo-600 px-6 pb-6 relative z-20 shadow-xl" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3rem)' }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute top-16 -left-12 w-32 h-32 bg-blue-400/10 rounded-full" />
            <div className="absolute bottom-0 right-1/3 w-20 h-20 bg-indigo-300/10 rounded-full" />
          </div>
          {/* Business identity row */}
          <div className="flex justify-between items-start mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                <Store size={24} strokeWidth={1.5} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading text-white tracking-tight">Café Central</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <svg key={s} viewBox="0 0 12 12" className="w-3 h-3 fill-yellow-300"><path d="M6 1l1.39 2.81 3.1.45-2.24 2.18.53 3.1L6 8.15l-2.78 1.46.53-3.1L1.51 4.26l3.1-.45z"/></svg>)}
                  </div>
                  <span className="text-yellow-300 text-[10px] font-black">4.8</span>
                  <span className="text-blue-200 text-[10px] font-medium">(142 reseñas)</span>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('ONBOARDING')} className="px-3 py-1.5 border border-white/20 bg-white/10 rounded-xl font-bold text-xs text-white active:scale-[0.97] transition-transform uppercase tracking-wide backdrop-blur-sm">
              Salir
            </button>
          </div>

          {/* Stats grid — 3 cards with trend arrows + sparklines */}
          <div className="grid grid-cols-3 gap-2.5 relative z-10 mb-4">
            {[
              { label: 'Escaneos', value: '142', delta: '+18%', icon: <ScanLine size={13} strokeWidth={2} className="text-blue-300" />, points: '0,18 10,14 20,16 30,10 40,8 50,4 60,2', deltaUp: true },
              { label: 'Nuevos', value: '18', delta: '+5', icon: <UserPlus size={13} strokeWidth={2} className="text-green-300" />, points: '0,20 10,17 20,15 30,12 40,10 50,6 60,3', deltaUp: true },
              { label: 'Sellos', value: '89', delta: '+12%', icon: <Zap size={13} strokeWidth={2} className="text-yellow-300" />, points: '0,20 10,16 20,18 30,12 40,9 50,5 60,2', deltaUp: true },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 border border-white/15 text-white p-3 rounded-2xl backdrop-blur-sm flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  {stat.icon}
                  <span className={`text-[8px] font-black flex items-center gap-0.5 ${stat.deltaUp ? 'text-green-300' : 'text-red-300'}`}>
                    <TrendingUp size={8} strokeWidth={2.5} /> {stat.delta}
                  </span>
                </div>
                <p className="font-black text-xl leading-none">{stat.value}</p>
                <p className="font-bold text-[7px] uppercase tracking-wider text-blue-200 mt-0.5 leading-tight mb-1">{stat.label}</p>
                <svg viewBox="0 0 60 22" className="w-full h-5 mt-auto" preserveAspectRatio="none">
                  <polyline points={stat.points} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points={`${stat.points} 60,22 0,22`} fill="rgba(255,255,255,0.08)" stroke="none"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Revenue impact bar */}
          <div className="relative z-10 bg-white/10 border border-white/15 rounded-2xl px-4 py-3 flex items-center justify-between backdrop-blur-sm">
            <div>
              <p className="font-bold text-[9px] uppercase text-blue-300 tracking-wider">Impacto Estimado · Mayo</p>
              <div className="flex items-center gap-2">
                <p className="font-black text-lg text-white">$3,240</p>
                <span className="bg-green-400/20 border border-green-400/30 text-green-300 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp size={8} strokeWidth={2.5} /> +22%
                </span>
              </div>
            </div>
            <div className="flex items-end gap-0.5 h-10">
              {[30, 55, 40, 70, 50, 85, 65].map((h, i) => (
                <div key={i} className="w-2 rounded-sm" style={{ height: `${h}%`, background: `rgba(255,255,255,${0.3 + (h/100)*0.4})` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs — underline style inside white content area */}
        <div className="bg-white border-b border-gray-100 px-6 flex gap-0 relative z-10 shadow-sm">
          {(['ESCANEO', 'CRM', 'ANALYTICS', 'CONFIG'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setCommerceTab(tab)}
              className={`py-4 px-3 font-bold text-xs uppercase tracking-wider transition-[border-color,color] duration-200 border-b-2 active:scale-[0.97] ${commerceTab === tab ? 'border-[#253884] text-[#253884]' : 'border-transparent text-gray-400'}`}
            >
              {tab === 'ESCANEO' ? 'Retos' : tab === 'CRM' ? 'Clientes' : tab === 'ANALYTICS' ? 'Analytics' : 'Negocio'}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6 space-y-6 relative z-10 w-full">
          {commerceTab === 'ESCANEO' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-5">
              {/* Scan button */}
              <button onClick={() => alert('Abriendo cámara...')} className="w-full py-5 bg-gradient-to-r from-[#253884] to-blue-600 text-white rounded-2xl shadow-lg font-bold text-lg uppercase tracking-wide active:scale-[0.97] transition-transform flex items-center justify-center gap-3">
                <ScanLine size={24} strokeWidth={2} /> Escanear QR de Pasaporte
              </button>

              {/* Monthly goal */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">Meta del Mes</h3>
                  <span className="text-xs font-bold text-[#253884]">142 / 200 escaneos</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-[#253884] to-blue-500 h-3 rounded-full transition-all" style={{ width: '71%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold">71% completado</span>
                  <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5"><TrendingUp size={10} strokeWidth={2} /> En camino</span>
                </div>
              </div>

              {/* Active retos */}
              <div>
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-3">Retos Activos</h3>
                {[
                  { name: 'Degustación de Verano', until: '12 Ago', scans: 89, active: true },
                  { name: 'Flash Café del Lunes', until: 'Hoy', scans: 23, active: true },
                ].map((reto, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl subtle-shadow flex gap-3 cursor-pointer border border-gray-100 active:scale-[0.98] transition-transform mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${reto.until === 'Hoy' ? 'bg-yellow-50 text-yellow-600' : 'bg-[#e6eaf8] text-[#253884]'}`}>
                      {reto.until === 'Hoy' ? <Zap size={22} strokeWidth={1.5} /> : <QrCode size={22} strokeWidth={1.5} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#253884] text-sm leading-tight truncate">{reto.name}</p>
                        {reto.until === 'Hoy' && <span className="bg-yellow-400 text-yellow-900 text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0">HOY</span>}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">{reto.scans} escaneos · Hasta {reto.until}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="w-10 h-5 bg-green-100 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-green-500 rounded-full shadow-sm transition-all" />
                      </div>
                      <button onClick={e => { e.stopPropagation(); navigateTo('COMMERCE_CREATE_EXPERIENCE'); }} className="text-[9px] text-[#253884] font-black uppercase tracking-wide">Editar</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stamp redemption log */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">Últimos Sellos</h3>
                  <span className="text-[10px] text-gray-400 font-bold">Hoy</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: 'Valentina Cruz', time: '14:32', pts: '+2 sellos', color: 'bg-green-50 text-green-600' },
                    { name: 'Ricardo Morales', time: '13:15', pts: '+1 sello', color: 'bg-blue-50 text-blue-600' },
                    { name: 'Andrés Portillo', time: '12:08', pts: '+3 sellos', color: 'bg-yellow-50 text-yellow-600' },
                    { name: 'Laura Castillo', time: '11:44', pts: '+1 sello', color: 'bg-green-50 text-green-600' },
                    { name: 'Carlos Ramos', time: '10:22', pts: '+2 sellos', color: 'bg-blue-50 text-blue-600' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-gray-500">{row.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#253884] truncate">{row.name}</p>
                        <p className="text-[9px] text-gray-400 font-medium">{row.time}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${row.color}`}>{row.pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="w-full py-5 border-2 border-dashed border-[#253884]/20 bg-white rounded-3xl text-center active:scale-[0.97] transition-transform">
                <span className="text-2xl font-black text-[#253884] mb-1 block opacity-40">+</span>
                <span className="font-bold text-sm uppercase text-[#253884] tracking-wider opacity-70">Nuevo Reto Flash</span>
              </button>
            </motion.div>
          )}

          {commerceTab === 'CRM' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-4">
              {/* Search + filter */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input type="text" placeholder="Buscar cliente..." className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-800 rounded-2xl outline-none placeholder:text-gray-400 focus:border-[#253884] transition-[border-color] font-medium text-sm subtle-shadow" />
                  <svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-gray-400 opacity-70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <button className="px-3 py-3 bg-[#253884] text-white rounded-2xl active:scale-[0.97] transition-transform shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
                </button>
              </div>

              {/* Segment chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Todos', 'Frecuentes', 'Nuevos', 'En riesgo'].map(chip => (
                  <button key={chip} className={`flex-none px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-[background-color,color] ${chip === 'Todos' ? 'bg-[#253884] text-white' : 'bg-white border border-gray-200 text-gray-500'}`}>
                    {chip}
                  </button>
                ))}
              </div>

              {/* Customer segments summary */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Frecuentes', count: 8, color: 'bg-green-50 border-green-100 text-green-700', dot: 'bg-green-500' },
                  { label: 'Nuevos', count: 5, color: 'bg-blue-50 border-blue-100 text-blue-700', dot: 'bg-blue-500' },
                  { label: 'En riesgo', count: 3, color: 'bg-red-50 border-red-100 text-red-700', dot: 'bg-red-400' },
                ].map(seg => (
                  <div key={seg.label} className={`p-3 rounded-2xl border text-center ${seg.color}`}>
                    <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${seg.dot}`} />
                    <p className="font-black text-lg leading-none">{seg.count}</p>
                    <p className="font-bold text-[8px] uppercase tracking-wider mt-0.5">{seg.label}</p>
                  </div>
                ))}
              </div>

              {/* AI Predictions with thermometer */}
              <div className="bg-gradient-to-br from-[#253884] to-indigo-700 rounded-3xl p-5 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} strokeWidth={1.5} className="text-yellow-300" />
                  <h4 className="font-heading text-lg tracking-tight">Visitas Probables Hoy</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Valentina Cruz', avatar: AVATARS[0], prob: 94 },
                    { name: 'Ricardo Morales', avatar: AVATARS[3], prob: 87 },
                    { name: 'Andrés Portillo', avatar: AVATARS[2], prob: 71 },
                    { name: 'Laura Castillo', avatar: AVATARS[3], prob: 54 },
                    { name: 'Carlos Ramos', avatar: AVATARS[0], prob: 32 },
                  ].map(user => {
                    const heat = user.prob >= 85 ? '#16a34a' : user.prob >= 65 ? '#22c55e' : user.prob >= 45 ? '#eab308' : user.prob >= 25 ? '#f97316' : '#93c5fd';
                    return (
                      <div key={user.name} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
                        <div className="w-9 h-9 rounded-full border-2 overflow-hidden shrink-0" style={{ borderColor: heat }}>
                          <img src={user.avatar} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm leading-tight truncate">{user.name}</p>
                          <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${user.prob}%`, backgroundColor: heat }} />
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="font-black text-sm" style={{ color: heat }}>{user.prob}%</span>
                          <button onClick={e => { e.stopPropagation(); alert(`Descargando datos de ${user.name}...`); }} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
                            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact directory */}
              <div className="bg-white rounded-3xl subtle-shadow p-5 border border-gray-100">
                <div className="mb-4 pb-3 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-[#253884] text-sm">Directorio · {CRM_CONTACTS.length}</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: 'Más Propensos', color: 'bg-green-600' },
                      { label: 'Menos Propensos', color: 'bg-blue-500' },
                      { label: 'Todos (app)', color: 'bg-[#253884]' },
                    ].map(btn => (
                      <button key={btn.label} onClick={() => alert(`Descargando: ${btn.label}...`)} className={`flex items-center justify-center gap-1 text-[8px] ${btn.color} text-white font-black px-2 py-2 rounded-xl uppercase tracking-wider active:scale-[0.97] transition-transform`}>
                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white shrink-0"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
                        <span className="leading-tight text-center">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {CRM_CONTACTS.slice(0, crmShowCount).map((contact, idx) => (
                    <div key={idx} onClick={() => setSelectedCrmContact(contact)} className="flex items-center gap-3 p-2 -mx-2 rounded-xl active:scale-[0.98] transition-transform cursor-pointer">
                      <div className={`w-10 h-10 rounded-full border-2 overflow-hidden shrink-0 flex items-center justify-center font-black text-sm ${contact.badge === 'Frecuente' ? 'border-[#253884]' : contact.badge === 'Nuevo' ? 'border-green-400' : 'border-gray-200'} ${!contact.avatar ? 'bg-purple-50 text-purple-700' : ''}`}>
                        {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" alt="" /> : contact.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#253884] text-sm leading-tight truncate">{contact.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{contact.lastVisit}</p>
                      </div>
                      {contact.badge && (
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${contact.badge === 'Frecuente' ? 'bg-green-100 text-green-700' : contact.badge === 'Nuevo' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{contact.badge}</span>
                      )}
                      <div className="w-7 h-7 bg-[#e6eaf8] rounded-full flex items-center justify-center shrink-0">
                        <ChevronRight size={14} strokeWidth={2.5} className="text-[#253884]" />
                      </div>
                    </div>
                  ))}
                  {crmShowCount < CRM_CONTACTS.length && (
                    <button onClick={() => setCrmShowCount(c => c + 10)} className="w-full py-2.5 bg-[#e6eaf8] text-[#253884] font-bold text-xs rounded-xl active:scale-[0.97] transition-transform uppercase tracking-wide">
                      Mostrar 10 más · {CRM_CONTACTS.length - crmShowCount} restantes
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* CRM Contact Detail Modal */}
          <AnimatePresence>
            {selectedCrmContact && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-50"
                  onClick={() => setSelectedCrmContact(null)}
                />
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white rounded-t-3xl overflow-hidden"
                  style={{ maxHeight: '70dvh' }}
                >
                  <div className="bg-gradient-to-r from-[#253884] to-indigo-600 px-5 pt-5 pb-6 relative">
                    <button onClick={() => setSelectedCrmContact(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <X size={14} strokeWidth={2.5} className="text-white" />
                    </button>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-white/40 overflow-hidden flex items-center justify-center bg-white/20 font-black text-2xl text-white shrink-0">
                        {selectedCrmContact.avatar ? <img src={selectedCrmContact.avatar} className="w-full h-full object-cover" alt="" /> : selectedCrmContact.initial}
                      </div>
                      <div>
                        <h3 className="text-white font-heading text-xl tracking-tight">{selectedCrmContact.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedCrmContact.badge && (
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${selectedCrmContact.badge === 'Frecuente' ? 'bg-green-400/30 text-green-200' : selectedCrmContact.badge === 'Nuevo' ? 'bg-blue-400/30 text-blue-200' : 'bg-red-400/30 text-red-200'}`}>{selectedCrmContact.badge}</span>
                          )}
                          <span className="text-blue-200 text-[10px] font-bold">Última visita: {selectedCrmContact.lastVisit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-5 space-y-4 overflow-y-auto">
                    {[
                      { label: 'Teléfono', value: selectedCrmContact.phone, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg> },
                      { label: 'Correo', value: selectedCrmContact.email, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                      { label: 'Probabilidad de visita', value: `${selectedCrmContact.prob}%`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
                      { label: 'Última visita', value: selectedCrmContact.lastVisit, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                        <div className="w-8 h-8 bg-[#e6eaf8] text-[#253884] rounded-xl flex items-center justify-center shrink-0">{row.icon}</div>
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{row.label}</p>
                          <p className="font-bold text-[#253884] text-sm mt-0.5">{row.value}</p>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => alert(`Descargando datos de ${selectedCrmContact!.name}...`)} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#253884] text-white font-bold text-sm rounded-2xl active:scale-[0.97] transition-transform mt-2">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
                      Descargar Datos de Usuario
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {commerceTab === 'ANALYTICS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-4">
              {/* Period selector */}
              <div className="flex gap-2">
                {['Hoy', 'Semana', 'Mes', 'Año'].map(r => (
                  <button key={r} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-[background-color,color] ${r === 'Mes' ? 'bg-[#253884] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>{r}</button>
                ))}
              </div>

              {/* 2×3 main metric cards — navy like reference */}
              <div className="grid grid-cols-2 gap-3">
                {/* Usuarios Activos */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <Users size={14} strokeWidth={1.5} className="text-white" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">Usuarios Activos</span>
                  </div>
                  <p className="text-3xl font-heading leading-none mb-0.5">1,250</p>
                  <p className="text-[9px] text-blue-300 font-bold mb-2">Meta: 1,000</p>
                  {/* mini line chart */}
                  <svg viewBox="0 0 80 24" className="w-full h-8" preserveAspectRatio="none">
                    <polyline points="0,20 16,16 32,14 48,10 64,6 80,2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    {[0,16,32,48,64,80].map((x,i) => <circle key={i} cx={x} cy={[20,16,14,10,6,2][i]} r="2" fill="white" />)}
                  </svg>
                  <div className="absolute bottom-1 right-2 text-[8px] text-[8px] font-black text-blue-300 flex gap-2">
                    {['E','F','M','A','M'].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>

                {/* Retención */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">Retención</span>
                  </div>
                  {/* donut */}
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 40 40" className="w-14 h-14 shrink-0">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
                      <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="5" strokeDasharray={`${0.65*94.2} ${94.2}`} strokeDashoffset="23.6" strokeLinecap="round"/>
                      <text x="20" y="24" textAnchor="middle" className="text-[8px]" fill="white" fontSize="9" fontWeight="900">65%</text>
                    </svg>
                    <div>
                      <p className="text-2xl font-heading leading-none">65%</p>
                      <p className="text-[9px] text-blue-300 font-bold">Meta: 60%</p>
                    </div>
                  </div>
                </div>

                {/* Experiencias Creadas */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">Experiencias Creadas</span>
                  </div>
                  <p className="text-3xl font-heading leading-none mb-0.5">320</p>
                  <p className="text-[9px] text-blue-300 font-bold mb-2">Meta: 250</p>
                  {/* mini bar chart */}
                  <div className="flex items-end gap-0.5 h-7">
                    {[30,45,40,55,60,70,80,90].map((v,i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${v}%`, background: i === 7 ? 'white' : `rgba(255,255,255,${0.3+v/200})` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-[6px] text-blue-300 font-bold mt-1">
                    {['E','F','M','A','M'].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>

                {/* Puntos Acumulados */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">Puntos Acumulados</span>
                  </div>
                  <p className="text-3xl font-heading leading-none mb-0.5">125K</p>
                  <p className="text-[9px] text-blue-300 font-bold mb-2">Meta: 100K</p>
                  {/* area line */}
                  <svg viewBox="0 0 80 24" className="w-full h-8" preserveAspectRatio="none">
                    <defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="white" stopOpacity="0.3"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient></defs>
                    <polygon points="0,22 16,18 32,16 48,11 64,7 80,3 80,24 0,24" fill="url(#ag)"/>
                    <polyline points="0,22 16,18 32,16 48,11 64,7 80,3" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Tasa de Conversión */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/><path d="M16 11l2 2 4-4"/></svg>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">Conversión Miembros</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 40 40" className="w-14 h-14 shrink-0">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
                      <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="5" strokeDasharray={`${0.25*94.2} ${94.2}`} strokeDashoffset="23.6" strokeLinecap="round"/>
                      <text x="20" y="24" textAnchor="middle" fill="white" fontSize="9" fontWeight="900">25%</text>
                    </svg>
                    <div>
                      <p className="text-2xl font-heading leading-none">25%</p>
                      <p className="text-[9px] text-blue-300 font-bold">Meta: 20%</p>
                    </div>
                  </div>
                </div>

                {/* NPS */}
                <div className="bg-[#1a2a6c] rounded-3xl p-4 text-white relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">NPS</span>
                  </div>
                  <p className="text-3xl font-heading leading-none mb-0.5">+40</p>
                  <p className="text-[9px] text-blue-300 font-bold mb-2">Meta: +30</p>
                  {/* gauge arc */}
                  <svg viewBox="0 0 80 40" className="w-full h-8">
                    <path d="M8 38 A32 32 0 0 1 72 38" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M8 38 A32 32 0 0 1 72 38" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="100.5" strokeDashoffset="30"/>
                    <text x="40" y="40" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6">-100   0   +100</text>
                  </svg>
                </div>
              </div>

              {/* Strategic objectives row */}
              <div className="bg-[#1a2a6c] rounded-3xl p-4">
                <p className="text-[8px] font-black uppercase tracking-widest text-blue-300 mb-3">Objetivos Estratégicos</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Más Usuarios', icon: <Users size={14} strokeWidth={1.5} className="text-white" /> },
                    { label: 'Mayor Retención', icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg> },
                    { label: 'Más Experiencias', icon: <Sparkles size={14} strokeWidth={1.5} className="text-white" /> },
                    { label: 'Mayor Valor', icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/><path d="M16 11l2 2 4-4"/></svg> },
                  ].map(obj => (
                    <div key={obj.label} className="flex items-center gap-2 bg-white/10 rounded-2xl px-3 py-2.5">
                      <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center shrink-0">{obj.icon}</div>
                      <span className="text-[9px] font-black text-white leading-tight">{obj.label}</span>
                      <TrendingUp size={10} strokeWidth={2.5} className="text-green-300 ml-auto shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {commerceTab === 'CONFIG' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-4">
              {/* Business profile */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-4">Perfil del Negocio</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Nombre Comercial', value: 'Café Central' },
                    { label: 'Categoría', value: 'Café & Postres' },
                    { label: 'Administrador', value: 'Juan Pérez' },
                    { label: 'ID Comercio', value: 'COM-0001', mono: true },
                    { label: 'Ciudad', value: 'Santa Tecla' },
                  ].map((f, i, arr) => (
                    <div key={f.label} className={`flex items-center justify-between py-2.5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{f.label}</p>
                        <p className={`font-bold text-[#253884] text-sm mt-0.5 ${f.mono ? 'font-mono' : ''}`}>{f.value}</p>
                      </div>
                      <button className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center active:scale-[0.97]">
                        <Pencil size={11} strokeWidth={2} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-4">Horario del Negocio</h3>
                <div className="space-y-2.5">
                  {[
                    { day: 'Lunes – Viernes', hours: '8:00 AM – 8:00 PM', open: true },
                    { day: 'Sábado', hours: '9:00 AM – 6:00 PM', open: true },
                    { day: 'Domingo', hours: 'Cerrado', open: false },
                  ].map(h => (
                    <div key={h.day} className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-sm font-bold text-[#253884]">{h.day}</p>
                        <p className={`text-[10px] font-bold ${h.open ? 'text-gray-400' : 'text-red-400'}`}>{h.hours}</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative ${h.open ? 'bg-green-400' : 'bg-gray-200'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${h.open ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty program settings */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-4">Programa de Lealtad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#253884]">Puntos por visita</p>
                      <p className="text-[10px] text-gray-400 font-medium">Actualmente: 50 pts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 bg-gray-100 rounded-lg font-black text-gray-600 flex items-center justify-center active:scale-[0.97]">−</button>
                      <span className="font-black text-[#253884] w-10 text-center">50</span>
                      <button className="w-7 h-7 bg-[#253884] rounded-lg font-black text-white flex items-center justify-center active:scale-[0.97]">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-[#253884]">Sello de bienvenida</p>
                      <p className="text-[10px] text-gray-400 font-medium">Al registrarse en SalePlan</p>
                    </div>
                    <div className="w-10 h-5 bg-green-400 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-[#253884]">Doble puntos Flash</p>
                      <p className="text-[10px] text-gray-400 font-medium">En eventos flash activos</p>
                    </div>
                    <div className="w-10 h-5 bg-green-400 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff management */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em]">Equipo</h3>
                  <button className="text-[9px] bg-[#253884] text-white font-black px-3 py-1.5 rounded-lg uppercase tracking-wide active:scale-[0.97] transition-transform">+ Invitar</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Juan Pérez', role: 'Administrador', color: 'bg-[#253884]' },
                    { name: 'María López', role: 'Cajero', color: 'bg-green-500' },
                  ].map(m => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center font-black text-white text-sm`}>{m.name[0]}</div>
                      <div className="flex-1">
                        <p className="font-bold text-[#253884] text-sm">{m.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">{m.role}</p>
                      </div>
                      <button className="text-[9px] bg-gray-100 text-gray-500 font-bold px-2 py-1 rounded-lg active:scale-[0.97]">···</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="bg-white rounded-3xl p-5 subtle-shadow border border-gray-100">
                <h3 className="text-xs font-black text-[#253884] uppercase tracking-[0.15em] mb-4">Integraciones</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Menú / Carta digital', icon: '📋', connected: true },
                    { name: 'Google Maps', icon: '🗺️', connected: true },
                    { name: 'Instagram', icon: '📸', connected: false },
                    { name: 'WhatsApp Business', icon: '💬', connected: false },
                  ].map(int => (
                    <div key={int.name} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{int.icon}</span>
                        <p className="font-bold text-[#253884] text-sm">{int.name}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${int.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {int.connected ? 'Conectado' : 'Conectar'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan + logout */}
              <div className="bg-gradient-to-br from-[#253884] to-blue-700 rounded-3xl p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-heading text-xl tracking-tight">Plan Pro</p>
                  <span className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-1 rounded-lg uppercase">Activo</span>
                </div>
                <p className="text-blue-200 text-xs font-medium mb-4">Retos ilimitados · CRM · Predicciones AI · Analytics</p>
                <button className="w-full py-2.5 bg-white/20 border border-white/20 rounded-xl font-bold text-xs text-white active:scale-[0.97] transition-transform uppercase tracking-wide">Gestionar Plan</button>
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
              <button onClick={() => window.history.back()} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }} className="absolute left-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-[0.97] transition-transform z-10">
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
                <span className="text-sm font-semibold text-gray-500 flex items-center gap-1"><MapPin size={12} strokeWidth={2} className="text-gray-400" />{poi.location}</span>
                <span className="text-sm font-semibold text-gray-400">·</span>
                <span className="px-2.5 py-1 bg-blue-50 text-xs font-bold text-[#253884] rounded-lg">~{[20, 30, 45, 60, 90][poi.id % 5]} min</span>
                {savedPOIs.includes(poi.id) && <span className="px-2.5 py-1 bg-green-50 text-xs font-bold text-green-700 rounded-lg flex items-center gap-1"><Check size={10} strokeWidth={3} /> En tu ruta</span>}
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">{poi.description}</p>

              {/* Experience highlights */}
              <div className="mb-6 space-y-2">
                <h4 className="text-sm font-heading text-[#253884] tracking-tight mb-3">¿Qué harás aquí?</h4>
                {[
                  poi.isFlash ? `Evento especial · ${poi.date}` : `Visita estimada: ~${[20, 30, 45, 60, 90][poi.id % 5]} minutos`,
                  poi.isFlash ? poi.description : `Explora ${poi.category.toLowerCase()} en ${poi.location}`,
                  `Recompensa: ${poi.pts || '1 Sello + 10 pts'}`
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#253884] mt-1.5 shrink-0" />
                    <p className="text-sm text-gray-600 font-medium leading-snug">{line}</p>
                  </div>
                ))}
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

            {/* Schedule picker — center popup modal (no flicker: uses ref, not state) */}
            <AnimatePresence>
              {showScheduleFor === poi.id && !isSaved && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 z-50"
                    onClick={() => setShowScheduleFor(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    className="fixed inset-x-4 z-50 bg-white rounded-3xl overflow-hidden shadow-2xl"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <div className="bg-[#253884] px-5 py-4">
                      <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">¿Cuándo vas a visitar?</p>
                      <h3 className="text-white font-heading text-lg tracking-tight">{poi.name}</h3>
                    </div>
                    <div className="flex border-b border-gray-100">
                      <div className="flex-1 border-r border-gray-100">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center pt-3 pb-1">Día</p>
                        <WheelPicker
                          items={VISIT_DAYS}
                          value={poiPickerRef.current.day}
                          onChange={v => { poiPickerRef.current.day = v; }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center pt-3 pb-1">Horario</p>
                        <WheelPicker
                          items={VISIT_TIMES}
                          value={poiPickerRef.current.time}
                          onChange={v => { poiPickerRef.current.time = v; }}
                        />
                      </div>
                    </div>
                    <div className="p-4 flex gap-3">
                      <button
                        onClick={() => setShowScheduleFor(null)}
                        className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm active:scale-[0.97] transition-transform"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          setPoiSchedules(prev => ({ ...prev, [poi.id]: { day: poiPickerRef.current.day, time: poiPickerRef.current.time } }));
                          setSavedPOIs(prev => [...prev, poi.id]);
                          setShowScheduleFor(null);
                          setJustAddedPOI(poi.id);
                          haptic(15);
                          setTimeout(() => setJustAddedPOI(null), 3000);
                        }}
                        className="flex-[2] py-3 bg-[#253884] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-transform"
                      >
                        Agregar a Ruta →
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div className="fixed bottom-0 w-full max-w-md mx-auto px-4 pt-3 pb-safe bg-white/90 backdrop-blur-md border-t border-gray-100">
              {/* Primary action */}
              <button
                style={{ touchAction: 'manipulation' }}
                onClick={() => {
                  if (!isSaved) {
                    poiPickerRef.current = { day: VISIT_DAYS[0].text, time: VISIT_TIMES[0].text };
                    setShowScheduleFor(poi.id);
                  } else {
                    setSavedPOIs(prev => prev.filter(id => id !== poi.id));
                    setShowScheduleFor(null);
                  }
                }}
                className={`w-full py-3.5 font-bold text-base rounded-2xl shadow-sm transition-[background-color,color] active:scale-[0.97] mb-2.5 ${isSaved ? 'bg-gray-100 text-gray-500' : 'bg-[#253884] text-white'}`}
              >
                {isSaved ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} strokeWidth={2.5} /> En Mi Ruta
                  </span>
                ) : 'Agregar a Ruta'}
              </button>
              {/* Secondary actions — icon only */}
              <div className="flex gap-2 pb-3">
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(poi.name + ' ' + poi.location)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-3 bg-[#e6eaf8] text-[#253884] rounded-xl active:scale-[0.97] transition-transform"
                >
                  <MapPin size={18} strokeWidth={1.5} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('¡Visita ' + poi.name + ' en SalePlan! ' + poi.location)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-3 bg-green-500 text-white rounded-xl active:scale-[0.97] transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: poi.name, text: `¡Te invito a ${poi.name} en SalePlan!`, url: window.location.href });
                    } else {
                      navigator.clipboard?.writeText(window.location.href).then(() => showToast('Enlace copiado'));
                    }
                  }}
                  className="flex-1 flex items-center justify-center py-3 bg-[#e6eaf8] text-[#253884] rounded-xl active:scale-[0.97] transition-transform"
                >
                  <Share2 size={18} strokeWidth={1.5} />
                </button>
              </div>
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
          <div className="bg-[#253884] px-6 pb-5 shadow-sm relative z-20 overflow-hidden" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 2.5rem)' }}>
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
                <svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-white opacity-70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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
                  {[...FLASH_EVENTS].sort((a, b) => {
                    const aToday = a.date.toLowerCase().includes('hoy');
                    const bToday = b.date.toLowerCase().includes('hoy');
                    if (aToday && !bToday) return -1;
                    if (!aToday && bToday) return 1;
                    return 0;
                  }).map(event => {
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
                    className={`w-9 h-9 rounded-full shadow-sm border flex items-center justify-center active:scale-[0.97] transition-[background-color,color,border-color] ${isActive ? 'bg-[#253884] text-white border-[#253884]' : 'bg-white text-gray-500 border-gray-100'}`}
                  >
                    <CatIcon size={13} strokeWidth={2} />
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
                      <p className="text-[9px] text-gray-400 font-medium truncate w-full text-center">{poi.location}</p>
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
        <button onClick={() => navigateTo('ONBOARDING')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }} className="absolute left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
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
        <button onClick={() => navigateTo('ONBOARDING')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }} className="absolute left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 active:scale-[0.97] transition-transform">
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
      <div className="relative flex-1 overflow-y-auto no-scrollbar pb-24">
        <button onClick={() => navigateTo(prevScreen === 'USER_PLUS' || prevScreen === 'USER_PAYMENT' ? 'USER_HOME' : prevScreen)} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)', zIndex: 30 }} className="absolute left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
          <ChevronLeft size={20} strokeWidth={2} className="text-white" />
        </button>
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#253884] via-indigo-700 to-purple-800 px-6 pt-14 pb-14 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white" style={{ width: 4 + (i % 5) * 6, height: 4 + (i % 5) * 6, top: `${(i * 17) % 100}%`, left: `${(i * 23) % 100}%`, opacity: 0.3 + (i % 4) * 0.2 }} />
            ))}
          </div>
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
            <button onClick={() => navigateTo('USER_PLUS')} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }} className="absolute left-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
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
                  {m.id === 'google' && <svg viewBox="0 0 48 20" className="h-5 w-auto"><text x="0" y="16" fontFamily="'Product Sans',Arial,sans-serif" fontSize="16" fontWeight="700"><tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC05">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan></text><text x="26" y="16" fontFamily="'Product Sans',Arial,sans-serif" fontSize="16" fontWeight="500" fill="#5f6368"> Pay</text></svg>}
                  {m.id === 'paypal' && <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="white" d="M20.07 7.24A4.37 4.37 0 0 0 16 4.5H9.25a.75.75 0 0 0-.74.63L6.1 18.37a.45.45 0 0 0 .44.52h3.15l.79-5.02-.02.15a.75.75 0 0 1 .74-.63h1.54c3.03 0 5.4-1.23 6.09-4.79.02-.1.04-.2.05-.3a3.2 3.2 0 0 0-.81-1.06z"/><path fill="rgba(255,255,255,0.7)" d="M9.93 8.05a.65.65 0 0 1 .64-.55h4.07a8.4 8.4 0 0 1 1.32.1 5.56 5.56 0 0 1 .77.2 4.15 4.15 0 0 1 1.34.74 4.14 4.14 0 0 0-4.07-4.04H7.25a.75.75 0 0 0-.74.63L4.1 18.87a.45.45 0 0 0 .44.52h3.37l.84-5.34 1.18-6z"/></svg>}
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
