import db from "../config/pg.config";
import ErrorHandler from "../utils/errors.handler";
import { IStudent, IStudentResObj } from "./interface";

export default class studentdb {
  protected createStudent = async (reqObj: IStudent): Promise<any> => {
    const query = db.format(`INSERT INTO students ? RETURNING *`, reqObj);

    const res = await db.query(query);

    if (res instanceof Error) {
      throw res;
    }

    return res.rows[0] as unknown as IStudentResObj;
  };

  protected isSubjectExist = async (name: string): Promise<string> => {
    const query = `SELECT id FROM subjects WHERE name = $1 LIMIT 1;`;
    const res = await db.query(query, [name]);

    if (res instanceof Error) {
      throw res;
    }

    return res.rows[0] as unknown as string;
  };

  protected subjectEntry = async (reqObj: any): Promise<any> => {
    const query = db.format(
      `INSERT INTO subjects ? ON CONFLICT (name) DO NOTHING RETURNING *`,
      reqObj
    );

    const res = await db.query(query);
    if (res instanceof Error) {
      throw new ErrorHandler({
        message: "Subject not created",
        status_code: 400,
        message_code: "ERROR_CREATING_SUBJECT",
      });
    }

    // return res.rows[0] as unknown as any;
  };

  protected gradesEntry1 = async (reqObj: any): Promise<any> => {
    const query = db.format(`INSERT INTO grades ? RETURNING *`, reqObj);

    const res = await db.query(query);

    if (res instanceof Error) {
      throw new ErrorHandler({
        message: "Grades not created",
        status_code: 400,
        message_code: "ERROR_CREATING_GRADES",
      });
    }

    return res.rows[0] as unknown as any;
  };

  protected getAllStudents = async (classId:string): Promise<any> => {
    const query = `
    SELECT
    s.id AS student_id,
    s.first_name,
    s.last_name,
    s.age,
    s.gender,
    s.class_id,
    s.reg_number,
    s.created_at AS student_created_at,
    sub.name AS subject_name,
    COALESCE(g.obtained_marks, 0) AS obtained_marks,
    COALESCE(g.total_marks, 0) AS total_marks,
  
FROM
    students s
JOIN subjects sub ON true  
LEFT JOIN grades g ON s.id = g.student_id AND sub.id = g.subject_id
WHERE
    s.class_id = '${classId}';

    `;

    const res = await db.query(query);

    if (res instanceof Error) {
      throw new ErrorHandler({
        message: "Error fetching students",
        status_code: 400,
        message_code: "ERROR_FETCHING_STUDENTS",
      });
    }

    return res.rows[0] as unknown as any;
  };
}
