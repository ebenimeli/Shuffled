// Get the text content of the paragraph
//let words = ["misa", "sacerdote", "hostia", "cáliz", "altar", "evangelio", "lectio divina", "confesión", "eucaristía", "comunión", "santísimo", "monaguillo", "vela", "paz", "amén", "colecta", "ofertorio", "predicación", "homilía", "catequesis", "renovación", "penitencia", "sagrario", "vigilia", "misericordia"];
//let palabras = ['elecciones', 'presidente', 'gobierno', 'partidos', 'leyes', 'política exterior', 'votantes', 'campaña', 'oposición', 'democracia', 'dictadura', 'constitución', 'derechos humanos', 'poder', 'congreso', 'senado', 'corrupción', 'justicia', 'impuestos', 'economía', 'derecha', 'izquierda', 'centro', 'ciudadanos', 'políticas públicas', 'politólogo', 'análisis político', 'protesta', 'reforma', 'libertad de expresión', 'periodismo', 'medios de comunicación', 'censura', 'propaganda', 'participación ciudadana', 'movimientos sociales', 'activismo político', 'discurso político', 'diplomacia', 'paz', 'guerra', 'terrorismo', 'inmigración', 'derechos de los migrantes', 'nacionalismo', 'globalización', 'derecho internacional', 'acuerdos internacionales', 'cooperación internacional', 'ONU', 'Unión Europea'];
//let palabras = ['pañales', 'biberón', 'chupete', 'cuna', 'andador', 'juguetes', 'ropa', 'lactancia', 'cambio', 'sonrisa', 'llanto', 'dientes', 'gatear', 'baño', 'toallitas', 'crema', 'cuidados', 'accesorios', 'cochecito', 'móvil', 'silla alta', 'nutrición', 'sueño', 'luz de noche', 'monitor', 'sacaleches', 'carrito', 'portabebés', 'manta', 'peluche', 'dormir', 'barreras', 'parque', 'masaje', 'pediatra', 'primeros pasos', 'desarrollo', 'estimulación', 'crecimiento', 'lenguaje', 'comida', 'alimentación', 'salud', 'seguridad', 'higiene', 'cólicos', 'cuidado dental', 'vacunas'];

// Array de palabras en español
/*
let wordsES = [
    'hola', 'adiós', 'buenos días', 'buenas tardes', 'buenas noches',
    'sí', 'no', 'gracias', 'por favor', 'lo siento',
    'amor', 'amigo', 'familia', 'casa', 'comida',
    'bebida', 'ropa', 'coche', 'bicicleta', 'avión',
    'tren', 'barco', 'escuela', 'universidad', 'clase',
    'libro', 'papel', 'pluma', 'teléfono', 'ordenador',
    'televisión', 'música', 'película', 'teatro', 'arte',
    'naturaleza', 'playa', 'montaña', 'ciudad', 'país',
    'idioma', 'tiempo', 'dinero', 'trabajo', 'vida',
    'muerte', 'felicidad', 'tristeza', 'esperanza', 'sueño'
  ];
  
  // Array de palabras en alemán
  let words = [
    'hallo', 'tschüss', 'guten Morgen', 'guten Tag', 'gute Nacht',
    'ja', 'nein', 'danke', 'bitte', 'es tut mir leid',
    'Liebe', 'Freund', 'Familie', 'Haus', 'Essen',
    'Getränk', 'Kleidung', 'Auto', 'Fahrrad', 'Flugzeug',
    'Zug', 'Schiff', 'Schule', 'Universität', 'Klasse',
    'Buch', 'Papier', 'Stift', 'Telefon', 'Computer',
    'Fernseher', 'Musik', 'Film', 'Theater', 'Kunst',
    'Natur', 'Strand', 'Berg', 'Stadt', 'Land',
    'Sprache', 'Zeit', 'Geld', 'Arbeit', 'Leben',
    'Tod', 'Glück', 'Traurigkeit', 'Hoffnung', 'Traum'
  ];
  */

// Array de palabras en español
let wordsES = [
    'empresa', 'negocio', 'comercio', 'industria', 'producción',
    'trabajo', 'empleo', 'trabajador', 'empleador', 'equipo',
    'liderazgo', 'gerencia', 'gestión', 'planificación', 'organización',
    'finanzas', 'contabilidad', 'impuestos', 'facturación', 'beneficio',
    'marketing', 'publicidad', 'promoción', 'marca', 'imagen',
    'cliente', 'consumidor', 'proveedor', 'distribuidor', 'suministro',
    'competencia', 'diferenciación', 'innovación', 'creatividad', 'investigación',
    'estrategia', 'objetivos', 'metas', 'misión', 'visión',
    'producción', 'calidad', 'proceso', 'mejora', 'eficiencia',
    'comunicación', 'negociación', 'acuerdo', 'contrato', 'alianza',
    'reclutamiento', 'selección', 'contratación', 'capacitación', 'desarrollo',
    'satisfacción', 'motivación', 'compensación', 'beneficios', 'retención'
];

// Array de palabras en inglés
let words = [
    'company', 'business', 'commerce', 'industry', 'production',
    'work', 'employment', 'employee', 'employer', 'team',
    'leadership', 'management', 'administration', 'planning', 'organization',
    'finance', 'accounting', 'taxes', 'billing', 'profit',
    'marketing', 'advertising', 'promotion', 'brand', 'image',
    'customer', 'consumer', 'supplier', 'distributor', 'supply',
    'competition', 'differentiation', 'innovation', 'creativity', 'research',
    'strategy', 'objectives', 'goals', 'mission', 'vision',
    'production', 'quality', 'process', 'improvement', 'efficiency',
    'communication', 'negotiation', 'agreement', 'contract', 'alliance',
    'recruitment', 'selection', 'hiring', 'training', 'development',
    'satisfaction', 'motivation', 'compensation', 'benefits', 'retention'
];


/*
let palabras = [
    'fútbol',
    'baloncesto',
    'tenis',
    'natación',
    'boxeo',
    'atletismo',
    'ciclismo',
    'vóley playa',
    'golf',
    'esquí',
    'snowboard',
    'skateboarding',
    'surfing',
    'halterofilia',
    'rugby',
    'béisbol',
    'softbol',
    'waterpolo',
    'piragüismo',
    'remo',
    'taekwondo',
    'karate',
    'judo',
    'lucha libre',
    'escalada',
    'senderismo',
    'camping',
    'pesca',
    'caza',
    'tiro con arco',
    'motocross',
    'automovilismo',
    'karting',
    'vela',
    'windsurf',
    'kitesurf',
    'parapente',
    'alpinismo',
    'barranquismo',
    'parkour',
    'slackline',
    'crossfit',
    'yoga',
    'pilates',
    'esgrima',
    'squash',
    'bádminton',
    'ping pong'
];
*/
