# Análise de Performance — bruno-simon.com

Análise das estratégias de engenharia por trás da fluidez do portfólio 3D interativo de Bruno Simon, construído sobre Three.js. Stack confirmada: **Three.js** (com suporte a WebGL e WebGPU via **TSL — Three.js Shading Language**), **Rapier** para física, **Howler.js** para áudio, ativos modelados em **Blender**.

## 1. Estratégias de Asset Loading

- **Compressão geométrica com Draco**: os modelos exportados do Blender passam por compressão Draco antes de chegar ao GLTF/GLB final. Isso reduz drasticamente o peso de malhas complexas (o carro, o mapa, os elementos decorativos), já que a geometria é o maior custo de transferência em uma cena com centenas de objetos.
- **Um único arquivo de cena consolidado**: em vez de múltiplos requests para dezenas de modelos separados, a prática usual nesse tipo de projeto é exportar a cena inteira (ou grandes blocos dela) como um único GLB. Isso reduz overhead de conexões HTTP simultâneas e permite que o parser GLTF resolva referências de uma vez, evitando "pop-in" de objetos aparecendo fora de ordem.
- **Texture atlasing e reuso de materiais**: texturas são combinadas em atlases e os materiais são reaproveitados entre objetos semelhantes (blocos do mapa, elementos repetidos). Menos texturas únicas significa menos trocas de estado (state changes) na GPU durante o draw call, o que impacta diretamente o FPS mais do que o tamanho do arquivo em si.
- **Compressão de textura para GPU (Basis/KTX2)**: texturas ficam comprimidas em formato nativo de GPU, evitando que a placa de vídeo precise descomprimir on-the-fly formatos como JPEG/PNG a cada frame — a textura já chega na memória de vídeo no formato final.
- **Loading assíncrono com feedback progressivo**: o carregamento é feito via `LoadingManager` do Three.js, permitindo agregar o progresso de múltiplos loaders (GLTF, texturas, áudio) em uma única barra de progresso, e assim adiar a inicialização do loop de renderização até que os assets críticos estejam prontos — evitando "cena incompleta" piscando na tela.
- **Shaders pré-compilados e "warm-up" de material**: antes de exibir a cena, materiais/shaders são forçados a compilar (via um render de warm-up fora da tela) para que o primeiro frame visível não sofra o stutter clássico de compilação de shader em tempo real.

## 2. Gerenciamento do Loop de Renderização

