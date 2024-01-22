



export interface ICreateStudentReqObj {
    class_id: string;
    reg_number: string;
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
    mobile: string;
}

export interface IStudent extends ICreateStudentReqObj {
    id: string;
    created_at: Date;

}

export interface IStudentResObj {
    id: string;
    class_id: string;
    reg_number: string;
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
    mobile: string;
    created_at: Date;
}

export interface IMarksentry1ReqObj {
    name: string;
    age: string;
    gender: string;
    marks: {
        physics: [number, number];
        chemistry: [number, number];
        maths: [number, number];
    };
}
export interface IMarksentry2ReqObj {
    first_name: string;
    last_name: string;
    years_old: string;
    scores: {
        subjects: string[];
        marks_obtained: number[];
        total_marks: number[];
    };
}

export interface marksDataObj {
    [subject: string]: [number, number];
}