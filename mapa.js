// ===== CONFIGURAÇÕES INICIAIS =====
let map;
let marcadores = {};
let rotaEscuna;
let pousadaSelecionada = null;
let grupoMarcadores = {};

// Coordenadas centrais de Búzios
const CENTRO_BUZIOS = [-22.7522, -41.8842];
const ZOOM_INICIAL = 13;

// ===== DADOS DAS POUSADAS =====
const pousadas = {
    pousada1: {
        nome: "Pousada Centro Class",
        coordenadas: [-22.757779679506456, -41.8891556805854],
        descricao: "Pousada exemplo localizada próxima ao centro de Búzios. Substitua pelas informações reais.",
        telefone: "(22) 9999-9999",
        site: "www.pousada1.com.br"
    },
    pousada2: {
        nome: "Pousada Casa Centro", 
        coordenadas: [-22.757680316769324, -41.88881655938854],
        descricao: "Segunda pousada exemplo com vista para o mar. Atualize com dados reais.",
        telefone: "(22) 8888-8888",
        site: "www.pousada2.com.br"
    },
    pousada3: {
        nome: "Pousada Centro Up",
        coordenadas: [-22.757032328657075, -41.88670007431267],
        descricao: "Terceira pousada exemplo em localização privilegiada. Personalize conforme necessário.",
        telefone: "(22) 7777-7777",
        site: "www.pousada3.com.br"
    }
};

// ===== DADOS DAS PRAIAS =====
const praias = [
    {
        nome: "Praia de Geribá",
        coordenadas: [-22.779634406667768, -41.91277299939872],
        descricao: "🏄‍♂️ A praia mais famosa de Búzios! Ideal para surfistas e jovens. Possui ótima infraestrutura com bares, restaurantes e aluguel de equipamentos. Ambiente animado durante todo o dia.",
        caracteristicas: "Ondas fortes, ideal para pegar sol, esportes aquáticos, vida noturna"
    },
    {
        nome: "Praia da Ferradura",
        coordenadas: [-22.76831448988582, -41.88563486386712],
        descricao: "👨‍👩‍👧‍👦 Praia em formato de ferradura com águas calmas e cristalinas. Perfeita para famílias com crianças, oferece segurança e tranquilidade. Ótima para relaxar e nadar.",
        caracteristicas: "Águas calmas, ideal para famílias, formato único, segura para crianças"
    },
    {
        nome: "Praia do Forno",
        coordenadas: [-22.761265942679792, -41.875421949269466],
        descricao: "🥾 Pequena praia selvagem acessível por trilha de 15 minutos. Recompensa com águas cristalinas e ambiente preservado. Leve água e protetor solar!",
        caracteristicas: "Trilha de acesso, águas cristalinas, natureza preservada, aventura"
    },
    {
        nome: "Praia de João Fernandes",
        coordenadas: [-22.742449272674143, -41.876741298920045],
        descricao: "🍸 Praia sofisticada com beach clubs exclusivos e águas azul-turquesa. Ambiente elegante com restaurantes de alta qualidade. Ideal para um dia especial.",
        caracteristicas: "Restaurantes sofisticados, águas azul-turquesa, ambiente elegante"
    },
    {
        nome: "Praia Brava",
        coordenadas: [-22.75462011660344, -41.87259766059793],
        descricao: "🌊 Praia selvagem com ondas fortes e areia branca. Frequentada por surfistas e naturistas. Ambiente mais reservado e natural.",
        caracteristicas: "Ondas fortes, areia branca, ambiente selvagem, naturismo opcional"
    },
    {
        nome: "Praia da Tartaruga",
        coordenadas: [-22.756957049091795, -41.90447499715506],
        descricao: "🐢 Pequena praia protegida, ideal para relaxar com uma caipirinha e observar a vida marinha. Ambiente tranquilo e acolhedor.",
        caracteristicas: "Pequena, protegida, vida marinha, ambiente tranquilo"
    },
    {
        nome: "Praia dos Ossos",
        coordenadas: [-22.746013415427598, -41.88125799597498],
        descricao: "⛪ Praia histórica no centro de Búzios, com vista para a Igreja de Sant'Ana. Rica em história e cultura local. Fácil acesso a pé.",
        caracteristicas: "Centro histórico, Igreja de Sant'Ana, tradicional, fácil acesso"
    },
    {
        nome: "Praia da Azeda",
        coordenadas: [-22.74231433041134, -41.88178684833913],
        descricao: "💎 Praia de águas cristalinas, limpa e tranquila. Ideal para mergulho, stand-up paddle e famílias. A maré sobe a cada 6 horas - planeje sua visita!",
        caracteristicas: "Águas cristalinas, ideal para mergulho e stand-up paddle, proteção ambiental"
    }
];

