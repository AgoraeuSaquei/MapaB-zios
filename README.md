# Mapa Turístico de Búzios - Guia para Hóspedes

## 📋 Descrição

Este é um mapa interativo desenvolvido especificamente para hóspedes de pousadas em Búzios, RJ. O mapa oferece uma experiência completa de navegação turística com informações sobre praias, transportes, eventos e rotas personalizadas.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Mapa fullscreen responsivo** com Leaflet.js
- **Seleção de pousada** via dropdown
- **Marcadores categorizados**:
  - 🏨 Pousadas (3 exemplos)
  - 🏖️ Praias (7 principais praias de Búzios)
  - 🚐 Pontos de Van
  - 🚌 Pontos de Ônibus
  - 🎉 Eventos semanais
- **Rota marítima da escuna** com linha animada
- **Cálculo de rotas e distâncias** da pousada selecionada
- **Popups informativos** com detalhes de cada local
- **Legenda visual** com todos os tipos de marcadores
- **Design responsivo** para desktop e mobile

### 🎯 Características Técnicas
- Carregamento via CDN (sem dependências npm)
- Ícones personalizados para cada categoria
- Animações CSS suaves
- Interface intuitiva e acessível
- Código bem comentado para fácil manutenção

## 📁 Estrutura de Arquivos

```
buzios_mapa_turistico/
├── index.html          # Página principal do mapa
├── mapa.js            # Lógica JavaScript e dados
├── style.css          # Estilos CSS responsivos
├── imagens/           # Ícones dos marcadores
│   ├── pousada.png    # Ícone de pousadas
│   ├── praia.png      # Ícone de praias
│   ├── van.png        # Ícone de vans
│   ├── onibus.png     # Ícone de ônibus
│   └── escuna.png     # Ícone de escuna
└── README.md          # Este arquivo
```

## 🛠️ Como Usar

### Integração ao Site Principal

**Opção 1 - Nova Aba:**
```html
<a href="caminho/para/buzios_mapa_turistico/index.html" target="_blank">
    Ver Mapa Turístico
</a>
```

**Opção 2 - iFrame:**
```html
<iframe src="caminho/para/buzios_mapa_turistico/index.html" 
        width="100%" height="600px" frameborder="0">
</iframe>
```

### Funcionalidades do Usuário

1. **Selecionar Pousada**: Use o dropdown no header
2. **Visualizar Informações**: Clique nos marcadores para ver popups
3. **Calcular Rotas**: Após selecionar pousada, clique em praias para ver rotas
4. **Centralizar Mapa**: Use o botão "🎯 Centralizar Mapa"
5. **Navegar**: Use zoom e arrastar para explorar

## 🔧 Personalização

### Adicionar Mais Pousadas

1. **No arquivo `mapa.js`**, adicione ao objeto `pousadas`:
```javascript
pousada4: {
    nome: "Nova Pousada",
    coordenadas: [-22.7500, -41.8850],
    descricao: "Descrição da pousada",
    telefone: "(22) 9999-9999",
    site: "www.novapousada.com.br"
}
```

2. **No arquivo `index.html`**, adicione ao select:
```html
<option value="pousada4">Nova Pousada</option>
```

### Adicionar Mais Praias

No arquivo `mapa.js`, adicione ao array `praias`:
```javascript
{
    nome: "Nova Praia",
    coordenadas: [-22.7600, -41.8900],
    descricao: "Descrição da praia",
    caracteristicas: "Características especiais"
}
```

### Modificar Ícones

Substitua os arquivos PNG na pasta `imagens/` mantendo:
- Tamanho: 32x32 pixels
- Formato: PNG com transparência
- Nomes dos arquivos inalterados

### Personalizar Cores

No arquivo `style.css`, modifique as variáveis de cor:
- Header: `#2c5aa0` (azul principal)
- Botões: `#ff6b35` (laranja)
- Rotas: `#28a745` (verde)

## 📱 Responsividade

O mapa se adapta automaticamente a diferentes tamanhos de tela:
- **Desktop**: Layout completo com header horizontal
- **Tablet**: Header compacto, legenda ajustada
- **Mobile**: Header vertical, controles simplificados

## 🗺️ Dados Incluídos

### Pousadas (3 exemplos)
- Pousada 1, 2 e 3 com coordenadas fictícias
- Pronto para substituição por dados reais

### Praias (7 principais)
- Geribá, Ferradura, Forno, João Fernandes
- Brava, Tartaruga, Ossos
- Com descrições e características

### Transporte
- 2 pontos de van com horários e preços
- 2 pontos de ônibus urbano e rodoviário

### Eventos
- Feirinha de artesanato
- Shows na Orla Bardot
- Festival gastronômico

### Rota da Escuna
- Saída da Orla Bardot
- 2 paradas em ilhas
- Linha animada no mapa

## 🔄 Próximos Passos

Para personalizar completamente:

1. **Substitua dados fictícios** pelas informações reais das pousadas
2. **Atualize coordenadas** com localizações precisas
3. **Personalize ícones** com a identidade visual desejada
4. **Adicione mais pontos** de interesse conforme necessário
5. **Teste em diferentes dispositivos** para garantir responsividade

## 📞 Suporte

O código está amplamente comentado para facilitar modificações. Cada seção possui instruções detalhadas sobre como expandir funcionalidades.

---

**Desenvolvido para proporcionar a melhor experiência turística aos hóspedes de Búzios! 🏖️**

