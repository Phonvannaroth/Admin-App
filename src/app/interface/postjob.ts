export interface Postjobkey{
    key?:string;
    company_name?:string;
    category_name?:string;
    jobtitle?:string;
    exp:number;
    hiring:number;
    salary:string;
    sex:string;
    age:string;
    postdate?:Date;
    closedate?:Date;
    term:string;
    // industry:string;
    qualification:string;
    language:string[];
    location?:string[];
    requirement:string;
    description:string;
}
