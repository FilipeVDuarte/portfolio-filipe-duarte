# Cavaleiro de Latão — Documentação do Projeto

> Roguelike autoral desenvolvido em Godot 4.2 | Projeto de conclusão de curso — Produção Multimídia, Centro Universitário Senac RS (2024)

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Objetivo](#objetivo)
3. [Metodologia — It's Only a Game (Jim Wallman)](#metodologia)
4. [Universo & Narrativa](#universo--narrativa)
5. [Personagens](#personagens)
6. [Galeria de Inimigos — Folclore Brasileiro](#galeria-de-inimigos)
7. [Design de Nível](#design-de-nível)
8. [Pipeline de Arte](#pipeline-de-arte)
9. [Arquitetura Técnica](#arquitetura-técnica)
10. [Trilha Sonora](#trilha-sonora)
11. [Resultados & Métricas](#resultados--métricas)
12. [Roadmap](#roadmap)
13. [Referências](#referências)

---

## Visão Geral

| Campo | Detalhe |
|---|---|
| Título | Cavaleiro de Latão |
| Gênero | Roguelike / Survival (inspirado em Vampire Survivors) |
| Engine | Godot 4.2 — Forward Plus |
| Exportação | HTML5 (sem instalação) |
| Período | Ago 2022 → atual (lançamento: 31 jul 2024) |
| Plataforma de publicação | [itch.io](https://filipeduarte.itch.io/cavaleiro-de-latao) |
| Repositório | [github.com/FilipeVDuarte/ProjetoCavaleiro](https://github.com/FilipeVDuarte/ProjetoCavaleiro) |
| Licença | CC BY-NC-ND 4.0 |
| Classificação indicativa | 14+ (morte intencional — Guia Prático de Audiovisual, 3ª ed., 2018) |

**Origem:** Uma cena 3D de uma taverna medieval improvisada virou o ponto de partida de um universo inteiro. Do ambiente surgiu o personagem; do personagem surgiu a narrativa.

---

## Objetivo

Desenvolver um jogo independente com personagem e história autorais, utilizando pixel art para criar um ambiente envolvente e imersivo para jogadores de todas as idades — e ao mesmo tempo trazer visibilidade para o **folclore brasileiro**, mostrando que existe muito além dos personagens mais superficiais (Corpo Seco, Cuca, Mula Sem Cabeça, etc.).

Sessão de jogo alvo: **1 a 2 horas**, dependendo dos caminhos escolhidos pelo jogador.

---

## Metodologia

### "It's Only a Game" — Jim Wallman (2007)

O projeto seguiu os cinco passos da metodologia de design de jogos de Jim Wallman. Os passos **não são lineares** — foram repetidos várias vezes ao longo do desenvolvimento.

---

### Passo 01 — Identificação do Objetivo

> *O objetivo do jogo deve ser desafiador o bastante para manter os jogadores envolvidos, sem desmotivá-los.*

**Aplicação no projeto:**
- Roguelike de sobrevivência com Ficino Flores investigando o desaparecimento do pai
- Sessão de 1–2h com liberdade para escolher a ordem de exploração entre três caminhos
- Submetas: acumular moedas e recursos, vencer com o mínimo de derrotas

---

### Passo 02 — Definição das Regras

> *Regras claras e equilibradas em quatro áreas: nível de dificuldade, formas de resolução, tipo de jogo e layout da interface.*

**As quatro áreas (Wallman):**

| Área | Descrição | Aplicação |
|---|---|---|
| **Nível** | Grau de dificuldade — desafiador sem frustrar | DifficultySystem com rampa linear + onda senoidal |
| **Resolução** | Como o jogador resolve situações | Escolha livre da ordem das fases; sistema de upgrades entre ondas |
| **Tipo de jogo** | Gênero e características específicas | Roguelike/survival com elementos de progressão permanente |
| **Layout** | Disposição e clareza da interface | HUD com barra de vida, contadores visíveis, minimapa |

**Regras definidas:**
- Movimento em 8 direções por toda a área jogável
- Combate livre — agilidade para esquivar e atacar brechas
- Cada inimigo tem tempo específico de ataque (assimilável pelo jogador)
- Upgrades ao vencer chefes de fase
- Game over mostra: tempo sobrevivido, recursos coletados, inimigos derrotados

**Recursos (Wallman):** audiência (14+), tempo (1–2h de sessão), equipamentos (HTML5, sem instalação; gamepad suportado)

---

### Passo 03 — Contexto Envolvente

> *Cenário coeso, personagens com motivações claras e enredo que mantém o interesse ao longo da sessão.*

**Aplicação:** Continente de Auslone atacado por monstros criados por um bruxo maligno; armadura de latão com propriedades mágicas que se adapta ao usuário; inimigos baseados no folclore brasileiro; trilha sonora 100% baseada em obras brasileiras.

*Ver seções [Universo & Narrativa](#universo--narrativa), [Personagens](#personagens) e [Galeria de Inimigos](#galeria-de-inimigos).*

---

### Passo 04 — Desenvolvimento dos Assets

> *Assets projetados com atenção ao detalhe, testados para garantir funcionalidade e equilíbrio visual.*

**Pipeline misto:**
```
Blender (referência 3D) → Aseprite (pixel art 8/16-bit) → Photoshop (tratamento) → Illustrator (vetores)
```

*Ver seção [Pipeline de Arte](#pipeline-de-arte).*

---

### Passo 05 — Teste e Refinamento

> *Processo iterativo — testar, identificar problemas, coletar feedback, refinar antes do lançamento.*

**Aplicação:**
- Playtests com amigos durante o desenvolvimento
- Publicação no itch.io para feedback aberto da comunidade
- 75 commits documentam iterações de balanceamento, correções de hitbox e ajustes de acessibilidade (legendas)

---

## Universo & Narrativa

O continente de **Auslone** está sob ataque de monstros conjurados por um bruxo com poderes atemporais. No centro desta história está uma armadura de latão — criada com propriedades mágicas que se adaptam àquele que a veste — e uma busca que é, acima de tudo, uma jornada de autodescoberta.

### Sinopse

Ficino Flores parte em busca de seu pai desaparecido. Ao chegar ao Reino Élfico, é convocado a ajudar contra criaturas que assolam as terras nortenhas. Após derrotar os monstros de duas regiões, descobre que são obra de um mesmo bruxo poderoso. No último reino, um estrondoso rugido vindo do norte o leva ao confronto final: um colossal dragão metálico de latão, quase tão grande quanto uma província.

### O Twist Central

O vilão **Edius** é, na verdade, o próprio **Ficino de outra linha temporal** — alguém que buscou conhecimento mágico e poder sobrenatural além do comum, chegando ao ponto de raptar e transformar o próprio pai em seu arauto.

---

## Personagens

### Ficino Flores — Protagonista

- **Origem:** Filho de um florista, cresceu curioso e aventureiro. Tornou-se membro ativo da comunidade, usando inteligência para resolver problemas.
- **Motivação:** Encontrar o pai desaparecido. A busca se torna uma jornada de autoconhecimento e crescimento pessoal.
- **Companheira:** Maga Mel
- **Progressão:** Ao longo do jogo adquire itens, equipamentos e habilidades especiais. Jogadores que já completaram o jogo podem ir direto ao boss final — mas sem os upgrades acumulados, a dificuldade é maior.

### Edius — Antagonista Principal (Bruxo)

- **Motivação:** Obcecado por conhecimento mágico e poder sobrenatural. Quer descobrir segredos ocultos do tempo e alcançar compreensão além do comum.
- **Twist:** É o próprio Ficino de outra linha temporal.
- **Mecânica de combate:** Três fases de combate com estratégias distintas. Inflige dano mesmo quando o jogador defende — força esquiva. Passa por transformações ao longo da luta. Durante o confronto final pode interagir verbalmente, lançar provocações e tentar corromper o protagonista.

### Altair Flores — Pai do Protagonista / Dragão (Sub-boss Final)

- **Origem:** Grande cavaleiro de uma ordem metálica. Escolheu uma vida tranquila com o filho.
- **Situação atual:** Capturado por Edius e transformado em dragão metamorfo metálico de latão — o maior que já existiu em Auslone.
- **Motivação:** Romper o controle de Edius, recuperar sua liberdade e honra.
- **Desfecho variável:** Dependendo das ações do jogador — se continuar atacando após derrotado, Altair volta à forma humana mas morre pelos ferimentos. Se o jogador parar, pode ser redimido.

---

## Galeria de Inimigos

**Diferencial do projeto:** todos os adversários são baseados no **folclore brasileiro** — não são monstros genéricos de fantasia medieval.

| Inimigo | Origem | Descrição |
|---|---|---|
| **Capiguará** *(Boss 1)* | Não-Natural | Mistura feroz de capivara e lobo-guará. Corpo robusto com pernas ágeis e garras como navalhas. Caçador implacável com inteligência incomum. Ameaça em terra e na água. |
| **Corpo Seco** | Não-Natural | Resultado de maldição contra quem ofendeu bruxa ou feiticeiro. Corpo mumificado que continua a viver. Perambula por florestas e ruínas com movimento sinistro. |
| **Cucas** | Natural | Seres reptilianos escamosos com olhos amarelos brilhantes e garras afiadas. Inteligentes, astutas, camuflagem natural. Emitem som estridente quando ameaçadas. |
| **Mula Sem Cabeça** | Não-Natural | Ataca quem anda sozinho à noite. Presságio de morte ou desgraça — mas há relatos de mulas que ajudaram pessoas em perigo. |
| **Quibungo** | — | Figura do folclore afro-brasileiro |
| **Mapinguari** | — | Criatura gigante das lendas amazônicas |
| **Matinta** | — | Pássaro/entidade do folclore amazônico |
| **Papa Figo** | — | Entidade que ataca crianças no folclore nordestino |
| **Mãe-do-Ouro** | — | Guardiã de tesouros enterrados |
| **Capelobo** | — | Ser do folclore paraense |
| **Zaoris** | — | Entidade autoral inserida no universo do jogo |
| **Gralha-Azul** | — | Ave símbolo do Paraná, ressignificada no universo do jogo |

> **Nota:** durante a produção, alguns monstros poderão ser cortados conforme o escopo das fases.

---

## Design de Nível

### Estrutura de Fases

```
Menu Inicial → Cenas Narrativas → Mapa (escolha de rota)
                                        ↓
                               Fase 1 (floresta) → Boss: Capiguará
                                        ↓
                               Fase 2 (medieval) → Boss: Dragão/Altair
                                        ↓
                                   Confronto Final: Edius (3 fases)
```

### Fase 1 — Floresta
- Ambientação baseada na parte florestal do continente de Auslone
- 4 objetivos a completar no mapa para acessar o boss
- Boss: Capiguará

### Fase 2 — Medieval *(em desenvolvimento)*
- Ambientação medieval
- 4 objetivos com inimigos mais fortes
- Boss: Dragão (Altair Flores)

### Princípios de Level Design aplicados
- Fluxo coerente com exploração natural
- Progressão de dificuldade entre fases
- Pontos de interesse: locais secretos, NPCs com informações, tesouros
- Equilíbrio: desafio ≠ frustração
- Ordem de exploração livre (mapa com 3 rotas)

---

## Pipeline de Arte

```
┌─────────────────────────────────────────────────────────┐
│  1. BLENDER — Modelagem 3D                              │
│     Referência de perspectiva e proporção               │
│     Nunca usado como arte final                         │
└──────────────────────────┬──────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  2. ASEPRITE — Pixel Art                                │
│     Estilo 8/16-bit                                     │
│     Cada sprite redesenhado manualmente a partir        │
│     das referências 3D                                  │
└──────────────────────────┬──────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  3. ADOBE PHOTOSHOP — Tratamento                        │
│     Pós-processamento e ajustes finais                  │
└──────────────────────────┬──────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  4. ADOBE ILLUSTRATOR — Vetores                         │
│     Elementos de interface e assets vetoriais           │
└─────────────────────────────────────────────────────────┘
```

**Decisão-chave:** manter o Blender como ferramenta de referência — modelos 3D geram perspectivas e proporções consistentes impossíveis de manter manualmente. A partir dessas referências, cada sprite é redesenhado do zero, criando uma estética coesa que mistura solidez tridimensional com o charme da arte em pixels.

**Escolha estética:** pixel art retrô foi adotada também por limitação de recursos — permite desenvolvimento mais equilibrado para um projeto solo.

---

## Arquitetura Técnica

**Engine:** Godot 4.2 — Forward Plus  
**Linguagem:** GDScript  
**Métricas:** 75 commits · 27 scripts `.gd`

### Sistemas principais

#### GameManager (Autoload Singleton)
Centraliza o estado global sem que as cenas precisem se referenciar diretamente:
- Posição do jogador
- Contadores de moedas e quests
- Flag `is_game_over`

#### Player (CharacterBody2D)
- Registra-se no `GameManager` via `_ready()`
- Expõe sinais tipados: `coin_collected`, `quest_collected`
- Qualquer sistema pode consumir esses sinais sem acoplamento direto

#### MobSpawner
- Percorre um `PathFollow2D` circular via `progress_ratio = randf()`
- Gera pontos de spawn fora do campo de visão
- Query de física 2D descarta posições sobrepostas a paredes antes de instanciar a cena

#### DifficultySystem — Rampa Linear + Onda Senoidal

```gdscript
# Rampa linear: taxa de spawn cresce com o tempo de sessão
var spawn_rate = initial_spawn_rate + spawn_rate_per_minute * (time / 60.0)

# Onda senoidal: cria picos e vales de pressão a cada wave_duration segundos
var sin_wave = sin((time * TAU) / wave_duration)
var wave_factor = remap(sin_wave, -1.0, 1.0, break_intensity, 1.0)
spawn_rate *= wave_factor

mob_spawner.mob_per_minute = spawn_rate
```

**Parâmetros `@export`** — ajuste de ritmo direto no Inspector sem tocar no código:

| Parâmetro | Valor padrão | Função |
|---|---|---|
| `initial_spawn_rate` | 60.0 | Taxa inicial de spawn (mobs/min) |
| `spawn_rate_per_minute` | 30.0 | Aceleração da rampa linear |
| `wave_duration` | 20.0 | Período da onda senoidal (seg) |
| `break_intensity` | 0.5 | Mínimo da onda (50% da taxa máxima) |

**Resultado:** tensão sem ondas explícitas — o jogador sente picos e vales naturais de pressão a cada ~20 segundos, com dificuldade crescente ao longo da sessão.

### Outros recursos técnicos
- Suporte a gamepad
- Exportação direta para HTML5 (Godot 4.2 Forward Plus)
- Sistema de upgrades entre ondas
- Tela de game over com estatísticas da sessão
- Legendas (ajuste de acessibilidade)

---

## Trilha Sonora

- **Estilo:** Neo-clássica que emula a estética 8-bits de videogames clássicos
- **Conteúdo:** 100% baseado em obras brasileiras — reinterpretações de música tradicional brasileira
- **Ferramenta:** GarageBand
- **Objetivo:** criar atmosfera nostálgica que reforça a conexão entre o jogo e a identidade cultural brasileira

A trilha sonora segue a mesma lógica da galeria de inimigos: a identidade cultural brasileira não é apenas visual — é também auditiva. A sincronização música/visual sustenta o folclore como diferencial central do projeto.

---

## Resultados & Métricas

| Métrica | Valor |
|---|---|
| Commits | 75 (Jun–Jul 2024) |
| Scripts GDScript | 27 arquivos `.gd` |
| Engine | Godot 4.2 — Forward Plus |
| Exportação | HTML5 sem instalação |
| Fases entregues | Level 1 + Boss Capiguará |
| Publicação | itch.io — jul 2024 |

**Do tédio ao lançamento.** O projeto passou de uma cena 3D improvisada de uma taverna a um jogo completo em versão Alpha, publicado e jogável diretamente no navegador. O projeto segue em desenvolvimento ativo.

---

## Roadmap

- [x] Bootsplash
- [x] Menu Inicial
- [x] Menu de Pause
- [x] Movimentação do Player
- [x] Ataque simples
- [x] Itens Coletáveis
- [x] Fase 1
- [x] Quest — Coletar ícones pelo mapa
- [x] Fase Boss — Capiguará
- [ ] Fase 2
- [ ] Quest — Derrotar determinada quantidade de inimigos
- [ ] Quest — Coletar ícones pelo mapa
- [ ] Fase Boss — Dragão (Altair)

---

## Referências

- WALLMAN, Jim. **"It's Only a Game" — Game Design Methodology**. 2007. Disponível em: http://www.jimwallman.org.uk/clwg/its%20only%20a%20game%202.pdf. Acesso em: 25 mai. 2023.
- CLASSIND. **Guia Prático de Audiovisual — 3ª Edição**. Ministério da Justiça, 2018.
- Rascunho original de animação do Cavaleiro de Latão: [Behance](https://www.behance.net/gallery/152851967/Animacao-Cavaleiro-de-Latao)
- Jogo publicado: [itch.io/cavaleiro-de-latao](https://filipeduarte.itch.io/cavaleiro-de-latao)
- Repositório: [github.com/FilipeVDuarte/ProjetoCavaleiro](https://github.com/FilipeVDuarte/ProjetoCavaleiro)