// ===== DADOS DE TRANSPORTE =====
const transportes = [
    {
        tipo: "van",
        nome: "Ponto de Van - João Fernandes, Ossos e Azeda",
        coordenadas: [-22.747027026573303, -41.87891959109518],
        descricao: "Ponto de embarque das vans que circulam pelas praias de Búzios.",
        horarios: "Saídas a cada 30 minutos das 7h às 22h",
        preco: "R$ 5,00 por trecho",
        destinos: "Geribá, Ferradura, João Fernandes, Tartaruga"
    },
    {
        tipo: "van",
        nome: "Ponto de Van - Geribá",
        coordenadas: [-22.773698348926835, -41.91413416867155],
        descricao: "Ponto de van na Praia de Geribá para retorno ao centro.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h30",
        preco: "R$ 5,00 por trecho",
        destinos: "Chegada a Geriba, ou voltar ao Centro"
    },
    {
        tipo: "onibus",
        nome: "Rodoviária de Búzios",
        coordenadas: [-22.759403528125265, -41.888550040824555],
        descricao: "Terminal rodoviário com ônibus para Cabo Frio e outras cidades.",
        horarios: "Cabo Frio: saídas a cada hora das 6h às 23h",
        preco: "Consulte no site da Salineira",
        destinos: "Cabo Frio, Arraial do Cabo, Rio de Janeiro"
    },
    {
        tipo: "van",
        nome: "Ponto de Van Centro 1",
        coordenadas: [-22.75905335988727, -41.88812670564814],
        descricao: "Ponto de Van.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Ruas proximas a Praias"
    },
    {
        tipo: "van",
        nome: "Ponto de Van Centro 2",
        coordenadas: [-22.756953630706533, -41.885572797911195],
        descricao: "Ponto de ônibus urbano que conecta as principais áreas de Búzios.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Circuito urbano completo"
    },
    {
        tipo: "van",
        nome: "Ponto de Van Tartaruga",
        coordenadas: [-22.762800138058147, -41.89697482693303],
        descricao: "Ponto que Conecta a Praia da Tartaruga ou para o Centro.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Circuito urbano completo"
    },
    {
        tipo: "van",
        nome: "Ponto de Van Centro 3",
        coordenadas: [-22.758989129691727, -41.88765637847316],
        descricao: "Ponto que Conecta a Praia de João Fernandes, Ossos e Azeda.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Azeda,João Fernandes, Ossos"
    },
    {
        tipo: "van",
        nome: "Ponto de Van Centro 4",
        coordenadas: [-22.75728797556695, -41.885582774434866],
        descricao: "Ponto que Conecta a Praia de João Fernandes, Ossos e Azeda.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Azeda,João Fernandes, Ossos"
    },
    {
        tipo: "van",
        nome: "Ponto da Brava",
        coordenadas: [-22.751871179803526, -41.878131929353266],
        descricao: "Ponto que Conecta a Praia Brava.",
        horarios: "Saídas a cada 30 minutos das 7h30 às 23h00",
        preco: "R$ 5,00 por trecho",
        destinos: "Praia Brava, Silk Beach"
    }
]; 

// ===== DADOS DE EVENTOS ===== 
const eventos = [
    {
        nome: "Feirinha de Artesanato",
        coordenadas: [-22.76152242864707, -41.89058416402547],
        descricao: "Feira de artesanato local com produtos típicos da região, localizada na Rua das Pedras. Um dos pontos turísticos mais famosos de Búzios, oferece artesanato local, roupas, acessórios e comidas típicas.",
        quando: "Quartas e sábados das 18h às 23h",
        dicas: "Ótimo local para comprar lembranças e experimentar comidas locais com Show ao vivo. Chegue cedo para evitar multidões.",
        comoChegar: {
            aPe: "A feirinha fica na famosa Rua das Pedras, no centro de Búzios. É facilmente acessível a pé de qualquer pousada do centro.",
            transporte: "Todas as vans param próximo ao centro. Desça no ponto central e caminhe pela Rua das Pedras.",
            distancias: {
                "pousada1": "5 minutos a pé",
                "pousada2": "3 minutos a pé", 
                "pousada3": "7 minutos a pé"
            }
        },
        icone: "imagens/feirinha.png"
    }
];

// ===== ROTA DA ESCUNA =====
const rotaEscunaCoords = [
    [-22.75387824649019, -41.886847134655014], // Saída - Cais do Centro
    [-22.748012980151014, -41.883910278167136], // Ponto 1 - 
    [-22.742219906572323, -41.884835822853425],  // Ponto 2 -  
    [-22.73927264756351, -41.88216540555681],  // Ponto 3 - 
    [-22.74041754785935,  -41.87596198577092],  //  4** parada joao fernandes
    [-22.731369870021528, -41.875758724054435],  //  5**
    [-22.729769441385436, -41.89642799204553],  //  6**
    [-22.7292045797465, -41.90780884933111],  //  7**
    [-22.726134436146747, -41.922855206518676],  // 8* parada ilha feia
    [-22.741831561860938, -41.92061387274492],  // **Nova 9**
    [-22.75294722640286,  -41.905024134549016], // **Nova 10** parada tartaruga
    [-22.746557493801163,-41.897951012585374],  // **Nova 11**
    [-22.750284874133026,-41.89390922860865],   // **Nova 12**
 
    [-22.75387824649019, -41.886847134655014]  // Retorno - Orla Bardot
];

// ===== DADOS DAS CASAS DE CÂMBIO =====
const casasCambio = [
    {
        nome: "Casa de Câmbio Centro",
        coordenadas: [-22.7565290830051, -41.88930541967532],
        descricao: "Casa de câmbio no centro de Búzios.",
        icone: "imagens/cambio.png"
    },
    {
        nome: "Casa de Câmbio 2",
        coordenadas: [-22.754797022485235, -41.88626484386395],
        descricao: "Segunda casa de câmbio.",
        icone: "imagens/cambio.png"
    }
];

