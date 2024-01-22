import db from "../config/pg.config";
import { IClassResObj, createClassObj } from "./interface";

export default class classdb {

  protected createClass = async (
    data: createClassObj
  ): Promise<IClassResObj> => {

    const query = `INSERT INTO classes (id, created_at) VALUES ($1, $2) RETURNING *`;

    const res = await db.query(query, [data.id, data.created_at]);

    if (res instanceof Error) {
      throw res;
    }

    return res.rows[0] as unknown as IClassResObj;
  };

  
}
