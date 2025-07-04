import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(path: string) {
    const content = readFileSync(path, "utf-8");
    const lines = content.trim().split("\n");
    const rows = lines.slice(1); // пропускаємо заголовок
    this.data = rows.map((line) => {
      const [id, name, email, phone] = line.split(",");
      return {
        id: Number(id),
        name,
        email,
        phone,
      };
    });
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield item;
    }
  }
}
