# AI Chatbot — Next.js + Llama 3

Chatbot con inteligencia artificial desplegado en producción. Construido con Next.js, TypeScript y el modelo Llama 3 8B de Meta vía HuggingFace.

**Demo en vivo:** [ai-chatbot-nine-xi-42.vercel.app](https://ai-chatbot-nine-xi-42.vercel.app)

---

##  Características

- Chat en tiempo real con IA (Llama 3 8B)
- La IA recuerda el contexto de la conversación
- Historial de chats guardado localmente
- Crear y eliminar conversaciones
- Diseño responsive (móvil y desktop)
- UI oscura inspirada en Claude

---

## Tecnologías

| Área | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| IA | HuggingFace — Meta Llama 3 8B Instruct |
| Despliegue | Vercel |

---

## Estructura del proyecto

app/
api/chat/route.ts        # API Route — conecta con HuggingFace
chat/
page.tsx               # Página principal del chat
types.ts               # Tipos compartidos de TypeScript
components/
Sidebar.tsx          # Panel de historial de chats
MessageList.tsx      # Lista de mensajes
InputBar.tsx         # Input y botón de enviar
layout.tsx               # Layout global
page.tsx                 # Redirige a /chat

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

HF_TOKEN=tu_token_de_huggingface

Puedes obtener tu token gratis en [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Autor

**Franklin Mendoza**
- GitHub: [@Frankmendo](https://github.com/Frankmendo)
- Email: fw.mendoza@hotmail.com