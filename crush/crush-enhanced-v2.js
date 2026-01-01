// 💖 ENHANCED CRUSH FUNCTIONALITY
// This script extends the existing crush message generator with new features

console.log('🚀 Loading Crush Enhanced...');

// Initialize enhanced functionality regardless of base variables
let enhancedInitialized = false;

function initializeEnhanced() {
  if (enhancedInitialized) return;
  enhancedInitialized = true;
  
  console.log('✅ Initializing enhanced features...');
  
  // Add new enhanced message types to existing messages structure
  const enhancedMessages = {
    en: {
      // Original types from the base system
      nervous: [
        "Every time I see you, my heart skips a beat.",
        "You have the most beautiful smile I've ever seen.",
        "I get butterflies just thinking about you.",
        "You light up my day just by being you.",
        "I can't help but smile when I see your name pop up.",
        "You make my ordinary days feel special.",
        "If happiness had a face, it would look like you.",
        "I wish you could see yourself through my eyes.",
        "You always seem to make the day a little brighter.",
        "Funny how I always end up smiling when you're around.",
        "Some people just have a good vibe, you know?",
        "It's nice how things feel lighter when you're here.",
        "If I could bottle the feeling I get when I see you, I'd never run out of happiness.",
        "You make my heart do a happy dance every time you walk by.",
        "You're the reason I check my phone with a smile."
      ],
      noconfidence: [
        "I wish I had the confidence to talk to you.",
        "Sometimes I feel like I'm not good enough for you.",
        "I get so nervous around you, it's embarrassing.",
        "I admire you from afar, too shy to say hi.",
        "I wish I could express how I feel without stumbling over my words.",
        "Sometimes I wonder if I'll ever have the courage to talk to you properly.",
        "I feel invisible when you're around, but in a good way.",
        "I wish I could be as confident as you seem to be."
      ],
      late: [
        "Sorry I was late, I was daydreaming about you!",
        "I wanted to look extra nice for you.",
        "I couldn't stop thinking about our last conversation.",
        "I was picking the perfect song to listen to before seeing you.",
        "I was practicing how to say hi to you!",
        "I lost track of time thinking about your smile.",
        "I wanted to make sure I brought my best self for you.",
        "I got lost in thoughts of you and forgot the time.",
        "I was rehearsing the perfect hello for you.",
        "I guess time flies when you're looking forward to something.",
        "Maybe I just wanted a few extra minutes to enjoy the anticipation."
      ],
      cancel: [
        "I had to cancel, but I hope we can see each other soon!",
        "Plans changed, but you were on my mind the whole time.",
        "Can we reschedule? I really want to spend time with you!",
        "Sorry, something came up, but I owe you a big smile!",
        "I missed you even more because I couldn't make it.",
        "Not seeing you today just made me realize how much I like you.",
        "I hope your day is as sweet as you are, even if we couldn't meet.",
        "Missing you is my new hobby since we couldn't meet.",
        "Raincheck? I promise to make it up to you with extra smiles.",
        "Maybe next time will be even better.",
        "Sometimes the best plans are the ones that get postponed."
      ],
      text: [
        "Sorry for not texting back, I was thinking of the perfect thing to say to you!",
        "I kept re-reading your message and smiling.",
        "I wanted to reply with something special, so I took my time.",
        "I was just imagining us together.",
        "I was waiting for the perfect moment to text you!",
        "I hope my reply makes you smile as much as yours made me.",
        "Sometimes I get lost in my thoughts about you and forget to text.",
        "I wanted my reply to be as sweet as you are.",
        "I was busy thinking of you, not ignoring you!",
        "I'm not the fastest texter, but I do enjoy our chats.",
        "I like taking my time to answer nice messages."
      ],
      creative: [
        "If I had a flower for every time I thought of you, I'd have a garden.",
        "If kisses were stars, I'd give you the sky.",
        "You must be a magician, because whenever I look at you, everyone else disappears.",
        "If I could rearrange the alphabet, I'd put U and I together.",
        "You make ordinary moments feel extraordinary.",
        "If I could write you a song, it would be the happiest melody.",
        "If I could send you a cloud, it would be the fluffiest one just for you.",
        "If I could paint a picture of happiness, it would look just like you.",
        "If I could send you a star, I'd pick the brightest one—just like you.",
        "If I could send a little good energy your way, I'd do it every day.",
        "If I could share a sunset, I'd pick the prettiest one for you."
      ],
      random: [
        "Just wanted to remind you how amazing you are!",
        "You make my world a little brighter every day.",
        "I hope your day is as lovely as your smile.",
        "If you ever need a reason to smile, just think of me thinking of you.",
        "You are the best part of my day!",
        "You make even Mondays feel like Fridays.",
        "If you ever doubt yourself, remember someone out there is thinking of you (me!).",
        "You're the reason I look forward to every day.",
        "If you ever need a pick-me-up, just text me!",
        "Hope your day has a little extra sparkle.",
        "Wishing you a day as good as your favorite song.",
        "Some days just feel better, don't they?"
      ],
      // New enhanced types
      first_message: [
        "Hi! I've been wanting to talk to you for a while.",
        "Hey, I hope you don't mind me reaching out.",
        "I know this might be random, but I wanted to say hi.",
        "Hi! I've noticed you around and thought you seem really cool.",
        "Hey! I hope your day is going well.",
        "Hi there! I've been hoping to get a chance to talk to you.",
        "Hey! I love your energy, mind if we chat?",
        "I've been meaning to introduce myself properly.",
        "Hi! I couldn't help but notice how amazing you are.",
        "Hey there! I've been gathering courage to talk to you.",
        "I hope this doesn't come across as weird, but I think you're incredible.",
        "Hi! I've seen you around and you seem like someone I'd love to know.",
        "Hey! I was wondering if you'd like to chat sometime?",
        "I know we haven't talked much, but I'd love to change that.",
        "Hi! You caught my attention and I thought I'd say hello.",
        "Hey! I've been admiring you from afar and thought I'd finally say hi.",
        "I hope you don't think I'm being too forward, but I'd love to get to know you.",
        "Hi! I've been wanting to compliment you but never found the right moment.",
        "Hey! You seem like someone who'd have interesting conversations.",
        "I've been trying to find the perfect way to start a conversation with you."
      ],
      good_morning: [
        "Good morning! Hope your day starts as beautiful as your smile.",
        "Morning! Hope today brings you as much joy as you bring others.",
        "Good morning sunshine! Hope your coffee is strong and your day is amazing.",
        "Morning! Wishing you a day as lovely as you are.",
        "Good morning! May your day be filled with good vibes.",
        "Morning beautiful! Hope today exceeds all your expectations.",
        "Good morning! Hope your day is as bright as your personality.",
        "Rise and shine! Hope your morning is as sweet as you are.",
        "Good morning gorgeous! Ready to conquer the day?",
        "Morning! Hope you slept well and wake up feeling amazing.",
        "Good morning! The world is brighter with you in it.",
        "Morning sunshine! Hope your day is filled with little miracles.",
        "Good morning! Sending you positive vibes to start your day.",
        "Morning beautiful soul! Hope today brings you everything you deserve.",
        "Good morning! You're the first thing on my mind when I wake up.",
        "Morning! Hope your day is as wonderful as the thought of you.",
        "Good morning! May your coffee be strong and your day be magical.",
        "Morning! Hope you feel as amazing as you make others feel.",
        "Good morning! Starting my day thinking about your beautiful smile.",
        "Morning! Hope today treats you as special as you are.",
        "Good morning! You deserve all the happiness coming your way today.",
        "Morning sunshine! Hope your day sparkles as much as you do."
      ],
      good_night: [
        "Good night! Sweet dreams about all the amazing things you'll do tomorrow.",
        "Sleep well! Hope you dream of beautiful adventures.",
        "Good night! May your sleep be peaceful and your dreams be sweet.",
        "Night! Hope tomorrow brings you even more reasons to smile.",
        "Sweet dreams! Rest well, you deserve it.",
        "Good night! Hope you wake up feeling refreshed and happy.",
        "Sleep tight! Tomorrow is another chance for something wonderful.",
        "Good night beautiful! Dream of all the good things coming your way.",
        "Sweet dreams! Hope you sleep as peacefully as you make others feel.",
        "Good night! May your dreams be filled with happiness and joy.",
        "Sleep well angel! Tomorrow is another day to be amazing.",
        "Good night! Hope you have the most restful sleep.",
        "Sweet dreams! You've made today brighter just by being you.",
        "Good night! Hope your pillow is soft and your dreams are sweet.",
        "Sleep tight! Can't wait to see what tomorrow brings for you.",
        "Good night beautiful soul! Rest well, you've earned it.",
        "Sweet dreams! Hope you wake up feeling as amazing as you are.",
        "Good night! May the stars watch over you as you sleep.",
        "Sleep well! Hope your dreams are as lovely as your heart.",
        "Good night! End your day knowing how special you are.",
        "Sweet dreams! Hope tomorrow is even better than today.",
        "Good night! Rest well and recharge that beautiful energy of yours."
      ],
      flirty: [
        "I can't stop thinking about that smile of yours.",
        "You have this way of making my day instantly better.",
        "If you were a song, you'd be on repeat in my head.",
        "You must be magic because you've got me completely mesmerized.",
        "I think you broke my GPS because I keep getting lost in your eyes.",
        "Are you made of copper and tellurium? Because you're Cu-Te.",
        "If you were a star, you'd be the brightest one in my sky.",
        "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
        "If looks could kill, you'd definitely be a weapon of mass destruction.",
        "Are you a magician? Because every time I look at you, everyone else disappears.",
        "Do you believe in love at first sight, or should I walk by again?",
        "Is your name Google? Because you have everything I've been searching for.",
        "If you were a vegetable, you'd be a cute-cumber.",
        "Are you WiFi? Because I'm feeling a connection.",
        "Do you have a map? I keep getting lost in your eyes.",
        "If you were a fruit, you'd be a fine-apple.",
        "Are you a parking ticket? Because you've got 'fine' written all over you.",
        "Do you have a sunburn, or are you always this hot?",
        "If beauty were time, you'd be eternity.",
        "Are you a camera? Because every time I look at you, I smile.",
        "Do you have a quarter? I want to call my mom and tell her I met the one.",
        "If you were a triangle, you'd be acute one.",
        "Are you a bank loan? Because you have my interest.",
        "Do you work at Starbucks? Because I like you a latte.",
        "If you were a cat, you'd purr-fect.",
        "Are you my appendix? Because I have a gut feeling I should take you out."
      ],
      sweet: [
        "You deserve all the happiness in the world.",
        "You make the world a brighter place just by being in it.",
        "I'm grateful the universe brought someone like you into my life.",
        "You have the kindest heart I've ever encountered.",
        "Your presence feels like a warm hug on a cold day.",
        "You're the type of person who makes everyone around you better.",
        "Thank you for being the wonderful person you are.",
        "You have this beautiful way of seeing the good in everything.",
        "Your smile could light up the darkest room.",
        "You make ordinary moments feel magical.",
        "There's something so peaceful about being around you.",
        "You have the most genuine soul I've ever met.",
        "Your kindness is like sunshine on a cloudy day.",
        "You make me believe in the goodness of people.",
        "You have this amazing ability to make everyone feel special.",
        "Your heart is as beautiful as your smile.",
        "You bring out the best in everyone you meet.",
        "There's something so comforting about your presence.",
        "You have this way of making everything better.",
        "Your positive energy is absolutely contagious.",
        "You make me want to be a better person.",
        "You have the most beautiful soul.",
        "Your compassion for others is truly inspiring.",
        "You make the world feel like a safer, kinder place."
      ],
      funny: [
        "Are you WiFi? Because I'm feeling a connection.",
        "If you were a vegetable, you'd be a cute-cumber.",
        "Do you have a map? I keep getting lost in your awesomeness.",
        "Are you a parking ticket? Because you've got 'fine' written all over you.",
        "If you were a fruit, you'd be a fineapple.",
        "Are you Google? Because you have everything I've been searching for.",
        "Do you believe in love at first sight, or should I walk by again?",
        "If you were a burger at McDonald's, you'd be the McGorgeous.",
        "Are you my homework? Because I should be doing you right now.",
        "Do you have a Band-Aid? I hurt my knee when I fell for you.",
        "Are you a magician? Because whenever I look at you, everyone else disappears.",
        "If you were a vegetable, you'd be a cutecumber!",
        "Are you a bank loan? Because you have my interest.",
        "Do you work at Starbucks? Because I like you a latte.",
        "Are you a camera? Because every time I look at you, I smile.",
        "If you were a triangle, you'd be acute one.",
        "Are you my appendix? Because I have this gut feeling I should take you out.",
        "Do you have a sunburn, or are you always this hot?",
        "If you were a cat, you'd be purr-fect.",
        "Are you a time traveler? Because I see you in my future.",
        "Do you have 11 protons? Because you're sodium fine.",
        "Are you made of copper and tellurium? Because you're Cu-Te.",
        "If you were a vegetable, you'd be a radish... wait, that doesn't work.",
        "Are you a beaver? Because daaaaam.",
        "Do you like science? Because I've got my ion you.",
        "Are you a 45-degree angle? Because you're acute-y."
      ],
      deep: [
        "I love how you see the world differently than everyone else.",
        "There's something about the way you think that fascinates me.",
        "I admire how authentic you are in a world full of pretense.",
        "You have this wisdom that makes every conversation meaningful.",
        "I love how passionate you get when you talk about things you care about.",
        "You see beauty in places others might overlook.",
        "There's a depth to you that I find incredibly attractive.",
        "I appreciate how thoughtful you are about everything.",
        "You have this rare ability to make people feel truly understood.",
        "I love how you question things instead of just accepting them.",
        "Your perspective on life is both refreshing and inspiring.",
        "You make me think about things in ways I never have before.",
        "There's something so genuine about the way you express yourself.",
        "I admire how you stay true to your values.",
        "You have this beautiful way of finding meaning in small moments.",
        "I love how you're not afraid to be vulnerable.",
        "Your emotional intelligence is incredibly attractive.",
        "You make me want to understand the world better.",
        "I appreciate how you listen with your whole heart.",
        "You have this gift for making deep connections with people.",
        "I love how you're always growing and evolving.",
        "Your curiosity about life is absolutely captivating.",
        "You make me feel like I can be my most authentic self.",
        "I admire how you handle challenges with such grace and wisdom."
      ]
    },
    es: {
      // Tipos originales del sistema base
      nervous: [
        "Cada vez que te veo, mi corazón late más fuerte.",
        "Tienes la sonrisa más bonita que he visto.",
        "Me llenas de mariposas solo con pensarte.",
        "Iluminas mi día solo con ser tú.",
        "No puedo evitar sonreír cuando veo tu nombre.",
        "Tus ojos tienen algo que me hace olvidar el mundo.",
        "Ojalá pudieras verte como yo te veo.",
        "Si la felicidad tuviera rostro, sería el tuyo.",
        "Si pudiera guardar el sentimiento que me das al verte, nunca me faltaría alegría.",
        "Mi corazón baila de felicidad cada vez que pasas cerca.",
        "Eres la razón por la que miro el móvil sonriendo.",
        "Siempre es más fácil sonreír cuando estás cerca.",
        "Hay personas que tienen buena energía, ¿sabes?",
        "Me gusta cómo todo parece más bonito cuando llegas."
      ],
      noconfidence: [
        "Ojalá tuviera la confianza para hablarte.",
        "A veces siento que no soy lo suficientemente bueno para ti.",
        "Me pongo tan nervioso(a) cuando estás cerca, es vergonzoso.",
        "Te admiro desde lejos, demasiado tímido(a) para saludarte.",
        "Ojalá pudiera expresar lo que siento sin tartamudear.",
        "A veces me pregunto si alguna vez tendré el valor de hablarte, pero mira, lo estoy haciendo.",
        "A veces me siento invisible a tu alrededor.",
        "A veces me gustaría poder hablarte sin sentirme tan tímido(a).",
        "Eres la razón por la que me pongo nervioso(a) al hablar."
      ],
      late: [
        "Perdón por llegar tarde, estaba soñando contigo!",
        "Quería verme extra bien para ti.",
        "No podía dejar de pensar en nuestra última charla.",
        "Estaba eligiendo la canción perfecta antes de verte.",
        "Estaba practicando cómo saludarte!",
        "Perdí la noción del tiempo pensando en tu sonrisa.",
        "Quería asegurarme de llevar mi mejor versión para ti.",
        "Me perdí pensando en ti y olvidé la hora.",
        "Estaba ensayando el saludo perfecto para ti.",
        "El tiempo pasa rápido cuando espero algo bueno.",
        "A veces la anticipación es lo mejor del día."
      ],
      cancel: [
        "Tuve que cancelar, pero espero verte pronto!",
        "Los planes cambiaron, pero pensaba en ti todo el tiempo.",
        "¿Reagendamos? Tengo muchas ganas de pasar tiempo contigo!",
        "Perdón, surgió algo, pero te debo una gran sonrisa!",
        "Te extrañé aún más por no poder verte.",
        "No verte hoy me hizo darme cuenta de cuánto me gustas.",
        "Espero que tu día sea tan dulce como tú, aunque no pudimos vernos.",
        "Extrañarte se volvió mi nuevo pasatiempo desde que no pudimos vernos.",
        "¿Reagendamos? Prometo compensarte con sonrisas extra.",
        "Quizá la próxima vez sea aún mejor.",
        "A veces los mejores planes son los que se posponen."
      ],
      text: [
        "Perdón por no responder, quería decirte algo especial!",
        "Releí tu mensaje y me puse a sonreír.",
        "Quise responderte con algo bonito, así que me tomé mi tiempo.",
        "Solo estaba imaginando cómo sería estar juntos.",
        "Esperaba el momento perfecto para escribirte!",
        "Ojalá mi respuesta te saque una sonrisa como la tuya a mí.",
        "A veces me pierdo pensando en ti y olvido responder.",
        "Quería que mi respuesta fuera tan dulce como tú.",
        "Estaba ocupado pensando en ti, ¡no ignorándote!",
        "No soy el más rápido escribiendo, pero disfruto nuestras charlas.",
        "Me gusta tomarme mi tiempo para responder mensajes bonitos."
      ],
      creative: [
        "Si tuviera una flor por cada vez que pienso en ti, tendría un jardín.",
        "Si los besos fueran estrellas, te daría el cielo.",
        "Debes ser mag@, porque cuando te miro, los demás desaparecen.",
        "Haces que los momentos simples sean extraordinarios.",
        "Si pudiera escribirte una canción, sería la melodía más feliz.",
        "Si pudiera enviarte una nube, sería la más esponjosa solo para ti.",
        "Si pudiera pintar la felicidad, tendría tu cara.",
        "Si pudiera enviarte una estrella, elegiría la más brillante—como tú.",
        "Si pudiera enviarte buena energía, lo haría cada día.",
        "Si pudiera compartir un atardecer, elegiría el más bonito para ti."
      ],
      random: [
        "Solo quería recordarte lo increíble que eres!",
        "Haces mi mundo un poco más brillante cada día.",
        "Espero que tu día sea tan lindo como tu sonrisa.",
        "Si alguna vez necesitas una razón para sonreír, piensa en mí pensando en ti.",
        "¡Eres la mejor parte de mi día!",
        "Haces que hasta los lunes se sientan como viernes.",
        "Si alguna vez dudas de ti, recuerda que hay alguien pensando en ti (¡yo!).",
        "Eres la razón por la que espero cada día con ganas.",
        "Si necesitas animarte, solo mándame un mensaje!",
        "Espero que tu día tenga un brillo extra.",
        "Te deseo un día tan bueno como tu canción favorita.",
        "Hay días que simplemente se sienten mejor, ¿no?",
        "Es curioso cómo un hola tuyo me alegra el día."
      ],
      // Nuevos tipos enhanced
      first_message: [
        "¡Hola! He querido hablarte desde hace tiempo.",
        "Hey, espero no te moleste que te escriba.",
        "Sé que puede sonar random, pero quería saludarte.",
        "¡Hola! Te he visto por ahí y me pareces muy cool.",
        "¡Hey! Espero que tu día vaya genial.",
        "¡Hola! He estado esperando una oportunidad para hablarte.",
        "¡Hey! Me encanta tu energía, ¿podemos charlar?",
        "He estado queriendo presentarme como es debido.",
        "¡Hola! No pude evitar notar lo increíble que eres.",
        "¡Hey! He estado juntando valor para hablarte.",
        "Espero que no suene raro, pero me pareces increíble.",
        "¡Hola! Te he visto por ahí y me encantaría conocerte.",
        "¡Hey! Me preguntaba si te gustaría charlar alguna vez.",
        "Sé que no hemos hablado mucho, pero me encantaría cambiar eso.",
        "¡Hola! Llamaste mi atención y pensé en saludarte.",
        "¡Hey! Te he estado admirando desde lejos y pensé en saludarte.",
        "Espero no ser muy directo, pero me encantaría conocerte mejor.",
        "¡Hola! He querido hacerte un cumplido pero nunca encontré el momento.",
        "¡Hey! Me pareces alguien con quien se pueden tener conversaciones interesantes.",
        "He estado buscando la manera perfecta de empezar una conversación contigo."
      ],
      good_morning: [
        "¡Buenos días! Espero que tu día comience tan hermoso como tu sonrisa.",
        "¡Buenos días! Espero que hoy te traiga tanta alegría como tú das a otros.",
        "¡Buenos días sol! Espero que tu café esté fuerte y tu día sea increíble.",
        "¡Buenos días! Te deseo un día tan lindo como tú.",
        "¡Buenos días! Que tu día esté lleno de buenas vibras.",
        "¡Buenos días hermosa! Espero que hoy supere todas tus expectativas.",
        "¡Buenos días! Espero que tu día sea tan brillante como tu personalidad.",
        "¡Despierta y brilla! Espero que tu mañana sea tan dulce como tú.",
        "¡Buenos días preciosa! ¿Lista para conquistar el día?",
        "¡Buenos días! Espero que hayas dormido bien y despiertes sintiéndote increíble.",
        "¡Buenos días! El mundo es más brillante contigo en él.",
        "¡Buenos días rayito de sol! Espero que tu día esté lleno de pequeños milagros.",
        "¡Buenos días! Te mando buenas vibras para empezar tu día.",
        "¡Buenos días alma hermosa! Espero que hoy recibas todo lo que mereces.",
        "¡Buenos días! Eres lo primero en lo que pienso al despertar.",
        "¡Buenos días! Espero que tu día sea tan maravilloso como pensar en ti.",
        "¡Buenos días! Que tu café sea fuerte y tu día sea mágico.",
        "¡Buenos días! Espero que te sientas tan increíble como haces sentir a otros.",
        "¡Buenos días! Empiezo mi día pensando en tu hermosa sonrisa.",
        "¡Buenos días rayito! Espero que hoy te trate tan especial como eres.",
        "¡Buenos días! Te mereces toda la felicidad que venga hoy.",
        "¡Buenos días sol! Espero que tu día brille tanto como tú."
      ],
      good_night: [
        "¡Buenas noches! Dulces sueños sobre todas las cosas increíbles que harás mañana.",
        "¡Duerme bien! Espero que sueñes con aventuras hermosas.",
        "¡Buenas noches! Que tu sueño sea tranquilo y tus sueños dulces.",
        "¡Buenas noches! Espero que mañana te traiga más razones para sonreír.",
        "¡Dulces sueños! Descansa bien, te lo mereces.",
        "¡Buenas noches! Espero que despiertes sintiéndote renovada y feliz.",
        "¡Duerme bien! Mañana es otra oportunidad para algo maravilloso.",
        "¡Buenas noches hermosa! Sueña con todas las cosas buenas que vienen.",
        "¡Dulces sueños! Espero que duermas tan pacíficamente como haces sentir a otros.",
        "¡Buenas noches! Que tus sueños estén llenos de felicidad y alegría.",
        "¡Duerme bien angelito! Mañana es otro día para ser increíble.",
        "¡Buenas noches! Espero que tengas el descanso más reparador.",
        "¡Dulces sueños! Hiciste el día más brillante solo con ser tú.",
        "¡Buenas noches! Espero que tu almohada sea suave y tus sueños dulces.",
        "¡Duerme bien! No puedo esperar a ver qué te trae el mañana.",
        "¡Buenas noches alma hermosa! Descansa bien, te lo has ganado.",
        "¡Dulces sueños! Espero que despiertes sintiéndote tan increíble como eres.",
        "¡Buenas noches! Que las estrellas te cuiden mientras duermes.",
        "¡Duerme bien! Espero que tus sueños sean tan hermosos como tu corazón.",
        "¡Buenas noches! Termina tu día sabiendo lo especial que eres.",
        "¡Dulces sueños! Espero que mañana sea aún mejor que hoy.",
        "¡Buenas noches! Descansa bien y recarga esa hermosa energía tuya."
      ],
      flirty: [
        "No puedo dejar de pensar en esa sonrisa tuya.",
        "Tienes esta forma de hacer que mi día mejore instantáneamente.",
        "Si fueras una canción, estarías en repeat en mi cabeza.",
        "Debes ser magia porque me tienes completamente hipnotizado.",
        "Creo que rompiste mi GPS porque me sigo perdiendo en tus ojos.",
        "¿Eres de cobre y telurio? Porque eres muy linda.",
        "Si fueras una estrella, serías la más brillante en mi cielo.",
        "¿Tienes una curita? Porque me lastimé al caer por ti.",
        "Si las miradas mataran, definitivamente serías un arma de destrucción masiva.",
        "¿Eres maga? Porque cada vez que te miro, todos los demás desaparecen.",
        "¿Crees en el amor a primera vista, o tengo que pasar otra vez?",
        "¿Tu nombre es Google? Porque tienes todo lo que he estado buscando.",
        "Si fueras una verdura, serías una hermosura.",
        "¿Eres WiFi? Porque siento una conexión.",
        "¿Tienes un mapa? Porque me pierdo en tus ojos.",
        "Si fueras una fruta, serías la más dulce.",
        "¿Eres una multa? Porque tienes 'perfecta' escrito por todas partes.",
        "¿Te quemaste con el sol, o siempre estás así de ardiente?",
        "Si la belleza fuera tiempo, tú serías la eternidad.",
        "¿Eres una cámara? Porque cada vez que te veo, sonrío.",
        "¿Tienes una moneda? Quiero llamar a mi mamá y decirle que encontré a mi media naranja.",
        "Si fueras un triángulo, serías muy aguda.",
        "¿Eres un préstamo del banco? Porque tienes todo mi interés.",
        "¿Trabajas en Starbucks? Porque me gustas un latte.",
        "Si fueras un gato, serías purr-fecta.",
        "¿Eres mi apéndice? Porque tengo la sensación de que debería salir contigo."
      ],
      sweet: [
        "Te mereces toda la felicidad del mundo.",
        "Haces el mundo más brillante solo con estar en él.",
        "Agradezco que el universo haya puesto a alguien como tú en mi vida.",
        "Tienes el corazón más bondadoso que he conocido.",
        "Tu presencia se siente como un abrazo cálido en un día frío.",
        "Eres el tipo de persona que hace mejores a todos a su alrededor.",
        "Gracias por ser la persona maravillosa que eres.",
        "Tienes esta hermosa forma de ver lo bueno en todo.",
        "Tu sonrisa podría iluminar el cuarto más oscuro.",
        "Haces que los momentos ordinarios se sientan mágicos.",
        "Hay algo tan pacífico en estar cerca de ti.",
        "Tienes el alma más genuina que he conocido.",
        "Tu bondad es como rayos de sol en un día nublado.",
        "Me haces creer en la bondad de las personas.",
        "Tienes esta increíble habilidad de hacer que todos se sientan especiales.",
        "Tu corazón es tan hermoso como tu sonrisa.",
        "Sacas lo mejor de cada persona que conoces.",
        "Hay algo tan reconfortante en tu presencia.",
        "Tienes esta forma de hacer que todo mejore.",
        "Tu energía positiva es absolutamente contagiosa.",
        "Me haces querer ser una mejor persona.",
        "Tienes el alma más hermosa.",
        "Tu compasión por otros es realmente inspiradora.",
        "Haces que el mundo se sienta como un lugar más seguro y bondadoso."
      ],
      funny: [
        "¿Eres WiFi? Porque siento una conexión.",
        "Si fueras una verdura, serías una hermosura.",
        "¿Tienes un mapa? Me sigo perdiendo en tu genialidad.",
        "¿Eres una multa de tráfico? Porque tienes 'perfecta' escrito por todos lados.",
        "Si fueras una fruta, serías la más dulce.",
        "¿Eres Google? Porque tienes todo lo que he estado buscando.",
        "¿Crees en el amor a primera vista, o debería pasar otra vez?",
        "Si fueras una hamburguesa en McDonald's, serías la McHermosa.",
        "¿Eres mi tarea? Porque debería estar haciéndote ahora mismo.",
        "¿Tienes una curita? Me lastimé la rodilla cuando me caí por ti.",
        "¿Eres maga? Porque cuando te miro, todos los demás desaparecen.",
        "Si fueras una verdura, ¡serías una zanahoria muy linda!",
        "¿Eres un préstamo del banco? Porque tienes todo mi interés.",
        "¿Trabajas en Starbucks? Porque me gustas mucho-chino.",
        "¿Eres una cámara? Porque cada vez que te veo, sonrío.",
        "Si fueras un triángulo, serías muy aguda.",
        "¿Eres mi apéndice? Porque tengo la sensación de que debería salir contigo.",
        "¿Te quemaste con el sol, o siempre estás así de ardiente?",
        "Si fueras un gato, serías purr-fecta.",
        "¿Eres una viajera del tiempo? Porque te veo en mi futuro.",
        "¿Tienes 11 protones? Porque eres muy fina.",
        "¿Eres de cobre y telurio? Porque eres muy linda.",
        "Si fueras una verdura, serías un rábano... espera, eso no funciona.",
        "¿Eres un castor? Porque daaaaam.",
        "¿Te gusta la ciencia? Porque tengo un ojo en ti.",
        "¿Eres un ángulo de 45 grados? Porque eres muy aguda."
      ],
      deep: [
        "Me encanta cómo ves el mundo diferente a todos los demás.",
        "Hay algo sobre la forma en que piensas que me fascina.",
        "Admiro lo auténtica que eres en un mundo lleno de pretensiones.",
        "Tienes esta sabiduría que hace cada conversación significativa.",
        "Me encanta lo apasionada que te pones cuando hablas de lo que te importa.",
        "Ves belleza en lugares que otros podrían pasar por alto.",
        "Hay una profundidad en ti que encuentro increíblemente atractiva.",
        "Aprecio lo reflexiva que eres sobre todo.",
        "Tienes esta rara habilidad de hacer que las personas se sientan realmente comprendidas.",
        "Me encanta cómo cuestionas las cosas en lugar de solo aceptarlas.",
        "Tu perspectiva sobre la vida es refrescante e inspiradora.",
        "Me haces pensar en cosas de formas que nunca había considerado.",
        "Hay algo tan genuino en la forma en que te expresas.",
        "Admiro cómo te mantienes fiel a tus valores.",
        "Tienes esta hermosa forma de encontrar significado en los pequeños momentos.",
        "Me encanta cómo no tienes miedo de ser vulnerable.",
        "Tu inteligencia emocional es increíblemente atractiva.",
        "Me haces querer entender mejor el mundo.",
        "Aprecio cómo escuchas con todo tu corazón.",
        "Tienes este don para hacer conexiones profundas con las personas.",
        "Me encanta cómo siempre estás creciendo y evolucionando.",
        "Tu curiosidad por la vida es absolutamente cautivadora.",
        "Me haces sentir que puedo ser mi yo más auténtico.",
        "Admiro cómo manejas los desafíos con tanta gracia y sabiduría."
      ]
    }
  };

  // Extend existing messages with enhanced messages
  Object.keys(enhancedMessages).forEach(lang => {
    Object.keys(enhancedMessages[lang]).forEach(type => {
      if (!messages[lang]) messages[lang] = {};
      messages[lang][type] = enhancedMessages[lang][type];
    });
  });

  // Enhanced tips for better conversation
  const enhancedTips = {
    en: [
      "💖 Tip: Be yourself! Authenticity is more attractive than trying to be someone you're not.",
      "🌟 Tip: Ask questions about things they're passionate about.",
      "💭 Tip: Share something that made you think of them.",
      "✨ Tip: Compliment something specific, not just general appearance.",
      "🎯 Tip: Find common interests to build a connection.",
      "💫 Tip: Be genuinely interested in their thoughts and opinions.",
      "🌸 Tip: Timing matters - choose the right moment for deeper conversations.",
      "💝 Tip: Remember the little things they tell you.",
      "🌈 Tip: Use humor, but make sure it's inclusive and kind.",
      "💛 Tip: Be patient - good relationships take time to develop.",
      "🎨 Tip: Show interest in their hobbies and creative pursuits.",
      "🌺 Tip: Give them space to miss you sometimes.",
      "💌 Tip: Write thoughtful messages rather than just 'hey' or 'what's up'.",
      "🎪 Tip: Share funny stories or memes that remind you of them.",
      "🌟 Tip: Be supportive of their goals and dreams.",
      "💎 Tip: Quality conversations are better than constant texting.",
      "🎭 Tip: Don't try too hard to impress - relaxed confidence is attractive.",
      "🌙 Tip: Good morning and good night messages show you care.",
      "🎵 Tip: Share music that makes you think of them.",
      "💫 Tip: Ask for their opinion on things you genuinely care about.",
      "🌻 Tip: Celebrate their wins, no matter how small.",
      "🎯 Tip: Be consistent but not overwhelming in your communication.",
      "💕 Tip: Flirt playfully but respect their boundaries.",
      "🌈 Tip: Show vulnerability - it creates deeper connections."
    ],
    es: [
      "💖 Consejo: ¡Sé tú mismo! La autenticidad es más atractiva que fingir ser alguien que no eres.",
      "🌟 Consejo: Pregunta sobre cosas que le apasionen.",
      "💭 Consejo: Comparte algo que te hizo pensar en él/ella.",
      "✨ Consejo: Elogia algo específico, no solo la apariencia general.",
      "🎯 Consejo: Encuentra intereses comunes para crear conexión.",
      "💫 Consejo: Interésate genuinamente en sus pensamientos y opiniones.",
      "🌸 Consejo: El timing importa - elige el momento correcto para conversaciones profundas.",
      "💝 Consejo: Recuerda las pequeñas cosas que te cuente.",
      "🌈 Consejo: Usa humor, pero asegúrate de que sea inclusivo y amable.",
      "💛 Consejo: Sé paciente - las buenas relaciones toman tiempo en desarrollarse.",
      "🎨 Consejo: Muestra interés en sus pasatiempos y proyectos creativos.",
      "🌺 Consejo: Dale espacio para que te extrañe a veces.",
      "💌 Consejo: Escribe mensajes thoughtful en lugar de solo 'hola' o 'qué tal'.",
      "🎪 Consejo: Comparte historias divertidas o memes que te recuerden a él/ella.",
      "🌟 Consejo: Apoya sus metas y sueños.",
      "💎 Consejo: Las conversaciones de calidad son mejores que textear constantemente.",
      "🎭 Consejo: No trates demasiado de impresionar - la confianza relajada es atractiva.",
      "🌙 Consejo: Los mensajes de buenos días y buenas noches muestran que te importa.",
      "🎵 Consejo: Comparte música que te haga pensar en él/ella.",
      "💫 Consejo: Pide su opinión sobre cosas que realmente te importan.",
      "🌻 Consejo: Celebra sus logros, sin importar qué tan pequeños sean.",
      "🎯 Consejo: Sé consistente pero no abrumador en tu comunicación.",
      "💕 Consejo: Coquetea de manera juguetona pero respeta sus límites.",
      "🌈 Consejo: Muestra vulnerabilidad - crea conexiones más profundas."
    ]
  };

  // Enhanced message generator that considers mood and type
  window.generateEnhancedMessage = function() {
    try {
      console.log('🎯 Generating enhanced message...');
      
      // Get form values
      const messageType = document.getElementById("type").value;
      const mood = document.querySelector('.mood-btn.active')?.dataset.mood || 'casual';
      
      console.log('Selected type:', messageType, 'mood:', mood);
      
      // Get current language with multiple fallbacks
      const lang = window.currentLang || localStorage.getItem('namerly-crush-lang') || 
                   (navigator.language.startsWith("es") ? "es" : "en");
      
      // Get messages for current type and language
      let messagesArray;
      
      // Try to get messages from global messages object first, then our enhanced messages
      if (window.messages && window.messages[lang] && window.messages[lang][messageType]) {
        messagesArray = window.messages[lang][messageType];
      } else {
        console.log('Using fallback messages from enhanced collection');
        // Fallback to enhanced messages if global messages not available
        messagesArray = enhancedMessages[lang] && enhancedMessages[lang][messageType] ? 
                       enhancedMessages[lang][messageType] : 
                       enhancedMessages.en[messageType] || [];
      }
      
      if (!messagesArray || messagesArray.length === 0) {
        console.error('No messages found for type:', messageType, 'in language:', lang);
        document.getElementById("output").innerHTML = "❌ No messages available for this type.";
        return;
      }
      
      // Anti-repetition logic (use existing system)
      const recentItems = JSON.parse(localStorage.getItem('namerly-crush-recent')) || [];
      const availableMessages = messagesArray.filter(msg => !recentItems.includes(msg));
      
      let selectedMessage;
      if (availableMessages.length === 0) {
        selectedMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];
        localStorage.setItem('namerly-crush-recent', JSON.stringify([]));
      } else {
        selectedMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
      }
      
      // Apply mood modifications
      selectedMessage = applyMoodModifier(selectedMessage, mood, lang);
      
      // Update recent items
      const updatedRecent = [selectedMessage, ...recentItems.slice(0, 7)];
      localStorage.setItem('namerly-crush-recent', JSON.stringify(updatedRecent));
      
      // Display the enhanced message
      displayEnhancedOutput(selectedMessage, lang);
      
      // Show a contextual tip
      showRandomTip(lang);
      
      console.log('✅ Enhanced message generated successfully');
      
    } catch (error) {
      console.error('❌ Error generating enhanced message:', error);
      document.getElementById("output").innerHTML = "❌ Error generating message. Please try again.";
    }
  };

  // Apply mood-specific modifications to message
  function applyMoodModifier(message, mood, lang) {
    try {
      const modifiers = {
        casual: {
          en: ['😊', '🙂', '✌️'],
          es: ['😊', '🙂', '✌️']
        },
        romantic: {
          en: ['💕', '💖', '🥰'],
          es: ['💕', '💖', '🥰']
        },
        playful: {
          en: ['😜', '🎉', '😄'],
          es: ['😜', '🎉', '😄']
        },
        confident: {
          en: ['😎', '🔥', '💪'],
          es: ['😎', '🔥', '💪']
        }
      };
      
      const moodEmojis = modifiers[mood][lang] || modifiers.casual[lang];
      const emoji = moodEmojis[Math.floor(Math.random() * moodEmojis.length)];
      
      return `${message} ${emoji}`;
    } catch (error) {
      console.log('Mood modifier error, using original message:', error);
      return message;
    }
  }

  // Display enhanced output with better styling
  function displayEnhancedOutput(message, lang) {
    try {
      // Use global translations or provide fallback
      const t = window.translations && window.translations[lang] ? window.translations[lang] : {
        copy: lang === 'es' ? 'Copiar' : 'Copy',
        share: lang === 'es' ? 'Compartir' : 'Share'
      };
      
      const output = document.getElementById("output");
      
      output.innerHTML = `
        <div style="font-style: italic; margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">
          "${message}"
        </div>
        <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
          <button class="copy-btn" onclick="copyToClipboard('${message.replace(/'/g, "\\'")}')">
            ${t.copy}
          </button>
          <button class="main-share-btn" onclick="toggleShareSection()">
            ${t.share}
          </button>
        </div>
      `;
      
      // Show the share section
      const shareSection = document.getElementById("share-section");
      if (shareSection) {
        shareSection.style.display = "block";
      }
    } catch (error) {
      console.error('Display error:', error);
      document.getElementById("output").innerHTML = `"${message}"`;
    }
  }

  // Show contextual tips
  window.showRandomTip = function(lang) {
    try {
      const tipElement = document.getElementById("tip-text");
      if (!tipElement) return;
      
      const tips = enhancedTips[lang] || enhancedTips.en;
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      
      tipElement.innerHTML = randomTip;
      
      // Add a subtle animation
      tipElement.style.opacity = '0';
      setTimeout(() => {
        tipElement.style.opacity = '1';
      }, 300);
    } catch (error) {
      console.log('Tip display error:', error);
    }
  };

  // Extend existing messages with enhanced messages if global messages exist
  if (window.messages) {
    Object.keys(enhancedMessages).forEach(lang => {
      Object.keys(enhancedMessages[lang]).forEach(type => {
        if (!window.messages[lang]) window.messages[lang] = {};
        window.messages[lang][type] = enhancedMessages[lang][type];
      });
    });
    console.log('✅ Enhanced messages merged with global messages');
  } else {
    console.log('✅ Using standalone enhanced messages');
  }

  console.log('✅ Enhanced crush functionality loaded successfully!');
}

// Initialize enhanced functionality
initializeEnhanced();

// Mood selector functionality with debug
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM Content Loaded - Setting up mood buttons...');
  
  // Check if required elements exist
  const requiredElements = ['type', 'output'];
  const missingElements = requiredElements.filter(id => !document.getElementById(id));
  
  if (missingElements.length > 0) {
    console.error('❌ Missing elements:', missingElements);
  } else {
    console.log('✅ All required elements found');
  }
  
  // Mood button functionality
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      console.log('Mood selected:', btn.dataset.mood);
    });
  });
  
  // Test if global variables are available
  setTimeout(() => {
    console.log('🔍 Checking global variables...');
    console.log('currentLang:', window.currentLang);
    console.log('messages available:', !!window.messages);
    console.log('translations available:', !!window.translations);
    
    // Initialize with a random tip
    const currentLang = window.currentLang || localStorage.getItem('namerly-crush-lang') || 'en';
    if (document.getElementById("tip-text")) {
      showRandomTip(currentLang);
    }
  }, 1000);
});
