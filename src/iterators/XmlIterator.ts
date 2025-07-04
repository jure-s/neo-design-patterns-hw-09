import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(path: string) {
    const content = readFileSync(path, "utf-8");

    // Видаляємо коментар <!-- Експорт згенеровано ... --> якщо є
    const xmlWithoutComment = content.replace(/<!--[\s\S]*?-->/g, "");

    const parser = new XMLParser();
    const parsed = parser.parse(xmlWithoutComment);
    const users = parsed.users?.user ?? [];

    // Якщо один об'єкт — обертаємо в масив
    this.data = Array.isArray(users) ? users : [users];
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield {
        id: Number(item.id),
        name: item.name,
        email: item.email,
        phone: item.phone,
      };
    }
  }
}
