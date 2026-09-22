# AI Chatbot — Next.js + Google Gemini

Chatbot con inteligencia artificial desplegado en producción. Construido con Next.js, TypeScript y Google Gemini mediante la API de Gemini.

**Demo en vivo:** https://ai-chatbot-nine-xi-42.vercel.app

---

## Características

* Chat en tiempo real con IA (Google Gemini)
* La IA recuerda el contexto de la conversación
* Historial de chats guardado localmente
* Crear y eliminar conversaciones
* Diseño responsive (móvil y desktop)
* UI oscura inspirada en Claude

---

## Tecnologías

| Área       | Tecnología                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 14 (App Router)          |
| Lenguaje   | TypeScript                       |
| Estilos    | Tailwind CSS                     |
| IA         | Google Gemini — Gemini 3.6 Flash |
| SDK        | `@google/genai`                  |
| Despliegue | Vercel                           |

---

## Estructura del proyecto

```text
app/
├── api/
│   └── chat/
│       └── route.ts        # API Route — conecta con Google Gemini
├── chat/
│   └── page.tsx            # Página principal del chat
├── types.ts                # Tipos compartidos de TypeScript
├── components/
│   ├── Sidebar.tsx         # Panel de historial de chats
│   ├── MessageList.tsx     # Lista de mensajes
│   └── InputBar.tsx        # Input y botón de enviar
├── layout.tsx              # Layout global
└── page.tsx                # Redirige a /chat
```

---

## Correr el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Frankmendo/ai-chatbot.git

cd ai-chatbot
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_de_gemini
```

Obtén tu API key desde Google AI Studio.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

---

## Despliegue

El proyecto está desplegado en Vercel.

Para producción se debe configurar la siguiente variable de entorno:

```text
GEMINI_API_KEY
```

---

## Autor

**Franklin Mendoza**

* GitHub: @Frankmendo
