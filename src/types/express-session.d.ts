import 'express-session';

declare module 'express-session' {
  interface SessionData {
    enfant?: {
      id: number;
      firstName: string;
      niveau: number;
      age: number;
    };
  }
}