- **Loop único e centralizado**: existe apenas um `requestAnimationFrame` orquestrando toda a cena — física, animações, câmera e render — evitando múltiplos loops concorrentes que competeriam por frame budget e gerariam jitter.
- **Delta time desacoplado do frame rate**: todas as atualizações (posição do carro, animações, partículas) usam o delta entre frames em vez de incrementos fixos, o que garante consistência de movimento independentemente de quedas momentâneas de FPS (dispositivos mais fracos não "aceleram" nem "andam em câmera lenta").
- **Frustum culling automático**: o Three.js já descarta objetos fora do campo de visão da câmera antes do draw call; em uma cena aberta como essa, isso evita renderizar geometria que está atrás do jogador ou em áreas distantes do mapa.
- **Instancing para elementos repetidos**: objetos que se repetem em massa (grama, blocos, elementos decorativos do mapa) são desenhados via `InstancedMesh`, reduzindo centenas de draw calls individuais a uma única chamada por tipo de objeto — o gargalo mais comum em cenas WebGL densas.
- **Level of Detail (LOD) implícito por distância de física/câmera**: elementos fora do alcance de interação relevante recebem menos processamento de física e colisão, já que o Rapier permite ativar/desativar corpos rígidos dinamicamente (sleeping bodies), liberando CPU para o que está próximo da câmera.
- **Gerenciamento de memória e disposal**: geometrias, materiais e texturas descartados (troca de qualidade gráfica, remoção de objetos) são explicitamente destruídos (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`), prevenindo vazamento de memória de GPU que aos poucos derrubaria o FPS em sessões longas.
- **Configurações de qualidade ajustáveis em runtime**: o próprio menu de opções (renderer, qualidade) sugere que o pixel ratio, resolução de sombras e pós-processamento são parametrizados e recalculados sob demanda, permitindo degradação graciosa em hardware mais fraco sem recarregar a aplicação.

## 3. Arquitetura de Interação

- **Separação entre estado de física e estado de renderização**: a simulação de física roda em um passo fixo (Rapier), independente do passo de renderização, e o Three.js apenas lê a posição resultante dos corpos rígidos a cada frame. Isso evita que o custo de interpolação visual interfira na estabilidade da simulação física (e vice-versa).
- **Eventos de input desacoplados do loop de render**: listeners de mouse, teclado e touch atualizam apenas um objeto de estado (ex.: vetor de input do carro), que é lido no próximo tick do loop — não há lógica pesada disparada diretamente dentro do handler do evento, o que evitaria bloquear a thread principal em momentos de alta frequência de eventos (ex.: `mousemove`).
- **Raycasting sob demanda, não contínuo**: interações com objetos da cena (cliques em painéis, elementos clicáveis do mundo) usam raycasting pontual no momento do clique, e não a cada frame, economizando o custo de interseção geométrica constante.
- **Camera rig independente da lógica de jogo**: a câmera segue o carro através de um sistema de "spring"/interpolação suave (lerp) que consome a posição do corpo físico sem acoplamento direto — permite ajustar sensação de câmera sem alterar a simulação.
- **UI sobreposta em HTML/CSS, não em canvas 3D**: painéis de mapa, opções, conquistas e temporizadores são DOM sobreposto ao canvas WebGL, não geometria 3D renderizada. Isso mantém a interface responsiva a interações (hover, clique, foco) usando o pipeline de layout do navegador, sem competir com o orçamento de frame da cena 3D.

## 4. Stack e Padrões

| Camada | Tecnologia | Papel |
|---|---|---|
| Renderização | Three.js (WebGL + WebGPU) | Motor de cena, câmera, materiais |
| Shading cross-renderer | TSL (Three.js Shading Language) | Permite escrever shaders uma vez e rodar tanto em WebGL quanto WebGPU, evitando duplicar lógica de GLSL/WGSL |
| Física | Rapier (Rust compilado para WASM) | Simulação de corpos rígidos e colisões com performance próxima de nativa dentro do navegador |
| Áudio | Howler.js | Gerenciamento de múltiplas faixas e efeitos sonoros com fallback entre Web Audio API e HTML5 Audio |
| Modelagem | Blender (fonte aberta no GitHub do projeto) | Pipeline de arte com exportação otimizada para GLTF/Draco |
| Build | Webpack (bundling) | Empacotamento e code-splitting do JS |

**Por que essa combinação mantém o bundle leve:**

- Usar **WASM (Rapier)** para física em vez de uma implementação pura em JS reduz custo de CPU por frame sem inflar o bundle com um motor de física JS mais pesado.
- **TSL** evita a necessidade de manter dois conjuntos de shaders (GLSL para WebGL, WGSL para WebGPU), reduzindo código duplicado e superfície de bugs, ao mesmo tempo em que abre caminho para aproveitar WebGPU em navegadores compatíveis sem reescrever a camada visual.
- Delegar carregamento e streaming de assets ao pipeline nativo do Three.js (`GLTFLoader` + `DRACOLoader`) evita reinventar parsers próprios, mantendo o JS de aplicação focado em lógica de jogo/interação em vez de infraestrutura de assets.
- A escolha de **Howler.js**, uma biblioteca pequena e focada, em vez de um framework de áudio mais completo, é coerente com a filosofia geral do projeto: cada dependência resolve um problema específico sem trazer peso adicional de features não utilizadas.

**Conclusão de engenharia**: a fluidez do site não vem de um único truque, mas da soma de decisões que reduzem, em cada camada (rede, GPU, CPU, DOM), o trabalho desnecessário por frame — menos draw calls, menos bytes transferidos, menos re-parsing de shader, menos acoplamento entre física/render/input. É um exemplo de otimização "por atrito zero": cada sistema faz exatamente o necessário e nada além disso a cada tick.
