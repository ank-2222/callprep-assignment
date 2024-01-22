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
  public getPercentage = async (data: any) => {
    const res = data.map((student: any) => {
      function calculateOverallPercentage(subject_marks: any) {
        let totalObtainedMarks = 0;
        let totalTotalMarks = 0;

        Object.keys(subject_marks).forEach((subject) => {
          totalObtainedMarks += subject_marks[subject].obtained_marks;
          totalTotalMarks += subject_marks[subject].total_marks;
        });

        if (totalTotalMarks !== 0) {
          const overallPercentage =
            (totalObtainedMarks / totalTotalMarks) * 100;
          return overallPercentage.toFixed(2);
        } else {
          return 0;
        }
      }

      const { first_name, last_name, age, gender, subject_marks, ...rest } =
        student;
      const percentageMarks = {} as any;
      Object.keys(subject_marks).forEach((subject) => {
        const obtainedMarks = subject_marks[subject].obtained_marks;
        const totalMarks = subject_marks[subject].total_marks;

        if (totalMarks !== 0) {
          const percentage = (obtainedMarks / totalMarks) * 100;
          const percentageKey = `${subject.toLowerCase()}_percentage`;

          percentageMarks[percentageKey] = percentage.toFixed(2);
        }
      });
      return {
        name: first_name + " " + last_name,
        age,
        gender,

        ...percentageMarks,
        overall_percentage: calculateOverallPercentage(subject_marks),
      };
    });

    return res;
  };
  public getClassAverage = async (data: any) => {
    const calculateOverallPercentage = (subject_marks: any): any => {
      let totalObtainedMarks = 0;
      let totalTotalMarks = 0;

      Object.keys(subject_marks).forEach((subject) => {
        totalObtainedMarks += subject_marks[subject].obtained_marks;
        totalTotalMarks += subject_marks[subject].total_marks;
      });

      if (totalTotalMarks !== 0) {
        const overallPercentage = (totalObtainedMarks / totalTotalMarks) * 100;
        return overallPercentage.toFixed(2);
      } else {
        return 0;
      }
    };

    function calculateClassAverage(students: any) {
      let totalClassScore = 0;
      let totalStudents = students.length;
      students.forEach((student: any) => {
        totalClassScore += parseFloat(
          calculateOverallPercentage(student.subject_marks)
        );
      });

      if (totalStudents !== 0) {
        const classAverage = totalClassScore / totalStudents;
        return classAverage.toFixed(2);
      } else {
        return 0;
      }
    }

    const classAverage = calculateClassAverage(data);

    return classAverage;
  };
  public getSubjectAvg = async (students: any, subject: string) => {
    let totalSubjectScore = 0;
    let totalStudents = students.length;

    students.forEach((student: any) => {
      totalSubjectScore += student.subject_marks[subject].obtained_marks;
    });

    if (totalStudents !== 0) {
      const subjectAverage = totalSubjectScore / totalStudents;
      return subjectAverage.toFixed(2);
    } else {
      return 0;
    }
  };
}
