import ErrorHandler from "../utils/errors.handler";
import studentdb from "./db";
import { marksDataObj } from "./interface";
import { v4 } from "uuid";

export default class studentHelper extends studentdb {
  public validateMarks = async (marksEntry: any): Promise<boolean> => {
    const marks = marksEntry;
    const validateSubjectMarks = (
      subject: string,
      subjectMarks: [number, number]
    ): boolean => {
      const [obtainedMarks, totalMarks] = subjectMarks;
      if (
        obtainedMarks <= 0 ||
        totalMarks <= 0 ||
        !Number.isInteger(totalMarks) ||
        obtainedMarks > totalMarks
      ) {
        console.error(
          `Invalid marks for ${subject}: obtainedMarks=${obtainedMarks}, totalMarks=${totalMarks}`
        );

        return false;
      }

      return true;
    };

    for (const subject in marks) {
      console.log(subject);
      if (!validateSubjectMarks(subject, marks[subject])) {
        return false;
      }
    }

    return true;
  };




  public marksEntry = async (data: marksDataObj, studentId: string) => {
    const marksData = Object.entries(data);
    for (const element of marksData) {
      const subject = element[0];
      const marks = element[1];
      const marksObtained = marks[0];
      const totalMarks = marks[1];
      let subjectId = v4();

      const subjectData = {
        id: subjectId,

        name: subject,
        created_at: new Date(),
      };
      const isSubjectExist: any = await this.isSubjectExist(subject);

      if (isSubjectExist?.id === undefined) {
        await this.subjectEntry(subjectData);
      } else {
        subjectId = isSubjectExist.id;
      }

      const gradesData = {
        id: v4(),
        subject_id: subjectId,
        student_id: studentId,
        obtained_marks: marksObtained,
        total_marks: totalMarks,
        created_at: new Date(),
      };

      const marksEntry = await this.gradesEntry1(gradesData);

      if (!marksEntry) {
        throw new ErrorHandler({
          message: "Marks not entered",
          status_code: 400,
          message_code: "ERROR_ENTERING_MARKS",
        });
      }
    }
  };
}
