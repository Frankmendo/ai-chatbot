export type Message = {
  text: string;
  sender: "user" | "ai";
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};