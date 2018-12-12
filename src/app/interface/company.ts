export interface Company {
    key?:string;
    name?:string;
    employees:string;
    email?:string;
    website:string;
    facebook:string;
    phone_number?:string;
    address_1?:string;
    address_2:string;
    date_create?:Date;
}

export interface PostJob{
    key?:string;
    company_key?:string;
    category_key?:string;
    jobtitle?:string;
    exp:number;
    hiring:number;
    salary:string;
    gender:string;
    age:string;
    postdate?:Date;
    expdate?:Date;
    term:string;
    industry:string;
    qualification:string;
    language:string;
    location?:string;
    requirement:string;
    description:string;
}