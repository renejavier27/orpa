import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { Helmet } from "react-helmet-async";
import {
  Scale,
  ArrowRight,
  Building2,
  Landmark,
  Globe2,
  Mail,
  Phone,
  MapPin,
  Home,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Clock3,
  Handshake,
  Users,
  FileText,
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-orpa.jpg`;
function SEO({ title, description, path = "/" }) {
  const baseUrl = "https://orpanama.com";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${baseUrl}${path}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta property="og:site_name" content="ORPA Panamá" />
    </Helmet>
  );
}
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const services = [
  {
    slug: "derecho-corporativo",
    icon: Building2,
    title: "Derecho Corporativo",
    short:
      "Asesoría para la apertura, organización y protección legal de empresas y negocios en Panamá.",
    description:
      "Nuestra firma brinda asesoría para la apertura de nuevos negocios, así como para ordenar y proteger estructuras empresariales ya existentes. Acompañamos la creación de sociedades anónimas, inscripción ante las instancias gubernamentales correspondientes, obtención de licencias y permisos, gestión de cuentas bancarias y redacción de contratos comerciales.",
    includes: [
      "Creación de sociedades anónimas",
      "Inscripción ante entidades gubernamentales",
      "Obtención de licencias y permisos",
      "Gestión de apertura de cuentas bancarias",
      "Contratos entre socios, trabajadores, proveedores y servicios",
    ],
    sections: [
      {
        title: "Apertura y organización de negocios",
        body:
          "Incorporamos negocios mediante la creación de sociedades anónimas y nos encargamos de los trámites necesarios para que la empresa opere conforme a la normativa vigente en el menor tiempo posible.",
      },
      {
        title: "Contratos corporativos",
        body:
          "Redactamos los contratos requeridos por el negocio, desde convenios o acuerdos entre socios hasta contratos con trabajadores, proveedores y prestadores de servicios.",
      },
      {
        title: "Sociedades anónimas en Panamá",
        body:
          "La sociedad anónima es una figura jurídica reconocida nacional e internacionalmente para la organización de empresas y transacciones mercantiles. Su constitución y funcionamiento se encuentra regulado por la Ley 32 del 26 de febrero de 1927.",
      },
    ],
    requirements: [
      "Nombre de la sociedad anónima. Se recomienda enviar al menos tres nombres en orden de preferencia para verificar disponibilidad en el Registro Público Panameño.",
      "Fines principales de la sociedad anónima.",
      "Capital autorizado, número de acciones y valor nominal. Usualmente US$10,000.00 dividido en 100 acciones comunes de US$100.00 cada una.",
      "Definir si las acciones serán nominativas o al portador.",
      "Nombre completo y dirección de por lo menos tres directores.",
      "Nombre completo y dirección de los primeros dignatarios: Presidente, Secretario y Tesorero.",
    ],
    costs: [
      "Primer año de Tasa Única Anual",
      "Primer año de Agente Residente",
      "Elaboración, protocolización e inscripción del Pacto Social",
      "Renuncia de suscriptores y directores",
      "Acta de Junta Directiva para emisión de acciones",
      "Certificados de acciones, Libro de Registro de Acciones y Libro de Actas",
    ],
    benefits: [
      "Directores, dignatarios y accionistas pueden ser nacionales o residentes de cualquier país.",
      "No existe requerimiento de capital mínimo pagado.",
      "La sociedad puede tener oficinas en cualquier parte del mundo.",
      "Exoneración de impuestos por actividades realizadas fuera de Panamá.",
      "Tiempo estimado de constitución: entre 3 y 5 días hábiles.",
    ],
    extraServices: [
      "Otorgamiento de Poderes Generales o Especiales",
      "Modificación del Pacto Social",
      "Cambio de nombre, objeto social, directiva o dignatarios",
      "Cambio de agente residente",
      "Aumento o disminución de capital",
      "Disolución de sociedades anónimas",
    ],
  },
  {
  slug: "derecho-inmobiliario",
  icon: Home,
  title: "Derecho Inmobiliario",
  short:
    "Asesoría integral en compra, venta, arrendamiento, contratos inmobiliarios y propiedad horizontal.",
  description:
    "Orozco Pérez y Asociados brinda asesoría legal en procesos de compra y venta de propiedades en Panamá, elaboración de contratos inmobiliarios, arrendamientos, construcción, servicios generales y asuntos relacionados con propiedad horizontal.",
  includes: [
    "Compra o venta de propiedades",
    "Investigación legal de inmuebles",
    "Contratos de promesa de compraventa y compraventa",
    "Contratos de arrendamiento, construcción y servicios",
    "Asesoría en propiedad horizontal",
  ],
  sections: [
    {
      title: "Compra o venta de propiedades",
      body:
        "Acompañamos todo el proceso de compra o venta de propiedades en Panamá, desde la investigación inicial del inmueble hasta la inscripción a nombre del nuevo propietario.",
    },
    {
      title: "Contratos inmobiliarios",
      body:
        "Elaboramos y revisamos contratos de promesa de compraventa, compraventa, arrendamiento, construcción y servicios en general, procurando claridad y seguridad jurídica para las partes.",
    },
    {
      title: "Propiedad Horizontal",
      body:
        "Brindamos asesoría legal en temas de propiedad horizontal a administradoras, juntas directivas y propietarios que requieren apoyo para una gestión correcta y documentada.",
    },
  ],
  requirements: [
    "Información general de la propiedad objeto de compra, venta, arrendamiento o revisión.",
    "Documentación disponible del inmueble, propietario, comprador o partes interesadas.",
    "Datos sobre gravámenes, impuestos adeudados, asientos pendientes o trámites existentes, si aplica.",
    "Objetivo de la gestión: compra, venta, arrendamiento, construcción, servicio, reclamo o trámite de P.H.",
  ],
  costs: [
    "Investigación y obtención de información de la propiedad",
    "Verificación de medidas y linderos",
    "Revisión de gravámenes, impuestos adeudados y asientos pendientes",
    "Elaboración y revisión de contratos",
    "Gestión de pagos de impuestos, paz y salvos e inscripción registral",
    "Actualización ante la Autoridad Nacional de Tierras (ANATI), cuando corresponda",
  ],
  benefits: [
    "Acompañamiento desde la investigación del inmueble hasta la inscripción final.",
    "Mayor seguridad en contratos de compra, venta, arrendamiento o construcción.",
    "Revisión legal de gravámenes, impuestos y situación registral.",
    "Apoyo en asambleas, actas y decisiones de propiedad horizontal.",
    "Experiencia en reclamos ante ACODECO y demandas por vicios ocultos o de construcción.",
  ],
  extraServices: [
    "Asesoría a compañías administradoras de P.H.",
    "Asistencia a Juntas Directivas de P.H.",
    "Correcta celebración de Asambleas",
    "Toma de decisiones válidas dentro del P.H.",
    "Inscripción de actas en el Registro Público",
    "Reclamos ante ACODECO contra promotoras o constructoras",
    "Demandas por vicios ocultos o de construcción",
  ],
},
  {
  slug: "cobros-legales",
  icon: Landmark,
  title: "Cobros Legales",
  short:
    "Cobranza extrajudicial y judicial, recuperación de cartera morosa y reorganización de cuentas pendientes.",
  description:
    "La firma Orozco Pérez y Asociados (ORPA) posee amplia experiencia en cobros legales por vía extrajudicial y judicial, ayudando a empresas y clientes al saneamiento y reorganización de cartera morosa, evitando el castigo de deudas y la consecuente pérdida de dinero y clientes.",
  includes: [
    "Cobros extrajudiciales",
    "Cobros judiciales",
    "Saneamiento de cartera morosa",
    "Reorganización de cuentas pendientes",
    "Recuperación rápida de bienes",
  ],
  sections: [
    {
      title: "Cobranza extrajudicial",
      body:
        "Nuestro equipo realiza gestiones de cobro orientadas a alcanzar acuerdos de pago eficientes antes de recurrir a procesos judiciales, buscando la recuperación ordenada de cartera vencida.",
    },
    {
      title: "Cobranza judicial",
      body:
        "Cuando la situación lo requiere, brindamos acompañamiento legal mediante procesos judiciales orientados a la recuperación de créditos y cumplimiento de obligaciones.",
    },
    {
      title: "Equipo especializado de cobranza",
      body:
        "Contamos con un equipo entrenado de asesores de call center especializados en la industria de cobranza, organizados de forma exclusiva por cartera, moras y objetivos de recuperación.",
    },
  ],
  requirements: [
    "Información del deudor o cliente moroso.",
    "Detalle de deuda pendiente y documentación de respaldo.",
    "Contratos, facturas, acuerdos o evidencia de obligación.",
    "Historial de pagos, gestiones previas o incumplimientos.",
    "Objetivo de recuperación: negociación, cobranza o recuperación de bienes.",
  ],
  costs: [
    "Evaluación de cartera morosa",
    "Gestiones de cobranza extrajudicial",
    "Seguimiento especializado por cartera",
    "Estrategias de reorganización de deuda",
    "Procesos judiciales de cobro, cuando aplique",
    "Gestión de recuperación de bienes",
  ],
  benefits: [
    "Reducción del riesgo de pérdida económica.",
    "Recuperación ordenada de cartera morosa.",
    "Asesores especializados según mora y objetivos.",
    "Cobertura extrajudicial y judicial.",
    "Gestores de campo para recuperación rápida de bienes (vehículos).",
    "Mayor presión de cumplimiento sobre deudores morosos.",
  ],
  extraServices: [
    "Gestión de call center especializado",
    "Segmentación de cartera según mora",
    "Negociación y acuerdos de pago",
    "Recuperación de bienes (vehículos)",
    "Gestores de campo o capturadores",
    "Seguimiento de cumplimiento del deudor",
  ],
},
  {
  slug: "gestion-de-tramites",
  icon: FileCheck2,
  title: "Gestión de Trámites",
  short:
    "Gestión de trámites legales ante instituciones públicas, evitando demoras, errores y pérdida de tiempo.",
  description:
    "Orozco Pérez y Asociados (ORPA) ayuda a personas y empresas en la gestión de trámites legales ante instituciones públicas, evitando lo tedioso que pueden tornarse estas visitas y reduciendo el riesgo de errores, demoras, pérdida de tiempo y dinero.",
  includes: [
    "Gestión ante instituciones públicas",
    "Obtención de paz y salvos",
    "Certificaciones y estados de cuenta",
    "Correcciones y solicitudes administrativas",
    "Pago de impuestos municipales y nacionales",
  ],
  sections: [
    {
      title: "Trámites sin complicaciones",
      body:
        "Muchos trámites ante instituciones del Estado pueden demorarse por desconocimiento de procedimientos o requisitos. Nuestra firma ayuda a gestionarlos de forma ordenada, eficaz y oportuna.",
    },
    {
      title: "Ahorro de tiempo y dinero",
      body:
        "Nos encargamos de acompañar y ejecutar gestiones legales para evitar molestias, visitas innecesarias, errores en la documentación y retrasos administrativos.",
    },
    {
      title: "Experiencia ante instituciones",
      body:
        "Ponemos a disposición nuestra experiencia, paciencia y dedicación para ayudar en trámites legales, administrativos, municipales y gubernamentales.",
    },
  ],
  requirements: [
    "Documento de identidad o datos del solicitante.",
    "Información del trámite requerido.",
    "Documentos de respaldo relacionados con la gestión.",
    "Autorizaciones o poderes, cuando sea necesario.",
    "Datos de la institución o entidad ante la cual se realizará el trámite.",
  ],
  costs: [
    "Obtención de placa vehicular",
    "Paz y salvos",
    "Estados de cuenta",
    "Correcciones",
    "Certificaciones",
    "Pago de impuestos municipales y nacionales",
  ],
  benefits: [
    "Evita visitas tediosas a instituciones públicas.",
    "Reduce errores por desconocimiento de procedimientos.",
    "Ahorra tiempo y dinero.",
    "Gestión eficaz y oportuna.",
    "Acompañamiento profesional durante el trámite.",
  ],
  extraServices: [
    "Municipio de Panamá",
    "Dirección General de Ingresos",
    "Tribunal Electoral",
    "Ministerio de Comercio e Industrias",
    "Ministerio de Trabajo",
    "Registro Público",
    "Ministerio de Relaciones Exteriores",
    "Ministerio de Salud",
    "Ministerio de Vivienda",
    "Autoridad Nacional de Administración de Tierras (ANATI)",
    "Autoridad de Protección al Consumidor y Defensa de la Competencia",
    "Autoridad Nacional de los Servicios Públicos",
    "Autoridad Marítima de Panamá",
    "Superintendencia de Seguros y Reaseguros de Panamá",
    "Autoridad de la Micro, Pequeña y Mediana Empresa (AMPYME)",
  ],
},
  {
    slug: "permiso-migratorio-laboral",
    icon: Globe2,
    title: "Permiso Migratorio y Laboral",
    short:
      "Asesoría en condición migratoria, permisos laborales y documentación legal relacionada en Panamá.",
    description:
      "Brindamos asesoría para la obtención y gestión de permisos migratorios y laborales, acompañando al cliente durante el proceso de preparación documental, presentación y seguimiento de su trámite.",
    includes: [
      "Permisos migratorios",
      "Permisos laborales",
      "Revisión de requisitos",
      "Preparación documental",
      "Seguimiento de trámites",
    ],
  },
  {
  slug: "registros-sanitarios",
  icon: ShieldCheck,
  title: "Registros Sanitarios",
  short:
    "Asesoría y gestión de registros sanitarios ante el Ministerio de Salud para productos comercializados en Panamá.",
  description:
    "Para comercializar productos alimenticios, cosméticos, medicamentos, productos de limpieza y otros de interés sanitario en Panamá, es necesario contar con un Registro Sanitario emitido por el Ministerio de Salud. Orozco Pérez y Asociados (ORPA) brinda acompañamiento integral para la obtención, organización documental y seguimiento del proceso.",
  includes: [
    "Obtención de Registro Sanitario",
    "Asesoría documental y regulatoria",
    "Revisión de requisitos técnicos",
    "Gestión ante el Ministerio de Salud",
    "Acompañamiento para alimentos, cosméticos y otros productos",
  ],
  sections: [
    {
      title: "¿Qué es un Registro Sanitario?",
      body:
        "El Registro Sanitario es la autorización emitida por el Ministerio de Salud sobre productos fabricados, importados, envasados o comercializados en Panamá que sean de interés sanitario, previa verificación del cumplimiento de los requisitos legales establecidos.",
    },
    {
      title: "Comercialización en Panamá",
      body:
        "Todo producto alimenticio, cosmético, medicamento, producto de limpieza y otros similares requiere registro sanitario para poder comercializarse legalmente en el país.",
    },
    {
      title: "Vigencia y regulación",
      body:
        "El Registro Sanitario tiene una vigencia de cinco (5) años y es de carácter personalísimo e intransferible. Todo producto deberá incluir en la etiqueta el código de identificación de planta y el número de registro asignado.",
    },
  ],
  requirements: [
    "Copia de cédula, carné de residente permanente o pasaporte del representante legal o propietario.",
    "Copia de la Certificación de Registro Público de la empresa (persona jurídica).",
    "Copia del Aviso de Operación del MICI.",
    "Copia del Permiso de Operación Sanitaria y/o Certificación de Planta, según corresponda.",
    "Dos (2) etiquetas originales o arte idéntico al original.",
    "Ficha técnica del producto con ingredientes o fórmula cualicuantitativa.",
    "Método de elaboración detallado con tiempos y temperaturas.",
    "Especificación del tipo y material de empaque.",
    "Vida útil del producto acompañada de estudios de estabilidad y análisis correspondientes.",
    "Interpretación del código de lote conforme al etiquetado.",
    "Firma de profesional idóneo en Ciencias de los Alimentos.",
  ],
  costs: [
    "Revisión documental del producto",
    "Evaluación regulatoria inicial",
    "Organización de requisitos técnicos",
    "Preparación de expediente sanitario",
    "Gestión ante el Ministerio de Salud",
    "Seguimiento del trámite",
  ],
  benefits: [
    "Cumplimiento regulatorio para comercialización en Panamá.",
    "Evita errores documentales y retrasos administrativos.",
    "Acompañamiento técnico y legal durante el proceso.",
    "Revisión de etiquetado conforme normas nacionales y CODEX.",
    "Orientación sobre requisitos específicos según el producto.",
  ],
  extraServices: [
    "Alimentos",
    "Cosméticos",
    "Medicamentos",
    "Productos de limpieza",
    "Agua envasada",
    "Productos cárnicos",
    "Huevos y productos pesqueros",
    "Certificados de libre venta para exportación",
    "Asesoría sobre normas CODEX Alimentarius",
  ],
},
];

const values = [
  {
    icon: CheckCircle2,
    title: "Claridad legal",
    description:
      "Explicamos cada paso con lenguaje claro para que puedas tomar decisiones informadas.",
  },
  {
    icon: Clock3,
    title: "Gestión oportuna",
    description:
      "Damos seguimiento ordenado a cada caso, trámite o proceso en curso.",
  },
  {
    icon: Handshake,
    title: "Trato cercano",
    description:
      "Construimos relaciones profesionales basadas en confianza, discreción y comunicación directa.",
  },
];

const processSteps = [
  {
    title: "Consulta inicial",
    description:
      "Escuchamos tu situación, identificamos necesidades y revisamos los puntos principales del caso.",
  },
  {
    title: "Evaluación legal",
    description:
      "Analizamos documentos, riesgos, alternativas y el camino jurídico más conveniente.",
  },
  {
    title: "Plan de acción",
    description:
      "Definimos una estrategia clara, con pasos concretos y prioridades de gestión.",
  },
  {
    title: "Seguimiento",
    description:
      "Acompañamos el avance del proceso, trámite o negociación hasta alcanzar una solución.",
  },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-[#1B2A5B] text-white"
        : "text-slate-600 hover:bg-[#1B2A5B]/5 hover:text-[#1B2A5B]"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-base font-semibold transition ${
      isActive
        ? "bg-[#1B2A5B] text-white"
        : "text-slate-700 hover:bg-[#1B2A5B]/5 hover:text-[#1B2A5B]"
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <img
            src={LOGO_SRC}
            alt="Orozco Pérez y Asociados"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass}>Inicio</NavLink>
          <NavLink to="/quienes-somos" className={navClass}>Quiénes somos</NavLink>
          <NavLink to="/servicios" className={navClass}>Servicios</NavLink>
          <NavLink to="/contacto" className={navClass}>Contacto</NavLink>
        </div>

        <Link
          to="/contacto"
          className="hidden rounded-full bg-[#1B2A5B] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-[#6F7787] md:inline-flex"
        >
          Consulta legal
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#1B2A5B] md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-slate-200 bg-white px-6 pb-6 pt-3 shadow-xl shadow-slate-200/60 md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              <NavLink onClick={closeMenu} to="/" className={mobileNavClass}>Inicio</NavLink>
              <NavLink onClick={closeMenu} to="/quienes-somos" className={mobileNavClass}>Quiénes somos</NavLink>
              <NavLink onClick={closeMenu} to="/servicios" className={mobileNavClass}>Servicios</NavLink>
              <NavLink onClick={closeMenu} to="/contacto" className={mobileNavClass}>Contacto</NavLink>
              <Link
                onClick={closeMenu}
                to="/contacto"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-[#1B2A5B] px-5 py-3 font-semibold text-white transition hover:bg-[#6F7787]"
              >
                Consulta legal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#101C47] px-6 py-14 text-slate-300 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:p-10">
        <div>
          <div className="rounded-3xl bg-white p-4 shadow-xl shadow-black/10">
            <img
              src={LOGO_SRC}
              alt="Orozco Pérez y Asociados"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="mt-6 max-w-md leading-7 text-slate-300">
            Firma de abogados legalmente constituida bajo las leyes de la República de Panamá.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Navegación</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <Link to="/quienes-somos" className="hover:text-white">Quiénes somos</Link>
            <Link to="/servicios" className="hover:text-white">Servicios</Link>
            <Link to="/contacto" className="hover:text-white">Contacto</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Contacto</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <p>info@orpanama.com</p>
            <p>(507) 270-3612</p>
            <p>(507) 270-3613</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col justify-between gap-4 px-2 text-xs text-slate-400 md:flex-row">
        <p>© 2026 Orozco Pérez y Asociados (ORPA). Todos los derechos reservados.</p>
        <p>Terms and Conditions · Privacy Policy</p>
      </div>
    </footer>
  );
}

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FB] to-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#1B2A5B]/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="inline-flex rounded-full bg-[#1B2A5B]/5 px-5 py-2 text-sm font-semibold text-[#1B2A5B]">
          {eyebrow}
        </p>
        <h1 className="mt-7 text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}

function Hero() {
  const legalFlow = [
    ["✨", "Consulta legal"],
    ["📑", "Evaluación del caso"],
    ["📌", "Gestión documental"],
    ["🤝", "Seguimiento cercano"],
  ];

  const highlights = [
    ["🏢", "Derecho Corporativo"],
    ["🏠", "Inmobiliario"],
    ["⚖️", "Cobros Legales"],
    ["📋", "Trámites"],
    ["🧾", "Registros Sanitarios"],
  ];

  return (
    <section className="relative overflow-hidden bg-[#F5F7FB] px-6 py-24 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#1B2A5B]/10 blur-3xl" />
      <div className="absolute left-[-180px] bottom-[-220px] h-[420px] w-[420px] rounded-full bg-[#8A94A6]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="inline-flex rounded-full border border-[#1B2A5B]/10 bg-white px-5 py-2 text-sm font-semibold text-[#1B2A5B] shadow-sm">
              Firma legal en Panamá
            </span>

            <h1 className="mt-7 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl lg:text-8xl">
              Asesoría legal con respaldo.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600 md:text-xl">
              Acompañamos a empresas y personas en asuntos corporativos, inmobiliarios, cobros y trámites legales con atención cercana, gestión expedita y seguimiento claro.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2A5B] px-7 py-4 font-semibold text-white shadow-xl shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-[#101C47]"
              >
                Solicitar consulta <ArrowRight size={18} />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-[#8A94A6]/30 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1B2A5B] hover:text-[#1B2A5B]"
              >
                Ver servicios
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map(([emoji, item]) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1B2A5B]/10 bg-white px-4 py-2 text-sm font-semibold text-[#1B2A5B] shadow-sm"
                >
                  <span className="mr-2">{emoji}</span>{item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#1B2A5B]/10 blur-3xl" />
          <div className="relative rounded-[2.6rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8A94A6]">
                Explora servicios
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {["Corporativo", "Inmobiliario", "Trámites"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-[#F5F7FB] px-5 py-3 text-sm font-bold text-[#1B2A5B] shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-[#1B2A5B]">
                ¿Cómo trabajamos?
              </h3>

              <div className="mt-4 grid gap-3">
                {[
                  ["01", "🤝", "Consulta inicial", "Nos cuentas tu caso."],
                  ["02", "📑", "Evaluamos tu caso", "Analizamos y revisamos."],
                  ["03", "⚖️", "Definimos la estrategia", "Te guiamos con claridad."],
                  ["04", "✅", "Gestionamos y damos seguimiento", "Te mantenemos informado."],
                ].map(([number, emoji, title, text]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-[1.4rem] border border-slate-200 bg-[#F5F7FB] px-4 py-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      {emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#1B2A5B]">{title}</p>
                      <p className="text-xs leading-5 text-slate-500">{text}</p>
                    </div>
                    <span className="text-xs font-bold text-[#8A94A6]">{number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 text-center md:grid-cols-3">
        {[
          ["6+", "Áreas de práctica legal"],
          ["507", "Atención en Panamá"],
          ["360°", "Acompañamiento integral"],
        ].map(([number, label]) => (
          <div key={label} className="rounded-[2rem] border border-[#8A94A6]/20 bg-slate-50 p-7">
            <p className="text-4xl font-bold text-slate-950">{number}</p>
            <p className="mt-2 text-sm text-[#8A94A6]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValueCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {values.map((value) => {
        const Icon = value.icon;
        return (
          <article
            key={value.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#8A94A6]/10 text-slate-950">
              <Icon size={24} />
            </div>
            <h3 className="mt-6 text-lg font-bold text-slate-950">{value.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{value.description}</p>
          </article>
        );
      })}
    </div>
  );
}

function ServiceGrid({ dark = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <article
            key={service.title}
            className={
              dark
                ? "group rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]"
                : "group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
            }
          >
            <div
              className={
                dark
                  ? "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8A94A6] text-white"
                  : "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8A94A6]/10 text-slate-950"
              }
            >
              <Icon size={27} />
            </div>
            <h3 className={dark ? "mt-7 text-xl font-bold text-white" : "mt-7 text-xl font-bold text-slate-950"}>
              {service.title}
            </h3>
            <p className={dark ? "mt-4 leading-7 text-slate-300" : "mt-4 leading-7 text-slate-600"}>
              {service.short || service.description}
            </p>
            <Link
              to={`/servicios/${service.slug}`}
              className={
                dark
                  ? "mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#8A94A6]"
                  : "mt-6 inline-flex items-center gap-2 rounded-full bg-[#1B2A5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6F7787] hover:text-white"
              }
            >
              Ver servicio <ArrowRight size={16} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function AboutPreview() {
  return (
    <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Quiénes somos</p>
          <h2 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">
            Una firma legal con enfoque moderno y trato cercano.
          </h2>
          <p className="mt-7 text-lg leading-9 text-slate-600">
            Orozco Pérez y Asociados está conformada por abogados con experiencia legal, orientados a ofrecer soluciones honestas, eficaces y personalizadas.
          </p>
          <Link
            to="/quienes-somos"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1B2A5B] px-6 py-3 font-semibold text-white transition hover:bg-[#6F7787] hover:text-white"
          >
            Conocer más <ArrowRight size={18} />
          </Link>
        </div>
        <ValueCards />
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="bg-white px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Servicios legales</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Soluciones legales diseñadas para cada necesidad.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Acompañamos a nuestros clientes en áreas clave para organizar, proteger y gestionar sus asuntos legales con claridad y respaldo profesional.
            </p>
            <Link
              to="/servicios"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1B2A5B] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#101C47]"
            >
              Ver todos los servicios <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#1B2A5B]/10 blur-3xl" />
            <div className="relative rounded-[2.75rem] border border-slate-200 bg-[#F5F7FB] p-5 shadow-2xl shadow-slate-200/80">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-[2.25rem] bg-[#101C47] p-8 text-white shadow-xl shadow-slate-300/40 sm:row-span-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1B2A5B]">
                    <Scale size={28} />
                  </div>
                  <h3 className="mt-8 text-3xl font-bold tracking-tight">Áreas de práctica</h3>
                  <p className="mt-4 leading-8 text-slate-300">
                    Un portafolio legal integral para empresas, propietarios, emprendedores y clientes particulares.
                  </p>
                </div>

                {[
                  [Building2, "🏢", "Empresas"],
                  [Home, "🏠", "Patrimonio"],
                  [Landmark, "⚖️", "Cartera"],
                  [FileCheck2, "📋", "Trámites"],
                ].map(([Icon, emoji, label]) => (
                  <div key={label} className="rounded-[2rem] border border-white bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B2A5B]/5 text-[#1B2A5B]">
                      <Icon size={24} />
                    </div>
                    <p className="mt-5 text-xl font-bold text-slate-950"><span className="mr-2">{emoji}</span>{label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Asesoría clara, ordenada y profesional.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#101C47] px-6 py-28 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#AAB2C1]">Proceso</p>
          <h2 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">
            Un camino claro desde la consulta hasta la solución.
          </h2>
          <p className="mt-7 text-lg leading-9 text-slate-300">
            Diseñamos un proceso simple para que cada cliente sepa qué esperar desde el primer contacto.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {processSteps.map((step, index) => {
            const emojis = ["🧭", "🔎", "📝", "✅"];
            return (
              <article key={step.title} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-bold text-slate-950">
                  {emojis[index] || String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-[#101C47] p-10 text-white shadow-2xl shadow-slate-300/70 md:flex-row md:items-center lg:p-14">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#AAB2C1]">✨ Consulta inicial</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            ¿Necesitas orientación legal para tu empresa o caso particular?
          </h2>
        </div>
        <Link
          to="/contacto"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-slate-950 transition hover:bg-[#1B2A5B]/5"
        >
          Contactar ahora <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <SEO
          title="ORPA Panamá | Firma de Abogados en Panamá"
          description="Orozco Pérez y Asociados (ORPA). Firma legal en Panamá especializada en derecho corporativo, inmobiliario, cobros legales, migración, trámites legales y registros sanitarios."
          path="/"
        />
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProcessSection />
      <CTASection />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SEO
        title="Quiénes Somos | ORPA Panamá"
        description="Conoce a Orozco Pérez y Asociados (ORPA), firma legal en Panamá con experiencia en derecho corporativo, inmobiliario, migración, cobranzas y registros sanitarios."
        path="/quienes-somos"
      />
      <PageHero
        eyebrow="Quiénes somos"
        title="Experiencia legal con claridad, cercanía y visión estratégica."
        description="Orozco Pérez y Asociados (ORPA) es una firma forense conformada por un equipo de abogados con vasta experiencia legal, comprometidos en ofrecer un servicio honesto, eficaz, expedito y personalizado."
      />

      <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2.5rem] bg-[#101C47] p-10 text-white shadow-2xl shadow-slate-300/60 md:p-14">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#8A94A6] text-white">
              <Scale size={32} />
            </div>
            <h2 className="mt-9 text-4xl font-bold tracking-tight md:text-5xl">
              Orozco Pérez y Asociados
            </h2>
            <p className="mt-6 leading-8 text-slate-300">
              ORPA es una firma forense conformada por un equipo de abogados con vasta experiencia legal.
            </p>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-600">
            <p>
              Nos especializamos en Derecho Corporativo, Propiedad Horizontal, Registros Sanitarios, Registros de Marca, Migración y Cobranzas extrajudiciales y judiciales.
            </p>
            <p>
              Estamos comprometidos en ofrecer un servicio honesto, de calidad, eficaz, expedito y personalizado para la solución de los problemas legales de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Nuestro compromiso</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Respaldo legal desde el inicio hasta el final.</h2>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-lg leading-9 text-slate-600 shadow-xl shadow-slate-200/70">
            Brindar a nuestros clientes la tranquilidad de contar con el respaldo legal adecuado, otorgado por profesionales del derecho que los llevan de la mano desde el inicio hasta el final de cualquier gestión legal requerida.
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Nuestra firma</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Estructura legal, patrimonio y trámites en Panamá.</h2>
            <p className="mt-7 text-lg leading-9 text-slate-600">
              Nuestra firma ayuda a crear, administrar y mantener la estructura legal en Panamá: desde la condición migratoria, la organización legal del negocio, la protección de marcas y productos, hasta el resguardo del patrimonio.
            </p>
            <p className="mt-5 text-lg leading-9 text-slate-600">
              Procuramos mantener al cliente informado de manera clara y sencilla sobre el modo de proceder según cada situación y el avance de cada proceso iniciado por nosotros.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Condición migratoria",
              "Organización legal del negocio",
              "Protección de marca y productos",
              "Resguardo del patrimonio",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[#8A94A6]/20 bg-slate-50 p-5 font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Valores</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Lo que guía nuestra práctica.</h2>
          </div>
          <ValueCards />
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Nuestro enfoque</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Asesoría práctica y comunicación clara.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [FileText, "Documentación ordenada", "Revisión y gestión clara de documentos y requisitos."],
              [Users, "Acompañamiento cercano", "Comunicación directa durante cada etapa del proceso."],
              [BriefcaseBusiness, "Visión empresarial", "Soluciones pensadas para proteger operaciones y activos."],
            ].map(([Icon, title, description]) => (
              <article key={title} className="rounded-[2rem] border border-[#8A94A6]/20 bg-slate-50 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8A94A6] text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <SEO
        title="Servicios Legales | ORPA Panamá"
        description="Servicios legales en Panamá: derecho corporativo, inmobiliario, cobros legales, trámites legales, migración y registros sanitarios."
        path="/servicios"
      />
      <PageHero
        eyebrow="Servicios"
        title="Asesoría legal integral para empresas y particulares."
        description="Acompañamos a nuestros clientes en áreas clave para proteger sus operaciones, gestionar trámites y resolver necesidades legales de forma ordenada."
      />

      <section className="bg-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ServiceGrid />
        </div>
      </section>

      <section className="bg-[#101C47] px-6 py-28 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#AAB2C1]">Cobros legales</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Recuperación de cartera morosa.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Ayudamos al saneamiento y reorganización de cartera morosa, evitando pérdidas y fortaleciendo la gestión de cuentas pendientes.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Gestión de cuentas vencidas",
              "Negociación y seguimiento de pago",
              "Saneamiento de cartera morosa",
              "Acompañamiento en procesos legales",
            ].map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                <CheckCircle2 className="shrink-0 text-white" />
                <p className="font-semibold text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceDetailPage({ service }) {
  const Icon = service.icon;

  return (
    <>
      <SEO
        title={`${service.title} | ORPA Panamá`}
        description={service.short || service.description}
        path={`/servicios/${service.slug}`}
      />
      <PageHero
        eyebrow="Servicio legal"
        title={service.title}
        description={service.description}
      />

      <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[2.5rem] bg-[#101C47] p-10 text-white shadow-2xl shadow-slate-300/60 md:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#8A94A6] text-white">
              <Icon size={32} />
            </div>
            <h2 className="mt-8 text-4xl font-bold tracking-tight">{service.title}</h2>
            <p className="mt-5 leading-8 text-slate-300">{service.description}</p>
            <Link
              to="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#8A94A6]"
            >
              Solicitar asesoría <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Qué incluye</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Acompañamiento enfocado en tus necesidades.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {service.includes.map((item) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-[#8A94A6]/20 bg-slate-50 p-6 shadow-sm">
                  <CheckCircle2 className="shrink-0 text-[#8A94A6]" />
                  <p className="font-semibold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {service.sections && (
        <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Detalle del servicio</p>
              <h2 className="mt-5 text-5xl font-bold tracking-tight">Cómo podemos ayudarte.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {service.sections.map((section) => (
                <article key={section.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-950">{section.title}</h3>
                  <p className="mt-4 leading-8 text-slate-600">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.requirements && (
        <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Requisitos</p>
              <h2 className="mt-5 text-5xl font-bold tracking-tight">Información necesaria para iniciar.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Para constituir una sociedad anónima, es recomendable contar con la siguiente información base.
              </p>
            </div>
            <div className="grid gap-4">
              {service.requirements.map((item, index) => (
                <div key={item} className="rounded-2xl border border-[#8A94A6]/20 bg-slate-50 p-5">
                  <p className="text-sm font-bold text-[#8A94A6]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.costs && (
        <section className="bg-[#101C47] px-6 py-28 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Constitución de sociedad</p>
              <h2 className="mt-5 text-5xl font-bold tracking-tight">El servicio puede incluir.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                La creación de una sociedad anónima contempla documentos, registros y gestiones necesarias para su constitución.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {service.costs.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                  <CheckCircle2 className="text-[#8A94A6]" />
                  <p className="mt-4 font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.benefits && (
        <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Ventajas</p>
              <h2 className="mt-5 text-5xl font-bold tracking-tight">Beneficios de una sociedad anónima en Panamá.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((item) => (
                <div key={item} className="rounded-[2rem] border border-[#8A94A6]/20 bg-slate-50 p-7 shadow-sm">
                  <p className="leading-8 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.extraServices && (
        <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Servicios adicionales</p>
              <h2 className="mt-5 text-5xl font-bold tracking-tight">Gestiones corporativas complementarias.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {service.extraServices.map((item) => (
                <div key={item} className="rounded-2xl bg-white p-5 font-semibold text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-6 py-28 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Proceso</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight">Una gestión clara y ordenada.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-[2rem] bg-slate-50 p-7 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto | ORPA Panamá"
        description="Contáctanos para recibir orientación legal en Panamá. ORPA ofrece asesoría corporativa, inmobiliaria, migratoria, cobros legales y trámites."
        path="/contacto"
      />
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre tu consulta legal."
        description="Puedes escribirnos para recibir orientación sobre servicios corporativos, inmobiliarios, migratorios, trámites legales o cobros legales."
      />

      <ContactSection />
    </>
  );
}

function ContactSection() {
  return (
    <section className="bg-slate-50 px-6 py-28 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">Contacto</p>
            <h2 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">
              Escríbenos tus consultas.
            </h2>
            <p className="mt-7 text-lg leading-9 text-slate-600">
              Estamos para atenderte y ayudarte con tus dudas y necesidades legales.
            </p>

            <div className="mt-10 space-y-5 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-[#8A94A6]" />
                <p className="text-slate-700">
                  PH Office One, Piso 8, Oficina 802, Obarrio, Bella Vista, Ciudad de Panamá, República de Panamá.
                </p>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-[#8A94A6]" />
                <a href="mailto:info@orpanama.com" className="text-slate-700 hover:text-[#8A94A6]">
                  info@orpanama.com
                </a>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-[#8A94A6]" />
                <p className="text-slate-700">(507) 270-3612 / 270-3613</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-[#8A94A6]/20 bg-white shadow-2xl shadow-slate-200/80">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-950">📍 Oficina principal</p>
                <p className="mt-1 text-sm text-slate-500">Obarrio, Ciudad de Panamá</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=PH+Office+One+Obarrio+Panama"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#1B2A5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6F7787] hover:text-white"
              >
                Cómo llegar
              </a>
            </div>
            <iframe
              title="Mapa ORPA - PH Office One Obarrio"
              src="https://www.google.com/maps?q=PH+Office+One,+Obarrio,+Panama&output=embed"
              width="100%"
              height="430"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="rounded-[2rem] bg-[#101C47] p-8 text-white shadow-2xl shadow-slate-300/60">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A94A6]">📝 Formulario</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">Solicita orientación legal.</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Completa tus datos y cuéntanos brevemente cómo podemos ayudarte. Te contactaremos para evaluar tu consulta.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    subject: "",
    message: "",
    website: "",
  });

  const [turnstileToken, setTurnstileToken] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      service: "",
      subject: "",
      message: "",
      website: "",
    });
    setTurnstileToken("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      setFeedback("Falta configurar VITE_FORMSPREE_ENDPOINT.");
      return;
    }

    if (form.website) {
      setStatus("success");
      setFeedback("Mensaje enviado correctamente.");
      return;
    }

    if (Date.now() - startedAt < 4000) {
      setStatus("error");
      setFeedback("Por favor espera unos segundos antes de enviar el formulario.");
      return;
    }

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("error");
      setFeedback("Completa los campos obligatorios antes de enviar.");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setFeedback("Completa la verificación anti-spam.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setFeedback("Mensaje enviado correctamente. Te contactaremos pronto.");
      resetForm();
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Ocurrió un error al enviar el mensaje.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/80 md:p-10"
    >
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-[#8A94A6]/20 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#1B2A5B] focus:bg-white"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="mt-2 w-full rounded-2xl border border-[#8A94A6]/20 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#1B2A5B] focus:bg-white"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">Servicio de interés</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="mt-2 w-full rounded-2xl border border-[#8A94A6]/20 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#1B2A5B] focus:bg-white"
        >
          <option value="">Selecciona una opción</option>
          <option>Derecho Corporativo</option>
          <option>Derecho Inmobiliario</option>
          <option>Propiedad Industrial</option>
          <option>Cobros Legales</option>
          <option>Permisos Migratorios y Laborales</option>
          <option>Gestión de Trámites Legales</option>
          <option>Registros Sanitarios</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">Asunto</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="mt-2 w-full rounded-2xl border border-[#8A94A6]/20 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#1B2A5B] focus:bg-white"
          placeholder="Motivo de la consulta"
          required
        />
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">Mensaje</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          className="mt-2 w-full rounded-2xl border border-[#8A94A6]/20 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#1B2A5B] focus:bg-white"
          placeholder="Cuéntanos cómo podemos ayudarte"
          required
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#8A94A6]/20 bg-slate-50 p-3">
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            options={{ theme: "light" }}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Falta configurar VITE_TURNSTILE_SITE_KEY.
        </div>
      )}

      {feedback && (
        <div
          className={`mt-5 rounded-2xl p-4 text-sm font-semibold ${
            status === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {feedback}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1B2A5B] px-7 py-4 font-bold text-white transition hover:bg-[#6F7787] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje 🚀"} <ArrowRight size={18} />
      </button>
    </form>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          {services.map((service) => (
            <Route
              key={service.slug}
              path={`/servicios/${service.slug}`}
              element={<ServiceDetailPage service={service} />}
            />
          ))}
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

function AppLayout() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