// ===== INICIALIZAÇÃO DO MAPA =====
function inicializarMapa() {
    // Criar o mapa
    map = L.map('map').setView(CENTRO_BUZIOS, ZOOM_INICIAL);

    // Adicionar camada de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Remover loading overlay
    document.getElementById('loading').style.display = 'none';

    // Inicializar grupos de marcadores
    grupoMarcadores.pousadas = L.layerGroup().addTo(map);
    grupoMarcadores.praias = L.layerGroup().addTo(map);
    grupoMarcadores.transportes = L.layerGroup().addTo(map);
    grupoMarcadores.eventos = L.layerGroup().addTo(map);

    // Adicionar marcadores
    adicionarMarcadoresPousadas();
    adicionarMarcadoresPraias();
    adicionarMarcadoresTransporte();
    adicionarMarcadoresEventos();
    adicionarRotaEscuna();
    adicionarMarcadoresCasasCambio();

    // Configurar eventos
    configurarEventos();

    // Configurar filtros da legenda
    configurarFiltrosLegenda();

    window.marcadores = marcadores;
    window.map = map;
}

// ===== FUNÇÕES PARA ADICIONAR MARCADORES =====

function adicionarMarcadoresPousadas() {
    Object.keys(pousadas).forEach(id => {
        const pousada = pousadas[id];
        const icone = L.icon({
            iconUrl: 'imagens/pousada.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });
        const popup = `
            <div>
                <h3>${pousada.nome}</h3>
                <p>${pousada.descricao}</p>
                <div class="popup-info">
                    <strong>📞 Telefone:</strong> ${pousada.telefone}<br>
                    <strong>🌐 Site:</strong> <a href="http://${pousada.site}" target="_blank">${pousada.site}</a>
                </div>
                <button class="popup-button" onclick="selecionarPousada('${id}')">
                    Selecionar como minha pousada
                </button>
            </div>
        `;
        const marcador = L.marker(pousada.coordenadas, { icon: icone })
            .bindPopup(popup)
            .addTo(grupoMarcadores.pousadas);
        marcadores[id] = marcador;
    });
}

marcadores.praias = []; // Adicione esta linha
function adicionarMarcadoresPraias() {
    praias.forEach((praia, index) => {
        const icone = L.icon({
            iconUrl: 'imagens/praia.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        const popup = `
            <div>
                <h3>🏖️ ${praia.nome}</h3>
                <p>${praia.descricao}</p>
                <div class="popup-info">
                    <strong>Características:</strong> ${praia.caracteristicas}
                </div>
                ${pousadaSelecionada ? `
                    <button class="popup-button rota-pousada-btn"
                        data-coords='${JSON.stringify(praia.coordenadas)}'
                        data-nome='${praia.nome.replace(/'/g, "\\'")}'
                    >
                        📍 Como chegar da minha pousada
                    </button>
                ` : ''}
            </div>
        `;
        const marcador = L.marker(praia.coordenadas, { icon: icone })
            .bindPopup(popup)
            .addTo(grupoMarcadores.praias);
        marcadores.praias[index] = marcador; // <-- Salva o marcador no array global
    });
}

function adicionarMarcadoresTransporte() {
    marcadoresVan = [];
    marcadoresOnibus = [];
    transportes.forEach(transporte => {
        const iconeUrl = transporte.tipo === 'van' ? 'imagens/van.png' : 'imagens/onibus.png';
        const icone = L.icon({
            iconUrl: iconeUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        const popup = `
            <div>
                <h3>🚐 ${transporte.nome}</h3>
                <p>${transporte.descricao}</p>
                <div class="popup-info">
                    <strong>⏰ Horários:</strong> ${transporte.horarios}<br>
                    <strong>💰 Preço:</strong> ${transporte.preco}<br>
                    <strong>📍 Destinos:</strong> ${transporte.destinos}
                </div>
            </div>
        `;

        const marker = L.marker(transporte.coordenadas, { icon: icone })
            .bindPopup(popup)
            .addTo(grupoMarcadores.transportes);

        if (transporte.tipo === 'van') marcadoresVan.push(marker);
        if (transporte.tipo === 'onibus') marcadoresOnibus.push(marker);
    });
}

function adicionarMarcadoresEventos() {
    marcadoresFeirinha = [];
    eventos.forEach(evento => {
        const icone = L.icon({
            iconUrl: evento.icone || 'imagens/praia.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        // Gerar informações de como chegar baseado na pousada selecionada
        function gerarInfoComoChegar() {
            if (!evento.comoChegar) return '';
            
            let infoChegar = `<div class="como-chegar-info">
                <h4>🚶‍♂️ Como chegar:</h4>
                <p><strong>A pé:</strong> ${evento.comoChegar.aPe}</p>
                <p><strong>Transporte:</strong> ${evento.comoChegar.transporte}</p>`;
            
            if (pousadaSelecionada && evento.comoChegar.distancias && evento.comoChegar.distancias[pousadaSelecionada]) {
                const pousadaNome = pousadas[pousadaSelecionada].nome;
                const distancia = evento.comoChegar.distancias[pousadaSelecionada];
                infoChegar += `<p><strong>Da ${pousadaNome}:</strong> ${distancia}</p>`;
            }
            
            infoChegar += '</div>';
            return infoChegar;
        }

        function gerarPopupEvento() {
            return `
                <div>
                    <h3>🎉 ${evento.nome}</h3>
                    <p>${evento.descricao}</p>
                    <div class="popup-info">
                        <strong>📅 Quando:</strong> ${evento.quando}<br>
                        <strong>💡 Dicas:</strong> ${evento.dicas}
                    </div>
                    ${gerarInfoComoChegar()}
                    ${pousadaSelecionada ? `
                        <button class="popup-button rota-evento-btn"
                            data-coords='${JSON.stringify(evento.coordenadas)}'
                            data-nome='${evento.nome.replace(/'/g, "\\'")}'
                        >
                            📍 Como chegar da minha pousada
                        </button>
                    ` : ''}
                </div>
            `;
        }

        const marker = L.marker(evento.coordenadas, { icon: icone })
            .bindPopup(gerarPopupEvento())
            .addTo(grupoMarcadores.eventos);

        // Atualizar popup quando abrir
        marker.on('popupopen', function() {
            marker.setPopupContent(gerarPopupEvento());
        });

        // Se for feirinha, salva para filtro
        if (evento.icone && evento.icone.includes('feirinha.png')) {
            marcadoresFeirinha.push(marker);
        }
        
        // Salvar referência para atualização posterior
        if (!marcadores.eventos) marcadores.eventos = [];
        marcadores.eventos.push(marker);
    });
}

function adicionarRotaEscuna() {
    marcadoresEscuna = [];
    // Índices das paradas: 4 (João Fernandes), 8 (Ilha Feia), 10 (Tartaruga)
    const paradas = {
        4: { nome: "João Fernandes", descricao: "Parada para banho e contemplação na famosa praia de João Fernandes." },
        8: { nome: "Ilha Feia", descricao: "Parada para mergulho e observação da vida marinha na Ilha Feia." },
        10: { nome: "Tartaruga", descricao: "Parada para relaxar e nadar na Praia da Tartaruga." }
    };

    rotaEscunaCoords.forEach((coord, index) => {
        if (paradas[index]) {
            const icone = L.icon({
                iconUrl: 'imagens/escuna.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            });

            const popup = `
                <div>
                    <h3>⛵ Parada ${paradas[index].nome}</h3>
                    <p>${paradas[index].descricao}</p>
                    <div class="popup-info">
                        <strong>🕐 Duração da parada:</strong> 30 minutos<br>
                        <strong>🐠 Atividades:</strong> Mergulho livre, contemplação
                    </div>
                </div>
            `;

            const marker = L.marker(coord, { icon: icone })
                .bindPopup(popup)
                .addTo(map);

            marcadoresEscuna.push(marker);
        }
    });

    // Adicionar linha da rota
    rotaEscuna = L.polyline(rotaEscunaCoords, {
        color: '#ff6b35',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 5',
        className: 'rota-escuna'
    }).addTo(map);

    rotaEscuna.bindPopup(`
        <div>
            <h3>⛵ Rota da Escuna</h3>
            <p>Passeio completo pelas ilhas e pontos turísticos marítimos de Búzios.</p>
            <div class="popup-info">
                <strong>⏰ Duração:</strong> 3 horas<br>
                <strong>💰 Preço médio:</strong> R$ 80,00 por pessoa<br>
                <strong>📍 Saída:</strong> Orla Bardot<br>
                <strong>🎫 Reservas:</strong> Agências locais ou cais
            </div>
        </div>
    `);
}

function adicionarMarcadoresCasasCambio() {
    casasCambio.forEach((cambio, idx) => {
        const icone = L.icon({
            iconUrl: cambio.icone,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });
        
        // Função para gerar o popup dinamicamente
        function gerarPopupCambio() {
            if (pousadaSelecionada) {
                // Se já tem pousada selecionada, mostra apenas o botão direto
                const pousadaNome = pousadas[pousadaSelecionada].nome;
                return `
                    <div>
                        <h3>💱 ${cambio.nome}</h3>
                        <p>${cambio.descricao}</p>
                        <div class="popup-info">
                            <p><strong>Partindo de:</strong> ${pousadaNome}</p>
                            <button class="popup-button rota-cambio-btn" data-cambio="${idx}" data-pousada="${pousadaSelecionada}">
                                📍 Como chegar da minha pousada
                            </button>
                        </div>
                    </div>
                `;
            } else {
                // Se não tem pousada selecionada, mostra o select
                return `
                    <div>
                        <h3>💱 ${cambio.nome}</h3>
                        <p>${cambio.descricao}</p>
                        <div class="popup-info">
                            <label for="select-pousada-cambio-${idx}">Partir de:</label>
                            <select id="select-pousada-cambio-${idx}" class="select-pousada-cambio">
                                <option value="">Selecione a pousada</option>
                                <option value="pousada1">Pousada Centro Class</option>
                                <option value="pousada2">Pousada Casa Centro</option>
                                <option value="pousada3">Pousada Centro Up</option>
                            </select>
                            <button class="popup-button rota-cambio-btn" data-cambio="${idx}">Como chegar aqui</button>
                        </div>
                    </div>
                `;
            }
        }
        
        const marcador = L.marker(cambio.coordenadas, { icon: icone }).addTo(map);
        
        // Atualizar popup quando abrir
        marcador.on('popupopen', function() {
            marcador.setPopupContent(gerarPopupCambio());
        });
        
        // Definir popup inicial
        marcador.bindPopup(gerarPopupCambio());
        
        // Salvar referência para atualização posterior
        if (!marcadores.casasCambio) marcadores.casasCambio = [];
        marcadores.casasCambio[idx] = marcador;
    });
}

// ===== FUNÇÕES DE INTERAÇÃO =====

function configurarEventos() {
    // Evento do dropdown de pousadas
    document.getElementById('pousada-select').addEventListener('change', function(e) {
        const pousadaId = e.target.value;
        if (pousadaId) {
            selecionarPousada(pousadaId);
        } else {
            limparSelecaoPousada();
        }
    });

    // Evento do botão de centralizar
    document.getElementById('reset-view').addEventListener('click', function() {
        map.setView(CENTRO_BUZIOS, ZOOM_INICIAL);
        limparRotas();
    });

    // Evento global para botões "Como chegar da minha pousada"
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.rota-pousada-btn');
        if (btn) {
            const coords = JSON.parse(btn.getAttribute('data-coords'));
            const nome = btn.getAttribute('data-nome');
            calcularRota(coords, nome);
        }

        const btnEvento = e.target.closest('.rota-evento-btn');
        if (btnEvento) {
            const coords = JSON.parse(btnEvento.getAttribute('data-coords'));
            const nome = btnEvento.getAttribute('data-nome');
            calcularRota(coords, nome);
        }

        const btnCambio = e.target.closest('.rota-cambio-btn');
        if (btnCambio) {
            const idx = btnCambio.getAttribute('data-cambio');
            let pousadaId = btnCambio.getAttribute('data-pousada');
            
            // Se não tem pousada no data-attribute, tenta pegar do select
            if (!pousadaId) {
                const select = document.getElementById(`select-pousada-cambio-${idx}`);
                pousadaId = select ? select.value : null;
            }
            
            if (!pousadaId) {
                alert('Selecione a pousada de origem!');
                return;
            }
            calcularRotaCambio(pousadaId, parseInt(idx));
        }
    });
}

// Garante que a função seja global para uso no onclick do popup
window.selecionarPousada = selecionarPousada;
function selecionarPousada(pousadaId) {
    limparSelecaoPousada();
    pousadaSelecionada = pousadaId;
    const pousada = pousadas[pousadaId];
    if (marcadores[pousadaId]) {
        marcadores[pousadaId]._icon.classList.add('marcador-selecionado');
        // Fecha o popup do marcador ao selecionar
        if (marcadores[pousadaId].closePopup) {
            marcadores[pousadaId].closePopup();
        }
    }
    document.getElementById('pousada-select').value = pousadaId;
    map.setView(pousada.coordenadas, 14);
    atualizarPopupsPraias();
    atualizarPopupsCasasCambio();
    atualizarPopupsEventos();
    console.log(`Pousada selecionada: ${pousada.nome}`);
}

function limparSelecaoPousada() {
    if (pousadaSelecionada && marcadores[pousadaSelecionada]) {
        marcadores[pousadaSelecionada]._icon.classList.remove('marcador-selecionado');
    }
    pousadaSelecionada = null;
    limparRotas();
    atualizarPopupsPraias();
    atualizarPopupsCasasCambio();
    atualizarPopupsEventos();
}

function atualizarPopupsPraias() {
    // Remover e recriar marcadores das praias com popups atualizados
    grupoMarcadores.praias.clearLayers();
    adicionarMarcadoresPraias();
}

function atualizarPopupsEventos() {
    // Remover e recriar marcadores dos eventos com popups atualizados
    grupoMarcadores.eventos.clearLayers();
    adicionarMarcadoresEventos();
}

function atualizarPopupsCasasCambio() {
    // Atualizar popups das casas de câmbio quando pousada for selecionada/desselecionada
    if (marcadores.casasCambio) {
        marcadores.casasCambio.forEach(marcador => {
            if (marcador && marcador.getPopup()) {
                // Força a atualização do popup na próxima abertura
                marcador.off('popupopen');
                marcador.on('popupopen', function() {
                    const idx = marcadores.casasCambio.indexOf(marcador);
                    const cambio = casasCambio[idx];
                    
                    let popupContent;
                    if (pousadaSelecionada) {
                        const pousadaNome = pousadas[pousadaSelecionada].nome;
                        popupContent = `
                            <div>
                                <h3>💱 ${cambio.nome}</h3>
                                <p>${cambio.descricao}</p>
                                <div class="popup-info">
                                    <p><strong>Partindo de:</strong> ${pousadaNome}</p>
                                    <button class="popup-button rota-cambio-btn" data-cambio="${idx}" data-pousada="${pousadaSelecionada}">
                                        📍 Como chegar da minha pousada
                                    </button>
                                </div>
                            </div>
                        `;
                    } else {
                        popupContent = `
                            <div>
                                <h3>💱 ${cambio.nome}</h3>
                                <p>${cambio.descricao}</p>
                                <div class="popup-info">
                                    <label for="select-pousada-cambio-${idx}">Partir de:</label>
                                    <select id="select-pousada-cambio-${idx}" class="select-pousada-cambio">
                                        <option value="">Selecione a pousada</option>
                                        <option value="pousada1">Pousada Centro Class</option>
                                        <option value="pousada2">Pousada Casa Centro</option>
                                        <option value="pousada3">Pousada Centro Up</option>
                                    </select>
                                    <button class="popup-button rota-cambio-btn" data-cambio="${idx}">Como chegar aqui</button>
                                </div>
                            </div>
                        `;
                    }
                    marcador.setPopupContent(popupContent);
                });
            }
        });
    }
}

let rotaAtual = null;
let rotaControl = null;
let rotaControl2 = null;
let rotaControl3 = null;

async function calcularRota(destino, nomeDestino) {
    if (!pousadaSelecionada) {
        alert('Selecione uma pousada primeiro!');
        return;
    }

    limparRotas();

    const origem = pousadas[pousadaSelecionada].coordenadas;

    // Praias que devem exibir o modal de escolha
    const praiasComModal = [
        "Praia de Geribá",
        "Praia da Tartaruga",
        "Praia dos Ossos",
        "Praia de João Fernandes",
        "Praia da Azeda"
    ];

    if (praiasComModal.includes(nomeDestino)) {
        const escolha = await showGeribaModal();
        if (escolha === 'van') {
            let pontoVanCentro, pontoVanDestino;
            let nomePontoVanDestino = null;

            if (nomeDestino === "Praia de Geribá" || nomeDestino === "Praia da Tartaruga") {
                // Para Geribá e Tartaruga
                if (pousadaSelecionada === "pousada3") {
                    pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 2");
                } else {
                    pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 1");
                }
                nomePontoVanDestino = nomeDestino === "Praia de Geribá"
                    ? "Ponto de Van - Geribá"
                    : "Ponto de Van Tartaruga";
                pontoVanDestino = transportes.find(t => t.nome === nomePontoVanDestino);

                // Caminho a pé da pousada até o ponto de van
                let rotaAPe = L.polyline([origem, pontoVanCentro.coordenadas], {
                    color: '#007bff',
                    weight: 4,
                    dashArray: '6, 8',
                    opacity: 0.8
                }).addTo(map);
                rotaAPe.bindPopup("Caminhe até o ponto de van");

                // Trajeto de van do ponto escolhido até o ponto de van de destino
                rotaControl = L.Routing.control({
                    waypoints: [
                        L.latLng(pontoVanCentro.coordenadas[0], pontoVanCentro.coordenadas[1]),
                        L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1])
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    show: false,
                    lineOptions: {
                        styles: [{ color: '#ff6b35', weight: 5 }]
                    },
                    createMarker: function() { return null; },
                    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                    fitSelectedRoutes: false,
                    showAlternatives: false
                }).addTo(map);

                rotaControl.on('routeselected', function() {
                    document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
                });

                // Caminho a pé do ponto de van até a praia
                rotaControl2 = L.Routing.control({
                    waypoints: [
                        L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1]),
                        L.latLng(destino[0], destino[1])
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    show: false,
                    lineOptions: {
                        styles: [{ color: '#28a745', weight: 5 }]
                    },
                    createMarker: function() { return null; },
                    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                    fitSelectedRoutes: false,
                    showAlternatives: false
                }).addTo(map);

                rotaControl2.on('routeselected', function() {
                    document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
                });

                let bounds = L.latLngBounds([origem, pontoVanCentro.coordenadas, pontoVanDestino.coordenadas, destino]);
                map.fitBounds(bounds, { padding: [20, 20] });

                rotaAtual = [rotaAPe];
                return;
            } else if (
                nomeDestino === "Praia dos Ossos" ||
                nomeDestino === "Praia de João Fernandes" ||
                nomeDestino === "Praia da Azeda"
            ) {
                nomePontoVanDestino = "Ponto de Van - João Fernandes, Ossos e Azeda";
                pontoVanDestino = transportes.find(t => t.nome === nomePontoVanDestino);

                if (pousadaSelecionada === "pousada3") {
                    pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 4");
                } else {
                    pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 3");
                }

                // Caminho a pé da pousada até o ponto de van
                let rotaAPe = L.polyline([origem, pontoVanCentro.coordenadas], {
                    color: '#007bff',
                    weight: 4,
                    dashArray: '6, 8',
                    opacity: 0.8
                }).addTo(map);
                rotaAPe.bindPopup("Caminhe até o ponto de van");

                // Trajeto de van do ponto escolhido até o ponto de van de destino
                rotaControl = L.Routing.control({
                    waypoints: [
                        L.latLng(pontoVanCentro.coordenadas[0], pontoVanCentro.coordenadas[1]),
                        L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1])
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    show: false,
                    lineOptions: {
                        styles: [{ color: '#ff6b35', weight: 5 }]
                    },
                    createMarker: function() { return null; },
                    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                    fitSelectedRoutes: false,
                    showAlternatives: false
                }).addTo(map);

                rotaControl.on('routeselected', function() {
                    document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
                });

                // Caminho a pé do ponto de van até a praia
                rotaControl2 = L.Routing.control({
                    waypoints: [
                        L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1]),
                        L.latLng(destino[0], destino[1])
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    show: false,
                    lineOptions: {
                        styles: [{ color: '#28a745', weight: 5 }]
                    },
                    createMarker: function() { return null; },
                    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                    fitSelectedRoutes: false,
                    showAlternatives: false
                }).addTo(map);

                rotaControl2.on('routeselected', function() {
                    document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
                });

                let bounds = L.latLngBounds([origem, pontoVanCentro.coordenadas, pontoVanDestino.coordenadas, destino]);
                map.fitBounds(bounds, { padding: [20, 20] });

                rotaAtual = [rotaAPe];
                return;
            }
        } else if (escolha === 'andando') {
            // Rota real da pousada até a praia (apenas 1 rota)
            rotaControl = L.Routing.control({
                waypoints: [
                    L.latLng(origem[0], origem[1]),
                    L.latLng(destino[0], destino[1])
                ],
                routeWhileDragging: false,
                draggableWaypoints: false,
                addWaypoints: false,
                show: false,
                lineOptions: {
                    styles: [{ color: '#28a745', weight: 5 }]
                },
                createMarker: function() { return null; },
                router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                fitSelectedRoutes: true,
                showAlternatives: false
            }).addTo(map);

            rotaControl.on('routeselected', function() {
                document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
            });
            return;
        }
    } else if (nomeDestino === "Praia Brava") {
        let pontoVanCentro, pontoVanDestino;
        // Definir ponto de van de acordo com a pousada
        if (pousadaSelecionada === "pousada3") {
            pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 4");
        } else {
            pontoVanCentro = transportes.find(t => t.nome === "Ponto de Van Centro 3");
        }
        pontoVanDestino = transportes.find(t => t.nome === "Ponto da Brava");

        // Caminho a pé da pousada até o ponto de van
        let rotaAPe = L.polyline([origem, pontoVanCentro.coordenadas], {
            color: '#007bff',
            weight: 4,
            dashArray: '6, 8',
            opacity: 0.8
        }).addTo(map);
        rotaAPe.bindPopup("Caminhe até o ponto de van");

        // Trajeto de van do ponto escolhido até o ponto de van de destino
        rotaControl = L.Routing.control({
            waypoints: [
                L.latLng(pontoVanCentro.coordenadas[0], pontoVanCentro.coordenadas[1]),
                L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1])
            ],
            routeWhileDragging: false,
            draggableWaypoints: false,
            addWaypoints: false,
            show: false,
            lineOptions: {
                styles: [{ color: '#ff6b35', weight: 5 }]
            },
            createMarker: function() { return null; },
            router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
            fitSelectedRoutes: false,
            showAlternatives: false
        }).addTo(map);

        rotaControl.on('routeselected', function() {
            document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
        });

        // Caminho a pé do ponto de van até a praia, passando pelo waypoint
        rotaControl2 = L.Routing.control({
            waypoints: [
                L.latLng(pontoVanDestino.coordenadas[0], pontoVanDestino.coordenadas[1]),
                L.latLng(-22.753560513401528, -41.87723742716553), // Waypoint intermediário
                L.latLng(destino[0], destino[1])
            ],
            routeWhileDragging: false,
            draggableWaypoints: false,
            addWaypoints: false,
            show: false,
            lineOptions: {
                styles: [{ color: '#28a745', weight: 5 }]
            },
            createMarker: function() { return null; },
            router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
            fitSelectedRoutes: false,
            showAlternatives: false
        }).addTo(map);

        rotaControl2.on('routeselected', function() {
            document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
        });

        let bounds = L.latLngBounds([origem, pontoVanCentro.coordenadas, pontoVanDestino.coordenadas, [-22.753560513401528, -41.87723742716553], destino]);
        map.fitBounds(bounds, { padding: [20, 20] });

        rotaAtual = [rotaAPe];
        return;
    }

    // Rota tradicional para outras praias
    rotaControl = L.Routing.control({
        waypoints: [
            L.latLng(origem[0], origem[1]),
            L.latLng(destino[0], destino[1])
        ],
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        show: false,
        lineOptions: {
            styles: [{ color: '#28a745', weight: 5 }]
        },
        createMarker: function() { return null; },
        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
        fitSelectedRoutes: true,
        showAlternatives: false
    }).addTo(map);

    rotaControl.on('routeselected', function() {
        document.querySelectorAll('.leaflet-routing-container').forEach(el => el.style.display = 'none');
    });
}

// Função para calcular rota até casa de câmbio escolhida
function calcularRotaCambio(pousadaId, idxCambio) {
    limparRotas();
    let waypoints = [];
    let destino = casasCambio[idxCambio].coordenadas;

    if (idxCambio === 0) {
        // Casa de Câmbio Centro (primeira)
        if (pousadaId === 'pousada1' || pousadaId === 'pousada2') {
            waypoints = [
                pousadas[pousadaId].coordenadas,
                [-22.757582102181964, -41.88840273405163],
                [-22.756364364187313, -41.888916276049564],
                [-22.75648202050601, -41.88920653891795],
                destino
            ];
        } else if (pousadaId === 'pousada3') {
            waypoints = [
                pousadas[pousadaId].coordenadas,
                [-22.757264432447418, -41.887305476615076],
                [-22.75758504356495, -41.88840911345533],
                [-22.757582102181964, -41.88840273405163],
                [-22.756364364187313, -41.888916276049564],
                [-22.75648202050601, -41.88920653891795],
                destino
            ];
        }
    } else if (idxCambio === 1) {
        // Casa de Câmbio 2 (segunda) - DEFINA SEU CAMINHO MANUAL AQUI
        if (pousadaId === 'pousada1' || pousadaId === 'pousada2') {
            waypoints = [
                pousadas[pousadaId].coordenadas,
                // Adicione aqui os pontos intermediários desejados
                // Exemplo:
                [-22.75758760130499, -41.88841498502879],
                [-22.756355843382707, -41.8888870537867],
                [-22.755871052077936, -41.88746011867754],
                [-22.75537141842264, -41.88586152220187],
                [-22.754827260864644, -41.88610292098548],
                destino
            ];
        } else if (pousadaId === 'pousada3') {
            waypoints = [
                pousadas[pousadaId].coordenadas,
                // Adicione aqui os pontos intermediários desejados
                [-22.757022387707316, -41.88657119070901],
                [-22.755247554894044, -41.88720842013677],
                [-22.7547480506875, -41.886143460947615], 
                destino
            ];
        }
    }

    rotaControl3 = L.polyline(waypoints, {
        color: '#ff6b35',
        weight: 5,
        dashArray: '6, 8',
        opacity: 0.9
    }).addTo(map);
    map.fitBounds(L.latLngBounds(waypoints), { padding: [20, 20] });
}

// ===== FUNÇÕES UTILITÁRIAS =====

function calcularDistancia(coord1, coord2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// ===== COMENTÁRIOS PARA EXPANSÃO =====

/*
COMO ADICIONAR MAIS POUSADAS:
1. Adicione um novo objeto no array 'pousadas' seguindo o padrão existente
2. Adicione uma nova option no select do HTML
3. As coordenadas devem estar no formato [latitude, longitude]

COMO ADICIONAR MAIS PRAIAS:
1. Adicione um novo objeto no array 'praias' com nome, coordenadas, descrição e características
2. O marcador será criado automaticamente

COMO ADICIONAR MAIS PONTOS DE TRANSPORTE:
1. Adicione um novo objeto no array 'transportes'
2. Defina o tipo como 'van' ou 'onibus' para usar o ícone correto

COMO ADICIONAR MAIS EVENTOS:
1. Adicione um novo objeto no array 'eventos'
2. Inclua informações de quando acontece e dicas úteis

COMO MODIFICAR A ROTA DA ESCUNA:
1. Edite o array 'rotaEscunaCoords' adicionando ou removendo coordenadas
2. Cada coordenada representa um ponto de parada

PERSONALIZAÇÃO DE ÍCONES:
- Substitua os arquivos na pasta 'imagens/' por seus próprios ícones
- Mantenha o tamanho 32x32 pixels para melhor visualização
- Formatos suportados: PNG, JPG, SVG

INTEGRAÇÃO COM SITE PRINCIPAL:
- Este mapa pode ser incorporado via iframe: <iframe src="caminho/para/index.html" width="100%" height="600px"></iframe>
- Para abrir em nova aba, use: <a href="caminho/para/index.html" target="_blank">Ver Mapa</a>
*/

// ===== INICIALIZAÇÃO =====

// Torna a variável de resolução do modal global
let geribaModalResolve = null;

// Torna as funções do modal globais
function showGeribaModal() {
    return new Promise(resolve => {
        geribaModalResolve = resolve;
        document.getElementById('modal-geriba').style.display = 'flex';
    });
}
function hideGeribaModal() {
    document.getElementById('modal-geriba').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarMapa();

    // Configura os botões do modal de Geribá imediatamente após o DOM estar pronto
    const btnAndando = document.getElementById('btn-andando');
    const btnVan = document.getElementById('btn-van');
    if (btnAndando && btnVan) {
        btnAndando.onclick = function() {
            hideGeribaModal();
            if (geribaModalResolve) geribaModalResolve('andando');
        };
        btnVan.onclick = function() {
            hideGeribaModal();
            if (geribaModalResolve) geribaModalResolve('van');
        };
    }
});

// Função para limpar rotas
function limparRotas() {
    if (rotaControl) {
        map.removeControl(rotaControl);
        rotaControl = null;
    }
    if (rotaControl2) {
        map.removeControl(rotaControl2);
        rotaControl2 = null;
    }
    if (rotaControl3) {
        map.removeLayer(rotaControl3);
        rotaControl3 = null;
    }
    if (rotaAtual && Array.isArray(rotaAtual)) {
        rotaAtual.forEach(r => {
            if (r && map.hasLayer(r)) map.removeLayer(r);
        });
        rotaAtual = null;
    }
}

// ===== CONFIGURAÇÃO DOS FILTROS DA LEGENDA =====
function configurarFiltrosLegenda() {
    // Filtro para pousadas
    document.getElementById('filtro-pousadas').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(grupoMarcadores.pousadas);
        } else {
            map.removeLayer(grupoMarcadores.pousadas);
        }
    });

    // Filtro para praias
    document.getElementById('filtro-praias').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(grupoMarcadores.praias);
        } else {
            map.removeLayer(grupoMarcadores.praias);
        }
    });

    // Filtro para transportes (van e ônibus)
    document.getElementById('filtro-van').addEventListener('change', function(e) {
        if (marcadoresVan) {
            marcadoresVan.forEach(marker => {
                if (e.target.checked) {
                    if (!map.hasLayer(marker)) map.addLayer(marker);
                } else {
                    if (map.hasLayer(marker)) map.removeLayer(marker);
                }
            });
        }
    });

    document.getElementById('filtro-onibus').addEventListener('change', function(e) {
        if (marcadoresOnibus) {
            marcadoresOnibus.forEach(marker => {
                if (e.target.checked) {
                    if (!map.hasLayer(marker)) map.addLayer(marker);
                } else {
                    if (map.hasLayer(marker)) map.removeLayer(marker);
                }
            });
        }
    });

    // Filtro para escuna (rota e marcadores)
    document.getElementById('filtro-escuna').addEventListener('change', function(e) {
        if (rotaEscuna) {
            if (e.target.checked) {
                if (!map.hasLayer(rotaEscuna)) map.addLayer(rotaEscuna);
            } else {
                if (map.hasLayer(rotaEscuna)) map.removeLayer(rotaEscuna);
            }
        }
        if (marcadoresEscuna) {
            marcadoresEscuna.forEach(marker => {
                if (e.target.checked) {
                    if (!map.hasLayer(marker)) map.addLayer(marker);
                } else {
                    if (map.hasLayer(marker)) map.removeLayer(marker);
                }
            });
        }
    });

    // Filtro para feirinha
    document.getElementById('filtro-feirinha').addEventListener('change', function(e) {
        if (marcadoresFeirinha) {
            marcadoresFeirinha.forEach(marker => {
                if (e.target.checked) {
                    if (!map.hasLayer(marker)) map.addLayer(marker);
                } else {
                    if (map.hasLayer(marker)) map.removeLayer(marker);
                }
            });
        }
    });

    // Filtro para casas de câmbio
    document.getElementById('filtro-cambio').addEventListener('change', function(e) {
        if (marcadores.casasCambio) {
            marcadores.casasCambio.forEach(marker => {
                if (e.target.checked) {
                    if (!map.hasLayer(marker)) map.addLayer(marker);
                } else {
                    if (map.hasLayer(marker)) map.removeLayer(marker);
                }
            });
        }
    });
}
